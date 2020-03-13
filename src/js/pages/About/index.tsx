import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";

const About: React.FC = props => {
  return (
    <div className="about-wrapper">
      About
      <Link to="/">
        go back
      </Link>
    </div>
  );
};

export default About;
