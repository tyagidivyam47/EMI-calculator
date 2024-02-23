import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Drawer,
  Modal,
} from "@mui/material";
import React, { useState } from "react";
import {
  extraLPrimaryColor,
  extraLSecondaryColor,
  lightPrimaryColor,
  lightSecondaryColor,
  mainHeading,
  mainSubHeading,
  primaryColor,
  secondaryColor,
  tertiaryColor,
} from "../../Theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningIcon from "@mui/icons-material/Warning";
import CancelIcon from "@mui/icons-material/Cancel";
import Calculator from "../../Components/Calculator";
import HomeLoan from "../LoanTypes/HomeLoan/HomeLoan";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 6,
};

const LoanCard = (props) => {
  return (
    <Box
      sx={{
        height: "50px",
        width: "200px",
        background: lightSecondaryColor,
        color: "#FFFFFF",
        borderRadius: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        transition: "0.4s",
        ":hover": {
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          background: secondaryColor,
        },
      }}
    >
      {props.children}
    </Box>
  );
};

const Dashboard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [warnModal, setWarnModal] = useState(false);
  const [loanType, setLoanType] = useState();

  const handleLoanClick = (type) => {
    setOpenDrawer(true);
    setLoanType(type);
  };

  const handleChangeTemp = () => {};

  return (
    <Box sx={{ marginLeft: "70px", marginTop: "30px" }}>
      <Box
        sx={{ font: mainHeading, marginBottom: "50px", color: primaryColor }}
      >
        Dashboard
      </Box>
      <Box sx={{ marginBottom: "50px", marginRight: "60px" }}>
        <Accordion
          square="false"
          sx={{ minHeight: "100px", borderRadius: "10px", marginRight: "60px" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#FFFFFF" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight: "100px",
              font: "500 28px Raleway, serif",
              color: "#FFFFFF",
              background:
                "linear-gradient(90deg, rgba(80,178,234,1) 88%, rgba(255,141,0,1) 100%)",
              borderRadius: "10px",
            }}
          >
            Loan Types
          </AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "50px",
                rowGap: "10px",
              }}
            >
              <div onClick={() => handleLoanClick("home")}>
                <LoanCard>Home Loan</LoanCard>
              </div>
              <div onClick={() => handleLoanClick("car")}>
                <LoanCard>Car Loan</LoanCard>
              </div>
              <div onClick={() => handleLoanClick("edu")}>
                <LoanCard>Education Loan</LoanCard>
              </div>
              <div onClick={() => handleLoanClick("personal")}>
                <LoanCard>Personal Loan</LoanCard>
              </div>
              <div onClick={() => handleLoanClick("lap")}>
                <LoanCard>Loan Against Property</LoanCard>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Drawer */}

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setWarnModal(true)}
      >
        <Box
          sx={{
            width: "1000px",
            background:
              "linear-gradient(157deg, rgba(211,235,249,1) 78%, rgba(253,201,182,1) 89%)",
          }}
        >
          <div onClick={() => setWarnModal(true)}>
            <CancelIcon
              sx={{
                color: "red",
                width: "35px",
                height: "35px",
                marginLeft: "10px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          </div>
          <div
            style={{
              font: mainSubHeading,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent:"center",
              color: primaryColor,
              marginBottom: "60px",
            }}
          >
            {loanType === "home"
              ? "Home Loan Calculator"
              : loanType === "car"
              ? "Car Loan Calculator"
              : loanType === "edu"
              ? "Education Loan Calculator"
              : loanType === "personal"
              ? "Personal Loan Calculator"
              : "Loan Against Property"}
          </div>
          {loanType === "home" ? (
            <div style={{}}>
              <HomeLoan />
            </div>
          ) : (
            <div
              style={{
                maxWidth: "500px",
                marginLeft: "auto",
                marginRight: "auto",
                border: `2px solid ${secondaryColor}`,
                padding: "20px",
                borderRadius: 20,
              }}
            >
              <Calculator
                inputLoanAmount={10000}
                inputTenure={5}
                inputInterest={10}
                onChange={handleChangeTemp}
                amountUl={100000}
                interestUl={11}
                tenureUl={15}
              />
            </div>
          )}
        </Box>
      </Drawer>

      {/* Modal */}

      <Modal
        open={warnModal}
        onClose={() => {
          setWarnModal(false);
        }}
      >
        <Box sx={style}>
          <Box>
            <WarningIcon
              sx={{
                color: "red",
                width: "100px",
                height: "100px",
                marginX: "auto",
                display: "flex",
              }}
            />
          </Box>
          <Box textAlign={"center"}>
            Are you sure you want to exit the Calculator?
          </Box>
          <Box display={"flex"} gap={"10px"} marginTop={"15px"}>
            <Button variant="outlined" onClick={() => setWarnModal(false)}>
              No
            </Button>
            <Button
              variant="contained"
              sx={{ background: "red" }}
              onClick={() => {
                setWarnModal(false);
                setOpenDrawer(false);
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
