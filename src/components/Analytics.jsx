import React, { useEffect } from 'react';
import './style.css';
import { userTaskStore } from '../../store/taskStore';

const Analytics = () => {
  const { analyticsData, fetchAnalytics } = userTaskStore();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const categorySummary = [
    { category: 'Backlog Tasks', count: analyticsData.backlogTasks },
    { category: 'To-do Tasks', count: analyticsData.toDoTasks },
    { category: 'In-Progress Tasks', count: analyticsData.inProgressTasks },
    { category: 'Completed Tasks', count: analyticsData.completedTasks },
  ];

  const prioritySummary = [
    { category: 'Low Priority', count: analyticsData.lowPriority },
    { category: 'Moderate Priority', count: analyticsData.moderatePriority },
    { category: 'High Priority', count: analyticsData.highPriority },
    { category: 'Due Date Tasks', count: analyticsData.dueDateTasks },
  ];
  return (
    <div className="setting-contianer">
      <p className="settings-h">Analytics</p>
      <div className="tasks">
        <div className="task-summary">
          {categorySummary?.map((task, index) => (
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
          {prioritySummary?.map((task, index) => (
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
