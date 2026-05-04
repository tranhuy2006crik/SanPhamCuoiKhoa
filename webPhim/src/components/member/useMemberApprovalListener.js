import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberSuccessModal from './MemberSuccessModal';

export default function useMemberApprovalListener() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) return;
    const checkApproved = () => {
      const approvedEmail = localStorage.getItem('member_approved_success');
      if (approvedEmail === email) {
        setShowModal(true);
        localStorage.removeItem('member_approved_success');
      }
    };
    checkApproved();
    const handleStorage = (e) => {
      if (e.key === 'member_approved_success') {
        checkApproved();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Trả về modal và hàm đóng để component cha sử dụng
  return { showModal, handleCloseModal, MemberSuccessModal };
} 