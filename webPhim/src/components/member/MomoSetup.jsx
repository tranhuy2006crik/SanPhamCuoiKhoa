import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../common/AuthContext';
import useMemberApprovalListener from './useMemberApprovalListener';
import GHTLogo from '../../assets/GHT_logo.png';

const MomoSetup = () => {
  const { showModal, handleCloseModal, MemberSuccessModal } = useMemberApprovalListener();
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState({ name: 'Cao cấp', price: '273.000 đ/tháng' });
  const navigate = useNavigate();
  const { logout, userInfo, checkStatus } = useContext(AuthContext);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    let interval;
    if (waiting) {
      console.log('Starting polling for member status (Momo)...');
      interval = setInterval(async () => {
        console.log('Polling checkStatus...');
        const isMember = await checkStatus();
        console.log('IsMember status:', isMember);
        
        // Kiểm tra cả flag từ localStorage nếu polling gặp vấn đề cache
        const approvedEmail = localStorage.getItem('member_approved_success');
        const userEmail = localStorage.getItem('email');

        if (isMember === true || (approvedEmail && approvedEmail === userEmail)) {
          console.log('Success! Navigating...');
          clearInterval(interval);
          localStorage.removeItem('member_approved_success');
          alert('Chúc mừng! Admin đã duyệt yêu cầu. Bạn đã trở thành hội viên GHT!');
          navigate('/movies');
        }
      }, 3000);
    }
    return () => {
      if (interval) {
        console.log('Cleaning up polling interval (Momo)');
        clearInterval(interval);
      }
    };
  }, [waiting, checkStatus, navigate]);

  useEffect(() => {
    const stored = localStorage.getItem('selectedPlan');
    if (stored) {
      try {
        setPlan(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // Validate phone: 9 hoặc 10 chữ số, chỉ số
  const validatePhone = (value) => {
    if (!/^\d{9,10}$/.test(value)) {
      return 'Số điện thoại phải gồm 9 hoặc 10 chữ số.';
    }
    return '';
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/[^\d]/g, '').slice(0, 10);
    setPhone(val);
    setError(val ? validatePhone(val) : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validatePhone(phone);
    setError(err);
    if (!err && agree) {
      try {
        const response = await fetch('http://localhost:3000/api/member-requests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userInfo.id || userInfo._id,
            email: userInfo.email,
            name: userInfo.username || userInfo.email,
            plan: plan.name
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setWaiting(true);
        } else {
          alert(data.message || 'Gửi yêu cầu thất bại');
        }
      } catch (error) {
        console.error('Submit request error:', error);
        alert('Lỗi kết nối server');
      }
    }
  };

  if (waiting) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="bg-gray-50 p-10 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto mb-6"></div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Đang chờ duyệt...</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Yêu cầu của bạn đã được gửi tới hệ thống. <br/>
            Vui lòng <strong>không đóng trang này</strong>. <br/>
            Hệ thống sẽ tự động chuyển hướng khi Admin chấp nhận yêu cầu của bạn.
          </p>
          <div className="bg-pink-50 text-pink-600 p-4 rounded-lg text-sm font-medium">
            MoMo: Hệ thống đang xác nhận thanh toán của bạn!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-2">
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
      <div className="w-full max-w-md mx-auto">
        <div className="text-xs text-gray-500 font-semibold mb-2 tracking-widest mt-8">BƯỚC 3/3</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Thiết lập MoMo</h1>
        <img src="/images/momo.webp" alt="MoMo" className="h-8 w-8 mb-4" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
          <p className="text-gray-800 mb-4">Nhập số điện thoại di động MoMo của bạn.</p>
          <p className="text-gray-600 mb-4 text-sm">Chúng tôi cũng sẽ dùng số điện thoại của bạn nếu bạn quên mật khẩu, cũng như để gửi các tin nhắn quan trọng về tài khoản. Bạn có thể phải trả phí tin nhắn SMS.</p>
          <div className="flex items-center border rounded-md px-3 py-2 mb-2 bg-gray-50">
            <span className="flex items-center mr-2">
              <img src="https://flagcdn.com/w20/vn.png" alt="VN" className="w-5 h-5 mr-1" />
              <span className="text-gray-700 font-medium">+84</span>
            </span>
            <input
              type="tel"
              className="flex-1 outline-none bg-transparent text-gray-900 text-base"
              placeholder="Số điện thoại di động"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={10}
            />
          </div>
          {error && <div className="text-red-500 text-xs mb-2 ml-1">{error}</div>}
          <div className="bg-gray-100 rounded-lg px-4 py-3 mb-4 flex items-center justify-between">
            <div>
              <span className="font-bold text-lg">{plan.price}</span>
              <div className="text-gray-500 text-sm">{plan.name}</div>
            </div>
            <button className="text-blue-600 font-semibold text-sm hover:underline" type="button" onClick={() => navigate('/register-member/step-2')}>Thay đổi</button>
          </div>
          <div className="text-xs text-gray-600 mb-4">
            Bằng cách đánh dấu vào hộp kiểm bên dưới, bạn đồng ý với <a href="#" className="text-blue-600 underline">Điều khoản sử dụng</a>, <a href="#" className="text-blue-600 underline">Tuyên bố về quyền riêng tư</a> của chúng tôi, đồng thời xác nhận rằng bạn trên 18 tuổi. Netflix sẽ tự động gia hạn tư cách thành viên của bạn vào phương thức thanh toán của bạn cho đến khi bạn hủy. Bạn có thể hủy bất kỳ lúc nào để tránh bị tính phí về sau.
          </div>
          <div className="flex items-center mb-6">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={e => setAgree(e.target.checked)}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor="agree" className="ml-2 text-gray-700 text-sm">Tôi đồng ý.</label>
          </div>
          <button
            className={`w-full py-4 rounded-md text-white text-xl font-semibold transition ${(agree && !error && phone) ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}
            disabled={!agree || !!error || !phone}
            type="submit"
          >
            Kích hoạt tư cách thành viên
          </button>
        </form>
        <div className="text-center text-gray-600 text-sm mt-6">
          Bạn sẽ được chuyển đến MoMo để hoàn tất việc thanh toán.
        </div>
      </div>
      <MemberSuccessModal open={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default MomoSetup; 