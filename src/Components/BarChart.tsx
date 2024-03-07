import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { primaryColor, secondaryColor } from "../Theme";
import { Box } from "@mui/material";

const BarChart: React.FC<any> = ({ ammData }: any) => {
  const [years, setYears] = useState([]);
  const [principalData, setPrincipalData] = useState([]);
  const [interestData, setInterestData] = useState([]);

  useEffect(() => {
    if (ammData?.length > 0) {
      let tempPrinc = [];
      let tempInt = [];
      let tempYr = [];
      for (let i = 1; i < ammData.length; i++) {
        let currPrinc = 0;
        let currInt = 0;

        while (true) {
          currInt += ammData[i]?.interest || 0;
          currPrinc += ammData[i]?.principal || 0;
          if (i % 12 === 0) {
            break;
          }
          i++;
        }
        tempPrinc.push(currPrinc);
        tempInt.push(currInt);
        tempYr.push(`Year ${i / 12}`);
      }
      setPrincipalData(tempPrinc);
      setInterestData(tempInt);
      setYears(tempYr);
    }
  }, [ammData]);

  const data = {
    labels: years,
    datasets: [
      {
        label: "Principal Amount",
        data: principalData,
        backgroundColor: primaryColor,
      },
      {
        label: "Interest",
        data: interestData,
        backgroundColor: secondaryColor,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Yearly break-down of EMI",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        // max: 100000,
      },
    },
  };

  return (
    <Box>
      <Box
        sx={{
          display: { xl: "flex", md: "flex", xs: "none" },
          justifyContent: "center",
        }}
      >
        <Bar data={data} options={options} />
      </Box>
      <Box
        sx={{
          display: { xl: "none", md: "none", xs: "flex" },
          justifyContent: "center",
        }}
      >
        <Bar data={data} options={options} height={"250%"} />
      </Box>
    </Box>
  );
};

export default BarChart;
