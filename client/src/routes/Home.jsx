import React, { useState } from "react"
import { Box, Button, Container, Grid, TextField, Typography, useMediaQuery } from "@mui/material";
import shopimg from "../assets/images/productshop.jpg"
import { useNavigate } from "react-router-dom";


const Home = ({ categories }) => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme => theme.breakpoints.only("xs"));

    const onChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    const onSearch = (e) => {
        e.preventDefault();
        navigate(`/search/?product=${search}`)
    }

    const onCategoryClick = (id) => {
        navigate(`/search/?category=${id}`)
    }

    return (
        <Container component="main" maxWidth="false" disableGutters sx={{position: "relative"}}>
            <Box
                component="img"
                sx={{
                    height: "auto",
                    width: "100%",
                    minHeight: "300px",
                    maxHeight: "700px",
                    display: "block",
                    position: "relative"
                }}
                alt="Search for product reviews"
                src={shopimg}
            />
            <div className="overlay">
                <div>
                    <Typography component="h1" sx={{ typography: { md: 'h1', sm: 'h2', xs: 'h4' } }}>
                        <b>Product Review</b>
                    </Typography>

                    <Box component="form" autoComplete="off" noValidate
                        sx={{
                            display: 'flex',
                            alignItems: "stretch",
                            justifyContent: "center"
                        }}
                    >
                        <TextField
                            label="Search for a product"
                            type="search"
                            variant="filled"
                            size="small"
                            fullWidth
                            onChange={onChange}
                            value={search}
                            sx={{background: "white", marginRight: "2px", borderRadius: 5}}
                        />

                        <Button type="submit" variant="contained" size="large" onClick={onSearch} sx={{borderRadius: 10}}>Search</Button>
                    </Box>
                </div>
            </div>

            <Box className="black" sx={{ padding: 4, textAlign: 'center' }}>
                <Box maxWidth="lg" sx={{ margin: 'auto'}}>
                <Typography component="h2" sx={{ typography: { sm: 'h3', xs: 'h5' } }}>Explore Categories</Typography>

                <Grid 
                    container 
                    columns={{ xs: 9, sm: 12 }}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
                    rowSpacing={2}
                    sx={{ mt: 2, mb: 2 }}
                >
                    {categories.slice(0, isMobile ? 6 : 8).map((cat, index) => (
                        <Grid item key={index} xs={3}>
                            <Button onClick={() => onCategoryClick(cat.id)} color="white" variant="contained" id={cat.id} sx={{ 
                                height: "100px",
                                width: "100%",
                                textTransform: 'capitalize',
                                fontSize: 16
                            }}>{cat.name}</Button>
                        </ Grid>
                    ))}
                </Grid>

                <Button variant="contained" size="large" fullWidth onClick={() => onCategoryClick(-1)}>See All Categories</Button>
                </Box>
            </Box>


        </Container>
    )
}

export default Home;