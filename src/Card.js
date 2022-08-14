import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

function ImageCard(props) {
  return (
    <div className="Card">
      <Card>
        <Card.Img
          variant="top"
          src={props.imagelink}
          style={{ height: "40vh" }}
        />
        <Card.Body text="black">
          <Card.Title>{props.message}</Card.Title>
          Likes: {props.likes}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ImageCard;
