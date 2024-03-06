import React from "react";
import { mainHeading, mainHeadingSm, secondaryBgColor } from "../../Theme";
import { Box } from "@mui/material";
import Calculator from "../../Components/Calculator";

const OtherLoan: React.FC<any> = ({ type }) => {
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
        height: "70vh",
        marginBottom: "200px",
      }}
    >
      <Box sx={{font:mainHeadingSm, textAlign:"center", marginBottom:"50px"}}>{type}</Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Calculator lg={true} />
      </Box>
    </Box>
  );
};

export default OtherLoan;
