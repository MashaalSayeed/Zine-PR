import React from "react"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import shopimg from "../assets/images/productshop.jpg"


const Home = () => {
    const categories = ['Electronics', 'Food', 'Health', 'Books', 'Toys', 'Games'];
    return (
        <Container component="main" maxWidth="false" disableGutters="true" sx={{position: "relative"}}>
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
                    <Typography color="white" component="h1" sx={{ typography: { md: 'h1', sm: 'h2', xs: 'h5' } }}>
                        <b>Product Review</b>
                    </Typography>

                    <Box component="form" autoComplete="off" noValidate
                        sx={{
                            width: '100%',
                            display: 'grid',
                            alignItems: 'center',
                            margin: 'auto'
                        }}
                    >
                        <TextField
                            margin="normal"
                            label="Search for a product"
                            type="search"
                            variant="filled"
                            fullWidth
                            sx={{ background: "white" }}
                        />

                        <Button type="submit" variant="contained">Search</Button>
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
                    {categories.map((cat) => (
                        <Grid item xs={3}>
                            <Button className="white-bg" variant="contained" sx={{ 
                                background: "white",
                                color: "black",
                                height: "70px",
                                width: "100%"
                            }}>{cat}</Button>
                        </ Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}

export default Home;