import React from "react";
import InputWithLabel from "../../shared/inputWithLabel";

const RegisterPageInputs = ({
  name,
  setName,
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <>
      <InputWithLabel
        value={name}
        setValue={setName}
        label="Name"
        type="text"
        placeholder="Enter your name"
      />
      <InputWithLabel
        value={email}
        setValue={setEmail}
        label="E-mail address"
        type="text"
        placeholder="Enter e-mail address"
      />
      <InputWithLabel
        value={username}
        setValue={setUsername}
        label="Username"
        type="text"
        placeholder="Enter a username"
      />
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter password"
      />
    </>
  );
};

export default RegisterPageInputs;
