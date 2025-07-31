import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import db from '../../ultis/db.json';

function getYoutubeEmbedUrl(url) {
  if (!url) return '';
  if (url.includes('youtube.com/watch')) {
    return url.replace('watch?v=', 'embed/').split('&')[0];
  }
  if (url.includes('youtu.be/')) {
    const match = url.match(/youtu\.be\/([\w-]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

export default function MoviePlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = db.movies.find(m => m.id === id);

  if (!movie) return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div>
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy phim!</h2>
        <button className="bg-red-600 px-4 py-2 rounded" onClick={() => navigate('/movies')}>Về kho phim</button>
      </div>
    </div>
  );

  // Kiểm tra videoUrl là mp4 hay YouTube
  const isYoutube = movie.videoUrl && (movie.videoUrl.includes('youtube.com') || movie.videoUrl.includes('youtu.be/'));

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-2 pb-10">
      <div className="w-full max-w-3xl mt-8">
        <button className="mb-4 bg-gray-800 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition" onClick={() => navigate('/movies')}>Trở về kho phim</button>
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden mb-6 shadow-lg">
          {isYoutube ? (
            <iframe
              width="100%"
              height="100%"
              src={getYoutubeEmbedUrl(movie.videoUrl)}
              title={movie.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={movie.videoUrl}
              controls
              className="w-full h-full bg-black"
              poster={movie.image}
            />
          )}
        </div>
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <div className="text-gray-400 mb-4">{movie.genres} • {new Date(movie.releaseDate).getFullYear()}</div>
        <p className="text-base text-gray-200 mb-8">{movie.description}</p>
      </div>
    </div>
  );
} 