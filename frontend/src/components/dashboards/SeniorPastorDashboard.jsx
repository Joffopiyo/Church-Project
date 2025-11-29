import { useSelector } from 'react-redux';
import { Grid, Paper, Typography, Box, Card, CardContent, CardHeader, Avatar, Divider } from '@mui/material';
import { Church as ChurchIcon, Assignment as AssignmentIcon, Assessment as AssessmentIcon, EventNote as EventNoteIcon, List as ListIcon, Dashboard as DashboardIcon } from '@mui/icons-material';
import DutyAssignmentForm from '../DutyAssignmentForm';
import ReportSubmissionForm from '../ReportSubmissionForm';
import AttendanceRollCall from '../AttendanceRollCall';
import DutyList from '../DutyList';

function SeniorPastorDashboard() {
    const { user } = useSelector((state) => state.auth);

    return (
        <Box sx={{ flexGrow: 1, pb: 4 }}>
            <Grid container spacing={3}>
                {/* Welcome Card */}
                <Grid item xs={12}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, #512da8 0%, #9575cd 100%)',
                        color: 'white',
                        borderRadius: 2,
                        boxShadow: 3
                    }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'white', color: '#512da8', width: 56, height: 56 }}>
                                <ChurchIcon fontSize="large" />
                            </Avatar>
                            <Box>
                                <Typography variant="h4" component="div" fontWeight="bold">
                                    Senior Pastor Dashboard
                                </Typography>
                                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                    Welcome back, {user?.firstName} {user?.lastName}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Church Overview Section */}
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: 2, boxShadow: 2, minHeight: 200 }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#ede7f6', color: '#512da8' }}><DashboardIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="bold">Church Overview</Typography>}
                        />
                        <Divider />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                High-level church stats, financial summaries, and attendance trends will appear here.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Administration Section */}
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2, fontWeight: 'bold', color: '#455a64' }}>
                        Administration
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#e0f2f1', color: '#00695c' }}><AssignmentIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="bold">Assign Duties</Typography>}
                            subheader="Delegate responsibilities"
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
                            subheader="Pastor's report"
                        />
                        <Divider />
                        <CardContent>
                            <ReportSubmissionForm />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Personal Section */}
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2, fontWeight: 'bold', color: '#455a64' }}>
                        Personal
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#e3f2fd', color: '#1565c0' }}><EventNoteIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="bold">Attendance Roll Call</Typography>}
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

export default SeniorPastorDashboard;
