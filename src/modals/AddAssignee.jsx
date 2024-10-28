import React, { useState } from 'react';
import { userTaskStore } from '../../store/taskStore';
import toast from 'react-hot-toast';

const AddAssignee = ({ closeModal }) => {
  const { addAssignee, success, error, clearMessages } = userTaskStore();
  const [email, setEmail] = useState('');

  const handleOkClick = () => {
    clearMessages();
    closeModal();
  };

  const handleAddAssignee = async () => {
    if (email) {
      await addAssignee(email); // Try to add the assignee

      if (error) {
        toast.error(error);
      } else if (success) {
        toast.success(success);
        setEmail('');
      }
    } else {
      console.error('Please enter a valid email.');
      toast.error('Please enter a valid email.');
    }
  };

  return (
    <div className="modal-container">
      <div className="assigne-modal">
        {success ? (
          <div className="success-message">
            <p>{success}</p>
            <button onClick={handleOkClick}>Okay, got it!</button>
          </div>
        ) : (
          // If no success message, show the input form
          <div>
            <p className="a-people">Add people to the board</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter the email"
              required
              className="a-people-mail"
            />
            <div className="a-people-btns">
              <button onClick={closeModal} className="a-people-btn-cancel">
                Cancel
              </button>
              <button onClick={handleAddAssignee} className="a-people-btn-add">
                Add Email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAssignee;
