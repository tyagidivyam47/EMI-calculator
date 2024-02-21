import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { primaryColor, secondaryColor, tertiaryColor } from "../Theme";

const PieChart = ({ loanAmount, totalInterest }) => {
  const data = {
    labels: ["Principal Loan", "Total Interest"],
    datasets: [
      {
        data: [loanAmount, totalInterest],
        backgroundColor: [primaryColor, secondaryColor],
        hoverBackgroundColor: ["#36A2EB", "#36A2EB"],
      },
    ],
  };

 

  return (
    <div>
      <Pie data={data}/>
      <div style={{textAlign:"center", fontWeight:"bold", marginTop:"16px"}}>Break-up of Total Payment</div>
    </div>
  );
};

export default PieChart;
