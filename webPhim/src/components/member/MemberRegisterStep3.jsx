import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../common/AuthContext';

const MemberRegisterStep3 = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    // Lấy email user hiện tại từ localStorage (đồng bộ với AuthContext)
    const email = localStorage.getItem('email');
    if (!email) return;

    // Hàm kiểm tra trạng thái duyệt
    const checkApproved = () => {
      // Kiểm tra flag member_approved_success
      const approvedEmail = localStorage.getItem('member_approved_success');
      if (approvedEmail === email) {
        setApproved(true);
        // Xóa flag để tránh lặp lại
        localStorage.removeItem('member_approved_success');
      }
    };

    // Kiểm tra ngay khi mount
    checkApproved();

    // Lắng nghe sự kiện storage
    const handleStorage = (e) => {
      if (e.key === 'member_approved_success') {
        checkApproved();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  useEffect(() => {
    if (approved) {
      alert('Đăng ký hội viên thành công!');
      navigate('/'); // Chuyển sang HomePage
    }
  }, [approved, navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-200">
        <div className="flex items-center">
          {/* <span className="text-5xl font-extrabold text-red-600 tracking-tight select-none">NETFLIX</span> */}
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
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-red-500 mb-4 bg-white">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
              <rect x="9" y="10" width="6" height="6" rx="3" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v-2a4 4 0 00-8 0v2" />
            </svg>
          </span>
          <div className="text-xs text-gray-500 font-semibold mb-2 tracking-widest">BƯỚC 3/3</div>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-900">Chọn cách thanh toán</h1>
          <p className="text-center text-gray-700 mb-2">Quá trình thanh toán của bạn được mã hóa và bạn có thể thay đổi cách thanh toán bất kỳ lúc nào.</p>
          <div className="text-center text-black font-semibold mb-6">
            <span>An toàn để an tâm.<br />Hủy trực tuyến dễ dàng.</span>
          </div>
          <div className="w-full max-w-lg space-y-4">
            <div className="relative flex items-center justify-between bg-white border rounded-xl px-6 py-5 shadow hover:border-red-500 cursor-pointer transition group"
              onClick={() => navigate('/register-member/creditcard')}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-lg">Thẻ ghi nợ hoặc thẻ tín dụng</span>
                <span className="flex gap-1 ml-2">
                  <img src="/images/visa.png" alt="Visa" className="h-6 w-10 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 w-10 object-contain" />
                </span>
              </div>
              {/* <span className="absolute right-4 top-4 text-yellow-500 text-xs flex items-center gap-1">
                Mã hóa đầu cuối
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11V7a4 4 0 10-8 0v4m16 0V7a4 4 0 10-8 0v4m-4 4h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </span> */}
              <span className="absolute right-4 bottom-4 text-gray-400 group-hover:text-red-500 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <div className="relative flex items-center justify-between bg-white border rounded-xl px-6 py-5 shadow hover:border-red-500 cursor-pointer transition group"
              onClick={() => navigate('/register-member/momo')}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-lg">Ví điện tử</span>
                <span className="flex gap-1 ml-2">
                  <img src="/images/momo.webp" alt="Momo" className="h-7 w-14 object-contain" />
                </span>
              </div>
              <span className="absolute right-4 bottom-4 text-gray-400 group-hover:text-red-500 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <div className="relative flex items-center justify-between bg-white border rounded-xl px-6 py-5 shadow hover:border-red-500 cursor-pointer transition group"
              onClick={() => alert('Chức năng đang được phát triển')}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-lg">Thanh toán qua mã QR</span>
                <span className="flex gap-1 ml-2">
                  <svg className="h-8 w-8 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
                    <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
                    <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M7 17h.01M17 7h.01M17 17h.01M7 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <span className="absolute right-4 bottom-4 text-gray-400 group-hover:text-red-500 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemberRegisterStep3; 