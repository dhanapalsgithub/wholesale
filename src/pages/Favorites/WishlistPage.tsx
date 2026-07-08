import { Container, Grid, Typography } from '@mui/material';
import ProductCard from '../../components/common/ProductCard';
import type { Product } from '../../types';

export default function WishlistPage({ products, favorites, onAddToCart, onToggleFavorite }: { products: Product[]; favorites: string[]; onAddToCart: (id: string) => void; onToggleFavorite: (id: string) => void }) {
  const rows = products.filter((product) => favorites.includes(product.id));
  return <Container maxWidth="xl" sx={{ py: 4 }}><Typography variant="h3" mb={2}>Wishlist</Typography><Grid container spacing={2}>{rows.map((product) => <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}><ProductCard product={product} wished onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} /></Grid>)}</Grid>{!rows.length && <Typography>No wishlist items yet.</Typography>}</Container>;
}
