import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../utils/auth'; // adjust path accordingly

export const ProtectedRoute = () => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
