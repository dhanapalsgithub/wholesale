import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CategoryCard from '../../components/common/CategoryCard';
import ProductCard from '../../components/common/ProductCard';
import type { Category, Product } from '../../types';

interface Props {
  categories: Category[];
  products: Product[];
  favorites: string[];
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const Section = ({ title, products, favorites, onAddToCart, onToggleFavorite }: Props & { title: string }) => (
  <Box mt={5}>
    <Typography variant="h4" mb={2}>{title}</Typography>
    <Grid container spacing={2}>
      {products.slice(0, 8).map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }}>
          <ProductCard product={product} wished={favorites.includes(product.id)} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} />
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
      <Box mt={5}>
        <Typography variant="h4" mb={2}>Customer Reviews</Typography>
        <Grid container spacing={2}>
          {['Very fresh vegetables and smooth checkout.', 'The glass UI feels premium and fast.', 'Owner dashboard makes order tracking simple.'].map((text) => (
            <Grid key={text} size={{ xs: 12, md: 4 }}><Paper sx={{ p: 3 }}><Typography>{text}</Typography></Paper></Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
