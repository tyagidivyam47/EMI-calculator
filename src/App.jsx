import { useState } from "react";
import Calculator from "./Components/Calculator";
import PieChart from "./Components/PieChart";
import Particle from "./Components/Particle";
import BarChart from "./Components/BarChart";
import downloadIcon from "./assets/download-icon.png"
/**
 *
 * EMI Formula: [P x R (1+R)^N] / [(1+R)^N-1]
 *
 * p -> Principal amount: loan - down
 * r -> rate of interest
 * n -> no of years.
 *
 * input error color: #FAE9E5
 * input text color: #EB5A3C
 */

function App() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(5);
  const [interest, setInterest] = useState(6.5);
  const [monthlyEMI, setMonthlyEMI] = useState();
  const [totalInterest, setTotalInterest] = useState();
  const [showParticles, setShowParticles] = useState(true);

  const handleChange = (
    loanAmountI,
    tenureI,
    interestI,
    monthlyEMII,
    totalInterestI
  ) => {
    setLoanAmount(loanAmountI);
    setTenure(tenureI);
    setInterest(interestI);
    setMonthlyEMI(monthlyEMII);
    setTotalInterest(totalInterestI);
  };

  const handlePrint = () => {
    setShowParticles(false);
    setTimeout(() => {
      window.print();
      setShowParticles(true);
    }, [500]);
  };

  return (
    <div style={{ background: "", width: "100%", height: "100vh" }}>
      {showParticles && <Particle />}
      <div
        style={{
          textAlign: "center",
          fontFamily: "Sixtyfour, sans-serif",
          fontSize: "32px",
          marginTop: "40px",
          backgroundColor: "#E5F9F5",
          color: "#00d09b",
          width: "500px",
          height: "50px",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "15px",
          paddingTop: "10px",
        }}
      >
        EMI Calculator
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <div className="app">
          <div>
            <Calculator
              inputLoanAmount={loanAmount}
              inputTenure={tenure}
              inputInterest={interest}
              onChange={handleChange}
            />
          </div>
        </div>
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "5px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <PieChart loanAmount={loanAmount} totalInterest={totalInterest} />
        </div>
      </div>
      <div style={{ marginTop: "50px", padding:"0px 60px" }}>
        <BarChart
          interest={interest}
          loanAmount={loanAmount}
          monthlyEmi={monthlyEMI}
          tenure={tenure}
          totalInterest={totalInterest}
        />
      </div>

      <div>
        {showParticles && <div onClick={handlePrint} style={{display:"flex", justifyContent:"center", paddingBottom:"50px", paddingTop:"50px"}}>
          <img src={downloadIcon} style={{width:"35px", cursor:"pointer"}} />
        </div>}
      </div>
    </div>
  );
}

export default App;
