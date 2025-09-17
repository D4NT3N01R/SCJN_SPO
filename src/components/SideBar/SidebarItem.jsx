import { Link } from 'react-router-dom';

export const SidebarItem = ({ icon, text, isOpen, active, to = "#", isDarkMode }) => {
  return (
    <li>
      <Link
        to={to}
        title={!isOpen ? text : ''}
        className={`
          flex items-center p-3 my-1 rounded-lg text-sm font-medium transition-colors
          ${isOpen ? '' : 'justify-center'}
          ${active
            ? isDarkMode
              ? 'bg-blue-900'
              : 'bg-blue-100'
            : isDarkMode
              ? 'hover:bg-gray-700'
              : 'hover:bg-gray-100'
          }
        `}
      >
        {/* Icono adaptado al modo */}
      <span className={isDarkMode ? 'text-white' : 'text-black'}>
          {icon}
        </span>
        <span
          className={`
            overflow-hidden transition-all whitespace-nowrap
            ${isOpen ? "w-40 ml-3" : "w-0"}
            ${isDarkMode ? "text-white" : "text-black"}
          `}
        >
          {text}
        </span>
      </Link>
    </li>
  );
};