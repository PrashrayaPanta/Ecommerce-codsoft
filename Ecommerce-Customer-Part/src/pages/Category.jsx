import React from "react";
import ProductCard from "../components/ui/ProductCard";
import { useState , useEffect} from "react";

import {useParams} from "react-router-dom";
import ProductSection from "../components/ui/ProductSection";
import http from "../http";



const Category = () => {
  const [category, setCategory] = useState({});

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    http
      .get(`/api/categories/${id}`)
      .then(({ data }) => {
        setCategory(data.category);
        return http.get(`/api/categories/${id}/products`);
      })
      .then(({ data }) => setProducts(data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);


  console.log(products);
  

  return (
    <div>
        <ProductSection  products={products}/>
    </div>
  );
};

export default Category;
