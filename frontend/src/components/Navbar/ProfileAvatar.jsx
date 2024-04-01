import React, { useState, useEffect } from "react";
import "./ProfileAvatar.css";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout"; // Renamed to differentiate from function name
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineReceiptLong } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
const ProfileAvatar = ({ userData, setUserData, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const hahaha = (event) => {
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
      .get("http://localhost:4000/api/v1/logout", { withCredentials: true })
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
  console.log(open);
  console.log(userData);
  const initial = userData.name[0];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log(windowWidth);
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
          onClick={hahaha}
          size="small"
          style={{ marginLeft: windowWidth > 800 ? 20 : 0 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="false"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 40, height: 40, backgroundColor: "#71b646" }}>
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
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            // ml: 2,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: windowWidth > 800 ? 40 : 115,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Link to="/view" className="pLink">
          <MenuItem>
            <Avatar>
              <AiOutlineUser />
            </Avatar>
            <span>My Profile</span>
          </MenuItem>
        </Link>

        <Link to="/view/orders" className="pLink">
          <MenuItem>
            <Avatar>
              <MdOutlineReceiptLong />
            </Avatar>
            <span>My Orders</span>
          </MenuItem>
        </Link>
        <Divider />

        <MenuItem>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <span onClick={handleLogout}>Logout</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileAvatar;
