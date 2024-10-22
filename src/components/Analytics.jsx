import React from 'react';
import './style.css';
import CreateTask from '../modals/CreateTask';

const Analytics = () => {
  const tasksData1 = [
    { category: 'Backlog Tasks', count: 16 },
    { category: 'To-do Tasks', count: 14 },
    { category: 'In-Progress Tasks', count: 3 },
    { category: 'Completed Tasks', count: 22 },
  ];
  const tasksData2 = [
    { category: 'Low Priority', count: 16 },
    { category: 'Moderate Priority', count: 14 },
    { category: 'High Priority', count: 3 },
    { category: 'Due Date Tasks', count: 22 },
  ];
  return (
    <div className="setting-contianer">
      <CreateTask />
      <p className="settings-h">Analytics</p>
      <div className="tasks">
        <div className="task-summary">
          {tasksData1.map((task, index) => (
            <div key={index} className="task-item">
              <div className="task-category-wrapper">
                <span className="task-dot"></span>
                <p className="task-category">{task.category}</p>
              </div>
              <p className="task-count">{task.count}</p>
            </div>
          ))}
        </div>
        <div className="task-summary">
          {tasksData2.map((task, index) => (
            <div key={index} className="task-item">
              <div className="task-category-wrapper">
                <span className="task-dot"></span>
                <p className="task-category">{task.category}</p>
              </div>
              <p className="task-count">{task.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
