import React from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import Button from '../common/Button';

const Footer = () => {
  const footerLinks = [
    [
      { text: 'Câu hỏi thường gặp', url: '#' },
      { text: 'Quan hệ với nhà đầu tư', url: '#' },
      { text: 'Quyền riêng tư', url: '#' },
      { text: 'Kiểm tra tốc độ', url: '#' }
    ],
    [
      { text: 'Trung tâm trợ giúp', url: '#' },
      { text: 'Việc làm', url: '#' },
      { text: 'Tùy chọn cookie', url: '#' },
      { text: 'Thông báo pháp lý', url: '#' }
    ],
    [
      { text: 'Tài khoản', url: '#' },
      { text: 'Các cách xem', url: '#' },
      { text: 'Thông tin doanh nghiệp', url: '#' },
      { text: 'Chỉ có trên GHT', url: '#' }
    ],
    [
      { text: 'Trung tâm đa phương tiện', url: '#' },
      { text: 'Điều khoản sử dụng', url: '#' },
      { text: 'Liên hệ với chúng tôi', url: '#' }
    ]
  ];

  return (
    <footer className="bg-black text-[#737373] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <p className="mb-6">
          <a href="#" className="hover:underline">Bạn có câu hỏi? Liên hệ với chúng tôi.</a>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((column, columnIndex) => (
            <div key={columnIndex}>
              <ul className="space-y-3 text-sm">
                {column.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.url} className="hover:underline">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button 
            variant="outline" 
            className="text-sm mb-6 flex items-center gap-2"
          >
            <GlobalOutlined />
            <span>Tiếng Việt</span>
          </Button>
          <p className="text-sm">GHT Việt Nam</p>
        </div>

        {/* <div className="mt-6 text-xs">
          <p>Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải là robot. 
            <a href="#" className="text-blue-500 hover:underline ml-1">Tìm hiểu thêm.</a>
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;