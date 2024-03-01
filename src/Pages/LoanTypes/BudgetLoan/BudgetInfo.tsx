import React from "react";
import { lightSecondaryColor } from "../../../Theme";

const BudgetInfo = () => {
  return (
    <div
      style={{ font: "600 20px Raleway, serif", color: lightSecondaryColor }}
    >
      <p style={{paddingBottom:"15px"}}>
        This calculator helps you estimate the amount of loan you can get based
        on your monthly budget and the tenure of the loan.
      </p>
      <p style={{paddingBottom:"15px"}}>
        {" "}
        To use this calculator, enter your monthly budget in rupees and select
        the tenure in months from the drop-down menu. The calculator will then
        display the total loan amount you can get, along with the monthly
        installment and the interest rate.
      </p>
      <p style={{paddingBottom:"15px"}}>
        You can adjust the budget and tenure values to see how they affect the
        loan amount.
      </p>
      <p>
        <span style={{ fontWeight: "800" }}>*Please note that </span> this
        calculator is for informational purposes only and does not guarantee the
        actual loan approval or terms.
      </p>
    </div>
  );
};

export default BudgetInfo;
