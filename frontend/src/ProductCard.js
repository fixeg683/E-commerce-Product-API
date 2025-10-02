import React from "react";
import { Card } from "react-bootstrap";

const ProductCard = ({ product }) => {
  // ✅ Use product.image if available, else fallback placeholder
  const imageUrl =
    product.image && product.image !== ""
      ? product.image
      : "https://via.placeholder.com/300x200.png?text=No+Image";

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={product.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="fw-bold">{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {product.category || "Uncategorized"}
        </Card.Subtitle>
        <Card.Text>
          {product.description
            ? product.description.substring(0, 100) + "..."
            : "No description available."}
        </Card.Text>
        <Card.Text className="fw-bold text-success">
          ${parseFloat(product.price).toFixed(2)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard; // ✅ Required
