import { Container, Stack, Typography } from '@mui/material';
import OrderCard from '../../components/Orders/OrderCard';
import type { Order } from '../../types';

export default function OrdersPage({ orders }: { orders: Order[] }) {
  return <Container maxWidth="lg" sx={{ py: 4 }}><Typography variant="h3" mb={2}>My Orders</Typography><Stack spacing={2}>{orders.map((order) => <OrderCard key={order.id} order={order} />)}</Stack>{!orders.length && <Typography>No orders yet.</Typography>}</Container>;
}
