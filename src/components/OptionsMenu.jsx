import React, { useState } from 'react';
import dots from '../assets/3dots.svg';
import './task.css';
import { userTaskStore } from '../../store/taskStore';
import toast from 'react-hot-toast';
import DeleteModal from '../modals/DeleteModal';

const OptionsMenu = ({ onEdit, task, onDelete }) => {
  const { shareTask } = userTaskStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsDeleteModalOpen(false);
    toast.success('Task deleted successfully');
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleShare = async () => {
    if (!task || !task._id) return;

    try {
      const shareableLink = await shareTask(task._id);

      if (shareableLink) {
        navigator.clipboard.writeText(shareableLink);

        toast.success('Link copied to clipboard!');
      } else {
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
          <div className="option-menu-o delete " onClick={handleDeleteClick}>
            Delete
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default OptionsMenu;
