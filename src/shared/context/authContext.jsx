import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Estado del usuario (null = no autenticado)

  const login = (userData) => {
    // Implementar lógica de autenticación (por ejemplo, llamar a un endpoint /login)
    setUser(userData);
  };

  const logout = () => {
    // Implementar lógica de cierre de sesión
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}