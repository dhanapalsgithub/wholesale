import { Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import TableComponent from '../../components/Admin/TableComponent';
import type { Customer } from '../../types';

export default function AdminCustomersPage({ customers }: { customers: Customer[] }) {
  const [query, setQuery] = useState('');
  const rows = customers.filter((customer) => customer.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <Stack spacing={2}>
      <Typography variant="h3">Customer Management</Typography>
      <TextField label="Search customers" value={query} onChange={(event) => setQuery(event.target.value)} />
      <TableComponent rows={rows} columns={[
        { key: 'name', label: 'Name' },
        { key: 'mobile', label: 'Phone' },
        { key: 'city', label: 'Address' },
        { key: 'orders', label: 'Orders', render: (row) => row.orders.length },
        { key: 'wallet', label: 'Wallet', render: (row) => `₹${row.wallet}` },
      ]} />
    </Stack>
  );
}
