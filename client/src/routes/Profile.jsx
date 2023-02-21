import { Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../state/authSlice";


const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/logout');
        } catch (error) {
            console.error(error);
        }

        dispatch(signout());
        navigate('/');
    }

    return (
        <Container component="main" sx={{ mt: 4 }}>
            <Typography component="h2" variant="h3">Profile</Typography>
            <hr />
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Welcome {user.username}!</Typography>
                <br />
                <Typography>Email: { user.email }</Typography>
                <br />
                <Button component={Link} to="/create" variant="contained" color="info">Create New Product</Button>
                <Button variant="contained" color="error" onClick={onLogout}>Logout</Button>
            </Box>

        </Container>
    )
}

export default Profile;