import { Box, Button, Chip, Container, Grid, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import RatingStars from '../../components/common/RatingStars';
import type { Product, CartItem } from '../../types';

interface Props {
  products: Product[];
  favorites: string[];
  cart: CartItem[]; // cart-ஐ ப்ராப்ஸ் ஆகப் பெற வேண்டும்
  onAddToCart: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void; // qty மாற்றும் பங்க்ஷன்
  onToggleFavorite: (id: string) => void;
}

export default function ProductDetailsPage({ products, favorites, cart, onAddToCart, onUpdateQty, onToggleFavorite }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  const product = products.find((entry) => entry.id === id);
  if (!product) return <Container sx={{ py: 6 }}><Typography>Product not found.</Typography></Container>;

  const related = products.filter((entry) => entry.category === product.category && entry.id !== product.id);
  const cartItem = cart.find(item => item.productId === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, borderRadius: 5 }}>
            <Box component="img" src={product.images[0]} alt={product.name} sx={{ width: '100%', height: { xs: 320, md: 520 }, objectFit: 'cover', borderRadius: 4 }} />
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

            {/* Quantity Counter */}
            <Stack direction="row" spacing={2} alignItems="center">
              {quantity > 0 ? (
                <Stack direction="row" alignItems="center" spacing={2} sx={{ border: '1px solid #ddd', borderRadius: 2, p: 1 }}>
                  <Button onClick={() => onUpdateQty(product.id, quantity - 1)}>-</Button>
                  <Typography fontWeight={900}>{quantity}</Typography>
                  <Button onClick={() => onUpdateQty(product.id, quantity + 1)}>+</Button>
                </Stack>
              ) : (
                <Button variant="contained" size="large" onClick={() => onAddToCart(product.id)}>Add to Cart</Button>
              )}
              <Button variant="outlined" size="large" onClick={() => { if (quantity === 0) onAddToCart(product.id); navigate('/checkout'); }}>Buy Now</Button>
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
      <Grid container spacing={2}>
        {related.slice(0, 6).map((entry) => (
          <Grid key={entry.id} size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
            <ProductCard
              product={entry}
              wished={favorites.includes(entry.id)}
              quantity={cart.find(c => c.productId === entry.id)?.quantity || 0}
              isAdded={cart.some(c => c.productId === entry.id)} // இதைச் சேர்க்கவும்
              onAddToCart={onAddToCart}
              onUpdateQty={onUpdateQty}
              onToggleFavorite={onToggleFavorite}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}