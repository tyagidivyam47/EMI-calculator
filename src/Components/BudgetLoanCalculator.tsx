import {
  Box,
  Grid,
  MenuItem,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  extraLPrimaryColor,
  lightPrimaryColor,
  lightSecondaryColor,
  primaryColor,
  secondaryColor,
  smText,
} from "../Theme";
// import { Input } from "postcss";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector } from "react-redux";
import { giveEMI, toggleTenure } from "./calculate-emi";
import { IRootState } from "../store";

const BudgetLoanCalculator: React.FC<any> = ({ sendData }) => {
  const currency = useSelector((state:IRootState) => state.currency.currency);

  const [budget, setBudget] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [interest, setInterest] = useState(0);
  const [tenureType, setTenureType] = useState("Years");

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    if(isNaN(value) || value < 0){
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

  const handleSliderChange = (event:any, newValue:any) => {
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

  const toggleTenureType = (tType:string) => {
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
      const details = giveEMI(totalAmount_1, interest, tenure, tenureType)
      let totalInt = ((details?.emi * details?.tenureInMonths) - totalAmount_1).toFixed(2);
      sendData(budget, tenure, totalAmount_1, interest, totalInt)
      return;
    }
    const totalAmount =
      tenureType === "Years" ? budget * 12 * tenure : budget * tenure;
      const details = giveEMI(totalAmount, interest, tenure, tenureType)
      let totalInt = ((details?.emi * details?.tenureInMonths) - totalAmount).toFixed(2);
      sendData(budget, tenure, totalAmount, interest, totalInt)
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
                fontWeight: "600",
                color: primaryColor,
                paddingBottom: "6px",
              }}
            >
              Enter your Monthly Budget
            </div>
            <TextField
              onChange={handleChange}
              value={budget}
              type="tel"
              label={`In ${currency}`}
              name="budget"
              onFocus={(e) => e.target.select()}
              //   disabled={disableAmount}
              sx={{ background: "#FFFFFF", display: "flex" }}
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
              Select Tenure
            </div>
            <Grid container spacing={2} alignItems="center">
              <Grid item>{/* <VolumeUp /> */}</Grid>
              <Box
                display={"flex"}
                flexDirection={"column"}
                width={"100%"}
                alignItems={"center"}
              >
                <Box display={"flex"} alignItems={"end"} gap={"6px"}>
                  <TextField
                    onChange={handleChange}
                    value={tenure}
                    name="tenure"
                    type="number"
                    label={`in ${tenureType}`}
                    onFocus={(e) => e.target.select()}
                    sx={{ background: "#FFFFFF", width: "120px" }}
                    inputProps={{ step: "any", style: { width: "800px" } }}
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
                        onChange={(e) => toggleTenureType(e.target.value)}
                        value={tenureType}
                      >
                        <MenuItem value={"Years"}>Yr</MenuItem>
                        <MenuItem value={"Months"}>Mo</MenuItem>
                      </TextField>
                    </div>
                  </Box>
                  {/* <div style={{ color: lightSecondaryColor, fontWeight: 600 }}>
                    Yrs
                    <Tooltip
                      title={
                        "To enter months, enter the tenure in decimal format: For example, if you want to specify 2 years and 6 months, type 2.6"
                      }
                      placement="right-end"
                      arrow
                      sx={{ marginLeft: "10px" }}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            bgcolor: primaryColor,
                            "& .MuiTooltip-arrow": {
                              color: "rgba(255, 69, 0, 0.7)",
                            },
                            background: "rgba(255, 69, 0, 0.7)",
                            font: "600 15px Raleway, serif",
                          },
                        },
                      }}
                    >
                      <InfoIcon />
                    </Tooltip>
                  </div> */}
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
            </Grid>

            <Box>
              <div
                style={{
                  fontWeight: "600",
                  color: primaryColor,
                  paddingBottom: "6px",
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
