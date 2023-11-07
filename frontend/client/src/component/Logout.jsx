import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };
  return (
    <button
      onClick={handleLogout}
      type="submit"
      data-bs-dismiss="modal"
      className="btn btn-primary"
    >
      logout
    </button>
  );
};

export default LogoutButton;
