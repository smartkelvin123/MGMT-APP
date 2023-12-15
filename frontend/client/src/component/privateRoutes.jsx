import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  // const { isLoggedIn } = useAuth();

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
