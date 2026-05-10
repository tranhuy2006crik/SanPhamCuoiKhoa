import React, { useRef, useState, useEffect } from 'react';

const ListMovie = ({ onMovieClick }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/movies?limit=10');
        const data = await response.json();
        setMovies(data.movies || []); // Cập nhật lấy từ data.movies
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 220; // px
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="py-8 relative">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 px-4">Trending now</h2>
      <div className="relative">
        {/* Nút sang trái */}
        <button
          className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-32 bg-black/60 hover:bg-white/20 text-white hover:text-red-600 text-5xl rounded-r-xl transition-all duration-200 focus:outline-none shadow-lg"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          &#10094;
        </button>
        {/* Nút sang phải */}
        <button
          className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-32 bg-black/60 hover:bg-white/20 text-white hover:text-red-600 text-5xl rounded-l-xl transition-all duration-200 focus:outline-none shadow-lg"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          &#10095;
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-2 px-4 scroll-smooth custom-hide-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {movies.map((movie, idx) => (
            <div
              key={movie._id || movie.id || movie.title}
              className="relative min-w-[180px] max-w-[200px] flex-shrink-0 group cursor-pointer"
              onClick={() => onMovieClick && onMovieClick(movie)}
            >
              {/* Poster */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-300">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[260px] object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/200x300/262626/cccccc?text=${encodeURIComponent(movie.title)}`;
                  }}
                />
                {/* Overlay khi hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                {/* Logo Netflix góc trên trái */}
                {/* <img
                  src="/netflix-logo.svg"
                  alt="Netflix"
                  className="absolute top-2 left-2 w-7 h-7 drop-shadow"
                /> */}
                {/* Số thứ tự lớn góc dưới trái */}
                <span className="absolute bottom-2 left-2 text-white text-6xl font-extrabold drop-shadow-xl select-none"
                  style={{ WebkitTextStroke: '2px #fff', color: '#111', textShadow: '2px 2px 8px #000, 0 0 2px #fff' }}
                >
                  {idx + 1}
                </span>
              </div>
              {/* Tên phim */}
              <div className="mt-2 text-white text-base font-semibold text-center truncate max-w-[180px] mx-auto">
                {movie.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* CSS ẩn scrollbar cho mọi trình duyệt */}
      <style>{`
        .custom-hide-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }
        .custom-hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Webkit */
        }
      `}</style>
    </div>
  );
};

export default ListMovie; 