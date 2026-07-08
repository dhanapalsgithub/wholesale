import { Autocomplete, TextField } from '@mui/material';

export default function SearchBar({ value, suggestions, onChange }: { value: string; suggestions: string[]; onChange: (value: string) => void }) {
  return (
    <Autocomplete
      freeSolo
      options={suggestions}
      inputValue={value}
      onInputChange={(_, next) => onChange(next)}
      renderInput={(params) => <TextField {...params} label="Search products" />}
    />
  );
}
