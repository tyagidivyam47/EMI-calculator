import { Navigate, Route, Router, Routes } from "react-router-dom";
import Header from "./Components/Header";
import EMICalculator from "./Pages/Calculator/EMICalculator";
import Home from "./Pages/Home/Home";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { primaryColor, secondaryColor } from "./Theme";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Sidebar from "./Components/Sidebar";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import LoanTypes from "./Pages/LoanTypes/LoanTypes";

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
    <div>
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
            <Route
              path="/Dashboard"
              element={ <Dashboard />}
            />
            <Route
              path="/Loan Types"
              element={ <LoanTypes />}
            />
          </Routes>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
