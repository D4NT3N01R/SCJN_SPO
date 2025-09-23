import { useAuth } from './utils/auth'; // <-- asegúrate que la ruta sea correcta
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import PaginaBase from './pages/paginaBase';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/protectedRoute';
import { Body } from './components/body';
import { MexicoMap } from './components/map/MexicoMap';
import { StateListPage } from './pages/StateListPage'; // <-- Nueva importación

const AppRoutes = () => {
  const { authenticated } = useAuth(); //  hook dentro del componente

  return (
    <Routes>
      <Route path="/login" element={
        authenticated ? <Navigate to="/home" replace /> : <Login />
      } />
      <Route element={<ProtectedRoute />}>
        <Route element={<PaginaBase />}>
          <Route path="/home" element={<Home />} />
          <Route path="/estado/:stateName" element={<Body />} />
          {/* Rutas anidadas para consulta */}
          <Route path="/consulta">
            <Route path="mapa" element={<MexicoMap />} />
            <Route path="lista-estados" element={<StateListPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="/" element={
        authenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
      } />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;