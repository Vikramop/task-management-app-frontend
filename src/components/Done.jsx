import React, { useState } from 'react';
import collapse from '../assets/collapse.png';
import TaskCard from './TaskCard';

const Done = () => {
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
    <div>
      <div className="task-box-up">
        <p className="task-h">Done</p>
        <img onClick={toggleCollapse} src={collapse} alt="" />
      </div>
      <div className="task-card-overflow">
        <TaskCard isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default Done;
