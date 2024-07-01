import React, { createContext, useEffect, useState } from "react";
import { formatJWTTokenToUser } from "../utils/getIdByToken";
import axios from "axios";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  //   localStorage.removeItem("token");
  const token = localStorage.getItem("token");

  async function getUserById(token) {
    try {
      const { userId } = formatJWTTokenToUser(token);
      console.log(userId);
      const res = await axios.get(`http://localhost:3000/api/users/${userId}`);
      setUser(res.data);
      console.log("userContext", user);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    console.log("token before check", token);

    if (token) {
      console.log("token after check", token);
      getUserById();
    } else {
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, token, getUserById }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
