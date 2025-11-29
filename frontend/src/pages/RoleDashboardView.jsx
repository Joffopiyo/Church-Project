import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Container,
    Box,
    IconButton,
    Typography,
    Paper
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import BishopDashboard from '../components/dashboards/BishopDashboard';
import ReverendDashboard from '../components/dashboards/ReverendDashboard';
import OverseerDashboard from '../components/dashboards/OverseerDashboard';
import SeniorPastorDashboard from '../components/dashboards/SeniorPastorDashboard';
import DepartmentDashboard from '../components/dashboards/DepartmentDashboard';
import MemberDashboard from '../components/dashboards/MemberDashboard';

function RoleDashboardView() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { role } = useParams();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (user.role !== 'ADMIN') {
            toast.error('Access denied. Super Admin only.');
            navigate('/dashboard');
            return;
        }
    }, [user, navigate]);

    const getRoleName = (role) => {
        const roleNames = {
            'BISHOP': 'Bishop',
            'REVEREND': 'Reverend',
            'OVERSEER': 'Overseer',
            'SENIOR_PASTOR': 'Senior Pastor',
            'DEPT_LEADER': 'Department Leader',
            'MEMBER': 'Member'
        };
        return roleNames[role] || role;
    };

    const renderDashboard = () => {
        switch (role) {
            case 'BISHOP':
                return <BishopDashboard />;
            case 'REVEREND':
                return <ReverendDashboard />;
            case 'OVERSEER':
                return <OverseerDashboard />;
            case 'SENIOR_PASTOR':
                return <SeniorPastorDashboard />;
            case 'DEPT_LEADER':
                return <DepartmentDashboard />;
            case 'MEMBER':
                return <MemberDashboard />;
            default:
                return (
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h6" color="error">
                            Invalid role specified
                        </Typography>
                    </Paper>
                );
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => navigate('/dashboard')} color="primary">
                    <ArrowBackIcon />
                </IconButton>
                <Box>
                    <Typography variant="h5" component="h1" fontWeight="700">
                        {getRoleName(role)} Dashboard View
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Viewing as Super Admin
                    </Typography>
                </Box>
            </Box>

            {renderDashboard()}
        </Container>
    );
}

export default RoleDashboardView;
