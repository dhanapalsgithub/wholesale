import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import { Box, Button, Container, Stack } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const links = [
  ['Dashboard', '/admin/dashboard', <DashboardRoundedIcon />],
  ['Products', '/admin/products', <Inventory2RoundedIcon />],
  ['Customers', '/admin/customers', <PeopleRoundedIcon />],
  ['Orders', '/admin/orders', <ReceiptLongRoundedIcon />],
  ['Reports', '/admin/reports', <SummarizeRoundedIcon />],
  ['Invoices', '/admin/invoice', <ReceiptLongRoundedIcon />],
] as const;

export default function AdminLayout() {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={3}>
        <Box className="glass" sx={{ p: 2, borderRadius: 4, minWidth: 230, height: 'fit-content', position: { md: 'sticky' }, top: 96 }}>
          <Stack spacing={1}>
            {links.map(([label, to, icon]) => <Button key={to} component={Link} to={to} startIcon={icon} sx={{ justifyContent: 'flex-start' }}>{label}</Button>)}
            <Button color="error" sx={{ justifyContent: 'flex-start' }}>Logout</Button>
          </Stack>
        </Box>
        <Box flex={1}><Outlet /></Box>
      </Stack>
    </Container>
  );
}
