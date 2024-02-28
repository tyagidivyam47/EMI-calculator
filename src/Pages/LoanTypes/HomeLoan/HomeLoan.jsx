import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Calculator from "../../../Components/Calculator";
import { primaryColor, secondaryColor, tertiaryColor } from "../../../Theme";
import { Doughnut } from "react-chartjs-2";
import InputCalculator from "../../../Components/InputCalculator";
import PaymentList from "../../../Components/PaymentList";

const HomeLoan = ({ currency }) => {
  // console.log(currency);
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(5);
  const [interest, setInterest] = useState(6.5);
  const [monthlyEMI, setMonthlyEMI] = useState();
  const [totalInterest, setTotalInterest] = useState();
  const [loanCharges, setLoanCharges] = useState(0);
  const [advancedInfo, setAdvancedInfo] = useState({
    hv: 1000000,
    dp: 0,
    li: 0,
    loanCharges: 0,
    propertyTaxes: 0,
    homeInsurance: 0,
    maintenence: 0,
  });
  const [errorMsg, setErrorMsg] = useState();
  const [unfilled, setUnfilled] = useState(false);
  const [accOpen, setAccOpen] = useState(false);
  const [monthlyPayList, setMonthlyPayList] = useState([
    {
      key: "EMI",
      value: 19566,
    },
    {
      key: "Property Taxes",
      value: 0,
    },
    {
      key: "Home Insurance",
      value: 0,
    },
    {
      key: "Maintenance Expenses",
      value: 0,
    },
    {
      key: "Total Monthly Payment	",
      value: 19566,
    },
  ]);

  const [totalPayList, setTotalPayList] = useState([
    {
      key: "Down Payment, Fees & One-time Expenses",
      value: 0,
    },
    {
      key: "Principal",
      value: 1000000,
    },
    {
      key: "Interest",
      value: 0,
    },
    {
      key: "Taxes, Home Insurance & Maintenance",
      value: 0,
    },
    {
      key: "Total of all Payments	",
      value: 1000000,
    },
  ]);

  const setTable = (emi, taxes, insurance, maintenence) => {
    const total = emi + taxes + insurance + maintenence;
    setMonthlyPayList([
      {
        key: "EMI",
        value: emi,
      },
      // {
      //   key: "Monthly Extra Pay",
      //   value: extraPay,
      // },
      {
        key: "Property Taxes",
        value: taxes,
      },
      {
        key: "Home Insurance",
        value: insurance,
      },
      {
        key: "Maintenance Expenses",
        value: maintenence,
      },
      {
        key: "Total Monthly Payment	",
        value: total,
      },
    ]);
  };

  const setTotalTable = (
    oneTime,
    principal,
    interestLocal,
    TaxInsurMain
  ) => {
    const total =
      +oneTime + +principal + +interestLocal + +TaxInsurMain;
    setTotalPayList([
      {
        key: "Down Payment, Fees & One-time Expenses",
        value: oneTime,
      },
      {
        key: "Principal",
        value: principal,
      },
      {
        key: "Interest",
        value: interestLocal,
      },
      {
        key: "Taxes, Home Insurance & Maintenance",
        value: TaxInsurMain,
      },
      {
        key: "Total of all Payments	",
        value: total,
      },
    ]);
  };

  const getData = (
    loanAmountI,
    tenureI,
    interestI,
    monthlyEMII,
    totalInterestI
  ) => {

    setLoanAmount(+loanAmountI);
    setTenure(+tenureI);
    setInterest(+interestI);
    setMonthlyEMI(+monthlyEMII);
    setTotalInterest(+totalInterestI);
    setTotalTable(
      totalPayList[0].value,
      +loanAmountI,
      +totalInterestI,
      totalPayList[3].value
    );
    setTable(
      +monthlyEMII,
      monthlyPayList[1].value,
      monthlyPayList[2].value,
      monthlyPayList[3].value,
      // monthlyPayList[4].value
    );
  };

  const submitHandler = () => {
    const {
      hv,
      dp,
      li,
      loanCharges,
      propertyTaxes,
      homeInsurance,
      maintenence,
    } = advancedInfo;

    if (dp >= hv) {
      setUnfilled(true);
      setErrorMsg("Home Value should always be greater than Down Payment");
      return;
    }
    if(li >= hv){
      setUnfilled(true);
      setErrorMsg("Loan Insurance can not be greater than Home Value");
      return;
    }
    if(loanCharges >= hv){
      setUnfilled(true);
      setErrorMsg("Loan fees & Charges can not be greater than Home Value");
      return;
    }
    if(propertyTaxes >= hv){
      setUnfilled(true);
      setErrorMsg("Property Taxes can not be greater than Home Value");
      return;
    }
    if(homeInsurance >= hv){
      setUnfilled(true);
      setErrorMsg("Home Insurance can not be greater than Home Value");
      return;
    }
    if(maintenence >= hv){
      setUnfilled(true);
      setErrorMsg("Maintenence can not be greater than Home Value");
      return;
    }

    const hvNumber = parseInt(hv, 10);
    const dpNumber = parseInt(dp, 10) || 0;
    const liNumber = parseInt(li, 10) || 0;
    const loanChargesNumber = parseInt(loanCharges, 10);
    setLoanCharges(loanChargesNumber);
    console.log(liNumber)
    const tempLoanAmount = hvNumber + liNumber - dpNumber;
    // console.log(tempLoanAmount);
    setLoanAmount(tempLoanAmount);
    setTotalTable(
      loanChargesNumber + dpNumber,
      totalPayList[1].value,
      totalPayList[2].value,
      +(propertyTaxes * tenure) +
      +(homeInsurance * tenure) +
      +(maintenence * 12 * tenure)
    );
    setTable(
      monthlyPayList[0].value,
      propertyTaxes / 12,
      homeInsurance / 12,
      maintenence
      // propertyTaxes / 12,
    );
  };

  // console.log(advancedInfo)

  // useEffect(()=>{
  //   setAdvancedInfo({ ...advancedInfo, ['hv']: e.target.value });
  // },[loanAmount])

  const advancedChangeHandler = (e) => {
    if((e.target.name === 'hv' || e.target.name === 'dp') && e.target.value > 99999999999){
      return;
    }
    if (e.target.value / 10 < 1) {
      setAdvancedInfo({
        ...advancedInfo,
        [e.target.name]: null,
      });
      return;
    }

    setAdvancedInfo({ ...advancedInfo, [e.target.name]: +e.target.value });
  };

  // console.log(loanAmount)

  useEffect(() => {
    setTimeout(() => {
      setUnfilled(false);
    }, [4000]);
  }, [unfilled]);

  return (
    <Box sx={{ marginLeft: "auto" }}>
      {unfilled && (
        <div className="absolute bottom-3 right-5">
          <Alert variant="filled" severity="error">
            {errorMsg}
          </Alert>
        </div>
      )}
      <Box
        sx={{ marginBottom: "50px", marginLeft: "50px", marginRight: "50px" }}
      >
        <Accordion
          sx={{ minHeight: "80px", borderRadius: "10px" }}
          onChange={() => {
            setAccOpen(!accOpen);
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#FFFFFF" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight: "80px",
              font: "500 28px Raleway, serif",
              color: "#FFFFFF",
              background:
                "linear-gradient(90deg, rgba(80,178,234,1) 88%, rgba(255,141,0,1) 100%)",
              // borderRadius: "10px",
            }}
          >
            Advanced Details
          </AccordionSummary>
          <AccordionDetails sx={{ borderRadius: 10 }}>
            <div style={{ borderRadius: 10 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                  gap: "50px",
                  rowGap: "20px",
                  marginTop: "10px",
                }}
              >
                <TextField
                  name="hv"
                  value={advancedInfo.hv}
                  label={`Home Value(HV) in ${currency}`}
                  onChange={advancedChangeHandler}
                  onFocus={(e) => e.target.select()}
                  type="number"
                />
                <TextField
                  name="dp"
                  value={advancedInfo.dp}
                  label={`Down Payment (DP) in ${currency}`}
                  onChange={advancedChangeHandler}
                  onFocus={(e) => e.target.select()}
                  type="number"
                />
                <TextField
                  name="li"
                  value={advancedInfo.li}
                  label={`Loan Insurance (LI) in ${currency}`}
                  onChange={advancedChangeHandler}
                  onFocus={(e) => e.target.select()}
                  type="number"
                />
                <TextField
                  name="loanCharges"
                  value={advancedInfo.loanCharges}
                  label={`Loan Fees & Charges in ${currency}`}
                  onChange={advancedChangeHandler}
                  onFocus={(e) => e.target.select()}
                  type="number"
                />
                <TextField
                  name="propertyTaxes"
                  value={advancedInfo.propertyTaxes}
                  label={`Property Taxes / year in ${currency}`}
                  onChange={advancedChangeHandler}
                  onFocus={(e) => e.target.select()}
                  type="number"
                />
                <TextField
                  name="homeInsurance"
                  value={advancedInfo.homeInsurance}
                  label={`Home Insurance / year in ${currency}`}
                  onChange={advancedChangeHandler}
                  onFocus={(e) => e.target.select()}
                  type="number"
                />
                <TextField
                  name="maintenence"
                  value={advancedInfo.maintenence}
                  label={`Maintenance Expenses / month in ${currency}`}
                  onChange={advancedChangeHandler}
                  onFocus={(e) => e.target.select()}
                  type="number"
                />
                {/* <TextField label={"Home Value(HV)"} /> */}
              </div>
              <div
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  justifyContent: "center",
                  marginTop: "15px",
                  gap: "10px",
                }}
              >
                <Button onClick={submitHandler} variant="contained">
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    setAdvancedInfo({
                      hv: 0,
                      dp: 0,
                      li: 0,
                      loanCharges: 0,
                      propertyTaxes: 0,
                      homeInsurance: 0,
                      maintenence: 0,
                    });
                  }}
                  variant="outlined"
                >
                  Reset
                </Button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box
        sx={{
          background: "",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "150px",
        }}
        style={{
          // maxWidth: "500px",
          // border: `2px solid ${secondaryColor}`,
          padding: "20px",
          borderRadius: 20,
        }}
      >
        <div
          style={{
            height: "316px",
            width: "350px",
            background: "#FFFFFF",
            borderRadius: 6,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #d3d3d3",
          }}
        >
          <InputCalculator
            amountLabel={"Loan Amount (HV + LI – DP)"}
            rateOfInterest={interest}
            tenure={tenure}
            totalLoanAmount={loanAmount}
            sendData={getData}
            disableAmount={accOpen}
            currency={currency}
          />
        </div>
        <div>
          <PaymentList paymentList={monthlyPayList} currency={currency} />
        </div>
      </Box>

      <Box sx={{ paddingX: "50px" }}>
        <PaymentList paymentList={totalPayList} currency={currency} />
      </Box>

      <Box display={"flex"} justifyContent={"center"} marginTop={"20px"}>
        {advancedInfo.dp && loanCharges && <Box>
          <Doughnut
            data={{
              labels: ["Down Payment", "Loan Charges"],
              datasets: [
                {
                  label: "1 Time Expenses",
                  data: [advancedInfo.dp, loanCharges],
                  backgroundColor: [primaryColor, secondaryColor],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "One Time Expenses",
                },
              },
            }}
          />
        </Box>}

        <Box>
          <Doughnut
            data={{
              labels: [
                "Principal Amount",
                "Total Interest",
                "One Time Expenses",
              ],
              datasets: [
                {
                  label: "1 Time Expenses",
                  data: [
                    loanAmount,
                    totalInterest,
                    advancedInfo.loanCharges + advancedInfo.dp,
                  ],
                  backgroundColor: [
                    primaryColor,
                    secondaryColor,
                    tertiaryColor,
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Total of all payments",
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HomeLoan;
