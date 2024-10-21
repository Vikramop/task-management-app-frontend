import React from 'react';
import collapse from '../assets/collapse.png';
import add from '../assets/add.svg';
import TaskCard from './TaskCard';

const ToDo = () => {
  return (
    <div className="main-box">
      <div className="task-box-up">
        <p className="task-h">To do</p>
        <div className="create-task">
          <div>
            <img src={add} alt="" />
          </div>
          <div>
            <img src={collapse} alt="" />
          </div>
        </div>
      </div>

      <div className="task-card-overflow">
        <TaskCard />
      </div>
    </div>
  );
};

export default ToDo;
