import React from 'react';

import collapse from '../assets/collapse.png';

const InProgress = () => {
  return (
    <div>
      <div className="task-box-up">
        <p className="task-h">In progress</p>
        <img src={collapse} alt="" />
      </div>
    </div>
  );
};

export default InProgress;
