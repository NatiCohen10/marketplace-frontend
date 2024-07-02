import React, { useContext, useState } from "react";
import InputField from "../components/ui/InputField";
import { Form, Link, useNavigate } from "react-router-dom";
import FormLayout from "../components/ui/FormLayout";
import FormInputWrapper from "../components/ui/FormInputWrapper";
import CustomButton from "../components/ui/Button";
import UserContext from "../contexts/UserContext";
import api from "../services/api.service";

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, getUserById, setUser } = useContext(UserContext);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const newUser = {
      username: userName,
      password,
    };

    try {
      const response = await api.post("/auth/login", newUser);
      localStorage.setItem("token", response.data.token);

      console.log("set item", response.data.token);
      const currentUser = await getUserById(response.data.token);
      setUser(currentUser);
      navigate("/");

      console.log("loginPage", user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" h-screen flex justify-center items-center">
      <FormLayout handleFormSubmit={handleFormSubmit} headerText={"Login"}>
        <FormInputWrapper>
          <InputField
            login
            type="text"
            label={"Username:"}
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            placeholder="JaneDoe123"
          />
        </FormInputWrapper>
        <FormInputWrapper>
          <InputField
            login
            label={"Password:"}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormInputWrapper>

        <CustomButton formButton type="submit">
          Log in
        </CustomButton>
        <hr className="border-zinc-600 my-9" />
        <div className="mb-10">
          <p>
            Don't have an account?{" "}
            <Link
              className="hover:border-b hover:border-b-black"
              to={"/signup"}
            >
              Sign up!
            </Link>
          </p>
        </div>
      </FormLayout>
    </div>
  );
}

export default LoginPage;
