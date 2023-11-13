import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <button onClick={handleLogout} type="button" class="btn btn-danger">
      logout
    </button>
  );
};

export default LogoutButton;
