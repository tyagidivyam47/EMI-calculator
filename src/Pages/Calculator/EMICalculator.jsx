import React from "react";
import { useState } from "react";
import Calculator from "../../Components/Calculator";
import PieChart from "../../Components/PieChart";
import Particle from "../../Components/Particle";
import BarChart from "../../Components/BarChart";
import downloadIcon from "../../assets/download-icon.png";

import "./EMICalculator.css";
import { primaryColor } from "../../Theme";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(5);
  const [interest, setInterest] = useState(6.5);
  const [monthlyEMI, setMonthlyEMI] = useState();
  const [totalInterest, setTotalInterest] = useState();
  const [showParticles, setShowParticles] = useState(true);
  const [loanType, setLoanType] = useState("home");
  const [upperLimits, setUpperLimits] = useState([10000000, 9, 35])

  const handleChange = (
    loanAmountI,
    tenureI,
    interestI,
    monthlyEMII,
    totalInterestI
  ) => {
    setLoanAmount(loanAmountI);
    setTenure(tenureI);
    setInterest(interestI);
    setMonthlyEMI(monthlyEMII);
    setTotalInterest(totalInterestI);
  };

  const handlePrint = () => {
    setShowParticles(false);
    setTimeout(() => {
      window.print();
      setShowParticles(true);
    }, [500]);
  };

  const loanTypeClick = (type) => {
    setLoanType(type)
    if(type === 'home'){
      setUpperLimits([10000000, 9, 35]);
    }
    else if( type === 'car'){
      setUpperLimits([5000000, 10, 8]);
    }
    else if( type === 'edu'){
      setUpperLimits([4000000, 12, 10]);
    }
    else if( type === 'car'){
      setUpperLimits([7500000, 15, 5]);
    }
  };

  return (
    <div style={{ background: "", width: "100%", height: "100vh" }}>
      {/* {showParticles && <Particle />} */}
      <div
        style={{
          textAlign: "center",
          // fontFamily: "Sixtyfour, sans-serif",
          // fontSize: "32px",
          marginTop: "30px",
          // backgroundColor: "#E5F9F5",
          color: "#FFFFFF",
          width: "500px",
          height: "50px",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "15px",
          paddingTop: "12px",
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "10px",
          paddingRight: "10px",
          background: primaryColor
        }}
        // className="bg-teal-800"
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: "50px",
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
      </div>
      <div style={{ marginTop: "50px", padding: "0px 60px" }}>
        <BarChart
          interest={interest}
          loanAmount={loanAmount}
          monthlyEmi={monthlyEMI}
          tenure={tenure}
          totalInterest={totalInterest}
        />
      </div>

      <div>
        {showParticles && (
          <div
            onClick={handlePrint}
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "50px",
              paddingTop: "50px",
            }}
          >
            <img
              src={downloadIcon}
              style={{ width: "35px", cursor: "pointer" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EMICalculator;
