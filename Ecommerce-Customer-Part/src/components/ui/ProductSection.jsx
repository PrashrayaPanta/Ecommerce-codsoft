import React, { useState } from "react";
import ProductCard from "./ProductCard";
import LoadingComponent from "./LoadingComponent";

const ProductSection = ({ products = [] }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-red-500 flex">
      {loading ? (
        <LoadingComponent />
      ) : products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <h1>No Products of that Category</h1>
      )}
    </div>
  );
};

export default ProductSection;
