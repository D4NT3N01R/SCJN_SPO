
import { Link } from 'react-router-dom'; // 1. Import the Link component

// 2. Add 'to' to the list of props the component accepts
export const SidebarItem = ({ icon, text, isOpen, active, to = "#" }) => {
  return (
    
    <Link
      to={to}
      className={`
        flex items-center p-3 my-1 rounded-lg text-white transition-colors
        ${active ? 'bg-blue-600' : 'hover:bg-gray-700'}
      `}
    >
      {icon}
      <span
        className={`
          overflow-hidden transition-all
          ${isOpen ? "w-40 ml-3" : "w-0"}
        `}
      >
        {text}
      </span>
    </Link>
  );
};