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
    LinearProgress,
    Chip
} from '@mui/material';
import {
    Public as PublicIcon,
    Assignment as AssignmentIcon,
    Assessment as AssessmentIcon,
    EventNote as EventNoteIcon,
    List as ListIcon,
    TrendingUp as TrendingUpIcon,
    People as PeopleIcon,
    CheckCircle as CheckCircleIcon
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
    LineChart,
    Line
} from 'recharts';
import DutyAssignmentForm from '../DutyAssignmentForm';
import ReportSubmissionForm from '../ReportSubmissionForm';
import AttendanceRollCall from '../AttendanceRollCall';
import DutyList from '../DutyList';

function BishopDashboard() {
    const { user } = useSelector((state) => state.auth);

    const ministryData = [
        { region: 'North', members: 450, attendance: 380 },
        { region: 'South', members: 520, attendance: 450 },
        { region: 'East', members: 380, attendance: 320 },
        { region: 'West', members: 490, attendance: 410 },
    ];

    const financialData = [
        { month: 'Jan', offering: 45000, tithe: 32000 },
        { month: 'Feb', offering: 48000, tithe: 35000 },
        { month: 'Mar', offering: 52000, tithe: 38000 },
        { month: 'Apr', offering: 49000, tithe: 36000 },
        { month: 'May', offering: 55000, tithe: 40000 },
        { month: 'Jun', offering: 58000, tithe: 42000 },
    ];

    return (
        <Box sx={{ flexGrow: 1, pb: 4, bgcolor: '#f5f7fa' }}>
            <Grid container spacing={3}>
                {/* Welcome Header */}
                <Grid item xs={12}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, #5f27cd 0%, #341f97 100%)',
                        color: 'white',
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(95, 39, 205, 0.35)',
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
                                    <PublicIcon sx={{ fontSize: 48 }} />
                                </Avatar>
                                <Box>
                                    <Typography variant="h3" component="div" fontWeight="800" sx={{ mb: 1 }}>
                                        Bishop Dashboard
                                    </Typography>
                                    <Typography variant="h6" sx={{ opacity: 0.95, fontWeight: 400 }}>
                                        Welcome back, Bishop {user?.firstName} {user?.lastName}
                                    </Typography>
                                    <Typography variant="body1" sx={{ opacity: 0.85, mt: 1 }}>
                                        Global ministry oversight and strategic leadership
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
                        background: 'linear-gradient(135deg, #5f27cd 0%, #341f97 100%)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(95, 39, 205, 0.4)' }
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1, fontWeight: 500 }}>
                                        Total Members
                                    </Typography>
                                    <Typography variant="h2" fontWeight="800">
                                        1,840
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                                    <PeopleIcon fontSize="large" />
                                </Avatar>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon fontSize="small" />
                                <Typography variant="caption">All regions</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        background: 'linear-gradient(135deg, #0abde3 0%, #48dbfb 100%)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(10, 189, 227, 0.4)' }
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1, fontWeight: 500 }}>
                                        Avg Attendance
                                    </Typography>
                                    <Typography variant="h2" fontWeight="800">
                                        1,560
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                                    <CheckCircleIcon fontSize="large" />
                                </Avatar>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon fontSize="small" />
                                <Typography variant="caption">84.8% rate</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        background: 'linear-gradient(135deg, #10ac84 0%, #1dd1a1 100%)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(16, 172, 132, 0.4)' }
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1, fontWeight: 500 }}>
                                        Total Offering
                                    </Typography>
                                    <Typography variant="h2" fontWeight="800">
                                        $58K
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                                    <TrendingUpIcon fontSize="large" />
                                </Avatar>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon fontSize="small" />
                                <Typography variant="caption">This month</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        background: 'linear-gradient(135deg, #ee5a6f 0%, #f368e0 100%)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(238, 90, 111, 0.4)' }
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1, fontWeight: 500 }}>
                                        Active Regions
                                    </Typography>
                                    <Typography variant="h2" fontWeight="800">
                                        4
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                                    <PublicIcon fontSize="large" />
                                </Avatar>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CheckCircleIcon fontSize="small" />
                                <Typography variant="caption">All active</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Charts */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100%' }}>
                        <CardHeader
                            title={<Typography variant="h6" fontWeight="700">Regional Membership</Typography>}
                            subheader="Members and attendance by region"
                        />
                        <Divider />
                        <CardContent sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={ministryData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="region" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    <Legend />
                                    <Bar dataKey="members" fill="#5f27cd" radius={[8, 8, 0, 0]} />
                                    <Bar dataKey="attendance" fill="#0abde3" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100%' }}>
                        <CardHeader
                            title={<Typography variant="h6" fontWeight="700">Financial Overview</Typography>}
                            subheader="Monthly offering and tithe trends"
                        />
                        <Divider />
                        <CardContent sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={financialData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    <Legend />
                                    <Line type="monotone" dataKey="offering" stroke="#10ac84" strokeWidth={3} dot={{ r: 5 }} />
                                    <Line type="monotone" dataKey="tithe" stroke="#ee5a6f" strokeWidth={3} dot={{ r: 5 }} />
                                </LineChart>
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
                            subheader="Delegate responsibilities"
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
                            subheader="Monthly ministry report"
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

export default BishopDashboard;
