import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
    Grid,
    Box,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Divider,
    Typography,
    Button,
    LinearProgress
} from '@mui/material';
import {
    SupervisorAccount as SupervisorAccountIcon,
    Assignment as AssignmentIcon,
    Assessment as AssessmentIcon,
    EventNote as EventNoteIcon,
    List as ListIcon,
    TrendingUp as TrendingUpIcon,
    People as PeopleIcon,
    CheckCircle as CheckCircleIcon,
    LocalChurch as LocalChurchIcon
} from '@mui/icons-material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import DutyAssignmentForm from '../DutyAssignmentForm';
import ReportSubmissionForm from '../ReportSubmissionForm';
import AttendanceRollCall from '../AttendanceRollCall';
import DutyList from '../DutyList';

function ReverendDashboard() {
    const { user } = useSelector((state) => state.auth);

    const departmentData = [
        { dept: 'Youth', members: 120, active: 95 },
        { dept: 'Women', members: 150, active: 130 },
        { dept: 'Men', members: 100, active: 85 },
        { dept: 'Children', members: 80, active: 75 },
    ];

    const attendanceTrend = [
        { week: 'Week 1', attendance: 380 },
        { week: 'Week 2', attendance: 420 },
        { week: 'Week 3', attendance: 390 },
        { week: 'Week 4', attendance: 450 },
    ];

    return (
        <Box sx={{ flexGrow: 1, pb: 4, bgcolor: '#f5f7fa' }}>
            <Grid container spacing={3}>
                {/* Welcome Header */}
                <Grid item xs={12}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, #0c2461 0%, #1e3799 100%)',
                        color: 'white',
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(12, 36, 97, 0.35)',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <Box sx={{
                            position: 'absolute',
                            top: -50,
                            right: -50,
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.1)',
                        }} />
                        <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                <Avatar sx={{
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    backdropFilter: 'blur(10px)',
                                    width: 80,
                                    height: 80,
                                    border: '3px solid rgba(255,255,255,0.3)'
                                }}>
                                    <SupervisorAccountIcon sx={{ fontSize: 48 }} />
                                </Avatar>
                                <Box>
                                    <Typography variant="h3" component="div" fontWeight="800" sx={{ mb: 1 }}>
                                        Reverend Dashboard
                                    </Typography>
                                    <Typography variant="h6" sx={{ opacity: 0.95, fontWeight: 400 }}>
                                        Welcome back, Reverend {user?.firstName} {user?.lastName}
                                    </Typography>
                                    <Typography variant="body1" sx={{ opacity: 0.85, mt: 1 }}>
                                        Regional oversight and pastoral leadership
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Key Metrics */}
                <Grid item xs={12} md={3}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        background: 'linear-gradient(135deg, #0c2461 0%, #1e3799 100%)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(12, 36, 97, 0.4)' }
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1, fontWeight: 500 }}>
                                        Total Members
                                    </Typography>
                                    <Typography variant="h2" fontWeight="800">
                                        450
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                                    <PeopleIcon fontSize="large" />
                                </Avatar>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon fontSize="small" />
                                <Typography variant="caption">Your region</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(0, 210, 255, 0.4)' }
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1, fontWeight: 500 }}>
                                        Avg Attendance
                                    </Typography>
                                    <Typography variant="h2" fontWeight="800">
                                        410
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                                    <CheckCircleIcon fontSize="large" />
                                </Avatar>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon fontSize="small" />
                                <Typography variant="caption">91.1% rate</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(17, 153, 142, 0.4)' }
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1, fontWeight: 500 }}>
                                        Departments
                                    </Typography>
                                    <Typography variant="h2" fontWeight="800">
                                        4
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                                    <LocalChurchIcon fontSize="large" />
                                </Avatar>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CheckCircleIcon fontSize="small" />
                                <Typography variant="caption">All active</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        background: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(252, 74, 26, 0.4)' }
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1, fontWeight: 500 }}>
                                        Active Leaders
                                    </Typography>
                                    <Typography variant="h2" fontWeight="800">
                                        12
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                                    <SupervisorAccountIcon fontSize="large" />
                                </Avatar>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CheckCircleIcon fontSize="small" />
                                <Typography variant="caption">Overseers & Pastors</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Charts */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100%' }}>
                        <CardHeader
                            title={<Typography variant="h6" fontWeight="700">Department Overview</Typography>}
                            subheader="Members and active participation"
                        />
                        <Divider />
                        <CardContent sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={departmentData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="dept" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    <Legend />
                                    <Bar dataKey="members" fill="#0c2461" radius={[8, 8, 0, 0]} />
                                    <Bar dataKey="active" fill="#00d2ff" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100%' }}>
                        <CardHeader
                            title={<Typography variant="h6" fontWeight="700">Attendance Trend</Typography>}
                            subheader="Weekly attendance this month"
                        />
                        <Divider />
                        <CardContent sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={attendanceTrend}>
                                    <defs>
                                        <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0c2461" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#0c2461" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="week" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    <Area type="monotone" dataKey="attendance" stroke="#0c2461" fillOpacity={1} fill="url(#colorAttendance)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Action Cards */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#e0f2f1', color: '#00695c' }}><AssignmentIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="600">Assign Duties</Typography>}
                            subheader="Delegate to overseers and pastors"
                        />
                        <Divider />
                        <CardContent>
                            <DutyAssignmentForm />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#fff3e0', color: '#ef6c00' }}><AssessmentIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="600">Submit Report</Typography>}
                            subheader="Regional ministry report"
                        />
                        <Divider />
                        <CardContent>
                            <ReportSubmissionForm />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#e3f2fd', color: '#1565c0' }}><EventNoteIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="600">Attendance Roll Call</Typography>}
                        />
                        <Divider />
                        <CardContent>
                            <AttendanceRollCall />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#f3e5f5', color: '#7b1fa2' }}><ListIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="600">My Duties</Typography>}
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

export default ReverendDashboard;
