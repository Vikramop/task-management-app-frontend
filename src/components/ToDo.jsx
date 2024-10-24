import React, { useEffect, useState } from 'react';
import collapse from '../assets/collapse.png';
import add from '../assets/add.svg';
import TaskCard from './TaskCard';
import CreateTask from '../modals/CreateTask';
import { userTaskStore } from '../../store/taskStore';

const ToDo = () => {
  const { fetchTasks, tasks, error } = userTaskStore();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      await fetchTasks();
      setLoading(false);
    };

    getTasks();
  }, [fetchTasks]);

  // Monitor tasks for updates
  useEffect(() => {
    console.log('Tasks updated:', tasks);
  }, [tasks]);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
    <div className="main-box">
      <div className="task-box-up">
        <p className="task-h">To do</p>
        <div className="create-task">
          {/* "Add" button triggers the modal */}
          <div onClick={toggleModal}>
            <img src={add} alt="Add task" />
          </div>
          <div onClick={toggleCollapse}>
            <img src={collapse} alt="Collapse" />
          </div>
        </div>
      </div>

      {/* Conditionally render the modal */}
      {isModalOpen && <CreateTask onClose={toggleModal} />}

      <div className="task-card-overflow">
        {loading ? (
          <p>Loading tasks...</p> // Show loading message while fetching
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id} // Use a unique identifier for the key
              title={task.title}
              priority={task.priority}
              assignedTo={task.assignedTo}
              dueDate={task.dueDate}
              checklist={task.checklist}
              isCollapsed={isCollapsed}
            />
          ))
        ) : (
          <p>No tasks available in To-Do</p> // Message when there are no tasks
        )}
      </div>
    </div>
  );
};

export default ToDo;
