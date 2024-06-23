import React from "react";
import CreateProduct from "../components/CreateProduct";
import ProductsList from "../components/ProductsList";

function AllProductsPage() {
  return (
    <>
      <CreateProduct />
      <ProductsList />;
    </>
  );
}

export default AllProductsPage;
