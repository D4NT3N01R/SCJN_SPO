// Componente DashboardHeader que muestra el encabezado del dashboard con título y subtítulo
const DashboardHeader = ({ isDarkMode }) => {
  return (
    <div>
      <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        Bienvenido al Dashboard
      </h1>
      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
        Panel de control del Centro de Operaciones DCL
      </p>
    </div>
  );
};

export default DashboardHeader;