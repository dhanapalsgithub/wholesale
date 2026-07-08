import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

const GPAY_NUMBER = '9941669513';

export default function PaymentQr({ amount }: { amount: number }) {
  const paymentText = `3 Star Grocery GPay ${GPAY_NUMBER} Amount Rs.${amount}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(paymentText)}`;

  return (
    <Paper sx={{ p: 2.5, borderRadius: 4 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <Box component="img" src={qrUrl} alt="3 Star Grocery GPay QR" sx={{ width: 180, height: 180, borderRadius: 3, bgcolor: 'white', p: 1 }} />
        <Stack spacing={1} flex={1}>
          <Typography variant="h6">Pay 3 Star Grocery</Typography>
          <Typography color="text.secondary">Use Google Pay and send payment to owner mobile number:</Typography>
          <Typography variant="h4" color="primary">{GPAY_NUMBER}</Typography>
          <Typography fontWeight={900}>Amount: ₹{amount}</Typography>
          <Button
            variant="outlined"
            startIcon={<ContentCopyRoundedIcon />}
            onClick={() => navigator.clipboard?.writeText(GPAY_NUMBER)}
            sx={{ width: 'fit-content' }}
          >
            Copy GPay Number
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export { GPAY_NUMBER };
