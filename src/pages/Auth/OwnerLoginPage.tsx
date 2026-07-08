import { Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import type { Owner } from '../../types';

export default function OwnerLoginPage({ owner, onLogin }: { owner: Owner; onLogin: () => void }) {
  const [email, setEmail] = useState(owner.email);
  const [password, setPassword] = useState(owner.password);
  const [error, setError] = useState('');
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 5 }}>
        <Stack spacing={2}>
          <Typography variant="h3">Owner Login</Typography>
          <TextField label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <TextField label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" onClick={() => (email === owner.email && password === owner.password ? onLogin() : setError('Invalid owner login.'))}>Enter dashboard</Button>
        </Stack>
      </Paper>
    </Container>
  );
}
