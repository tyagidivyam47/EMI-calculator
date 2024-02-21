import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { primaryColor, secondaryColor } from "../Theme";

const BarChart = ({
  loanAmount,
  tenure,
  interest,
  monthlyEmi,
  totalInterest,
}) => {
  //   const years = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];
  //   const principalData = [50000, 60000, 70000, 80000, 90000];
  //   const interestData = [10000, 12000, 14000, 16000, 18000];

  const [years, setYears] = useState([]);
  const [principalData, setPrincipalData] = useState([]);
  const [interestData, setInterestData] = useState([]);

  useEffect(() => {
    let tempYears = [];
    for (let i = 1; i <= tenure; i++) {
      tempYears.push(`Year ${i}`);
    }
    const annualEmi = monthlyEmi * 12;
    let currPercentage = 63;
    let tempPincipalData = [];
    let tempInterestData = [];

    for (let i = 1; i <= tenure; i++) {
      const currPrincipal = (currPercentage / 100) * annualEmi;
      tempPincipalData.push(
        currPrincipal > annualEmi ? annualEmi : currPrincipal
      );
      const currInterest =
        annualEmi - currPrincipal < 0 ? 0 : annualEmi - currPrincipal;
      tempInterestData.push(currInterest);
      currPercentage += 8;
    }
    setYears(tempYears);
    setPrincipalData(tempPincipalData);
    setInterestData(tempInterestData);
    // console.log(tenure)
  }, [monthlyEmi, tenure, interest, loanAmount, totalInterest]);

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
        text: "Yearly break-up of EMI",
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
    <div style={{display:"flex", justifyContent:"center"}}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
