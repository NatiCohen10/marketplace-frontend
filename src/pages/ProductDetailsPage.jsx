import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetailsPage() {
  const [product, setProduct] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const { id: productId } = useParams();
  const newTitleRef = useRef(null);
  const navigate = useNavigate();

  const ProductUrl = `http://localhost:3000/api/products`;

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await axios.get(ProductUrl + "/" + productId);
        setProduct(response.data);
        setEditedTitle(response.data.name);
      } catch (error) {
        console.error(error);
      }
    }
    getProduct();
  }, []);

  useEffect(() => {
    if (isEdit) {
      newTitleRef.current.focus();
    }
  }, [isEdit]);

  function toggleIsEdit() {
    setIsEdit((prev) => !prev);
  }

  async function editTitle() {
    const newProductTitle = newTitleRef.current.value;
    try {
      const newProduct = { ...product, name: newProductTitle };
      await axios.put(ProductUrl, newProduct);
      setProduct((prev) => {
        return { ...prev, name: newTitleRef.current.value };
      });
      toggleIsEdit();
    } catch (error) {
      console.error(error);
    }
  }

  function handleDeleteProduct(productId) {
    try {
      axios.delete(ProductUrl + "/" + productId);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  }
  function handleBack() {
    navigate(-1);
  }

  return (
    <>
      <button onClick={handleBack}>back</button>
      <div>
        {isEdit ? (
          <div>
            <input
              className=" border-2 border-black"
              type="text"
              ref={newTitleRef}
              value={editedTitle}
              onChange={(ev) => setEditedTitle(ev.target.value)}
            />
            <button onClick={editTitle}>save changes</button>
          </div>
        ) : (
          <div>
            <h1>{product.name}</h1>
            <button onClick={toggleIsEdit}>edit title</button>
          </div>
        )}

        <p>{product.price}</p>
        <p>{product.category}</p>
        <button onClick={() => handleDeleteProduct(product._id)}>
          delete product
        </button>
      </div>
    </>
  );
}

export default ProductDetailsPage;