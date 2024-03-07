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
        // height: "77vh",
        marginBottom: "200px",
      }}
    >
      <Box
        sx={{ font: mainHeadingSm, textAlign: "center", marginBottom: "50px" }}
      >
        {type}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          background: "#FFFFFF",
          borderRadius: 10,
          paddingY: "70px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
      >
        <Calculator lg={true} />
      </Box>
    </Box>
  );
};

export default OtherLoan;
