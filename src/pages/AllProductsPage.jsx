import React from "react";
import CreateProduct from "../components/CreateProduct";
import ProductsList from "../components/ProductsList";

function AllProductsPage() {
  return (
    <div className="  flex justify-center">
      <div className=" w-7/12">
        <ProductsList />
      </div>
    </div>
  );
}

export default AllProductsPage;
