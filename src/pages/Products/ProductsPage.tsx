import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import FilterSidebar, { type Filters } from '../../components/common/FilterSidebar';
import ProductCard from '../../components/common/ProductCard';
import type { Category, Product } from '../../types';

interface Props {
  products: Product[];
  categories: Category[];
  favorites: string[];
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function ProductsPage({ products, categories, favorites, onAddToCart, onToggleFavorite }: Props) {
  const { id } = useParams();
  const [params] = useSearchParams();
  const [view, setView] = useState('grid');
  const [sort, setSort] = useState('popular');
  const [filters, setFilters] = useState<Filters>({ price: [0, 800], minRating: 3, inStock: true, organic: false });
  const query = params.get('search')?.toLowerCase() ?? '';
  const title = categories.find((category) => category.id === id)?.name ?? (query ? `Search: ${query}` : 'All Products');

  const shown = useMemo(() => {
    const rows = products
      .filter((product) => !id || product.category === id)
      .filter((product) => !query || product.name.toLowerCase().includes(query) || product.brand.toLowerCase().includes(query))
      .filter((product) => product.offerPrice >= filters.price[0] && product.offerPrice <= filters.price[1])
      .filter((product) => product.rating >= filters.minRating)
      .filter((product) => !filters.inStock || product.stock > 0)
      .filter((product) => !filters.organic || product.organic);
    return [...rows].sort((a, b) => {
      if (sort === 'low') return a.offerPrice - b.offerPrice;
      if (sort === 'high') return b.offerPrice - a.offerPrice;
      if (sort === 'new') return Number(b.newArrival) - Number(a.newArrival);
      return b.reviews - a.reviews;
    });
  }, [products, id, query, filters, sort]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={2} mb={3}>
        <Typography variant="h3">{title}</Typography>
        <Stack direction="row" spacing={2}>
          <ToggleButtonGroup value={view} exclusive onChange={(_, value) => value && setView(value)}>
            <ToggleButton value="grid">Grid</ToggleButton>
            <ToggleButton value="list">List</ToggleButton>
          </ToggleButtonGroup>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Sort</InputLabel>
            <Select label="Sort" value={sort} onChange={(event) => setSort(event.target.value)}>
              <MenuItem value="new">Newest</MenuItem>
              <MenuItem value="low">Price Low</MenuItem>
              <MenuItem value="high">Price High</MenuItem>
              <MenuItem value="popular">Popularity</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}><FilterSidebar filters={filters} onChange={setFilters} /></Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <Grid container spacing={2}>
            {shown.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: view === 'list' ? 12 : 6, lg: view === 'list' ? 12 : 3 }}>
                <ProductCard product={product} wished={favorites.includes(product.id)} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} />
              </Grid>
            ))}
          </Grid>
          {!shown.length && <Box className="glass" sx={{ p: 5, borderRadius: 5 }}><Typography>No products found.</Typography></Box>}
        </Grid>
      </Grid>
    </Container>
  );
}
