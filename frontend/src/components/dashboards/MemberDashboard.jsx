import { useSelector } from 'react-redux';
import { Grid, Paper, Typography, Box, Card, CardContent, CardHeader, Avatar, Divider } from '@mui/material';
import { Person as PersonIcon, EventNote as EventNoteIcon, Assignment as AssignmentIcon } from '@mui/icons-material';
import DutyList from '../DutyList';
import AttendanceRollCall from '../AttendanceRollCall';

function MemberDashboard() {
    const { user } = useSelector((state) => state.auth);

    return (
        <Box sx={{ flexGrow: 1, pb: 4 }}>
            <Grid container spacing={3}>
                {/* Welcome Card */}
                <Grid item xs={12}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
                        color: 'white',
                        borderRadius: 2,
                        boxShadow: 3
                    }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'white', color: '#1976d2', width: 56, height: 56 }}>
                                <PersonIcon fontSize="large" />
                            </Avatar>
                            <Box>
                                <Typography variant="h4" component="div" fontWeight="bold">
                                    Member Dashboard
                                </Typography>
                                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                    Welcome back, {user?.firstName} {user?.lastName}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Attendance Section */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }}><EventNoteIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="bold">Attendance Roll Call</Typography>}
                            subheader="Mark your daily attendance"
                        />
                        <Divider />
                        <CardContent>
                            <AttendanceRollCall />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Duties Section */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#e8f5e9', color: '#2e7d32' }}><AssignmentIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="bold">My Assigned Duties</Typography>}
                            subheader="Check your upcoming responsibilities"
                        />
                        <Divider />
                        <CardContent>
                            <DutyList />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default MemberDashboard;
