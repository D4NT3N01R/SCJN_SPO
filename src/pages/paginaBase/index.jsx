import { Outlet } from "react-router-dom";
import { Footer } from "../../components/footer";
import { Header } from "../../components/Header";
import { Sidebar } from '../../components/SideBar';
import { useState, useEffect } from "react";
// Componente PaginaBase que sirve como estructura principal de la aplicación
const PaginaBase = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Aplica la clase global para dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode-active');
      document.body.classList.remove('light-mode-active');
    } else {
      document.body.classList.add('light-mode-active');
      document.body.classList.remove('dark-mode-active');
    }
  }, [isDarkMode]);
  // Renderizado del componente PaginaBase
  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
      <Sidebar isOpen={isSidebarOpen} isDarkMode={isDarkMode} onToggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-0.4 custom-scrollbar_main ">
          <Outlet context={{ isDarkMode }} />
        </main>
        {/* <Footer/> */}
      </div>
    </div>
  );
};

export default PaginaBase;