import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../common/AuthContext';

export default function MovieDetailModal({ open, movie, onClose }) {
  const navigate = useNavigate();
  const { isAuthenticated, userInfo, setUserInfo } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (open && movie) {
      fetchReviews();
      if (userInfo && userInfo.favorites) {
        setIsFavorite(userInfo.favorites.includes(movie._id || movie.id));
      }
    }
  }, [open, movie, userInfo]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/reviews/${movie._id || movie.id}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) return alert('Vui lòng đăng nhập để sử dụng tính năng này');
    try {
      const response = await fetch('http://localhost:3000/api/users/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ movieId: movie._id || movie.id })
      });
      const data = await response.json();
      if (response.ok) {
        const updatedUser = { ...userInfo, favorites: data.favorites };
        setUserInfo(updatedUser);
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        setIsFavorite(data.favorites.includes(movie._id || movie.id));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return alert('Vui lòng đăng nhập để đánh giá');
    if (userRating === 0) return alert('Vui lòng chọn số sao');

    try {
      const response = await fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          movieId: movie._id || movie.id,
          rating: userRating,
          comment: userComment
        })
      });

      if (response.ok) {
        alert('Cảm ơn bạn đã đánh giá!');
        setUserRating(0);
        setUserComment('');
        fetchReviews();
      } else {
        const data = await response.json();
        alert(data.message || 'Đánh giá thất bại');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!open || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 overflow-y-auto">
      <div className="relative bg-[#181818] rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden my-auto">
        {/* Nút đóng */}
        <button
          className="absolute top-4 right-4 text-3xl text-white hover:text-red-500 z-10"
          onClick={onClose}
          aria-label="Đóng"
        >
          &times;
        </button>
        {/* Ảnh lớn */}
        <div className="relative w-full h-64 md:h-80 overflow-hidden">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://via.placeholder.com/600x400?text=No+Poster';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
        {/* Nội dung */}
        <div className="p-6 pt-4 text-white max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-3xl md:text-4xl font-bold drop-shadow">{movie.title}</h2>
            <button
              onClick={handleToggleFavorite}
              className={`text-2xl transition ${isFavorite ? 'text-red-600' : 'text-gray-400 hover:text-red-400'}`}
              title={isFavorite ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
          <div className="flex items-center gap-2 mb-4 text-yellow-500">
            <span className="text-xl">★</span>
            <span className="font-bold">{movie.rating || '0.0'}</span>
            <span className="text-gray-400 text-sm">({movie.totalrating || 0} đánh giá)</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-gray-700 rounded px-2 py-1 text-xs font-semibold">{new Date(movie.releaseDate).getFullYear()}</span>
            {movie.genres && movie.genres.split(',').map(g => (
              <span key={g.trim()} className="bg-gray-700 rounded px-2 py-1 text-xs font-semibold">{g.trim()}</span>
            ))}
          </div>
          <p className="mb-6 text-gray-200 text-base leading-relaxed">{movie.description}</p>
          
          <div className="flex gap-4 mb-8">
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold text-lg flex items-center gap-2 shadow"
              onClick={() => {
                onClose();
                navigate(`/movies/${movie._id || movie.id}`);
              }}
            >
              Bắt đầu <span className="text-xl">&rarr;</span>
            </button>
          </div>

          {/* Đánh giá phim */}
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold mb-4">Đánh giá phim</h3>
            {isAuthenticated ? (
              <form onSubmit={handleSubmitReview} className="mb-6 bg-gray-800 p-4 rounded-lg">
                <div className="flex gap-2 mb-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className={`text-xl transition ${userRating >= star ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="Để lại cảm nhận của bạn về bộ phim..."
                  className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 mb-3"
                  rows="3"
                ></textarea>
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold">Gửi đánh giá</button>
              </form>
            ) : (
              <p className="text-gray-400 mb-6">Đăng nhập để đánh giá phim.</p>
            )}

            <div className="space-y-4">
              {reviews.length > 0 ? reviews.map(review => (
                <div key={review._id} className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-red-400">{review.userId?.username}</span>
                    <span className="text-yellow-500">★ {review.rating}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{review.comment}</p>
                  <span className="text-gray-500 text-[10px]">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
              )) : (
                <p className="text-gray-500 italic text-sm">Chưa có đánh giá nào.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}