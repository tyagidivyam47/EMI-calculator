// Header.js

import React, { useEffect, useState } from "react";
import logo from "../assets/EMI-logo1.svg";
// const logo =  require("../assets/EMI-logo1.png");
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  primaryColor,
  secondaryBgColor,
  secondaryColor,
  tertiaryColor,
} from "../Theme";
import {
  Box,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from "@mui/material";
import calciIcon from "../assets/calciIcons.svg";

const Header = () => {
  const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      // width: 200,
      background: secondaryColor,
      textAlign: "center",
      font: "600 18px Raleway, serif",
    },
  });

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
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background:"#ffffff"
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { md: "left", xs: "center" },
          // backgroundColor: "red",
          height: "64px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <Box sx={{ flexGrow: { md: 0, sm: 1.3, xs: 2 } }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "auto",
          }}
        >
          <Box sx={{ display: { md: "block", xs: "none" } }}>
            <img src={logo} />
          </Box>
          <Box
            className="text-xl font-semibold text-white"
            sx={{
              fontFamily: "Sixtyfour, sans-serif",
              paddingLeft: { md: "32px", xs: "0px" },
              margin: "auto",
            }}
          >
            EMI Buddy
          </Box>
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
        <span style={{ flexGrow: 1 }} />
        {title === "Dashboard" && (
          <Link to={"/EMI Calculator"} style={{ textDecoration: "none" }}>
            <CustomTooltip
              placement="left"
              title="EMI Calculator"
              // sx={{  }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  marginRight: { md: "80px", xs: "0" },
                  ":hover": {
                    transition: "1s",
                    ".icons": {
                      color: secondaryColor,
                    },
                    ".titleP": {
                      color: primaryColor,
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    // width: "100px",
                    // height: "100px",
                    background: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "center",
                    borderRadius: 100,
                    // marginTop:"20px",
                  }}
                >
                  <img src={calciIcon} style={{ height: "50px" }} />
                </Box>
                {/* <Box className="titleP" sx={{ color: secondaryBgColor, fontSize: "20px" }}>
              EMI Calculator
            </Box> */}
              </Box>
            </CustomTooltip>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Header;
