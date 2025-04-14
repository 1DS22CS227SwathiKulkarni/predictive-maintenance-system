import React, { useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FaRightLong } from "react-icons/fa6";
import { useTheme } from "../../context/ThemeContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <Navbar />

      <div className="theme-toggle">
        <label className="switch">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <span className="slider round"></span>
        </label>
        <span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
      </div>

      <div className="container-one">
        {/* <img src="/geometric.jpg" alt="..." /> */}
        <h1 className="heading">ForeSight</h1>
        AI Predictive Maintenance System <br /> Smarter Maintenance, Stronger Machines
        <button className="predict-button" onClick={() => navigate("/predict")}>
          Test now <FaRightLong />
        </button>
        <div className="gear-one">
          <i className="fa fa-cog spin-custom fa-6x"></i>
        </div>
        <div className="gear-two">
          <i className="fa fa-cog spin-custom fa-2x"></i>
        </div>
      </div>
      
    </>
  );
};

export default Dashboard;
