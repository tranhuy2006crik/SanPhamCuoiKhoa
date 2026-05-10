import React, { createContext, useState, useCallback, useMemo } from 'react';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('admin_isAuthenticated') === 'true');
  const [adminInfo, setAdminInfo] = useState(() => {
    const info = localStorage.getItem('admin_info');
    return info ? JSON.parse(info) : null;
  });

  const login = useCallback((username, password) => {
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      const info = { username, role: 'admin' };
      setAdminInfo(info);
      localStorage.setItem('admin_isAuthenticated', 'true');
      localStorage.setItem('admin_info', JSON.stringify(info));
      
      // Đồng bộ token admin vào localStorage để API backend nhận diện được
      // Trong thực tế nên lấy token từ backend, ở đây ta giả định token là 'admin-token' 
      // hoặc bạn cần đăng nhập bằng tài khoản admin@gmail.com ở trang login user trước
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