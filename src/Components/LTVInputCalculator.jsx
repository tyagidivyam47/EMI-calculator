import {
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
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";

const salRes = 75;
const empRes = 70;
const salCom = 70;
const empCom = 65;

const LTVInputCalculator = ({ sendData }) => {
  const currency = useSelector((state)=> state.currency.currency);

  // console.log(totalLoanAmount)
  const [inInterest, setInInterest] = useState(0);
  const [inTenure, setInTenure] = useState(0);
  const [inAmount, setInAmount] = useState();
  const [empType, setEmpType] = useState("salaried");
  const [propValue, setPropValue] = useState(0);
  const [propType, setPropType] = useState("residential");
  const [ltvRatio, setLtvRatio] = useState(75);
  const [ltvActive, setLtvActive] = useState(false);
  const [tenureType, setTenureType] = useState("Years");
  const [extraProperties, setExtraProperties] = useState([]);
  const [allPropValue, setAllPropValue] = useState(0);

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

  // console.log(extraProperties)

  useEffect(() => {
    let extraTotal = 0;
    for (let i = 0; i < extraProperties.length; i++) {
      extraTotal += +extraProperties[i].value;
    }
    const totalPropValue = +propValue + +extraTotal;
    const tempAmount = (ltvRatio / 100) * totalPropValue;
    setAllPropValue(totalPropValue);
    setInAmount(tempAmount);
  }, [inInterest, inTenure, propValue, ltvRatio, extraProperties]);

  useEffect(() => {
    if (!inAmount) {
      return;
    }
    calculateEMI();
  }, [inAmount, inInterest, inTenure]);

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
              Property Value
            </div>
            <TextField
              onChange={(e) => {
                if (e.target.value > 100000000000) {
                  return;
                }
                handleChange(e);
              }}
              onFocus={(e) => e.target.select()}
              value={propValue}
              type="number"
              label={`In ${currency}`}
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
                    <MenuItem value={"Years"}>
                      Yr
                    </MenuItem>
                    <MenuItem value={"Months"}>
                      Mo
                    </MenuItem>
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
                control={<Radio disabled={ltvActive} />}
                label="Salaried"
              />
              <FormControlLabel
                value="selfEmployed"
                control={<Radio disabled={ltvActive} />}
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
                control={<Radio disabled={ltvActive} />}
                label="Residential Property"
              />
              <FormControlLabel
                value="commercial"
                control={<Radio disabled={ltvActive} />}
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
      <Box>
        {extraProperties?.map((prop, index) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop:"10px"
            }}
          >
            <div
              style={{
                fontWeight: "600",
                color: primaryColor,
                paddingBottom: "6px",
              }}
            >
              Property Value
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
                type="number"
                label={`In ${currency}`}
                sx={{ background: "#FFFFFF" }}
                onFocus={(e) => e.target.select()}
                // disabled={!ltvActive}
                onChange={(e) => extraPropChangeHandler(index, e.target.value)}
              />
              <div onClick={() => {
                let tempProperty = [...extraProperties];
                tempProperty.splice(index, 1);
                setExtraProperties(tempProperty);
              }}>
                <RemoveIcon sx={{ background: primaryColor, color: "#FFFFFF" }} />
              </div>
            </div>
          </div>
        ))}
      </Box>
      <Button
        onClick={propertyAddHandler}
        variant="contained"
        sx={{ display: "flex", marginX: "auto", marginTop: "20px" }}
      >
        <AddIcon />
        Add Another Property Value
      </Button>
    </Box>
  );
};

export default LTVInputCalculator;
