import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };
  return (
    <button onClick={handleLogout} type="button" class="btn btn-danger">
      logout
    </button>
  );
};

export default LogoutButton;
