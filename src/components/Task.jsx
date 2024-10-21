import React from 'react';

import './task.css';
import Backlog from './Backlog';
import ToDo from './toDo';
import InProgress from './inProgress';
import Done from './Done';

const Task = () => {
  return (
    <div className="task-container">
      <div className="task-box">
        <Backlog />
      </div>

      <div className="task-box">
        <ToDo />
      </div>

      <div className="task-box">
        <InProgress />
      </div>

      <div className="task-box">
        <Done />
      </div>
    </div>
  );
};

export default Task;
