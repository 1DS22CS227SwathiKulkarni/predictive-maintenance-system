import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D00000"];

const FailureTypeBarChart = () => {
  const [data, setData] = useState([]);
  const [machineTypes, setMachineTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    axios
      .get("https://predictive-maintenance-01qp.onrender.com/chart-data/")
      .then((response) => {
        const jsonData = response.data.failure_type_counts;

        const types = Object.keys(jsonData);
        setMachineTypes(types);
        setSelectedType(types[0] || "");

        const formattedData = types.map((machineType) => ({
          machineType,
          ...jsonData[machineType],
        }));

        setData(formattedData);
      })
      .catch((error) => toast.error("Error fetching data"));
  }, []);

  const filteredData =
    selectedType !== ""
      ? data.filter((item) => item.machineType === selectedType)
      : [];

  return (
    <div className="graph2" style={{ height: 470 }}>
      <h2>Failure Count by Machine Type</h2>

      <div className="content">
        <p className="para">
          A Failure Type Distribution for Machine Type bar graph shows which
          failure types are most common for each machine, such as power issues
          or overheating. This helps target maintenance efforts, reduce
          downtime, and boost system reliability and efficiency.
        </p>
        <ResponsiveContainer width={350} height={300}>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              marginLeft: "180px",
              marginBottom: "10px",
              padding: "5px",
            }}
          >
            {machineTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <BarChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="machineType" />
            <YAxis />
            <Tooltip />
            <Legend />
            {filteredData.length > 0 &&
              Object.keys(filteredData[0])
                .filter((key) => key !== "machineType")
                .map((failureType, index) => (
                  <Bar
                    key={index}
                    dataKey={failureType}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FailureTypeBarChart;
