import { SidebarItem } from './SidebarItem';
import { DropdownMenu } from '../buttons/DropdownMenu';
import { mexicoStates } from '../../utils/states';



// 1. Define the default state, just like in your other files


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
      {/* ... your sidebar header ... */}

      <nav className="flex-grow p-2">
        {/* 2. Add the 'to' prop to the "Inicio" SidebarItem */}
        <SidebarItem
         
          text="Inicio"
          isOpen={isOpen}
          active={true} // You might want to make 'active' dynamic based on the current URL
          to={`/home`}
        />
        
        <SidebarItem
            
            text="Consulta de periodicos"
            isOpen={isOpen}
            to="/arañas" // Example for another page
        />
        
          
          <DropdownMenu title="Estados" items={mexicoStates} isOpen={isOpen} />
        
      </nav>
      
      {/* ... your other sidebar content ... */}
    </aside>
  );
};