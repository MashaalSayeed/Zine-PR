import React from "react"
import { Box, Container, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Paper, Rating, Stack, TextField, Typography} from "@mui/material";


const Home = () => {
    const categories = ['All', 'Electronics', 'Food', 'Health', 'Books', 'Toys', 'Games'];
    return (
        <Container component="main" sx={{ mt: 4 }}>
            <Box justifyContent="space-between" sx={{display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Typography component="h3" sx={{typography: { sm: "h3", xs: "h5" }}}>Search</Typography>
                <TextField
                    type="search"
                    label="Search"
                    id="search"
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
                            categories.map(cat => (
                                <ListItem disablePadding>
                                    <ListItemButton disableGutters sx={{pl: 1}}>
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
                        <Paper sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
                            <Box component="img" sx={{ minHeight: "128px", width: "128px"}} />

                            <Box sx={{ margin: 1 }}>
                                <Typography sx={{typography: { sm: "h5", xs: "h6" }}}>Apple iPhone 14 Pro</Typography>
                                {
                                    // <Typography variant="body2" mt={1}>iPhone 14 Pro. With Dynamic Island. Crash Detection. A 48MP camera for up to 4x the resolution. 5G connectivity. Four colours.</Typography>
                                }
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Rating value={4.5} precision={0.5} readOnly/>
                                    <Typography variant="body2" ml={1}>4.5 from 16 reviews</Typography>
                                </Box>
                            </Box>
                        </Paper>

                        <Paper sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
                            <Box component="img" sx={{ minHeight: "128px", width: "128px"}} />

                            <Box sx={{ margin: 1 }}>
                                <Typography sx={{typography: { sm: "h5", xs: "h6" }}}>Apple iPhone 14 Pro</Typography>
                                {
                                    // <Typography variant="body2" mt={1}>iPhone 14 Pro. With Dynamic Island. Crash Detection. A 48MP camera for up to 4x the resolution. 5G connectivity. Four colours.</Typography>
                                }
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Rating value={4.5} precision={0.5} readOnly/>
                                    <Typography variant="body2" ml={1}>4.5 from 16 reviews</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home;