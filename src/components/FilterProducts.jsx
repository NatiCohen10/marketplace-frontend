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
    "Accessories",
    "Wearables",
    "Smart Home",
    "Health",
    "Home Appliances",
    "Automotive",
  ];

  function handleFilterByCategory(ev) {
    const categoryName = ev.target.name;
    const checked = ev.target.checked;
    const category = searchParams.get("category");

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
      searchParams.set("category", updatedCategory.join(","));
    } else {
      searchParams.delete("category");
    }

    setSearchParams(searchParams);
  }

  function handlePriceChange(min, max) {
    searchParams.set("price", `${min}-${max}`);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <InputField
        id="productName"
        label="Product Name"
        type="text"
        name="name"
        value={name}
        onChange={handleFilterChange}
      />
      <RangeSlider
        max={1300}
        min={0}
        onRangeChange={handlePriceChange}
        initialValue={[currentMinPrice, currentMaxPrice]}
      />
      <CheckboxField
        id="available"
        label="In Stock Only"
        name="isInStock"
        checked={searchParams.get("isInStock") === "true"}
        onChange={handleFilterChange}
      />
      {categories.map((category, index) => {
        return (
          <CheckboxField
            key={index}
            id={category}
            label={category}
            name={category}
            onChange={handleFilterByCategory}
          ></CheckboxField>
        );
      })}
    </div>
  );
}

export default FilterProducts;
