// src/components/home/HomePage.jsx
import React, { useContext, useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import ListMovie from './ListMovie';
import Features from './Features';
import FAQ from './FAQ';
import Footer from './Footer';
import { AuthContext } from '../common/AuthContext';

const HomePage = () => {
  const { isAuthenticated, userInfo, setUserInfo } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated && userInfo && userInfo.email) {
      // Lấy user mới nhất từ localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUser = users.find(u => u.email === userInfo.email);
      if (updatedUser && JSON.stringify(updatedUser) !== JSON.stringify(userInfo)) {
        setUserInfo(updatedUser);
      }
    }
  }, [isAuthenticated, userInfo, setUserInfo]);

  const handleRegisterMember = () => {
    // Chuyển hướng sang trang đăng ký hội viên
    window.location.href = '/register-member';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm">
          <div className="bg-[#181818] border-2 border-green-600 text-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative animate-fadeIn">
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-600 bg-opacity-20">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-extrabold mb-3 text-green-500 drop-shadow">Đăng ký hội viên thành công!</h2>
            <p className="mb-6 text-gray-200">Bạn đã trở thành hội viên. Hãy trải nghiệm kho phim ngay!</p>
          </div>
        </div>
      )}
      <Hero />
      <ListMovie />
      <Features />
      <FAQ />
      <Footer />
      {/* Modal hội viên */}
      {isAuthenticated && userInfo && userInfo.isMember === false && showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm">
          <div className="bg-[#181818] border-2 border-red-600 text-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative animate-fadeIn">
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-600 bg-opacity-20">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-extrabold mb-3 text-red-500 drop-shadow">Đăng ký hội viên</h2>
            <p className="mb-6 text-gray-200">Bạn cần đăng ký gói hội viên để tiếp tục sử dụng đầy đủ các tính năng của trang web.</p>
            <button
              className="bg-gradient-to-r from-red-600 to-red-400 text-white px-5 py-2 rounded-lg shadow font-bold text-lg mb-2 w-full hover:scale-105 transition-transform duration-150"
              onClick={handleRegisterMember}
            >
              Đăng ký hội viên ngay
            </button>
            <button
              className="text-gray-400 hover:text-white hover:underline mt-3 w-full transition-colors"
              onClick={() => setShowModal(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(HomePage);