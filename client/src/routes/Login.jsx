import React, { useState } from "react"
import { Box, TextField, Typography, Button, Container, Paper, Alert } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../state/authSlice";
import axios from 'axios'

const Login = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const defaultLocalState = { email: "", password: "" };
    const [localState, setLocalState] = useState(defaultLocalState);
    const [message, setMessage] = useState(location.state || "");
    const [error, setError] = useState("")

    const onChange = (e) => {
        e.preventDefault();
        setLocalState({ ...localState, [e.target.id]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (localState.email === "" || localState.password === "") {
                setError("Email ID and Password cannot be blank.");
                return;
            }

            const res = await axios.post("/auth/login", localState);
            setLocalState(defaultLocalState);

            if (res.status === 200) {
                dispatch(signin(res.data));
                navigate("/profile");
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <Container component="main" maxWidth="sm" sx={{ height: "100%", paddingTop: 1}}>
            {
                message && <Alert onClose={() => setMessage("")}>{message}</Alert>
            }
            {
                error && <Alert onClose={() => setError("")} severity="error">{error}</Alert>
            }
            <Paper sx={{ paddingTop: 2, paddingBottom: 2, marginTop: 8 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography component="h1" variant="h4">
                    <b>LOGIN</b>
                </Typography>

                <Box component="form" className="form">
                    <TextField
                        margin="normal"
                        required
                        label="Email Address"
                        id="email"
                        value={localState.email}
                        fullWidth
                        autoComplete="email"
                        variant="standard"
                        onChange={onChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Password"
                        id="password"
                        value={localState.password}
                        fullWidth
                        autoComplete="password"
                        variant="standard"
                        type="password"
                        onChange={onChange}
                    />
                    <Typography style={{ margin: '4px 0' }}>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </Typography>
                    <br />
                    <Button type="submit" fullWidth variant="contained" onClick={onSubmit} style={{ margin: '8px 0' }}>Login</Button>
                </Box>
            </Box>
            </Paper>
        </Container>
    )
}

export default Login;