import React from 'react';

export default function MovieCard({ movie, rank, onClick }) {
  return (
    <div
      className="relative bg-[#181818] rounded-lg shadow-lg overflow-hidden group hover:scale-105 transition-transform duration-200 cursor-pointer"
      onClick={() => onClick && onClick(movie)}
    >
      {rank && (
        <div className="absolute left-2 top-2 z-10 text-5xl font-extrabold text-white text-opacity-30 select-none pointer-events-none">
          {rank}
        </div>
      )}
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-60 object-cover object-center group-hover:opacity-80 transition"
      />
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