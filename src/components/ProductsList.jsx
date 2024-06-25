import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import FilterProducts from "./FilterProducts";
import CreateProduct from "./CreateProduct";

const PRODUCTS_URL = "http://localhost:3000/api/products";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  });

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
    const abortController = new AbortController();
    async function fetchProducts() {
      try {
        const response = await axios.get(PRODUCTS_URL + location.search, {
          signal: abortController.signal,
        });
        const productCount = await axios.get(
          PRODUCTS_URL + "/count" + location.search,
          { signal: abortController.signal }
        );
        const { limit, products, currentPage } = response.data;
        const { count } = productCount.data;
        const totalPages = Math.ceil(count / limit);
        setProducts(products);
        setPagination({ totalItems: count, totalPages, currentPage });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error(error);
        }
      }
    }
    fetchProducts();

    return () => {
      abortController.abort();
    };
  }, [location.search]);

  function handlePageChange(newPage) {
    setSearchParams((prev) => {
      prev.set("page", newPage);
      return prev;
    });
  }

  return (
    <>
      <h2 className=" text-4xl font-bold">All products</h2>
      <FilterProducts
        name={name}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        minPrice={minPrice}
        maxPrice={maxPrice}
        isInStock={isInStock}
      />
      {products.map((product) => {
        return <ProductItem product={product} key={product._id} />;
      })}
      <div>
        <button
          disabled={pagination.currentPage === 1}
          onClick={() => handlePageChange(pagination.currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <button
          disabled={pagination.currentPage === pagination.totalPages}
          onClick={() => handlePageChange(pagination.currentPage + 1)}
        >
          Next
        </button>
      </div>
      <CreateProduct setProducts={setProducts} />
    </>
  );
}

export default ProductsList;
