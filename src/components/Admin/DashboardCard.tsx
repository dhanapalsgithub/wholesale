import { Paper, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export default function DashboardCard({ label, value, icon }: { label: string; value: string | number; icon: ReactNode }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 4 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        {icon}
        <div>
          <Typography color="text.secondary">{label}</Typography>
          <Typography variant="h4">{value}</Typography>
        </div>
      </Stack>
    </Paper>
  );
}
