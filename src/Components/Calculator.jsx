import { Box, MenuItem, TextField, Tooltip } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { primaryColor, secondaryColor } from "../Theme";
import { useSelector } from "react-redux";
import { giveEMI, toggleTenure } from "./calculate-emi";

const Calculator = ({
  inputLoanAmount,
  inputTenure,
  inputInterest,
  onChange,
  amountUl,
  interestUl,
  tenureUl,
  loanCharges,
}) => {
  const currency = useSelector((state)=> state.currency.currency);

  const [totalLoanAmount, setTotalLoanAmount] = useState(inputLoanAmount);
  const [tenure, setTenure] = useState(inputTenure);
  const [rateOfInterest, setRateOfInterest] = useState(inputInterest);
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalLoanError, setTotalLoanError] = useState("input");
  const [tenureError, setTenureError] = useState("input");
  const [rateOfInterestError, setRateOfInterestError] = useState("input");
  const [tenureType, setTenureType] = useState("Years");

  const [cookies, setCookie, removeCookie] = useCookies([
    "auth_token",
    "user_id",
  ]);

  const navigate = useNavigate();

  // console.log("Inside Calculator")

  const toggleTenureType = (tType) => {
    // if (tenureType === tType) {
    //   return;
    // }
    // setTenureType(tType);
    // let tempTenure;
    // if (tType === "Years") {
    //   tempTenure = tenure / 12;
    // } else {
    //   tempTenure = tenure * 12;
    // }
    // setTenure(Math.ceil(tempTenure));

    if (tenureType === tType) {
      return;
    }
    if(tType === "Years"){
      setTenure(+toggleTenure(tType, tenure));
    }
    else{
      setTenure(+toggleTenure(tType, tenure));
    }
    setTenureType(tType);
  };

  // console.log(tenure)

  const calculateEMI = () => {
    // console.log("second")
    if (
      !Number(rateOfInterest) ||
      !Number(tenure) ||
      !Number(totalLoanAmount)
    ) {
      return;
    }
    let tenureConvHelper = tenureType === "Years" ? 1 : 12;

    let interest = rateOfInterest / 12 / 100;
    let tenureInMonths = (tenure * 12) / tenureConvHelper;

    // Sample: 1000000*0.006*(1+0.006)**120 / ((1+0.006) ** 120 -1)
    let emi =
      (totalLoanAmount * interest * Math.pow(1 + interest, tenureInMonths)) /
      (Math.pow(1 + interest, tenureInMonths) - 1);

    let totalAmt = emi * tenureInMonths;
    let totalInt = totalAmt - totalLoanAmount;
    if (loanCharges && loanCharges > 0) {
      const chargesNum = parseInt(loanCharges, 10);
      const totalAmountNum = parseInt(totalAmt, 10);
      totalAmt = totalAmountNum + chargesNum;
    }
    onChange(
      totalLoanAmount,
      tenureType === "Years" ? tenure : tenure/12,
      rateOfInterest,
      Math.floor(emi),
      Math.ceil(totalInt)
    );

    setMonthlyEMI(Math.floor(emi));
    setTotalAmount(Math.ceil(totalAmt));
    setTotalInterest(Math.ceil(totalInt));
  };

  useEffect(() => {
    const details = giveEMI(totalLoanAmount, rateOfInterest, tenure, tenureType);
    let totalAmt = details?.emi * details?.tenureInMonths;
    let totalInt = totalAmt - totalLoanAmount;

    onChange(
      totalLoanAmount,
      tenureType === "Years" ? tenure : tenure/12,
      rateOfInterest,
      (details?.emi),
      (totalInt)
    );

    setMonthlyEMI((details?.emi) || 0);
    setTotalAmount((totalAmt || 0));
    setTotalInterest((totalInt || 0));
    // calculateEMI();
  }, [tenure, rateOfInterest, totalLoanAmount]);

  const handleTotalLoanChange = (e) => {
    // if(e.target.value < 0){
    //   return;
    // }
    if(e.target.value > 9999999999){
      return;
    }
    if (
      e.target.value.length < 6 ||
      e.target.value.length > 8 
    ) {
      // setTotalLoanError("input error");
    } else {
      setTotalLoanError("input");
    }
    setTotalLoanAmount(parseInt(e.target.value));
  };

  const handleTenureChange = (e) => {
    if(tenureType === "Years" && e.target.value > 40){
      return;
    }
    if(tenureType === "Months" && e.target.value > 480){
      return;
    }
    
    if (
      e.target.value > 40 ||
      e.target.value < 1 ||
      e.target.value > tenureUl
      ) {
      // setTenureError("input error");
    } else {
      setTenureError("input");
    }

    setTenure((e.target.value));
  };

  const handleRateOfInterestChange = (e) => {
    if(e.target.value > 45){
      return;
    }
    if (
      e.target.value > 45 ||
      e.target.value < 1 ||
      e.target.value > interestUl
    ) {
      // setRateOfInterestError("input error");
    } else {
      setRateOfInterestError("input");
    }
    // console.log(parseFloat(e.target.value).toFixed(2))
    setRateOfInterest(parseFloat(e.target.value).toFixed(2));
  };

  useEffect(() => {
    const isLoggedIn = true;
    if (isLoggedIn) {
      // console.log("logged in");
    } else {
      navigate("/login");
    }
  }, [cookies]);

  useEffect(() => {
    // console.log("first")
    setTotalLoanAmount(inputLoanAmount);
  }, [inputLoanAmount]);

  // console.log(inputLoanAmount);
  return (
    <div>
      <div className="loan-container">
        <div className="title-container">
          <label htmlFor="loan-amount" className="label">
            Loan amount
          </label>
          <div
            className={`value-container ${totalLoanError.includes("error") ? "error" : ""
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
                onFocus={(e) => e.target.select()}
              />
            </Tooltip>
            <span>{currency}</span>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              fontSize: "15px",
              color: secondaryColor,
              marginRight: "30px",
            }}
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
            style={{
              fontSize: "15px",
              color: secondaryColor,
              marginLeft: "5px",
            }}
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
            className={`value-container ${rateOfInterestError.includes("error") ? "error" : ""
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
                onFocus={(e) => e.target.select()}
              />
            </Tooltip>
            <span
              className={`${rateOfInterestError.includes("error") ? "error" : ""
                }`}
            >
              %
            </span>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              fontSize: "15px",
              color: secondaryColor,
              marginRight: "30px",
            }}
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
            style={{
              fontSize: "15px",
              color: secondaryColor,
              marginLeft: "20px",
            }}
          >
            45
          </div>
        </div>
      </div>

      <div className="tenure-container">
        <div className="title-container">
          <label htmlFor="tenure" className="label">
            Loan tenure <span style={{}}>in</span>
          </label>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            // sx={{height:"10px"}} 
            marginLeft={"-130px"}
            marginTop={'-5px'}
          >
            <div>
              <TextField
                select
                // label="Select"
                defaultValue="Years"
                helperText=""
                onChange={(e) => toggleTenureType(e.target.value)}
                value={tenureType}
                variant="standard"
              >
                <MenuItem value={"Years"}>
                  Yr
                </MenuItem>
                <MenuItem value={"Months"}>
                  Mo
                </MenuItem>
              </TextField>
            </div>
          </Box>
          <div
            className={`value-container ${tenureError.includes("error") ? "error" : ""
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
                  width: "70px",
                  textAlign: "right",
                  borderBottom: "2px solid #007BA7",
                }}
                step={0.1}
                value={tenure}
                onChange={handleTenureChange}
                onFocus={(e) => e.target.select()}
              />
            </Tooltip>
            <span>
              {tenureType}
            </span>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div
            style={{
              fontSize: "15px",
              color: secondaryColor,
              marginRight: "30px",
            }}
          >
            1
          </div>
          <input
            name="tenure"
            id="tenure"
            type="range"
            step="1"
            className="input"
            max={tenureType === "Years" ? 40 : 480}
            min="1"
            value={tenure}
            onChange={handleTenureChange}
          />
          <div
            style={{
              fontSize: "15px",
              color: secondaryColor,
              marginLeft: "20px",
            }}
          >
            {tenureType === "Years" ? 40 : 480}
          </div>
        </div>
      </div>

      <div className="result-container">
        <div className="values">
          <span style={{ fontWeight: "600", color: primaryColor }}>
            Monthly EMI
          </span>
          <span style={{ color: secondaryColor }}>
            {currency} {monthlyEMI?.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="values">
          <span style={{ fontWeight: "600", color: primaryColor }}>
            Principal amount
          </span>
          <span style={{ color: secondaryColor }}>
            {currency} {totalLoanAmount ? totalLoanAmount.toLocaleString("en-IN") : 0}
          </span>
        </div>

        <div className="values">
          <span style={{ fontWeight: "600", color: primaryColor }}>
            Total interest
          </span>
          <span style={{ color: secondaryColor }}>
            {currency} {totalInterest?.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="values">
          <span style={{ fontWeight: "600", color: primaryColor }}>
            Total amount
          </span>
          <span style={{ color: secondaryColor }}>
            {currency} {totalAmount?.toLocaleString("en-IN") || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
