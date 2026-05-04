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

  // Hàm đăng nhập
  const login = useCallback(async (inputEmail, inputPassword) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: inputEmail, password: inputPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmail(data.user.email);
        setIsAuthenticated(true);
        setUserInfo(data.user);
        setRole(data.user.role || 'user');
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        localStorage.setItem('role', data.user.role || 'user');
        return true;
      } else {
        alert(data.message || 'Đăng nhập thất bại');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Lỗi kết nối server');
      return false;
    }
  }, []);

  // Hàm đăng ký
  const register = useCallback(async (inputUsername, inputEmail, inputPassword) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: inputUsername, 
          email: inputEmail, 
          password: inputPassword 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        return true;
      } else {
        alert(data.message || 'Đăng ký thất bại');
        return false;
      }
    } catch (error) {
      console.error('Register error:', error);
      alert('Lỗi kết nối server');
      return false;
    }
  }, []);

  // Hàm đăng xuất
  const logout = useCallback(async () => {
    try {
      const userId = userInfo?.id || userInfo?._id;
      if (userId) {
        await fetch('http://localhost:3000/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }

    setEmail('');
    setIsAuthenticated(false);
    setUserInfo(null);
    setRole('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('role');
  }, [userInfo]);

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