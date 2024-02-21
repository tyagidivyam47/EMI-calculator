// Header.js

import React, { useEffect, useState } from "react";
import logo from "../assets/EMI-logo1.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { primaryColor, tertiaryColor } from "../Theme";

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "auth_token",
    "user_id",
  ]);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState();

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
    <div style={{
      position:"sticky",
          top:0
    }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: primaryColor,
          height: "60px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
            }}
            className="text-[#00d09b] hover:text-teal-900 hidden"
          >
            Home
          </NavLink>
          {loggedIn && (
            <NavLink
              to="/calculator"
              style={{
                //   color: "#00d09b", // Green
                fontSize: "16px",
                fontWeight: "bold",
                textDecoration: "none",
                margin: "0 10px",
                transition: "color 0.3s ease",
              }}
              className="text-[#ffffff] hover:text-blue-300"
            >
              Calculator
            </NavLink>
          )}
          <NavLink
            href="#"
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              textDecoration: "none",
              margin: "0 10px",
              transition: "color 0.3s ease",
            }}
            className="text-[#00d09b] hover:text-teal-900 hidden"
          >
            Contact Us
          </NavLink>
        </div>
        {/* {!loggedIn && (
          <NavLink
            to="/login"
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              textDecoration: "none",
              margin: "0 10px",
              transition: "color 0.3s ease",
            }}
            className="text-[#00d09b] bg-white px-5 py-2 rounded-lg hover:bg-[#E5F9F5] hover:text-teal-800"
          >
            Log In
          </NavLink>
        )} */}

        {loggedIn && (
          <Link
            to='/dashboard'
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              textDecoration: "none",
              margin: "0 10px",
              transition: "color 0.3s ease",
            }}
            className="text-[#ffffff] hover:text-blue-300"
          >
            Dashboard
          </Link>
        )}
        {loggedIn && (
          <span
            onClick={logoutHandler}
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              textDecoration: "none",
              margin: "0 10px",
              transition: "color 0.3s ease",
            }}
            className={`text-[#${primaryColor}] bg-white px-5 py-2 rounded-lg hover:bg-[#54a4ffa9] hover:text-white cursor-pointer`}
          >
            Log Out
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
