import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../modals/modals.css';

const DueDate = () => {
  const [startDate, setStartDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="due-date-btn" onClick={toggleCalendar}>
        {/* {startDate
          ? `Due Date: ${startDate.toLocaleDateString()}`
          : 'Select Due Date'} */}
        Select Due Date
      </div>
      {isCalendarOpen && (
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setIsCalendarOpen(false);
          }}
          className="custom-datepicker"
          onClickOutside={() => setIsCalendarOpen(false)} // Close on click outside
          open={isCalendarOpen}
          showPopperArrow={false} // Hide arrow for better positioning
        />
      )}
    </div>
  );
};

export default DueDate;
