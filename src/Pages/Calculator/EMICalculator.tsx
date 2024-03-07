import React, { useEffect } from "react";
import { useState } from "react";
import Calculator from "../../Components/Calculator";
import PieChart from "../../Components/PieChart";
// import Particle from "../../Components/Particle";
import BarChart from "../../Components/BarChart";
import WestIcon from "@mui/icons-material/West";
import "./EMICalculator.css";
import {
  extraLPrimaryColor,
  lightPrimaryColor,
  mainHeading,
  mainHeadingSm,
  mainSubHeading,
  primaryBgColor,
  primaryColor,
  secondaryBgColor,
} from "../../Theme";
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

  // const handlePrint = () => {
  //   setShowParticles(false);
  //   setTimeout(() => {
  //     window.print();
  //     setShowParticles(true);
  //   }, 500);
  // };

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
    <Box
      sx={{
        background: secondaryBgColor,
        width: { xl: "80%", lg: "80%", xs: "100%" },
        paddingBottom: "0px",
        marginTop: "20px",
        // border: "8px solid #FFFFFF",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5,
      }}
    >
      <Box
        sx={{
          font: {
            xl: mainSubHeading,
            md: mainSubHeading,
            sm: mainHeadingSm,
            xs: mainHeadingSm,
          },
          marginBottom: "50px",
          marginTop: {
            xl: "0px",
            md: "0px",
            sm: "10px",
            xs: "10px",
          },
          textAlign: "center",
        }}
      >
        EMI Calculator
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "0px",
          flexDirection: { xs: "column", md: "column", lg: "row" },
          gap: "10px",
        }}
      >
        <div className="">
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
        <Box
          sx={{
            border: "1px solid lightgray",
            display: "flex",
            flexDirection: "column",
            gap: "55px",
            minWidth: "340px",
            background: primaryBgColor,
            borderRadius: 2,
            height: "400px",
            marginTop: "12px",
          }}
        >
          <PieChart loanAmount={loanAmount} totalInterest={totalInterest} />
        </Box>
      </Box>
      <div style={{ marginTop: "45px"}}>
        <BarChart ammData={ammData} />
      </div>
      <Box
        sx={{
          marginTop: "25px",
          paddingBottom: "0px",
          // paddingLeft: { xl: "30px", md: "30px", xs: "0px" },
        }}
      >
        <AmortizationTable data={ammData} />
      </Box>
    </Box>
  );
};

export default EMICalculator;
