import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { Button, Typography, Container, Box } from '@mui/material'
import RoleBasedDashboard from '../components/RoleBasedDashboard'

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" component="h1">
                        Church Monitoring System
                    </Typography>
                    <Button variant="outlined" color="secondary" onClick={onLogout}>
                        Logout
                    </Button>
                </Box>
                <RoleBasedDashboard />
            </Box>
        </Container>
    )
}

export default Dashboard
