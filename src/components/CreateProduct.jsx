import axios from "axios";
import React, { useRef } from "react";

function CreateProduct(props) {
  const { setProducts } = props;
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
      setProducts((prev) => {
        return [...prev, response.data];
      });
      newProductTitleRef.current.value = "";
      newProductPriceRef.current.value = "";
      newProductCategoryRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2 className=" text-3xl font-bold">Create a new product</h2>
      <form className=" flex flex-col mb-7" onSubmit={handleFormSubmit}>
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
        <button
          className=" border-2 border-rose-800 w-32 rounded-lg mt-4"
          type="submit"
        >
          submit
        </button>
      </form>
    </>
  );
}

export default CreateProduct;
