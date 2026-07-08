import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Box, Button, Card, CardContent, CardMedia, Chip, IconButton, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import RatingStars from './RatingStars';

interface Props {
  product: Product;
  wished: boolean;
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function ProductCard({ product, wished, onAddToCart, onToggleFavorite }: Props) {
  return (
    <Card sx={{ height: '100%', transition: '0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
      <Box position="relative">
        <CardMedia component="img" image={product.images[0]} alt={product.name} sx={{ height: 170, objectFit: 'cover' }} />
        <Chip label={`${product.discount}% off`} color="primary" size="small" sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 900 }} />
        <IconButton onClick={() => onToggleFavorite(product.id)} sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,.8)' }}>
          <FavoriteRoundedIcon color={wished ? 'error' : 'disabled'} />
        </IconButton>
      </Box>
      <CardContent>
        <Stack spacing={1}>
          <Typography component={Link} to={`/products/${product.id}`} fontWeight={900} minHeight={48}>
            {product.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {product.weight} • {product.deliveryTime}
          </Typography>
          <RatingStars rating={product.rating} reviews={product.reviews} />
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6">₹{product.offerPrice}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
              ₹{product.price}
            </Typography>
          </Stack>
          <Button fullWidth variant="contained" startIcon={<ShoppingCartRoundedIcon />} onClick={() => onAddToCart(product.id)}>
            Add
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
