import React from "react";
import { Link } from "react-router-dom";
import CustomChip from "./ui/CustomChip";

function ProductItem({ product }) {
  return (
    <div
      key={product._id}
      className=" rounded-lg shadow-lg shadow-gray-600 border border-zinc-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-600 cursor-pointer transition-transform w-full overflow-hidden lg:hover:-translate-y-3"
    >
      <Link to={product._id} key={product._id}>
        <img
          className="w-full "
          src="src\images\700x400.png"
          alt={product.name}
        />

        <li className=" list-none flex flex-col px-7 py-8 justify-between h-56 md:justify-between md:h-64   ">
          <h2 className=" text-primary font-bold text-2xl mb-3">
            {product.name}
          </h2>
          <p className=" text-slate-700">${product.price}</p>
          <div className=" flex gap-3 flex-wrap mt-4">
            {product.category.map((category, index) => {
              return (
                <CustomChip productChip key={index}>
                  {category}
                </CustomChip>
              );
            })}
          </div>
        </li>
      </Link>
    </div>
  );
}

export default ProductItem;
