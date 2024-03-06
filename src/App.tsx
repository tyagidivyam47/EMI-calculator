import { Navigate, Route, Router, Routes } from "react-router-dom";
import Header from "./Components/Header";
import EMICalculator from "./Pages/Calculator/EMICalculator";
import Home from "./Pages/Home/Home";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { primaryBgColor, primaryColor, secondaryColor } from "./Theme";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Sidebar from "./Components/Sidebar";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import LoanTypes from "./Pages/LoanTypes/LoanTypes";
import { setupIonicReact } from "@ionic/react";

import "@ionic/react/css/core.css";
import HomeLoan from "./Pages/LoanTypes/HomeLoan/HomeLoan";
import LAP from "./Pages/LoanTypes/LAP/LAP";
import BudgetLoan from "./Pages/LoanTypes/BudgetLoan/BudgetLoan";
import Calculator from "./Components/Calculator";
import OtherLoan from "./Pages/LoanTypes/OtherLoan";

setupIonicReact();

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
    },
  });

  const [cookies, setCookie, removeCookie] = useCookies([
    "auth_token",
    "user_id",
  ]);
  const [loggedIn, setLoggedIn] = useState<boolean>();

  useEffect(() => {
    const isLoggedIn = true;
    if (isLoggedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [cookies]);

  return (
    <div style={{ background: primaryBgColor }}>
      <ThemeProvider theme={theme}>
        <Header />
        <Box display={"flex"}>
          {loggedIn && (
            <Box>
              <Sidebar />
            </Box>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<EMICalculator />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Home Loan" element={<HomeLoan />} />
            <Route path="/Loan Against Property" element={<LAP />} />
            <Route path="/Loan as per budget" element={<BudgetLoan />} />

            <Route path="/Car Loan" element={<OtherLoan type="Car Loan Calculator" />} />
            <Route path="/Education Loan" element={<OtherLoan type="Education Loan Calculator" />} />
            <Route path="/Personal Loan" element={<OtherLoan type="Personal Loan Calculator" />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
