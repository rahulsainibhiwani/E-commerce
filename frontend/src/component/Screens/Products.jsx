import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating.jsx";
import { useNavigate, Link } from "react-router-dom";

const Products = ({ product }) => {
  let Navigate = useNavigate();
  return (
    <div>
      <Card className="my-3 p-3">
        <Link to={`/${product._id}`}>
          <Card.Img variant="top" src={product.image} />
        </Link>
        <Card.Body>
          <Link style={{ textDecoration: "none" }} to={`/${product._id}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Card.Text as="h4" className="my-3">
            &#8377; {product.price}
          </Card.Text>
          <Rating value={product.rating} text={product.numReviews} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Products;
