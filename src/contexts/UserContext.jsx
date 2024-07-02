import React, { createContext, useEffect, useState } from "react";
import { formatJWTTokenToUser } from "../utils/getIdByToken";
import api from "../services/api.service";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  console.log("provider worked");
  //   localStorage.removeItem("token");
  const token = localStorage.getItem("token");

  async function getUserById(token) {
    try {
      const { userId } = formatJWTTokenToUser(token);
      const res = await api.get(`/users/${userId}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    async function getUserOnRefresh() {
      if (token !== null) {
        try {
          const currentUser = await getUserById(token);
          setUser(currentUser);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getUserOnRefresh();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, token, getUserById }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
