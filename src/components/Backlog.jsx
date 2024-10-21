import React from 'react';
import collapse from '../assets/collapse.png';

const Backlog = () => {
  return (
    <div>
      <div className="task-box-up">
        <p className="task-h">Backlog</p>
        <img src={collapse} alt="" />
      </div>
    </div>
  );
};

export default Backlog;
