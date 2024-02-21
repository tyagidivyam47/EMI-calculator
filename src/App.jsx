import { Route, Router, Routes } from "react-router-dom";
import Header from "./Components/Header";
import EMICalculator from "./Pages/Calculator/EMICalculator";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/Signup";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import SetupForgotPass from "./Pages/Auth/SetupForgotPass";
import { ThemeProvider, createTheme } from "@mui/material";
import { primaryColor, secondaryColor } from "./Theme";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  const theme = createTheme({
    palette: {
      primary:{
        main: primaryColor
      },
      secondary: {
        main: secondaryColor,
      },
    }
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<EMICalculator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/passwordReset" element={<ForgotPassword />} />
          <Route path="/forgotPassword" element={<SetupForgotPass />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ThemeProvider>
      {/* <Routes>
      </Routes> */}
    </div>
  );
}

export default App;
