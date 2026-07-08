import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import type { CartItem, Product } from '../../types';
import QuantityButton from '../common/QuantityButton';

export default function CartDrawer({ cart, products, onQty, onRemove }: { cart: CartItem[]; products: Product[]; onQty: (id: string, qty: number) => void; onRemove: (id: string) => void }) {
  const rows = cart.map((item) => ({ ...item, product: products.find((product) => product.id === item.productId)! })).filter((item) => item.product);
  const subtotal = rows.reduce((sum, item) => sum + item.product.offerPrice * item.quantity, 0);
  return (
    <Box>
      <List>
        {rows.map((item) => (
          <ListItem key={item.productId} secondaryAction={<IconButton onClick={() => onRemove(item.productId)}><DeleteRoundedIcon /></IconButton>}>
            <ListItemAvatar><Avatar src={item.product.images[0]} /></ListItemAvatar>
            <ListItemText primary={item.product.name} secondary={`₹${item.product.offerPrice} x ${item.quantity}`} />
            <QuantityButton value={item.quantity} onChange={(qty) => onQty(item.productId, qty)} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Stack spacing={2} sx={{ p: 2 }}>
        <Typography variant="h6">Subtotal: ₹{subtotal}</Typography>
        <Button component={Link} to="/checkout" variant="contained" disabled={!rows.length}>Checkout</Button>
      </Stack>
    </Box>
  );
}
