import React from "react";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  return (
    <div key={product._id} className=" max-w-72">
      <Link to={product._id} key={product._id}>
        <li className=" list-none flex gap-4 my-4 border-gray-600 border-spacing-2 border-2 rounded-lg max-w-72 shadow-md hover:-translate-y-1 cursor-pointer pl-4 transition-transform">
          <p className=" text-red-700">{product.name}</p>
          <p>{product.price}</p>
          <p>{product.category}</p>
        </li>
      </Link>
    </div>
  );
}

export default ProductItem;
