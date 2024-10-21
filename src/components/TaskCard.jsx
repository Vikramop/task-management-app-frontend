import React, { useState } from 'react';
import dots from '../assets/3dots.svg';
import down from '../assets/down.svg';

const TaskCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const options = ['Task 1', 'Task 2', 'Task 3'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option) => {
    setSelectedTasks((prev) =>
      prev.includes(option)
        ? prev.filter((task) => task !== option)
        : [...prev, option]
    );
  };
  return (
    <div className="task-card">
      <div className="task-card-upper">
        <div className="task-category-wrapper">
          <span className="task-card-dot"></span>
          <p className="task-card-priority-h">LOW PRIORITY</p>
          <span className="task-card-assigne">VK</span>
        </div>
        <img src={dots} alt="" />
      </div>
      <p className="task-card-h">Hero section</p>

      {/* checklist sec */}

      <div className="dropdown">
        <div className="checklist">
          Checklist ({selectedTasks.length}/{options.length})
          <button className="dropdown-button" onClick={toggleDropdown}>
            <img
              className={`arrow ${isOpen ? 'up' : 'down'}`}
              src={isOpen ? down : down}
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
