import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const SignUpForm = ({ close,setIsLoggedIn,setUserData }) => {
  const navigate = useNavigate();
  const [signupDetails, setSignupDetails] = useState({
    signupFullname: "",
    signupPhone: "",
    signupPassword: "",
    signupConfirmPassword: "",
    signupEmail: "",
  });
  function handleSignupForm(event) {
    const { name, value } = event.target;
    setSignupDetails((prevSignupDetails) => {
      return {
        ...prevSignupDetails,
        [name]: value,
      };
    });
  }

  // 192.168.101.12:4000/api/v1
  function submitSignupForm(event) {
    event.preventDefault();

    if (signupDetails.signupPassword != signupDetails.signupConfirmPassword) {
      toast.error("Both Password field must be same", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      axios
        .post(
          "http://127.0.0.1:4000/api/v1/register",
          {
            name: signupDetails.signupFullname,
            email: signupDetails.signupEmail,
            password: signupDetails.signupPassword,
            confirmPassword: signupDetails.signupConfirmPassword,
            contactNo1: signupDetails.signupPhone,
       
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            setIsLoggedIn(true)
            setUserData(res.data.user)
            setSignupDetails({
              signupFullname: "",
              signupPhone: "",
              signupPassword: "",
              signupConfirmPassword: "",
              signupEmail: ""
            });
            close();
            toast.success("Thank you for signing up", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }

          console.log(res);
        })
        .catch((err) => {
          toast.error(err.response.data.message,{
            position: toast.POSITION.TOP_RIGHT,
          })
          console.log("aa", err);
        });
    }

    console.log(signupDetails);
  }

  const [fullNameColor, setFullNameColor] = useState(
    "inset 0px 0px 0px 0.5px #747474"
  );
  const [phoneColor, setPhoneColor] = useState(
    "inset 0px 0px 0px 0.5px #747474"
  );

  const [passwordColor, setPasswordColor] = useState(
    "inset 0px 0px 0px 0.5px #747474"
  );
  const [emailColor, setEmailColor] = useState("inset 0px 0px 0px 1px #747474");
  useEffect(() => {
    if (signupDetails.signupFullname.length === 0) {
      setFullNameColor("inset 0px 0px 0px 0.5px #747474");
    } else if (signupDetails.signupFullname.length < 4) {
      setFullNameColor("inset 0px 0px 0px 2px #be4217");
    } else {
      setFullNameColor("inset 0px 0px 0px 2px #71b646");
    }

    if (signupDetails.signupPhone.length === 0) {
      setPhoneColor("inset 0px 0px 0px 0.5px #747474");
    } else if (/^[0-9]{10}$/.test(String(signupDetails.signupPhone))) {
      setPhoneColor("inset 0px 0px 0px 2px #71b646");
    } else {
      setPhoneColor("inset 0px 0px 0px 2px #be4217");
    }

    if (signupDetails.signupEmail.length === 0) {
      setEmailColor("inset 0px 0px 0px 0.5px #747474");
    } else if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        signupDetails.signupEmail
      )
    ) {
      setEmailColor("inset 0px 0px 0px 2px #71b646");
    } else {
      setEmailColor("inset 0px 0px 0px 2px #be4217");
    }
  }, [signupDetails]);


  return (
    <div className="signup-container">
      <form className="signupForm">
        <div className="input-box">
          <input
            type="text"
            name="signupFullname"
            id="signupFullname"
            className="fullname input-field"
            placeholder="Full Name"
            onChange={handleSignupForm}
            value={signupDetails.signupFullname}
            style={{ boxShadow: fullNameColor }}
          />
        </div>
        <div className="input-box">
          <input
            type="tel"
            name="signupPhone"
            id="signupPhone"
            className="phone input-field"
            placeholder="Phone Number"
            onChange={handleSignupForm}
            value={signupDetails.signupPhone}
            style={{ boxShadow: phoneColor }}
          />
        </div>
       
        <div className="input-box">
          <input
            type="password"
            name="signupPassword"
            id="signupPassword"
            className="password input-field"
            placeholder="Password"
            onChange={handleSignupForm}
            value={signupDetails.signupPassword}
            style={{ boxShadow: passwordColor }}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="signupConfirmPassword"
            id="signupConfirmPassword"
            className="confirmPassword input-field"
            placeholder="Confirm Password"
            onChange={handleSignupForm}
            value={signupDetails.signupConfirmPassword}
            style={{ boxShadow: passwordColor }}
          />
        </div>

        {/* <input
          type="text"
          name="address"
          id="address"
          className="address input-field "
          placeholder="Address"
        /> */}
        <div className="input-box">
          <input
            type="email"
            name="signupEmail"
            id="signupEmail"
            className="email input-field"
            placeholder="Email *"
            onChange={handleSignupForm}
            value={signupDetails.signupEmail}
            style={{ boxShadow: emailColor }}
          />
        </div>

        <div className="signup-btn">
          <button
            type="submit"
            className="SignUp-btn button"
            onClick={submitSignupForm}
          >
            Sign Up
          </button>
         
        </div>
        
      </form>

    </div>
  );
};

export default SignUpForm;
