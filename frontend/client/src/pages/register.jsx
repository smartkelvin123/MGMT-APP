import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../component/spinner";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../mutation/userMutation";
import loginImg from "../component/assets/login.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [registerUser] = useMutation(REGISTER_USER);
  const [error, setError] = useState("");

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    // Simple email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    // Password validation
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Clear previous error messages
    setError("");

    registerUser({
      variables: { name, email, password },
    })
      .then((response) => {
        // Check the response and navigate accordingly
        if (response.data && response.data.registerUser) {
          navigate("/login");
        } else {
          setError("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        setError("An error occurred. Please try again.");
        console.error("Registration error:", error);
      });
  };

  return (
    <div>
      {isLoading && <Spinner />}

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2>Register</h2>
            <form onSubmit={handleRegisterUser}>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <div className="text-danger">{error}</div>}
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </form>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
            <div className="col-md-6">
              <img src={loginImg} alt="login" width="400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
