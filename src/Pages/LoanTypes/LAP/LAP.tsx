import { Box } from "@mui/material";
import React, { useState } from "react";
import InputCalculator from "../../../Components/InputCalculator";
import PaymentList from "../../../Components/PaymentList";
import LTVInputCalculator from "../../../Components/LTVInputCalculator";
import LTVCard from "../../../Components/LTVCard";
import {
  mainSubHeading,
  primaryColor,
  secondaryBgColor,
  secondaryColor,
} from "../../../Theme";
import { Doughnut, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";

const LAP = () => {
  const currency = useSelector((state: IRootState) => state.currency.currency);

  const [emiOp, setEmiOp] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [principalAmount, setPrincipalAmount] = useState(0);
  const [totalLoanAmt, setTotalLoanAmt] = useState(0);
  const [totalMortAmt, setTotalMortAmt] = useState(0);
  const [eligibility, setEligibility] = useState(false);
  const [bankEquity, setBankEquity] = useState(0);
  const [cusEquity, setCusEquity] = useState(0);

  const getData = (
    emi: number,
    interest: number,
    principal: number,
    totalLoan: number,
    totalMortgage: number,
    isEligibile: boolean
  ) => {
    // console.log(emi, " : ", interest, " : ", principal);
    setEmiOp(+emi);
    setTotalInterest(+interest);
    setPrincipalAmount(+principal);
    setTotalLoanAmt(+totalLoan);
    setTotalMortAmt(+totalMortgage);
    setEligibility(isEligibile);
    setBankEquity(isEligibile ? +totalLoan : totalLoan - totalMortgage);
    setCusEquity(isEligibile ? totalMortgage - totalLoan : 0);
  };
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
        // height: "70vh",
        marginBottom: "100px",
      }}
    >
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
        {/* <div style={{ font: "600 26px Raleway, serif" }}>LTV Calculator</div> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { lg: "row", md: "row", xs: "column" },
            justifyContent: "center",
            gap: "30px",
          }}
        >
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
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              // border: "1px solid #d3d3d3",
            }}
          >
            <LTVInputCalculator sendData={getData} />
          </div>

          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
            <div>
              <LTVCard
                emi={emiOp}
                interest={totalInterest}
                principal={principalAmount}
                totalLoanAmt={totalLoanAmt}
                totalMortAmt={totalMortAmt}
                eligibility={eligibility}
              />
            </div>

            <Box sx={{ background: "#FFFFFF", borderRadius:2, boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
              <div>
                <Box
                  sx={{
                    font: "600 20px Raleway, serif",
                    // color: primaryColor,
                    textAlign: {lg:"left", md:"left", xs:"center"},
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  Equity Breakdown
                </Box>
              </div>
              <Box
                sx={{
                  borderRadius: 5,
                  //   width: "100%",
                  // padding: "30px",
                  //   maxWidth: "400px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection:{lg:"row", md:"row", xs:"column"}
                }}
              >
                <div
                  style={{
                    padding: "10px",
                    borderRight: "2px solid #d3d3d3",
                    // background: "red",
                    // height:"100%"
                    // color: secondaryColor,
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 400,
                      paddingBottom: "10px",
                    }}
                  >
                    Bank's Equity ={" "}
                    <span>
                      {currency} {bankEquity.toFixed(2)}
                    </span>
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: 400 }}>
                    Customer's Equity ={" "}
                    <span>
                      {currency} {cusEquity.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div style={{ height: "350px", width: "350px" }}>
                  <Doughnut
                    data={{
                      labels: ["Bank's Equity", "Customer's Equity"],
                      datasets: [
                        {
                          data: [bankEquity, cusEquity],
                          backgroundColor: [primaryColor, secondaryColor],
                          // hoverBackgroundColor: ["#36A2EB", "#36A2EB"],
                        },
                      ],
                    }}
                  />
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LAP;
