import React, { useRef } from 'react';

// Dữ liệu mẫu 10 phim hot nhất
const movies = [
  {
    title: 'Squid Game',
    image: 'https://daknong.1cdn.vn/2025/06/23/gioi-thieu-phim-squid-game-mua-3.jpg',
  },
  {
    title: 'Mercy for None',
    image: 'https://upload.wikimedia.org/wikipedia/en/3/31/Mercy_for_None_poster.png',
  },
  {
    title: 'KPOP DEMON HUNTERS',
    image: 'https://i.scdn.co/image/ab67616d0000b2734dcb6c5df15cf74596ab25a4',
  },
  {
    title: 'The Old Guard 2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUFXZx9DOfawxQcow1lB5voZxX50Ae-1jOIw&s',
  },
  {
    title: 'When Life Gives You Tangerines',
    image: 'https://resizing.flixster.com/KnOT2EMVKPMEcx5J0LONufUM36k=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p29596685_b_h9_aa.jpg',
  },
  {
    title: 'Mai',
    image: 'https://baoapbac.vn/dataimages/202402/original/images1932115_422890436_981103440046592_2953485654680463176_n_860__1_.jpg',
  },
  {
    title: 'Ziam',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRStJ3ZayX8Tr-1ru6n6Akpwt6T6hC07WKXTw&s',
  },
  {
    title: 'Hoa thơm kiêu hãnh',
    image: 'https://p16-sg.tiktokcdn.com/obj/tos-alisg-avt-0068/7d920378114431a66ad7dd3846cf9991',
  },
  {
    title: 'Trung tâm chăm sóc chấn thương',
    image: 'https://bazaarvietnam.vn/wp-content/uploads/2025/01/harper-bazaar-review-trung-tam-cham-soc-chan-thuong-the-trauma-code-heroes-on-call-4-e1737891377812.jpg',
  },
  {
    title: 'Một Seoul chưa biết đến',
    image: 'https://bazaarvietnam.vn/wp-content/uploads/2025/05/harper-bazaar-review-phim-mot-seoul-chua-biet-den-our-unwritten-seoul-1-e1748171333829.jpeg',
  },
];

const ListMovie = () => {
  const scrollRef = useRef(null);

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
              key={movie.title}
              className="relative min-w-[180px] max-w-[200px] flex-shrink-0 group"
            >
              {/* Poster */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-300">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[260px] object-cover"
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