import React, { useState } from 'react';
import  {Home, Map, ChevronLeft, ChevronRight, List} from 'lucide-react'; // <-- Se agregó List
import { SidebarItem } from './SidebarItem';
import { useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Inicio', href: '/home', icon: <Home size={25} /> },
];

export const Sidebar = ({ isOpen, onToggleSidebar, isDarkMode }) => {
  const location = useLocation();
  const [isConsultaOpen, setConsultaOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className={`flex flex-col h-full ${isDarkMode ? 'bg-[#202020] text-[#FFFFF5]' : 'bg-white text-black'} shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "w-72" : "w-20"}`}>
      <div className="flex items-center justify-between h-16 py-12 px-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        {isOpen && (
          <h1 className="text-lg font-bold">DCL</h1>
        )}
        <button
          onClick={onToggleSidebar}
          className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      <nav className={`mt-6 flex-1 ${isOpen ? 'px-4' : 'px-2'}`}>
        <ul className="space-y-2">
          {navigation.map((item) => (
            <SidebarItem
              key={item.name}
              icon={item.icon}
              text={item.name}
              to={item.href}
              isOpen={isOpen}
              active={location.pathname === item.href}
              isDarkMode={isDarkMode}
            />
          ))}

          {/* Sección de Consulta con submenú */}
          <li>
            <div
              className={`flex items-center p-2 rounded-lg cursor-pointer ${
                isDarkMode
                  ? 'text-white hover:bg-gray-700'
                  : 'text-black hover:bg-gray-100'
              } ${isActive('/consulta') ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
              onClick={() => setConsultaOpen(!isConsultaOpen)}
            >
              <Map size={25} />
              {isOpen && <span className="ml-3">Consulta</span>}
            </div>
            {isConsultaOpen && isOpen && (
              <ul className="pl-8 mt-2 space-y-2">
                <SidebarItem
                  to="/consulta/mapa"
                  text="Mapa"
                  isOpen={isOpen}
                  isSubItem={true}
                  active={location.pathname === '/consulta/mapa'}
                  isDarkMode={isDarkMode}
                />
                <SidebarItem
                  to="/consulta/lista-estados"
                  text="Lista de Estados"
                  isOpen={isOpen}
                  isSubItem={true}
                  active={location.pathname === '/consulta/lista-estados'}
                  isDarkMode={isDarkMode}
                />
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};