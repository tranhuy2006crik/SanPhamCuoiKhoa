import React, { useState, useRef, useCallback, useContext } from 'react';
import { Collapse } from 'antd';
import Button from '../common/Button';
import { AuthContext } from '../common/AuthContext';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const [activeKey, setActiveKey] = useState([]);
  const [inputEmail, setInputEmail] = useState('');
  const inputRef = useRef(null);
  const { setEmail, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStart = useCallback(() => {
    if (inputEmail.trim()) {
      setEmail(inputEmail.trim());
      navigate('/auth');
    } else {
      inputRef.current && inputRef.current.focus();
    }
  }, [inputEmail, setEmail, navigate]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  }, [handleStart]);

  const faqData = [
    {
      question: 'GHT là gì?',
      answer: 'GHT là dịch vụ phát trực tuyến mang đến đa dạng các loại chương trình truyền hình, phim, anime, phim tài liệu đoạt giải thưởng và nhiều nội dung khác trên hàng nghìn thiết bị có kết nối Internet. Bạn có thể xem bao nhiêu tùy thích, bất cứ lúc nào bạn muốn mà không gặp phải một quảng cáo nào – tất cả chỉ với một mức giá thấp hàng tháng. Luôn có những nội dung mới để bạn khám phá và những chương trình mới được bổ sung mỗi tuần!'
    },
    {
      question: 'Giá xem GHT là bao nhiêu?',
      answer: 'Xem GHT trên điện thoại thông minh, máy tính bảng, TV thông minh, máy tính xách tay hoặc thiết bị phát trực tuyến, chỉ với một khoản phí cố định hàng tháng. Các gói dịch vụ với mức giá từ 74.000₫ đến 273.000₫ mỗi tháng. Không phụ phí, không hợp đồng.'
    },
    {
      question: 'Tôi có thể xem ở đâu?',
      answer: 'Xem mọi lúc, mọi nơi. Đăng nhập bằng tài khoản GHT của bạn để xem ngay trên trang web GHT.com từ máy tính cá nhân, hoặc trên bất kỳ thiết bị nào có kết nối Internet và có cài đặt ứng dụng Netflix, bao gồm TV thông minh, điện thoại thông minh, máy tính bảng, thiết bị phát đa phương tiện trực tuyến và máy chơi game.'
    },
    {
      question: 'Làm thế nào để hủy?',
      answer: 'GHT rất linh hoạt. Không có hợp đồng phiền toái, không ràng buộc. Bạn có thể dễ dàng hủy tài khoản trực tuyến chỉ trong hai cú nhấp chuột. Không mất phí hủy – bạn có thể bắt đầu hoặc ngừng tài khoản bất cứ lúc nào.'
    },
    {
      question: 'Tôi có thể xem gì trên GHT?',
      answer: 'GHT có một thư viện phong phú gồm các phim truyện, phim tài liệu, chương trình truyền hình, anime, tác phẩm giành giải thưởng của GHT và nhiều nội dung khác. Xem không giới hạn bất cứ lúc nào bạn muốn.'
    },
    {
      question: 'GHT có phù hợp cho trẻ em không?',
      answer: 'Trải nghiệm GHT Trẻ em có sẵn trong gói dịch vụ của bạn, trao cho phụ huynh quyền kiểm soát trong khi các em có thể thưởng thức các bộ phim và chương trình phù hợp cho gia đình tại không gian riêng. Hồ sơ Trẻ em đi kèm tính năng kiểm soát của cha mẹ (được bảo vệ bằng mã PIN), cho phép bạn giới hạn độ tuổi cho nội dung con mình được phép xem, cũng như chặn những phim hoặc chương trình mà bạn không muốn các em nhìn thấy.'
    }
  ];

  return (
    <div className="bg-black text-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">Câu hỏi thường gặp</h2>
        
        <Collapse
          accordion
          activeKey={activeKey}
          onChange={setActiveKey}
          className="bg-transparent border-none space-y-2"
          items={faqData.map((faq, index) => ({
            key: index,
            label: (
              <div className="bg-[#2D2D2D] hover:bg-[#4D4D4D] p-6 text-xl md:text-2xl text-white transition-colors duration-300 flex justify-between items-center">
                {faq.question}
                <span className="text-3xl">{activeKey.includes(index) ? '×' : '+'}</span>
              </div>
            ),
            children: (
              <div className="bg-[#2D2D2D] p-6 text-lg md:text-xl text-white mt-px">
                {faq.answer}
              </div>
            ),
            className: 'bg-transparent'
          }))}
        />

        <div className="text-center mt-12">
          {!isAuthenticated && (
            <p className="text-lg mb-4">Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách thành viên của bạn.</p>
          )}
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch max-w-3xl mx-auto">
              <input
                ref={inputRef}
                type="email"
                placeholder="Địa chỉ email"
                className="flex-1 px-4 py-4 text-black text-lg rounded-md min-w-[300px]"
                value={inputEmail}
                onChange={e => setInputEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button variant="primary" className="py-4 px-8 text-lg" onClick={handleStart}>
                Bắt đầu
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;