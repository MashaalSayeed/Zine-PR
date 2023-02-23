import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { CircularProgress } from "@mui/material";

const PrivateRoute = () => {
    const { isAuthenticated } = useSelector(state => state.auth);
    return <>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</>
}

const GuestRoute = () => {
    const { isAuthenticated } = useSelector(state => state.auth);
    return <>{!isAuthenticated ? <Outlet /> : <Navigate to="/profile" />}</>
}

const App = (props) => {
    const { palette } = createTheme();
    const { augmentColor } = palette;
    const createColor = (mainColor) => augmentColor({ color: { main: mainColor } })
    const theme = createTheme({
        palette: {
            white: createColor("#ffffff"),
            black: createColor("#000000")
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

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/category/all')
                console.log(res.data.categories)
                setCategories(res.data.categories);
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Navbar />

                {
                    categories.length ? 
                    <Routes>

                        <Route exact path="" element={<Home categories={categories} />} />
                        <Route path="/search/*" element={<Search categories={categories} />} />
                        <Route path="/product/:productid" element={<Product categories={categories} />} />

                        <Route element={<GuestRoute />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </Route>

                        <Route element={<PrivateRoute />}>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/create" element={<CreateProduct categories={categories} />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes> :
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" , height: "90%"}}>
                        <CircularProgress color="inherit" />
                    </div>
                }
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;