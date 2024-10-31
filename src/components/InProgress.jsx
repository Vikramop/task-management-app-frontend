import React, { useEffect, useState } from 'react';

import collapse from '../assets/collapse.png';
import TaskCard from './TaskCard';
import { userTaskStore } from '../../store/taskStore';
import toast from 'react-hot-toast';
import Shimmer from './Shimmer';

const InProgress = () => {
  const { fetchTasks, tasks, deleteTask } = userTaskStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletedTaskId, setDeletedTaskId] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      try {
        await fetchTasks();
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, [fetchTasks, deletedTaskId]);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setDeletedTaskId(taskId);
    } catch (error) {
      toast.error('Failed to delete task.');
    }
  };

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
        <p className="task-h">In Progress</p>
        <img onClick={toggleCollapse} src={collapse} alt="Collapse" />
      </div>
      <div className="task-card-overflow">
        {loading ? (
          <Shimmer />
        ) : tasks.length > 0 ? (
          tasks
            .filter((task) => task.category === 'In Progress')
            .map((task) => (
              <TaskCard
                key={task._id}
                title={task.title}
                priority={task.priority}
                assignedTo={task.assignedTo}
                dueDate={task.dueDate}
                checklist={task.checklist}
                isCollapsed={isCollapsed}
                task={task}
                onDelete={handleDelete}
              />
            ))
        ) : null}
      </div>
    </div>
  );
};

export default InProgress;
