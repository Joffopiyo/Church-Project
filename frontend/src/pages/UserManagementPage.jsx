import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    Container,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress
} from '@mui/material';
import {
    Delete as DeleteIcon,
    ArrowBack as ArrowBackIcon,
    Person as PersonIcon
} from '@mui/icons-material';

function UserManagementPage() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        if (!user || user.role !== 'ADMIN') {
            navigate('/dashboard');
            return;
        }
        fetchUsers();
    }, [user, navigate]);

    const fetchUsers = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const response = await axios.get('/api/users', config);
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users');
            setLoading(false);
        }
    };

    const handleDeleteClick = (userToDelete) => {
        setUserToDelete(userToDelete);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.delete(`/api/users/${userToDelete._id}`, config);
            toast.success('User deleted successfully');
            setDeleteDialogOpen(false);
            setUserToDelete(null);
            fetchUsers(); // Refresh the list
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user');
        }
    };

    const getRoleColor = (role) => {
        const colors = {
            ADMIN: 'error',
            BISHOP: 'secondary',
            REVEREND: 'primary',
            OVERSEER: 'info',
            SENIOR_PASTOR: 'success',
            DEPT_LEADER: 'warning',
            MEMBER: 'default'
        };
        return colors[role] || 'default';
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => navigate('/dashboard')} color="primary">
                    <ArrowBackIcon />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                    <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="700">
                            User Management
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Manage all system users
                        </Typography>
                    </Box>
                </Box>
                <Chip label={`Total Users: ${users.length}`} color="primary" />
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'primary.main' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 700 }}>Name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 700 }}>Email</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 700 }}>Role</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 700 }}>Phone</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 700 }}>Department</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 700 }} align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((userItem) => (
                            <TableRow
                                key={userItem._id}
                                sx={{
                                    '&:hover': { bgcolor: 'action.hover' },
                                    '&:last-child td, &:last-child th': { border: 0 }
                                }}
                            >
                                <TableCell>
                                    <Typography variant="body2" fontWeight="600">
                                        {userItem.firstName} {userItem.lastName}
                                    </Typography>
                                </TableCell>
                                <TableCell>{userItem.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={userItem.role}
                                        color={getRoleColor(userItem.role)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{userItem.phoneNumber || 'N/A'}</TableCell>
                                <TableCell>{userItem.department || 'N/A'}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeleteClick(userItem)}
                                        disabled={userItem._id === user._id}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete user{' '}
                        <strong>
                            {userToDelete?.firstName} {userToDelete?.lastName}
                        </strong>
                        ? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default UserManagementPage;
