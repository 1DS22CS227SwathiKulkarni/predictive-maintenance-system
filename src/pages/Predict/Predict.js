import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Predict.css";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "sonner";
import ProgressBar from "../../components/ProgressBar";

const Predict = () => {
  const [formData, setFormData] = useState({
    mach_type: "",
    air_temp: "",
    process_temp: "",
    speed: "",
    torque: "",
    wear: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict/",
        formData
      );
      const predictionResult = response.data;

      navigate("/result", { state: { predictionResult } });
    } catch (error) {
      toast.error(error + "");
    }
  };

  const calculateProgress = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(
      (val) => val !== ""
    ).length;
    return Math.round((filledFields / totalFields) * 100);
  };

  const progress = calculateProgress();

  return (
    <>
      <Toaster richColors position="bottom-right" />
      <Navbar />
      <div className="predict-page">
        {/* <h1 className="predict-heading">Predict</h1>*/}
        <div className="form-layout">
          <div className="progress-container  ">
            <ProgressBar percentage={progress} />
          </div>
          {/* <img src="cog.png" alt="..." /> */}
          <form className="predict-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="mach_type">Machine Type:</label>
              <input
                type="text"
                name="mach_type"
                id="mach_type"
                placeholder="Enter Machine Type (L=1, M=2, H=3)"
                value={formData.mach_type}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="air_temp">Air Temperature (K):</label>
              <input
                type="number"
                step="0.01"
                name="air_temp"
                id="air_temp"
                placeholder="e.g: 300.5"
                value={formData.air_temp}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="process_temp">Process Temperature (K):</label>
              <input
                type="number"
                step="0.01"
                name="process_temp"
                id="process_temp"
                placeholder="e.g: 310.2"
                value={formData.process_temp}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="speed">Rotational Speed (rpm):</label>
              <input
                type="number"
                name="speed"
                id="speed"
                placeholder="e.g: 1500"
                value={formData.speed}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="torque">Torque (Nm):</label>
              <input
                type="number"
                step="0.01"
                name="torque"
                id="torque"
                placeholder="e.g: 50.5"
                value={formData.torque}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="wear">Tool Wear (min):</label>
              <input
                type="number"
                name="wear"
                id="wear"
                placeholder="e.g: 20"
                value={formData.wear}
                onChange={handleChange}
                required
              />
            </div>
            <input type="submit" value="Predict Failure" />
          </form>
        </div>
      </div>
      {/* <GiGears className="gear-icon" /> */}
    </>
  );
};

export default Predict;
