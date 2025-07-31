import React, { createContext, useState, useCallback, useMemo } from 'react';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('admin_isAuthenticated') === 'true');
  const [adminInfo, setAdminInfo] = useState(() => {
    const info = localStorage.getItem('admin_info');
    return info ? JSON.parse(info) : null;
  });

  const login = useCallback((username, password) => {
    if (username === 'huytran123' && password === 'Huy12345.,') {
      setIsAuthenticated(true);
      const info = { username, role: 'admin' };
      setAdminInfo(info);
      localStorage.setItem('admin_isAuthenticated', 'true');
      localStorage.setItem('admin_info', JSON.stringify(info));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setAdminInfo(null);
    localStorage.setItem('admin_isAuthenticated', 'false');
    localStorage.removeItem('admin_info');
  }, []);

  const value = useMemo(() => ({
    isAuthenticated,
    adminInfo,
    login,
    logout,
  }), [isAuthenticated, adminInfo, login, logout]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}; 