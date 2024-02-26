import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { lightSecondaryColor } from "../../../Theme";

const HomeInfo = () => {
  return (
    <div
      style={{ font: "600 20px Raleway, serif", color: lightSecondaryColor }}
    >
      <div>
        <p>
          Using our Home Loan EMI Calculator, you can calculate how much monthly
          and total expenditure you really incur by purchasing a home using your
          bank home loan.
        </p>
        <o>
          Home Loan Details includes single premium loan insurance and
          processing fees.
        </o>
        <List sx={{ listStyle: "decimal", pl: 4 }}>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Home Loan " />
            is the actual price of the home you purchased (i.e., sale deed
            value).
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Down Payment, aka Margin," />
            is the total money you paid to the seller or builder from your own
            pocket, entered either in Rupees or as a percentage of Home Value.
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Loan Insurance" />
            is the single premium amount, for the Home Loan Protection Plan
            (HLPP) OR Term Insurance Plan, that gets included in your home loan
            amount. If you want to guesstimate this amount, use the LIC premium
            calculator to calculate yearly premium for eTerm plan using your
            age, loan term and loan amount for Sum Assured. You then multiply
            this number by your loan tenure.
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Loan Amount " />
            is calculated as Home Value + Loan Insurance — Down Payment.
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Loan Fees & Charges " />
            includes Processing Fees, Administrative Charges etc. along with
            service taxes, entered either in Rupees or as a percentage of Loan
            Amount.
          </ListItem>
        </List>
        <p>
          You will not pay property taxes and home insurance premium each month,
          but it is included in the total monthly payment with the assumption
          that you are setting aside this amount (either through Recurring
          Deposit or some other means) every month. This will ensure that you
          will have the necessary money to make the payment once or twice a
          year. Please note that the recurring expenses will change over the
          lifetime of the home loan due to inflation and other factors. They
          will also continue beyond the home loan tenure.
        </p>
        <p style={{ paddingTop: "15px" }}>
          <span style={{ fontWeight: "800" }}>*Please note that </span> this
          calculator is for informational purposes only and does not guarantee
          the actual loan approval or terms.
        </p>
      </div>
    </div>
  );
};

export default HomeInfo;
