import { Button, Container, Paper, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import type { Customer, NewCustomerInput } from '../../types';

interface Props {
  customers: Customer[];
  onLogin: (customer: Customer) => void;
  onRegister: (input: NewCustomerInput) => Promise<{ ok: boolean; message: string }>;
}

export default function LoginPage({ customers, onLogin, onRegister }: Props) {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('customer1@grocery.test');
  const [password, setPassword] = useState('customer123');
  const [register, setRegister] = useState<NewCustomerInput>({
    name: '',
    email: '',
    password: '',
    mobile: '',
    address: '',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const updateRegister = (key: keyof NewCustomerInput, value: string) => {
    setRegister((current) => ({ ...current, [key]: value }));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 5 }}>
        <Stack spacing={2}>
          <Typography variant="h3">Customer Account</Typography>
          <Tabs value={tab} onChange={(_, value) => { setTab(value); setError(''); }}>
            <Tab label="Login" />
            <Tab label="New Customer" />
          </Tabs>
          {tab === 0 && (
            <>
              <TextField label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <TextField label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </>
          )}
          {tab === 1 && (
            <>
              <TextField label="Name" value={register.name} onChange={(event) => updateRegister('name', event.target.value)} />
              <TextField label="Mobile" value={register.mobile} onChange={(event) => updateRegister('mobile', event.target.value)} />
              <TextField label="Email" value={register.email} onChange={(event) => updateRegister('email', event.target.value)} />
              <TextField label="Password" type="password" value={register.password} onChange={(event) => updateRegister('password', event.target.value)} />
              <TextField label="Address" value={register.address} onChange={(event) => updateRegister('address', event.target.value)} />
              <TextField label="City" value={register.city} onChange={(event) => updateRegister('city', event.target.value)} />
              <TextField label="State" value={register.state} onChange={(event) => updateRegister('state', event.target.value)} />
              <TextField label="Pincode" value={register.pincode} onChange={(event) => updateRegister('pincode', event.target.value)} />
            </>
          )}
          {error && <Typography color="error">{error}</Typography>}
          {tab === 0 && (
            <Button variant="contained" onClick={() => {
              const customer = customers.find((entry) => entry.email === email && entry.password === password);
              if (customer) onLogin(customer); else setError('Invalid customer login.');
            }}>Login</Button>
          )}
          {tab === 1 && (
            <Button
              variant="contained"
              disabled={saving}
              onClick={async () => {
                if (!register.name || !register.email || !register.password || !register.mobile || !register.address || !register.pincode) {
                  setError('Please fill all required customer details.');
                  return;
                }
                setSaving(true);
                const result = await onRegister(register);
                setSaving(false);
                if (!result.ok) setError(result.message);
              }}
            >
              {saving ? 'Saving...' : 'Register Customer'}
            </Button>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}
