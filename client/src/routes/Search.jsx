import React, { useState } from "react"
import { Box, Container, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Paper, Stack, TextField, Typography} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Search = (props) => {
    const categories =["All"].concat(props.categories);
    const [searchParams, ] = useSearchParams();

    const [localState, setLocalState] = useState({
        search: searchParams.get('product') || "",
        category: searchParams.get('category') || "All",
        results: []
    });

    // const navigate = useNavigate();
    const search = async (category, name) => {
        category = category || localState.category;
        name = name || localState.search
        try {
            const res = await axios.get(`/products/search?product=${name}&category=${category}`);
            console.log(res.data.results)
            setLocalState({ category, results: res.data.results, search: name });
        } catch (error) {
            console.error(error);
        }
    };

    const onChange = async (e) => {
        e.preventDefault();
        setLocalState({ ...localState, [e.target.id]: e.target.value})
        if (e.target.value.length > 2) await search(null, e.target.value);
    }

    const setCategory = async (category) => {
        const oldCat = localState.category;
        setLocalState({ ...localState, category })
        if (category !== oldCat) await search(category, null);
    }

    return (
        <Container component="main" sx={{ mt: 4 }}>
            <Box justifyContent="space-between" sx={{display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Typography component="h3" sx={{typography: { sm: "h3", xs: "h5" }}}>Search</Typography>
                <TextField
                    type="search"
                    label="Search"
                    id="search"
                    value={localState.search}
                    onChange={onChange}
                    sx={{ width: "73%"}}
                />
            </Box>
            <hr />
            <Grid container columns={12}>
                <Grid item xs={3} sm={3} >
                    <Paper>
                        <Typography variant="h6" p={{sm: 2, xs: 1}} sx={{typography: { sm: "h6", xs: "body1" } }}>Categories</Typography>
                        <Divider />
                        <List>
                            {
                            categories.map((cat, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton disableGutters selected={localState.category === cat} sx={{pl: 1}} onClick={() => setCategory(cat)}>
                                        <ListItemText primary={cat} primaryTypographyProps={{typography: {sm: "body1", xs: "body2"}}}></ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))
                            }
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={9} sm={9}>
                    <Stack marginLeft={2} spacing={1}>
                        {
                            localState.results.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))
                            //<ProductCard product={{ name: "iPhone 14 Pro" }}></ProductCard>
                            //<ProductCard product={{ name: "Samsung Galaxy S23 Ultra" }}></ProductCard>
                        }
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Search;