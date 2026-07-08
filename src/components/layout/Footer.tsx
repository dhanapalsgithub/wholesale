import { Box, Container, Grid, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 8, py: 5, bgcolor: 'rgba(19,163,74,.12)' }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h5" color="primary">3 Star Grocery</Typography>
            <Typography color="text.secondary">Fresh groceries for Kovur, Chennai with a liquid-glass shopping experience.</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography fontWeight={900}>Support</Typography>
            <Typography color="text.secondary">Orders • Wishlist • Cart • Owner Dashboard</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
