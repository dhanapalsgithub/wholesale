import { MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import PrintableInvoice from '../../components/Admin/PrintableInvoice';
import type { Customer, Order, Product } from '../../types';

export default function InvoicePage({ orders, customers, products }: { orders: Order[]; customers: Customer[]; products: Product[] }) {
  const [orderId, setOrderId] = useState(orders[0]?.id ?? '');
  const order = orders.find((entry) => entry.id === orderId) ?? orders[0];
  const customer = customers.find((entry) => entry.id === order?.customerId) ?? customers[0];
  return (
    <Stack spacing={2}>
      <Typography variant="h3">Owner Invoice Page</Typography>
      <TextField select label="Select Customer / Order" value={order?.id ?? ''} onChange={(event) => setOrderId(event.target.value)}>
        {orders.slice(0, 100).map((entry) => <MenuItem key={entry.id} value={entry.id}>{entry.id} - {customers.find((customerRow) => customerRow.id === entry.customerId)?.name}</MenuItem>)}
      </TextField>
      {order && customer && <PrintableInvoice order={order} customer={customer} products={products} />}
    </Stack>
  );
}
