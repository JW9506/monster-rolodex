import React from "react";
import "./index.scss";
import Card from "../Card";
import { Monster } from "../../App";

interface CardListProps {
  monsters: Monster[];
}
const CardList: React.FC<CardListProps> = ({ monsters }) => {
  return (
    <div className="card-list">
      {monsters.map(monster => (
        <Card key={monster.id} monster={monster} />
      ))}
    </div>
  );
};

export default CardList;
