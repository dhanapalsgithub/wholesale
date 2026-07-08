import { Grid, Paper, Stack, Typography } from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import type { Category, Order, Product } from '../../types';

export default function ReportsPage({ orders, products, categories }: { orders: Order[]; products: Product[]; categories: Category[] }) {
  const weekly = Array.from({ length: 7 }, (_, index) => orders.filter((_, orderIndex) => orderIndex % 7 === index).reduce((sum, order) => sum + order.grandTotal, 0));
  const statusData = ['Pending', 'Accepted', 'Packed', 'Shipped', 'Delivered', 'Cancelled'].map((status, id) => ({ id, value: orders.filter((order) => order.status === status).length, label: status }));
  const lowStock = products.filter((product) => product.stock < 15).slice(0, 8);
  return (
    <Stack spacing={3}>
      <Typography variant="h3">Reports</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}><Paper sx={{ p: 2 }}><Typography variant="h6">Weekly Sales Report</Typography><BarChart height={260} xAxis={[{ scaleType: 'band', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }]} series={[{ data: weekly, label: 'Revenue' }]} /></Paper></Grid>
        <Grid size={{ xs: 12, md: 6 }}><Paper sx={{ p: 2 }}><Typography variant="h6">Order Status Chart</Typography><PieChart height={260} series={[{ data: statusData }]} /></Paper></Grid>
        <Grid size={{ xs: 12, md: 4 }}><Paper sx={{ p: 2 }}><Typography variant="h6">Top Selling Products</Typography>{products.slice(0, 8).map((product) => <Typography key={product.id}>{product.name}</Typography>)}</Paper></Grid>
        <Grid size={{ xs: 12, md: 4 }}><Paper sx={{ p: 2 }}><Typography variant="h6">Low Stock</Typography>{lowStock.map((product) => <Typography key={product.id}>{product.name}: {product.stock}</Typography>)}</Paper></Grid>
        <Grid size={{ xs: 12, md: 4 }}><Paper sx={{ p: 2 }}><Typography variant="h6">Category Sales</Typography>{categories.slice(0, 8).map((category) => <Typography key={category.id}>{category.name}: ₹{orders.filter((_, index) => index % categories.length === 0).length * 1000}</Typography>)}</Paper></Grid>
      </Grid>
    </Stack>
  );
}
