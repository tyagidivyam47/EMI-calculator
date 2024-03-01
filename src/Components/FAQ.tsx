import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import React from "react";
import SouthIcon from "@mui/icons-material/South";
import {
  lightPrimaryColor,
  lightSecondaryColor,
  mainSubHeading,
  primaryColor,
  secondaryColor,
} from "../Theme";

const FAQ: React.FC<any> = ({ data }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      margin={"auto"}
      gap={"16px"}
      paddingRight={"20px"}
    >
      <div
        style={{
          font: mainSubHeading,
          color: secondaryColor,
          marginBottom: "16px",
        }}
      >
        Frequently Asked Questions
      </div>
      <div style={{ overflowY: "auto", height: "500px" }}>
        {data &&
          data?.map((e:any) => (
            <div style={{}}>
              <Accordion
                sx={{
                  minHeight: "100px",
                  // borderRadius: "10px",
                  // marginRight: "60px",
                  marginTop: "30px",
                  marginBottom: "10px",
                  marginRight: "10px",
                }}
              >
                <AccordionSummary
                  expandIcon={<SouthIcon style={{ color: "#FFFFFF" }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    minHeight: "100px",
                    font: "500 22px Raleway, serif",
                    color: "#FFFFFF",
                    background: lightSecondaryColor,
                    // borderRadius: "10px",
                  }}
                >
                  {e.summary}
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "50px",
                      rowGap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {e.details}
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
      </div>
    </Box>
  );
};

export default FAQ;
