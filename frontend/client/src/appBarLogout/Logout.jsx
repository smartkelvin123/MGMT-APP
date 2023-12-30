import * as React from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import MenuIcon from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <IconButton onClick={handleMenuOpen} style={{ color: "white" }}>
        {/* <MenuIcon /> */}

        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Logout;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// const LogoutButton = () => {
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     logout();
//     navigate("/login", { replace: true });
//   };

//   return (
//     <button onClick={handleLogout} type="button" class="btn btn-danger">
//       logout
//     </button>
//   );
// };

// export default LogoutButton;
