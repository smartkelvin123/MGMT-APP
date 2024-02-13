import React from "react";
import CustomPrimaryButton from "../../shared/customPrimaryButton";
import RedirectInfo from "../../shared/redirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import Oauth from "../../component/Oauth";

const getFormNotValidMessage = () => {
  return "Username should contain between 3 and 12 characters, and password should contain between 6 and 12 characters. Also, a correct email address should be provided";
};

const getFormValidMessage = () => {
  return "Press to register!";
};

const RegisterPageFooter = ({
  handleRegister,
  isFormValid,
  loading,
  error,
}) => {
  const navigate = useNavigate();

  const handlePushToLoginPage = () => {
    navigate("/login");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Register"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid || loading}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Oauth />
      <RedirectInfo
        text=""
        redirectText="Already have an account?"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};

export default RegisterPageFooter;
