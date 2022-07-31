import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import "../styles/functions.css";

const NavBar: React.FC = () => {
  const { logged, setLogged } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    const refreshToken = window.localStorage.getItem("refreshToken");
    if (refreshToken) {
      axios({
        url: `${import.meta.env.VITE_API_URL}/api/v1/auth/token/logout`,
        method: "POST",
        headers: {
          Authorization: "Bearer " + refreshToken,
        },
      }).then(({ data, status }) => {
        if (status === 200) {
          console.log(data);
          window.localStorage.removeItem("refreshToken");
          window.localStorage.removeItem("accessToken");
          setLogged(false);
          navigate("/");
        }
      });
    }
  };

  return (
    <div className="nav">
      <div>
        <Link to="/">Home</Link>
      </div>
      {logged ? (
        <>
          <div onClick={handleLogOut} style={{ cursor: "pointer" }}>
            <span>Log out</span>
          </div>
          <div>{/* Extra Link goes here */}</div>
        </>
      ) : (
        <>
          <div>
            <Link to="/register">Sign In</Link>
          </div>
          <div>
            <Link to="/login">Log In</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
