import { Box, Button, Chip, Container, Grid, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import RatingStars from '../../components/common/RatingStars';
import type { Product } from '../../types';

export default function ProductDetailsPage({ products, favorites, onAddToCart, onToggleFavorite }: { products: Product[]; favorites: string[]; onAddToCart: (id: string) => void; onToggleFavorite: (id: string) => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const product = products.find((entry) => entry.id === id);
  if (!product) return <Container sx={{ py: 6 }}><Typography>Product not found.</Typography></Container>;
  const related = products.filter((entry) => entry.category === product.category && entry.id !== product.id);
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, borderRadius: 5 }}>
            <Box component="img" src={product.images[0]} alt={product.name} sx={{ width: '100%', height: { xs: 320, md: 520 }, objectFit: 'cover', borderRadius: 4 }} />
            <Stack direction="row" spacing={1} mt={1}>{product.images.map((image) => <Box key={image} component="img" src={image} sx={{ width: 82, height: 72, objectFit: 'cover', borderRadius: 2 }} />)}</Stack>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Chip label={product.deliveryTime} color="primary" sx={{ width: 'fit-content' }} />
            <Typography variant="h3">{product.name}</Typography>
            <RatingStars rating={product.rating} reviews={product.reviews} />
            <Typography color="text.secondary">{product.description}</Typography>
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography variant="h3">₹{product.offerPrice}</Typography>
              <Typography sx={{ textDecoration: 'line-through' }}>₹{product.price}</Typography>
              <Chip label={`${product.discount}% off`} color="success" />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" size="large" onClick={() => onAddToCart(product.id)}>Add to Cart</Button>
              <Button variant="outlined" size="large" onClick={() => { onAddToCart(product.id); navigate('/checkout'); }}>Buy Now</Button>
              <Button size="large" onClick={() => onToggleFavorite(product.id)}>{favorites.includes(product.id) ? 'Wishlisted' : 'Wishlist'}</Button>
            </Stack>
            <Paper sx={{ p: 2 }}>
              <Tabs value={tab} onChange={(_, value) => setTab(value)}>
                <Tab label="Nutrition" />
                <Tab label="Highlights" />
                <Tab label="Specifications" />
                <Tab label="Review" />
              </Tabs>
              <Box p={2}>
                {tab === 0 && product.nutrition.map((item) => <Typography key={item}>• {item}</Typography>)}
                {tab === 1 && product.highlights.map((item) => <Typography key={item}>• {item}</Typography>)}
                {tab === 2 && Object.entries(product.specifications).map(([key, value]) => <Typography key={key}>{key}: {value}</Typography>)}
                {tab === 3 && <Typography>Customers love the freshness and careful packing.</Typography>}
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
      <Typography variant="h4" mt={5} mb={2}>Related Products</Typography>
      <Grid container spacing={2}>{related.slice(0, 6).map((entry) => <Grid key={entry.id} size={{ xs: 12, sm: 6, md: 3, lg: 2 }}><ProductCard product={entry} wished={favorites.includes(entry.id)} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} /></Grid>)}</Grid>
    </Container>
  );
}
