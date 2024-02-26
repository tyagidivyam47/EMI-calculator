import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { primaryColor } from "../Theme";
import { CheckBox } from "@mui/icons-material";

const salRes = 75;
const empRes = 70;
const salCom = 70;
const empCom = 65;

const LTVInputCalculator = ({ sendData }) => {
  // console.log(totalLoanAmount)
  const [inInterest, setInInterest] = useState(0);
  const [inTenure, setInTenure] = useState(0);
  const [inAmount, setInAmount] = useState();
  const [empType, setEmpType] = useState("salaried");
  const [propValue, setPropValue] = useState(0);
  const [propType, setPropType] = useState("residential");
  const [ltvRatio, setLtvRatio] = useState(75);
  const [ltvActive, setLtvActive] = useState(false);

  const calculateEMI = () => {
    if (!Number(inInterest) || !Number(inTenure) || !Number(inAmount)) {
      // console.log("reject")
      return;
    }
    // console.log("allowed")
    let interest = inInterest / 12 / 100;
    let tenureInMonths = inTenure * 12;

    // Sample: 1000000*0.006*(1+0.006)**120 / ((1+0.006) ** 120 -1)
    let emi =
      (inAmount * interest * Math.pow(1 + interest, tenureInMonths)) /
      (Math.pow(1 + interest, tenureInMonths) - 1);

    let totalAmt = emi * tenureInMonths;
    let totalInt = totalAmt - inAmount;
    // console.log(emi, " : ", totalInt, " : ", inAmount)
    sendData(
      Math.floor(emi),
      Math.ceil(totalInt),
      inAmount
      // inTenure,
      // inInterest,
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "propValue":
        setPropValue(value);
        break;
      case "inInterest":
        setInInterest(value);
        break;
      case "inTenure":
        setInTenure(value);
        break;
      case "empType":
        setEmpType(value);
        if (!ltvActive) {
          if (value === "salaried" && propType === "residential") {
            setLtvRatio(salRes);
          } else if (value === "selfEmployed" && propType === "residential") {
            setLtvRatio(empRes);
          } else if (value === "selfEmployed" && propType === "commercial") {
            setLtvRatio(empCom);
          } else if (value === "salaried" && propType === "commercial") {
            setLtvRatio(salCom);
          }
        }
        break;
      case "propType":
        setPropType(value);
        if (!ltvActive) {
          if (empType === "salaried" && value === "residential") {
            setLtvRatio(salRes);
          } else if (empType === "selfEmployed" && value === "residential") {
            setLtvRatio(empRes);
          } else if (empType === "selfEmployed" && value === "commercial") {
            setLtvRatio(empCom);
          } else if (empType === "salaried" && value === "commercial") {
            setLtvRatio(salCom);
          }
        }
        break;
    }
  };

  useEffect(() => {
    const tempAmount = (ltvRatio / 100) * propValue;
    setInAmount(tempAmount);
  }, [inInterest, inTenure, propValue, ltvRatio]);

  useEffect(() => {
    if (!inAmount) {
      return;
    }
    calculateEMI();
  }, [inAmount, inInterest, inTenure]);

  return (
    <Box display={"flex"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"10px"}
        borderRight={"2px solid #d3d3d3"}
        paddingRight={"15px"}
      >
        <Box>
          <div
            style={{
              fontWeight: "600",
              color: primaryColor,
              paddingBottom: "6px",
            }}
          >
            Property Value
          </div>
          <TextField
            onChange={handleChange}
            value={propValue}
            type="number"
            label="In ₹"
            name="propValue"
            //   disabled={disableAmount}
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
            onChange={handleChange}
            value={inInterest}
            name="inInterest"
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
            onChange={handleChange}
            value={inTenure}
            name="inTenure"
            type="number"
            label="In Years"
            sx={{ background: "#FFFFFF" }}
          />
        </Box>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"10px"}
        paddingLeft={"15px"}
      >
        <Box marginBottom={"14px"}>
          <div
            style={{
              fontWeight: "600",
              color: primaryColor,
              paddingBottom: "6px",
            }}
          >
            Employment Type
          </div>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="empType"
            onChange={handleChange}
            value={empType}
          >
            <FormControlLabel
              value="salaried"
              control={<Radio />}
              label="Salaried"
            />
            <FormControlLabel
              value="selfEmployed"
              control={<Radio />}
              label="Self-Employed"
            />
          </RadioGroup>
        </Box>

        <Box marginBottom={"14px"}>
          <div
            style={{
              fontWeight: "600",
              color: primaryColor,
              paddingBottom: "6px",
            }}
          >
            Property Type
          </div>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="propType"
            onChange={handleChange}
            value={propType}
          >
            <FormControlLabel
              value="residential"
              control={<Radio />}
              label="Residential Property"
            />
            <FormControlLabel
              value="commercial"
              control={<Radio />}
              label="Commercial Property"
            />
          </RadioGroup>
        </Box>

        <Box>
          <div
            style={{
              fontWeight: "600",
              color: primaryColor,
              paddingBottom: "6px",
            }}
          >
            LTV Ratio
          </div>
          <TextField
            // onChange={(e) => setInTenure(e.target.value)}
            value={ltvRatio}
            type="number"
            label="In %"
            sx={{ background: "#FFFFFF" }}
            disabled={!ltvActive}
            onChange={(e) => setLtvRatio(e.target.value)}
          />
          <FormControlLabel
            sx={{ marginLeft: "10px", marginTop: "5px" }}
            label="Custom LTV ratio"
            control={<Checkbox onChange={() => setLtvActive(!ltvActive)} />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LTVInputCalculator;
