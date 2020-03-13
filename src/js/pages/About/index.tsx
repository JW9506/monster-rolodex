import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "Config";

const About: React.FC = props => {
  return (
    <div className="about-wrapper">
      About
      <Link to={PUBLIC_URL}>go back</Link>
    </div>
  );
};

export default About;
