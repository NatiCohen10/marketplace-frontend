import { ArrowLeft } from "lucide-react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CustomButton from "./Button";

function FormLayout({ children, handleFormSubmit, headerText }) {
  const navigate = useNavigate();
  function navigateBack() {
    navigate("/");
  }
  return (
    <form
      className="flex justify-center items-center w-full mx-20 "
      onSubmit={handleFormSubmit}
    >
      <div className=" w-full bg-zinc-200 shadow-md shadow-stone-400 rounded-lg">
        <div className="mx-14 relative">
          <CustomButton formExit onClick={navigateBack}>
            <ArrowLeft size={24} color="red" />
          </CustomButton>
          <h1 className="text-5xl font-bold text-sky-600 my-5">{headerText}</h1>
          <div className="flex flex-col gap-2 mb-6">{children}</div>
        </div>
      </div>
    </form>
  );
}

export default FormLayout;
