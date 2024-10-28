import React from 'react';

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-container ">
      <div className="del-modal">
        <p>Are you sure you want to Delete?</p>
        <div className="del-modal-butns">
          <button onClick={onConfirm} className="del-btn-y">
            Yes, Delete
          </button>
          <button onClick={onCancel} className="del-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
