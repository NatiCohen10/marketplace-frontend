import React from "react";
import { NavLink } from "react-router-dom";

function TopNavLink(props) {
  const { href, children } = props;
  return (
    <NavLink
      className={({ isActive }) =>
        ` px-3 pt-2 pb-1  font-medium ${
          isActive
            ? "text-primary border-b  border-black hover:bg-primary hover:text-white hover:border-b-0"
            : "text-gray-700 hover:bg-secondary hover:text-white"
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
    <nav className="bg-background-400 fixed top-0 left-0 w-full z-50 sm:text-lg">
      <ul className=" flex justify-between mr-4  sm:mr-10 lg:mr-20">
        <div className="bg-primary flex justify-center items-center  ">
          <li className="  text-white font-bold text-2xl uppercase ml-4 pr-4 sm:pr-10 lg:pr-20  sm:ml-10 lg:ml-20">
            marketease<span className=" text-secondary">.</span>
          </li>
        </div>
        <div className="flex py-4  gap-2 sm:gap-4 lg:gap-6">
          <li>
            <TopNavLink href={"/"}>Home</TopNavLink>
          </li>
          <li>
            <TopNavLink href={"/products"}>Products</TopNavLink>
          </li>
          <li>
            <TopNavLink href={"/login"}>Login</TopNavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
