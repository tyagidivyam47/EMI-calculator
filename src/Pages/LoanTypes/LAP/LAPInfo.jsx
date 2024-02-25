import React from 'react'
import { lightSecondaryColor } from '../../../Theme'
import { List, ListItem, ListItemText } from '@mui/material'

const LAPInfo = () => {
  return (
    <div style={{ font: "600 20px Raleway, serif", color: lightSecondaryColor }}>
      <div>
        <p>A Loan Against Property (LAP), also known as a mortgage loan, is a type of secured loan offered by financial institutions where you pledge your property as collateral to secure a loan. Here are some key points about Loan Against Property:</p>

        <List sx={{ listStyle: "decimal", pl: 4 }}>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Secured Loan: " />
            LAP is a secured loan, meaning you offer your property (residential or commercial) as collateral to the lender. The property serves as security for the loan, reducing the risk for the lender.
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Loan Amount: " />
            The loan amount approved by the lender depends on the value of the property pledged as collateral. Typically, lenders offer loan amounts ranging from 50% to 80% of the property's market value.
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Interest Rate: " />
            The interest rates for LAP are generally lower compared to unsecured loans like personal loans because the loan is backed by collateral. The interest rates can be fixed or floating, depending on the lender and the terms of the loan.
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Repayment Tenure: " />
            The repayment tenure for LAP can vary from a few years to up to 15 or 20 years, depending on the lender and the borrower's eligibility. Longer tenures may result in lower EMIs but higher interest payments over the loan term.
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Documentation: " />
            The documentation required for LAP includes proof of identity, address, income, property documents, and any other documents as specified by the lender.
          </ListItem>

          <ListItem sx={{ display: "list-item" }}>
            <ListItemText primary="Secured Risk of Property Seizure: " />
            Since LAP is a secured loan, failure to repay the loan could result in the lender seizing and selling the pledged property to recover the outstanding amount. Therefore, it's crucial to assess your repayment capacity before availing of a LAP.

          </ListItem>
        </List>
        <p>Overall, a Loan Against Property can be an effective financial tool to meet your large fund requirements, provided you have a clear repayment plan in place and understand the risks involved in pledging your property as collateral.</p>
      </div>

    </div>
  )
}

export default LAPInfo