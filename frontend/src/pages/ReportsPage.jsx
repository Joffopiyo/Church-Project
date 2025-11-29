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
    Box,
    Chip,
    IconButton,
    CircularProgress,
    Card,
    CardContent
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Assessment as AssessmentIcon
} from '@mui/icons-material';

function ReportsPage() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchReports();
    }, [user, navigate]);

    const fetchReports = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const response = await axios.get('/api/reports', config);
            setReports(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reports:', error);
            toast.error('Failed to load reports');
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTypeColor = (type) => {
        const colors = {
            WEEKLY: 'primary',
            MONTHLY: 'success',
            QUARTERLY: 'warning',
            ANNUAL: 'error',
            SPECIAL: 'info'
        };
        return colors[type] || 'default';
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
                    <AssessmentIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="700">
                            All Reports
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            View all submitted reports across the system
                        </Typography>
                    </Box>
                </Box>
                <Chip label={`Total Reports: ${reports.length}`} color="primary" />
            </Box>

            {reports.length === 0 ? (
                <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                    <CardContent sx={{ textAlign: 'center', py: 8 }}>
                        <AssessmentIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            No reports found
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Reports will appear here once they are submitted
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'primary.main' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Type</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Department</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Submitted By</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Period</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Attendance</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Summary</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reports.map((report) => (
                                <TableRow
                                    key={report._id}
                                    sx={{
                                        '&:hover': { bgcolor: 'action.hover' },
                                        '&:last-child td, &:last-child th': { border: 0 }
                                    }}
                                >
                                    <TableCell>
                                        <Chip
                                            label={report.type}
                                            color={getTypeColor(report.type)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" fontWeight="600">
                                            {report.department?.name || 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {report.submittedBy?.firstName} {report.submittedBy?.lastName}
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" display="block">
                                            {formatDate(report.periodStart)} - {formatDate(report.periodEnd)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={report.attendanceCount}
                                            size="small"
                                            color="success"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                maxWidth: 300,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {report.summary}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption">
                                            {formatDate(report.createdAt)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}

export default ReportsPage;
