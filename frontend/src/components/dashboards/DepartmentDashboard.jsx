import { useSelector } from 'react-redux';
import { Grid, Paper, Typography, Box, Card, CardContent, CardHeader, Avatar, Divider } from '@mui/material';
import { Business as BusinessIcon, Assignment as AssignmentIcon, Assessment as AssessmentIcon, EventNote as EventNoteIcon, List as ListIcon } from '@mui/icons-material';
import DutyList from '../DutyList';
import DutyAssignmentForm from '../DutyAssignmentForm';
import ReportSubmissionForm from '../ReportSubmissionForm';
import AttendanceRollCall from '../AttendanceRollCall';

function DepartmentDashboard() {
    const { user } = useSelector((state) => state.auth);

    return (
        <Box sx={{ flexGrow: 1, pb: 4 }}>
            <Grid container spacing={3}>
                {/* Welcome Card */}
                <Grid item xs={12}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
                        color: 'white',
                        borderRadius: 2,
                        boxShadow: 3
                    }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'white', color: '#2e7d32', width: 56, height: 56 }}>
                                <BusinessIcon fontSize="large" />
                            </Avatar>
                            <Box>
                                <Typography variant="h4" component="div" fontWeight="bold">
                                    Department Leader Dashboard
                                </Typography>
                                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                    Welcome back, {user?.firstName} {user?.lastName}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Management Section */}
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2, fontWeight: 'bold', color: '#455a64' }}>
                        Department Management
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#e0f2f1', color: '#00695c' }}><AssignmentIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="bold">Assign Duties</Typography>}
                            subheader="Manage team responsibilities"
                        />
                        <Divider />
                        <CardContent>
                            <DutyAssignmentForm />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#fff3e0', color: '#ef6c00' }}><AssessmentIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="bold">Submit Report</Typography>}
                            subheader="Weekly/Monthly department updates"
                        />
                        <Divider />
                        <CardContent>
                            <ReportSubmissionForm />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Overview Section */}
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2, fontWeight: 'bold', color: '#455a64' }}>
                        Personal & Team Overview
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#e3f2fd', color: '#1565c0' }}><EventNoteIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="bold">Attendance Roll Call</Typography>}
                            subheader="Mark attendance"
                        />
                        <Divider />
                        <CardContent>
                            <AttendanceRollCall />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#f3e5f5', color: '#7b1fa2' }}><ListIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="bold">My Duties</Typography>}
                            subheader="Your assigned tasks"
                        />
                        <Divider />
                        <CardContent>
                            <DutyList />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                        <CardHeader title="Department Overview" />
                        <Divider />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Department specific charts and stats will appear here.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default DepartmentDashboard;
