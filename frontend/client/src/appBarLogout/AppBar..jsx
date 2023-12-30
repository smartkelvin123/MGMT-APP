import React from "react";
import { styled } from "@mui/system";
// import DropdownMenu from "./DropdownMenu";
// import ChosenOptionLabel from "./ChosenOptionLabel";
import Logout from "./Logout";

const MainContainer = styled("div")({
  position: "absolute",
  right: "0",
  top: "0",
  height: "48px",
  borderBottom: "1px solid black",
  backgroundColor: "#36393f",
  width: "calc(100% - 326px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 15px",
});

const AppBar = () => {
  return (
    <MainContainer>
      <Logout />
    </MainContainer>
  );
};

export default AppBar;
