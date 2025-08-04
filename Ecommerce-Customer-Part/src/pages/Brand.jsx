import React from "react";
import ProductCard from "../components/ui/ProductCard";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import ProductSection from "../components/ui/ProductSection";
import http from "../http";
import LoadingComponent from "../components/ui/LoadingComponent";

const Brand = () => {
  const [brand, setBrand] = useState({});

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const {slug } = useParams();

  useEffect(() => {
    setLoading(true);
    http
      .get(`/api/brands/${slug}`)
      .then(({ data }) => {
        setBrand(data.brand);
        return http.get(`/api/brands/${slug}/products`);
      })
      .then(({ data }) => setProducts(data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  console.log(products);

  return (
    <div>
      {loading ? <LoadingComponent /> : <ProductSection products={products} />}
    </div>
  );
};

export default Brand;
