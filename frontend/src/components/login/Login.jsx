import { useState } from "react";
import "./login.css";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
const Login = (props) => {
  const [active, setActive] = useState(true);

  function handleSignUpSide() {
    setActive(false);
  }
  function handleloginSide() {
    setActive(true);
  }

  return (
    <>
      <div className="loginBoxWrapper">
        <div
          className={`wrapper ${
            active ? "login-container" : "container-signup"
          }`}
          id="container"
        >
          <div className="close" onClick={props.closeLogin}>
            &#10006;
          </div>
          <div
            className={`${active ? "loginPanel" : "signupPanel"}`}
            id="panel"
          >
            <div className="options">
              <div className="option-login">
                <div
                  className={`option ${active ? "" : "disabled"}`}
                  onClick={handleloginSide}
                >
                  <h2 className={`${active ? "Login_Form_line" : ""}`}>
                    login
                  </h2>
                </div>
              </div>

              <div className="divider">|</div>
              <div className="option-signin ">
                <div
                  className={`signup-link option ${active ? "disabled" : ""}`}
                  onClick={handleSignUpSide}
                  id="signup-link"
                >
                  <h2 className={` ${active ? "" : "Login_Form_line"}`}>
                    Sign Up
                  </h2>
                </div>
              </div>
            </div>

            <div
              className={`form-container ${
                active ? "signup-transform" : "login-transform"
              }`}
            >
               <LoginForm
                setIsLoggedIn={props.setIsLoggedIn}
                setUserData={props.setUserData}
                close={props.closeLogin}
                handleSignUpSide={handleSignUpSide}
              />
              <SignUpForm
                setIsLoggedIn={props.setIsLoggedIn}
                setUserData={props.setUserData}
                close={props.closeLogin}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
