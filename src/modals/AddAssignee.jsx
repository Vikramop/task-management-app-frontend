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
      await addAssignee(email);
      toast.success('email added');
      setEmail('');
    } else {
      console.error('Please enter a valid email.');
    }
  };

  return (
    <div>
      {success ? (
        <div className="success-message">
          <p>{success}</p>
          <button onClick={handleOkClick}>OK</button>
        </div>
      ) : (
        // If no success message, show the input form
        <div>
          {error && <p className="error-message">{error}</p>}
          <p>Add people to the board</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter assignee email"
          />
          <button onClick={handleAddAssignee}>Add</button>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AddAssignee;
