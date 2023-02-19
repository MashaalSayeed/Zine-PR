import React, { useState } from "react"
import { Box, TextField, Typography, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
//import { useDispatch } from "react-redux";
import axios from "axios";


const Signup = () => {
    const [localState, setLocalState] = useState({
        username: "",
        email: "",
        password: ""
    });

    //const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => {
        e.preventDefault();
        setLocalState({ ...localState, [e.target.id]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (localState.email === "" || localState.password === "" || localState.username === "") {
                window.alert("Fields cannot be blank.");
                return;
            }

            const res = await axios.post("/auth/signup", localState);
            // setLocalState(defaultLocalState);

            if (res.status === 200) {
                console.log(res.data)
                navigate("/login");
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
                    <b>SIGN UP</b>
                </Typography>

                <Box component="form" className="form" noValidate>
                    <TextField
                        margin="normal"
                        required
                        label="Username"
                        id="username"
                        fullWidth
                        autoComplete="username"
                        variant="standard"
                        onChange={onChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Email Address"
                        id="email"
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
                        fullWidth
                        autoComplete="password"
                        variant="standard"
                        type="password"
                        onChange={onChange}
                    />
                    <Typography style={{ margin: '4px 0' }}>
                        Already Have An Account? <Link to="/login">Login</Link>
                    </Typography>
                    <br />
                    <Button type="submit" fullWidth variant="contained" onClick={onSubmit} style={{ margin: '8px 0' }}>Sign Up</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Signup;