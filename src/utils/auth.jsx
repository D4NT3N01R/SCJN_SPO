{/* al ser una aplicación más larga que el HTR, se crea un contexto global, en lugar de checar cada render de manera local, la autentificación se hace de manera global como un "contexto"*/}

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(() => {
    return !!localStorage.getItem('authenticated');
  });


  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

{/*  Antigua version de la verificación, funciona al guardarse todo como un render de manera local, el problema de esto, es que esta condición puede crear loops infinitos */}
  // useEffect(() => {
  //   localStorage.setItem('authenticated', authenticated ? 'true' : '');
  // }, [authenticated]);
