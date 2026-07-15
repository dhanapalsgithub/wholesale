import { Stack, TextField, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import TableComponent from '../../components/Admin/TableComponent';
import type { Customer } from '../../types';



export default function AdminCustomersPage() {
  // 1. Loading state-ஐச் சேர்த்துள்ளேன், தரவு வரும் வரை காத்திருக்க உதவும்
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    // 2. Fetch செய்தல்
    fetch('https://script.google.com/macros/s/AKfycbywJNRHKiowWUSUWDoOkI5rzu0_etniv_sBWzRsqqDpkOvGlm7Ai3s6-IeMiCK0JA8o/exec')
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("தரவைப் பெறுவதில் பிழை:", err);
        setLoading(false);
      });
  }, []);

  // 3. Search logic
  const rows = customers.filter((customer) => 
    customer.name?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Customer Management</Typography>
      <TextField 
        label="Search customers" 
        value={query} 
        onChange={(event) => setQuery(event.target.value)} 
      />
      
      {loading ? (
        <CircularProgress /> // தரவு வரும்போது ஒரு சுழலும் வட்டம் தெரியும்
      ) : (
        <TableComponent 
          rows={rows} 
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'mobile', label: 'Phone' },
            { key: 'city', label: 'Address' },
            { key: 'orders', label: 'Orders', render: (row) => row.orders?.length || 0 },
            { key: 'wallet', label: 'Wallet', render: (row) => `₹${row.wallet || 0}` },
          ]} 
        />
      )}
    </Stack>
  );
}