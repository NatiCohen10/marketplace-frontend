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
      const res = await axios.get(`http://localhost:3000/api/users/${userId}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (token !== null) {
      const currentUser = getUserById(token);
      setUser(currentUser);
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
