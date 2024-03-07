import { Box } from "@mui/material";
import React from "react";
import { lightSecondaryColor, primaryColor, secondaryColor } from "../Theme";
import { useSelector } from "react-redux";
import { IRootState } from "../store";

const LTVCard: React.FC<any> = ({
  emi,
  interest,
  principal,
  totalLoanAmt,
  totalMortAmt,
  eligibility,
}) => {
  const currency = useSelector((state: IRootState) => state.currency.currency);
  // console.log(emi)
  return (
    <Box
      sx={{
        width: { md: "600px", sm: "600px", xs: "450px" },
        height: "auto",
        margin: "auto",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <Box
        sx={{
          // backgroundImage:
          //   "url(https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
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
              fontSize: "13px",
              fontWeight: 600,
              // borderBottom: "2px solid #d3d3d3",
              background: "#d4e3ff",
              width: { md: "600px", sm: "600px", xs: "390px" },
              marginTop: "-10px",
              height: "70px",
              textAlign: "center",
              paddingTop: `${eligibility ? "27px" : "15px"} `,
            }}
          >
            {eligibility ? (
              <span
                className="text-green-500  text-3xl font-semibold"
                style={{ color: "green", paddingTop: "80px" }}
              >
                You are Eligible for the loan.
              </span>
            ) : (
              <span
                className="text-red-500 text-3xl font-semibold"
                style={{ color: "red" }}
              >
                You are Not Eligible for the loan.
              </span>
            )}{" "}
            {!eligibility && (
              <div style={{ fontSize: "16px" }}>
                Add Mortgage worth {currency}{" "}
                {(totalLoanAmt - totalMortAmt).toFixed(2)} more.
              </div>
            )}
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
            height={"110px"}
            paddingTop={"28px"}
          >
            <Box>
              <Box
                sx={{
                  fontSize: { md: "16px", sm: "16px", xs: "12px" },
                  fontWeight: 400,
                }}
              >
                <span>Principle Amount is </span>
                <span>
                  {currency} <span style={{}}>{principal}</span>
                </span>
              </Box>

              <Box
                sx={{
                  fontSize: { md: "16px", sm: "16px", xs: "12px" },
                  fontWeight: 400,
                  marginTop: "20px",
                }}
              >
                <span>Total Interest is </span>
                <span>
                  {currency} <span style={{}}>{interest}</span>
                </span>
              </Box>
            </Box>

            <Box sx={{ paddingLeft: "0px" }}>
              <Box
                sx={{
                  fontSize: { md: "16px", sm: "16px", xs: "12px" },
                  fontWeight: 400,
                }}
              >
                <span>Total Loan Amount is </span>
                <span>
                  {currency} <span style={{}}>{totalLoanAmt}</span>
                </span>
              </Box>

              <Box
                sx={{
                  fontSize: { md: "16px", sm: "16px", xs: "12px" },
                  fontWeight: 400,
                  marginTop: "20px",
                }}
              >
                <span>Total Mortgage Value is </span>
                <span>
                  {currency} <span style={{}}>{totalMortAmt}</span>
                </span>
              </Box>
            </Box>
          </Box>
          {/* <Box width={'100%'} display={'flex'} justifyContent={'space-evenly'}>
                        <div style={{ fontSize: "18px", fontWeight: 400 }}>
                            <div>Total Interest</div>
                            <div>{currency} <span style={{  }}>{interest}</span></div>
                        </div>
                        <div style={{ fontSize: "18px", fontWeight: 400 }}>
                            <div >Total Amount</div>
                            <div >{currency} <span style={{  }}>{principal + interest}</span></div>
                        </div>
                        <div style={{ fontSize: "18px", fontWeight: 400 }}>
                            <div >Total Mortgage Value</div>
                            <div >{currency} <span style={{  }}>{'4'}</span></div>
                        </div>
                    </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default LTVCard;
