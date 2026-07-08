import { Card, CardActionArea, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Category } from '../../types';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/category/${category.id}`} sx={{ p: 1.5 }}>
        <CardMedia component="img" image={category.image} alt={category.name} sx={{ height: 92, borderRadius: 3, objectFit: 'cover' }} />
        <Typography align="center" fontWeight={900} mt={1}>
          {category.name}
        </Typography>
      </CardActionArea>
    </Card>
  );
}
