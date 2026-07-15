import { Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import type { Customer } from '../../types';

interface Props {
  customer: Customer | null;
}

export default function ProfilePage({ customer }: Props) {
  // 1. பயனர் லாகின் செய்யவில்லை என்றால்
  if (!customer) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography>Please login to view profile.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" mb={2}>Profile</Typography>
      <Grid container spacing={2}>
        {/* 2. Personal Information */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h5">Personal Information</Typography>
              <TextField label="Name" value={customer.name || ''} InputProps={{ readOnly: true }} />
              <TextField label="Mobile" value={customer.mobile || ''} InputProps={{ readOnly: true }} />
              <TextField label="Email" value={customer.email || ''} InputProps={{ readOnly: true }} />
            </Stack>
          </Paper>
        </Grid>

        {/* 3. Wallet */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5">Wallet</Typography>
            <Typography variant="h3">₹{customer.wallet || 0}</Typography>
            <Typography>Reward Points: {customer.rewardPoints || 0}</Typography>
          </Paper>
        </Grid>

        {/* 4. Address Book - (customer.addresses || []) மூலம் பிழை தவிர்க்கப்படுகிறது */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5">Address Book</Typography>
            {(customer.addresses || []).length > 0 ? (
              (customer.addresses || []).map((address) => (
                <Typography key={address.id}>
                  {address.label}: {address.line1}, {address.city}, {address.pincode}
                </Typography>
              ))
            ) : (
              <Typography>No addresses found.</Typography>
            )}
          </Paper>
        </Grid>

        {/* 5. Password UI */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5">Change Password</Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mt={2}>
              <TextField label="Old Password" type="password" />
              <TextField label="New Password" type="password" />
              <TextField label="Confirm Password" type="password" />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}