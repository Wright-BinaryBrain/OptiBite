import "./login.css";
import { useState } from "react";
import Login from "./Login";
import PopupBox from "./PopupBox";

const Popup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const openLoginBox = () => {
    setIsLogin(true);
  };
  const closeLoginBox = () => {
    setIsLogin(false);
  };

  return (
    <>
      <div className="all-popup-wrapper">
        {isLogin ? (
          <Login closeLogin={closeLoginBox} />
        ) : (
          <PopupBox open={openLoginBox} />
        )}
      </div>
    </>
  );
};

export default Popup;
