import { Route, Routes } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNav from "./admin-nav";
import Img from "../img";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";

export default function AdminRoute(props) {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  // const [currentTime, setCurrentTime] = useState(new Date());
  // const [expirationTime, setExpirationTime] = useState(null);
  // console.log(expirationTime);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 10000); // 10 seconds

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  // useEffect(() => {
  //   setExpirationTime(localStorage.expire);
  // }, []);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(new Date());
  //     console.log(currentTime);

  //     if (expirationTime && expirationTime < currentTime) {
  //       console.log("Hello");
  //     }
  //   }, 10000); // Check every 10 seconds

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // if (currentTime > expireDate) {
  //   console.log("hello");
  // }

  const [show, setShow] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const [expirationTime, setExpirationTime] = useState(null);

  useEffect(() => {
    const expireTime = new Date(localStorage.expire); // 10 seconds later

    setExpirationTime(expireTime);
  }, []);
  useEffect(() => {
    console.log(expirationTime);

    const interval = setInterval(() => {
      const currentTime = new Date();
      console.log(currentTime);
      if (expirationTime && expirationTime < currentTime) {
        localStorage.removeItem("token");
        console.log(localStorage);
      } else {
        console.log("asdf");
      }
    }, 4 * 24 * 60 * 60 * 1000); // Check every 10 seconds

    return () => {
      clearInterval(interval);
    };
  }, [expirationTime]);

  axios
    .get("https://backend.sabjiland.com/api/v1/whoami", {
      withCredentials: true,
    })
    .then((res) => {
      console.log("success", res);
      setUser(res.data.user.name);
      setRole(res.data.user.role);
      console.log(user);
      if (res.message) {
        navigate("/");
      } else {
        setShow(true);
      }
    })
    .catch((err) => {
      console.log(err);
      navigate("/");
    });

  const logOut = () => {
    axios
      .get("https://backend.sabjiland.com/api/v1/logout", {
        withCredentials: true,
      })
      .then((res) => {
        // localStorage.setItem("token", res.data.token);
        navigate("/");
      });
  };

  return (
    <div>
      {show ? (
        <>
          <div className="app-container">
            <div className="top-section">
              <Img
                src={process.env.PUBLIC_URL + "/images/logo.png"}
                class="logo"
              />
              <span className="logout-profile">
                {/* <span onClick={() => setShowLogout(!showLogout)}>
                  <Img
                    src={process.env.PUBLIC_URL + "/images/profile.png"}
                    class="logout-profile-img"
                  />
                  <button>
                    <BsChevronDown />
                  </button>
                </span> */}

                <div className={`logout`} onClick={logOut}>
                  <IoIosLogOut />
                </div>
                <div className="logout-caption">Sign Out</div>
              </span>
            </div>
            {/* <Img src="./images/logo.png" class="logo" /> */}
            <div className="admin-panel">
              <AdminNav username={user} role={role} />
              <div className="admin-body">
                <Outlet />
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
