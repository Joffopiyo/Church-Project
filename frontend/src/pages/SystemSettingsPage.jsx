import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Container,
    Paper,
    Typography,
    Box,
    IconButton,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Divider,
    Switch,
    FormControlLabel
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Settings as SettingsIcon,
    Save as SaveIcon
} from '@mui/icons-material';

function SystemSettingsPage() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        systemName: 'Church Management System',
        emailNotifications: true,
        smsNotifications: false,
        autoBackup: true,
        maintenanceMode: false,
        maxUploadSize: '10',
        sessionTimeout: '30',
        allowRegistration: true,
        requireEmailVerification: false
    });

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

    const handleChange = (field) => (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        // TODO: Implement API call to save settings
        toast.success('Settings saved successfully!');
        console.log('Settings to save:', settings);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => navigate('/dashboard')} color="primary">
                    <ArrowBackIcon />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                    <SettingsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="700">
                            System Settings
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Configure system-wide settings and preferences
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {/* General Settings */}
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight="700" gutterBottom>
                                General Settings
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="System Name"
                                        value={settings.systemName}
                                        onChange={handleChange('systemName')}
                                        helperText="The name displayed across the system"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Session Timeout (minutes)"
                                        type="number"
                                        value={settings.sessionTimeout}
                                        onChange={handleChange('sessionTimeout')}
                                        helperText="Auto-logout after inactivity"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Max Upload Size (MB)"
                                        type="number"
                                        value={settings.maxUploadSize}
                                        onChange={handleChange('maxUploadSize')}
                                        helperText="Maximum file upload size"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Notification Settings */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight="700" gutterBottom>
                                Notifications
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.emailNotifications}
                                            onChange={handleChange('emailNotifications')}
                                            color="primary"
                                        />
                                    }
                                    label="Email Notifications"
                                />
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 4, mt: -1 }}>
                                    Send email notifications for important events
                                </Typography>

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.smsNotifications}
                                            onChange={handleChange('smsNotifications')}
                                            color="primary"
                                        />
                                    }
                                    label="SMS Notifications"
                                />
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 4, mt: -1 }}>
                                    Send SMS for critical alerts
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* System Features */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight="700" gutterBottom>
                                System Features
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.allowRegistration}
                                            onChange={handleChange('allowRegistration')}
                                            color="primary"
                                        />
                                    }
                                    label="Allow User Registration"
                                />
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 4, mt: -1 }}>
                                    Enable public user registration
                                </Typography>

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.requireEmailVerification}
                                            onChange={handleChange('requireEmailVerification')}
                                            color="primary"
                                        />
                                    }
                                    label="Require Email Verification"
                                />
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 4, mt: -1 }}>
                                    Users must verify email before login
                                </Typography>

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.autoBackup}
                                            onChange={handleChange('autoBackup')}
                                            color="primary"
                                        />
                                    }
                                    label="Automatic Backups"
                                />
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 4, mt: -1 }}>
                                    Daily automatic database backups
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Maintenance Mode */}
                <Grid item xs={12}>
                    <Card sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        border: settings.maintenanceMode ? '2px solid #f44336' : 'none'
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight="700" gutterBottom color={settings.maintenanceMode ? 'error' : 'inherit'}>
                                Maintenance Mode
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={settings.maintenanceMode}
                                        onChange={handleChange('maintenanceMode')}
                                        color="error"
                                    />
                                }
                                label="Enable Maintenance Mode"
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mt: 1 }}>
                                ⚠️ Warning: Enabling maintenance mode will prevent all users (except admins) from accessing the system.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Save Button */}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/dashboard')}
                            sx={{ px: 4 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                            sx={{ px: 4 }}
                        >
                            Save Settings
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default SystemSettingsPage;
