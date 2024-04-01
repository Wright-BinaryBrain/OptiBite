import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

import "./AdminLoginPage.css";
import { useNavigate } from "react-router-dom";
const AdminLoginPage = () => {
  const [adminLoginDetails, setAdminLoginDetails] = useState({
    adminUsername: "",
    adminPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAdminLoginForm = (event) => {
    const { name, value } = event.target;
    setAdminLoginDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/whoami", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("success", res);
        if (res.message) {
          setShow(true);
        } else {
          navigate("/admin");
        }
      })
      .catch((err) => {
        console.log(err);
        setShow(true);
      });
  }, []);

  const navigate = useNavigate();
  const submitAdminLoginForm = () => {
    setLoading(true);
    axios
      .post(
        "http://localhost:4000/api/v1/login",
        {
          email: adminLoginDetails.adminUsername,
          password: adminLoginDetails.adminPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("success", res);
        setAdminLoginDetails({
          adminUsername: "",
          adminPassword: "",
        });
        // setLoggedIn(true);
        // localStorage.setItem("token", res.data.token);
        // localStorage.setItem(
        //   "expire",
        //   new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000)
        // );
        // console.log(localStorage.expire);
        // console.log(new Date(now.getTime() + 10000));
        if (res.data.success === true) {
          setLoading(false);
          axios
            .get("http://localhost:4000/api/v1/whoami", {
              withCredentials: true,
            })
            .then((res) => {
              console.log("success", res);
              if (res.data.user.role === "customer") {
                axios.get("http://localhost:4000/api/v1/logout", {
                  withCredentials: true,
                });
                toast.error("You are not authorized");
              } else {
                navigate("/admin");
              }
            });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("error", err.response.data.message);
        setLoading(false);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      submitAdminLoginForm(event);
    }
  };
  return (
    <>
      <ToastContainer />
      {show ? (
        <form className="adminLoginMain">
          <div className="adminLoginBox">
            <div className="adminLoginHeading">Are You an admin ?</div>
            <div className="adminLoginTitle">
              <span className="logo">
                <img
                  src="https://i.postimg.cc/pT65LyC9/sabji-land-logo-1.png"
                  alt="logo"
                />
              </span>
              <div className="adminLoginTitleText">Login</div>
            </div>
            <div className="adminLoginForm">
              <div className="adminInputBox">
                <input
                  type="text"
                  name="adminUsername"
                  id="login-username"
                  className="username input-feild"
                  placeholder="Username *"
                  onChange={handleAdminLoginForm}
                  value={adminLoginDetails.adminUsername}
                />
              </div>
              <div className="adminInputBox">
                <input
                  type="password"
                  name="adminPassword"
                  id="login-password"
                  className="password input-feild"
                  placeholder="Password *"
                  onChange={handleAdminLoginForm}
                  value={adminLoginDetails.adminPassword}
                  onKeyDown={handleKeyPress}
                />
              </div>

              <div className="adminRememberme">
                <input type="checkbox" name="rememder" id="remember" />
                Remember me
              </div>
            </div>

            <div className="adminLoginBtn" onClick={submitAdminLoginForm}>
              Login
            </div>
          </div>
          {loading ? (
            <div className="loading">
              <div className="loading-sub">
                <div className="loader"></div>
              </div>
            </div>
          ) : (
            ""
          )}
        </form>
      ) : (
        ""
      )}
    </>
  );
};
export default AdminLoginPage;

// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import "./AdminLoginPage.css";
// import data from "./User.js";

// const AdminLoginPage = () => {
//   const navigate = useNavigate();
//   const [adminLoginDetails, setAdminLoginDetails] = useState({
//     adminUsername: "",
//     adminPassword: "",
//   });
//   // const [authenticated, setauthenticated] = useState(
//   //   localStorage.getItem(localStorage.getItem("authenticated") || false)
//   // );
//   const handleAdminLoginForm = (event) => {
//     const { name, value } = event.target;
//     setAdminLoginDetails((prev) => {
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   };

//   const submitAdminLoginForm = () => {
//     console.log(adminLoginDetails);
//     const userData = data.find(
//       (user) => user.username === adminLoginDetails.adminUsername
//     );
//     console.log(userData);
//     if (userData) {
//       if (userData.password === adminLoginDetails.adminPassword) {
//         console.log("matched");
//         toast.success("Success Notification !", {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//         // setauthenticated(true);
//         // localStorage.setItem("authenticated", true);

//         navigate("/dashboard", {
//           state: {
//             username: adminLoginDetails.adminUsername,
//           },
//         });
//         setAdminLoginDetails({
//           adminUsername: "",
//           adminPassword: "",
//         });
//       } else {
//         console.log("not matched");
//         toast.error("username or password not matched", {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       }
//     } else {
//       console.log("yoooo");
//       toast.error("username or password not matched", {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//     // if (
//     //   adminLoginDetails.adminUsername == "Prashant" &&
//     //   adminLoginDetails.adminPassword == "maharjan"
//     // ) {

//     // }
//   };
//   return (
//     <>
//       <ToastContainer />
//       <div className="adminLoginMain">
//         <div className="adminLoginBox">
//           <div className="adminLoginHeading">Are You an admin ?</div>
//           <div className="adminLoginTitle">
//             <span className="logo">
//               <img
//                 src="https://i.postimg.cc/pT65LyC9/sabji-land-logo-1.png"
//                 alt="logo"
//               />
//             </span>
//             <div className="adminLoginTitleText">Login</div>
//           </div>
//           <div className="adminLoginForm">
//             <div className="adminInputBox">
//               <input
//                 type="text"
//                 name="adminUsername"
//                 id="login-username"
//                 className="username input-feild"
//                 placeholder="Username *"
//                 onChange={handleAdminLoginForm}
//                 value={adminLoginDetails.adminUsername}
//               />
//             </div>
//             <div className="adminInputBox">
//               <input
//                 type="password"
//                 name="adminPassword"
//                 id="login-password"
//                 className="password input-feild"
//                 placeholder="Password *"
//                 onChange={handleAdminLoginForm}
//                 value={adminLoginDetails.adminPassword}
//               />
//             </div>

//             <div className="adminRememberme">
//               <input type="checkbox" name="rememder" id="remember" />
//               Remember me
//             </div>
//           </div>

//           <div className="adminLoginBtn" onClick={submitAdminLoginForm}>
//             Login
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default AdminLoginPage;
