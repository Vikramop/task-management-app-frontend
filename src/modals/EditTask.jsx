import React, { useState } from 'react';
import './modals.css';
import del from '../assets/del.svg';
import DueDate from './../components/DueDate';
import toast from 'react-hot-toast';
import { userTaskStore } from '../../store/taskStore';

const EditTask = ({ task, onClose }) => {
  const { editTask } = userTaskStore();

  const [title, setTitle] = useState(task.title || '');
  const [selectedPriority, setSelectedPriority] = useState(
    task.priority || 'low'
  );
  const [assignee, setAssignee] = useState(task.assignedTo || '');
  const [checklist, setChecklist] = useState(
    task.checklist || [{ text: '', completed: false }]
  );
  const [dueDate, setDueDate] = useState(task.dueDate || null);

  // Handle adding new checklist items
  const handleAddNewTask = () => {
    setChecklist([...checklist, { text: '', completed: false }]);
  };

  // Handle updating checklist items
  const handleTaskChange = (index, value) => {
    const newChecklist = [...checklist];
    newChecklist[index].text = value;
    setChecklist(newChecklist);
  };

  // Handle checkbox toggle
  const handleTaskCompleteToggle = (index) => {
    const newChecklist = [...checklist];
    newChecklist[index].completed = !newChecklist[index].completed;
    setChecklist(newChecklist);
  };

  // Handle task deletion
  const handleTaskDelete = (index) => {
    const newChecklist = checklist.filter((_, i) => i !== index);
    setChecklist(newChecklist);
  };

  // Handle priority selection
  const handlePrioritySelect = (priority) => {
    setSelectedPriority(priority);
  };

  // Handle form submission
  const handleSaveTask = async () => {
    try {
      await editTask(
        task._id,
        title,
        checklist,
        dueDate,
        selectedPriority,
        assignee
      );
      toast.success('Task updated successfully!');
      onClose(); // Close the modal after saving
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error updating task';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="modal-container">
      <div className="task-modal">
        <form className="form-fields" onSubmit={(e) => e.preventDefault()}>
          <div className="input-container">
            <label htmlFor="title" className="label">
              Title <span className="required">*</span>
            </label>
            <input
              className="title"
              type="text"
              name="heading"
              placeholder="Enter Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Priority Selection */}
          <div className="priority-options">
            <label className="label">
              Select Priority <span className="required">*</span>
            </label>
            <div className="priority-list">
              <div
                className={`priority-option ${
                  selectedPriority === 'high' ? 'selected' : ''
                }`}
                onClick={() => handlePrioritySelect('high')}
              >
                <span className="priority-dot high"></span> HIGH PRIORITY
              </div>
              <div
                className={`priority-option ${
                  selectedPriority === 'moderate' ? 'selected' : ''
                }`}
                onClick={() => handlePrioritySelect('moderate')}
              >
                <span className="priority-dot moderate"></span> MODERATE
                PRIORITY
              </div>
              <div
                className={`priority-option ${
                  selectedPriority === 'low' ? 'selected' : ''
                }`}
                onClick={() => handlePrioritySelect('low')}
              >
                <span className="priority-dot low"></span> LOW PRIORITY
              </div>
            </div>
          </div>

          {/* Assignee Input */}
          <div className="assignee-container">
            <label htmlFor="assignee" className="label-assign">
              Assign to
            </label>
            <input
              className="assign"
              type="email"
              name="assignee"
              placeholder="Add an assignee"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            />
          </div>

          {/* Checklist */}
          <div className="checklist-container">
            <label className="label">
              Checklist ({checklist.filter((task) => task.text).length}/
              {checklist.length})<span className="required">*</span>
            </label>
            <div className="overflow-sec">
              {checklist.map((task, index) => (
                <div key={index} className="checklist-item">
                  <label className="option">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskCompleteToggle(index)}
                    />
                    <span
                      className={`checkbox ${task.completed ? 'checked' : ''}`}
                    ></span>
                    <input
                      type="text"
                      className="diff-input"
                      value={task.text}
                      onChange={(e) => handleTaskChange(index, e.target.value)}
                      placeholder="Enter task"
                    />
                  </label>
                  <button
                    className="delete-task-btn"
                    onClick={() => handleTaskDelete(index)}
                  >
                    <img src={del} alt="" className="del-btn" />
                  </button>
                </div>
              ))}
              <div className="add-new-task">
                <p className="add-task-btn" onClick={handleAddNewTask}>
                  + Add New
                </p>
              </div>
            </div>
          </div>

          {/* Last Section */}
          <div className="task-modal-last">
            <DueDate onDueDateChange={setDueDate} dueDate={dueDate} />{' '}
            {/* Pass dueDate if needed */}
            <div className="task-modal-last2">
              <div className="cancel-btn" onClick={onClose}>
                Cancel
              </div>
              <div className="save-btn" onClick={handleSaveTask}>
                Save
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
