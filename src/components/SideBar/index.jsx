import { SidebarItem } from './SidebarItem';
import { DropdownMenu } from '../buttons/DropdownMenu';
import { mexicoStates } from '../../utils/states';



// 1. Define the default states


export const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`
        bg-black
         text-white flex flex-col
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-49" : "w-2"}
      `}
    >
      

      <nav className="flex-grow p-2">
        {/* 2. Add the 'to' prop to the "Inicio" SidebarItem */}
        <SidebarItem
         
          text="Inicio"
          isOpen={isOpen}
          active={true} 
          to={`/home`}
        />
        
        <SidebarItem
            
            text="Consulta de periodicos"
            isOpen={isOpen}
            to="/arañas" // Example for arañas page (maybe)
        />
        
          
          <DropdownMenu title="Estados" items={mexicoStates} isOpen={isOpen} />
        
      </nav>
      
      
    </aside>
  );
};