import { Box, Checkbox, FormControlLabel, Slider, Stack, Typography } from '@mui/material';

export interface Filters {
  price: number[];
  minRating: number;
  inStock: boolean;
  organic: boolean;
}

export default function FilterSidebar({ filters, onChange }: { filters: Filters; onChange: (filters: Filters) => void }) {
  return (
    <Box className="glass" sx={{ p: 2, borderRadius: 4, position: { md: 'sticky' }, top: 96 }}>
      <Typography variant="h6" mb={2}>
        Filters
      </Typography>
      <Stack spacing={2}>
        <Box>
          <Typography fontWeight={800}>Price</Typography>
          <Slider value={filters.price} min={0} max={800} onChange={(_, value) => onChange({ ...filters, price: value as number[] })} valueLabelDisplay="auto" />
        </Box>
        <Box>
          <Typography fontWeight={800}>Rating</Typography>
          <Slider value={filters.minRating} min={3} max={5} step={0.5} onChange={(_, value) => onChange({ ...filters, minRating: value as number })} valueLabelDisplay="auto" />
        </Box>
        <FormControlLabel control={<Checkbox checked={filters.inStock} onChange={(event) => onChange({ ...filters, inStock: event.target.checked })} />} label="In stock" />
        <FormControlLabel control={<Checkbox checked={filters.organic} onChange={(event) => onChange({ ...filters, organic: event.target.checked })} />} label="Organic" />
      </Stack>
    </Box>
  );
}
