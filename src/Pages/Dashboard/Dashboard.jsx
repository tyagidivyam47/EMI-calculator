import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import { primaryColor } from "../../Theme";

const Dashboard = () => {
  const defaultTheme = createTheme();
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
          <div
            style={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;",
            }}
            className="flex flex-col justify-center items-center bg-white w-[400px] mx-auto mt-32 rounded-3xl"
          >
            {/* <img src={logo} style={{ width: "400px" }} /> */}
            <div
              className="text-4xl font-semibold py-4"
              style={{
                fontFamily: "Sixtyfour, sans-serif",
                color: primaryColor,
              }}
            >
              Dashboard
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
            {/* <Avatar
              sx={{
                m: 1,
                bgcolor: primaryColor,
                height: "70px",
                width: "70px",
              }}
            >
              <LockOutlinedIcon sx={{ height: "30px", width: "30px" }} />
            </Avatar> */}
            {/* <Typography component="h1" variant="h5">
              Sign in
            </Typography> */}
            <Box component="form" noValidate sx={{ mt: 1 }}></Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Dashboard;
