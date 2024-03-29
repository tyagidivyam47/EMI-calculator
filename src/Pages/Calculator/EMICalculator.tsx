import React, { useEffect } from "react";
import { useState } from "react";
import Calculator from "../../Components/Calculator";
import PieChart from "../../Components/PieChart";
import Particle from "../../Components/Particle";
import BarChart from "../../Components/BarChart";
import WestIcon from "@mui/icons-material/West";
import "./EMICalculator.css";
import { lightPrimaryColor, mainHeading, primaryColor } from "../../Theme";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import AmortizationTable from "../../Components/AmortizationTable";
import { calcAmortization } from "../../Components/amortization";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(5);
  const [tenureInMos, setTenureInMos] = useState(60);
  const [interest, setInterest] = useState(6.5);
  const [monthlyEMI, setMonthlyEMI] = useState<Number>(19566);
  const [totalInterest, setTotalInterest] = useState<Number>();
  const [showParticles, setShowParticles] = useState(true);
  const [loanType, setLoanType] = useState("home");
  const [upperLimits, setUpperLimits] = useState([10000000, 9, 35]);
  const [ammData, setAmmData] = useState<any>([]);

  const handleChange = (
    loanAmountI: number,
    tenureI: number,
    tenureMosI: number,
    interestI: number,
    monthlyEMII: number,
    totalInterestI: number
  ): void => {
    setLoanAmount(loanAmountI);
    setTenure(tenureI);
    setTenureInMos(tenureMosI);
    setInterest(interestI);
    setMonthlyEMI(monthlyEMII);
    setTotalInterest(totalInterestI);
  };

  const handlePrint = () => {
    setShowParticles(false);
    setTimeout(() => {
      window.print();
      setShowParticles(true);
    }, 500);
  };

  const loanTypeClick = (type: string) => {
    setLoanType(type);
    if (type === "home") {
      setUpperLimits([10000000, 9, 35]);
    } else if (type === "car") {
      setUpperLimits([5000000, 10, 8]);
    } else if (type === "edu") {
      setUpperLimits([4000000, 12, 10]);
    } else if (type === "car") {
      setUpperLimits([7500000, 15, 5]);
    }
  };

  useEffect(() => {
    const ans = calcAmortization(loanAmount, interest, tenureInMos, monthlyEMI);
    // console.log(ans)
    setAmmData(ans);
  }, [loanAmount, tenure, interest]);

  return (
    <div
      style={{
        background: "",
        width: "80%",
        height: "100vh",
        paddingBottom: "300px",
      }}
    >
      {/* {showParticles && <Particle />} */}
      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          color: "#FFFFFF",
          width: "500px",
          height: "50px",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "15px",
          paddingTop: "12px",
          display: "none",
          justifyContent: "space-between",
          paddingLeft: "10px",
          paddingRight: "10px",
          background: primaryColor,
        }}
      >
        <div
          onClick={() => loanTypeClick("home")}
          className={
            loanType === "home"
              ? "text-[#007BA7] font-semibold bg-white px-3 rounded-t-lg cursor-pointer"
              : "text-white  hover:text-[#67dafd] cursor-pointer"
          }
        >
          Home Loan
        </div>
        <div
          onClick={() => loanTypeClick("car")}
          className={
            loanType === "car"
              ? "text-[#007BA7] font-semibold bg-white px-3 rounded-t-lg cursor-pointer"
              : "text-white  hover:text-[#67dafd] cursor-pointer"
          }
        >
          Car Loan
        </div>
        <div
          onClick={() => loanTypeClick("edu")}
          className={
            loanType === "edu"
              ? "text-[#007BA7] font-semibold bg-white px-3 rounded-t-lg cursor-pointer"
              : "text-white  hover:text-[#67dafd] cursor-pointer"
          }
        >
          Education Loan
        </div>
        <div
          onClick={() => loanTypeClick("personal")}
          className={
            loanType === "personal"
              ? "text-[#007BA7] font-semibold bg-white px-3 rounded-t-lg cursor-pointer"
              : "text-white  hover:text-[#67dafd] cursor-pointer"
          }
        >
          Personal Loan
        </div>
        {/* EMI Calculator */}
      </div>

      <Link to={"/Dashboard"} style={{ maxWidth: "190px", background: "red" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "8px 15px",
            // background:"red",
            maxWidth: "190px",
          }}
        >
          <WestIcon sx={{ color: lightPrimaryColor }} />
          <div
            style={{
              font: "600 14px Raleway, serif",
              color: lightPrimaryColor,
              textDecoration: "underline",
            }}
          >
            Back to Dashboard
          </div>
        </div>
      </Link>

      <Box
        sx={{
          font: mainHeading,
          marginBottom: "50px",
          color: primaryColor,
          marginLeft: "70px",
          marginTop: "30px",
        }}
      >
        EMI Calculator
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: "50px",
          flexDirection: { xs: "column", md: "column", lg: "row" },
        }}
      >
        <div className="app">
          <div>
            <Calculator
              inputLoanAmount={loanAmount}
              inputTenure={tenure}
              inputInterest={interest}
              onChange={handleChange}
              amountUl={upperLimits[0]}
              interestUl={upperLimits[1]}
              tenureUl={upperLimits[2]}
            />
          </div>
        </div>
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "5px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <PieChart loanAmount={loanAmount} totalInterest={totalInterest} />
        </div>
      </Box>
      <div style={{ marginTop: "50px", padding: "0px 60px" }}>
        <BarChart ammData={ammData} />
      </div>

      <div style={{marginTop:"25px", paddingBottom:"100px", paddingLeft:"30px"}}>
        <AmortizationTable data={ammData} />
      </div>
    </div>
  );
};

export default EMICalculator;
