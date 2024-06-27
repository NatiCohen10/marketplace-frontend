import React, { useState } from "react";
import InputField from "../components/ui/InputField";
import { Form, Link } from "react-router-dom";
import FormLayout from "../components/ui/FormLayout";
import FormInputWrapper from "../components/ui/FormInputWrapper";
import CustomButton from "../components/ui/Button";

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleFormSubmit(ev) {
    ev.preventDefault();
    const user = {
      userName,
      password,
    };
    console.log(user);
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
