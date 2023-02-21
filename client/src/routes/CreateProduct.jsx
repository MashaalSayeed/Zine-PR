import { Box, Button, Container, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react"


const CreateProduct = () => {
    const [localState, setLocalState] = useState({
        name: "",
        description: "",
        price: null,
        image: null,
    });

    const onChange = (e) => {
        e.preventDefault();
        setLocalState({ ...localState, [e.target.id]: e.target.value })
    }

    const uploadImage = (e) => {
        e.preventDefault();
        setLocalState({ ...localState, [e.target.id]: e.target.files[0]});
    };

    const submit = async (e) => {
        e.preventDefault();
        console.log(localState)
        //const formData = new FormData()
        //formData.append('image', localState.image)
        try {
            const res = await axios.post('/products/create', localState, {
                headers: {'content-type': 'multipart/form-data'}
            });
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Container component="main" sx={{ mt: 4,  mb: 5 }}>
            <Typography component="h2" variant="h3">Create Product</Typography>
            <hr />
            <Box maxWidth="sm" margin="auto">
                <Box
                    component="form"
                    encType="multipart/form-data"
                    sx={{ display: "flex", flexDirection:"column", alignItems: "center" }}
                >
                    <Box 
                        component="img" 
                        width={256}
                        height={256}
                        src={localState.image ? URL.createObjectURL(localState.image) : null}
                    />
                    <input style={{ marginTop: "10px" }} type="file" id="image" name="image" accept=".jpg, .jpeg, .png" onChange={uploadImage}/>
                    <TextField 
                        margin="normal"
                        label="Product Name"
                        id="name"
                        value={localState.name}
                        onChange={onChange}
                        required
                        fullWidth
                    />
                    <TextField 
                        margin="normal"
                        label="Price"
                        type="number"
                        id="price"
                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                        value={localState.price}
                        onChange={onChange}
                        required
                        fullWidth
                    />
                    <TextField 
                        margin="normal"
                        label="Product Description"
                        id="description"
                        value={localState.description}
                        onChange={onChange}
                        required
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