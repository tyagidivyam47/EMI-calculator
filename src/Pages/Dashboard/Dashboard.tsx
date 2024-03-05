import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Drawer,
  Modal,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  extraLPrimaryColor,
  extraLSecondaryColor,
  lightPrimaryColor,
  lightSecondaryColor,
  mainHeading,
  mainHeadingSm,
  mainSubHeading,
  primaryColor,
  secondaryBgColor,
  secondaryColor,
  tertiaryColor,
} from "../../Theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningIcon from "@mui/icons-material/Warning";
import CancelIcon from "@mui/icons-material/Cancel";
import Calculator from "../../Components/Calculator";
import HomeLoan from "../LoanTypes/HomeLoan/HomeLoan";
import HelpIcon from "@mui/icons-material/Help";
// import HomeInfo from "../LoanTypes/HomeLoan/HomeInfo";
// import LAPInfo from "../LoanTypes/LAP/LAPInfo";
import LAP from "../LoanTypes/LAP/LAP";
import BudgetLoan from "../LoanTypes/BudgetLoan/BudgetLoan";
// import BudgetInfo from "../LoanTypes/BudgetLoan/BudgetInfo";
import { Link } from "react-router-dom";
import FAQ from "../../Components/FAQ";
import { budgetFaq, emiCalcFaq, homeLoanFaq, lapFaq } from "../../faqs";
import InfoIcon from "@mui/icons-material/Info";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
// const homeLoanFaqData = homeLoanFaq

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

const faqStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 1800,
  height: 600,
  overflowY: "hidden",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  paddingRight: "-300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // background:"#feede6",
  background:
    "linear-gradient(100deg, rgba(254,237,230,1) 86%, rgba(80,178,234,1) 100%)",
  // justifyContent: "center",
  borderRadius: 6,
};

const LoanCard = (props: any) => {
  return (
    <Box
      sx={{
        height: "60px",
        width: { xl: "215px", md: "215px", xs: "300px" },
        background: lightSecondaryColor,
        color: "#FFFFFF",
        borderRadius: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        transition: "0.4s",
        gap: "4px",
        ":hover": {
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          background: secondaryColor,
        },
      }}
    >
      <span style={{ paddingLeft: "8px" }}>{props.children}</span>
      <Tooltip
        title={props.tooltip}
        placement="right"
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: primaryColor,
              "& .MuiTooltip-arrow": {
                color: primaryColor,
              },
              background: "rgba(0,87,255,0.9)",
              font: "600 15px Raleway, serif",
            },
          },
        }}
      >
        <InfoIcon sx={{ marginRight: "10px" }} />
      </Tooltip>
    </Box>
  );
};

const Dashboard = () => {
  // const [cookies, setCookie, removeCookie] = useCookies([
  //   "auth_token",
  //   "user_id",
  //   "curr_sign",
  // ]);
  // const currency = cookies.curr_sign || "₹";
  const currency = useSelector((state: IRootState) => state.currency.currency);
  // console.log(currency)

  const [openDrawer, setOpenDrawer] = useState(false);
  const [warnModal, setWarnModal] = useState(false);
  const [loanType, setLoanType] = useState<string>();
  const [infoModal, setInfoModal] = useState(false);
  // const [currSign, setCurrSign] = useState('₹');

  const handleLoanClick = (type: string) => {
    setOpenDrawer(true);
    setLoanType(type);
  };

  const handleChangeTemp = () => {};

  // useEffect(() => {
  //   if (currency) {
  //     setCurrSign(currency)
  //   }
  // }, [cookies]);

  return (
    <Box
      sx={{
        background: secondaryBgColor,
        border: "8px solid #FFFFFF",
        width: { xl: "80%", lg: "80%", xs: "100%" },
        padding:"10px",
        marginTop: "30px",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5,
        height:"100vh"
      }}
    >
      <Box
        sx={{
          font: {
            xl: mainHeading,
            md: mainHeading,
            sm: mainHeadingSm,
            xs: mainHeadingSm,
          },
          paddingLeft:{
            xl: "0px",
            md: "0px",
            sm: "10px",
            xs: "10px",
          },
          marginBottom: "50px",
          color: primaryColor,
        }}
      >
        Dashboard
      </Box>
      <Box
        sx={{
          marginBottom: "50px",
          display: "flex",
          justifyContent: "center",
          marginRight: { xl: "110px", md: "110px", xs: "0" },
        }}
      >
        <Box
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1581299327801-faeb40ea459e?q=80&w=1610&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 5,
            font: mainSubHeading,
            p: "20px 50px",
            color: "#FFFFFF",
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              //  p:"20px 25px"
              height: "120px",
              width: { xl: "300px", md: "300px", xs: "200px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign:"center"
            }}
          >
            EMI Calculator
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            gap={"12px"}
            marginTop={"22px"}
          >
            <Link to={"/calculator"}>
              <Button
                variant="outlined"
                sx={{
                  color: "#ffffff",
                  // border: "2px solid #FFFFFF",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(5px)",
                  WebkitBackdropFilter: "blur(5px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  ":hover": {
                    border: "1px solid #FF4500 ",
                  },
                }}
              >
                Open
              </Button>
            </Link>
            <Tooltip
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: primaryColor,
                    "& .MuiTooltip-arrow": {
                      color: secondaryColor,
                    },
                    background: "rgba(255,41,144, 1)",
                    font: "600 15px Raleway, serif",
                  },
                },
              }}
              title="This EMI calculator helps you estimate your monthly loan installments for home loans, car loans, or personal loans. Simply input the loan amount, interest rate, and tenure, and it will compute your EMIs instantly"
            >
              <Button
                variant="contained"
                sx={{
                  background: "#FFFFFF",
                  color: secondaryColor,
                  borderRadius: "16px",
                  ":hover": {
                    background: "#FFFFFF",
                  },
                }}
              >
                Info
              </Button>
            </Tooltip>
            <Button
              onClick={() => {
                setLoanType("emiCalculator");
                setInfoModal(true);
              }}
              variant="contained"
              sx={{
                background: "#FFFFFF",
                color: secondaryColor,
                borderRadius: "16px",
                ":hover": {
                  background: "#FFFFFF",
                },
              }}
            >
              FAQ's
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginBottom: "50px", marginRight: { xl: "0px", md: "0px", xs: "0" }, paddingX:{ xl: "50px", md: "50px", xs: "10px" } }}>
        <Accordion sx={{ minHeight: "100px", marginRight: { xl: "0px", md: "0px", xs: "0" } }}>
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
                "linear-gradient(90deg, rgb(0,87,255) 88%, rgb(255,41,144) 100%)",
              // borderRadius: "10px",
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
                justifyContent:"center"
              }}
            >
              <div onClick={() => handleLoanClick("home")}>
                <LoanCard tooltip="A home loan is a credit to buy, build, or renovate a home from a financial institution. The interest rate and fee depend on your profile, loan amount, tenure, etc. You can compare and apply online for the best offers.">
                  Home Loan
                </LoanCard>
              </div>
              <div onClick={() => handleLoanClick("car")}>
                <LoanCard tooltip="Car Loan Info">Car Loan</LoanCard>
              </div>
              <div onClick={() => handleLoanClick("edu")}>
                <LoanCard tooltip="Education Loan Info">
                  Education Loan
                </LoanCard>
              </div>
              <div onClick={() => handleLoanClick("personal")}>
                <LoanCard tooltip="Personal Loan Info">Personal Loan</LoanCard>
              </div>
              <div onClick={() => handleLoanClick("lap")}>
                <LoanCard tooltip=" A Loan against Property (LAP) is a type of loan facility availed by individuals and businesses against the mortgage of a commercial or residential property">
                  Loan Against Property
                </LoanCard>
              </div>
              <div onClick={() => handleLoanClick("budget")}>
                <LoanCard tooltip="Calculate your loan details on the basis of your monthly budget.">
                  Loan as per Budget
                </LoanCard>
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
              "linear-gradient(105deg, rgba(243,246,251,1) 78%, rgba(245,160,201,1) 89%)",
          }}
        >
          <div onClick={() => setWarnModal(true)}>
            <CancelIcon
              sx={{
                color: "darkred",
                width: "35px",
                height: "35px",
                marginLeft: "10px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <div
              style={{
                font: mainSubHeading,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: primaryColor,
                marginBottom: "40px",
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
                : loanType === "budget"
                ? "Loan as per Budget"
                : "Loan Against Property"}
            </div>
            <div onClick={() => setInfoModal(true)}>
              <HelpIcon
                style={{
                  color: secondaryColor,
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
          {loanType === "home" ? (
            <div style={{}}>
              <HomeLoan currency={currency} />
            </div>
          ) : loanType === "lap" ? (
            <LAP />
          ) : loanType === "budget" ? (
            <BudgetLoan />
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
                color: "darkred",
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
              sx={{ background: "darkred" }}
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

      <Modal
        open={infoModal}
        onClose={() => {
          setInfoModal(false);
        }}
      >
        <Box sx={faqStyle}>
          <Box sx={{ height: 600, width: "100%" }}>
            {loanType === "home" && <FAQ data={homeLoanFaq} />}
            {loanType === "lap" && <FAQ data={lapFaq} />}
            {loanType === "budget" && <FAQ data={budgetFaq} />}
            {loanType === "emiCalculator" && <FAQ data={emiCalcFaq} />}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
