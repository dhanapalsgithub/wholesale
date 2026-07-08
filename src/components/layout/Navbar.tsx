import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import { AppBar, Avatar, Badge, Box, Button, Container, IconButton, InputBase, Stack, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import type { Customer } from '../../types';

interface Props {
  currentUser: Customer | null;
  cartCount: number;
  wishCount: number;
  darkMode: boolean;
  onToggleDark: () => void;
  search: string;
  onSearch: (value: string) => void;
}

export default function Navbar({ currentUser, cartCount, wishCount, darkMode, onToggleDark, search, onSearch }: Props) {
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" elevation={0} sx={{ background: 'rgba(255,255,255,.58)', color: 'text.primary', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,.35)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2, py: 1 }}>
          <Typography component={Link} to="/" variant="h5" color="primary" fontWeight={1000}>
            3 Star Grocery
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            <LocationOnRoundedIcon color="primary" />
            <Typography variant="body2">Deliver to Kovur, Chennai</Typography>
          </Box>
          <InputBase
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && navigate(`/products?search=${encodeURIComponent(search)}`)}
            placeholder="Search groceries..."
            sx={{ flex: 1, px: 2, py: 1, borderRadius: 999, bgcolor: 'rgba(255,255,255,.62)', border: '1px solid rgba(19,163,74,.18)' }}
          />
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Button component={Link} to="/products" sx={{ display: { xs: 'none', lg: 'inline-flex' } }}>
              Categories
            </Button>
            <Button startIcon={<LocalOfferRoundedIcon />} sx={{ display: { xs: 'none', lg: 'inline-flex' } }}>
              Offers
            </Button>
            <IconButton component={Link} to="/wishlist">
              <Badge badgeContent={wishCount} color="error">
                <FavoriteRoundedIcon />
              </Badge>
            </IconButton>
            <IconButton component={Link} to="/cart">
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartRoundedIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={onToggleDark}>{darkMode ? <WbSunnyRoundedIcon /> : <DarkModeRoundedIcon />}</IconButton>
            {currentUser ? <Avatar component={Link} to="/profile">{currentUser.name[0]}</Avatar> : <Button component={Link} to="/login" variant="contained">Login</Button>}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
