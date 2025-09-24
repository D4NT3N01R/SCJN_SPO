import { Activity, CheckCircle, XCircle, Play } from 'lucide-react';
import React from 'react';
// Ya necesitamos hook useAuth en esta página, 
// porque el saludo es genérico. 
// La protección de la ruta se encargará de la autenticación.

// Importamos los componentes del dashboard
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatsCard from '../../components/dashboard/StatsCards'; 
import RecentJobsList from '../../components/dashboard/RecenJobsList';
import QuickActions from '../../components/dashboard/QuickActions';
import DashboardSkeleton from '../../components/dashboard/DashboardLoad';
import { useOutletContext } from 'react-router-dom'; // <-- Importa el hook

// --- Datos de prueba para que el dashboard se vea bien ---
/**
 * mockStats es un objeto de ejemplo para mostrar datos en el dashboard.
 *
 * Para pasar a una parte funcional, estos datos deben obtenerse desde un backend real.
 * Ejemplo de implementación:
 *
 * 1. Crear un endpoint en el backend (Node.js, Django, etc.) que devuelva las estadísticas:
 *    - total_jobs
 *    - completed_jobs
 *    - failed_jobs
 *    - running_jobs
 *    - recent_jobs (array de trabajos recientes)
 *
 * 2. En el frontend, usar fetch/axios para llamar al endpoint y actualizar el estado:
 *    fetch('http://localhost:3001/api/dashboard-stats')
 *      .then(res => res.json())
 *      .then(data => setStats(data));
 *
 * 3. El backend debe consultar la base de datos y construir el objeto con la misma estructura que mockStats.
 *
 * Esto permite que el dashboard muestre datos reales y actualizados.
 */
const mockStats = {
  total_jobs: 125,
  completed_jobs: 110,
  failed_jobs: 5,
  running_jobs: 2,
  recent_jobs: [
    { id: 1, service_name: 'Procesamiento de Nómina', user_name: 'admin', status: 'completed', created_at: '2025-08-28T10:00:00Z' },
    { id: 2, service_name: 'Reporte Mensual', user_name: 'ana.perez', status: 'failed', created_at: '2025-08-28T09:30:00Z' },
    { id: 3, service_name: 'Backup de Base de Datos', user_name: 'admin', status: 'running', created_at: '2025-08-28T11:00:00Z' },
  ],
};

export const Home = () => {
  const { isDarkMode } = useOutletContext() || {}; // <-- Obtén el estado de dark mode

  // Para este componente visual, no necesitamos llamar a useAuth()
  // ya que el componente <ProtectedRoute> se encargará de verificar
  // si el usuario puede o no ver esta página.
  
  // Mantenemos la lógica de carga con datos de prueba
  const [stats, setStats] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulamos una llamada a API
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setStats(mockStats);
      setIsLoading(false);
    });
    return () => clearTimeout(timer);
  }, []);

  const statsCards = [
    { title: 'Total de Trabajos', value: stats?.total_jobs || 0, icon: Activity, color: 'bg-blue-500' },
    { title: 'Completados', value: stats?.completed_jobs || 0, icon: CheckCircle, color: 'bg-green-500' },
    { title: 'Fallidos', value: stats?.failed_jobs || 0, icon: XCircle, color: 'bg-red-500' },
    { title: 'En Ejecución', value: stats?.running_jobs || 0, icon: Play, color: 'bg-orange-500' },
  ];

  if (isLoading) {
    return <DashboardSkeleton isDarkMode={isDarkMode} />;
  }

  return (
    <section className={`space-y-6 p-6 ${isDarkMode ? 'bg-[#101010]' : 'bg-gray-50'} min-h-screen`}>
      {/* El header ahora es genérico */}
      <DashboardHeader isDarkMode={isDarkMode} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card) => (
          <StatsCard key={card.title} {...card} isDarkMode={isDarkMode} />
        ))}
      </div>

      <RecentJobsList jobs={stats?.recent_jobs} isDarkMode={isDarkMode} />

      <QuickActions isDarkMode={isDarkMode} />
    </section>
  );
};