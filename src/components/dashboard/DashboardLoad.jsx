const DashboardSkeleton = ({ isDarkMode }) => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className={`h-8 rounded w-64 mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={isDarkMode ? "bg-gray-800 p-6 rounded-lg shadow" : "bg-white p-6 rounded-lg shadow"}>
            <div className={`h-4 rounded w-3/4 mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className={`h-8 rounded w-1/2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          </div>
        ))}
      </div>
      <div className={isDarkMode ? "h-64 bg-gray-800 rounded-lg shadow" : "h-64 bg-white rounded-lg shadow"}></div>
      <div className={isDarkMode ? "h-48 bg-gray-800 rounded-lg shadow" : "h-48 bg-white rounded-lg shadow"}></div>
    </div>
  );
};

export default DashboardSkeleton;