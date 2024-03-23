import AdminNav from "./components/admin/admin-nav/admin-nav";
import AdminRoute from "./components/admin/admin-nav/adminRoute";
import Img from "./components/admin/img";
import "./css/admin-main.css";

import { useLocation, useNavigate } from "react-router-dom";
import AdminLoginPage from "./components/admin-login/AdminLoginPage";
import { useEffect, useState } from "react";
import axios from "axios";
import GeneralRoute from "./components/admin/admin-nav/generalRoute";
export default function App() {
  return (
    <div className="App">
      <GeneralRoute />
    </div>
  );
}
