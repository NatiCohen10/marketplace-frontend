import axios from "axios";
import React, { useContext, useState } from "react";
import InputField from "./ui/InputField";
import CustomChip from "./ui/CustomChip";
import FormInputWrapper from "./ui/FormInputWrapper";
import CustomButton from "./ui/Button";
import UserContext from "../contexts/UserContext";

function CreateProduct(props) {
  const { setProducts, page, pagination, setPagination } = props;
  const { setUser } = useContext(UserContext);

  // State variables for input values
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [activeCategories, setActiveCategories] = useState([]);
  const token = localStorage.getItem("token");

  const categories = [
    "Electronics",
    "Computers",
    "Books",
    "Office Supplies",
    "Furniture",
    "Bags",
  ];

  const productUrl = `http://localhost:3000/api/products`;

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const newProduct = {
      name: productName,
      price: productPrice,
      quantity: productCount,
      categories: activeCategories,
    };
    try {
      const response = await axios.post(productUrl, newProduct, {
        headers: {
          Authorization: token,
        },
      });
      const addedProduct = response.data.savedProduct;
      const { userAddedWithoutPassword } = response.data;
      console.log(userAddedWithoutPassword.products);
      // const addedProduct = response.data;

      // Update products state if we are on the last page
      if (page === pagination.totalPages) {
        setProducts((prev) => {
          if (prev.length < 5) {
            // If the current page has less than 5 products, we can add the new one
            return [...prev, addedProduct];
          }
          // If the current page is full, we don't add the product to the state
          return prev;
        });
      }
      setUser(userAddedWithoutPassword);
      setProductName("");
      setProductPrice("");
      setProductCategory("");
      setProductCount(0);
      setActiveCategories([]);
      // Update the total items and potentially the total pages
      setPagination((prev) => ({
        ...prev,
        totalItems: prev.totalItems + 1,
        totalPages: Math.ceil((prev.totalItems + 1) / 5),
      }));
    } catch (error) {
      console.error(error);
    }
  }

  function toggleChipActive(category) {
    if (activeCategories.includes(category)) {
      setActiveCategories((prev) => {
        return prev.filter((cat) => cat !== category);
      });
    } else {
      setActiveCategories((prev) => [...prev, category]);
    }
    console.log(activeCategories);
  }

  return (
    <>
      <form
        className="flex flex-col mb-7 bg-zinc-200 shadow-md shadow-black p-5 rounded-md mt-6 w-full"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-3xl font-bold my-5 lg:text-5xl lg:mb-8">
          Create a new product
        </h2>
        <FormInputWrapper>
          <InputField
            type="text"
            label={"Product Name"}
            id="newProductName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            login
          />
        </FormInputWrapper>
        <FormInputWrapper>
          <InputField
            type="text"
            label={"Product Price"}
            id="newProductPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            login
          />
        </FormInputWrapper>
        <FormInputWrapper>
          <InputField
            type="number"
            label={"Product count"}
            id="newProductCount"
            value={productCount}
            onChange={(e) => setProductCount(parseInt(e.target.value))}
            required
            login
          />
        </FormInputWrapper>
        <div className=" grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, index) => (
            <CustomChip
              key={index}
              isActive={activeCategories.includes(cat)}
              toggleActive={() => toggleChipActive(cat)}
            >
              {cat}
            </CustomChip>
          ))}
        </div>
        <CustomButton formButton type="submit">
          Submit
        </CustomButton>
      </form>
    </>
  );
}

export default CreateProduct;
