import React from "react";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  return (
    <div key={product._id} className="">
      <Link to={product._id} key={product._id}>
        <li className=" list-none flex flex-col my-4 border-gray-600 border-spacing-2 border-2 rounded-lg shadow-md hover:-translate-y-1 cursor-pointer px-7 py-8 transition-transform w-full md:grid md:grid-cols-3-1-2  ">
          <p className=" text-red-700">{product.name}</p>
          <p>{product.price}</p>
          <p className=" justify-self-end">{product.category}</p>
        </li>
      </Link>
    </div>
  );
}

export default ProductItem;
