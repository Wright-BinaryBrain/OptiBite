import "./login.css";
import { useState } from "react";
import Login from "./Login";
import PopupBox from "./PopupBox";
import Guest from "./Guest";

const Popup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const openLoginBox = () => {
    setIsLogin(true);
  };
  const closeLoginBox = () => {
    setIsLogin(false);
  };
  const openGuest = () => {
    setIsGuest(true);
  };
  const closeGuest = () => {
    setIsGuest(false);
  };
  return (
    <>
      <div className="all-popup-wrapper">
        {isLogin ? (
          <Login closeLogin={closeLoginBox} />
        ) : isGuest ? (
          <Guest close={closeGuest} />
        ) : (
          <PopupBox open={openLoginBox} guest={openGuest} />
        )}
      </div>
    </>
  );
};

export default Popup;
