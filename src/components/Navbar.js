import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar-container">
      <h3 className="navbar-brand">ForeSight</h3>

      <div className="nav-links">
        <button onClick={() => navigate("/")} className="nav-button">
          Dashboard
        </button>
        <button onClick={() => navigate("/about")} className="nav-button">
          About
        </button>
        <button onClick={() => navigate("/analytics")} className="nav-button">
          Analytics
        </button>
        <button onClick={() => navigate("/predict")} className="nav-button">
          Predict
        </button>
        <button onClick={() => navigate("/history")} className="nav-button">
          History
        </button>
      </div>

      <div className="nav-icons">
        <a href="#">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
