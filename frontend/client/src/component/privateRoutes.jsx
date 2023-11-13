// import { Navigate, Outlet } from "react-router-dom";
// const PrivateRoute = () => {
//   let auth = { token: true };
//   return auth.token ? <Outlet /> : <Navigate to="/login" />;
// };
// export default PrivateRoute;

import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  // const { isLoggedIn } = useAuth();

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
