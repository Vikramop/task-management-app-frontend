import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cube from '../assets/cube.png';
import { useNavigate } from 'react-router-dom';

// const API_URL = 'http://localhost:5000/api/task';
const API_URL = 'https://task-mangement-app-backend-hl6m.onrender.com/api/task';

const TaskView = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDashboardNavigation = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    const link = `${API_URL}/${taskId}`;
    console.log('linkk', link);

    const fetchTask = async () => {
      try {
        const response = await axios.get(link);

        if (response.data.success) {
          setTask(response.data.task);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  console.log('task', task);
  const priority = task ? task.priority : null;

  const totalTasks = task?.checklist?.length || 0;
  const completedTasks =
    task?.checklist?.filter((item) => item.completed).length || 0;

  if (loading) return <p>Loading task...</p>;
  if (error) return <p>Error: {error}</p>;

  const getDotColor = (priority) => {
    if (!priority) return '#ccc';
    const normalizedPriority = priority.toLowerCase().trim();
    switch (normalizedPriority) {
      case 'low':
        return '#63C05B';
      case 'moderate':
        return '#18B0FF';
      case 'high':
        return '#FF2473';
      default:
        return '#63C05B';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });

    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    const suffix = getOrdinalSuffix(day);
    return `${month} ${day}${suffix}`;
  };

  return (
    <div className="task-view">
      <div className="header-view">
        <div
          className="dash-left1"
          onClick={handleDashboardNavigation}
          style={{ cursor: 'pointer' }}
        >
          <img src={cube} alt="Pro Manage Logo" />
          <p>Pro Manage</p>
        </div>
      </div>

      {/*  */}
      <div className="cards-sec">
        <div className="card">
          <div className="task-category-view">
            <span
              className="task-card-dot"
              style={{ backgroundColor: getDotColor(priority) }}
            ></span>
            <p className="task-card-priority-h">
              {priority
                ? priority.toUpperCase() + ' PRIORITY'
                : 'PRIORITY UNKNOWN'}
            </p>
          </div>
          <p className="view-head">{task.title}</p>
          <p className="view-checklist-h">
            Checklist ({completedTasks}/{totalTasks})
          </p>
          <div className="checklist-view-container">
            <div className="checklist-view">
              {task?.checklist?.map((item, index) => (
                <div key={index} className="checklist-item-view">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    className="hidden-checkbox"
                    readOnly
                  />
                  <div>
                    <span
                      className={`view-checkbox ${
                        item.completed ? 'checked' : ''
                      }`}
                    ></span>
                  </div>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="view-due">
            Due Date <span> {task ? formatDate(task.dueDate) : 'N/A'} </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
