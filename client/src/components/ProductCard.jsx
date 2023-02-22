import React from "react"
import { Box, Paper, Rating, Typography } from "@mui/material"

const ProductCard = ({ product }) => {
    return (
        <Paper sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <Box component="img" sx={{ minHeight: "128px", width: "128px" }} />

            <Box sx={{ margin: 1 }}>
                <Typography sx={{ typography: { sm: "h5", xs: "h6" } }}>{product.name}</Typography>
                {
                    // <Typography variant="body2" mt={1}>iPhone 14 Pro. With Dynamic Island. Crash Detection. A 48MP camera for up to 4x the resolution. 5G connectivity. Four colours.</Typography>
                }
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating value={4.5} precision={0.5} readOnly />
                    <Typography variant="body2" ml={1}>4.5 from 16 reviews</Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default ProductCard