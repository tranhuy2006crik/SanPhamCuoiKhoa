import React, { useState, useRef, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../common/AuthContext';

const EmailEntry = () => {
  const [inputEmail, setInputEmail] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { setEmail } = useContext(AuthContext);

  // Xử lý khi nhấn nút hoặc Enter
  const handleStart = useCallback(() => {
    if (inputEmail.trim()) {
      setEmail(inputEmail.trim());
      navigate('/auth');
    } else {
      inputRef.current.focus();
    }
  }, [inputEmail, setEmail, navigate]);

  // Xử lý phím Enter
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  }, [handleStart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Nhập email để bắt đầu</h2>
        <input
          ref={inputRef}
          type="email"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Nhập email của bạn..."
          value={inputEmail}
          onChange={e => setInputEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          onClick={handleStart}
        >
          Bắt đầu
        </button>
      </div>
    </div>
  );
};

export default React.memo(EmailEntry); 