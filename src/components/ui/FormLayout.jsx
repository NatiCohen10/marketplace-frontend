import { ArrowLeft } from "lucide-react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function FormLayout({ children, handleFormSubmit, headerText }) {
  const navigate = useNavigate();
  function navigateBack() {
    navigate(-1);
  }
  return (
    <form
      className="flex justify-center items-center mt-48"
      onSubmit={handleFormSubmit}
    >
      <div className=" w-4/5 lg:w-3/5 bg-zinc-200 shadow-md shadow-stone-400 rounded-lg">
        <div className="mx-14 relative">
          <button className=" absolute -top-1 -left-12" onClick={navigateBack}>
            <ArrowLeft size={24} color="red" />
          </button>
          <h1 className="text-5xl font-bold text-sky-600 my-5">{headerText}</h1>
          <div className="flex flex-col gap-2 mb-6">{children}</div>
        </div>
      </div>
    </form>
  );
}

export default FormLayout;
