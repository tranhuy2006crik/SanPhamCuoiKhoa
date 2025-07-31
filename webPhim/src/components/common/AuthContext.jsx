import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';

// Tạo context
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  // Đọc trạng thái từ localStorage khi khởi tạo
  const [email, setEmail] = useState(() => localStorage.getItem('email') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
  const [userInfo, setUserInfo] = useState(() => {
    const info = localStorage.getItem('userInfo');
    return info ? JSON.parse(info) : null;
  });
  const [role, setRole] = useState(() => localStorage.getItem('role') || 'user');

  // Hàm đăng nhập giả lập
  const login = useCallback(async (inputEmail, inputPassword) => {
    setEmail(inputEmail);
    setIsAuthenticated(true);
    localStorage.setItem('email', inputEmail);
    localStorage.setItem('isAuthenticated', 'true');
    // Lấy userInfo từ localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === inputEmail && u.password === inputPassword);
    if (user) {
      setUserInfo(user);
      setRole(user.role || 'user');
      localStorage.setItem('userInfo', JSON.stringify(user));
      localStorage.setItem('role', user.role || 'user');
      return true;
    }
    return false;
  }, []);

  // Hàm đăng ký
  const register = useCallback((inputEmail, inputPassword, inputRole = 'user') => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === inputEmail)) {
      return false; // Email đã tồn tại
    }
    const newUser = { email: inputEmail, password: inputPassword, role: inputRole };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }, []);

  // Hàm đăng xuất
  const logout = useCallback(() => {
    setEmail('');
    setIsAuthenticated(false);
    setUserInfo(null);
    setRole('user');
    localStorage.removeItem('email');
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('role');
  }, []);

  // Hàm setRole cho phép cập nhật role từ bên ngoài
  const setRoleExternal = useCallback((newRole) => {
    setRole(newRole);
    localStorage.setItem('role', newRole);
  }, []);

  // Khi email hoặc isAuthenticated thay đổi (do setEmail trực tiếp), đồng bộ lại localStorage
  useEffect(() => {
    localStorage.setItem('email', email);
    localStorage.setItem('isAuthenticated', isAuthenticated ? 'true' : 'false');
    localStorage.setItem('role', role);
  }, [email, isAuthenticated, role]);

  // Memo hóa giá trị context
  const value = useMemo(() => ({
    email,
    isAuthenticated,
    login,
    logout,
    setEmail,
    userInfo,
    setUserInfo,
    role,
    register,
    setRole: setRoleExternal,
  }), [email, isAuthenticated, login, logout, userInfo, role, register, setRoleExternal]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 