import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../component/AuthContext";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../mutation/userMutation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleLoginUser = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
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
      variables: { email, password },
    })
      .then((response) => {
        if (response.data && response.data.loginUser) {
          const { user, token } = response.data.loginUser;

          login();
          navigate("/");
        } else {
          setError("Invalid credentials. Please try again.");
        }
      })
      .catch((error) => {
        setError("Invalid credentials. Please try again.");
        console.error("Login error:", error);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2>Login</h2>
            <form onSubmit={handleLoginUser}>
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
                Login
              </button>
            </form>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
