import React, { useState } from 'react';
import './modals.css';
import del from '../assets/del.svg';
import DueDate from './../components/DueDate';

const CreateTask = () => {
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handlePrioritySelect = (priority) => {
    setSelectedPriority(priority);
  };

  const [checklist, setChecklist] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddNewTask = () => {
    setChecklist([...checklist, { text: newTaskText, completed: false }]);
    setNewTaskText(''); // Reset input after adding
  };
  const handleCheckboxChange = (option) => {
    if (selectedTasks.includes(option)) {
      setSelectedTasks(selectedTasks.filter((task) => task !== option));
    } else {
      setSelectedTasks([...selectedTasks, option]);
    }
  };

  const handleTaskChange = (index, newText) => {
    const updatedChecklist = checklist.map((task, i) =>
      i === index ? { ...task, text: newText } : task
    );
    setChecklist(updatedChecklist);
  };

  const handleTaskCompleteToggle = (index) => {
    const updatedChecklist = checklist.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setChecklist(updatedChecklist);

    // Update the selectedTasks based on the completed status
    if (updatedChecklist[index].completed) {
      setSelectedTasks([...selectedTasks, updatedChecklist[index]]);
    } else {
      setSelectedTasks(selectedTasks.filter((_, i) => i !== index));
    }
  };

  const handleTaskDelete = (index) => {
    const updatedChecklist = checklist.filter((_, i) => i !== index);
    setChecklist(updatedChecklist);

    // Update selectedTasks array after task deletion
    const updatedSelectedTasks = selectedTasks.filter(
      (_, i) => i !== index // Remove the corresponding task from selectedTasks
    );
    setSelectedTasks(updatedSelectedTasks);
  };

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
          {/* priority */}

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

          {/* assign */}
          <div className="asignee-container">
            <label htmlFor="assignee" className="label-assign">
              Assign to
            </label>
            <input type="email" name="assignee" placeholder="Add a assignee" />
          </div>

          {/* checklist */}
          <div className="checklist-container">
            <label className="label">
              Checklist ({selectedTasks.length}/{checklist.length})
              <span className="required">*</span>
            </label>
            <div className="overflow-sec">
              {/* Render each task in the checklist */}
              {checklist.map((task, index) => (
                <div key={index} className="checklist-item">
                  <label className="option">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskCompleteToggle(index)}
                    />
                    <span
                      className={`checkbox ${task.completed ? 'checked' : ''}`}
                    ></span>
                    {/* Task Input */}
                    <input
                      type="text"
                      className="diff-input"
                      value={task.text}
                      onChange={(e) => handleTaskChange(index, e.target.value)}
                      placeholder="Enter task"
                    />
                  </label>
                  {/* Delete Button */}
                  <button
                    className="delete-task-btn"
                    onClick={() => handleTaskDelete(index)}
                  >
                    <img src={del} alt="" className="del-btn" />
                  </button>
                </div>
              ))}

              {/* Input for new task */}
              <div className="add-new-task">
                <p className="add-task-btn" onClick={handleAddNewTask}>
                  + Add New
                </p>
              </div>
            </div>
          </div>

          {/* last sec */}
          <div className="task-modal-last">
            <DueDate />

            <div className="task-modal-last2">
              <div className="cancel-btn">cancel</div>
              <div className="save-btn">Save</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
