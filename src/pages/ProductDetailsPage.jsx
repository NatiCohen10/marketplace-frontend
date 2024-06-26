import axios from "axios";
import { ArrowLeft, Pencil, Save, Trash } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../components/ui/Button";
import InputField from "../components/ui/InputField";

function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
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
      await axios.patch(ProductUrl + "/" + productId, {
        name: newProductTitle,
      });
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
      navigate("/products?page=1");
    } catch (error) {
      console.error(error);
    }
  }
  function handleBack() {
    navigate(-1);
  }

  if (!product) {
    return <>Loading...</>;
  }

  return (
    <div className=" shadow-md shadow-gray-400 flex justify-center items-center mt-72 bg-stone-300   mx-4 sm:mx-10 lg:mx-20 p-10 relative rounded-md">
      <div className=" ">
        <div className=" absolute -top-1 -left-1">
          <CustomButton onClick={handleBack}>
            <ArrowLeft color="red" />
          </CustomButton>
        </div>

        <div className=" ">
          {isEdit ? (
            <div className=" flex  mb-6">
              <InputField
                className=" border-2 border-black"
                type="text"
                ref={newTitleRef}
                value={editedTitle}
                onChange={(ev) => setEditedTitle(ev.target.value)}
                login
              />
              <CustomButton onClick={editTitle}>
                <Save size={28} color="blue" />
              </CustomButton>
            </div>
          ) : (
            <div>
              <div className=" flex mb-6">
                <h1 className=" text-4xl  font-bold text-blue-600">
                  {product.name}
                </h1>
                <CustomButton onClick={toggleIsEdit}>
                  <Pencil size={28} color="blue" />
                </CustomButton>
              </div>
            </div>
          )}
          <div className=" flex flex-col gap-5">
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
          <div className=" flex justify-end">
            <CustomButton onClick={() => handleDeleteProduct(product._id)}>
              <Trash size={28} color="#fb1313" />
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
