import React, { useState } from 'react';
import dots from '../assets/3dots.svg';
import './task.css';
import { userTaskStore } from '../../store/taskStore';
import toast from 'react-hot-toast';

const OptionsMenu = ({ onEdit, task, onDelete }) => {
  const { shareTask } = userTaskStore();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleShare = async () => {
    if (!task || !task._id) return;

    try {
      const shareableLink = await shareTask(task._id);

      if (shareableLink) {
        // Copy the link to clipboard
        navigator.clipboard.writeText(shareableLink);

        // Show success toast
        toast.success('Link copied to clipboard!');
      } else {
        // Show error toast if link is null
        toast.error('Failed to generate the shareable link.');
      }
    } catch (error) {
      console.error('Error sharing task:', error);
      toast.error('An error occurred while sharing the task.');
    }
  };

  return (
    <div className="options-menu-container">
      <img src={dots} alt="Options" onClick={toggleOptions} />

      {isOpen && (
        <div className="options-menu">
          <div className="option-menu-o" onClick={onEdit}>
            Edit
          </div>{' '}
          <div className="option-menu-o" onClick={handleShare}>
            Share
          </div>
          <div className="option-menu-o delete " onClick={onDelete}>
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsMenu;
