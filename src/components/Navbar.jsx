import React from "react";
import { NavLink } from "react-router-dom";

function TopNavLink(props) {
  const { href, children } = props;
  return (
    <NavLink
      className={({ isActive }) =>
        `hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium ${
          isActive ? "text-orange-500 border-b-2 border-black" : "text-gray-700"
        }`
      }
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
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-900">Logo</span>
            </div>
            <div className=" sm:block sm:ml-6">
              <div className="flex space-x-4">
                <TopNavLink href="/">Home</TopNavLink>
                <TopNavLink href="/products">Products</TopNavLink>
              </div>
              <div>
                <TopNavLink href="/login">Login</TopNavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
