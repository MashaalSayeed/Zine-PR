import { Container, Typography } from "@mui/material";
import React from "react"


const NotFound = () => {
    return (
        <Container component="main" sx={{ mt: 4 }}>
            <Typography component="h2" variant="h2">Not Found</Typography>
            <br />
            <Typography>Oops! Could not find what you were looking for</Typography>
        </Container>
    )
}

export default NotFound;