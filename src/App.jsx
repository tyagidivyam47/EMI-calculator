import { Route, Router, Routes } from "react-router-dom";
import Header from "./Components/Header";
import EMICalculator from "./Pages/Calculator/EMICalculator";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/Signup";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import SetupForgotPass from "./Pages/Auth/SetupForgotPass";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { primaryColor, secondaryColor } from "./Theme";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Sidebar from "./Components/Sidebar";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import LoanTypes from "./Pages/LoanTypes/LoanTypes";
import ReqManagment from "./Pages/RequestManagement/ReqManagment";
import Profile from "./Pages/Profile/Profile";
import Settings from "./Pages/Settings/Settings";

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
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    const isLoggedIn = cookies.auth_token;
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
          {loggedIn && <Box>
            <Sidebar />
          </Box>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<EMICalculator />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/passwordReset" element={<ForgotPassword />} />
            <Route path="/forgotPassword" element={<SetupForgotPass />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Loan Types" element={<LoanTypes />} />
            <Route path="/Request Management" element={<ReqManagment />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </Box>
      </ThemeProvider>
      {/* <Routes>
      </Routes> */}
    </div>
  );
}

export default App;
