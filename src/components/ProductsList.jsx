import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";

const PRODUCTS_URL = "http://localhost:3000/api/products";

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(PRODUCTS_URL);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPosts();
  }, [products]);
  return (
    <>
      {products.map((product) => {
        return <ProductItem product={product} key={product._id} />;
      })}
    </>
  );
}

export default ProductsList;
