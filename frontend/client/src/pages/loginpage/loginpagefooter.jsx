//check this code ...  getFormValidMessage and getFormNotValidMessage is function

import React from "react";
import CustomPrimaryButton from "../../shared/customPrimaryButton";
import RedirectInfo from "../../shared/redirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import Oauth from "../../component/Oauth";

const LoginPageFooter = ({ handleLoginUser, error, isFormValid }) => {
  const getFormNotValidMessage = () => {
    return "Enter correct e-mail address and password should contains between 6 and 12 characters";
  };

  const getFormValidMessage = () => {
    return "Press to log in!";
  };
  const navigate = useNavigate();
  const handlePushToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <>
      <>
        <Tooltip
          title={
            // !isFormValid ? getFormNotValidMessage() : getFormValidMessage()
            isFormValid ? getFormValidMessage() : getFormNotValidMessage()
          }
        >
          <CustomPrimaryButton
            label="Login"
            onClick={handleLoginUser}
            disabled={false}
            // disabled={isFormValid}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Tooltip>
        <Oauth />
        <RedirectInfo
          text="Don't have an account? "
          redirectText="Sign up here"
          redirectHandler={handlePushToRegisterPage}
        />
      </>
    </>
  );
};

export default LoginPageFooter;
