// import { useState, useRef } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
// const LoginForm = (props) => {
//   const captcha = useRef(null);
//   const [verified, setVerified] = useState(false);
//   const [loginDetails, setLoginDetails] = useState({
//     loginFullname: "",
//     loginPassword: ""
//   });
//   function onchange() {
//     setVerified(true);
//   }
//   function handleLoginForm(event) {
//     const { name, value } = event.target;
//     setLoginDetails((prevLoginDetails) => {
//       return {
//         ...prevLoginDetails,
//         [name]: value
//       };
//     });
//   }
//   function submitLoginForm(event) {
//     event.preventDefault();
//     console.log(loginDetails);
//     alert(
//       "username: " +
//         loginDetails.loginFullname +
//         "\nPassword:" +
//         loginDetails.loginPassword
//     );
//     setLoginDetails({
//       loginFullname: "",
//       loginPassword: ""
//     });
//     captcha.current.reset();
//     setVerified(false);
//   }

//   return (
//     <div className="login-container">
//       <form className="loginForm">
//         <div className="input-box">
//           <input
//             type="text"
//             name="loginFullname"
//             id="login-fullname"
//             className="fullname input-field"
//             placeholder="Full Name"
//             onChange={handleLoginForm}
//             value={loginDetails.loginFullname}
//           />
//         </div>
//         <div className="input-box">
//           <input
//             type="password"
//             name="loginPassword"
//             id="login-password"
//             className="password input-field"
//             placeholder="Password"
//             onChange={handleLoginForm}
//             value={loginDetails.loginPassword}
//           />
//         </div>

//         <a
//           href="http://"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="forgot-password"
//         >
//           Forgot Password ?
//         </a>
//         {/* recaptcha component from google is used */}
//         {/* site key: currently used key is only form test purspose available freely */}
//         <ReCAPTCHA
//         className="recaptcha"
//           ref={captcha}
//           sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
//           onChange={onchange}
//         />
//         <div className="buttons">
//           <button
//             type="submit"
//             className="login-btn button"
//             disabled={!verified}
//             onClick={submitLoginForm}
//           >
//             Login
//           </button>
//           {/* <button type="submit" className="guest-btn button">
//             Checkout as guest
//           </button> */}
//         </div>
//         <div className="auth">
//           <div className="or">
//             <span className="orBar"></span>
//             <span className="orText">or</span>
//             <span className="orBar"></span>
//           </div>
//           <p>Sign Up with</p>
//           <div className="auth-icons">
//             <div className="icons">
//               <img
//                 className="google-auth"
//                 src="https://i.postimg.cc/NjQmsdrS/Google-Logos-By-hrhasnai-1.png"
//                 alt="Login with Google"
//               />
//               <div className="span">Google</div>
//             </div>
//             <div className="icons">
//               <img
//                 className="facebook-auth"
//                 src="https://i.postimg.cc/T192CJY5/fb.png"
//                 alt="Login with Facebook"
//               />
//               <div className="span">Facebook</div>
//             </div>
//           </div>
//         </div>
//         <p className="dont">
//           Don't have an account? &nbsp;
//           {/* props is used to make the signup text functional */}
//           <span className="signUp" onClick={props.handleSignUpSide}>
//             sign Up
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;

// Prashant's code
import { useState, useRef, useEffect } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const captcha = useRef(null);
  const [verified, setVerified] = useState(true);
  const [loginDetails, setLoginDetails] = useState({
    loginFullname: "",
    loginPassword: "",
  });

  function handleLoginForm(event) {
    const { name, value } = event.target;
    setLoginDetails((prevLoginDetails) => {
      return {
        ...prevLoginDetails,
        [name]: value,
      };
    });
  }
  function submitLoginForm(event) {
    event.preventDefault();

    axios
      .post(
        "http://localhost:4000/api/v1/login",
        {
          email: loginDetails.loginFullname,
          password: loginDetails.loginPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        props.setIsLoggedIn(true);
        props.setUserData(res.data.user);

        setLoginDetails({
          loginFullname: "",
          loginPassword: "",
        });
        toast.success("Logged In", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/");
        props.close();
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });

    console.log(loginDetails);
    // alert(
    //   "username: " +
    //     loginDetails.loginFullname +
    //     "\nPassword:" +
    //     loginDetails.loginPassword
    // );

    // captcha.current.reset();
    // setVerified(false);
  }

  const [showPassword, setShowPassword] = useState(false);

  function TogglePassword() {
    // setShowPassword((prev) => !prev);
    setShowPassword((prev) => !prev);
  }
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  // const onLoad = () => {
  //   // this reaches out to the hCaptcha JS API and runs the
  //   // execute function on it. you can use other functions as
  //   // documented here:
  //   // https://docs.hcaptcha.com/configuration#jsapi
  //   captchaRef.current.execute();
  // };
  useEffect(() => {
    if (token) {
      console.log(`hCaptcha Token: ${token}`);
      setVerified(true);
    }
  }, [token]);
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
            // style={{boxShadow:fullNameColor}}
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

          <i className="toggleLoginPassword" onClick={TogglePassword}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </i>
        </div>

        {/* <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          className="forgot-password"
        >
          Forgot Password ?
        </a> */}

        {/* recaptcha component from google is used */}
        {/* site key: currently used key is only form test purspose available freely */}
        <HCaptcha
          sitekey="a50e48ed-2f79-4d9a-93fd-1a2d7e89f4dc"
          // onLoad={onLoad}
          onVerify={setToken}
          ref={captchaRef}
        />
        <div className="buttons">
          <button
            type="submit"
            className="login-btn button"
            disabled={!verified}
            onClick={submitLoginForm}
          >
            Login
          </button>
          {/* <button type="submit" className="guest-btn button">
            Checkout as guest
          </button> */}
        </div>
        {/* <div className="auth">
          <div className="or">
            <span className="orBar"></span>
            <span className="orText">or</span>
            <span className="orBar"></span>
          </div>
         
          <div className="auth-icons">
            <div className="icons">
              <img
                className="google-auth"
                src="https://i.postimg.cc/NjQmsdrS/Google-Logos-By-hrhasnai-1.png"
                alt="Login with Google"
              />
              <div className="span">Google</div>
            </div>
            <div className="icons">
              <img
                className="facebook-auth"
                src="https://i.postimg.cc/T192CJY5/fb.png"
                alt="Login with Facebook"
              />
              <div className="span">Facebook</div>
            </div>
          </div>
        </div> */}
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
