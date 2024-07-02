// FilterProducts.js
import React, { useState } from "react";
import InputField from "./ui/InputField";
import CheckboxField from "./ui/CheckboxField";
import RangeSlider from "./RangeSlider";

function FilterProducts(props) {
  const {
    name,
    setSearchParams,
    searchParams,
    currentMinPrice,
    currentMaxPrice,
    currentCategories,
  } = props;

  function handleFilterChange(ev) {
    const filterName = ev.target.name;

    if (ev.target.type === "checkbox") {
      const checked = ev.target.checked;
      searchParams.set(filterName, checked);
      if (!checked) {
        searchParams.delete(filterName);
      }
    } else {
      const value = ev.target.value;
      searchParams.set(filterName, value);
      if (!value) {
        searchParams.delete(filterName);
      }
    }
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  const categories = [
    "Electronics",
    "Computers",
    "Books",
    "Office Supplies",
    "Furniture",
    "Bags",
  ];

  function handleFilterByCategory(ev) {
    const categoryName = ev.target.name;
    const checked = ev.target.checked;
    const category = searchParams.get("categories");

    let updatedCategory = category ? category.split(",") : [];

    if (checked) {
      if (!updatedCategory.includes(categoryName)) {
        updatedCategory.push(categoryName);
      }
    } else {
      updatedCategory = updatedCategory.filter(
        (category) => category !== categoryName
      );
    }

    if (updatedCategory.length > 0) {
      searchParams.set("categories", updatedCategory.join(","));
    } else {
      searchParams.delete("categories");
    }

    setSearchParams(searchParams);
  }

  function handlePriceChange(min, max) {
    searchParams.set("price", `${min}-${max}`);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <h2 className=" text-4xl font-bold">Filter products</h2>
      <div className=" lg:flex lg:gap-4  items-center">
        <div>
          <div className=" gap-4  sm:flex ">
            <div className=" mb-4">
              <InputField
                id="productName"
                label="Product Name:"
                type="text"
                name="name"
                value={name}
                onChange={handleFilterChange}
              />
            </div>
            <CheckboxField
              stockCheck
              id="available"
              label="In Stock Only"
              name="isInStock"
              checked={searchParams.get("isInStock") === "true"}
              onChange={handleFilterChange}
            />
          </div>
          <RangeSlider
            max={1300}
            min={0}
            onRangeChange={handlePriceChange}
            initialValue={[currentMinPrice, currentMaxPrice]}
          />
        </div>
        <div className=" my-4">
          <h3 className=" mb-2 text-xl lg:mb-7">Filter by category: </h3>
          <div className=" grid grid-cols-2 gap-1 lg:gap-6 lg:grid-cols-3">
            {categories.map((category, index) => {
              return (
                <CheckboxField
                  key={index}
                  id={category}
                  label={category}
                  name={category}
                  checked={currentCategories.includes(category)}
                  onChange={handleFilterByCategory}
                ></CheckboxField>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterProducts;
