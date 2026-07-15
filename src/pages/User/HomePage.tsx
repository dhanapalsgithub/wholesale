import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CategoryCard from '../../components/common/CategoryCard';
import ProductCard from '../../components/common/ProductCard';
import type { Category, Product } from '../../types';

interface Props {
  categories: Category[];
  products: Product[];
  cart: any[];
  favorites: string[];
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void; // இதைச் சேர்க்கவும்
  onRemove: (id: string) => void;                // இதைச் சேர்க்கவும்
  
}

const Section = ({ title, products, favorites, onAddToCart, cart, onToggleFavorite, onUpdateQty, onRemove }: Props & { title: string }) => (
  <Box mt={5}>
    <Typography variant="h4" mb={2}>{title}</Typography>
    <Grid container spacing={2}>
      {products.slice(0, 8).map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }}>
         <ProductCard 
            product={product} 
            wished={(favorites || []).includes(product.id)}
            isAdded={(cart || []).some((item: any) => item.productId === product.id)}
            quantity={(cart || []).find((i: any) => i.productId === product.id)?.quantity || 0}
            onAddToCart={onAddToCart} 
            onUpdateQty={onUpdateQty}
            onToggleFavorite={onToggleFavorite} 
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default function HomePage(props: Props) {
  const { categories, products } = props;
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper className="glass" sx={{ p: { xs: 3, md: 7 }, borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
        <Stack maxWidth={720} spacing={2}>
          <Typography variant="overline" color="primary" fontWeight={900}>BigBasket inspired freshness</Typography>
          <Typography variant="h2">Groceries that feel fresh before they reach your door.</Typography>
          <Typography variant="h6" color="text.secondary">Liquid-glass cards, fast checkout, owner dashboard, and 150+ products from one local data file.</Typography>
          <Stack direction="row" spacing={2}>
            <Button component={Link} to="/products" variant="contained" size="large">Shop now</Button>
            <Button component={Link} to="/owner-login" variant="outlined" size="large">Owner login</Button>
          </Stack>
        </Stack>
      </Paper>

      <Box mt={5}>
        <Typography variant="h4" mb={2}>Shop by category</Typography>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid key={category.id} size={{ xs: 6, sm: 4, md: 2 }}>
              <CategoryCard category={category} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Section title="Today's Deals" {...props} products={products.filter((product) => product.discount >= 18)} />
      <Section title="Best Sellers" {...props} products={products.filter((product) => product.popular)} />
      <Section title="Fresh Vegetables" {...props} products={products.filter((product) => product.category === 'vegetables')} />
      <Section title="Fresh Fruits" {...props} products={products.filter((product) => product.category === 'fruits')} />
      <Section title="Milk Products" {...props} products={products.filter((product) => product.category === 'milk')} />
      <Section title="Recommended" {...props} products={products.filter((product) => product.featured)} />
      <Section title="New Arrivals" {...props} products={products.filter((product) => product.newArrival)} />
      <Section title="Organic Foods" {...props} products={products.filter((product) => product.organic)} />
    </Container>
  );
}