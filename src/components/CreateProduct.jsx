import axios from "axios";
import React, { useRef } from "react";

function generateId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
  let id = "";
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id;
}

function CreateProduct() {
  const newProductTitleRef = useRef(null);
  const newProductPriceRef = useRef(null);
  const newProductCategoryRef = useRef(null);
  const productUrl = `http://localhost:3000/api/products`;

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const newProduct = {
      _id: generateId(),
      name: newProductTitleRef.current.value,
      price: newProductPriceRef.current.value,
      category: newProductCategoryRef.current.value,
    };
    try {
      await axios.post(productUrl, newProduct);
      newProductTitleRef.current.value = "";
      newProductPriceRef.current.value = "";
      newProductCategoryRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form className=" flex flex-col" onSubmit={handleFormSubmit}>
        <label htmlFor="newProductName">product name</label>
        <input
          className=" border-2 border-black"
          type="text"
          id="newProductName"
          ref={newProductTitleRef}
          required
        />
        <label htmlFor="newProductPrice">product price</label>
        <input
          className=" border-2 border-black"
          type="text"
          id="newProductPrice"
          ref={newProductPriceRef}
          required
        />
        <label htmlFor="newProductCategory">product category</label>
        <input
          className=" border-2 border-black"
          type="text"
          id="newProductCategory"
          ref={newProductCategoryRef}
          required
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default CreateProduct;
