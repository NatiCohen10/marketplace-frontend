import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">
        Oops! The page you're looking for does not exist.
      </p>
      <Link
        to="/"
        className="border-2 border-blue-500 px-4 py-2 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
      >
        Go to Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
