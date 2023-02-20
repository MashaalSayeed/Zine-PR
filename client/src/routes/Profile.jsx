import { Box, Button, Container, Divider, Typography } from "@mui/material";
import axios from "axios";
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signout } from "../state/authSlice";


const Profile = () => {
    const auth = useSelector((state) => state.auth);
    console.log(auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/logout');
            if (res.status === 200) {
                dispatch(signout());
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container component="main" sx={{ mt: 4 }}>
            <Typography component="h2" variant="h2">Profile</Typography>
            <Divider />
            <Box sx={{ mt: 2 }}>
                <Typography>{ auth.user.username }</Typography>
                <Button variant="contained" color="error" onClick={onLogout}>Logout</Button>
            </Box>
        </Container>
    )
}

export default Profile;