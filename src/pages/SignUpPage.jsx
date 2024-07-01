import React, { useRef, useState } from "react";
import FormLayout from "../components/ui/FormLayout";
import InputField from "../components/ui/InputField";
import { Link, useNavigate } from "react-router-dom";
import FormInputWrapper from "../components/ui/FormInputWrapper";
import { ArrowLeft } from "lucide-react";
import CustomButton from "../components/ui/Button";
import axios from "axios";

function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const user = {
      username: userName,
      password: password,
      firstName,
      lastName,
    };

    try {
      console.log(user);
      await axios.post("http://localhost:3000/api/auth/register", user);
      // navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" h-screen mt-7 flex justify-center items-center">
      <FormLayout handleFormSubmit={handleFormSubmit} headerText={"Signup"}>
        <FormInputWrapper>
          <InputField
            id={"userName"}
            login
            placeholder={"JaneDoe123"}
            required
            label={"Your username:"}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormInputWrapper>
        <FormInputWrapper>
          <InputField
            id={"password"}
            login
            placeholder={"At least 8 characters"}
            type={"password"}
            required
            label={"Your password:"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormInputWrapper>
        <FormInputWrapper>
          <InputField
            id={"firstName"}
            login
            required
            type={"text"}
            placeholder={"Jane"}
            label={"First Name:"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormInputWrapper>
        <FormInputWrapper>
          <InputField
            id={"lastName"}
            login
            required
            type={"text"}
            placeholder={"Doe"}
            label={"Last Name:"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormInputWrapper>

        <CustomButton formButton type="submit">
          Sign up
        </CustomButton>
        <hr className="border-zinc-600 my-9" />
        <div className="mb-10">
          <p>
            Already have an account?{" "}
            <Link className="hover:border-b hover:border-b-black" to={"/login"}>
              Login!
            </Link>
          </p>
        </div>
      </FormLayout>
    </div>
  );
}

export default SignUpPage;
