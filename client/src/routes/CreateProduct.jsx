import { Box, Button, Container, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";


const CreateProduct = ({ categories }) => {
    const navigate = useNavigate();
    const [localState, setLocalState] = useState({
        name: "",
        description: "",
        category: categories[0].id,
        price: "",
        image: undefined,
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
        try {
            const res = await axios.post('/products/create', localState, {
                headers: {'content-type': 'multipart/form-data'}
            });
            if (res.status === 200) navigate('/profile')
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                window.alert(error.response.data.message);
            }
        }
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
                        label="Category"
                        id="category"
                        select
                        onChange={onChange}
                        value={localState.category}
                        SelectProps={{ native: true }}
                        required
                        fullWidth
                    >
                        {
                            categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))
                        }
                    </TextField>
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