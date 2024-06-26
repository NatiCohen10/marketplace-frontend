import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import FilterProducts from "./FilterProducts";
import CreateProduct from "./CreateProduct";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PRODUCTS_URL = "http://localhost:3000/api/products";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const name = searchParams.get("name") || "";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const isInStock = searchParams.get("isInStock");
  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await axios.get(PRODUCTS_URL + location.search, {
          signal: abortController.signal,
        });
        const productCount = await axios.get(
          PRODUCTS_URL + "/count" + location.search,
          { signal: abortController.signal }
        );
        const { limit, products } = response.data;
        const { count } = productCount.data;
        const totalPages = Math.ceil(count / limit);

        if (page > totalPages) {
          setSearchParams((prev) => {
            prev.set("page", totalPages.toString());
            return prev;
          });
          return;
        }

        setProducts(products);
        setPagination({ totalItems: count, totalPages });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();

    return () => {
      abortController.abort();
    };
  }, [location.search]);

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setSearchParams((prev) => {
      prev.set("page", newPage);
      return prev;
    });
  }

  function renderPageNumbers() {
    const pageNumbers = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pageNumbers.push(
        <p
          key={i}
          className={`mx-2 ${
            i === page ? "text-blue-500 font-bold" : "text-gray-500"
          }`}
        >
          {i}
        </p>
      );
    }
    return pageNumbers;
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

      <div className="mt-4 flex items-center">
        <button
          className={`border-2 border-gray-300 px-3 py-1 rounded-lg mr-2 ${
            page === 1 ? "text-gray-500 cursor-not-allowed" : "text-black"
          }`}
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          <ChevronLeft size={28} />
        </button>
        {renderPageNumbers()}
        <button
          className={`border-2 border-gray-300 px-3 py-1 rounded-lg mr-2 ${
            page === pagination.totalPages
              ? "text-gray-500 cursor-not-allowed"
              : "text-black"
          }`}
          disabled={page === pagination.totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          <ChevronRight size={28} />
        </button>
      </div>

      <CreateProduct
        setProducts={setProducts}
        page={page}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
}

export default ProductsList;
