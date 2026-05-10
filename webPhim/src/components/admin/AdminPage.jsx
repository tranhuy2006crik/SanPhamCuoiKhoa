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
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' or 'movies'
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    image: '',
    videoUrl: '',
    genres: '',
    releaseDate: new Date().toISOString().split('T')[0],
    duration: 120,
    rating: 0
  });

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000); // Tự động cập nhật mỗi 5 giây
    return () => clearInterval(interval);
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/member-requests');
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin', { replace: true });
  };

  const handleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/member-requests/${id}/approve`, {
        method: 'PUT',
      });

      if (response.ok) {
        setRequests(prev => prev.filter(r => (r._id || r.id) !== id));
        setSelected(prev => prev.filter(i => i !== id));
        alert('Đã duyệt hội viên thành công!');
      } else {
        const data = await response.json();
        alert(data.message || 'Duyệt thất bại');
      }
    } catch (error) {
      console.error('Approve error:', error);
      alert('Lỗi kết nối server');
    }
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newMovie)
      });

      if (response.ok) {
        alert('Thêm phim thành công!');
        setNewMovie({
          title: '',
          description: '',
          image: '',
          videoUrl: '',
          genres: '',
          releaseDate: new Date().toISOString().split('T')[0],
          duration: 120,
          rating: 0
        });
      } else {
        const data = await response.json();
        alert(data.message || 'Thêm phim thất bại');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-8">
          <img src={GHTLogo} alt="logo" className="h-8 md:h-10 w-auto object-contain rounded" />
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-2 font-semibold transition ${activeTab === 'requests' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-red-400'}`}
            >
              Yêu cầu hội viên
            </button>
            <button
              onClick={() => setActiveTab('movies')}
              className={`px-4 py-2 font-semibold transition ${activeTab === 'movies' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-red-400'}`}
            >
              Quản lý phim
            </button>
          </nav>
        </div>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
          onClick={handleLogout}
        >
          Đăng xuất Admin
        </button>
      </header>

      <div className="max-w-4xl mx-auto py-12 px-4">
        {activeTab === 'requests' ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Duyệt yêu cầu hội viên</h1>
            <div className="bg-white rounded-xl shadow-lg p-6">
              {requests.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Không có yêu cầu nào đang chờ duyệt.</p>
              ) : (
                <div className="overflow-x-auto">
                  <div className="flex justify-end mb-4">
                    <button
                      type="button"
                      className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50"
                      disabled={selected.length === 0}
                      onClick={() => selected.forEach(id => handleApprove(id))}
                    >
                      Đồng ý tất cả ({selected.length})
                    </button>
                  </div>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-center">Chọn</th>
                        <th className="py-3 px-6">Người dùng</th>
                        <th className="py-3 px-6">Gói hội viên</th>
                        <th className="py-3 px-6 text-center">Hành động</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {requests.map((req) => (
                        <tr key={req._id || req.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                          <td className="py-3 px-6 text-center">
                            <input
                              type="checkbox"
                              checked={selected.includes(req._id || req.id)}
                              onChange={() => handleSelect(req._id || req.id)}
                              className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                            />
                          </td>
                          <td className="py-3 px-6">
                            <div className="font-medium text-gray-900">{req.name}</div>
                            <div className="text-xs text-gray-500">{req.email}</div>
                          </td>
                          <td className="py-3 px-6">
                            <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-xs font-bold">
                              {req.plan}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <button
                              type="button"
                              className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 font-bold transition"
                              onClick={() => handleApprove(req._id || req.id)}
                            >
                              Duyệt
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Thêm phim mới</h1>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleAddMovie} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tên phim</label>
                  <input
                    required
                    type="text"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Nhập tên phim..."
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Thể loại</label>
                  <input
                    required
                    type="text"
                    value={newMovie.genres}
                    onChange={(e) => setNewMovie({ ...newMovie, genres: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Action, Comedy..."
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả</label>
                  <textarea
                    required
                    rows="3"
                    value={newMovie.description}
                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Nhập mô tả phim..."
                  ></textarea>
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Link ảnh (URL)</label>
                  <input
                    required
                    type="text"
                    value={newMovie.image}
                    onChange={(e) => setNewMovie({ ...newMovie, image: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="https://..."
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Link Video (YouTube/MP4)</label>
                  <input
                    required
                    type="text"
                    value={newMovie.videoUrl}
                    onChange={(e) => setNewMovie({ ...newMovie, videoUrl: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="https://..."
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Ngày phát hành</label>
                  <input
                    required
                    type="date"
                    value={newMovie.releaseDate}
                    onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Thời lượng (phút)</label>
                  <input
                    required
                    type="number"
                    value={newMovie.duration}
                    onChange={(e) => setNewMovie({ ...newMovie, duration: parseInt(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="col-span-2 mt-4">
                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition shadow-md"
                  >
                    Thêm phim vào hệ thống
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
