import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { AuthUser } from '../../models/auth';
import { RootState } from '../../store';
import { LoadingType } from '../../models/store';

const AdminRoute = () => {
const { status } = useSelector(
    (state: RootState) => state.user.currentProfile
  );

const user = useSelector<RootState, AuthUser | null>(
        (state) => state.session.currentUser.entities
    );

    if (status === LoadingType.PENDING) {
    return <div className="text-center p-8">Loading</div>;
  }
  if (!user) {
    return <div className="p-8">User not found</div>;
  }
  const isAdmin = user?.role.name === 'admin';
  
  return isAdmin ? <Outlet /> : <Navigate to="/authentification" />;
};

export default AdminRoute;