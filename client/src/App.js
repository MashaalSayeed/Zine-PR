import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux'


import Navbar from "./components/Navbar"
import Profile from "./routes/Profile";
import Home from './routes/Home';
import Login from "./routes/Login";
import Signup from "./routes/Signup";

const PrivateRoute = () => {
    const { isAuthenticated } = useSelector(state => state.auth);
    return <>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</>
}

const GuestRoute = () => {
    const { isAuthenticated } = useSelector(state => state.auth);
    return <>{!isAuthenticated ? <Outlet /> : <Navigate to="/profile" />}</>
}

const App = (props) => {
    const theme = createTheme({
        pallete: {
            primary: {
                main: "#ffffff"
            },
            secondary: {
                main: "#000000"
            }
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact path="" element={<Home />} />
                    <Route element={<GuestRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;