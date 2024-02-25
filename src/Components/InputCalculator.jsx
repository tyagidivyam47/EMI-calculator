import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { primaryColor } from "../Theme";

const InputCalculator = ({
  amountLabel,
  rateOfInterest,
  tenure,
  totalLoanAmount,
  sendData,
  disableAmount,
}) => {
  // console.log(totalLoanAmount)
  const [inInterest, setInInterest] = useState(rateOfInterest);
  const [inTenure, setInTenure] = useState(tenure);
  const [inAmount, setInAmount] = useState(totalLoanAmount);

  const calculateEMI = () => {
    if (!Number(inInterest) || !Number(inTenure) || !Number(inAmount)) {
      return;
    }
    let interest = inInterest / 12 / 100;
    let tenureInMonths = inTenure * 12;

    // Sample: 1000000*0.006*(1+0.006)**120 / ((1+0.006) ** 120 -1)
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

  useEffect(() => {
    calculateEMI();
  }, [inInterest, inTenure, inAmount]);

  useEffect(()=>{
    setInAmount(+totalLoanAmount)
  },[totalLoanAmount])

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
          onChange={(e) => setInAmount(e.target.value)}
          value={inAmount}
          type="number"
          label="In ₹"
          disabled={disableAmount}
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
          Interest Rate
        </div>
        <TextField
          onChange={(e) => setInInterest(e.target.value)}
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
        <TextField
        onChange={(e)=>setInTenure(e.target.value)}
          value={inTenure}
          type="number"
          label="In Years"
          sx={{ background: "#FFFFFF" }}
        />
      </Box>
    </Box>
  );
};

export default InputCalculator;
