import axios, { Axios } from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  // const [authenticated, setauthenticated] = useState(null);
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("authenticated");
  //   if (loggedInUser) {
  //     setauthenticated(loggedInUser);
  //   }
  //   console.log(loggedInUser);
  // }, []);
  // const navigate = useNavigate();
  // axios.get("https://backend.sabjiland.com/api/v1/whoami").then((res) => {
  //   console.log(res);
  // });
  return (
    <>
      {/* {authenticated ? (
        <> */}

      <h1 className="admin-title">Dashboard</h1>

      {/* </>
      ) : (
        navigate("/")
      )}*/}
    </>
  );
}
