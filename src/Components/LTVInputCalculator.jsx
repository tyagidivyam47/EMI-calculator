import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  extraLPrimaryColor,
  lightPrimaryColor,
  primaryColor,
  smText,
} from "../Theme";
import { CheckBox } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from '@mui/icons-material/Cancel';
import CloseIcon from "@mui/icons-material/Close";
// import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import { giveEMI, toggleTenure } from "./calculate-emi";

const salRes = 75;
const empRes = 70;
const salCom = 70;
const empCom = 65;

const LTVInputCalculator = ({ sendData }) => {
  const currency = useSelector((state) => state.currency.currency);

  // console.log(totalLoanAmount)
  const [inInterest, setInInterest] = useState(0);
  const [inTenure, setInTenure] = useState(0);
  const [inAmount, setInAmount] = useState();
  const [empType, setEmpType] = useState("salaried");
  const [propType, setPropType] = useState("residential");
  const [ltvRatio, setLtvRatio] = useState(75);
  const [ltvActive, setLtvActive] = useState(false);
  const [tenureType, setTenureType] = useState("Years");
  const [errorMsg, setErrorMsg] = useState();
  const [unfilled, setUnfilled] = useState(false);
  const [extraProperties, setExtraProperties] = useState([
    {
      value: 0,
    },
  ]);
  const [totalMortgage, setTotalMortgage] = useState(0);
  const [allPropValue, setAllPropValue] = useState(0);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);
  const [eligible, setEligible] = useState(false);

  const calculateEMI = () => {
    if (!Number(inInterest) || !Number(inTenure) || !Number(inAmount)) {
      // console.log("reject")
      return;
    }
    let tenureConvHelper = tenureType === "Years" ? 1 : 12;

    // console.log("allowed")
    let interest = inInterest / 12 / 100;
    let tenureInMonths = (inTenure * 12) / tenureConvHelper;

    let emi =
      (inAmount * interest * Math.pow(1 + interest, tenureInMonths)) /
      (Math.pow(1 + interest, tenureInMonths) - 1);

    let totalAmt = emi * tenureInMonths;
    let totalInt = totalAmt - inAmount;
    // console.log(emi, " : ", totalInt, " : ", inAmount)
    sendData(
      Math.floor(emi),
      Math.ceil(totalInt),
      inAmount,
      allPropValue
      // inTenure,
      // inInterest,
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "inAmount" && value > 99999999999) {
      return;
    }
    if (name === "inAmount") {
      setInAmount(value);
    }
    if (name === "inInterest") {
      setInInterest(value);
    }
    if (name === "inTenure") {
      setInTenure(value);
    }
  };

  const toggleTenureType = (tType) => {
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
    // setInTenure(tempTenure);

    if (tenureType === tType) {
      return;
    }
    if (tType === "Years") {
      setInTenure(+toggleTenure(tType, inTenure));
    } else {
      setInTenure(+toggleTenure(tType, inTenure));
    }
    setTenureType(tType);
  };

  const propertyAddHandler = () => {
    let tempProperty = [...extraProperties];
    tempProperty.push({ value: 0 });
    setExtraProperties(tempProperty);
  };

  const extraPropChangeHandler = (index, value) => {
    let tempProperty = [...extraProperties];
    tempProperty[index].value = +value;
    setExtraProperties(tempProperty);
  };

  const submitClickHandler = () => {
    if (!inAmount || inAmount < 1) {
      setUnfilled(true);
      setErrorMsg("Enter Amount correctly");
      return;
    }
    if (!inInterest || inInterest < 1) {
      setUnfilled(true);
      setErrorMsg("Enter Interest correctly");
      return;
    }
    if (!inTenure || inTenure < 1) {
      setUnfilled(true);
      setErrorMsg("Enter Tenure correctly");
      return;
    }
    if (extraProperties.length < 1) {
      setUnfilled(true);
      setErrorMsg("Add a Mortgage to continue");
      return;
    }
    for (let i = 0; i < extraProperties.length; i++) {
      if (extraProperties[i].value < 0) {
        setUnfilled(true);
        setErrorMsg("Mortgage can not be negative.");
        return;
      }
    }
    const details = giveEMI(inAmount, inInterest, inTenure, tenureType);
    // let totalAmt = details?.emi * details?.tenureInMonths;
    let totalAmt = details?.totalAmt;
    let totalMortgageAmount = 0;
    for (let i = 0; i < extraProperties.length; i++) {
      totalMortgageAmount += extraProperties[i].value;
    }
    if (totalAmt < totalMortgageAmount) {
      setEligible(true);
    } else {
      setEligible(false);
    }
    setTotalMortgage(totalMortgageAmount);
    setTotalLoanAmount(totalAmt);

    sendData(
      details?.emi || 0,
      details?.totalInt || 0,
      inAmount || 0,
      totalAmt || 0,
      totalMortgageAmount,
      totalAmt < totalMortgageAmount
    );
  };

  // console.log(extraProperties)

  // useEffect(() => {
  //   let extraTotal = 0;
  //   for (let i = 0; i < extraProperties.length; i++) {
  //     extraTotal += +extraProperties[i].value;
  //   }
  //   const totalPropValue = +propValue + +extraTotal;
  //   const tempAmount = (ltvRatio / 100) * totalPropValue;
  //   setAllPropValue(totalPropValue);
  //   setInAmount(tempAmount);
  // }, [inInterest, inTenure, propValue, ltvRatio, extraProperties]);

  // useEffect(() => {
  //   if (!inAmount) {
  //     return;
  //   }
  //   calculateEMI();
  // }, [inAmount, inInterest, inTenure]);
  useEffect(() => {
    setTimeout(() => {
      setUnfilled(false);
    }, [4000]);
  }, [unfilled]);

  return (
    <Box>
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
              Loan Amount
            </div>
            <TextField
              onChange={(e) => {
                if (e.target.value > 100000000000) {
                  return;
                }
                handleChange(e);
              }}
              onFocus={(e) => e.target.select()}
              value={inAmount}
              type="number"
              label={`In ${currency}`}
              name="inAmount"
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
              onChange={(e) => {
                if (e.target.value > 40) {
                  return;
                }
                handleChange(e);
              }}
              onFocus={(e) => e.target.select()}
              value={inInterest}
              name="inInterest"
              type="number"
              label="In %"
              sx={{ background: "#FFFFFF" }}
            />
          </Box>
          <Box display={""}>
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
                  if (e.target.value > 40 && tenureType === "Years") {
                    return;
                  }
                  if (e.target.value > 480 && tenureType === "Months") {
                    return;
                  }
                  handleChange(e);
                }}
                onFocus={(e) => e.target.select()}
                value={inTenure}
                name="inTenure"
                type="number"
                label={`In ${tenureType}`}
                sx={{ background: "#FFFFFF" }}
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
                    defaultValue="Years"
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

        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"10px"}
          paddingLeft={"15px"}
        >
          <div
            style={{ height: "250px", overflowY: "auto", paddingRight: "5px" }}
          >
            <div
              style={{
                fontWeight: "600",
                color: primaryColor,
                paddingBottom: "6px",
              }}
            >
              Mortgages
            </div>
            {extraProperties?.map((prop, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    display: "none",
                    fontWeight: "600",
                    color: primaryColor,
                    paddingBottom: "6px",
                  }}
                >
                  Mortgage Value
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                  }}
                >
                  <TextField
                    value={prop.value}
                    type="tel"
                    label={`Morgage ${index + 1}, In ${currency}`}
                    sx={{ background: "#FFFFFF" }}
                    onFocus={(e) => e.target.select()}
                    // disabled={!ltvActive}
                    onChange={(e) => {
                      if (isNaN(e.target.value)) {
                        return;
                      }
                      extraPropChangeHandler(index, e.target.value);
                    }}
                  />
                  {
                    <div
                      onClick={() => {
                        let tempProperty = [...extraProperties];
                        tempProperty.splice(index, 1);
                        setExtraProperties(tempProperty);
                      }}
                    >
                      <CloseIcon
                        sx={{
                          background: "darkred",
                          color: "#FFFFFF",
                          borderRadius: 100,
                        }}
                      />
                    </div>
                  }
                </div>
              </div>
            ))}
          </div>
          <div>
            <Button
              onClick={propertyAddHandler}
              variant="contained"
              sx={{ display: "flex", marginX: "auto", marginTop: "20px" }}
            >
              <AddIcon />
              Add Another Mortgage
            </Button>
          </div>
        </Box>
      </Box>

      <Box display={"flex"} marginTop={"12px"} marginLeft={"25px"}>
        <Button
          onClick={submitClickHandler}
          variant="contained"
          sx={{ marginX: "auto" }}
        >
          Submit
        </Button>
      </Box>
      {unfilled && (
        <div className="absolute bottom-3 right-5">
          <Alert variant="filled" severity="error">
            {errorMsg}
          </Alert>
        </div>
      )}
    </Box>
  );
};

export default LTVInputCalculator;
