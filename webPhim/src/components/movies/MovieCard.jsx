import React from 'react';

export default function MovieCard({ movie, rank, onClick }) {
  return (
    <div
      className="relative bg-[#262626] rounded-lg shadow-xl overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-800"
      onClick={() => onClick && onClick(movie)}
    >
      {rank && (
        <div className="absolute left-2 top-0 z-10 text-6xl font-black text-white text-opacity-40 select-none pointer-events-none italic">
          {rank}
        </div>
      )}
      <div className="relative w-full h-64 bg-[#333]">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover object-center group-hover:opacity-90 transition duration-300 block"
          loading="lazy"
          crossOrigin="anonymous"
          onError={(e) => {
            e.target.onerror = null; 
            // Nếu nguồn Wikipedia vẫn lỗi (hiếm), dùng placeholder xám trung tính
            e.target.src = `https://via.placeholder.com/300x450/262626/cccccc?text=${encodeURIComponent(movie.title)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1 truncate">{movie.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
          <span>⭐ {movie.rating}</span>
          <span>• {new Date(movie.releaseDate).getFullYear()}</span>
        </div>
        <div className="text-xs text-gray-400 mb-2 truncate">{movie.genres}</div>
        <p className="text-sm text-gray-300 line-clamp-2">{movie.description}</p>
      </div>
    </div>
  );
} 