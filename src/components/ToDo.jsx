import React, { useEffect, useState } from 'react';
import collapse from '../assets/collapse.png';
import add from '../assets/add.svg';
import TaskCard from './TaskCard';
import CreateTask from '../modals/CreateTask';

const ToDo = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleCollapse = () => {
    setTimeout(() => {
      setIsCollapsed((prevState) => !prevState);
    }, 500);
    setTimeout(() => {
      setIsCollapsed((prevState) => !prevState);
    }, 0);
  };

  return (
    <div className="main-box">
      <div className="task-box-up">
        <p className="task-h">To do</p>
        <div className="create-task">
          {/* "Add" button triggers the modal */}
          <div onClick={toggleModal}>
            <img src={add} alt="Add task" />
          </div>
          <div onClick={toggleCollapse}>
            <img src={collapse} alt="Collapse" />
          </div>
        </div>
      </div>

      {/* Conditionally render the modal */}
      {isModalOpen && <CreateTask onClose={toggleModal} />}

      <div className="task-card-overflow">
        <TaskCard isCollapsed={isCollapsed} />
        <TaskCard isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default ToDo;
