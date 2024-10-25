import React, { useEffect, useState } from 'react';

import down from '../assets/down.svg';
import OptionsMenu from './OptionsMenu';
import { userTaskStore } from '../../store/taskStore';
import EditTask from '../modals/EditTask';
import './task.css';

const TaskCard = ({
  isCollapsed,
  title,
  priority,
  assignedTo,
  dueDate,
  task,
  checklist = [],
  onDelete,
}) => {
  const { editTask } = userTaskStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [checklistState, setChecklistState] = useState(checklist);
  const [selectedTasks, setSelectedTasks] = useState(
    checklist.filter((item) => item.completed).map((item) => item.text)
  );

  useEffect(() => {
    if (isCollapsed) {
      setIsOpen(false);
    }
  }, [isCollapsed]);

  const toggleDropdown = () => {
    if (!isCollapsed) {
      setIsOpen((prevState) => !prevState);
    }
  };

  const handleCheckboxChange = (item) => {
    const updatedChecklist = checklistState.map((checkItem) =>
      checkItem._id === item._id
        ? { ...checkItem, completed: !checkItem.completed }
        : checkItem
    );

    setChecklistState(updatedChecklist);

    // Update selectedTasks for UI count
    setSelectedTasks(
      updatedChecklist.filter((task) => task.completed).map((task) => task.text)
    );

    // Optionally, persist updated checklist to the server
    editTask(
      task._id,
      title,
      updatedChecklist,
      dueDate,
      priority,
      assignedTo,
      task.category
    );
  };

  const handleCategoryChange = async (newCategory) => {
    try {
      await editTask(
        task._id,
        title,
        checklistState,
        dueDate,
        priority,
        assignedTo,
        newCategory
      );
    } catch (error) {
      console.error('Failed to update task category:', error);
    }
  };

  const initials = assignedTo ? assignedTo.substring(0, 2).toUpperCase() : 'NA';

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

  const backgroundColor =
    task && task.category === 'Done'
      ? '#63C05B'
      : priority && priority.toLowerCase() === 'high'
      ? '#CF3636'
      : '';

  const textColor =
    task && task.category === 'Done'
      ? '#fff' // Adjust text color if needed for 'Done' category
      : priority && priority.toLowerCase() === 'high'
      ? '#fff'
      : '';

  const renderCategoryButtons = () => {
    if (!task || !task.category) {
      console.error('Invalid task:', task);
      return null;
    }

    const category = task.category || 'To-Do';

    switch (category) {
      case 'To-Do':
        return (
          <>
            <div
              className="task-card-priority"
              onClick={() => handleCategoryChange('In Progress')}
            >
              <p>PROGRESS</p>
            </div>
            <div
              className="task-card-priority"
              onClick={() => handleCategoryChange('Done')}
            >
              <p>DONE</p>
            </div>
            <div
              className="task-card-priority"
              onClick={() => handleCategoryChange('Backlog')}
            >
              <p>BACKLOG</p>
            </div>
          </>
        );

      case 'In Progress':
        return (
          <>
            <div
              className="task-card-priority"
              onClick={() => handleCategoryChange('To-Do')}
            >
              <p>TO DO</p>
            </div>
            <div
              className="task-card-priority"
              onClick={() => handleCategoryChange('Backlog')}
            >
              <p>BACKLOG</p>
            </div>
            <div
              className="task-card-priority"
              onClick={() => handleCategoryChange('Done')}
            >
              <p>DONE</p>
            </div>
          </>
        );

      case 'Done':
        return (
          <>
            <div
              className="task-card-priority"
              onClick={() => handleCategoryChange('To-Do')}
            >
              <p>TO DO</p>
            </div>
            <div
              className="task-card-priority"
              onClick={() => handleCategoryChange('Backlog')}
            >
              <p>BACKLOG</p>
            </div>

            <div
              className="task-card-priority"
              onClick={() => handleCategoryChange('In Progress')}
            >
              <p>IN PROGRESS</p>
            </div>
          </>
        );

      case 'Backlog':
        return (
          <>
            <div
              className="task-card-priority"
              onClick={() => handleCategoryChange('To-Do')}
            >
              <p>TO DO</p>
            </div>
            <div
              className="task-card-priority"
              onClick={() => handleCategoryChange('In Progress')}
            >
              <p>PROGRESS</p>
            </div>
            <div
              className="task-card-priority"
              onClick={() => handleCategoryChange('Done')}
            >
              <p>DONE</p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const handleDelete = async () => {
    await onDelete(task._id); // Call the delete function passed from the parent
  };

  return (
    <div className="task-card">
      <div className="task-card-upper">
        <div className="task-category-wrapper">
          <span
            className="task-card-dot"
            style={{ backgroundColor: getDotColor(priority) }}
          ></span>
          <p className="task-card-priority-h">
            {priority
              ? priority.toUpperCase() + ' PRIORITY'
              : 'PRIORITY UNKNOWN'}
          </p>
          <span className="task-card-assigne">{initials}</span>
        </div>
        <OptionsMenu
          task={task}
          onEdit={() => setIsEditing(true)}
          onDelete={handleDelete}
        />{' '}
      </div>
      <p className="task-card-h">{title}</p>

      {/* Checklist Dropdown */}
      <div className="dropdown">
        <div className="checklist" onClick={toggleDropdown}>
          Checklist ({selectedTasks.length}/{checklistState.length})
          <button className="dropdown-button">
            <img
              className={`arrow ${isOpen ? 'up' : 'down'}`}
              src={down}
              alt="Toggle dropdown"
            />
          </button>
        </div>

        {isOpen && (
          <div className="options">
            {checklistState.map((item, index) => (
              <label key={index} className="option">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCheckboxChange(item)}
                />
                <span
                  className={`checkbox ${item.completed ? 'checked' : ''}`}
                ></span>
                <p>{item.text}</p>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Task Card Lower Section */}
      <div className="task-card-lower">
        <div
          className="task-card-due"
          style={{ backgroundColor, color: textColor }}
        >
          <p>{formatDate(dueDate)}</p>
        </div>
        <div className="task-card-priorities">{renderCategoryButtons()}</div>
      </div>

      {/* Render EditTask Card if Editing */}
      {isEditing && (
        <EditTask task={task} onClose={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default TaskCard;
