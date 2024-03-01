import { Box } from "@mui/material";
import React from "react";
import { lightSecondaryColor, primaryColor, secondaryColor } from "../Theme";
import { useSelector } from "react-redux";
import { IRootState } from "../store";

const LTVCard:React.FC<any> = ({
  emi,
  interest,
  principal,
  totalLoanAmt,
  totalMortAmt,
  eligibility,
}) => {
  const currency = useSelector((state:IRootState) => state.currency.currency);
  // console.log(emi)
  return (
    <Box sx={{ width: "730px", height: "auto" }}>
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
          paddingY={"10px"}
          gap={"15px"}
        >
          <Box
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              borderBottom: "2px solid #d3d3d3",
              width: "100%",
              textAlign: "center",
            }}
          >
            You are{" "}
            {eligibility ? (
              <span className="text-green-500  text-3xl font-semibold">
                Eligible
              </span>
            ) : (
              <span className="text-red-500 text-3xl font-semibold">
                Not Eligible
              </span>
            )}{" "}
            for the loan.
            {!eligibility && (
              <div>
                Add Mortgage worth {currency}{" "}
                <span style={{ fontSize: "25px", fontWeight: 600 }}>
                  {(totalLoanAmt - totalMortAmt).toFixed(2)}
                </span>{" "}
                more.
              </div>
            )}
          </Box>
          <Box display={"flex"} justifyContent={'space-between'} width={'100%'}>
            <Box sx={{}}>
              <div style={{ fontSize: "18px", fontWeight: 700 }}>
                <span>Principle Amount is </span>
                <span>
                  {currency}{" "}
                  <span style={{ fontSize: "25px" }}>{principal}</span>
                </span>
              </div>

              <div style={{ fontSize: "18px", fontWeight: 700 }}>
                <span>Total Interest is </span>
                <span>
                  {currency}{" "}
                  <span style={{ fontSize: "25px" }}>{interest}</span>
                </span>
              </div>
            </Box>

            <Box sx={{paddingLeft:"0px"}}>
              <div style={{ fontSize: "18px", fontWeight: 700 }}>
                <span>Total Loan Amount is </span>
                <span>
                  {currency}{" "}
                  <span style={{ fontSize: "25px" }}>{totalLoanAmt}</span>
                </span>
              </div>

              <div style={{ fontSize: "18px", fontWeight: 700 }}>
                <span>Total Mortgage Value is </span>
                <span>
                  {currency}{" "}
                  <span style={{ fontSize: "25px" }}>{totalMortAmt}</span>
                </span>
              </div>
            </Box>
          </Box>
          {/* <Box width={'100%'} display={'flex'} justifyContent={'space-evenly'}>
                        <div style={{ fontSize: "18px", fontWeight: 700 }}>
                            <div>Total Interest</div>
                            <div>{currency} <span style={{ fontSize: "25px" }}>{interest}</span></div>
                        </div>
                        <div style={{ fontSize: "18px", fontWeight: 700 }}>
                            <div >Total Amount</div>
                            <div >{currency} <span style={{ fontSize: "25px" }}>{principal + interest}</span></div>
                        </div>
                        <div style={{ fontSize: "18px", fontWeight: 700 }}>
                            <div >Total Mortgage Value</div>
                            <div >{currency} <span style={{ fontSize: "25px" }}>{'4'}</span></div>
                        </div>
                    </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default LTVCard;
