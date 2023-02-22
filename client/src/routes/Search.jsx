import React, { useEffect, useState } from "react"
import { Box, Container, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Paper, Stack, TextField, Typography} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Search = (props) => {
    const categories =[{id: -1, name: "All"}].concat(props.categories);
    const [searchParams, ] = useSearchParams();
    const [localState, setLocalState] = useState({
        search: searchParams.get('product') || "",
        category: parseInt(searchParams.get('category')) || -1
    })
    const [results, setResults] = useState([]);

    useEffect(() => {
        const search = async () => {
            try {
                const res = await axios.get(`/products/search?product=${localState.search}&category=${localState.category}`);
                setResults(res.data.results)
            } catch (error) {
                console.error(error);
            }
        };

        search();
    }, [localState])

    const onChange = (e) => {
        e.preventDefault();
        setLocalState({ ...localState, [e.target.id]: e.target.value})
    }

    const setCategory = (category) => {
        setLocalState({ ...localState, category })
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
                                    <ListItemButton disableGutters selected={localState.category === cat.id} sx={{pl: 1}} onClick={() => setCategory(cat.id)}>
                                        <ListItemText primary={cat.name} primaryTypographyProps={{typography: {sm: "body1", xs: "body2"}}} />
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
                            results.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))
                        }
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Search;