import React, { useEffect, useState } from "react"
import { Button, Container, Divider, Paper, Rating, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Stack } from "@mui/system";
import axios from "axios";
import { useSelector } from "react-redux";

const Product = ({ categories }) => {
    const { productid } = useParams();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    // const isMobile = useMediaQuery(theme => theme.breakpoints.only("xs"));
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        image: '',
        price: '',
        category: '',
        created_at: '',
        rating: 1,
        reviewCount: 0
    })

    const [reviews, setReviews] = useState([])

    const defaultUserReview = { title: "", review: "", rating: 1 };
    const [userReview, setUserReview] = useState(defaultUserReview)

    const onChange = (e) => {
        e.preventDefault();
        setUserReview({ ...userReview, [e.target.id]: e.target.value })
    }
    const onSetRating = (e, rating) => setUserReview({ ...userReview, rating })

    const submitReview = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) return navigate('/login')
        try {
            const res = await axios.post('/review/create', { ...userReview, productid });
            if (res.status === 200) {
                setUserReview(defaultUserReview)
                setReviews([...reviews, {...res.data.review, username: user.username }])
                window.alert('Posted Review Successfully!')
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                window.alert(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`/products/id/${productid}`);
            let { name, description, image, price, categoryid, created_at } = res.data.product;
            console.log(res.data.product)

            const category = categories.find(c => c.id === categoryid)?.name || "";
            created_at = new Date(created_at).toDateString()
            setProduct(product => ({name, description, image, price, category, created_at}))
        }

        const fetchReviews = async () => {
            const res = await axios.get(`/review/${productid}`);
            const data = res.data.reviews
            console.log(data);

            setReviews(data)
            const rating = (data.reduce((a, b) => a + b.rating, 0)) / data.length;
            const reviewCount = data.length;
            setProduct(product => ({ ...product, rating, reviewCount }));
        }

        fetchProduct().then(() => fetchReviews()).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const rating = (reviews.reduce((a, b) => a + b.rating, 0)) / reviews.length;
        const reviewCount = reviews.length;
        setProduct(product => ({ ...product, rating, reviewCount }));
    }, [reviews])

    if (loading) return;
    return (
        <Container component="main" sx={{ mt: 4 }}>
            <Paper variant="outlined">
                <Stack spacing={3} margin={2}>
                    <Box 
                        component="img"
                        width={256}
                        height={256}
                        src={`http://localhost:5555/images/${product.image}`}
                        alt="Product Image"
                        margin="auto"
                    />

                    <Divider />
                    <Box>
                        <Typography variant="h4" textAlign="center">{product.name}</Typography>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Rating value={product.rating || 0} precision={0.5} readOnly />
                            <Typography variant="body2">
                                { product.reviewCount ? `(${product.rating} from ${product.reviewCount} reviews)` : "" }
                            </Typography>
                        </Box>

                        <Typography mt={3} variant="body1"><b>Category: {product.category} </b></Typography>
                        <Typography variant="body1"><b>Price: {product.price}$</b></Typography>
                        <Typography variant="body1"><b>Created At: {product.created_at}</b></Typography> 
                        <Typography variant="body1"><b>Description:</b></Typography>
                        <Typography mt={1} variant="body2">
                            {product.description}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
            <br />

            <Typography variant="h4" textAlign="center">Read Reviews</Typography>
            <br />
            <Stack spacing={2}>
                {
                    reviews.map((review, index) => (
                        <Paper key={index} sx={{ padding: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Typography variant="h6"><b>{review.username}</b></Typography>
                                <Rating value={review.rating} precision={0.5} size="small" readOnly />
                            </Box>
                            <Typography mb={1} variant="body2">Reviewed on {new Date(review.created_at).toDateString()}</Typography>
                            <Divider />
                            <Typography mt={2} variant="body1"><b>{review.title}</b></Typography>
                            <Typography variant="body1">
                                {review.review}
                            </Typography>
                        </Paper>
                    ))
                }
            </Stack>

            <br />
            <Divider />
            <br />
            <Paper sx={{ padding: 2 }}>
                <Typography variant="h4" textAlign="center"><u>Write A Review</u></Typography>
                <Box component="form" mt={3}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Typography variant="body1"><b>Rating:</b></Typography>
                        <Rating id="rating" value={userReview.rating} onChange={onSetRating} precision={0.5} size="large" />
                    </Box>
                    <TextField
                        margin="normal"
                        id="title"
                        label="Title"
                        value={userReview.title}
                        onChange={onChange}
                        required
                        fullWidth
                    />
                    <TextField
                        margin="normal"
                        id="review"
                        label="Write Review"
                        rows={5}
                        value={userReview.review}
                        onChange={onChange}
                        multiline
                        required
                        fullWidth
                    />
                    <Button type="submit" variant="contained" onClick={submitReview} fullWidth>Submit Review</Button>
                </Box>
            </Paper>
            <br />

        </Container>
    )
}

export default Product;