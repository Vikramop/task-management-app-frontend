import React, { useEffect, useState } from 'react';
import collapse from '../assets/collapse.png';
import add from '../assets/add.svg';
import TaskCard from './TaskCard';

const ToDo = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          <div>
            <img src={add} alt="" />
          </div>
          <div onClick={toggleCollapse}>
            <img src={collapse} alt="" />
          </div>
        </div>
      </div>

      <div className="task-card-overflow">
        <TaskCard isCollapsed={isCollapsed} />
        <TaskCard isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default ToDo;
