import React from "react";
import { NavLink } from "react-router-dom";

function TopNavLink(props) {
  const { href, children } = props;
  return (
    <NavLink
      className={({ isActive }) => {
        return isActive
          ? "px-3 py-2 rounded-md text-sm font-medium hover:text-gray-900 text-orange-500 border-b-2 border-black"
          : "text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium";
      }}
      to={href}
    >
      {children}
    </NavLink>
  );
}

function Navbar() {
  return (
    <nav className="bg-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none">
              {/* Menu icon */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              {/* Your logo goes here */}
              <span className="text-xl font-bold text-gray-900">Logo</span>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <TopNavLink href="/">Home</TopNavLink>
                <TopNavLink href="/products">Products</TopNavLink>
                {/* Add more links as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
