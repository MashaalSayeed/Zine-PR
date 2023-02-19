import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar"
import Dashboard from "./routes/Dashboard";
import Home from './routes/Home';
import Login from "./routes/Login";
import Signup from "./routes/Signup";

const PrivateRoute = () => {
    const isAuth = false;
    return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>
}

const GuestRoute = () => {
    const isAuth = false;
    return <>{!isAuth ? <Outlet /> : <Navigate to="/profile" />}</>
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
                        <Route path="/profile" element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;