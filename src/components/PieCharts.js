import React from "react";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import { toast } from "sonner";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D00000"];

const PieCharts = () => {
  const [failureData, setFailureData] = useState([]);
  const [targetData, setTargetData] = useState([]);

  useEffect(() => {
    axios
      .get("https://predictive-maintenance-01qp.onrender.com/chart-data/")
      .then((response) => {
        // recharts format
        const failureTransformed = Object.entries(
          response.data.failure_percentages
        ).map(([name, value], index) => ({
          name,
          value,
          color: COLORS[index % COLORS.length],
        }));
        setFailureData(failureTransformed);

        // Piechart
        const targetTransformed = Object.entries(
          response.data.target_counts
        ).map(([name, value], index) => ({
          name: name === "1" ? "Failure" : "No Failure",
          value,
          color: COLORS[(index + 2) % COLORS.length],
        }));
        setTargetData(targetTransformed);
      })
      .catch((error) => toast.error("Error fetching data"));
  }, []);

  return (
    <>
      <div className="chart-container">
        <div className="chart">
          <h2>Failure vs No Failure</h2>

          <div className="content">
            <PieChart width={350} height={300}>
              <Pie
                data={targetData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {targetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <p className="para">
              In predictive maintenance, comparing failure and non-failure
              instances helps assess system health, reveal patterns, and improve
              failure prediction. Failures indicate breakdowns or anomalies,
              while non-failures represent normal operation.
            </p>
          </div>
        </div>

        <div className="chart">
          <h2>Failure Type Distribution</h2>

          <div className="content">
          <p className="para">
              A Failure Type Distribution Pie Chart visually highlights the most
              common system breakdown causes, such as power issues or tool wear.
              This helps prioritize maintenance, allocate resources effectively,
              and reduce downtime through targeted preventive actions.
            </p>
            <PieChart width={350} height={300}>
              <Pie
                data={failureData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {failureData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PieCharts;
