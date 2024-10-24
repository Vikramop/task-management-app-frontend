import React, { useEffect, useState } from 'react';

import down from '../assets/down.svg';
import OptionsMenu from './OptionsMenu';

const TaskCard = ({
  isCollapsed,
  title,
  priority,
  assignedTo,
  dueDate,
  checklist = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    if (isCollapsed) {
      setIsOpen(false);
    }
  }, [isCollapsed]);

  const toggleDropdown = () => {
    if (!isCollapsed) {
      // Only toggle if not collapsed
      setIsOpen((prevState) => !prevState);
    }
  };

  const handleCheckboxChange = (item) => {
    // Toggle the completed status of the item
    const updatedChecklist = checklist.map((checkItem) =>
      checkItem._id === item._id
        ? { ...checkItem, completed: !checkItem.completed } // Toggle completed status
        : checkItem
    );

    // Update selected tasks array based on completed status
    setSelectedTasks((prev) =>
      prev.includes(item.text)
        ? prev.filter((task) => task !== item.text)
        : [...prev, item.text]
    );

    // setChecklist(updatedChecklist);
  };

  const initials = assignedTo ? assignedTo.substring(0, 2).toUpperCase() : 'NA';

  // Ensure priority has a default value
  const displayPriority = priority ? priority.toUpperCase() : 'LOW';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' }); // Get abbreviated month (e.g., "Feb")

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

  const isPastDueDate = (dateString) => {
    const currentDate = new Date();
    const due = new Date(dateString);
    return due < currentDate;
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
        <OptionsMenu />
      </div>
      <p className="task-card-h">{title}</p>

      {/* Checklist Dropdown */}
      <div className="dropdown">
        <div className="checklist" onClick={toggleDropdown}>
          Checklist ({selectedTasks.length}/{checklist.length})
          <button className="dropdown-button">
            <img
              className={`arrow ${isOpen ? 'up' : 'down'}`}
              src={isOpen ? down : down}
              alt="Toggle dropdown"
            />
          </button>
        </div>

        {isOpen && (
          <div className="options">
            {checklist.map((item, index) => (
              <label className="option" key={index}>
                <input
                  type="checkbox"
                  // The checkbox is checked based on item.completed
                  checked={item.completed}
                  // Handle checkbox change here, you can pass the entire item or item._id
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
          style={{
            backgroundColor: isPastDueDate(dueDate) ? '#CF3636' : '',
            color: isPastDueDate(dueDate) ? '#fff' : '',
          }}
        >
          <p>{formatDate(dueDate)}</p>
        </div>
        <div className="task-card-priorities">
          <div className="task-card-priority">
            <p>BACKLOG</p>
          </div>
          <div className="task-card-priority">
            <p>PROGRESS</p>
          </div>
          <div className="task-card-priority">
            <p>DONE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
