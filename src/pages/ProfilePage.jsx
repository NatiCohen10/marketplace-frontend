import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../contexts/UserContext";
import ProductItem from "../components/ProductItem";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../components/ui/Button";

function ProfilePage() {
  const { user, setUser, getUserById, token } = useContext(UserContext);

  const scrollRef = useRef(null); // Ref to the products container for scroll handling
  const navigate = useNavigate();
  const [userProducts, setUserProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const currentUser = await getUserById(token);

        setUserProducts(currentUser.products);
      } catch (error) {
        console.log(error);
      }
    }
    getCurrentUser();
  }, [location.pathname]);

  const handleScroll = (event) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += event.deltaY;
    }
  };
  function handleLogOut() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  return (
    <div className=" mt-20 mx-4 sm:mx-10 lg:mx-20">
      {user ? (
        <div className="  flex justify-center ">
          <div className=" ">
            <h1 className=" mb-4 text-center  text-4xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <h2 className=" text-center text-2xl font-bold">{user.username}</h2>

            <div
              className=" whitespace-nowrap overflow-x-auto max-w-screen-xl mx-auto p-4 "
              onWheel={handleScroll}
              ref={scrollRef}
            >
              {userProducts.map((product) => (
                <ProductItem profileItem key={product._id} product={product} />
              ))}
            </div>
            <div className=" mx-auto w-64 mt-4">
              <CustomButton logout onClick={handleLogOut}>
                Logout
              </CustomButton>
            </div>
          </div>
        </div>
      ) : (
        <div>No user logged in</div>
      )}
    </div>
  );
}

export default ProfilePage;
