import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const FailureBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://predictive-maintenance-01qp.onrender.com/chart-data/")
      .then((response) => {
        setData(response.data.failure_counts);
      })
      .catch((error) => toast.error("Error fetching data"));
  }, []);

  return (
    <div className="graph1">
      <h2>Machine Type Failures vs No-Failures</h2>

      <div className="content">
        <ResponsiveContainer width={350} height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="machine_type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="failure_count" fill="#FF8042" name="Failures" />
            <Bar dataKey="no_failure_count" fill="#FFBB28" name="No Failures" />
          </BarChart>
        </ResponsiveContainer>
        <p className="para">
          A Machine Type Failures vs No Failures bar graph compares failure and
          normal operation counts for each machine type. It helps identify
          high-risk machines, optimize maintenance schedules, and enhance
          reliability through targeted predictive strategies.
        </p>
      </div>
    </div>
  );
};

export default FailureBarChart;
