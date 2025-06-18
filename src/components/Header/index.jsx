import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { useServerStatus } from "../../hooks/useServerStatus";
import { ServerStatusIndicator } from "../ServerStatusIndicator";
import { LogoutButton } from "../buttons/LogoutButton";
import logo from "../../assets/SCJN_NEG.png";
export const Header = ({ isProcessing, onToggleSidebar }) => {
  const navigate = useNavigate();
  const { isLoading, statusText, statusColor, dotColor, processCount } = useServerStatus({ isProcessing });

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    navigate('/login');
  };
  const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
  </svg>
);

  return (
    <header className="bg-black text-white py-4 px-4 sm:px-10 flex items-center justify-between text-lg">
       {/* Left Side: Toggle, Logo, and Status */}
      <div className="flex items-center gap-4">
        {/* --- YOUTUBE-STYLE TOGGLE BUTTON --- */}
        <button onClick={onToggleSidebar} className="p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
          <MenuIcon />
        </button>

        <a href="https://www.scjn.gob.mx/" target='_blank' rel="noopener noreferrer">
          <img src={logo} alt="Logo SCJN" className="h-12 sm:h-16" />
        </a>
        <ServerStatusIndicator
          isLoading={isLoading}
          statusText={statusText}
          statusColor={statusColor}
          dotColor={dotColor}
          processCount={processCount}
        />
      </div>

      {/* Right Side: Title and Logout */}
      <div className='flex items-center gap-4'>
        <h1 className='text-2xl font-bold'>SPO</h1>
        {isAuthenticated() && <LogoutButton onLogout={handleLogout} />}
      </div>
    </header>
  );
};