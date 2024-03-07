import { Box } from "@mui/material";
import React, { useState } from "react";
import BudgetLoanCalculator from "../../../Components/BudgetLoanCalculator";
import { Doughnut } from "react-chartjs-2";
import {
  primaryBgColor,
  primaryColor,
  secondaryBgColor,
  secondaryColor,
} from "../../../Theme";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";

const BudgetLoan = () => {
  const currency = useSelector((state: IRootState) => state.currency.currency);

  const [emi, setEmi] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [tenureType, setTenureType] = useState("Years");

  const getData = (
    emiValue: number,
    tenureValue: number,
    amountValue: number,
    interestRate: number,
    totalInterest: number,
    currTenureType: string
  ) => {
    // console.log(emiValue, " : ", tenureValue, " : ",amountValue, " : ",interestRate, " : ",totalInterest )
    setEmi(+emiValue);
    setTenure(+tenureValue);
    setAmount(+amountValue);
    setInterest(+interestRate);
    setTotalInterest(+totalInterest);
    setTenureType(currTenureType);
  };

  // console.log(tenureType)

  return (
    <Box
      sx={{
        background: secondaryBgColor,
        border: "8px solid #FFFFFF",
        width: { xl: "80%", lg: "80%", xs: "100%" },
        padding: "10px",
        marginTop: "30px",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5,
        // height: "77vh",
        marginBottom: "200px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { lg: "row", md: "row", xs: "column" },
        }}
      >
        <Box
          sx={{
            background: "",
            display: "flex",
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
            width: { md: "600px", sm: "600px", xs: "400px" },
            height: { md: "auto", sm: "450", xs: "450px" },
            overflow: "hidden",
            margin: "auto",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <Box
            sx={{
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 5,
              background: "#FFFFFF",
            }}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              // color={"#FFFFFF"}
              paddingX={"40px"}
              paddingY={"10px"}
              // gap={"15px"}
              // sx={{background:"#d4e3ff"}}
            >
              <Box
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  // borderBottom: "2px solid #d3d3d3",
                  background: "#d4e3ff",
                  width: { md: "600px", sm: "600px", xs: "390px" },
                  marginTop: "-10px",
                  height: "100px",
                  textAlign: "center",
                }}
              >
                <Box sx={{ marginTop: "20px" }}>
                  Your total principal amount is <br />
                  {currency}{" "}
                  <span style={{ fontSize: "32px", fontWeight: 700 }}>
                    {amount}
                  </span>
                </Box>
              </Box>
              <Box
                sx={{
                  height: { md: "245px", sm: "350px", xs: "350px" },
                  background: "#ffffff",
                }}
              >
                <Box
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    textAlign: "center",
                    paddingTop: "18px",
                    paddingBottom: "18px",
                  }}
                >
                  Your EMI is {currency} {emi}
                </Box>
                <Box
                  sx={{
                    background: secondaryBgColor,
                    paddingY: "40px",
                    paddingX: "20px",
                  }}
                >
                  <Box
                    width={"100%"}
                    display={"flex"}
                    justifyContent={"center"}
                    gap={"40px"}
                    flexWrap={"wrap"}
                    // sx={{ flexDirection: { md: "row", xs: "column" } }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        borderRight: "2px solid #FFFFFF",
                        paddingRight: "40px",
                        textAlign: "center",
                      }}
                    >
                      <div>Total Interest</div>
                      <div>
                        {currency}{" "}
                        <span style={{ fontSize: "22px" }}>
                          {totalInterest || 0}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        borderRight: "2px solid #FFFFFF",
                        textAlign: "center",
                        paddingRight: "40px",
                      }}
                    >
                      <div>Loan Amount</div>
                      <div>
                        {currency}{" "}
                        <span style={{ fontSize: "22px" }}>
                          {amount - totalInterest > 0
                            ? amount - totalInterest
                            : amount}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      <div>Total loan tenure</div>
                      <div>
                        <span style={{ fontSize: "22px" }}>{tenure}</span>{" "}
                        {tenureType}
                      </div>
                    </div>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box display={"flex"} justifyContent={"center"} marginTop={"0px"}>
        <Box
          sx={{
            background: "#FFFFFF",
            padding: "50px",
            marginTop: "30px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius: 5,
            marginBottom: "50px",
          }}
        >
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
      </Box>
    </Box>
  );
};

export default BudgetLoan;
