import React, { useEffect, useState } from 'react';
import collapse from '../assets/collapse.png';
import add from '../assets/add.svg';
import TaskCard from './TaskCard';
import CreateTask from '../modals/CreateTask';
import { userTaskStore } from '../../store/taskStore';
import toast from 'react-hot-toast';
import Shimmer from './Shimmer';

const ToDo = () => {
  const { fetchTasks, tasks, deleteTask } = userTaskStore();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    if (!tasks.length) return;

    const updatedTasks = tasks.map((task) => {
      if (!task.priority) {
        return {
          ...task,
          priority: calculatePriority(task.dueDate),
        };
      }
      return task;
    });

    // console.log('Updated Tasks with Priority:', updatedTasks);
  }, [tasks]);

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      try {
        await fetchTasks(); // Fetch updated tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setDeletedTaskId(taskId);
    } catch (error) {
      toast.error('Failed to delete task.');
    }
  };

  const calculatePriority = (dueDate) => {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);

    const daysLeft = (taskDueDate - currentDate) / (1000 * 60 * 60 * 24);

    if (daysLeft < 0) {
      return 'high';
    } else if (daysLeft <= 2) {
      return 'moderate';
    } else {
      return 'low';
    }
  };

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
          <div onClick={toggleModal}>
            <img src={add} alt="Add task" />
          </div>
          <div onClick={toggleCollapse}>
            <img src={collapse} alt="Collapse" />
          </div>
        </div>
      </div>

      {isModalOpen && <CreateTask onClose={toggleModal} />}

      <div className="task-card-overflow">
        {loading ? (
          <Shimmer />
        ) : tasks.length > 0 ? (
          tasks
            .filter((task) => task.category === 'To-Do')
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

export default ToDo;
