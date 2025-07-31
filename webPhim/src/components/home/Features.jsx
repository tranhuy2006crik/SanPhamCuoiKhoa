import React from 'react';

const Features = () => {
  const features = [
    {
      title: 'Thưởng thức trên TV của bạn',
      description: 'Xem trên TV thông minh, Playstation, Xbox, Chromecast, Apple TV, đầu phát Blu-ray và nhiều thiết bị khác.',
      image: 'https://cdn.tgdd.vn/Files/2016/01/09/769224/netflix-la-gi-8.jpg'
    },
    {
      title: 'Tải xuống nội dung để xem ngoại tuyến',
      description: 'Lưu lại những nội dung yêu thích một cách dễ dàng và luôn có thứ để xem.',
      image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2016_12_9_636168786533028571_netflix-download-offline-fptshop-08.jpg'
    },
    {
      title: 'Xem ở mọi nơi',
      description: 'Phát trực tuyến không giới hạn phim và chương trình truyền hình trên điện thoại, máy tính bảng, máy tính xách tay và TV.',
      image: 'https://cafebiz.cafebizcdn.vn/162123310254002176/2021/11/19/photo-1-16373103150242042586494.jpg'
    }
  ];

  return (
    <div className="bg-black text-white py-16">
      {features.map((feature, index) => (
        <div 
          key={index}
          className={`flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-12 ${
            index % 2 === 1 ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{feature.title}</h2>
            <p className="text-lg md:text-2xl">{feature.description}</p>
          </div>
          <div className="flex-1 relative flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-[16/10] group">
              <img 
                src={feature.image} 
                alt={feature.title}
                className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white/20 group-hover:scale-105 group-hover:shadow-3xl group-hover:border-white/40 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/20 transition-all duration-300 pointer-events-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;