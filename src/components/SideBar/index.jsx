import React from 'react';
import  {Home, Map, ChevronLeft, ChevronRight} from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { DropdownMenu } from '../buttons/DropdownMenu';
import { mexicoStates } from '../../utils/states';
import { useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Inicio', href: '/home', icon: <Home size={25} /> },
  { name: 'Consulta', href: '/arañas', icon: <Map size={25} /> },
];

export const Sidebar = ({ isOpen, onToggleSidebar, isDarkMode }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

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
              active={isActive(item.href)}
              isDarkMode={isDarkMode}
            />
          ))}
          <DropdownMenu title="Estados" items={mexicoStates} isOpen={isOpen} />
        </ul>
      </nav>
    </aside>
  );
};