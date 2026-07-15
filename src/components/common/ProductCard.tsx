import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Box, Button, Card, CardContent, CardMedia, Chip, IconButton, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import RatingStars from './RatingStars';

interface Props {
  product: Product;
  wished: boolean;
  isAdded: boolean;
  quantity: number; // புதியது: பொருளின் தற்போதைய எண்ணிக்கை
  onAddToCart: (id: string) => void;
  onUpdateQty: (id: string, quantity: number) => void; // புதியது: எண்ணிக்கையை மாற்ற
  onToggleFavorite: (id: string) => void;
  className?: string;
  
}

export default function ProductCard({ 
  product, 
  wished, 
  quantity, 
  onAddToCart, 
  onUpdateQty, 
  onToggleFavorite, 
  className 
}: Props) {
  
  return (
    <Card 
      className={`glass ${className || ''}`} 
      sx={{ height: '100%', transition: '0.2s', '&:hover': { transform: 'translateY(-4px)' } }}
    >
      <Box position="relative">
        <CardMedia component="img" image={product.images[0]} alt={product.name} sx={{ height: 170, objectFit: 'cover' }} />
        <Chip label={`${product.discount}% off`} color="primary" size="small" sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 900 }} />
        <IconButton onClick={() => onToggleFavorite(product.id)} sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,.8)' }}>
          <FavoriteRoundedIcon color={wished ? 'error' : 'disabled'} />
        </IconButton>
      </Box>
      
      <CardContent>
        <Stack spacing={1}>
          <Typography component={Link} to={`/products/${product.id}`} fontWeight={900} minHeight={48} sx={{ textDecoration: 'none', color: 'inherit' }}>
            {product.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">{product.weight} • {product.deliveryTime}</Typography>
          <RatingStars rating={product.rating} reviews={product.reviews} />
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6">₹{product.offerPrice}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>₹{product.price}</Typography>
          </Stack>
          
          {quantity > 0 ? (
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1, bgcolor: 'primary.main', borderRadius: 2, p: 0.5 }}>
              <Button sx={{ color: 'white' }} onClick={() => onUpdateQty(product.id, quantity - 1)}>-</Button>
              <Typography fontWeight={900} color="white">{quantity}</Typography>
              <Button sx={{ color: 'white' }} onClick={() => onUpdateQty(product.id, quantity + 1)}>+</Button>
            </Stack>
          ) : (
            <Button
              fullWidth
              variant="contained"
              startIcon={<ShoppingCartRoundedIcon />}
              onClick={() => onAddToCart(product.id)}
            >
              Add
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}