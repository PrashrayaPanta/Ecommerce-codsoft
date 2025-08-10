import React, { useState } from "react";
import ProductCard from "./ProductCard";
import LoadingComponent from "./LoadingComponent";

const ProductSection = ({title, loading, products = [] }) => {


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {loading ? (
        <LoadingComponent />
      ) : products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ): <h1 className="text-center px-3">No Data Found</h1>}
    </div>
  );
};

export default ProductSection;
