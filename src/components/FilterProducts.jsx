// FilterProducts.js
import React from "react";
import InputField from "./ui/InputField";
import CheckboxField from "./ui/CheckboxField";

function FilterProducts(props) {
  const { name, setSearchParams, searchParams, minPrice, maxPrice } = props;

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
    searchParams.set("page", "1");
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
      <InputField
        id="minPrice"
        label="Minimum Price"
        type="number"
        name="minPrice"
        value={minPrice}
        onChange={handleFilterChange}
      />
      <InputField
        id="maxPrice"
        label="Maximum Price"
        type="number"
        name="maxPrice"
        value={maxPrice}
        onChange={handleFilterChange}
      />
      <CheckboxField
        id="available"
        label="In Stock Only"
        name="isInStock"
        checked={searchParams.get("isInStock") === "true"}
        onChange={handleFilterChange}
      />
    </div>
  );
}

export default FilterProducts;
