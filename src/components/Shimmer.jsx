// Shimmer.js
import React from 'react';
import './style.css';
const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {/* Repeat this block for as many shimmer items as you want */}
      <div className="shimmer-card">
        <div className="shimmer-thumbnail"></div>
        <div className="shimmer-title"></div>
        <div className="shimmer-description"></div>
      </div>
      {/* Add more shimmer cards as needed */}
      <div className="shimmer-card">
        <div className="shimmer-thumbnail"></div>
        <div className="shimmer-title"></div>
        <div className="shimmer-description"></div>
      </div>
      {/* Add more shimmer cards as needed */}
    </div>
  );
};

export default Shimmer;
