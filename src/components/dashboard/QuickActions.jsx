import { Link } from 'react-router-dom';
import { TrendingUp, Users, FileText } from 'lucide-react';

const QuickActions = ({ isDarkMode }) => {
  const actions = [
    { to: "/services", icon: TrendingUp, title: "Ejecutar Servicio", text: "Ejecutar un servicio Python", color: "text-primary-600" },
    { to: "/files", icon: FileText, title: "Gestionar Archivos", text: "Subir o descargar archivos", color: "text-green-600" },
    { to: "/jobs", icon: Users, title: "Ver Trabajos", text: "Monitorear ejecuciones", color: "text-blue-600" },
  ];

  return (
    <div className={isDarkMode ? "bg-gray-800 shadow rounded-lg" : "bg-white shadow rounded-lg"}>
      <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-lg font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Acciones Rápidas
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className={`flex items-center p-4 border rounded-lg transition-colors
                ${isDarkMode
                  ? 'border-gray-700 hover:bg-gray-700 hover:border-gray-600'
                  : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`
              }
            >
              <action.icon className={`h-8 w-8 mr-3 ${action.color}`} />
              <div>
                <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {action.title}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {action.text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;