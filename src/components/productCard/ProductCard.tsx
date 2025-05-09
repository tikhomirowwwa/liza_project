import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./ProductCard.scss";

export const ProductCard = (props) => {
  const { cardData } = props;
  return (
    <Card className="product-card" style={{ width: "18rem" }}>
      <Card.Img
        className="product-card__img"
        variant="top"
        src={cardData.image}
      />
      <Card.Body>
        <Card.Title>{cardData.title}</Card.Title>
        <Card.Text>{cardData.description}</Card.Text>
        <Button variant="warning">{cardData.price}$</Button>
      </Card.Body>
    </Card>
  );
};
