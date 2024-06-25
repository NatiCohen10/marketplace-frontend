import React from "react";

function FilterProducts(props) {
  const { name, setSearchParams, searchParams, minPrice, maxPrice } = props;

  const toggleInStock = () => {
    setSearchParams((prev) => {
      const isInStock = prev.get("isInStock") === "true";
      prev.set("isInStock", isInStock ? "false" : "true");
      return prev;
    });
  };
  return (
    <div>
      <div>
        <label htmlFor="productName">product name</label>
        <input
          id="productName"
          className=" border-2 border-black"
          type="text"
          value={name || ""}
          onChange={(e) =>
            setSearchParams((prev) => {
              prev.set("name", e.target.value);
              return prev;
            })
          }
        />
      </div>

      <div className="">
        <label htmlFor="minPrice">minimum price</label>
        <input
          className=" border-2 border-black "
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={(e) =>
            setSearchParams((prev) => {
              prev.set("minPrice", e.target.value);
              return prev;
            })
          }
        />
      </div>
      <div className="">
        <label htmlFor="maxNum">maximum price</label>
        <input
          className=" border-2 border-black "
          type="number"
          id="maxNum"
          value={maxPrice}
          onChange={(e) =>
            setSearchParams((prev) => {
              prev.set("maxPrice", e.target.value);
              return prev;
            })
          }
        />
      </div>
      <div className="">
        <label>
          <input
            className="border-2 border-black"
            type="checkbox"
            id="available"
            checked={searchParams.get("isInStock") === "true"}
            onChange={toggleInStock}
          />
          In Stock Only
        </label>
      </div>
    </div>
  );
}

export default FilterProducts;
