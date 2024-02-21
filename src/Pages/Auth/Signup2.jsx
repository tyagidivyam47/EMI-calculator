import {
  Alert,
  Box,
  Button,
  CssBaseline,
  Grid,
  Modal,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
// import { Container } from "postcss";
import Container from "@mui/material/Container";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { primaryColor, secondaryColor } from "../../Theme";
import { useCookies } from "react-cookie";
import { verifyInput } from "../../input-validation";


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

const Signup2 = ({ first_name, last_name, email, phone }) => {
  const API_ENDPOINT = import.meta.env.VITE_BASE_URL;

  const [cookie, setCookie] = useCookies(["auth_token", "user_id"]);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState();
  const [unfilled, setUnfilled] = useState(false);
  const [details, setDetails] = useState({
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone: phone,
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [succModal, setSuccModal] = useState(false);

  const inputChangeHandler = (e) => {
    setDetails({ ...details, ["password"]: e.target.value });
  };

  const submitClickHandler = async (e) => {
    e.preventDefault();
    try {
      if (details.password !== confirmPassword) {
        setUnfilled(true);
        setErrorMsg("Passwords do not match");
        return;
      }
      if (details.password.length < 8) {
        setUnfilled(true);
        setErrorMsg("Password length should be greater than 8");
        return;
      }
      const passValid = verifyInput(details.password, 'pass');
      if(!passValid){
        setUnfilled(true);
        setErrorMsg("Password must contain 'Capital Letter' and 'Special Character'");
        return;
      }

      const response = await axios.post(`${API_ENDPOINT}signup`, details);
      // console.log(response)
      setCookie("auth_token", response?.data.token);
      setCookie("user_id", response?.data.userId);
      setSuccModal(true);
      //   navigate('/login');
    } catch (error) {
      console.log(error)
      setUnfilled(true);
      setErrorMsg(error.response.data.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setUnfilled(false);
    }, [4000]);
  }, [unfilled]);

  useEffect(() => {
    if (succModal) {
      setTimeout(() => {
        setSuccModal(false);
        navigate("/calculator");
      }, [2000]);
    }
  }, [succModal]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Modal open={succModal} onClose={() => setSuccModal(false)}>
          {/* <Fade in={true}> */}
          <Box sx={style} borderRadius={'20px'}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <div className="flex justify-center">
                <DoneAllIcon sx={{ color: "green", height:"100px", width:"100px" }} />
              </div>
              
            </Typography>
            <div className="text-center">
              <Typography id="transition-modal-description" sx={{ mt: 2, fontSize:"20px", fontWeight:"bold", color: secondaryColor }}>
                Account Created Successfully
              </Typography>
            </div>
          </Box>
          {/* </Fade> */}
        </Modal>

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
          <Typography component="h4" variant="h6">
            Create Your Password
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ width: "400px" }}
                  autoComplete="given-name"
                  name="password"
                  required
                  fullWidth
                  type="password"
                  value={details.password}
                  id="password"
                  label="Password"
                  autoFocus
                  onChange={inputChangeHandler}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="confPassword"
                  style={{ width: "400px", marginTop: "10px" }}
                  required
                  fullWidth
                  type="password"
                  //   value={confirmPassword}
                  id="confPassword"
                  label="Confirm Password"
                  autoFocus
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>

            <Button
              onClick={submitClickHandler}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              //   disabled={otpSuccess === "FAILURE" || !otpSuccess ? true : false}
            >
              Submit
            </Button>
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup2;
