import React from "react";

const Oauth = () => {
  const handleGoogleClick = () => {
    console.log("hello google");
  };

  return (
    <div>
      <button type="button" onClick={handleGoogleClick}>
        continue with google
      </button>
    </div>
  );
};

export default Oauth;
