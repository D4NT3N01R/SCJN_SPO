import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import logo from "../../assets/SCJN_NEG.svg";
import React, { useState, useRef, useEffect } from "react";
// Componente Header que muestra el logo, el nombre del sistema y el menú de usuario

export const Header = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated, user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
 // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Aquí puedes agregar lógica adicional si es necesario, como limpiar tokens, etc.
    setAuthenticated(false);
    navigate('/login');
  };
  // Cerrar el menú al hacer clic fuera de él              
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Renderizado del componente Header
  return (
    // Header con estilos condicionales según el modo oscuro
    <header className={`${isDarkMode ? "bg-[#202020] text-white" : "bg-white text-black"} px-4 sm:px-10 flex items-center justify-between text-lg relative`}>
      <div className="flex items-center gap-4">
        <a href="https://www.scjn.gob.mx/" target='_blank' rel="noopener noreferrer">
          <img
            src={logo}
            alt="Logo SCJN"
            className="h-10 sm:h-10"
            style={{
              filter: isDarkMode ? "invert(1)" : "none",
              transition: "filter 0.2s"
            }}
          />
        </a>
      </div>
      <div className='flex items-center gap-4'>
        <h1 className='text-2xl font-bold'>SPO</h1>
        {authenticated && (
          <div className="relative" ref={menuRef}>
            <button
              className={`rounded-full w-10 h-10 flex items-center justify-center focus:outline-none ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}
              onClick={() => setShowMenu((v) => !v)}
              title={user?.username || "Usuario"}
            >
              <span className="font-bold">{user?.username?.[0]?.toUpperCase() || "U"}</span>
            </button>
            {showMenu && (
              <div className={`absolute right-0 mt-2 w-48 rounded shadow-lg z-50 py-2 ${isDarkMode ? "bg-[#202020] text-white" : "bg-white text-black"}`}>
                <div className={`px-4 py-2 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>{user?.username || "Usuario"}</div>
                <button
                  className={`w-full text-left px-4 py-2 hover:${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? "Desactivar Dark Mode" : "Activar Dark Mode"}
                </button>
                <button
                  className={`w-full text-left px-4 py-2 hover:${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};