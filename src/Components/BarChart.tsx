import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { primaryColor, secondaryColor } from "../Theme";

const BarChart: React.FC<any> = ({ ammData }: any) => {
  //   const years = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];
  //   const principalData = [50000, 60000, 70000, 80000, 90000];
  //   const interestData = [10000, 12000, 14000, 16000, 18000];

  // console.log(ammData)

  const [years, setYears] = useState([]);
  const [principalData, setPrincipalData] = useState([]);
  const [interestData, setInterestData] = useState([]);

  
  useEffect(() => {
    if (ammData?.length > 0) {
      let tempPrinc = [];
      let tempInt = [];
      let tempYr = [];
      for (let i = 1; i < ammData.length; i++) {
        // console.log(ammData)
        let currPrinc = 0;
        let currInt = 0;

        while (true) {
          currInt += (ammData[i]?.interest || 0);
          currPrinc += ammData[i]?.principal || 0;
          if (i % 12 === 0) {
            break;
          }
          // console.log(i," : ",ammData[i])
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
