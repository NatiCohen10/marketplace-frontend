import React from "react";
import { Link } from "react-router-dom";
import CustomChip from "./ui/CustomChip";
import { cn } from "../utils/cn";

function ProductItem({ product, profileItem }) {
  return (
    <div
      key={product._id}
      className={cn(
        "rounded-lg shadow-lg  border  hover:-translate-y-1 hover:shadow-xl cursor-pointer transition-transform w-full overflow-hidden lg:hover:-translate-y-3",
        profileItem && "inline-block max-w-64 mr-9"
      )}
    >
      <Link to={`/products/${product._id}`} key={product._id}>
        <img
          className={cn("w-full ", profileItem && "max-w-64")}
          src="src\images\700x400.png"
          alt={product.name}
        />

        <li className=" list-none flex flex-col px-7 py-8 justify-between h-56 md:justify-between md:h-64   ">
          <h2 className=" text-primary font-bold text-2xl mb-3">
            {product.name}
          </h2>
          <p className=" text-slate-700">${product.price}</p>
          <p>{product._id}</p>
          <div className=" flex gap-3 flex-wrap mt-4">
            {product.categories.map((category, index) => {
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
