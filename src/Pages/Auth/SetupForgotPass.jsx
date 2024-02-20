import {
    Alert,
    Avatar,
    Backdrop,
    Box,
    Button,
    CssBaseline,
    Fade,
    Grid,
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const defaultTheme = createTheme();

const SetupForgotPass = () => {
    const API_ENDPOINT = import.meta.env.VITE_BASE_URL;

    const [errorMsg, setErrorMsg] = useState();
    const [unfilled, setUnfilled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const [success, setSuccess] = useState(false);

    const submitClickHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await axios.get(`${API_ENDPOINT}getPassResetLink/${email}`);
            setSuccess(true);
            setLoading(false);
        } catch (error) {
            setUnfilled(true);
            setErrorMsg(error.response.data.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setUnfilled(false);
        }, [3000]);
    }, [unfilled]);


    return (
        <ThemeProvider theme={defaultTheme}>
            <div className="flex h-full w-full">
                <Box
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://plus.unsplash.com/premium_photo-1681487746049-c39357159f69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "100vh",
                        width: "70%"
                    }}
                >
                    <div className="flex flex-col justify-center items-center bg-white w-[500px] mx-auto mt-32 rounded-3xl">
                        {/* <img src={logo} style={{ width: "400px" }} /> */}
                        <div
                            className="text-4xl font-semibold text-teal-900"
                            style={{ fontFamily: "Sixtyfour, sans-serif" }}
                        >
                            {/* EMI Buddy */}
                        </div>
                    </div>
                </Box>

                <Container component="main" maxWidth="xs" sx={{ marginTop: "5%" }}>
                    <CssBaseline />

                    {!success && <Box
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
                        <Avatar sx={{ m: 1, bgcolor: "#00d09b" }}>
                            <LockOutlinedIcon />
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
                                        name="email"
                                        required
                                        fullWidth
                                        type="email"
                                        value={email}
                                        id="email"
                                        label="Registered Email"
                                        autoFocus
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                onClick={submitClickHandler}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loading ? "Loading..." : "Submit"}
                            </Button>
                        </Box>
                    </Box>}

                    {success &&
                        <Box>
                            <div className="flex justify-center mt-16">
                                <CheckCircleIcon sx={{color:"green", width:"200px", height:"200px"}} />
                            </div>
                            <div className="text-center text-2xl font-semibold mt-4">
                                Password reset link has been sent to your mail. <br/>
                                Kindly check your mail.
                            </div>
                        </Box>
                    }
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default SetupForgotPass;
