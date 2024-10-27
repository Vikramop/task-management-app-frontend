import React, { useEffect, useState } from 'react';

import people from '../assets/2pep.png';
import './style.css';
import Task from './Task';
import { userAuthStore } from '../../store/authStore';
import AddAssignee from '../modals/AddAssignee';

const Board = () => {
  const { user, fetchUser } = userAuthStore();

  const [selectedFilter, setSelectedFilter] = useState('This Week');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        await fetchUser();
        // console.log('userr', user);
      } catch (err) {
        console.error('Error fetching user data:', err.message);
      }
    };

    getUserData();
  }, [fetchUser]);

  const name = user ? user.name : '';
  // console.log('namma', name);

  const formatDate = (date) => {
    const day = date.getDate();
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    return `${day}${daySuffix(day)} ${month}, ${year}`;
  };

  const today = new Date();
  const formattedDate = formatDate(today);
  return (
    <div className="board-contianer">
      <div className="top">
        <p className="board-h">Welcome! {name}</p>
        <p className="today-date">{formattedDate}</p>
      </div>
      <div className="top2">
        <div className="top2-left">
          <p className="board-sh">Board</p>
          <div onClick={openModal} className="add-people">
            <img src={people} alt="person" />
            <p>Add People</p>
          </div>
        </div>
        <div className="dropdown-container">
          <div className="custom-select">
            <select
              id="task-filter"
              value={selectedFilter}
              onChange={handleFilterChange}
              className="select-box"
            >
              <option value="Today">Today</option>
              <option value="This Week">This week</option>
              <option value="This Month">This Month</option>
            </select>
          </div>
        </div>
      </div>
      {isModalOpen && <AddAssignee closeModal={closeModal} />}
      {/* Task Section */}
      <div className="task-sec">
        <Task />
      </div>
    </div>
  );
};

export default Board;
