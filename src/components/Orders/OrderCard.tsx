import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import type { Order } from '../../types';

export default function OrderCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardContent>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
          <div>
            <Typography variant="h6">{order.id}</Typography>
            <Typography color="text.secondary">{new Date(order.placedAt).toLocaleDateString()} • {order.items.length} items</Typography>
          </div>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip label={order.status} color={order.status === 'Delivered' ? 'success' : order.status === 'Cancelled' ? 'error' : 'primary'} />
            <Typography fontWeight={900}>₹{order.grandTotal}</Typography>
            <Button>Invoice</Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
