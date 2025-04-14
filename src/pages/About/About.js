import React from "react";
import Navbar from "../../components/Navbar";
import Carousel from "../../components/Carousel";
import CollapsibleSection from "../../components/CollapsibleSection";
import "./About.css";
import { Toaster } from "sonner";
import service from "../../assets/service.png";

const About = () => {
  return (
    <>
      <Navbar />

      <h1>About ForeSight</h1>
      <div className="image-block">
        <img className="person" src={service} alt=".." />
        <h4 className="typing-text">Tired of fixing machine failures?</h4>
        <h4>Here's the solution!</h4>
      </div>
      <p>
        Welcome to our{" "}
        <strong>AI-powered Predictive Maintenance Platform</strong> — a smart
        solution built to reduce machine downtime, lower maintenance costs, and
        increase operational efficiency in industrial environments by analyzing
        sensor data and predicting equipment failures.
      </p>

      <Carousel />

      <div className="about-content">
        <br />
        <br />
        <CollapsibleSection title="Our Mission">
          <p>
            To revolutionize industrial maintenance through AI and real-time
            data analysis by predicting equipment failures <em>before</em> they
            happen.
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="How It Works">
          <ul>
            <li>
              Monitor key machine parameters (temperature, speed, torque, tool
              wear)
            </li>
            <li>Predict failures and abnormal behaviors with AI</li>
            <li>Classify failure types using machine learning models</li>
            <li>Alert maintenance teams in real-time</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Key Features">
          <ul>
            <li>Real-time dashboard for machine status</li>
            <li>AI-based failure prediction</li>
            <li>Early alerting system for anomalies</li>
            <li>Historical maintenance record</li>
            <li>Cloud-ready and scalable infrastructure</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="About our System">
          <p>
            There are 3 machine types operating at different thresholds and wear
            tolerance:
          </p>
          <ul>
            <li>L → Light-duty machine</li>
            <li>M → Medium-duty machine</li>
            <li>H → Heavy-duty machine</li>
          </ul>
          <p>Key Parameters include:</p>
          <ul>
            <li>
              Air Temperature [K] – ambient temperature around the machine
            </li>
            <li>
              Process Temperature [K] – internal temperature during operation
            </li>
            <li>Rotational Speed [rpm] – speed of shaft/tool</li>
            <li>Torque [Nm] – rotational force</li>
            <li>Tool Wear [min] – duration tool has been in use</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Target and Labels">
          <p>Target:</p>
          <ul>
            <li>No failure</li>
            <li>Failure occurred</li>
          </ul>
          <p>Failure Type:</p>
          <ul>
            <li>No Failure</li>
            <li>Tool Wear</li>
            <li>Heat Dissipation Failure</li>
            <li>Power Failure</li>
            <li>Overstrain Failure</li>
            <li>Random Failures</li>
          </ul>
        </CollapsibleSection>
      </div>
      <Toaster richColors position="bottom-right" />
    </>
  );
};

export default About;
