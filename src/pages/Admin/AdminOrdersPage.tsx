import { Button, Chip, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import TableComponent from '../../components/Admin/TableComponent';
import type { Order, OrderStatus } from '../../types';

const statuses: OrderStatus[] = ['Pending', 'Accepted', 'Packed', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminOrdersPage({ orders, onStatus }: { orders: Order[]; onStatus: (id: string, status: OrderStatus) => void }) {
  const [status, setStatus] = useState('All');
  const [query, setQuery] = useState('');
  const rows = orders.filter((order) => (status === 'All' || order.status === status) && order.id.toLowerCase().includes(query.toLowerCase())).slice(0, 100);
  return (
    <Stack spacing={2}>
      <Typography variant="h3">Order Management</Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <TextField label="Search order" value={query} onChange={(event) => setQuery(event.target.value)} />
        <TextField select label="Status Filter" value={status} onChange={(event) => setStatus(event.target.value)}>
          {['All', ...statuses].map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
        </TextField>
        <TextField label="Date Filter" type="date" InputLabelProps={{ shrink: true }} />
      </Stack>
      <TableComponent rows={rows} columns={[
        { key: 'id', label: 'Order' },
        { key: 'placedAt', label: 'Date', render: (row) => new Date(row.placedAt).toLocaleDateString() },
        { key: 'status', label: 'Status', render: (row) => <Chip label={row.status} /> },
        { key: 'paymentMethod', label: 'Payment' },
        { key: 'grandTotal', label: 'Total', render: (row) => `₹${row.grandTotal}` },
        { key: 'id', label: 'Actions', render: (row) => <Stack direction="row" spacing={1}>{statuses.map((next) => <Button key={next} size="small" onClick={() => onStatus(row.id, next)}>{next === 'Accepted' ? 'Accept Order' : next}</Button>)}</Stack> },
      ]} />
    </Stack>
  );
}
