import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../utils/auth'; // adjust path accordingly


// Componente que protege rutas basándose en la autenticación del usuario
export const ProtectedRoute = () => {
  const { authenticated } = useAuth();

  // Si no está autenticado, redirige a la página de login
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
