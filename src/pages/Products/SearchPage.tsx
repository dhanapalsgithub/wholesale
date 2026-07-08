import { Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import SearchBar from '../../components/Products/SearchBar';

export default function SearchPage({ suggestions }: { suggestions: string[] }) {
  const [query, setQuery] = useState('');
  return <Container maxWidth="md" sx={{ py: 4 }}><Stack spacing={3}><Typography variant="h3">Search</Typography><SearchBar value={query} suggestions={suggestions} onChange={setQuery} /><Typography>Recent Searches: milk, bread, fruit</Typography><Typography>Popular Searches: {suggestions.join(', ')}</Typography></Stack></Container>;
}
