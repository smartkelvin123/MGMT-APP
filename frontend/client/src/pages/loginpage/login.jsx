import React, { useState } from "react";
import LoginPageFooter from "./loginpagefooter";
import LoginPageHeader from "./loginPageHeader";
import LoginPageInputs from "./loginPageInput";
import AuthBox from "../../shared/authBox";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../mutation/userMutation";
import { useAuth } from "../../component/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const [loginUser] = useMutation(LOGIN_USER);

  const handleLoginUser = async (e) => {
    e.preventDefault();

    if (!mail || !mail.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    // Password validation
    if (!password) {
      setError("Password is required");
      return;
    }

    // Clear previous error messages
    setError("");

    loginUser({
      variables: { email: mail, password },
    })
      .then((response) => {
        if (response.data && response.data.loginUser) {
          // const { user, token } = response.data.loginUser;

          login();
          navigate("/home");
        } else {
          setError("Invalid credentials. Please try again.");
        }
      })
      .catch((error) => {
        setError("Invalid credentials. Please try again.");
        console.error("Login error:");
      });
  };

  return (
    <AuthBox>
      <LoginPageHeader />
      <LoginPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter handleLoginUser={handleLoginUser} error={error} />
    </AuthBox>
  );
};

export default LoginPage;
