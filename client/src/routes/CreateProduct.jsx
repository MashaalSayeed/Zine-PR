import { Box, Button, Container, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react"


const CreateProduct = () => {
    const [file, setFile] = useState();
    const uploadImage = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    };

    const submit = (e) => {
        e.preventDefault();
    }

    return (
        <Container component="main" sx={{ mt: 4,  mb: 5 }}>
            <Typography component="h2" variant="h3">Create Product</Typography>
            <hr />
            <Box maxWidth="sm" margin="auto">
                <Box
                    component="form"
                    sx={{ display: "flex", flexDirection:"column", alignItems: "center" }}
                >
                    <Box 
                        component="img" 
                        width={256}
                        height={256}
                        src={file}
                    />
                    <input style={{ marginTop: "10px" }} type="file" id="file" name="file" accept=".jpg, .jpeg, .png" onChange={uploadImage}/>
                    <TextField 
                        margin="normal"
                        required
                        label="Product Name"
                        id="name"
                        fullWidth
                    />
                    <TextField 
                        margin="normal"
                        label="Price"
                        type="number"
                        required
                        id="price"
                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                        fullWidth
                    />
                    <TextField 
                        margin="normal"
                        label="Product Description"
                        required
                        id="description"
                        multiline
                        rows={10}
                        fullWidth
                    />

                    <Button type="submit" fullWidth variant="contained" onClick={submit}>Create Product</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default CreateProduct;