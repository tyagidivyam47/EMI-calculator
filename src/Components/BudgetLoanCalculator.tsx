import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  extraLPrimaryColor,
  labelFont,
  lightPrimaryColor,
  lightSecondaryColor,
  primaryColor,
  secondaryColor,
  smText,
} from "../Theme";
// import { Input } from "postcss";
import InfoIcon from "@mui/icons-material/Info";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import { giveEMI, toggleTenure } from "./calculate-emi";
import { IRootState } from "../store";

const BudgetLoanCalculator: React.FC<any> = ({ sendData }) => {
  const currency = useSelector((state: IRootState) => state.currency.currency);

  const [budget, setBudget] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [interest, setInterest] = useState(0);
  const [tenureType, setTenureType] = useState("Years");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (isNaN(value) || value < 0) {
      return;
    }
    // console.log(value)
    // if (name === 'tenure' && e.target.value / 10 < 1) {
    //  setTenure(null)
    //  return;
    //   }

    if (name === "budget" && value > 9999999999) {
      return;
    }
    if (name === "budget") {
      setBudget(+value);
      return;
    }
    if (name === "tenure") {
      if (value > 50 && tenureType === "Years") {
        return;
      }
      if (value > 600 && tenureType === "Months") {
        return;
      }
      if (tenureType === "Months" && !Number.isInteger(+value)) {
        return;
      }
      setTenure(+value);
      return;
    }
    if (name === "interest" && value > 99) {
      return;
    }
    if (name === "interest") {
      setInterest(+value);
    }
  };

  const handleSliderChange = (event: any, newValue: any) => {
    setTenure(newValue);
  };

  // const calculateEMI = (
  //   budget,
  //   totalTenure,
  //   totalLoanAmount,
  //   rateOfInterest
  // ) => {
  //   if (!Number(totalTenure) || !Number(totalLoanAmount)) {
  //     // console.log("heree");
  //     return;
  //   }
  //   let tenureConvHelper = tenureType === "Years" ? 1 : 12;

  //   let interest = rateOfInterest / 12 / 100;
  //   let tenureInMonths = Math.ceil((totalTenure * 12) / tenureConvHelper);
  //   let emi =
  //     (totalLoanAmount * interest * Math.pow(1 + interest, tenureInMonths)) /
  //     (Math.pow(1 + interest, tenureInMonths) - 1);
  //   // console.log(emi)
  //   let totalAmt = emi * tenureInMonths;
  //   // console.log(totalAmt)
  //   // let totalInt = totalAmt - totalLoanAmount;

  //   let totalInt = (emi * tenureInMonths) - totalLoanAmount;
  //   // console.log(totalInt)
  //   sendData(
  //     budget,
  //     Math.ceil(totalTenure),
  //     totalLoanAmount,
  //     rateOfInterest,
  //     Math.ceil(totalInt),
  //     tenureType
  //   );
  // };

  const toggleTenureType = (tType: string) => {
    if (tenureType === tType) {
      return;
    }
    if (tType === "Years") {
      setTenure(+toggleTenure(tType, tenure));
    } else {
      setTenure(+toggleTenure(tType, tenure));
    }
    setTenureType(tType);
    // let tempTenure;
    // if (tType === "Years") {
    //   tempTenure = Math.ceil(tenure / 12);
    // } else {
    //   tempTenure = Math.ceil(tenure * 12);
    // }
    // setTenure(tempTenure);
  };

  useEffect(() => {
    if (budget < 1 || tenure < 1) {
      return;
    }
    // console.log(tenure.toString().includes("."))
    if (tenure.toString().includes(".")) {
      // console.log("tenure : ", tenure)
      const tenureArr = tenure.toString().split(".");
      const yr = +tenureArr[0];
      const month = +tenureArr[1];
      const totalAmount_1 = budget * 12 * yr + budget * month;
      // sendData(budget, tenure, totalAmount_1);
      // calculateEMI(budget, tenure, totalAmount_1, interest);
      const details = giveEMI(totalAmount_1, interest, tenure, tenureType);
      let totalInt = (
        details?.emi * details?.tenureInMonths -
        totalAmount_1
      ).toFixed(2);
      sendData(budget, tenure, totalAmount_1, interest, totalInt);
      return;
    }
    const totalAmount =
      tenureType === "Years" ? budget * 12 * tenure : budget * tenure;
    const details = giveEMI(totalAmount, interest, tenure, tenureType);
    let totalInt = (
      details?.emi * details?.tenureInMonths -
      totalAmount
    ).toFixed(2);
    sendData(budget, tenure, totalAmount, interest, totalInt);
    // calculateEMI(budget, tenure, totalAmount, interest);
    // sendData(budget, tenure, totalAmount);
  }, [budget, tenure, interest]);

  // console.log(tenure);

  return (
    <Box>
      <Box sx={{ width: "350px" }}>
        <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
          <Box>
            <div
              style={{
                font: labelFont,
                marginBottom: "6px",
              }}
            >
              Enter your Monthly Budget
            </div>
            <TextField
              onChange={handleChange}
              value={budget}
              type="tel"
              name="budget"
              onFocus={(e) => e.target.select()}
              //   disabled={disableAmount}
              sx={{ background: "#FFFFFF", display: "flex" }}
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
            <Box display={"flex"} justifyContent={"space-between"}>
              <div
                style={{
                  font: labelFont,
                  marginBottom: "6px",
                }}
              >
                Loan Tenure
              </div>
              {/* <div style={{marginBottom:"5px"}}>
                <Select
                  defaultValue="Years"
                  onChange={(e) => toggleTenureType(e.target.value)}
                  value={tenureType}
                  sx={{ height: "20px", fontSize: "15px" }}
                >
                  <MenuItem value={"Years"}>Yr</MenuItem>
                  <MenuItem value={"Months"}>Mo</MenuItem>
                </Select>
              </div> */}
            </Box>
            <Box
            // display={"flex"}
            // flexDirection={"column"}
            // width={"100%"}
            // alignItems={"center"}
            >
              <Box display={"flex"}>
                <TextField
                  onChange={handleChange}
                  value={tenure}
                  name="tenure"
                  type="number"
                  onFocus={(e) => e.target.select()}
                  sx={{
                    background: "#FFFFFF",
                    display: "flex",
                    minWidth: "350px",
                  }}
                  inputProps={{ step: "any" }}
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
                            color: primaryColor,
                          }}
                        >
                          <Select
                            defaultValue="Years"
                            onChange={(e) => toggleTenureType(e.target.value)}
                            value={tenureType}
                            label={null}
                            sx={{
                              height: "41px",
                              width: "41px",
                              color: primaryColor,
                              bgcolor: "transparent",
                              marginLeft: "-8px",
                              fontSize: `${
                                tenureType === "Years" ? "16px" : "14px"
                              }`,
                              boxShadow: "none",
                              ".MuiOutlinedInput-notchedOutline": { border: 0 },
                              "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                { border: 0 },
                              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                { border: 0 },
                            }}
                            IconComponent={() => (
                              <ArrowDropDownIcon
                                sx={{ position: "relative", left: "-18px" }}
                              />
                            )}
                          >
                            <MenuItem value={"Years"}>Yr</MenuItem>
                            <MenuItem value={"Months"}>Mo</MenuItem>
                          </Select>
                        </div>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Slider
                min={0}
                max={tenureType === "Years" ? 50 : 600}
                value={typeof tenure === "number" ? tenure : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                marks={
                  tenureType === "Years"
                    ? [
                        { value: 0, label: "0" },
                        { value: 50, label: "50" },
                      ]
                    : [
                        { value: 0, label: "0" },
                        { value: 600, label: "600" },
                      ]
                }
              />
            </Box>

            <Box>
              <div
                style={{
                  font: labelFont,
                  marginBottom: "6px",
                }}
              >
                Enter the Interest Rate
              </div>
              <TextField
                helperText={""}
                onChange={handleChange}
                value={interest}
                type="tel"
                label="In %"
                name="interest"
                onFocus={(e) => e.target.select()}
                //   disabled={disableAmount}
                sx={{ background: "#FFFFFF", display: "flex" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetLoanCalculator;
