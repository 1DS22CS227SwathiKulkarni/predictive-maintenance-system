import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  PolarAngleAxis,
} from "recharts";
import Navbar from "../../components/Navbar";
import "./Result.css";
import { Toaster, toast } from "sonner";

const Result = () => {
  const location = useLocation();
  const predictionResult = location.state?.predictionResult;
  const failureRisk = predictionResult?.failure_risk || 0;

  const alarmRef = useRef(null);

  useEffect(() => {
    if (predictionResult) {
      toast.success("Prediction successful!");
      if (failureRisk > 90 && alarmRef.current) {
        alarmRef.current.play();
      }
    }
  }, [predictionResult, failureRisk]);

  const data = [
    {
      name: "Risk Level",
      value: failureRisk,
      fill: "#ff4d4d",
    },
  ];

  return (
    <>
      <Navbar />
      <Toaster richColors position="bottom-right" />
      <audio ref={alarmRef} src="/alarm.mp3" preload="auto" />
      <div>
        <h1>Prediction Result</h1>

        {failureRisk > 90 && (
          <div className="alert alert-danger" role="alert">
            ⚠️ High Failure Risk! Immediate attention required!
          </div>
        )}

        {predictionResult ? (
          <div className="meter" style={{ textAlign: "center" }}>
            <h4>Final Risk Meter</h4>
            <RadialBarChart
              width={300}
              height={300}
              cx="50%"
              cy="50%"
              innerRadius="80%"
              outerRadius="100%"
              barSize={30}
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                minAngle={15}
                clockWise
                dataKey="value"
                background={{ fill: "#ddd" }}
              />
              <Tooltip />
              <Legend />
            </RadialBarChart>
            <h3>
              <strong>Failure Risk: </strong>
              {failureRisk}%
            </h3>
            <h3>
              <strong>Failure Type: </strong>
              {predictionResult.failure_type}
            </h3>
          </div>
        ) : (
          <p>No prediction data available.</p>
        )}
      </div>
    </>
  );
};

export default Result;
