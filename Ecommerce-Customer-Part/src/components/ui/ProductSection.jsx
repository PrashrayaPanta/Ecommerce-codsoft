import React from "react";
import ProductCard from "./ProductCard";
import { useState } from "react";
import LoadingComponent from "./LoadingComponent";

const ProductSection = ({ products = [] }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-red-500 flex">
      {loading ? (
        <LoadingComponent />
      ) : (
        products.map((product) => <ProductCard product={product} />)
      )}
    </div>
  );
};

export default ProductSection;
