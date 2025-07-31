import React, { useContext, useCallback } from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import Button from '../common/Button';
import { AuthContext } from '../common/AuthContext';
import { useNavigate } from 'react-router-dom';
import GHTLogo from '../../assets/GHT_logo.png';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    navigate('/auth');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-8 py-4">
      <div className="flex items-center">
        <img 
          src={GHTLogo}
          alt="logo"
          className="h-8 md:h-10 w-auto object-contain rounded"
        />
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <GlobalOutlined />
          <span>Tiếng Việt</span>
        </Button>
        {!isAuthenticated && (
          <Button variant="primary" onClick={handleLogin}>
            Đăng nhập
          </Button>
        )}
        {isAuthenticated && (
          <Button variant="primary" onClick={handleLogout}>
            Đăng xuất
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;