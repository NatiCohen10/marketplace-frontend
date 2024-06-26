import React, { useState } from "react";
import CheckboxField from "./ui/CheckboxField";

function CategoryFilter() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    "Electronics",
    "Accessories",
    "Wearables",
    "Smart Home",
    "Health",
    "Home Appliances",
    "Automotive",
  ];

  return (
    <>
      {categories.map((category, index) => {
        return (
          <CheckboxField
            key={index}
            id={category}
            label={category}
          ></CheckboxField>
        );
      })}
    </>
  );
}

export default CategoryFilter;
