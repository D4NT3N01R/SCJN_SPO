import { SidebarItem } from './SidebarItem';
import { DropdownMenu } from '../buttons/DropdownMenu'; // We'll reuse this
import { mexicoStates } from '../../utils/states';

// --- Example Icons (use a library like react-icons for better options) ---
const HomeIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">...</svg>;
const ChartIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">...</svg>;
const StatesIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">...</svg>; // Icon for your states dropdown

export const Sidebar = ({ isOpen }) => {
  return (
    // The main container's width changes based on the 'isOpen' prop
    <aside
      className={`
        bg-black text-white flex flex-col
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-46" : "w-1"}
      `}
    >
      <div className="flex items-center justify-center h-20 shadow-md">
        {/* Show a full logo when open, and a smaller icon when closed */}
        <h1 className={`text-xl font-bold transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Estados</h1>
        
      </div>

      <nav className="flex-grow p-2">
        <SidebarItem icon={<HomeIcon />} text="Inicio" isOpen={isOpen} active={true} />
        <SidebarItem icon={<ChartIcon />} text="Estadísticas" isOpen={isOpen} />
        
        {/* --- Integrating your Dropdown --- */}
        {/* The dropdown also needs to know if the sidebar is open */}
        <div className="px-1 py-1">
          <DropdownMenu title="Estados" icon={<StatesIcon/>} items={mexicoStates} isOpen={isOpen} />
        </div>
      </nav>
      
      <div className="p-2 border-t border-gray-700">
        {/* You can have a user profile section here */}
      </div>
    </aside>
  );
};