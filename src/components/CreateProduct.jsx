import axios from "axios";
import React, { useRef } from "react";

function CreateProduct(props) {
  const { setProducts, page, pagination, setPagination } = props;
  const newProductTitleRef = useRef(null);
  const newProductPriceRef = useRef(null);
  const newProductCategoryRef = useRef(null);
  const productUrl = `http://localhost:3000/api/products`;

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const newProduct = {
      name: newProductTitleRef.current.value,
      price: newProductPriceRef.current.value,
      category: newProductCategoryRef.current.value,
    };
    try {
      const response = await axios.post(productUrl, newProduct);
      const addedProduct = response.data;
      console.log(pagination);
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

      // Clear input fields
      newProductTitleRef.current.value = "";
      newProductPriceRef.current.value = "";
      newProductCategoryRef.current.value = "";

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

  return (
    <>
      <h2 className="text-3xl font-bold">Create a new product</h2>
      <form className="flex flex-col mb-7" onSubmit={handleFormSubmit}>
        <label htmlFor="newProductName">Product name</label>
        <input
          className="border-2 border-black"
          type="text"
          id="newProductName"
          ref={newProductTitleRef}
          required
        />
        <label htmlFor="newProductPrice">Product price</label>
        <input
          className="border-2 border-black"
          type="text"
          id="newProductPrice"
          ref={newProductPriceRef}
          required
        />
        <label htmlFor="newProductCategory">Product category</label>
        <input
          className="border-2 border-black"
          type="text"
          id="newProductCategory"
          ref={newProductCategoryRef}
          required
        />
        <button
          className="border-2 border-rose-800 w-32 rounded-lg mt-4"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateProduct;
