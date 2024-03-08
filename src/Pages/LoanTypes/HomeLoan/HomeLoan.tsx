import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Calculator from "../../../Components/Calculator";
import {
  labelFont,
  mainHeadingSm,
  primaryColor,
  secondaryBgColor,
  secondaryColor,
  tertiaryColor,
} from "../../../Theme";
import { Doughnut } from "react-chartjs-2";
import InputCalculator from "../../../Components/InputCalculator";
import PaymentList from "../../../Components/PaymentList";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IRootState } from "../../../store";

const HomeLoan = () => {
  // console.log(currency);
  const currency = useSelector((state: IRootState) => state.currency.currency);
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(5);
  const [interest, setInterest] = useState(6.5);
  const [monthlyEMI, setMonthlyEMI] = useState<number>();
  const [totalInterest, setTotalInterest] = useState<number>();
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
  const [errorMsg, setErrorMsg] = useState<string>();
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

  const setTable = (emi: any, taxes: any, insurance: any, maintenence: any) => {
    const total = emi + taxes + insurance + maintenence;
    setMonthlyPayList([
      {
        key: "EMI",
        value: emi || 0,
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
    oneTime: any,
    principal: any,
    interestLocal: any,
    TaxInsurMain: any
  ) => {
    // console.log(interestLocal)
    const total = +oneTime + +principal + +interestLocal + +TaxInsurMain;
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
        value: interestLocal || 0,
      },
      {
        key: "Taxes, Home Insurance & Maintenance",
        value: TaxInsurMain,
      },
      {
        key: "Total of all Payments	",
        value: total || 0,
      },
    ]);
  };

  const getData = (
    loanAmountI: any,
    tenureI: any,
    interestI: any,
    monthlyEMII: any,
    totalInterestI: any
  ) => {
    // console.log(tenureI)
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
      monthlyPayList[3].value
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
    if (li >= hv) {
      setUnfilled(true);
      setErrorMsg("Loan Insurance can not be greater than Home Value");
      return;
    }
    if (loanCharges >= hv) {
      setUnfilled(true);
      setErrorMsg("Loan fees & Charges can not be greater than Home Value");
      return;
    }
    if (propertyTaxes >= hv) {
      setUnfilled(true);
      setErrorMsg("Property Taxes can not be greater than Home Value");
      return;
    }
    if (homeInsurance >= hv) {
      setUnfilled(true);
      setErrorMsg("Home Insurance can not be greater than Home Value");
      return;
    }
    if (maintenence >= hv) {
      setUnfilled(true);
      setErrorMsg("Maintenence can not be greater than Home Value");
      return;
    }

    const hvNumber = +hv;
    const dpNumber = +dp || 0;
    const liNumber = +li || 0;
    const loanChargesNumber = +loanCharges;
    setLoanCharges(loanChargesNumber);
    // console.log(liNumber);
    const tempLoanAmount = hvNumber + liNumber - dpNumber;
    // console.log(tenure);
    setLoanAmount(tempLoanAmount);
    // if()
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

  // useEffect(()=>{
  //   setAdvancedInfo({ ...advancedInfo, ['hv']: e.target.value });
  // },[loanAmount])

  const advancedChangeHandler = (e: any) => {
    if (
      (e.target.name === "hv" || e.target.name === "dp") &&
      e.target.value > 99999999999
    ) {
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

  // console.log(+advancedInfo.loanCharges + +advancedInfo.dp)

  useEffect(() => {
    setTimeout(() => {
      setUnfilled(false);
    }, 4000);
  }, [unfilled]);

  return (
    <Box
      sx={{
        background: secondaryBgColor,
        border: "8px solid #FFFFFF",
        width: { xl: "80%", lg: "80%", xs: "100%" },
        padding: "10px",
        marginTop: "30px",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5,
      }}
    >
      <Box
        sx={{ font: mainHeadingSm, textAlign: "center", marginBottom: "50px" }}
      >
        Home Loan Calulator
      </Box>
      {unfilled && (
        <div className="absolute bottom-3 right-5">
          <Alert variant="filled" severity="error">
            {errorMsg}
          </Alert>
        </div>
      )}
      <Box
        sx={{ marginBottom: "50px", marginLeft: "18px", marginRight: "18px" }}
      >
        <Accordion
          sx={{ minHeight: "80px" }}
          onChange={() => {
            setAccOpen(!accOpen);
          }}
          style={{ borderRadius: 20 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#FFFFFF" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight: "80px",
              font: "500 22px Raleway, serif",
              // color: "#FFFFFF",
              background: "#ffffff",
              fontWeight: 600,
              borderRadius: 10,
              maxHeight: "10px",
            }}
          >
            <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
              <div>Advanced Details </div>
              <div>
                {!accOpen && (
                  <span style={{}}>
                    <AddIcon style={{ fontWeight: 900, fontSize: "28px" }} />
                  </span>
                )}
                {accOpen && (
                  <span style={{}}>
                    <RemoveIcon style={{ fontWeight: 900, fontSize: "28px" }} />
                  </span>
                )}
              </div>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ borderRadius: 10 }}>
            <div style={{ borderRadius: 10 }}>
              <Box
                sx={{
                  // display: "flex",
                  // justifyContent: "space-evenly",
                  // flexWrap: "wrap",
                  // rowGap: "20px",
                  // marginTop: "10px",
                  display: "grid",
                  gridTemplateColumns: {
                    lg: "auto auto auto auto",
                    md: "auto auto auto",
                    sm: "auto auto",
                    xs: "auto",
                  },
                  gap: "12px",
                  rowGap: "15px",
                }}
              >
                <div>
                  <div style={{ font: labelFont, marginBottom: "6px" }}>
                    Home Value (HV)
                  </div>
                  <TextField
                    name="hv"
                    value={advancedInfo.hv}
                    label={null}
                    onChange={advancedChangeHandler}
                    onFocus={(e) => e.target.select()}
                    type="number"
                    InputProps={{
                      style: { height: "41px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <div
                            style={{
                              background: "#e7edf6",
                              height: "41px",
                              width: "40px",
                              marginLeft: "-13px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: primaryColor,
                            }}
                          >
                            {currency}
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div>
                  <div style={{ font: labelFont, marginBottom: "6px" }}>
                    Down Payment (DP)
                  </div>
                  <TextField
                    name="dp"
                    value={advancedInfo.dp}
                    label={null}
                    onChange={advancedChangeHandler}
                    onFocus={(e) => e.target.select()}
                    type="number"
                    InputProps={{
                      style: { height: "41px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <div
                            style={{
                              background: "#e7edf6",
                              height: "41px",
                              width: "40px",
                              marginLeft: "-13px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: primaryColor,
                            }}
                          >
                            {currency}
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div>
                  <div style={{ font: labelFont, marginBottom: "6px" }}>
                    Loan Insurance (LI)
                  </div>
                  <TextField
                    name="li"
                    value={advancedInfo.li}
                    label={null}
                    onChange={advancedChangeHandler}
                    onFocus={(e) => e.target.select()}
                    type="number"
                    InputProps={{
                      style: { height: "41px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <div
                            style={{
                              background: "#e7edf6",
                              height: "41px",
                              width: "40px",
                              marginLeft: "-13px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: primaryColor,
                            }}
                          >
                            {currency}
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div>
                  <div style={{ font: labelFont, marginBottom: "6px" }}>
                    Loan Fees & Charges
                  </div>
                  <TextField
                    name="loanCharges"
                    value={advancedInfo.loanCharges}
                    label={null}
                    onChange={advancedChangeHandler}
                    onFocus={(e) => e.target.select()}
                    type="number"
                    InputProps={{
                      style: { height: "41px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <div
                            style={{
                              background: "#e7edf6",
                              height: "41px",
                              width: "40px",
                              marginLeft: "-13px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: primaryColor,
                            }}
                          >
                            {currency}
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div>
                  <div style={{ font: labelFont, marginBottom: "6px" }}>
                    Property Taxes / year
                  </div>
                  <TextField
                    name="propertyTaxes"
                    value={advancedInfo.propertyTaxes}
                    label={null}
                    onChange={advancedChangeHandler}
                    onFocus={(e) => e.target.select()}
                    type="number"
                    InputProps={{
                      style: { height: "41px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <div
                            style={{
                              background: "#e7edf6",
                              height: "41px",
                              width: "40px",
                              marginLeft: "-13px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: primaryColor,
                            }}
                          >
                            {currency}
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div>
                  <div style={{ font: labelFont, marginBottom: "6px" }}>
                    Home Insurance / year
                  </div>
                  <TextField
                    name="homeInsurance"
                    value={advancedInfo.homeInsurance}
                    label={null}
                    onChange={advancedChangeHandler}
                    onFocus={(e) => e.target.select()}
                    type="number"
                    InputProps={{
                      style: { height: "41px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <div
                            style={{
                              background: "#e7edf6",
                              height: "41px",
                              width: "40px",
                              marginLeft: "-13px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: primaryColor,
                            }}
                          >
                            {currency}
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div>
                  <div style={{ font: labelFont, marginBottom: "6px" }}>
                    Maintenance Expenses / month
                  </div>
                  <TextField
                    name="maintenence"
                    value={advancedInfo.maintenence}
                    label={null}
                    onChange={advancedChangeHandler}
                    onFocus={(e) => e.target.select()}
                    type="number"
                    InputProps={{
                      style: { height: "41px" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <div
                            style={{
                              background: "#e7edf6",
                              height: "41px",
                              width: "40px",
                              marginLeft: "-13px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: primaryColor,
                            }}
                          >
                            {currency}
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    // marginLeft: "auto",
                    justifyContent: "center",
                    marginTop: "22px",
                    gap: "10px",
                  }}
                >
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
                  <Button
                    onClick={submitHandler}
                    variant="contained"
                    sx={{ height: "40px" }}
                  >
                    Submit
                  </Button>
                </div>
                {/* <TextField label={"Home Value(HV)"} /> */}
              </Box>
            </div>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box
        sx={{
          background: "",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          alignItems: "center",
          rowGap: "20px",
          // gap: "150px",
        }}
      >
        <Box
          sx={{
            height: "266px",
            width: { lg: "300px", md: "300", xs: "350px" },
            background: "#FFFFFF",
            borderRadius: 6,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #d3d3d3",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
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
        </Box>
        <div style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
          <PaymentList paymentList={monthlyPayList} currency={currency} />
        </div>

        <Box sx={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
          <PaymentList paymentList={totalPayList} currency={currency} />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"center"} marginTop={"20px"}>
        {advancedInfo.dp && loanCharges && (
          <Box>
            <Doughnut
              data={{
                labels: ["Down Payment", "Loan Charges"],
                datasets: [
                  {
                    // label: "1 Time Expenses",
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
          </Box>
        )}

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
                    +advancedInfo.loanCharges + +advancedInfo.dp,
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
