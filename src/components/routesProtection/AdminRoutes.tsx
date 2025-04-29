import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { AuthUser } from '../../models/auth';
import { RootState } from '../../store';

const AdminRoute = () => {
//   const { user } = useSelector((state: RootState) => state.auth);

const user = useSelector<RootState, AuthUser | null>(
        (state) => state.session.currentUser.entities
    );
  const isAdmin = user?.role.name === 'admin';
  
  return isAdmin ? <Outlet /> : <Navigate to="/authentification" />;
};

export default AdminRoute;