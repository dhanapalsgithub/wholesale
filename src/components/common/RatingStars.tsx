import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Box, Typography } from '@mui/material';

export default function RatingStars({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <StarRoundedIcon color="warning" fontSize="small" />
      <Typography variant="body2" fontWeight={800}>
        {rating}
      </Typography>
      {reviews !== undefined && (
        <Typography variant="caption" color="text.secondary">
          ({reviews})
        </Typography>
      )}
    </Box>
  );
}
