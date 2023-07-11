import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <div className={`card-container ${props.className}`}>{props.children}</div>
  );
};

export default Card;
