import React, { useState, useRef, useCallback, useContext } from 'react';
import Button from '../common/Button';
import { AuthContext } from '../common/AuthContext';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [inputEmail, setInputEmail] = useState('');
  const inputRef = useRef(null);
  const { setEmail, isAuthenticated, userInfo, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStart = useCallback(() => {
    if (inputEmail.trim()) {
      setEmail(inputEmail.trim());
      navigate('/auth');
    } else {
      inputRef.current && inputRef.current.focus();
    }
  }, [inputEmail, setEmail, navigate]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  }, [handleStart]);

  return (
    <div className="relative min-h-screen w-full">
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/hero-bg.jpg")',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold max-w-4xl mb-4">
          Chương trình truyền hình, phim không giới hạn và nhiều nội dung khác
        </h1>
        <h2 className="text-2xl md:text-3xl mb-8">
          Xem ở mọi nơi. Hủy bất kỳ lúc nào.
        </h2>
        <div className="max-w-3xl mx-auto w-full">
          {!isAuthenticated && (
            <p className="text-xl mb-4">
              Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách thành viên của bạn.
            </p>
          )}
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
              <input
                ref={inputRef}
                type="email"
                placeholder="Địa chỉ email"
                className="flex-1 px-4 py-4 text-black text-lg rounded-md min-w-[300px]"
                value={inputEmail}
                onChange={e => setInputEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button variant="primary" className="py-4 px-8 text-lg" onClick={handleStart}>
                Bắt đầu
              </Button>
            </div>
          )}
          {isAuthenticated && userInfo && userInfo.isMember !== true && (
            <Button
              variant="primary"
              className="py-4 px-8 text-lg mt-6 bg-gradient-to-r from-red-600 to-red-400 hover:scale-105 transition-transform duration-150 font-bold shadow"
              onClick={() => {
                // Chuyển hướng sang trang đăng ký hội viên
                window.location.href = '/register-member';
              }}
            >
              Đăng ký hội viên
            </Button>
          )}
          {isAuthenticated && userInfo && userInfo.isMember === true && (
            <Button
              variant="primary"
              className="py-4 px-8 text-lg mt-6 bg-gradient-to-r from-green-600 to-green-400 hover:scale-105 transition-transform duration-150 font-bold shadow"
              onClick={() => {
                // Chuyển hướng sang kho phim
                window.location.href = '/movies';
              }}
            >
              Truy cập vào kho phim
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;