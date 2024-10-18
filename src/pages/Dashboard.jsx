import React, { useState } from 'react';
import { userAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

import cube from '../assets/cube.png';
import Logout from '../assets/Logout.png';
import './dashboard.css';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('board'); // Track the active tab

  const navigate = useNavigate();
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const { logout } = userAuthStore();

  const handleLogout = async () => {
    logout();
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="dash-container">
      {/* Left Sidebar */}
      <div className="dash-left">
        <div className="dash-left1">
          <img src={cube} alt="Pro Manage Logo" />
          <p>Pro Manage</p>
        </div>

        <div className="tabs-container">
          {/* Tabs */}
          <div className="tabs">
            {/* Board Tab */}
            <div
              className={`tab-item ${activeTab === 'board' ? 'active' : ''}`}
              onClick={() => handleTabClick('board')}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="tab-icon"
              >
                <path
                  d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                  stroke={activeTab === 'board' ? 'black' : '#707070'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 9H21"
                  stroke={activeTab === 'board' ? 'black' : '#707070'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 21V9"
                  stroke={activeTab === 'board' ? 'black' : '#707070'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p style={{ color: activeTab === 'board' ? 'black' : '#707070' }}>
                Board
              </p>
            </div>

            {/* Analytics Tab */}
            <div
              className={`tab-item ${
                activeTab === 'analytics' ? 'active' : ''
              }`}
              onClick={() => handleTabClick('analytics')}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="tab-icon"
              >
                <path
                  d="M12 8C16.9706 8 21 6.65685 21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5C3 6.65685 7.02944 8 12 8Z"
                  stroke={activeTab === 'analytics' ? 'black' : '#707070'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12C21 13.66 17 15 12 15C7 15 3 13.66 3 12"
                  stroke={activeTab === 'analytics' ? 'black' : '#707070'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 5V19C3 20.66 7 22 12 22C17 22 21 20.66 21 19V5"
                  stroke={activeTab === 'analytics' ? 'black' : '#707070'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                style={{
                  color: activeTab === 'analytics' ? 'black' : '#707070',
                }}
              >
                Analytics
              </p>
            </div>

            {/* Settings Tab */}
            <div
              className={`tab-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => handleTabClick('settings')}
            >
              <svg
                width="24px"
                height="24px"
                className="tab-icon"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill={activeTab === 'settings' ? 'black' : '#707070'}
                  d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"
                />
              </svg>
              <p
                style={{
                  color: activeTab === 'settings' ? 'black' : '#707070',
                }}
              >
                Settings
              </p>
            </div>
          </div>
          <div className="logout-sec" onClick={handleLogout}>
            <img src={Logout} alt="" />
            <p>Logout</p>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="dash-right">
        {activeTab === 'board' && <div>Board Content</div>}
        {activeTab === 'analytics' && <div>Analytics Content</div>}
        {activeTab === 'settings' && <div>Settings Content</div>}
      </div>
    </div>
  );
};

export default Dashboard;
