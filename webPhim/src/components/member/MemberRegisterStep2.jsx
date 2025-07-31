import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../common/AuthContext';
import GHTLogo from '../../assets/GHT_logo.png';

const plans = [
  {
    name: 'Di động',
    quality: 'Khá',
    resolution: '480p',
    price: '74.000 ₫',
    devices: 'Điện thoại di động, máy tính bảng',
    maxWatch: 1,
    maxDownload: 1,
    highlight: false,
    subtitle: '480p',
    features: []
  },
  {
    name: 'Cơ bản',
    quality: 'Tốt',
    resolution: '720p (HD)',
    price: '114.000 ₫',
    devices: 'TV, máy tính, điện thoại di động, máy tính bảng',
    maxWatch: 1,
    maxDownload: 1,
    highlight: false,
    subtitle: '720p',
    features: []
  },
  {
    name: 'Tiêu chuẩn',
    quality: 'Tuyệt vời',
    resolution: '1080p (Full HD)',
    price: '231.000 ₫',
    devices: 'TV, máy tính, điện thoại di động, máy tính bảng',
    maxWatch: 2,
    maxDownload: 2,
    highlight: false,
    subtitle: '1080p',
    features: []
  },
  {
    name: 'Cao cấp',
    quality: 'Tốt nhất',
    resolution: '4K (Ultra HD) + HDR',
    price: '273.000 ₫',
    devices: 'TV, máy tính, điện thoại di động, máy tính bảng',
    maxWatch: 4,
    maxDownload: 4,
    highlight: true,
    subtitle: '4K + HDR',
    features: ['Âm thanh không gian (âm thanh chân thực): Đã bao gồm']
  }
];

const MemberRegisterStep2 = () => {
  const [selected, setSelected] = useState(3); // Mặc định chọn gói Cao cấp
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleNext = () => {
    localStorage.setItem('selectedPlan', JSON.stringify(plans[selected]));
    navigate('/register-member/step-3');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      {/* Navbar giống step 3 */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-200 w-full bg-white">
        <div className="flex items-center">
          <img src={GHTLogo} alt="logo" className="h-8 md:h-10 w-auto object-contain rounded" />
        </div>
        <button
          className="text-base font-semibold text-gray-700 hover:underline px-4 py-2"
          onClick={() => { logout(); navigate('/'); }}
        >
          Đăng xuất
        </button>
      </header>
      {/* Content cũ */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="text-xs text-gray-500 font-semibold mb-2 tracking-widest">BƯỚC 1/3</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Chọn gói dịch vụ phù hợp với bạn</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative flex flex-col h-full min-h-[520px] rounded-2xl border-2 p-7 shadow-xl transition-all duration-200 cursor-pointer select-none
                ${selected === idx ? 'border-red-600 ring-2 ring-red-400 scale-105 z-10' : 'border-gray-200 hover:border-red-400'}
                ${plan.highlight ? 'bg-gradient-to-br from-blue-100 via-purple-100 to-white' : 'bg-white'}`}
              onClick={() => setSelected(idx)}
              style={{ boxShadow: selected === idx ? '0 8px 32px 0 rgba(255,0,0,0.15)' : '0 2px 8px 0 rgba(0,0,0,0.06)' }}
            >
              {plan.highlight && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-6 py-2 rounded-t-2xl shadow-lg tracking-wider">Phổ biến nhất</div>
              )}
              <div className={`text-2xl font-bold mb-1 text-center ${plan.highlight ? 'text-white bg-gradient-to-r from-blue-700 to-red-500 px-4 py-2 rounded-t-lg shadow' : 'text-blue-900'}`}>{plan.name}</div>
              <div className="text-base font-semibold mb-4 text-center text-gray-600">{plan.subtitle}</div>
              <div className="flex-1 flex flex-col justify-center gap-2">
                <div className="mb-1 text-gray-700"><span className="font-semibold">Giá hàng tháng</span><br /><span className="text-lg font-bold">{plan.price}</span></div>
                <div className="mb-1 text-gray-700"><span className="font-semibold">Chất lượng hình và âm</span><br />{plan.quality}</div>
                <div className="mb-1 text-gray-700"><span className="font-semibold">Độ phân giải</span><br />{plan.resolution}</div>
                {plan.features && plan.features.length > 0 && (
                  <div className="mb-1 text-gray-700"><span className="font-semibold">Âm thanh không gian</span><br />{plan.features[0]}</div>
                )}
                <div className="mb-1 text-gray-700"><span className="font-semibold">Thiết bị được hỗ trợ</span><br />{plan.devices}</div>
                <div className="mb-1 text-gray-700"><span className="font-semibold">Số thiết bị gia đình bạn có thể xem cùng lúc</span><br />{plan.maxWatch}</div>
                <div className="mb-1 text-gray-700"><span className="font-semibold">Số thiết bị được tải xuống</span><br />{plan.maxDownload}</div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-4 transition-all duration-200 text-2xl font-bold shadow-lg
                    ${selected === idx ? 'bg-red-600 border-red-600 text-white scale-110' : 'bg-white border-gray-300 text-red-600 hover:bg-red-50 hover:border-red-400'}`}
                  aria-label={`Chọn gói ${plan.name}`}
                  tabIndex={-1}
                  type="button"
                >
                  {selected === idx ? (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <button
            className="bg-red-600 text-white py-4 px-16 rounded-2xl text-2xl font-bold hover:bg-red-700 transition shadow-xl tracking-wide"
            onClick={handleNext}
          >
            Tiếp theo
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberRegisterStep2; 