import React, { useRef, useState } from "react";
import FormLayout from "../components/ui/FormLayout";
import InputField from "../components/ui/InputField";
import { Link, useNavigate } from "react-router-dom";
import FormInputWrapper from "../components/ui/FormInputWrapper";
import { ArrowLeft } from "lucide-react";
import CustomButton from "../components/ui/Button";

function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleFormSubmit(ev) {
    ev.preventDefault();
    const user = {
      name: userName,
      password: password,
      email: email,
    };
    console.log(user);
  }

  return (
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
          id={"userEmail"}
          login
          required
          type={"email"}
          placeholder={"email@example.com"}
          label={"Your email:"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
  );
}

export default SignUpPage;
