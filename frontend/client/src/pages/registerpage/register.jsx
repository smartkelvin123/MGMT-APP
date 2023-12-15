import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useAuth } from "../../component/AuthContext";
import AuthBox from "../../shared/authBox";
import RegisterPageInputs from "./registerPageInput";
import RegisterPageFooter from "./registerPageFooter";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../mutation/userMutation";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser, { loading }] = useMutation(REGISTER_USER);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const isFormValid =
    email.includes("@") &&
    username.length >= 3 &&
    username.length <= 12 &&
    password.length >= 6 &&
    password.length <= 12;

  const handleRegister = async (e) => {
    e.preventDefault();

    // Simple email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    // Password validation
    if (password.length < 6 || password.length > 12) {
      setError("Password must be between 6 and 12 characters");
      return;
    }

    // Username validation
    if (username.length < 3 || username.length > 12) {
      setError("Username must be between 3 and 12 characters");
      return;
    }

    // Clear previous error messages
    setError("");

    registerUser({
      variables: { name, email, username, password },
    })
      .then((response) => {
        if (response.data && response.data.registerUser) {
          login();
          navigate("/home");
        } else {
          setError("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        setError("Registration failed. Please try again");
        console.error("Registration error:", error);
      });
  };

  return (
    <AuthBox>
      <Typography variant="h5" sx={{ color: "white" }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        handleRegister={handleRegister}
        isFormValid={isFormValid}
        loading={loading}
        error={error}
      />
    </AuthBox>
  );
};

export default RegisterPage;
