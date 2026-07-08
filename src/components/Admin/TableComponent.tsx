import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import type { ReactNode } from 'react';

export default function TableComponent<T extends { id: string }>({ rows, columns }: { rows: T[]; columns: { key: keyof T | string; label: string; render?: (row: T) => ReactNode }[] }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>{columns.map((column) => <TableCell key={String(column.key)}>{column.label}</TableCell>)}</TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>{columns.map((column) => <TableCell key={String(column.key)}>{column.render ? column.render(row) : String(row[column.key as keyof T] ?? '')}</TableCell>)}</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
