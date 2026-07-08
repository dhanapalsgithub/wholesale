import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { Grid, Typography } from '@mui/material';
import DashboardCard from '../../components/Admin/DashboardCard';
import type { Customer, Order, Product } from '../../types';

export default function DashboardPage({ orders, products, customers }: { orders: Order[]; products: Product[]; customers: Customer[] }) {
  const today = new Date().toDateString();
  const todaysOrders = orders.filter((order) => new Date(order.placedAt).toDateString() === today);
  const revenue = orders.filter((order) => order.status !== 'Cancelled').reduce((sum, order) => sum + order.grandTotal, 0);
  return (
    <>
      <Typography variant="h3" mb={3}>Owner Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}><DashboardCard label="Today's Orders" value={todaysOrders.length} icon={<ReceiptLongRoundedIcon color="primary" fontSize="large" />} /></Grid>
        <Grid size={{ xs: 12, md: 3 }}><DashboardCard label="Revenue" value={`₹${revenue.toLocaleString()}`} icon={<TrendingUpRoundedIcon color="primary" fontSize="large" />} /></Grid>
        <Grid size={{ xs: 12, md: 3 }}><DashboardCard label="Customers" value={customers.length} icon={<PeopleRoundedIcon color="primary" fontSize="large" />} /></Grid>
        <Grid size={{ xs: 12, md: 3 }}><DashboardCard label="Inventory" value={products.length} icon={<Inventory2RoundedIcon color="primary" fontSize="large" />} /></Grid>
      </Grid>
    </>
  );
}
