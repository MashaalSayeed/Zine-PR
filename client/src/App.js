import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import Navbar from "./components/Navbar"
import Profile from "./routes/Profile";
import Home from './routes/Home';
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Search from './routes/Search';
import Product from "./routes/Product";
import CreateProduct from "./routes/CreateProduct";
import NotFound from "./routes/NotFound";

import { signout } from './state/authSlice';

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

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const expired = new Date(Date.now()) >= new Date(auth.expires);
    useEffect(() => {
      const main = () => {
        if (expired) dispatch(signout());
      };
      main();
    }, [dispatch, expired]);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Navbar />
                <Routes>

                    <Route exact path="" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/product" element={<Product />} />

                    <Route element={<GuestRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>
    
                    <Route element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/create" element={<CreateProduct />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;