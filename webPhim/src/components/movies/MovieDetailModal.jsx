import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MovieDetailModal({ open, movie, onClose }) {
  const navigate = useNavigate();
  if (!open || !movie) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative bg-[#181818] rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden">
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
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
        {/* Nội dung */}
        <div className="p-6 pt-4 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow">{movie.title}</h2>
          {movie.originalTitle && (
            <div className="text-lg text-gray-300 mb-2 italic">{movie.originalTitle}</div>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-gray-700 rounded px-2 py-1 text-xs font-semibold">{new Date(movie.releaseDate).getFullYear()}</span>
            {movie.age && <span className="bg-gray-700 rounded px-2 py-1 text-xs font-semibold">{movie.age}</span>}
            {movie.type && <span className="bg-gray-700 rounded px-2 py-1 text-xs font-semibold">{movie.type}</span>}
            {movie.genres && movie.genres.split(',').map(g => (
              <span key={g.trim()} className="bg-gray-700 rounded px-2 py-1 text-xs font-semibold">{g.trim()}</span>
            ))}
          </div>
          <p className="mb-6 text-gray-200 text-base leading-relaxed">{movie.description}</p>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold text-lg flex items-center gap-2 shadow"
            onClick={() => {
              onClose();
              navigate(`/movies/${movie.id}`);
            }}
          >
            Bắt đầu <span className="text-xl">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
} 