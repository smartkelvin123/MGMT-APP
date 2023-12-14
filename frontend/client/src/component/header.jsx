import React from "react";
import { useLocation } from "react-router-dom";
import logo from "./assets/logo (1).png";
import LogoutButton from "./Logout";
import { useAuth } from "./AuthContext";

const Header = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  const location = useLocation();

  const isHomePage = location.pathname === "/home";

  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container d-flex justify-content-between align-items-center">
        <a href="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="logo" className="mr-2" />
          <div>Project Management Tool</div>
        </a>
        {isLoggedIn && isHomePage && (
          <div style={{ marginLeft: "auto" }}>
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
