import react from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../component/spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (!password) {
      return toast.error("Password is required");
    }

    const userData = {
      email,
      password,
    };

    try {
      await dispatch(login(userData));
    } catch (error) {
      console.error("Login error:", error);
    }
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
        <div className="">
          <h2>Login</h2>
          <form onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>
          <span className={styles.register}>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Login;
