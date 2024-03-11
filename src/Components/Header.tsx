// Header.js

import React, { useEffect, useState } from "react";
import logo from "../assets/EMI-logo1.svg";
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
  const [title, setTitle] = useState<string>("Dashboard");

  const logoutHandler = () => {
    removeCookie("auth_token");
    removeCookie("user_id");
    navigate("/");
  };

  useEffect(() => {
    const path = window.location.pathname;
    switch (path) {
      case "/EMI%20Calculator":
        setTitle("EMI Calculator");
        break;
      case "/Dashboard":
        setTitle("Dashboard");
        break;
      case "/Home%20Loan":
        setTitle("Loan Types • Home Loan");
        break;
      case "/Car%20Loan":
        setTitle("Loan Types • Car Loan");
        break;
      case "/Education%20Loan":
        setTitle("Loan Types • Education Loan");
        break;
      case "/Personal%20Loan":
        setTitle("Loan Types • Personal Loan");
        break;
      case "/Loan%20Against%20Property":
        setTitle("Loan Types • LAP");
        break;
      case "/Loan%20as%20per%20budget":
        setTitle("Loan Types • Loan as per budget");
        break;
      default:
        setTitle("");
        break;
    }
  }, [window.location.pathname]);
  return (
    <Box
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { md: "left", xs: "center" },
          backgroundColor: "#FFFFFF",
          height: "64px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} />
          <div
            className="text-xl font-semibold text-white"
            style={{ fontFamily: "Sixtyfour, sans-serif", paddingLeft: "32px" }}
          >
            EMI Buddy
          </div>
        </div>
        <Box
          sx={{
            display: { md: "block", xs: "none" },
            marginLeft: "80px",
            color: primaryColor,
            paddingRight: { lg: "0px", md: "0px", xs: "50px" },
            fontStyle: "italic",
          }}
        >
          {title}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
