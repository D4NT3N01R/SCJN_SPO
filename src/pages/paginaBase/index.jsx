import { Outlet } from "react-router-dom";
import { Footer } from "../../components/footer";
import { Header } from "../../components/Header";
import { Sidebar } from '../../components/SideBar';
import { useState } from "react";
 
const PaginaBase = () => {
    const [isProcessing] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open
    const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        
         <div className="flex h-screen bg-gray-100">
      {/* Pass the state and toggle function to the Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Pass the toggle function to the Header */}
        <Header onToggleSidebar={toggleSidebar} isProcessing={isProcessing} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
    );
};

export default PaginaBase;