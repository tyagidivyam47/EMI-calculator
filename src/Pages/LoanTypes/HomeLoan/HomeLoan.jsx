import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Calculator from "../../../Components/Calculator";
import { secondaryColor } from "../../../Theme";

const HomeLoan = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(5);
  const [interest, setInterest] = useState(6.5);
  const [monthlyEMI, setMonthlyEMI] = useState();
  const [totalInterest, setTotalInterest] = useState();
  const [advancedInfo, setAdvancedInfo] = useState({
    hv: null,
    dp: null,
    li: null,
    loanCharges: null,
  });

  const handleChange = (
    loanAmountI,
    tenureI,
    interestI,
    monthlyEMII,
    totalInterestI
  ) => {
    setLoanAmount(loanAmountI);
    setTenure(tenureI);
    setInterest(interestI);
    setMonthlyEMI(monthlyEMII);
    setTotalInterest(totalInterestI);
  };

  const advancedChangeHandle = (e) => {};
  return (
    <Box sx={{ marginLeft: "auto" }}>
      <Box
        sx={{ marginBottom: "50px", marginLeft: "50px", marginRight: "50px" }}
      >
        <Accordion
          square="false"
          sx={{ minHeight: "80px", borderRadius: "10px" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#FFFFFF" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight: "80px",
              font: "500 28px Raleway, serif",
              color: "#FFFFFF",
              background:
                "linear-gradient(90deg, rgba(80,178,234,1) 88%, rgba(255,141,0,1) 100%)",
              borderRadius: "10px",
            }}
          >
            Advanced Details
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                  gap: "50px",
                  rowGap: "10px",
                }}
              >
                <TextField label={"Home Value(HV)"} />
                <TextField label={"Margin OR Down Payment (DP)"} />
                <TextField label={"Loan Insurance (LI)"} />
                <TextField label={"Loan Fees & Charges"} />
                <TextField label={"Home Value(HV)"} />
              </div>
              <div style={{display:"flex", marginLeft:"auto", justifyContent:"center", marginTop:"10px"}}>
                <Button variant="contained">Submit</Button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box
      sx={{background:"#FFFFFF"}}
        style={{
          maxWidth: "500px",
          marginLeft: "auto",
          marginRight: "auto",
          border: `2px solid ${secondaryColor}`,
          padding: "20px",
          borderRadius: 20,
        }}
        
      >
        <Calculator
          inputLoanAmount={10000}
          inputTenure={5}
          inputInterest={10}
          onChange={handleChange}
          amountUl={10000000}
          interestUl={9}
          tenureUl={35}
        />
      </Box>
    </Box>
  );
};

export default HomeLoan;
