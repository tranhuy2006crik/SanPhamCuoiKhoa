import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../common/AuthContext';
import GHTLogo from '../../assets/GHT_logo.png';

const MemberRegisterStep1 = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-200">
        <div className="flex items-center">
          <img src={GHTLogo} alt="logo" className="h-8 md:h-10 w-auto object-contain rounded" />
        </div>
        <button
          className="text-lg font-semibold text-gray-700 hover:underline"
          onClick={() => { logout(); navigate('/'); }}
        >
          Đăng xuất
        </button>
      </header>
      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-xl w-full flex flex-col items-center">
          <div className="flex flex-col items-center mb-8">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-red-500 mb-4">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </span>
            <div className="text-xs text-gray-500 font-semibold mb-2 tracking-widest">BƯỚC 1/3</div>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-900">Chọn gói dịch vụ của bạn.</h1>
          </div>
          <ul className="text-lg text-gray-800 space-y-4 mb-8 w-full max-w-md">
            <li className="flex items-start gap-2">
              <svg className="w-6 h-6 text-red-500 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              <span>Không yêu cầu cam kết, hủy bất kỳ lúc nào.</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-6 h-6 text-red-500 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              <span>Mọi thứ trên GHT chỉ với mức giá thấp.</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-6 h-6 text-red-500 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              <span>Không quảng cáo, không phụ phí. Luôn luôn như vậy.</span>
            </li>
          </ul>
          <button
            className="w-full bg-red-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-red-700 transition mb-2"
            onClick={() => navigate('/register-member/step-2')}
          >
            Tiếp theo
          </button>
        </div>
      </main>
    </div>
  );
};

export default MemberRegisterStep1; 