import { Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import type { Customer } from '../../types';

export default function ProfilePage({ customer }: { customer: Customer | null }) {
  if (!customer) return <Container sx={{ py: 5 }}><Typography>Please login to view profile.</Typography></Container>;
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" mb={2}>Profile</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}><Paper sx={{ p: 3 }}><Stack spacing={2}><Typography variant="h5">Personal Information</Typography><TextField label="Name" value={customer.name} /><TextField label="Mobile" value={customer.mobile} /><TextField label="Email" value={customer.email} /></Stack></Paper></Grid>
        <Grid size={{ xs: 12, md: 6 }}><Paper sx={{ p: 3 }}><Typography variant="h5">Wallet</Typography><Typography variant="h3">₹{customer.wallet}</Typography><Typography>Reward Points: {customer.rewardPoints}</Typography></Paper></Grid>
        <Grid size={{ xs: 12 }}><Paper sx={{ p: 3 }}><Typography variant="h5">Address Book</Typography>{customer.addresses.map((address) => <Typography key={address.id}>{address.label}: {address.line1}, {address.city}, {address.pincode}</Typography>)}</Paper></Grid>
        <Grid size={{ xs: 12 }}><Paper sx={{ p: 3 }}><Typography variant="h5">Change Password UI</Typography><Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mt={2}><TextField label="Old Password" /><TextField label="New Password" /><TextField label="Confirm Password" /></Stack></Paper></Grid>
      </Grid>
    </Container>
  );
}
