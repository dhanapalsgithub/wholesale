import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { IconButton, Stack, Typography } from '@mui/material';

export default function QuantityButton({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton size="small" onClick={() => onChange(Math.max(1, value - 1))}>
        <RemoveRoundedIcon />
      </IconButton>
      <Typography fontWeight={900}>{value}</Typography>
      <IconButton size="small" color="primary" onClick={() => onChange(value + 1)}>
        <AddRoundedIcon />
      </IconButton>
    </Stack>
  );
}
