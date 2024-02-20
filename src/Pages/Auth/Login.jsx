import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/EMI-logo1.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © EMIBuddy"}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = () => {
  const API_ENDPOINT = import.meta.env.VITE_BASE_URL;

  const [cookie, setCookie] = useCookies(["auth_token", "user_id"]);
  const navigate = useNavigate();
  const [errorMsg, setErrMsg] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      setErrMsg("");
      const data = new FormData(event.currentTarget);
      const body = {
        email: data.get("email"),
        password: data.get("password"),
      };
      const resp = await axios.post(`${API_ENDPOINT}login`, body);
      setCookie("auth_token", resp?.data.token);
      setCookie("user_id", resp?.data.userId);
      navigate("/calculator");
    } catch (error) {
      console.log(error);
      setErrMsg(error?.response?.data.message);
    }
    setLoading(false);
  };

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
          <div className="flex flex-col justify-center items-center bg-white w-[500px] mx-auto mt-32 rounded-3xl">
            <img src={logo} style={{ width: "400px" }} />
            <div
              className="text-4xl font-semibold text-teal-900"
              style={{ fontFamily: "Sixtyfour, sans-serif" }}
            >
              EMI Buddy
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "green" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errorMsg && <span className="text-red-500">{errorMsg}</span>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ background: "#525252" }}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <span className="text-sm text-blue-500">Don't have an account?</span>
                  <Link
                    href="/signup"
                    className="cursor-pointer"
                    variant="body2"
                  >
                    {" Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
