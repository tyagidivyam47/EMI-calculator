import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  lightPrimaryColor,
  lightSecondaryColor,
  primaryColor,
  secondaryBgColor,
  secondaryColor,
} from "../../Theme";
import blob from "../../assets/blob.svg";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import BungalowIcon from "@mui/icons-material/Bungalow";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import SchoolIcon from "@mui/icons-material/School";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import GiteIcon from "@mui/icons-material/Gite";
import SavingsIcon from "@mui/icons-material/Savings";
import CalculateIcon from "@mui/icons-material/Calculate";

const Home = () => {
  return (
    <Box
      sx={{
        background: secondaryBgColor,
        border: "8px solid #FFFFFF",
        width: { xl: "80%", lg: "80%", xs: "100%" },
        padding: "10px",
        marginTop: "30px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "40px",
        borderRadius: 5,
        font: "600 16px Raleway, serif",
      }}
    >
      <Box
        sx={{
          display: {
            md: "none",
            xs: "block",
            fontSize: "32px",
            marginBottom: "56px",
            // marginTop: "156px",
            textAlign:"center"
          }
        }}
      >
        Dashboard
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: primaryColor,
            borderRadius: 15,
            width: { md: "450px", xs: "340px" },
            marginX: "auto",
            // marginX: {md:"300px", xs:"0"},
            paddingTop: "30px",
            paddingBottom: "30px",
            marginBottom: "32px",
            ":hover": {
              transition: "0.3s",
              background: lightPrimaryColor,
              boxShadow:
                "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
            },
          }}
        >
          <Link
            to={"/EMI Calculator"}
            style={{
              textDecoration: "none",
              color: primaryColor,
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CalculateIcon
                sx={{ width: "180px", height: "180px", color: "#ffffff" }}
              />
            </Box>
            <Box
              sx={{
                fontSize: { md: "32px", xs: "28px" },
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              EMI Calculator
            </Box>
          </Link>
        </Box>
        <Box sx={{ fontSize: "26px", textAlign: "center" }}>
          Featured Calculators
        </Box>
        <Box>
          <Box
            display={"grid"}
            sx={{
              gridTemplateColumns: {
                lg: "auto auto auto",
                md: "auto auto",
                xs: "auto",
              },
              justifyContent: "center",
              gap: "60px",
              background: lightPrimaryColor,
              borderRadius: 15,
              marginX: "25px",
              paddingTop: "50px",
              paddingBottom: "50px",
              marginBottom: "32px",
              boxShadow:
                "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
            }}
          >
            <Link to={"/Home Loan"} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  padding: "20px",
                  borderRadius: 5,
                  ":hover": {
                    transition: "0.5s",
                    ".icons": {
                      color: secondaryColor,
                    },
                    boxShadow:
                      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                  },
                }}
              >
                <Box
                  // className="iconBg"
                  sx={{
                    width: "100px",
                    height: "100px",
                    background: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 100,
                  }}
                >
                  <BungalowIcon
                    className="icons"
                    sx={{
                      color: lightPrimaryColor,
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </Box>
                <Box sx={{ color: "#ffffff", fontSize: "18px" }}>
                  Home Loan Calculator
                </Box>
              </Box>
            </Link>

            <Link to={"/Car Loan"} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  padding: "20px",
                  borderRadius: 5,
                  ":hover": {
                    transition: "0.5s",
                    ".icons": {
                      color: secondaryColor,
                    },
                    boxShadow:
                      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100px",
                    height: "100px",
                    background: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 100,
                  }}
                >
                  <DirectionsCarFilledIcon
                    className="icons"
                    sx={{
                      color: lightPrimaryColor,
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </Box>
                <Box sx={{ color: "#ffffff", fontSize: "18px" }}>
                  Car Loan Calculator
                </Box>
              </Box>
            </Link>

            <Link to={"/Education Loan"} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  padding: "20px",
                  borderRadius: 5,
                  ":hover": {
                    transition: "0.5s",
                    ".icons": {
                      color: secondaryColor,
                    },
                    boxShadow:
                      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100px",
                    height: "100px",
                    background: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 100,
                  }}
                >
                  <SchoolIcon
                    className="icons"
                    sx={{
                      color: lightPrimaryColor,
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </Box>
                <Box sx={{ color: "#ffffff", fontSize: "18px" }}>
                  Education Loan Calculator
                </Box>
              </Box>
            </Link>

            <Link to={"/Personal Loan"} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  padding: "20px",
                  borderRadius: 5,
                  ":hover": {
                    transition: "0.5s",
                    ".icons": {
                      color: secondaryColor,
                    },
                    boxShadow:
                      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100px",
                    height: "100px",
                    background: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 100,
                  }}
                >
                  <SettingsAccessibilityIcon
                    className="icons"
                    sx={{
                      color: lightPrimaryColor,
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </Box>
                <Box sx={{ color: "#ffffff", fontSize: "18px" }}>
                  Personal Loan Calculator
                </Box>
              </Box>
            </Link>

            <Link
              to={"/Loan Against Property"}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  padding: "20px",
                  borderRadius: 5,
                  ":hover": {
                    transition: "0.5s",
                    ".icons": {
                      color: secondaryColor,
                    },
                    boxShadow:
                      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100px",
                    height: "100px",
                    background: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 100,
                  }}
                >
                  <GiteIcon
                    className="icons"
                    sx={{
                      color: lightPrimaryColor,
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </Box>
                <Box sx={{ color: "#ffffff", fontSize: "18px" }}>
                  Loan Against Property
                </Box>
              </Box>
            </Link>

            <Link to={"/Loan as per budget"} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  padding: "20px",
                  borderRadius: 5,
                  ":hover": {
                    transition: "0.5s",
                    ".icons": {
                      color: secondaryColor,
                    },
                    boxShadow:
                      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100px",
                    height: "100px",
                    background: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 100,
                  }}
                >
                  <SavingsIcon
                    className="icons"
                    sx={{
                      color: lightPrimaryColor,
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </Box>
                <Box sx={{ color: "#ffffff", fontSize: "18px" }}>
                  Loan as per budget
                </Box>
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
