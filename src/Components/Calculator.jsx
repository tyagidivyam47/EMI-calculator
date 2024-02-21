import { Tooltip } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { primaryColor, secondaryColor } from "../Theme";

const Calculator = ({
  inputLoanAmount,
  inputTenure,
  inputInterest,
  onChange,
  amountUl,
  interestUl,
  tenureUl,
}) => {
  const [totalLoanAmount, setTotalLoanAmount] = useState(inputLoanAmount);
  const [tenure, setTenure] = useState(inputTenure);
  const [rateOfInterest, setRateOfInterest] = useState(inputInterest);
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalLoanError, setTotalLoanError] = useState("input");
  const [tenureError, setTenureError] = useState("input");
  const [rateOfInterestError, setRateOfInterestError] = useState("input");
  const [cookies, setCookie, removeCookie] = useCookies([
    "auth_token",
    "user_id",
  ]);

  const navigate = useNavigate();

  const calculateEMI = () => {
    if (
      !Number(rateOfInterest) ||
      !Number(tenure) ||
      !Number(totalLoanAmount)
    ) {
      return;
    }
    let interest = rateOfInterest / 12 / 100;
    let tenureInMonths = tenure * 12;

    // Sample: 1000000*0.006*(1+0.006)**120 / ((1+0.006) ** 120 -1)
    let emi =
      (totalLoanAmount * interest * Math.pow(1 + interest, tenureInMonths)) /
      (Math.pow(1 + interest, tenureInMonths) - 1);

    let totalAmt = emi * tenureInMonths;
    let totalInt = totalAmt - totalLoanAmount;

    onChange(
      totalLoanAmount,
      tenure,
      rateOfInterest,
      Math.floor(emi),
      Math.ceil(totalInt)
    );

    setMonthlyEMI(Math.floor(emi));
    setTotalAmount(Math.ceil(totalAmt));
    setTotalInterest(Math.ceil(totalInt));
  };

  useEffect(() => {
    calculateEMI();
  }, [totalLoanAmount, tenure, rateOfInterest]);

  const handleTotalLoanChange = (e) => {
    if (
      e.target.value.length < 6 ||
      e.target.value.length > 8 ||
      e.target.value > amountUl
    ) {
      setTotalLoanError("input error");
    } else {
      setTotalLoanError("input");
    }
    setTotalLoanAmount(parseInt(e.target.value));
  };

  const handleTenureChange = (e) => {
    if (
      e.target.value > 40 ||
      e.target.value < 1 ||
      e.target.value > tenureUl
    ) {
      setTenureError("input error");
    } else {
      setTenureError("input");
    }
    setTenure(parseInt(e.target.value));
  };

  const handleRateOfInterestChange = (e) => {
    if (
      e.target.value > 45 ||
      e.target.value < 1 ||
      e.target.value > interestUl
    ) {
      setRateOfInterestError("input error");
    } else {
      setRateOfInterestError("input");
    }
    setRateOfInterest(parseFloat(e.target.value).toFixed(2));
  };

  useEffect(() => {
    const isLoggedIn = cookies.auth_token;
    if (isLoggedIn) {
      // console.log("logged in");
    } else {
      navigate("/login");
    }
  }, [cookies]);
  return (
    <div>
      <div className="loan-container">
        <div className="title-container">
          <label htmlFor="loan-amount" className="label">
            Loan amount
          </label>
          <div
            className={`value-container ${
              totalLoanError.includes("error") ? "error" : ""
            }`}
          >
            <Tooltip
              open={totalLoanError.includes("error")}
              title="
              The amount of total loan selected is above than the market standards. Getting large loans may have the following risks
              such as Early Payoff Penalties, Upfront Fees, Privacy Concerns, Precomputed Interest, Insurance Offers.
              "
              placement="right"
              style={{ background: primaryColor }}
            >
              <input
                type="number"
                className={totalLoanError}
                style={{
                  width: "100px",
                  textAlign: "right",
                  borderBottom: "2px solid #007BA7",
                }}
                value={totalLoanAmount}
                onChange={handleTotalLoanChange}
              />
            </Tooltip>
            <span>₹</span>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{ fontSize: "15px", color: "#dcdcdc", marginRight: "30px" }}
          >
            1
          </div>
          <input
            id="loan-amount"
            name="loan-amount"
            type="range"
            min="100000"
            max="10000000"
            step="10000"
            className="input"
            placeholder="0"
            value={totalLoanAmount}
            onChange={handleTotalLoanChange}
          />
          <div
            style={{ fontSize: "15px", color: "#dcdcdc", marginLeft: "5px" }}
          >
            100
          </div>
        </div>
      </div>

      <div className="interest-container">
        <div className="title-container">
          <label htmlFor="interest" className="label">
            Rate of interest (p.a)
          </label>
          <div
            className={`value-container ${
              rateOfInterestError.includes("error") ? "error" : ""
            }`}
          >
            <Tooltip
              open={rateOfInterestError.includes("error")}
              title="
              The selected rate of interest on the loan is above than the market standards. Doing such may have the following risks
              such as Interest Rate Burden, Early Payoff Penalties, Upfront Fees, Privacy Concerns, Precomputed Interest, Insurance Offers.
              "
              placement="right"
              style={{ background: primaryColor }}
            >
              <input
                type="number"
                className={rateOfInterestError}
                style={{
                  width: "100px",
                  textAlign: "right",
                  borderBottom: "2px solid #007BA7",
                }}
                value={rateOfInterest}
                onChange={handleRateOfInterestChange}
              />
            </Tooltip>
            <span
              className={`${
                rateOfInterestError.includes("error") ? "error" : ""
              }`}
            >
              %
            </span>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{ fontSize: "15px", color: "#dcdcdc", marginRight: "30px" }}
          >
            1
          </div>
          <input
            id="loan-amount"
            name="loan-amount"
            type="range"
            min="1"
            max="45"
            step="0.1"
            className="input"
            value={rateOfInterest}
            onChange={handleRateOfInterestChange}
          />
          <div
            style={{ fontSize: "15px", color: "#dcdcdc", marginLeft: "20px" }}
          >
            45
          </div>
        </div>
      </div>

      <div className="tenure-container">
        <div className="title-container">
          <label htmlFor="tenure" className="label">
            Loan tenure
          </label>
          <div
            className={`value-container ${
              tenureError.includes("error") ? "error" : ""
            }`}
          >
            <Tooltip
              open={tenureError.includes("error")}
              title="
              The selected rate of interest on the loan is above than the market standards. Doing such may have the following risks
              such as Interest Rate Burden, Extended Debt Obligation, Total Interest Paid, Opportunity Cost, Life Changes, Prepayment Penalties.
              "
              placement="right"
              style={{ background: primaryColor }}
            >
              <input
                type="number"
                className={tenureError}
                style={{
                  width: "100px",
                  textAlign: "right",
                  borderBottom: "2px solid #007BA7",
                }}
                value={tenure}
                onChange={handleTenureChange}
              />
            </Tooltip>
            <span>Yr</span>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div
            style={{ fontSize: "15px", color: "#dcdcdc", marginRight: "30px" }}
          >
            1
          </div>
          <input
            name="tenure"
            id="tenure"
            type="range"
            step="1"
            className="input"
            max="40"
            min="1"
            value={tenure}
            onChange={handleTenureChange}
          />
          <div
            style={{ fontSize: "15px", color: "#dcdcdc", marginLeft: "20px" }}
          >
            40
          </div>
        </div>
      </div>

      <div className="result-container">
        <div className="values">
          <span style={{ fontWeight: "600", color: primaryColor }}>Monthly EMI</span>
          <span style={{color: secondaryColor}}>₹ {monthlyEMI.toLocaleString("en-IN")}</span>
        </div>

        <div className="values">
          <span style={{ fontWeight: "600", color: primaryColor }}>Principal amount</span>
          <span style={{color: secondaryColor}}>
            ₹ {totalLoanAmount ? totalLoanAmount.toLocaleString("en-IN") : 0}
          </span>
        </div>

        <div className="values">
          <span style={{ fontWeight: "600", color: primaryColor }}>Total interest</span>
          <span style={{color: secondaryColor}}>₹ {totalInterest.toLocaleString("en-IN")}</span>
        </div>

        <div className="values">
          <span style={{ fontWeight: "600", color: primaryColor }}>Total amount</span>
          <span style={{color: secondaryColor}}>₹ {totalAmount.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
