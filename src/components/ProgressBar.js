import React from "react";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="vertical-progress">
      <div className="progress-fill" style={{ height: `${percentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;
