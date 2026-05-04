import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import GHTLogo from '../../assets/GHT_logo.png';
import { useNavigate } from 'react-router-dom';
import MovieDetailModal from './MovieDetailModal';

export default function MoviesPage() {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genre, setGenre] = useState('');
  const [search, setSearch] = useState('');

  // Fetch Trending Movies (Global Top 10) - Chỉ fetch 1 lần khi component mount
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/movies?limit=10&sort=totalrating');
        const data = await response.json();
        setTrendingMovies(data.movies || []);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };
    fetchTrending();
  }, []);

  // Fetch Paginated Movies
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/movies?page=${page}&genre=${genre}&search=${search}&limit=12`);
        const data = await response.json();
        setMovies(data.movies || []);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page, genre, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    setPage(1);
  };

  // Chỉ hiển thị Trending ở trang 1 và khi không tìm kiếm/lọc
  const showTrending = page === 1 && !search && !genre;

  return (
    <div className="min-h-screen bg-black text-white px-4 pb-10">
      <MovieDetailModal open={!!selectedMovie} movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-8">
        <div className="flex items-center gap-4">
          <button
            className="bg-gray-800 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition"
            onClick={() => navigate('/')}
          >
            Trở về
          </button>
          <img src={GHTLogo} alt="logo" className="h-10 w-auto object-contain rounded" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            value={search}
            onChange={handleSearchChange}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 w-full sm:w-64"
          />
          <select
            value={genre}
            onChange={handleGenreChange}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer"
          >
            <option value="">Tất cả thể loại</option>
            <option value="Action">Hành động</option>
            <option value="Comedy">Hài hước</option>
            <option value="Drama">Chính kịch</option>
            <option value="Romance">Lãng mạn</option>
            <option value="Horror">Kinh dị</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <>
          {showTrending && trendingMovies.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Trending</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
                {trendingMovies.map((movie, idx) => (
                  <MovieCard key={movie._id || movie.id} movie={movie} rank={idx + 1} onClick={setSelectedMovie} />
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold mb-4">
              {search || genre ? 'Kết quả tìm kiếm' : 'Danh sách phim'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
              {movies.map(movie => (
                <MovieCard key={movie._id || movie.id} movie={movie} onClick={setSelectedMovie} />
              ))}
            </div>
            {movies.length === 0 && (
              <p className="text-center text-gray-500 py-10 italic">Không tìm thấy bộ phim nào phù hợp.</p>
            )}
          </section>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
              className="bg-gray-800 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Trang trước
            </button>
            <span className="text-lg font-semibold">
              Trang {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(prev => prev + 1)}
              className="bg-gray-800 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Trang sau
            </button>
          </div>
        </>
      )}
    </div>
  );
} 