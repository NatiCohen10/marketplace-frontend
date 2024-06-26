import React from "react";
import CreateProduct from "../components/CreateProduct";
import ProductsList from "../components/ProductsList";

function AllProductsPage() {
  return (
    <div className=" ">
      <div className=" mx-4 sm:mx-10 lg:mx-20">
        <ProductsList />
      </div>
    </div>
  );
}

export default AllProductsPage;
