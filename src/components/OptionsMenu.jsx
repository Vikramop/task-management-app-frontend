import React, { useState } from 'react';
import dots from '../assets/3dots.svg';
import './task.css';

const OptionsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="options-menu-container">
      <img src={dots} alt="Options" onClick={toggleOptions} />

      {isOpen && (
        <div className="options-menu">
          <div className="option-menu-o">Edit</div>
          <div className="option-menu-o">Share</div>
          <div className="option-menu-o delete">Delete</div>
        </div>
      )}
    </div>
  );
};

export default OptionsMenu;
