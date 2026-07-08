import { Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import TableComponent from '../../components/Admin/TableComponent';
import type { Product } from '../../types';

export default function AdminProductsPage({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const rows = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())).slice(0, 40);
  return (
    <Stack spacing={2}>
      <Typography variant="h3">Products Management</Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}><TextField label="Search" value={query} onChange={(event) => setQuery(event.target.value)} /><Button variant="contained">Add Product UI</Button></Stack>
      <TableComponent rows={rows} columns={[
        { key: 'name', label: 'Product' },
        { key: 'brand', label: 'Brand' },
        { key: 'offerPrice', label: 'Price', render: (row) => `₹${row.offerPrice}` },
        { key: 'stock', label: 'Stock' },
        { key: 'id', label: 'Actions', render: () => <Stack direction="row" spacing={1}><Button>Edit</Button><Button color="error">Delete</Button></Stack> },
      ]} />
      <Typography color="text.secondary">Pagination and filters are represented through the searchable management table.</Typography>
    </Stack>
  );
}
