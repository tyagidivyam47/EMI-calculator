import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  CssBaseline,
  Fade,
  Grid,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
// import { Container } from "postcss";
import Container from "@mui/material/Container";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { primaryColor } from "../../Theme";
import VisibilityIcon from '@mui/icons-material/Visibility';

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

const ForgotPassword = () => {
  const API_ENDPOINT = import.meta.env.VITE_BASE_URL;

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const token = params.get("token"); // Get the value of the 'name' parameter
  const id = params.get("id"); // Get the value of the 'age' parameter

  //   console.log(id,  " : ", token)

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState();
  const [unfilled, setUnfilled] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [succModal, setSuccModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = React.useState(false);

  const inputChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitClickHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setUnfilled(true);
        setErrorMsg("Passwords do not match");
        return;
      }
      if (password.length < 6) {
        setUnfilled(true);
        setErrorMsg("Password length should be greater than 6");
        return;
      }
      const body = {
        token,
        userId: id,
        password,
      };
      const response = await axios.put(`${API_ENDPOINT}resetPassword`, body);
      setSuccModal(true);
      //   navigate('/login');
    } catch (error) {
      setUnfilled(true);
      setErrorMsg(error.response.data.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setUnfilled(false);
    }, [3000]);
  }, [unfilled]);

  useEffect(() => {
    if (succModal) {
      setTimeout(() => {
        setSuccModal(false);
        navigate("/login");
      }, [2000]);
    }
  }, [succModal]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Modal open={succModal} onClose={() => setSuccModal(false)}>
          {/* <Fade in={true}> */}
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <div className="flex justify-center">
                <DoneAllIcon sx={{ color: "green" }} />
              </div>
              {/* <img src={DoneAllIcon} /> */}
            </Typography>
            <div className="text-center">
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Password Reset Successful <br />
                Login to continue
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
          <Avatar
            sx={{ m: 1, bgcolor: primaryColor, height: "70px", width: "70px" }}
          >
            <LockOutlinedIcon sx={{ height: "30px", width: "30px" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Your Password
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
                  value={password}
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
                  type={showPass ? "text" : "password"}
                  //   value={confirmPassword}
                  id="confPassword"
                  label="Confirm Password"
                  autoFocus
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><span onClick={() => setShowPass(!showPass)}><VisibilityIcon sx={{ cursor: "pointer" }} /></span></InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>

            <Button
              onClick={submitClickHandler}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: primaryColor }}
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

export default ForgotPassword;
