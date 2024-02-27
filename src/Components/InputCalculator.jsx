import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  extraLPrimaryColor,
  lightPrimaryColor,
  primaryColor,
  smText,
} from "../Theme";

const InputCalculator = ({
  amountLabel,
  rateOfInterest,
  tenure,
  totalLoanAmount,
  sendData,
  disableAmount,
  currency,
}) => {
  // console.log(totalLoanAmount)
  const [inInterest, setInInterest] = useState(rateOfInterest);
  const [inTenure, setInTenure] = useState(tenure);
  const [inAmount, setInAmount] = useState(totalLoanAmount);
  const [tenureType, setTenureType] = useState("Years");

  const calculateEMI = () => {
    if (!Number(inInterest) || !Number(inTenure) || !Number(inAmount)) {
      return;
    }
    let tenureConvHelper = tenureType === "Years" ? 1 : 12;

    let interest = inInterest / 12 / 100;
    let tenureInMonths = (inTenure * 12) / tenureConvHelper;

    let emi =
      (inAmount * interest * Math.pow(1 + interest, tenureInMonths)) /
      (Math.pow(1 + interest, tenureInMonths) - 1);

    let totalAmt = emi * tenureInMonths;
    let totalInt = totalAmt - inAmount;
    sendData(
      inAmount,
      inTenure,
      inInterest,
      Math.floor(emi),
      Math.ceil(totalInt)
    );
  };

  const toggleTenureType = (tType) => {
    if (tenureType === tType) {
      return;
    }
    setTenureType(tType);
    let tempTenure;
    if (tType === "Years") {
      tempTenure = inTenure / 12;
    } else {
      tempTenure = inTenure * 12;
    }
    setInTenure(tempTenure);
  };

  useEffect(() => {
    calculateEMI();
  }, [inInterest, inTenure, inAmount]);

  useEffect(() => {
    setInAmount(+totalLoanAmount);
  }, [totalLoanAmount]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
      <Box>
        <div
          style={{
            fontWeight: "600",
            color: primaryColor,
            paddingBottom: "6px",
          }}
        >
          {amountLabel || "Loan Amount"}
        </div>
        <TextField
          onChange={(e) => {
            if(e.target.value > 100000000000){
              return;
            }
            setInAmount(e.target.value)
          }}
          value={inAmount}
          type="number"
          label={`In ${currency}`}
          disabled={disableAmount}
          sx={{ background: "#FFFFFF" }}
          onFocus={(e) => e.target.select()}
        />
      </Box>
      <Box>
        <div
          style={{
            fontWeight: "600",
            color: primaryColor,
            paddingBottom: "6px",
          }}
        >
          Interest Rate
        </div>
        <TextField
          onChange={(e) => {
            if (e.target.value > 40) {
              return;
            }
            setInInterest(e.target.value);
          }}
          onFocus={(e) => e.target.select()}
          value={inInterest}
          type="number"
          label="In %"
          sx={{ background: "#FFFFFF" }}
        />
      </Box>
      <Box>
        <div
          style={{
            fontWeight: "600",
            color: primaryColor,
            paddingBottom: "6px",
          }}
        >
          Loan Tenure
        </div>
        <Box display={"flex"}>
          <TextField
            onChange={(e) =>{
              if(tenureType === "Years" && e.target.value > 40){
                return;
              }
              if(tenureType === "Months" && e.target.value > 480){
                return;
              }
              setInTenure(e.target.value)
              }}
            value={inTenure}
            type="number"
            label={`in ${tenureType}`}
            sx={{ background: "#FFFFFF" }}
            onFocus={(e) => e.target.select()}
          />
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            marginLeft={"8px"}
          >
            <div
              onClick={() => toggleTenureType("Years")}
              style={{
                font: smText,
                background:
                  tenureType === "Years" ? primaryColor : extraLPrimaryColor,
                color: lightPrimaryColor,
                height: "25px",
                border: "1px solid #007BA7",
                width: "34px",
                textAlign: "center",
                cursor: "pointer",
                paddingTop: "3px",
              }}
            >
              Yrs
            </div>
            <div
              onClick={() => toggleTenureType("Months")}
              style={{
                font: smText,
                background:
                  tenureType === "Months" ? primaryColor : extraLPrimaryColor,
                color: lightPrimaryColor,
                height: "25px",
                border: "1px solid #007BA7",
                width: "34px",
                textAlign: "center",
                cursor: "pointer",
                paddingTop: "3px",
              }}
            >
              Mon
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InputCalculator;
