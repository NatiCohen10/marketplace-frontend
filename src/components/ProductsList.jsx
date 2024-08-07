import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import FilterProducts from "./FilterProducts";
import CreateProduct from "./CreateProduct";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useDebounce from "../hooks/UseDebounce";
import PageRange from "./PageRange";
import api from "../services/api.service";

const PRODUCTS_URL = "/products";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearchItem = useDebounce(searchParams, 400);

  const location = useLocation();

  const name = searchParams.get("name") || "";
  let categories = searchParams.get("categories");
  if (categories) {
    categories = categories.split(",");
  } else {
    categories = [];
  }
  const isInStock = searchParams.get("isInStock");
  const page = parseInt(searchParams.get("page")) || 1;
  let priceRange = searchParams.get("price");

  if (priceRange) {
    priceRange = priceRange.split("-").map(Number);
  } else {
    priceRange = [0, 1300];
  }

  const currentMinPrice = priceRange[0];
  const currentMaxPrice = priceRange[1];

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await api.get(PRODUCTS_URL + location.search, {
          signal: abortController.signal,
        });
        const productCount = await api.get(
          PRODUCTS_URL + "/count" + location.search,
          { signal: abortController.signal }
        );
        const { limit, products } = response.data;
        const { count } = productCount.data;
        const totalPages = Math.ceil(count / limit);

        //might cause bugs with query
        if (page > totalPages && products.length !== 0) {
          setSearchParams((prev) => {
            prev.set("page", totalPages.toString());
            return prev;
          });
          return;
        }

        setProducts(products);

        setPagination({ totalItems: count, totalPages });
      } catch (error) {
        if (api.isCancel(error)) {
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
  }, [debouncedSearchItem]);

  return (
    <>
      <div className=" mt-20 ">
        <h1 className=" text-4xl font-bold mb-4 lg:text-7xl  lg:mb-14">
          All products
        </h1>
        <FilterProducts
          currentCategories={categories}
          name={name}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
          currentMaxPrice={currentMaxPrice}
          currentMinPrice={currentMinPrice}
          isInStock={isInStock}
        />
        <div className=" grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3 lg:mb-6 xl:grid-cols-4">
          {products.map((product) => {
            return <ProductItem product={product} key={product._id} />;
          })}
        </div>
        <PageRange
          page={page}
          pagination={pagination}
          setSearchParams={setSearchParams}
        />

        <CreateProduct
          setProducts={setProducts}
          page={page}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </>
  );
}

export default ProductsList;
