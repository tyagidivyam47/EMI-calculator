// Header.js

import React, { useEffect, useState } from "react";
import logo from "../assets/EMI-logo1.png";
// const logo =  require("../assets/EMI-logo1.png");
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { primaryColor, secondaryColor, tertiaryColor } from "../Theme";
import { Box } from "@mui/material";

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "auth_token",
    "user_id",
  ]);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<boolean>();

  const logoutHandler = () => {
    removeCookie("auth_token");
    removeCookie("user_id");
    navigate("/");
  };

  useEffect(() => {
    const isLoggedIn = cookies.auth_token;
    if (isLoggedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [cookies]);
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex:50
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          height: "64px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} style={{ height: "68px" }} />
          <div
            className="text-xl font-semibold text-white"
            style={{ fontFamily: "Sixtyfour, sans-serif" }}
          >
            EMI Buddy
          </div>
        </div>
        <div className="flex justify-end ml-auto">
          <NavLink
            to="/"
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              textDecoration: "none",
              margin: "0 10px",
              transition: "color 0.3s ease",
              display: "none",
            }}
            className="text-[#00d09b] hover:text-teal-900 hidden"
          >
            Home
          </NavLink>
        </div>
      </Box>
    </div>
  );
};

export default Header;
