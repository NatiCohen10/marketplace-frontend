import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

function UserAvatar() {
  const { user } = useContext(UserContext);
  console.log("userAvatar", user.firstName);
  return (
    <Link to={"/profile"}>
      {user ? <div>Hi {user.firstName}</div> : <div></div>}
    </Link>
  );
}

export default UserAvatar;
