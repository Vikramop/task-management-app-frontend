import React, { useEffect, useState } from 'react';

import down from '../assets/down.svg';
import OptionsMenu from './OptionsMenu';

const TaskCard = ({ isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const options = ['Task 1', 'Task 2', 'Task 3'];

  // Effect to handle collapsing and opening states
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

  const handleCheckboxChange = (option) => {
    if (selectedTasks.includes(option)) {
      setSelectedTasks(selectedTasks.filter((task) => task !== option));
    } else {
      setSelectedTasks([...selectedTasks, option]);
    }
  };

  return (
    <div className="task-card">
      <div className="task-card-upper">
        <div className="task-category-wrapper">
          <span className="task-card-dot"></span>
          <p className="task-card-priority-h">LOW PRIORITY</p>
          <span className="task-card-assigne">VK</span>
        </div>
        <OptionsMenu />
      </div>
      <p className="task-card-h">Hero section</p>

      {/* Checklist Dropdown */}
      <div className="dropdown">
        <div className="checklist" onClick={toggleDropdown}>
          Checklist ({selectedTasks.length}/{options.length})
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
            {options.map((option) => (
              <label className="option" key={option}>
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                <span
                  className={`checkbox ${
                    selectedTasks.includes(option) ? 'checked' : ''
                  }`}
                ></span>
                <p>{option}</p>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Task Card Lower Section */}
      <div className="task-card-lower">
        <div className="task-card-due">
          <p>Feb 10th</p>
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
