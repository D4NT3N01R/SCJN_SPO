import { SidebarItem } from './SidebarItem';
import { DropdownMenu } from '../buttons/DropdownMenu';
import { mexicoStates } from '../../utils/states';

// --- Example Icons ---
const HomeIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">...</svg>;
const ChartIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">...</svg>;
const StatesIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">...</svg>;

// 1. Define the default state, just like in your other files


export const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`
        bg-black
         text-white flex flex-col
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-2"}
      `}
    >
      {/* ... your sidebar header ... */}

      <nav className="flex-grow p-2">
        {/* 2. Add the 'to' prop to the "Inicio" SidebarItem */}
        <SidebarItem
          icon={<HomeIcon />}
          text="Inicio"
          isOpen={isOpen}
          active={true} // You might want to make 'active' dynamic based on the current URL
          to={`/home`}
        />
        
        <SidebarItem
            icon={<ChartIcon />}
            text="Estadísticas"
            isOpen={isOpen}
            to="/estadisticas" // Example for another page
        />
        
        <div className="px-1 py-1">
          <DropdownMenu title="Estados" icon={<StatesIcon/>} items={mexicoStates} isOpen={isOpen} />
        </div>
      </nav>
      
      {/* ... your other sidebar content ... */}
    </aside>
  );
};