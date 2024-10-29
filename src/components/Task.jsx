import React from 'react';

import './task.css';
import Backlog from './Backlog';
import ToDo from './toDo';
import InProgress from './inProgress';
import Done from './Done';

const Task = ({ tasks }) => {
  return (
    <div className="task-container">
      <div className="task-box">
        <Backlog tasks={tasks} />
      </div>

      <div className="task-box">
        <ToDo tasks={tasks} />
      </div>

      <div className="task-box">
        <InProgress tasks={tasks} />
      </div>

      <div className="task-box">
        <Done tasks={tasks} />
      </div>
    </div>
  );
};

export default Task;
