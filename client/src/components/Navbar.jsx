import React from "react"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
import { Button, CssBaseline } from "@mui/material";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
// import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const { isAuthenticated } = useSelector(state => state.auth);
    return (
        <AppBar position="relative">
            <CssBaseline />
            <Toolbar className="black">
                { /*<IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                ></IconButton>*/ }
                <Typography variant="h5" color="inherit" component={Link} to="/" sx={{ flexGrow: 1 }}>
                    Zine Product Review
                </Typography>

                {isAuthenticated ?
                    <Button color="inherit" to="/profile" component={Link}>Profile</Button> :
                    <Button color="inherit" to="/login" component={Link}>Login</Button>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar