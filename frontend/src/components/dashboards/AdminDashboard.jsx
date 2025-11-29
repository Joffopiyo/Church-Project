import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Divider,
    Button,
    Chip,
    LinearProgress
} from '@mui/material';
import {
    SupervisorAccount as SupervisorAccountIcon,
    LocalHospital as LocalHospitalIcon,
    TrendingUp as TrendingUpIcon,
    Assessment as AssessmentIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
    Description as DescriptionIcon,
    Security as SecurityIcon,
    CheckCircle as CheckCircleIcon,
    Warning as WarningIcon
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
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminDashboard() {
    const { user } = useSelector((state) => state.auth);
    const [stats, setStats] = useState({
        totalUsers: 0,
        usersByRole: {},
        totalSickRecords: 0,
        criticalCases: 0,
        totalReports: 0,
        totalDuties: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const token = user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const sickRecordsRes = await axios.get('http://localhost:5000/api/sick-records', config);
            const sickRecords = sickRecordsRes.data;
            const criticalCases = sickRecords.filter(r => r.status === 'CRITICAL').length;

            setStats({
                totalUsers: 25, // Sample data
                usersByRole: {
                    BISHOP: 3,
                    REVEREND: 5,
                    OVERSEER: 7,
                    SENIOR_PASTOR: 6,
                    DEPT_LEADER: 4
                },
                totalSickRecords: sickRecords.length,
                criticalCases,
                totalReports: 12, // Sample data
                totalDuties: 18 // Sample data
            });

            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            toast.error('Failed to load dashboard statistics');
            setLoading(false);
        }
    };

    // Chart data
    const roleData = [
        { name: 'Bishops', value: stats.usersByRole.BISHOP || 0, color: '#9c27b0' },
        { name: 'Reverends', value: stats.usersByRole.REVEREND || 0, color: '#3f51b5' },
        { name: 'Overseers', value: stats.usersByRole.OVERSEER || 0, color: '#2196f3' },
        { name: 'Sr. Pastors', value: stats.usersByRole.SENIOR_PASTOR || 0, color: '#00bcd4' },
        { name: 'Dept. Heads', value: stats.usersByRole.DEPT_LEADER || 0, color: '#009688' },
    ];

    const sickRecordsTrend = [
        { month: 'Jan', admitted: 4, discharged: 2, critical: 1 },
        { month: 'Feb', admitted: 3, discharged: 4, critical: 0 },
        { month: 'Mar', admitted: 2, discharged: 3, critical: 1 },
        { month: 'Apr', admitted: 5, discharged: 2, critical: 2 },
        { month: 'May', admitted: 3, discharged: 5, critical: 0 },
        { month: 'Jun', admitted: stats.totalSickRecords, discharged: 0, critical: stats.criticalCases },
    ];

    const reportStats = [
        { name: 'Submitted', value: stats.totalReports, color: '#4caf50' },
        { name: 'Pending', value: 0, color: '#ff9800' },
        { name: 'Approved', value: 0, color: '#2196f3' },
    ];

    const COLORS = ['#9c27b0', '#3f51b5', '#2196f3', '#00bcd4', '#009688'];

    return (
        <Box sx={{ flexGrow: 1, pb: 4, bgcolor: '#f5f7fa' }}>
            <Grid container spacing={3}>
                {/* Welcome Header */}
                <Grid item xs={12}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.35)',
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
                                        Super Admin Dashboard
                                    </Typography>
                                    <Typography variant="h6" sx={{ opacity: 0.95, fontWeight: 400 }}>
                                        Welcome back, {user?.firstName} {user?.lastName}
                                    </Typography>
                                    <Typography variant="body1" sx={{ opacity: 0.85, mt: 1 }}>
                                        Complete oversight of all church operations and personnel
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
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)' }
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1, fontWeight: 500 }}>
                                        Total Sick Records
                                    </Typography>
                                    <Typography variant="h2" fontWeight="800">
                                        {stats.totalSickRecords}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                                    <LocalHospitalIcon fontSize="large" />
                                </Avatar>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon fontSize="small" />
                                <Typography variant="caption">
                                    Updated just now
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(240, 147, 251, 0.4)' }
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1, fontWeight: 500 }}>
                                        Critical Cases
                                    </Typography>
                                    <Typography variant="h2" fontWeight="800">
                                        {stats.criticalCases}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                                    <WarningIcon fontSize="large" />
                                </Avatar>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <WarningIcon fontSize="small" />
                                <Typography variant="caption">
                                    Requires attention
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(79, 172, 254, 0.4)' }
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1, fontWeight: 500 }}>
                                        Total Reports
                                    </Typography>
                                    <Typography variant="h2" fontWeight="800">
                                        {stats.totalReports}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                                    <AssessmentIcon fontSize="large" />
                                </Avatar>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CheckCircleIcon fontSize="small" />
                                <Typography variant="caption">
                                    All departments
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(67, 233, 123, 0.4)' }
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1, fontWeight: 500 }}>
                                        Active Users
                                    </Typography>
                                    <Typography variant="h2" fontWeight="800">
                                        {stats.totalUsers}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                                    <PeopleIcon fontSize="large" />
                                </Avatar>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TrendingUpIcon fontSize="small" />
                                <Typography variant="caption">
                                    All roles
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Charts Section */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100%' }}>
                        <CardHeader
                            title={
                                <Typography variant="h6" fontWeight="700">
                                    Sick Records Trend
                                </Typography>
                            }
                            subheader="Monthly overview of patient status"
                        />
                        <Divider />
                        <CardContent sx={{ height: 350 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={sickRecordsTrend}>
                                    <defs>
                                        <linearGradient id="colorAdmitted" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorDischarged" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f5576c" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#f5576c" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: 8,
                                            border: 'none',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Area type="monotone" dataKey="admitted" stroke="#667eea" fillOpacity={1} fill="url(#colorAdmitted)" />
                                    <Area type="monotone" dataKey="discharged" stroke="#4caf50" fillOpacity={1} fill="url(#colorDischarged)" />
                                    <Area type="monotone" dataKey="critical" stroke="#f5576c" fillOpacity={1} fill="url(#colorCritical)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100%' }}>
                        <CardHeader
                            title={
                                <Typography variant="h6" fontWeight="700">
                                    Users by Role
                                </Typography>
                            }
                            subheader="Distribution across roles"
                        />
                        <Divider />
                        <CardContent sx={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={roleData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {roleData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Role Oversight Section */}
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight="700" sx={{ mb: 2, mt: 2, color: '#2c3e50' }}>
                        Role Oversight
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                        }
                    }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#f3e5f5', color: '#9c27b0' }}><SupervisorAccountIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="600">Bishops</Typography>}
                            subheader="View all bishops and their activities"
                        />
                        <Divider />
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h3" fontWeight="700" color="#9c27b0">
                                    {stats.usersByRole.BISHOP || 0}
                                </Typography>
                                <Chip label="Active" color="success" size="small" />
                            </Box>
                            <Button variant="outlined" fullWidth sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                                View Dashboard
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                        }
                    }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#e8eaf6', color: '#3f51b5' }}><SupervisorAccountIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="600">Reverends</Typography>}
                            subheader="View all reverends and their activities"
                        />
                        <Divider />
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h3" fontWeight="700" color="#3f51b5">
                                    {stats.usersByRole.REVEREND || 0}
                                </Typography>
                                <Chip label="Active" color="success" size="small" />
                            </Box>
                            <Button variant="outlined" fullWidth sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                                View Dashboard
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                        }
                    }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#e3f2fd', color: '#2196f3' }}><SupervisorAccountIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="600">Overseers</Typography>}
                            subheader="View all overseers and their activities"
                        />
                        <Divider />
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h3" fontWeight="700" color="#2196f3">
                                    {stats.usersByRole.OVERSEER || 0}
                                </Typography>
                                <Chip label="Active" color="success" size="small" />
                            </Box>
                            <Button variant="outlined" fullWidth sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                                View Dashboard
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                        }
                    }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#e0f7fa', color: '#00bcd4' }}><SupervisorAccountIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="600">Senior Pastors</Typography>}
                            subheader="View all senior pastors and their activities"
                        />
                        <Divider />
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h3" fontWeight="700" color="#00bcd4">
                                    {stats.usersByRole.SENIOR_PASTOR || 0}
                                </Typography>
                                <Chip label="Active" color="success" size="small" />
                            </Box>
                            <Button variant="outlined" fullWidth sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                                View Dashboard
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                        }
                    }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#e0f2f1', color: '#009688' }}><SupervisorAccountIcon /></Avatar>}
                            title={<Typography variant="h6" fontWeight="600">Department Leaders</Typography>}
                            subheader="View all department leaders and their activities"
                        />
                        <Divider />
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h3" fontWeight="700" color="#009688">
                                    {stats.usersByRole.DEPT_LEADER || 0}
                                </Typography>
                                <Chip label="Active" color="success" size="small" />
                            </Box>
                            <Button variant="outlined" fullWidth sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                                View Dashboard
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* System Management Section */}
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight="700" sx={{ mb: 2, mt: 2, color: '#2c3e50' }}>
                        System Management
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                        }
                    }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: '#ffebee', color: '#c62828', width: 48, height: 48 }}>
                                    <LocalHospitalIcon />
                                </Avatar>
                            }
                            title={<Typography variant="h6" fontWeight="600">Sick Records</Typography>}
                            subheader="Manage all sick members"
                        />
                        <Divider />
                        <CardContent>
                            <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Total: {stats.totalSickRecords}
                                    </Typography>
                                    <Typography variant="body2" color="error.main" fontWeight="600">
                                        Critical: {stats.criticalCases}
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={(stats.criticalCases / Math.max(stats.totalSickRecords, 1)) * 100}
                                    sx={{
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: '#ffebee',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: '#f5576c',
                                            borderRadius: 4
                                        }
                                    }}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                fullWidth
                                href="/sick-records"
                                sx={{
                                    bgcolor: '#c62828',
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    py: 1.5,
                                    '&:hover': { bgcolor: '#b71c1c' }
                                }}
                            >
                                View Records
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                        }
                    }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: '#e8eaf6', color: '#1a237e', width: 48, height: 48 }}>
                                    <DescriptionIcon />
                                </Avatar>
                            }
                            title={<Typography variant="h6" fontWeight="600">All Reports</Typography>}
                            subheader="System-wide reports"
                        />
                        <Divider />
                        <CardContent>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    Total Reports: {stats.totalReports}
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={75}
                                    sx={{
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: '#e8eaf6',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: '#1a237e',
                                            borderRadius: 4
                                        }
                                    }}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                fullWidth
                                href="/reports"
                                sx={{
                                    bgcolor: '#1a237e',
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    py: 1.5,
                                    '&:hover': { bgcolor: '#0d47a1' }
                                }}
                            >
                                View Reports
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                        }
                    }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: '#e0f2f1', color: '#00695c', width: 48, height: 48 }}>
                                    <PeopleIcon />
                                </Avatar>
                            }
                            title={<Typography variant="h6" fontWeight="600">User Management</Typography>}
                            subheader="Manage all users"
                        />
                        <Divider />
                        <CardContent>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    Total Users: {stats.totalUsers}
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={90}
                                    sx={{
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: '#e0f2f1',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: '#00695c',
                                            borderRadius: 4
                                        }
                                    }}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                fullWidth
                                href="/admin/users"
                                sx={{
                                    bgcolor: '#00695c',
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    py: 1.5,
                                    '&:hover': { bgcolor: '#004d40' }
                                }}
                            >
                                Manage Users
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                        }
                    }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: '#fff3e0', color: '#ef6c00', width: 48, height: 48 }}>
                                    <SettingsIcon />
                                </Avatar>
                            }
                            title={<Typography variant="h6" fontWeight="600">System Settings</Typography>}
                            subheader="Configure system"
                        />
                        <Divider />
                        <CardContent>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    Configuration
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={100}
                                    sx={{
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: '#fff3e0',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: '#ef6c00',
                                            borderRadius: 4
                                        }
                                    }}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                fullWidth
                                href="/admin/settings"
                                sx={{
                                    bgcolor: '#ef6c00',
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    py: 1.5,
                                    '&:hover': { bgcolor: '#e65100' }
                                }}
                            >
                                Open Settings
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminDashboard;
