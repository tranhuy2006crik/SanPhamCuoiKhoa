import React from 'react';

export default function MemberSuccessModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Đăng kí gói hội viên thành công!</h2>
        <p className="mb-6 text-gray-700">Chúc mừng bạn đã trở thành hội viên. Hãy truy cập kho phim ngay!</p>
        <button
          className="bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition"
          onClick={onClose}
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
} 