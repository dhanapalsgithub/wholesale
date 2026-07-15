import { Button, Container, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import PaymentQr, { GPAY_NUMBER } from '../../components/Cart/PaymentQr';
import type { CartItem, Customer, Order, Product } from '../../types';

export default function CheckoutPage({
  currentUser,
  cart,
  products,
  onPlaceOrder
}: {
  currentUser: Customer | null;
  cart: CartItem[];
  products: Product[];
  onPlaceOrder: (paymentMethod: string, addressId: string, paymentDetails?: string) => Order | null
}) {
  const [payment, setPayment] = useState('Cash on Delivery');
  const [addressId, setAddressId] = useState(
    (currentUser?.addresses && currentUser.addresses.length > 0)
      ? currentUser.addresses[0].id
      : 'new'
  );
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentRef, setPaymentRef] = useState('');
  const [manualAddress, setManualAddress] = useState('');

  const rows = cart.map((item) => ({ ...item, product: products.find((product) => product.id === item.productId)! })).filter((item) => item.product);
  const subtotal = rows.reduce((sum, item) => sum + item.product.offerPrice * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const delivery = subtotal > 599 ? 0 : 35;

  if (!currentUser) return <Container sx={{ py: 5 }}><Typography>Please login before checkout.</Typography></Container>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h3">Checkout</Typography>

          <TextField
            select
            label="Select Address"
            value={addressId}
            onChange={(e) => setAddressId(e.target.value)}
            fullWidth
          >
            {/* ஏற்கனவே உள்ள முகவரிகளை மேப் செய்யவும் */}
            {(currentUser?.addresses || []).map((addr) => (
              <MenuItem key={addr.id} value={addr.id}>
                {addr.line1}, {addr.city}
              </MenuItem>
            ))}
            <MenuItem value="new">Add New Address...</MenuItem>
          </TextField>

          {addressId === 'new' && (
            <TextField
              label="Enter Address Manually"
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
              placeholder="Type your full address here..."
            />
          )}

          <TextField select label="Payment Method" value={payment} onChange={(event) => setPayment(event.target.value)}>
            {['Cash on Delivery', 'Google Pay', 'PhonePe', 'Paytm', 'UPI', 'Card'].map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
          </TextField>

          {rows.map((item) => <Typography key={item.productId}>{item.product.name} x {item.quantity} - ₹{item.product.offerPrice * item.quantity}</Typography>)}
          <Typography>GST: ₹{gst} • Delivery: ₹{delivery}</Typography>
          <Typography variant="h5">Grand Total: ₹{subtotal + gst + delivery}</Typography>

          {payment === 'Google Pay' && (
            <>
              <PaymentQr amount={subtotal + gst + delivery} />
              <TextField label="Amount Paid" value={amountPaid} onChange={(event) => setAmountPaid(event.target.value)} placeholder={`${subtotal + gst + delivery}`} />
              <TextField label="GPay Transaction ID / Reference" value={paymentRef} onChange={(event) => setPaymentRef(event.target.value)} placeholder="Enter payment reference after paying" />
            </>
          )}

          <Button
            variant="outlined"
            href={`sms:${GPAY_NUMBER}?body=${encodeURIComponent(`3 Star Grocery payment confirmation. Amount paid: Rs.${amountPaid || subtotal + gst + delivery}. Reference: ${paymentRef || 'Not entered yet'}. Customer: ${currentUser.name}`)}`}
          >
            Send Payment SMS
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              const paymentDetails = payment === 'Google Pay'
                ? `Payment Method: Google Pay\nOwner GPay Number: ${GPAY_NUMBER}\nAmount Paid: ₹${amountPaid || subtotal + gst + delivery}\nPayment Reference: ${paymentRef || 'Not entered'}`
                : `Payment Method: ${payment}`;

              const order = onPlaceOrder(payment, addressId, paymentDetails);

              if (order && order.address) {
                const productList = rows.map(item => `${item.product.name} Qty ${item.quantity} Price ${item.product.offerPrice}`).join('\n');
                const text = encodeURIComponent(
                  `Hello 3 Star Grocery\nCustomer Name: ${currentUser.name}\nMobile: ${currentUser.mobile}\nAddress: ${order.address.line1}, ${order.address.city}\nProducts:\n${productList}\nGrand Total: ₹${order.grandTotal}\n${paymentDetails}\nPlease confirm my order.`
                );
                window.open(`https://wa.me/91${GPAY_NUMBER}?text=${text}`, '_blank');
              } else {
                alert("Failed to place order. Please check your cart or address.");
              }
            }}
          >
            Place Order on WhatsApp
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}