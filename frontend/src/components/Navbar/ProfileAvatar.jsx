import React, { useState, useEffect } from "react";
import "./ProfileAvatar.css";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ProfileAvatar = ({ userData, setUserData, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const anchorHandler = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    axios
      .get("http://3.147.205.53/api/v1/logout", {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (open) {
      document.getElementById("root").removeAttribute("aria-hidden", "false");
    }
  }, [open]);
  const initial = userData.name[0];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // console.log(windowWidth);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(() => window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={anchorHandler}
          size="small"
          style={{ marginLeft: windowWidth > 800 ? 20 : 0 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="false"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 40, height: 40, backgroundColor: "#0D86E9" }}>
            {initial}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        style={{ zIndex: "999999", left: 0 }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <span>Logout</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileAvatar;
