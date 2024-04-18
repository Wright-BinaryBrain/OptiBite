import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    loginFullname: "",
    loginPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleLoginForm(event) {
    const { name, value } = event.target;
    setLoginDetails((prevLoginDetails) => ({
      ...prevLoginDetails,
      [name]: value,
    }));
  }

  function submitLoginForm(event) {
    event.preventDefault();

    axios
      .post(
        "http://127.0.0.1/api/v1/login",
        {
          email: loginDetails.loginFullname,
          password: loginDetails.loginPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        props.setIsLoggedIn(true);
        props.setUserData(res.data.user);

        toast.success("Logged In", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/");
        props.close();
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });

    setLoginDetails({
      loginFullname: "",
      loginPassword: "",
    });
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className="login-container">
      <form className="loginForm">
        <div className="input-box">
          <input
            type="text"
            name="loginFullname"
            id="login-fullname"
            className="fullname input-field"
            placeholder="Email Address"
            onChange={handleLoginForm}
            value={loginDetails.loginFullname}
          />
        </div>
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            name="loginPassword"
            id="login-password"
            className="password input-field"
            placeholder="Password"
            onChange={handleLoginForm}
            value={loginDetails.loginPassword}
          />
          <i className="toggleLoginPassword" onClick={togglePasswordVisibility}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </i>
        </div>
        <div className="buttons">
          <button
            type="submit"
            className="login-btn button"
            onClick={submitLoginForm}
          >
            Login
          </button>
        </div>
        <p className="dont">
          Don't have an account? &nbsp;
          <span className="signUp" onClick={props.handleSignUpSide}>
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
