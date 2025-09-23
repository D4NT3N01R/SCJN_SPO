import React, { useState, useEffect } from 'react';
import { Home, Map, ChevronLeft, ChevronRight } from 'lucide-react'; // Se quitó List que no se usaba
import { SidebarItem } from './SidebarItem';
import { useLocation } from 'react-router-dom';

// 1. ESTRUCTURA DE DATOS UNIFICADA
const navigation = [
  { name: 'Inicio', href: '/home', icon: <Home size={25} /> },
  {
    name: 'Consulta',
    icon: <Map size={25} />,
    href: '/consulta', // Ruta base para la función `isActive`
    submenu: [
      { name: 'Mapa', href: '/consulta/mapa' },
      { name: 'Lista de Estados', href: '/consulta/lista-estados' },
    ],
  },
];

export const Sidebar = ({ isOpen, onToggleSidebar, isDarkMode }) => {
  const location = useLocation();
  // El submenú se abre si la ruta es /consulta o alguna subruta
  const isConsultaActive = location.pathname.startsWith('/consulta');
  const [isConsultaOpen, setConsultaOpen] = useState(isConsultaActive);

  useEffect(() => {
    setConsultaOpen(isConsultaActive);
  }, [isConsultaActive]);

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
            item.submenu ? (
              <li key={item.name}>
                <SidebarItem
                  icon={item.icon}
                  text={item.name}
                  to={item.href}
                  isOpen={isOpen}
                  active={isActive(item.href)}
                  isDarkMode={isDarkMode}
                  isDropdown={true}
                  onClick={() => {
                    setConsultaOpen(true);
                    // Redirige al mapa
                    window.location.href = '/consulta/mapa';
                  }}
                />
                {/* Animación suave para el submenú */}
                <ul
                  className={`pl-8 mt-2 space-y-2 transition-all duration-300 ease-in-out ${
                    isConsultaOpen && isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {item.submenu.map((subItem) => (
                    <SidebarItem
                      key={subItem.name}
                      to={subItem.href}
                      text={subItem.name}
                      isOpen={isOpen}
                      isSubItem={true}
                      active={location.pathname === subItem.href}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                </ul>
              </li>
            ) : (
              <SidebarItem
                key={item.name}
                icon={item.icon}
                text={item.name}
                to={item.href}
                isOpen={isOpen}
                active={location.pathname === item.href}
                isDarkMode={isDarkMode}
              />
            )
          ))}
        </ul>
      </nav>
    </aside>
  );
};