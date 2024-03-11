import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
      // alignItems={"center"}
      justifyContent={"center"}
      marginLeft={"32px"}
      gap={"16px"}
      paddingRight={"20px"}
    >
      <div
        style={{
          font: "600 26px/30px Raleway, serif",
          // color: ,
          // marginBottom: "1px",
          textAlign:"left"
        }}
      >
        Frequently Asked Questions
      </div>
      <div style={{}}>
        {data &&
          data?.map((e:any) => (
            <div style={{}}>
              <Accordion
                sx={{
                  minHeight: "100px",
                  // borderRadius: "10px",
                  // marginRight: "60px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  marginRight: "10px",
                }}
              >
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon style={{ color: "#FFFFFF" }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    minHeight: "100px",
                    font: {md: "500 22px Raleway, serif", xs:"500 16px Raleway, serif"},
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
