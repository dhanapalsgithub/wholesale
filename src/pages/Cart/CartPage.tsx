import { Container, Paper, Typography } from '@mui/material';
import CartDrawer from '../../components/Cart/CartDrawer';
import PaymentQr from '../../components/Cart/PaymentQr';
import type { CartItem, Product } from '../../types';

export default function CartPage({ cart, products, onQty, onRemove }: { cart: CartItem[]; products: Product[]; onQty: (id: string, qty: number) => void; onRemove: (id: string) => void }) {
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + (product?.offerPrice ?? 0) * item.quantity;
  }, 0);
  const gst = Math.round(subtotal * 0.05);
  const delivery = subtotal > 599 ? 0 : 35;
  const total = subtotal ? subtotal + gst + delivery : 0;
  return <Container maxWidth="md" sx={{ py: 4 }}><Typography variant="h3" mb={2}>Cart</Typography><Paper sx={{ mb: 2 }}><CartDrawer cart={cart} products={products} onQty={onQty} onRemove={onRemove} /></Paper>{Boolean(total) && <PaymentQr amount={total} />}</Container>;
}
