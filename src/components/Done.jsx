import React from 'react';
import collapse from '../assets/collapse.png';

const Done = () => {
  return (
    <div>
      <div className="task-box-up">
        <p className="task-h">Done</p>
        <img src={collapse} alt="" />
      </div>
    </div>
  );
};

export default Done;
