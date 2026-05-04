import React, { useState, useContext, useCallback, useRef, useEffect } from 'react';
import { AuthContext } from '../common/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const { email, login, register, setEmail, setUserInfo } = useContext(AuthContext);
  const [tab, setTab] = useState('login'); // 'login' hoặc 'register'
  const [registerEmail, setRegisterEmail] = useState(email || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    passwordRef.current && passwordRef.current.focus();
  }, [tab]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 800); // Cho phép hiển thị thông báo ngắn trước khi chuyển trang
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  // Khi chuyển tab, đồng bộ lại email nếu cần
  useEffect(() => {
    if ((tab === 'register' || tab === 'login') && !registerEmail && email) {
      setRegisterEmail(email);
    }
  }, [tab, email]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!registerEmail) {
      setMessage('Vui lòng nhập Email!');
      return;
    }
    if (!password) {
      setMessage('Vui lòng nhập mật khẩu!');
      passwordRef.current.focus();
      return;
    }
    // Lấy danh sách user từ localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (tab === 'register') {
      if (!fullName) {
        setMessage({ text: 'Vui lòng nhập Họ và Tên!', type: 'error' });
        return;
      }
      const success = await register(fullName, registerEmail, password);
      if (success) {
        setMessage({ text: 'Đăng ký thành công! Vui lòng đăng nhập.', type: 'success' });
        setTab('login');
        setPassword('');
        setFullName('');
        setDob('');
      }
      return;
    } else {
      // Đăng nhập: kiểm tra email và password qua Backend
      const success = await login(registerEmail, password);
      if (success) {
        setMessage({ text: 'Đăng nhập thành công!', type: 'success' });
        setSuccess(true);
      }
    }
  }, [registerEmail, password, tab, login, register, fullName, dob, setEmail, setUserInfo]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="bg-[#181818] p-8 rounded shadow-md w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {tab === 'login' ? 'Đăng nhập' : 'Tạo tài khoản mới'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-200">Email</label>
            <input
              type="email"
              value={registerEmail}
              onChange={e => setRegisterEmail(e.target.value)}
              className="w-full p-2 border rounded bg-gray-700 text-gray-300"
              placeholder="Nhập email..."
            />
          </div>
          {tab === 'register' && (
            <>
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-gray-200">Họ và Tên</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full p-2 border rounded bg-gray-700 text-gray-300"
                  placeholder="Nhập họ và tên..."
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold text-gray-200">Ngày sinh</label>
                <input
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  className="w-full p-2 border rounded bg-gray-700 text-gray-300"
                  placeholder="dd/mm/yyyy"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-200">Mật khẩu</label>
            <input
              ref={passwordRef}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 border rounded bg-gray-700 text-gray-300"
              placeholder="Nhập mật khẩu..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition font-semibold text-lg mb-2"
          >
            {tab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>
        {tab === 'login' && (
          <div className="text-center mt-4">
            <span className="text-gray-300">Chưa có tài khoản? </span>
            <button
              className="text-red-400 hover:underline font-semibold"
              onClick={() => { setTab('register'); setMessage(''); }}
              type="button"
            >
              Tạo tài khoản mới
            </button>
          </div>
        )}
        {tab === 'register' && (
          <div className="text-center mt-4">
            <button
              className="text-gray-400 hover:underline font-semibold"
              onClick={() => { setTab('login'); setMessage(''); }}
              type="button"
            >
              Đã có tài khoản? Đăng nhập
            </button>
          </div>
        )}
        {message && (
          <div className={`mt-4 text-center ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(LoginRegister); 