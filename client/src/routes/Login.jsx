import React, { useState } from "react"
import { Box, TextField, Typography, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../state/authSlice";
import axios from 'axios'

const Login = () => {
    const defaultLocalState = {
        email: "",
        password: ""
    }
    const [localState, setLocalState] = useState(defaultLocalState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => {
        e.preventDefault();
        setLocalState({ ...localState, [e.target.id]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (localState.email === "" || localState.password === "") {
                window.alert("Email ID and Password cannot be blank.");
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
                window.alert(error.response.data.message);
            }
        }
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography component="h1" variant="h4">
                    <b>LOGIN</b>
                </Typography>

                <Box component="form" className="form" noValidate>
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
        </Container>
    )
}

export default Login;