import { Box, Grid, Slider, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { lightSecondaryColor, primaryColor } from "../Theme";
import { Input } from "postcss";

const BudgetLoanCalculator = ({sendData}) => {
  const [budget, setBudget] = useState(0);
  const [tenure, setTenure] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "budget") {
      setBudget(+value);
    } else {
      if (value > 50) {
        return;
      }
      setTenure(+value);
    }
  };

  const handleSliderChange = (event, newValue) => {
    setTenure(newValue);
  };

  useEffect(()=>{
    if(budget < 1 || tenure < 1){
        return;
    }
    const totalAmount = (budget * 12) * tenure;
    sendData(budget, tenure, totalAmount)
  },[budget, tenure])

  console.log(tenure)

  return (
    <Box>
      <Box>
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
              type="number"
              label="In ₹"
              name="budget"
              onFocus={(e)=>e.target.select()}
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
                <Box display={'flex'} alignItems={'end'} gap={'6px'}>
                  <TextField
                    onChange={handleChange}
                    value={tenure}
                    name="tenure"
                    type="number"
                    onFocus={(e)=>e.target.select()}
                    sx={{ background: "#FFFFFF", width: "60px" }}
                    inputProps={{ style: { height: "10px" } }}
                  />
                  <div style={{color: lightSecondaryColor, fontWeight: 600}}>
                    Yrs
                  </div>
                </Box>
                <Slider
                  min={0}
                  max={50}
                  value={typeof tenure === "number" ? tenure : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  marks={[
                    { value: 0, label: "0" },
                    { value: 50, label: "50" },
                  ]}
                />
              </Box>
            </Grid>

            {/* <TextField
              onChange={handleChange}
              value={tenure}
              name="tenure"
              type="number"
              label="In Yrs"
              sx={{ background: "#FFFFFF" }}
            /> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetLoanCalculator;
