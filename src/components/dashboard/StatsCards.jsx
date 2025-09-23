
// Componente StatsCard que muestra una tarjeta de estadísticas con título, valor e ícono
const StatsCard = ({ title, value, icon: Icon, color, isDarkMode }) => {
  return (
    <div className={isDarkMode ? "bg-gray-800 overflow-hidden shadow rounded-lg" : "bg-white overflow-hidden shadow rounded-lg"}>
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`${color} p-3 rounded-md`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {title}
              </dt>
              <dd className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {value}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;