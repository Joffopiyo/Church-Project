import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await axios.post('/api/auth/forgotpassword', { email });
            setMessage(response.data.message);
            setEmail('');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
            }}
        >
            <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
                <Typography variant="h5" component="h1" gutterBottom align="center">
                    Forgot Password
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                    Enter your email address and we'll send you a link to reset your password.
                </Typography>

                {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={onSubmit}>
                    <TextField
                        label="Email Address"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>

                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Typography variant="body2" color="primary">
                                Back to Login
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default ForgotPasswordPage;
