import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/task';

const TaskView = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const link = `${API_URL}/${taskId}`;

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

    fetchTask(); // Call the fetch function
  }, [taskId]); // Only run this effect when taskId changes

  if (loading) return <p>Loading task...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="task-view">
      <h1>{task.title}</h1>
      <p>
        <strong>Category:</strong> {task.category}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Assigned To:</strong> {task.assignedTo}
      </p>
      <p>
        <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <h2>Checklist</h2>
      <ul>
        {task.checklist.map((item, index) => (
          <li key={index}>
            <input type="checkbox" checked={item.completed} readOnly />
            {item.text}
          </li>
        ))}
      </ul>
      <p>
        <strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default TaskView;
