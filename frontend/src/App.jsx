import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import RoleBasedDashboard from './components/RoleBasedDashboard'
import SickRecordsManager from './components/SickRecordsManager'
import PrivateRoute from './components/PrivateRoute'
import UserManagementPage from './pages/UserManagementPage'
import ReportsPage from './pages/ReportsPage'
import RoleDashboardView from './pages/RoleDashboardView'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <>
            <Router>
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<LoginPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/register' element={<RegisterPage />} />
                        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
                        <Route path='/reset-password/:resetToken' element={<ResetPasswordPage />} />
                        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path='/sick-records' element={<PrivateRoute><SickRecordsManager /></PrivateRoute>} />
                        <Route path='/admin/users' element={<PrivateRoute><UserManagementPage /></PrivateRoute>} />
                        <Route path='/reports' element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
                        <Route path='/admin/role/:role' element={<PrivateRoute><RoleDashboardView /></PrivateRoute>} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    )
}

export default App
