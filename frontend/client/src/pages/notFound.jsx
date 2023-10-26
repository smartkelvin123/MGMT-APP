import React from "react";
import { FaExclamation } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex flex -column  justify-content-center align-items-center mt-5">
      <FaExclamation className="text-danger" size="5em" />
      <h1 className="display-1">404</h1>
      <h2 className="display-4">sorry , Page not found</h2>
      <Link to="/" className="btn btn-primary">
        back
      </Link>
    </div>
  );
};

export default NotFound;
