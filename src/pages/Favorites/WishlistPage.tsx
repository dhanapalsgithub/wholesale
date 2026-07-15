import { Container, Grid, Typography } from '@mui/material'; // Grid2 பயன்படுத்தவும் (MUI v7-க்கு இதுவே சிறந்தது)
import ProductCard from '../../components/common/ProductCard';
import type { Product } from '../../types';

export default function WishlistPage({
  products,
  favorites,
  onAddToCart,
  onToggleFavorite
}: {
  products: Product[];
  favorites: string[];
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void
}) {
  const rows = products.filter((product) => favorites.includes(product.id));

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" mb={2}>Wishlist</Typography>

      {rows.length > 0 ? (
        <Grid container spacing={2}>
          {rows.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <ProductCard
                product={product}
                wished={true}
                isAdded={false}          // அல்லது உங்கள் லாஜிக்கிற்கு ஏற்ப
                quantity={0}             // விஷ்லிஸ்டில் டீஃபால்ட்டாக 0 என வைக்கலாம்
                onUpdateQty={(id, qty) => { }} // விஷ்லிஸ்டில் இது தேவைப்படாது என்றாலும், பிழையைத் தவிர்க்க காலியாக விடவும்
                onAddToCart={onAddToCart}
                onToggleFavorite={onToggleFavorite}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No wishlist items yet.
        </Typography>
      )}
    </Container>
  );
}