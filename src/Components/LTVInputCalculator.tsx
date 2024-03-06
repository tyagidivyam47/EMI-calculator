import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  extraLPrimaryColor,
  labelFont,
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
import { IRootState } from "../store";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const salRes = 75;
const empRes = 70;
const salCom = 70;
const empCom = 65;

const LTVInputCalculator: React.FC<any> = ({ sendData }) => {
  const currency = useSelector((state: IRootState) => state.currency.currency);

  // console.log(totalLoanAmount)
  const [inInterest, setInInterest] = useState<any>(0);
  const [inTenure, setInTenure] = useState<any>(0);
  const [inAmount, setInAmount] = useState<any>(0);
  const [empType, setEmpType] = useState("salaried");
  const [propType, setPropType] = useState("residential");
  const [ltvRatio, setLtvRatio] = useState(75);
  const [ltvActive, setLtvActive] = useState(false);
  const [tenureType, setTenureType] = useState("Years");
  const [errorMsg, setErrorMsg] = useState<string>("");
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "inAmount" && parseInt(value) > 99999999999) {
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

  const toggleTenureType = (tType: string) => {
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

  const extraPropChangeHandler = (index: number, value: any) => {
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

  useEffect(() => {
    setTimeout(() => {
      setUnfilled(false);
    }, 4000);
  }, [unfilled]);

  return (
    <Box>
      <Box display={"flex"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"10px"}
          // borderRight={"2px solid #d3d3d3"}
          paddingRight={"15px"}
        >
          <div style={{ fontSize: "20px", fontWeight: "600" }}>
            Loan Against Property
          </div>
          <Box>
            <div
              style={{
                font: labelFont,
                marginBottom: "6px",
              }}
            >
              Loan Amount
            </div>
            <TextField
              onChange={(e) => {
                if (parseInt(e.target.value) > 100000000000) {
                  return;
                }
                handleChange(e);
              }}
              onFocus={(e) => e.target.select()}
              value={inAmount}
              type="number"
              name="inAmount"
              //   disabled={disableAmount}
              sx={{ background: "#FFFFFF" }}
              InputProps={{
                style: { height: "41px" },
                startAdornment: (
                  <InputAdornment position="start">
                    <div
                      style={{
                        background: "#e7edf6",
                        height: "41px",
                        width: "40px",
                        marginLeft: "-13px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: primaryColor,
                      }}
                    >
                      {currency}
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <div
              style={{
                font: labelFont,
                marginBottom: "6px",
              }}
            >
              Interest Rate
            </div>
            <TextField
              onChange={(e) => {
                if (parseFloat(e.target.value) > 40) {
                  return;
                }
                handleChange(e);
              }}
              onFocus={(e) => e.target.select()}
              value={inInterest}
              name="inInterest"
              type="number"
              sx={{ background: "#FFFFFF" }}
              InputProps={{
                style: { height: "41px" },
                startAdornment: (
                  <InputAdornment position="start">
                    <div
                      style={{
                        background: "#e7edf6",
                        height: "41px",
                        width: "40px",
                        marginLeft: "-13px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: primaryColor,
                      }}
                    >
                      %
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box display={""}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <div
                style={{
                  font: labelFont,
                  marginBottom: "6px",
                }}
              >
                Loan Tenure
              </div>
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
                  <MenuItem value={"Years"}>Yr</MenuItem>
                  <MenuItem value={"Months"}>Mo</MenuItem>
                </TextField>
              </div>
            </Box>
            <Box display={"flex"}>
              <TextField
                onChange={(e) => {
                  if (
                    parseFloat(e.target.value) > 40 &&
                    tenureType === "Years"
                  ) {
                    return;
                  }
                  if (
                    parseFloat(e.target.value) > 480 &&
                    tenureType === "Months"
                  ) {
                    return;
                  }
                  handleChange(e);
                }}
                onFocus={(e) => e.target.select()}
                value={inTenure}
                name="inTenure"
                type="number"
                sx={{ background: "#FFFFFF" }}
                InputProps={{
                  style: { height: "41px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <div
                        style={{
                          background: "#e7edf6",
                          height: "41px",
                          width: "40px",
                          marginLeft: "-13px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: primaryColor,
                        }}
                      >
                        {tenureType === "Years" ? "Yr" : "Mo"}
                      </div>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"10px"}
              marginTop={"10px"}
              // paddingLeft={"15px"}
            >
              <div
                style={{
                  height: "250px",
                  overflowY: "auto",
                  paddingRight: "5px",
                }}
              >
                <div
                  style={{
                    font: labelFont,
                    marginBottom: "6px",
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
                        label={
                          index === 0
                            ? "1st Mortgage"
                            : index === 1
                            ? "2nd Mortgage"
                            : index === 2
                            ? "3rd Mortgage"
                            : `${index + 1}th Mortgage`
                        }
                        // label={`Morgage ${index + 1}, In ${currency}`}
                        sx={{ background: "#FFFFFF" }}
                        onFocus={(e) => e.target.select()}
                        // disabled={!ltvActive}
                        onChange={(e) => {
                          if (isNaN(parseInt(e.target.value))) {
                            return;
                          }
                          extraPropChangeHandler(index, e.target.value);
                        }}
                        InputProps={{
                          style: { height: "41px" },
                          startAdornment: (
                            <InputAdornment position="start">
                              <div
                                style={{
                                  background: "#e7edf6",
                                  height: "41px",
                                  width: "40px",
                                  marginLeft: "-13px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  color: primaryColor,
                                }}
                              >
                                {currency}
                              </div>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <div style={{display:"flex", gap:"5px", justifyContent:"end", marginLeft:"auto"}}>
                      {index === extraProperties.length-1 &&
                        <div
                          onClick={propertyAddHandler}
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            marginLeft: "auto",
                            marginTop: "3px",
                          }}
                        >
                          <AddCircleIcon
                            sx={{
                              background: "#eaf7fc",
                              color: "#0292ce",
                              border: "1px solid #0292ce",
                              borderRadius: 100,
                              fontWeight: "600",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      }
                      {extraProperties.length > 1 &&
                        <div
                          onClick={() => {
                            let tempProperty = [...extraProperties];
                            tempProperty.splice(index, 1);
                            setExtraProperties(tempProperty);
                          }}
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            marginLeft: "auto",
                            marginTop: "3px",
                          }}
                        >
                          <CloseIcon
                            sx={{
                              background: "#ffe6e8",
                              color: "#ff9097",
                              border: "1px solid #ff9097",
                              borderRadius: 100,
                              fontWeight: "600",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      }
                    </div>
                  </div>
                ))}
              </div>
              {/* <div>
                <Button
                  onClick={propertyAddHandler}
                  variant="contained"
                  sx={{ display: "flex", marginX: "auto", marginTop: "20px" }}
                >
                  <AddIcon />
                  Add Another Mortgage
                </Button>
              </div> */}
            </Box>
          </Box>
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
