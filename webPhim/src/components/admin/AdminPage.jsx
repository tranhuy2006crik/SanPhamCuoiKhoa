import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../home/Navbar';
import { AdminAuthContext } from '../common/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import GHTLogo from '../../assets/GHT_logo.png';

const AdminPage = () => {
  const { adminInfo, logout } = useContext(AdminAuthContext);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const reqs = JSON.parse(localStorage.getItem('member_requests') || '[]');
    setRequests(reqs.filter(r => r.status === 'pending'));

    // Lắng nghe sự kiện storage để cập nhật real-time
    const handleStorage = (e) => {
      if (e.key === 'member_requests') {
        const updatedReqs = JSON.parse(localStorage.getItem('member_requests') || '[]');
        setRequests(updatedReqs.filter(r => r.status === 'pending'));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin', { replace: true });
  };

  const handleSelect = (email) => {
    setSelected(prev => prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]);
  };

  const handleApprove = (email) => {
    // Cập nhật trạng thái request
    const allRequests = JSON.parse(localStorage.getItem('member_requests') || '[]');
    const idx = allRequests.findIndex(r => r.email === email && r.status === 'pending');
    if (idx !== -1) {
      allRequests[idx].status = 'approved';
      localStorage.setItem('member_requests', JSON.stringify(allRequests));
      // Cập nhật user thành hội viên
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIdx = users.findIndex(u => u.email === email);
      if (userIdx !== -1) {
        users[userIdx].isMember = true;
        localStorage.setItem('users', JSON.stringify(users));
        // Đặt flag thông báo thành công cho user
        localStorage.setItem('member_approved_success', email);
      }
      setRequests(reqs => reqs.filter(r => r.email !== email));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <img src={GHTLogo} alt="logo" className="h-8 md:h-10 w-auto object-contain rounded" />
        </div>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
          onClick={handleLogout}
        >
          Đăng xuất Admin
        </button>
      </header>
      <div className="flex flex-col items-center justify-center min-h-[80vh] pt-24">
        <h1 className="text-3xl font-bold text-red-600 mb-6">Quản lý yêu cầu hội viên</h1>
        <div className="bg-white rounded shadow p-8 w-full max-w-2xl text-center">
          {requests.length === 0 ? (
            <p className="text-gray-500">Không có yêu cầu nào đang chờ duyệt.</p>
          ) : (
            <form>
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50"
                  disabled={selected.length === 0}
                  onClick={() => selected.forEach(email => handleApprove(email))}
                >
                  Đồng ý tất cả
                </button>
              </div>
              <table className="w-full mb-4 border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Chọn</th>
                    <th className="p-2">Tên tài khoản</th>
                    <th className="p-2">Gói hội viên</th>
                    <th className="p-2">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req, idx) => (
                    <tr key={req.email} className="border-t">
                      <td className="p-2">
                        <input type="checkbox" checked={selected.includes(req.email)} onChange={() => handleSelect(req.email)} />
                      </td>
                      <td className="p-2">{req.name}</td>
                      <td className="p-2">{req.plan}</td>
                      <td className="p-2">
                        <button type="button" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => handleApprove(req.email)}>Đồng ý</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
