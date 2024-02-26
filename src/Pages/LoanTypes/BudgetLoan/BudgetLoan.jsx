import { Box } from "@mui/material";
import React, { useState } from "react";
import BudgetLoanCalculator from "../../../Components/BudgetLoanCalculator";

const BudgetLoan = () => {
  const [emi, setEmi] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [amount, setAmount] = useState(0);
//   const [interest, setInterest] = useState(0);

  const getData = (emiValue, tenureValue, amountValue) => {
    setEmi(+emiValue);
    setTenure(+tenureValue);
    setAmount(+amountValue);
  };

  return (
    <Box>
      <Box
        sx={{
          background: "",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
        }}
        style={{
          // maxWidth: "500px",
          // border: `2px solid ${secondaryColor}`,
          padding: "20px",
          borderRadius: 20,
        }}
      >
        <div style={{ font: "600 26px Raleway, serif" }}>
          {/* LTV Calculator */}
        </div>
        <div
          style={{
            height: "auto",
            width: "auto",
            padding: "30px 30px",
            background: "#FFFFFF",
            borderRadius: 6,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #d3d3d3",
          }}
        >
          <BudgetLoanCalculator sendData={getData} />
        </div>
        <div>
          {/* <LTVCard emi={emiOp} interest={totalInterest} principal={principalAmount} /> */}
        </div>
      </Box>

      <Box sx={{ width: "730px", height: "auto", marginX:"auto", paddingBottom:"50px" }}>
        <Box
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 5,
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            color={"#FFFFFF"}
            paddingX={"40px"}
            paddingY={"40px"}
            gap={"15px"}
          >
            <Box
              sx={{
                fontSize: "22px",
                fontWeight: 600,
                borderBottom: "2px solid #d3d3d3",
                width: "100%",
                textAlign: "center",
              }}
            >
              Your total loan amount is ₹{" "}
              <span style={{ fontSize: "48px", fontWeight: 700 }}>
                {amount}
              </span>
            </Box>
            <Box sx={{ fontSize: "22px", fontWeight: 600 }}>
              Your EMI is ₹ {emi}
            </Box>
            <Box sx={{ fontSize: "22px", fontWeight: 600 }}>
              Your total loan tenure is {tenure} Years
            </Box>
            {/* <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-evenly"}
            >
              <div style={{ fontSize: "18px", fontWeight: 700 }}>
                <div>Total Interest</div>
                <div>
                  ₹ <span style={{ fontSize: "32px" }}>{interest}</span>
                </div>
              </div>
              <div style={{ fontSize: "18px", fontWeight: 700 }}>
                <div>Principal Amount</div>
                <div>
                  ₹ <span style={{ fontSize: "32px" }}>{amount}</span>
                </div>
              </div>
            </Box> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetLoan;
