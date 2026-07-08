import { Box, Button, Paper, Typography } from '@mui/material';
import type { Customer, Order, Product } from '../../types';

export default function PrintableInvoice({ order, customer, products }: { order: Order; customer: Customer; products: Product[] }) {
  return (
    <Paper sx={{ p: 3 }} id="invoice">
      <Typography variant="h4">Invoice {order.id}</Typography>
      <Typography>{customer.name} • {customer.mobile}</Typography>
      <Typography mb={2}>{order.address.line1}, {order.address.city}</Typography>
      {order.items.map((item) => {
        const product = products.find((entry) => entry.id === item.productId);
        return <Typography key={item.productId}>{product?.name} x {item.quantity} - ₹{item.price * item.quantity}</Typography>;
      })}
      {order.paymentDetails && <Typography mt={2} whiteSpace="pre-line">{order.paymentDetails}</Typography>}
      <Typography variant="h5" mt={2}>Grand Total: ₹{order.grandTotal}</Typography>
      <Box mt={2}><Button variant="contained" onClick={() => window.print()}>Print Button</Button></Box>
    </Paper>
  );
}
