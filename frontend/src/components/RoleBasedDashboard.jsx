import { useSelector } from 'react-redux';
import MemberDashboard from './dashboards/MemberDashboard';
import DepartmentDashboard from './dashboards/DepartmentDashboard';
import SeniorPastorDashboard from './dashboards/SeniorPastorDashboard';
import BishopDashboard from './dashboards/BishopDashboard';
import OverseerDashboard from './dashboards/OverseerDashboard';
import ReverendDashboard from './dashboards/ReverendDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

function RoleBasedDashboard() {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return null;
    }

    switch (user.role) {
        case 'ADMIN':
            return <AdminDashboard />;
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
        default:
            return <MemberDashboard />;
    }
}

export default RoleBasedDashboard;
