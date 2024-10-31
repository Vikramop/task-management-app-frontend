import React from 'react';
import { userAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LogoutModal = ({ isModalOpen, handleCloseModal }) => {
  const { logout } = userAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('activeTab');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (!isModalOpen) {
    return null;
  }
  return (
    <div className="modal-container">
      <div className="logout-modal">
        <p>Are you sure you want to Logout?</p>
        <div className="log-sec" onClick={handleLogout}>
          <button className="logout-btn">Yes, Logout</button>
        </div>
        <div>
          <button className="cancel-btn-l" onClick={handleCloseModal}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
