// Shimmer.js
import React from 'react';
import './style.css';
const Shimmer = () => {
  return (
    <div className="shimmer-container">
      <div className="shimmer-card">
        <div className="shimmer-thumbnail">
          <div className="shimmer-title"></div>
          <div className="shimmer-description"></div>
          <div className="shimmer-title"></div>
          <div className="shimmer-last">
            <div className="shimmer-oval"></div>
            <div className="shimmer-lastb">
              <div className="shimmer-oval"></div>
              <div className="shimmer-oval"></div>
              <div className="shimmer-oval"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="shimmer-card">
        <div className="shimmer-thumbnail">
          <div className="shimmer-title"></div>
          <div className="shimmer-description"></div>
          <div className="shimmer-title"></div>
          <div className="shimmer-last">
            <div className="shimmer-oval"></div>
            <div className="shimmer-lastb">
              <div className="shimmer-oval"></div>
              <div className="shimmer-oval"></div>
              <div className="shimmer-oval"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
