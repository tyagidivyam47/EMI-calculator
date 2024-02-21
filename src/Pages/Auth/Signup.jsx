import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PhoneInput from "react-phone-input-2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "react-phone-input-2/lib/style.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../assets/EMI-logo1.png";
import { auth } from "../../Components/services/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Alert, Modal, Tooltip } from "@mui/material";
import Signup2 from "./Signup2";
import OTPInput from "react-otp-input";
import axios from "axios";
import { primaryColor, secondaryColor } from "../../Theme";
import { verifyInput } from "../../input-validation";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      EMI Buddy
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SignUp() {
  const API_ENDPOINT = import.meta.env.VITE_BASE_URL;

  const [errorMsg, setErrorMsg] = React.useState();
  const [phone, setPhone] = React.useState();
  const [getOtpClicked, setGetOtpClicked] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [otp, setOtp] = React.useState("");
  const [otpSuccess, setOtpSuccess] = React.useState(null);
  const [unfilled, setUnfilled] = React.useState(false);
  const [details, setDetails] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [showScreen2, setShowScreen2] = React.useState(false);
  const [blockOtp, setBlockOtp] = React.useState(false);
  const [counter, setCounter] = React.useState(40);
  const [otpLoading, setOtpLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [emailOtpSucc, setEmailOtpSucc] = React.useState(false);
  const [emailOtp, setEmailOtp] = React.useState();
  const [otpLoadingEmail, setOtpLoadingEmail] = React.useState(false);
  const [verifyLoading, setVerifyLoading] = React.useState(false);
  ("");

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "first_name" || name === "last_name") {
      if (value === " ") {
        return;
      }
      const nameValid = verifyInput(value, "name");
      if (!nameValid) {
        return;
      }
    }
    if (name === "email" && value === " ") {
      return;
    }
    setDetails({ ...details, [name]: value });
  };

  // console.log("details : ", details);

  const nextClickHandler = () => {
    if (
      details.first_name === "" ||
      details.last_name === "" ||
      details.email === ""
    ) {
      setErrorMsg("Please fill all the required fields");
      setUnfilled(true);
    } else {
      setShowScreen2(true);
    }
  };

  const sendEmailOtp = async () => {
    try {
      const emailValid = verifyInput(details.email, "email");
      if (!emailValid) {
        setErrorMsg("Enter a Valid Email");
        setUnfilled(true);
        return;
      }
      setOtpLoadingEmail(true);
      if (
        details.first_name === "" ||
        details.last_name === "" ||
        details.email === ""
      ) {
        setUnfilled(true);
        setErrorMsg("Fill all the madatory fields");
        setOtpLoadingEmail(false);
        return;
      }
      const response = await axios.get(
        `${API_ENDPOINT}generateOtp/${details.email}`
      );
      setOpenModal(true);

      setBlockOtp(true);
      setCounter(counter - 1);
      setOtpLoadingEmail(false);
    } catch (error) {
      setUnfilled(true);
      setErrorMsg("Error while sending OTP. Please try again after some time");
      console.log(error);
      setOtpLoadingEmail(false);
    }
  };

  const verifyEmailOtp = async () => {
    try {
      setVerifyLoading(true);
      if (emailOtp?.length < 6) {
        setUnfilled(true);
        setErrorMsg("Fill the OTP");
        return;
      }

      const body = {
        otp: emailOtp,
        email: details.email,
      };

      const response = await axios.put(`${API_ENDPOINT}verifyOtp`, body);
      setEmailOtpSucc(true);
      setOpenModal(false);
    } catch (error) {
      setUnfilled(true);
      setErrorMsg(error.response.data.message);
      console.log(error);
    }
    setVerifyLoading(false);
  };

  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(
        auth,
        `+${phone}`,
        recaptcha
      );
      console.log(confirmation);
      setUser(confirmation);
      setGetOtpClicked(true);
      setBlockOtp(true);
      setCounter(counter - 1);
    } catch (error) {
      setUnfilled(true);
      setErrorMsg("Error while sending OTP. Please try again after some time");
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (counter > 0 && counter < 40) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCounter(40);
    }
  }, [counter]);

  const verifyOtp = async () => {
    try {
      setOtpLoading(true);
      const data = await user.confirm(otp);
      console.log("data : ", data);
      if (data.user.accessToken) {
        setOtpSuccess("SUCCESS");
      }
    } catch (error) {
      setOtpSuccess("FAILURE");
      setUnfilled(true);
      setErrorMsg("Wrong OTP entered");
      console.log(error);
    }
    setOtpLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  React.useEffect(() => {
    setTimeout(() => {
      setUnfilled(false);
    }, [3000]);
  }, [unfilled]);

  React.useEffect(() => {
    setTimeout(() => {
      setBlockOtp(false);
    }, [40000]);
  }, [blockOtp]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1487088678257-3a541e6e3922?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col justify-center items-center mt-24">
            <img src={logo} style={{ width: "400px" }} />
            <div
              style={{ background: primaryColor }}
              className="flex flex-col justify-center items-center w-[400px] mx-auto rounded-xl"
            >
              <div
                className="text-4xl font-semibold py-2"
                style={{
                  fontFamily: "Sixtyfour, sans-serif",
                  color: "#FFFFFF",
                }}
              >
                EMI Buddy
              </div>
            </div>
          </div>
        </Grid>

        {!showScreen2 && (
          <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {unfilled && (
                <div className="absolute bottom-3 right-5">
                  <Alert variant="filled" severity="error">
                    {errorMsg}
                  </Alert>
                </div>
              )}
              <AccountCircleIcon
                sx={{ height: "70px", width: "70px", color: primaryColor }}
              />
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="first_name"
                      required
                      fullWidth
                      value={details.first_name}
                      id="first_name"
                      label="First Name"
                      autoFocus
                      onChange={inputChangeHandler}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      value={details.last_name}
                      onChange={inputChangeHandler}
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      onChange={inputChangeHandler}
                      value={details.email}
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ justifyContent: "center" }}>
                    {!otpLoadingEmail && (
                      <div className="flex">
                        <Button
                          style={{
                            margin: "auto",
                            marginTop: "10px",
                            borderColor: emailOtpSucc ? "green" : "",
                            color: emailOtpSucc ? "green" : "",
                          }}
                          variant="outlined"
                          onClick={sendEmailOtp}
                          disabled={blockOtp || emailOtpSucc}
                        >
                          {emailOtpSucc ? "Email Verified" : "Verify Email"}
                        </Button>
                      </div>
                    )}

                    {otpLoadingEmail && (
                      <div className="flex">
                        <Button
                          style={{
                            margin: "auto",
                            marginTop: "10px",
                            borderColor: emailOtpSucc ? "green" : "",
                            color: emailOtpSucc ? "green" : "",
                          }}
                          variant="outlined"
                          onClick={sendEmailOtp}
                          disabled
                        >
                          Loading...
                        </Button>
                      </div>
                    )}
                  </Grid>
                  {blockOtp && !emailOtpSucc && (
                    <div className="flex justify-center mx-auto mt-2">
                      Retry in {counter} seconds
                    </div>
                  )}
                  {/*<Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confPassword"
                  label="Confirm Password"
                  type="password"
                  id="confPassword"
                  autoComplete="confPassword"
                />
              </Grid> */}

                  <Grid item xs={12}>
                    <div className="flex hidden">
                      <PhoneInput
                        country={"in"}
                        inputStyle={{ height: "62px" }}
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                      />
                      <Tooltip
                        open={blockOtp}
                        title={`Wait for ${counter} seconds`}
                        placement="right"
                      >
                        <Button
                          onClick={sendOtp}
                          variant="outlined"
                          disabled={blockOtp}
                        >
                          Get OTP
                        </Button>
                      </Tooltip>
                    </div>
                    <div
                      className="flex mt-3 justify-center"
                      id="recaptcha"
                    ></div>
                  </Grid>
                  <Grid item xs={12}>
                    {getOtpClicked && (
                      <div className="flex flex-col items-center">
                        <TextField
                          onChange={(e) => setOtp(e.target.value)}
                          required
                          fullWidth
                          name="otp"
                          label="Enter the OTP"
                          type="otp"
                          id="otp"
                          autoComplete="otp"
                          style={{
                            border: `${
                              otpSuccess === "FAILURE"
                                ? "1px solid red"
                                : "1px solid green"
                            }`,
                          }}
                        />
                        <Button
                          className="ml-auto flex justify-center"
                          onClick={verifyOtp}
                          disabled={otpSuccess === "SUCCESS" ? true : false}
                        >
                          {otpSuccess === "SUCCESS"
                            ? "Verified"
                            : otpLoading
                            ? "Verifying..."
                            : "Verify"}
                        </Button>
                      </div>
                    )}
                  </Grid>
                </Grid>
                {/* {errorMsg && <span className="text-red-500">{errorMsg}</span>} */}

                <Button
                  onClick={nextClickHandler}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!emailOtpSucc}
                >
                  Submit
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <span className="text-sm text-blue-500">
                      Already have an account?{" "}
                    </span>
                    <Link
                      href="/login"
                      variant="body2"
                      className="cursor-pointer"
                    >
                      Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
              {/* <Fade in={true}> */}
              <Box sx={style} borderRadius={"20px"}>
                <Typography id="transition-modal-title">
                  <div className="text-center">
                    Enter the OTP sent to{" "}
                    <span
                      className="font-semibold"
                      style={{ color: secondaryColor }}
                    >
                      {details.email}
                    </span>
                  </div>
                  {/* <img src={DoneAllIcon} /> */}
                </Typography>
                <div className="flex justify-center">
                  <OTPInput
                    value={emailOtp}
                    onChange={setEmailOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    containerStyle={{ padding: "20px" }}
                    inputStyle={{
                      height: "55px",
                      width: "55px",
                      background: "#FFFFFF",
                      border: `1px solid ${primaryColor}`,
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: secondaryColor,
                    }}
                    inputType="number"
                    shouldAutoFocus
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    disabled={
                      !emailOtp || emailOtp?.length < 6 || verifyLoading
                    }
                    onClick={verifyEmailOtp}
                    variant="outlined"
                    sx={{ marginRight: "5px" }}
                  >
                    {verifyLoading ? "Verifying..." : "Verify"}
                  </Button>
                  {blockOtp && (
                    <Button disabled={blockOtp} variant="outlined">
                      Resend(
                      {counter} sec)
                    </Button>
                  )}
                  {!blockOtp && !otpLoadingEmail && (
                    <Button
                      onClick={sendEmailOtp}
                      disabled={blockOtp}
                      variant="outlined"
                    >
                      Resend
                    </Button>
                  )}
                  {otpLoadingEmail && <Button disabled>Loading...</Button>}
                </div>
              </Box>
              {/* </Fade> */}
            </Modal>
          </Container>
        )}

        {showScreen2 && (
          <Signup2
            first_name={details.first_name}
            last_name={details.last_name}
            email={details.email}
            phone={phone}
          />
        )}

        {/* <Signup2
          first_name={'Divyam'}
          last_name={'Tyagi'}
          email={'tyagidivyam47@gmail.com'}
          phone={919548114838}
        /> */}
      </Grid>
    </ThemeProvider>
  );
}
