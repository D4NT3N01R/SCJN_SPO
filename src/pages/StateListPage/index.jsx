import { Link, useOutletContext } from 'react-router-dom';
import { mexicoStates } from '../../utils/states';
import { MapPin } from 'lucide-react';

export const StateListPage = () => {
  const { isDarkMode } = useOutletContext() || {};

  return (
    <div className={`p-8 ${isDarkMode ? 'bg-[#101010] text-white' : 'bg-gray-50 text-black'} min-h-screen`}>
      <h1 className="text-3xl font-bold mb-6">Lista de Estados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mexicoStates.map((state) => (
          <Link
            key={state.id}
            to={`/estado/${state.name}`}
            className={`flex items-center p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
              isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-[#FFFFFF] hover:bg-blue-800 text-black'
            }`}
          >
            <MapPin className={`mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-200'}`} />
            <span className="font-semibold">{state.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
