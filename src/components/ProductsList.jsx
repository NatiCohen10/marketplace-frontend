import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ProductItem from "./ProductItem";

const PRODUCTS_URL = "http://localhost:3000/api/products";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({
    name: "",
    minPrice: "",
    maxPrice: "",
    isInStock: "",
  });
  const location = useLocation();
  const name = searchParams.get("name");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const isInStock = searchParams.get("isInStock");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(PRODUCTS_URL + location.search);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, [products, location.pathname]);

  return (
    <>
      <h2 className=" text-4xl font-bold">All products</h2>
      <input
        type="text"
        value={name || ""}
        onChange={(e) =>
          setSearchParams((prev) => {
            prev.set("name", e.target.value);
            return prev;
          })
        }
      />
      {products.map((product) => {
        return <ProductItem product={product} key={product._id} />;
      })}
    </>
  );
}

export default ProductsList;
