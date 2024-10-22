import React from 'react';
import './modals.css';

const CreateTask = () => {
  return (
    <div className="modal-container">
      <div className="task-modal">
        <form className="form-fields">
          <div className="input-container">
            <label htmlFor="title" className="label">
              Title <span className="required">*</span>
            </label>
            <input type="text" name="heading" placeholder="Enter Task Title" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
