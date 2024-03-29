import { Box, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  extraLPrimaryColor,
  lightPrimaryColor,
  primaryColor,
  smText,
} from "../Theme";
import { giveEMI, toggleTenure } from "./calculate-emi";

const InputCalculator:React.FC<any> = ({
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
    // console.log(totalInt)
    sendData(
      inAmount,
      inTenure / tenureConvHelper,
      inInterest,
      Math.floor(emi),
      Math.ceil(totalInt)
    );
  };

  const toggleTenureType = (tType:string) => {
    // if (tenureType === tType) {
    //   return;
    // }
    // setTenureType(tType);
    // let tempTenure;
    // if (tType === "Years") {
    //   tempTenure = inTenure / 12;
    // } else {
    //   tempTenure = inTenure * 12;
    // }
    // // console.log(tempTenure)
    // setInTenure(tempTenure);

    if (tenureType === tType) {
      return;
    }
    // console.log(toggleTenure(tType, tenure))
    if (tType === "Years") {
      setInTenure(+toggleTenure(tType, inTenure));
    } else {
      setInTenure(+toggleTenure(tType, inTenure));
    }
    setTenureType(tType);
  };

  useEffect(() => {
    // calculateEMI();
    const details = giveEMI(inAmount, inInterest, inTenure, tenureType);
    let totalAmt = details?.emi * details?.tenureInMonths;
    let totalInt = totalAmt - totalLoanAmount;

    sendData(
      inAmount,
      tenureType === "Years" ? inTenure : inTenure / 12,
      inInterest,
      details?.emi || 0,
      totalInt
    );
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
            if (parseInt(e.target.value) > 100000000000) {
              return;
            }
            setInAmount(e.target.value);
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
            if (parseFloat(e.target.value) > 40) {
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
            onChange={(e) => {
              if (tenureType === "Years" && parseFloat(e.target.value) > 40) {
                return;
              }
              if (tenureType === "Months" && parseInt(e.target.value) > 480) {
                return;
              }
              setInTenure(e.target.value);
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
            <div>
              <TextField
                select
                label="Select"
                defaultValue="₹"
                helperText=""
                onChange={(e) => toggleTenureType(e.target.value)}
                value={tenureType}
              >
                <MenuItem value={"Years"}>Yr</MenuItem>
                <MenuItem value={"Months"}>Mo</MenuItem>
              </TextField>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InputCalculator;
