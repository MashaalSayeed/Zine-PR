import React from "react"
import { Box, Paper, Rating, Typography, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const rating = product.avg || 0;
    const isMobile = useMediaQuery(theme => theme.breakpoints.only("xs"));
    const navigate = useNavigate();

    const click = (e) => {
        e.preventDefault()
        navigate(`/product/${product.productid}`)
    }

    return (
        <Paper elevation={3} sx={{ width: "100%", display: "flex", overflow: "hidden" }} onClick={click}>
            <Box 
                component="img" 
                src={`http://localhost:5555/images/${product.image}`}
                sx={{ height: "128px", width: "128px" }} 
            />

            <Box sx={{ margin: 1 }}>
                <Typography sx={{ typography: { sm: "h5", xs: "body1" } }}>{product.name}</Typography>
                <Typography variant="body2" mt={1}>Price: <b>{product.price}$</b></Typography>
                <Box sx={{ display: "flex", alignItems: "center"}}>
                    <Rating value={rating} precision={0.5} size={isMobile ? "small" : "medium"} readOnly />
                    <Typography variant="body2" ml={!isMobile}>{isMobile ? `(${product.count})` : `${product.count} Reviews`}</Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default ProductCard