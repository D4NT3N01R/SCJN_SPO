import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

// --- Import dinámico para helpers/constants ---
let JOB_STATUS_LABELS = {};
let JOB_STATUS_COLORS = {};
let formatDate = (date) => date;

try {
  // Intenta importar desde utils
  // eslint-disable-next-line
  ({ JOB_STATUS_LABELS, JOB_STATUS_COLORS } = require('../../utils/constants'));
  // eslint-disable-next-line
  formatDate = require('../../utils/helpers').formatDate;
} catch (e1) {
  try {
    // Si falla, intenta helpers
    // eslint-disable-next-line
    ({ JOB_STATUS_LABELS, JOB_STATUS_COLORS } = require('../../helpers/constants'));
    // eslint-disable-next-line
    formatDate = require('../../helpers/helpers').formatDate;
  } catch (e2) {
    // Si ambos fallan, usa valores por defecto
    JOB_STATUS_LABELS = { pending: 'Pendiente', done: 'Terminado', error: 'Error' };
    JOB_STATUS_COLORS = { pending: 'bg-yellow-100 text-yellow-800', done: 'bg-green-100 text-green-800', error: 'bg-red-100 text-red-800' };
    formatDate = (date) => new Date(date).toLocaleString();
  }
}
// Componente RecentJobsList que muestra una lista de trabajos recientes en el dashboard
const RecentJobsList = ({ jobs, isDarkMode }) => {
  // Renderizado del componente RecentJobsList
  return (
    <div className={isDarkMode ? "bg-gray-800 shadow rounded-lg" : "bg-white shadow rounded-lg"}>
      <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Trabajos Recientes
          </h2>
          <Link to="/jobs" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
            Ver todos →
          </Link>
        </div>
      </div>
      <div className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
        {jobs?.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className={`px-6 py-4 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full flex items-center justify-center`}>
                      <Activity className={`h-4 w-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                    </div>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {job.service_name}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Por {job.user_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${JOB_STATUS_COLORS[job.status]}`}>
                    {JOB_STATUS_LABELS[job.status]}
                  </span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatDate(job.created_at)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-8 text-center">
            <Activity className={`mx-auto h-12 w-12 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <h3 className={`mt-2 text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              No hay trabajos recientes
            </h3>
            <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Los trabajos ejecutados aparecerán aquí
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentJobsList;