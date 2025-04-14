import React from "react";
import Navbar from "../../components/Navbar";
import PieCharts from "../../components/PieCharts";
import FailureBarChart from "../../components/FailureBarChart";
import FailureTypeBarChart from "../../components/FailureTypeBarChart";
import "./Analytics.css";

function Analytics() {
  return (
    <>
      <Navbar />
      <h1>Analytics</h1> 
      <br /><br /><br />

      <div className="charts">
        <PieCharts />
      </div>

      <div className="graphs">
        <FailureBarChart />
        <FailureTypeBarChart />
      </div>
    </>
  );
}

export default Analytics;
