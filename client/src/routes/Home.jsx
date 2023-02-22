import React, { useState } from "react"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import shopimg from "../assets/images/productshop.jpg"
import { useNavigate } from "react-router-dom";


const Home = ({ categories }) => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const onChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    const onSearch = (e) => {
        e.preventDefault();
        navigate(`/search/?product=${search}`)
    }

    const onCategoryClick = (e) => {
        e.preventDefault();
        navigate(`/search/?category=${e.target.id}`)
    }

    return (
        <Container component="main" maxWidth="false" disableGutters sx={{position: "relative"}}>
            <Box
                component="img"
                sx={{
                    height: "auto",
                    width: "100%",
                    maxHeight: "700px",
                    display: "block",
                    position: "relative"
                }}
                alt="Search for product reviews"
                src={shopimg}
            />
            <div className="overlay">
                <div>
                    <Typography color="white" component="h1" sx={{ typography: { md: 'h1', sm: 'h2', xs: 'h4' } }}>
                        <b>Product Review</b>
                    </Typography>

                    <Box component="form" autoComplete="off" noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
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
                            sx={{ background: "white", marginRight: "2px" }}
                        />

                        <Button type="submit" variant="contained" size="large" onClick={onSearch}>Search</Button>
                    </Box>
                </div>
            </div>

            <Box className="black" sx={{ padding: 4, textAlign: 'center' }}>
                <Typography component="h2" sx={{ typography: { sm: 'h3', xs: 'h6' } }}>Explore Categories</Typography>

                <Grid 
                    container 
                    columns={{ xs: 9, sm: 12, md: 18 }}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
                    rowSpacing={2}
                    sx={{ mt: 2, mb: 2, flexGrow: 1 }}
                >
                    {categories.map((cat, index) => (
                        <Grid item key={index} xs={3}>
                            <Button variant="contained" onClick={onCategoryClick} id={cat.id} sx={{ 
                                background: "white",
                                color: "black",
                                height: "70px",
                                width: "100%"
                            }}>{cat.name}</Button>
                        </ Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}

export default Home;