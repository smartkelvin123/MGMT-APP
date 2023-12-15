import React from "react";
import CustomPrimaryButton from "../../shared/customPrimaryButton";
import RedirectInfo from "../../shared/redirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "Enter correct e-mail address and password should contains between 6 and 12 characters";
};

const getFormValidMessage = () => {
  return "Press to log in!";
};

const LoginPageFooter = ({ handleLoginUser, error, isFormValid }) => {
  const navigate = useNavigate();
  const handlePushToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <>
      <>
        <Tooltip
          title={
            !isFormValid ? getFormNotValidMessage() : getFormValidMessage()
          }
        >
          <CustomPrimaryButton
            label="Login"
            onClick={handleLoginUser}
            disabled={false}
          />
          {error && <p style={{ color: "red" }}>{{ error }}</p>}
        </Tooltip>
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

// import React from "react";
// import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
// import { RedirectInfo } from "../../shared/redirectInfo";
// import { useNavigate } from "react-router-dom";
// import { Tooltip } from "@mui/material";

// const getFormNotValidMessage = () => {
//   return "Enter correct e-mail address and password should contains between 6 and 12 characters";
// };

// const getFormValidMessage = () => {
//   return "Press to log in!";
// };

// const LoginPageFooter = ({ handleLogin, isFormValid }) => {
//   const navigate = useNavigate();

//   const handlePushToRegisterPage = () => {
//     navigate.push("/register");
//   };

//   return (
//     <>
//       <Tooltip
//         title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
//       >
//         <div>
//           <CustomPrimaryButton
//             label="Log in"
//             additionalStyles={{ marginTop: "30px" }}
//             disabled={!isFormValid}
//             onClick={handleLogin}
//           />
//         </div>
//       </Tooltip>
//       <RedirectInfo
//         text="Need an account? "
//         redirectText="Create an account"
//         additionalStyles={{ marginTop: "5px" }}
//         redirectHandler={handlePushToRegisterPage}
//       />
//     </>
//   );
// };

// export default LoginPageFooter;