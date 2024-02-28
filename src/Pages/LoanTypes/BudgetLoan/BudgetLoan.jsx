import { Box } from "@mui/material";
import React, { useState } from "react";
import BudgetLoanCalculator from "../../../Components/BudgetLoanCalculator";
import { Doughnut } from "react-chartjs-2";
import { primaryColor, secondaryColor } from "../../../Theme";
import { useSelector } from "react-redux";

const BudgetLoan = () => {
  const currency = useSelector((state) => state.currency.currency);

  const [emi, setEmi] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [tenureType, setTenureType] = useState("Years")

  const getData = (
    emiValue,
    tenureValue,
    amountValue,
    interestRate,
    totalInterest,
    currTenureType
  ) => {
    // console.log(currTenureType)
    setEmi(+emiValue);
    setTenure(+tenureValue);
    setAmount(+amountValue);
    setInterest(+interestRate);
    setTotalInterest(+totalInterest);
    setTenureType(currTenureType)
  };

  return (
    <Box sx={{marginTop:"-50px"}}>
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

      <Box
        sx={{
          width: "730px",
          height: "auto",
          marginX: "auto",
          paddingBottom: "50px",
        }}
      >
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
              Your total principal amount is {currency}{" "}
              <span style={{ fontSize: "48px", fontWeight: 700 }}>
                {amount}
              </span>
            </Box>
            <Box sx={{ fontSize: "22px", fontWeight: 600 }}>
              Your EMI is {currency} {emi}
            </Box>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              gap={"60px"}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  borderRight: "2px solid #FFFFFF",
                  paddingRight:"60px"
                }}
              >
                <div>Total Interest</div>
                <div>
                  {currency} <span style={{ fontSize: "32px" }}>{totalInterest || 0}</span>
                </div>
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  borderRight: "2px solid #FFFFFF",
                  paddingRight:"60px"
                }}
              >
                <div>Loan Amount</div>
                <div>
                  {currency} <span style={{ fontSize: "32px" }}>{amount - totalInterest > 0 ? amount - totalInterest: amount }</span>
                </div>
              </div>
              <div style={{ fontSize: "18px", fontWeight: 700 }}>
                <div>Total loan tenure</div>
                <div>
                  <span style={{ fontSize: "32px" }}>{tenure}</span> {tenureType}
                </div>
                {/* <Box sx={{ fontSize: "22px", fontWeight: 600 }}>
                  Your total loan tenure is {tenure} Years
                </Box> */}
              </div>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box display={"flex"} justifyContent={"center"} marginTop={"0px"}>
        <Box>
          <Doughnut
            data={{
              labels: ["Total Loan", "Total Interest"],
              datasets: [
                {
                  label: "",
                  data: [amount, totalInterest],
                  backgroundColor: [primaryColor, secondaryColor],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Loan Amount Break Up",
                },
              },
            }}
          />
        </Box>

        <Box>
          {/* <Doughnut
            data={{
              labels: [
                "Principal Amount",
                "Total Interest",
                "One Time Expenses",
              ],
              datasets: [
                {
                  label: "1 Time Expenses",
                  data: [
                    loanAmount,
                    totalInterest,
                    advancedInfo.loanCharges + advancedInfo.dp,
                  ],
                  backgroundColor: [
                    primaryColor,
                    secondaryColor,
                    tertiaryColor,
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Total of all payments",
                },
              },
            }}
          /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetLoan;
