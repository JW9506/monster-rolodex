import React from "react";
import "./index.scss";
import { Monster } from "../../App";

interface CardProps {
  monster: Monster;
}
const Card: React.FC<CardProps> = ({ monster }) => {
  return (
    <div className="card-container">
      <img src={`https://robohash.org/${monster.id}?set=set2&size=180x180`} alt="monster" />
      <h2>{monster.name}</h2>
      <p>{monster.email}</p>
    </div>
  );
};

export default Card;
