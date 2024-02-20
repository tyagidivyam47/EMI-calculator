import { Route, Router, Routes } from "react-router-dom";
import Header from "./Components/Header";
import EMICalculator from "./Pages/Calculator/EMICalculator";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/Signup";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import SetupForgotPass from "./Pages/Auth/SetupForgotPass";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<EMICalculator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/passwordReset" element={<ForgotPassword />} />
        <Route path="/forgotPassword" element={<SetupForgotPass />} />
      </Routes>
      {/* <Routes>
      </Routes> */}
    </div>
  );
}

export default App;
