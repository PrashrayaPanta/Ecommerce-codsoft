import React from "react";
import ProductCard from "../components/ui/ProductCard";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import ProductSection from "../components/ui/ProductSection";
import http from "../http";
import LoadingComponent from "../components/ui/LoadingComponent";



 const Categories = () => {
  const [category, setCategory] = useState({});

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    http
      .get(`/api/categories/${slug}`)
      .then(({ data }) => {
        setCategory(data.category);
        return http.get(`/api/categories/${slug}/products`);
      })
      .then(({ data }) => setProducts(data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);


  useEffect(() =>{

    const getCategoryProducts = async () => {
      try {
        setLoading(true);
        const { data } = await http.get(`/api/categories/${slug}/products`);
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategoryProducts();


  }, [slug]);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {products.length > 0 ? (
            <ProductSection
              title={`Category of`}
              products={products}
            />
          ) : (
            <h1 className="text-center">Data Not available</h1>
          )}
        </>
      )}
    </>
  );
};


export default Categories;
