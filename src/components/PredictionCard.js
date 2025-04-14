import React from "react";
import "./PredictionCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const PredictionCard = ({ predict, onDeleteClick }) => {
  const statusColor =
    predict.failure_risk > 70
      ? "high"
      : predict.failure_risk > 40
      ? "medium"
      : "low";

  return (
    <div className="prediction-card">
      <div className="prediction-info">
        <div className="prediction-status">
          <span className={`dot ${statusColor}`} />
          <span className="status-text">
            {predict.failure_risk > 70
              ? "High Risk"
              : predict.failure_risk > 40
              ? "Moderate Risk"
              : "Low Risk"} <br/>
              {predict.failure_risk}%
          </span>
        </div>
        <div>{predict.mach_type}</div>
        <div>{predict.process_temp}°C</div>
        <div>{predict.air_temp}°C</div>
        <div>{predict.rot_speed} rpm</div>
        <div>{predict.torque} Nm</div>
        <div>{predict.tool_wear} min</div>
        <div>{predict.failure_type || "None"}</div>
        <div>{new Date(predict.created_at).toLocaleString()}</div>
        <button onClick={() => onDeleteClick()} className="delete-btn">
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </div>
  );
};

export default PredictionCard;
