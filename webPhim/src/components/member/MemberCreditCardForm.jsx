import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../common/AuthContext';
import useMemberApprovalListener from './useMemberApprovalListener';
import GHTLogo from '../../assets/GHT_logo.png';

const MemberCreditCardForm = () => {
  const { showModal, handleCloseModal, MemberSuccessModal } = useMemberApprovalListener();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [plan, setPlan] = useState({ name: 'Tiêu chuẩn', price: '231.000 đ/tháng' });
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const stored = localStorage.getItem('selectedPlan');
    if (stored) {
      try {
        setPlan(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // Validate helpers
  const validate = () => {
    const errs = {};
    // Card number: 16 digits, allow spaces
    const cardNum = cardNumber.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(cardNum)) {
      errs.cardNumber = 'Số thẻ phải gồm 16 chữ số.';
    }
    // Expiry: MM/YY, MM 01-12, YY 00-99
    if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry)) {
      errs.expiry = 'Định dạng MM/YY, ví dụ: 08/25';
    }
    // CVV: 3 hoặc 4 số
    if (!/^\d{3,4}$/.test(cvv)) {
      errs.cvv = 'CVV phải gồm 3 hoặc 4 chữ số.';
    }
    // Name: not empty
    if (!name.trim()) {
      errs.name = 'Vui lòng nhập tên trên thẻ.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0 && agree) {
      // Gửi request lên admin
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const requests = JSON.parse(localStorage.getItem('member_requests') || '[]');
      // Kiểm tra đã có request chưa
      const existed = requests.find(r => r.email === userInfo.email && r.status === 'pending');
      if (!existed) {
        requests.push({
          email: userInfo.email,
          name: userInfo.fullName || userInfo.username || userInfo.email,
          plan: plan.name,
          status: 'pending'
        });
        localStorage.setItem('member_requests', JSON.stringify(requests));
        alert('Yêu cầu đăng ký hội viên của bạn đã được gửi. Vui lòng chờ admin duyệt!');
      } else {
        alert('Bạn đã gửi yêu cầu đăng ký hội viên và đang chờ duyệt!');
      }
    }
  };

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
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Thiết lập thẻ tín dụng hoặc thẻ ghi nợ</h1>
        <div className="flex gap-2 mb-4 justify-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-7 w-12 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-7 w-12 object-contain" />
         
        </div>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div>
            <input
              type="text"
              className={`w-full border rounded-md px-3 py-3 text-base bg-gray-50 outline-none focus:ring-2 focus:ring-red-400 transition ${errors.cardNumber ? 'border-red-500' : ''}`}
              placeholder="Số thẻ (•••• •••• •••• ••••)"
              value={cardNumber}
              onChange={e => setCardNumber(e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim())}
              maxLength={19}
            />
            {errors.cardNumber && <div className="text-red-500 text-xs mt-1">{errors.cardNumber}</div>}
          </div>
          <div className="flex gap-3">
            <div className="w-1/2">
              <input
                type="text"
                className={`w-full border rounded-md px-3 py-3 text-base bg-gray-50 outline-none focus:ring-2 focus:ring-red-400 transition ${errors.expiry ? 'border-red-500' : ''}`}
                placeholder="MM/YY"
                value={expiry}
                onChange={e => setExpiry(e.target.value.replace(/[^\d/]/g, '').slice(0,5))}
                maxLength={5}
              />
              {errors.expiry && <div className="text-red-500 text-xs mt-1">{errors.expiry}</div>}
            </div>
            <div className="w-1/2">
              <input
                type="text"
                className={`w-full border rounded-md px-3 py-3 text-base bg-gray-50 outline-none focus:ring-2 focus:ring-red-400 transition ${errors.cvv ? 'border-red-500' : ''}`}
                placeholder="CVV"
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/[^\d]/g, '').slice(0,4))}
                maxLength={4}
              />
              {errors.cvv && <div className="text-red-500 text-xs mt-1">{errors.cvv}</div>}
            </div>
          </div>
          <div>
            <input
              type="text"
              className={`w-full border rounded-md px-3 py-3 text-base bg-gray-50 outline-none focus:ring-2 focus:ring-red-400 transition ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Tên trên thẻ (VD: NGUYEN VAN A)"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
          </div>
          <div className="bg-gray-100 rounded-lg px-4 py-3 mb-4 flex items-center justify-between">
            <div>
              <span className="font-bold text-lg">{plan.price}</span>
              <div className="text-gray-500 text-sm">{plan.name}</div>
            </div>
            <button type="button" className="text-blue-600 font-semibold text-sm hover:underline" onClick={() => navigate('/register-member/step-2')}>Thay đổi</button>
          </div>
          <div className="text-xs text-gray-600 mb-4">
            Các khoản thanh toán của bạn sẽ được xử lý ở nước ngoài. Bạn có thể phải trả thêm phí ngân hàng.<br /><br />
            Bằng cách đánh dấu vào hộp kiểm bên dưới, bạn đồng ý với <a href="#" className="text-blue-600 underline">Điều khoản sử dụng</a>, <a href="#" className="text-blue-600 underline">Tuyên bố về quyền riêng tư</a> của chúng tôi, đồng thời xác nhận rằng bạn trên 18 tuổi. Netflix sẽ tự động gia hạn tư cách thành viên của bạn và tính phí thành viên (hiện tại là {plan.price}) vào phương thức thanh toán của bạn cho đến khi bạn hủy. Bạn có thể hủy bất kỳ lúc nào để tránh bị tính phí về sau.
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
            type="submit"
            className={`w-full py-4 rounded-md text-white text-xl font-semibold transition ${(agree && Object.keys(errors).length === 0) ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}
            disabled={!agree || Object.keys(errors).length > 0}
          >
            Kích hoạt tư cách thành viên
          </button>
        </form>
        <div className="text-center text-gray-600 text-sm mt-6">
          Thông tin thẻ của bạn sẽ được bảo mật và xử lý an toàn.
        </div>
      </div>
      <MemberSuccessModal open={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default MemberCreditCardForm; 