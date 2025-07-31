import React, { useMemo, useState } from 'react';
import MovieCard from './MovieCard';
import db from '../../ultis/db.json';
import GHTLogo from '../../assets/GHT_logo.png';
import { useNavigate } from 'react-router-dom';
import MovieDetailModal from './MovieDetailModal';

export default function MoviesPage() {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  // Lấy danh sách phim từ db.json
  const movies = db.movies || [];
  // Sắp xếp top 10 theo totalrating giảm dần
  const top10 = useMemo(() => [...movies].sort((a, b) => b.totalrating - a.totalrating).slice(0, 10), [movies]);
  const rest = useMemo(() => movies.filter(m => !top10.includes(m)), [movies, top10]);

  return (
    <div className="min-h-screen bg-black text-white px-4 pb-10">
      <MovieDetailModal open={!!selectedMovie} movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      <div className="flex items-center justify-center gap-4 my-8 relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition"
          onClick={() => navigate('/')}
        >
          Trở về
        </button>
        <img src={GHTLogo} alt="logo" className="h-10 w-auto object-contain rounded" />
        <h1 className="text-3xl font-bold text-red-600">Kho phim</h1>
      </div>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Top 10 chương trình truyền hình tại Việt Nam hôm nay</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {top10.map((movie, idx) => (
            <MovieCard key={movie.id} movie={movie} rank={idx + 1} onClick={setSelectedMovie} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Tất cả phim</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {rest.map(movie => (
            <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
          ))}
        </div>
      </section>
    </div>
  );
} 