import React, { useEffect, useState } from "react";
import loginImg from "../component/assets/login.png";
import Spinner from "../component/spinner";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassowrd: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, confirmPassowrd } = formData;

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  };

  const RegisterUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("all field are required");
    }
    if (password.length < 6) {
      return toast.error("password must be at least 6 characters");
    }
    if (password !== confirmPassowrd) {
      return toast.error("password do not match");
    }
    if (!validateEmail(email)) {
      return toast.error("please enter a valid email");
    }

    const userData = {
      name,
      email,
      password,
    };
    await dispatch(register(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }
    dispatch(RESET_AUTH());
  }, [isSuccess, isLoggedIn, dispatch, navigate]);

  return (
    <div>
      {isLoading && <Spinner />}

      <div className="">
        <h2>Register</h2>
        <form onSubmit={RegisterUser}>
          <input
            type="text"
            placeholder="name"
            required
            name={"name"}
            value={name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="email"
            required
            name={"email"}
            value={email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="password"
            required
            name={"password"}
            value={password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="confirm password"
            required
            name={"confirmPassowrd"}
            value={confirmPassowrd}
            onChange={handleInputChange}
          />
          <button type="submit" className="--btn --btn-primary --btn-block">
            Register
          </button>
        </form>
        <span className={styles.register}>
          Alreadly have an accout? <Link to="/login">login</Link>
        </span>
      </div>

      <div className={styles.img}>
        <img src={loginImg} alt="login" width="400" />
      </div>
    </div>
  );
};

export default Register;
