import type { Product } from '../types';

const PRODUCT_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1dVgh3ha6NXwP5G8dlsvNwLtzCLYltqe861xg4HQRvDo/gviz/tq?tqx=out:csv&gid=1846822926';

const findValue = (row: Record<string, string>, names: string[]) => {
  const key = Object.keys(row).find((entry) => names.some((name) => entry.includes(name)));
  return key ? row[key]?.trim() ?? '' : '';
};

const parseCsv = (csv: string) => {
  const rows: string[][] = [];
  let current = '';
  let row: string[] = [];
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const next = csv[index + 1];

    if (char === '"' && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(current);
      current = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') index += 1;
      row.push(current);
      rows.push(row);
      row = [];
      current = '';
    } else {
      current += char;
    }
  }

  if (current || row.length) {
    row.push(current);
    rows.push(row);
  }

  return rows.filter((entry) => entry.some(Boolean));
};

export async function loadProductsFromGoogleSheet(): Promise<Product[]> {
  const response = await fetch(PRODUCT_SHEET_CSV_URL);
  if (!response.ok) throw new Error('Could not load product sheet.');

  const rows = parseCsv(await response.text());
  const headers = rows[0].map((header) => header.toLowerCase().trim());

  return rows.slice(1).map((values, index) => {
    const row = headers.reduce<Record<string, string>>((record, header, headerIndex) => {
      record[header] = values[headerIndex] ?? '';
      return record;
    }, {});

    const name = findValue(row, ['product', 'item', 'name']) || `Sheet Product ${index + 1}`;
    const rawCategory = findValue(row, ['category', 'type']) || 'Grocery';
    const category = rawCategory.toLowerCase().replaceAll(' ', '-');
    const image = findValue(row, ['image', 'photo', 'img', 'url']) || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80';
    const rateText = findValue(row, ['rate', 'price', 'mrp', 'amount']).replace(/[^\d.]/g, '');
    const rate = Number(rateText || 0) || 1;
    const weight = findValue(row, ['weight', 'size', 'qty', 'quantity']) || '1 pack';
    const stockText = findValue(row, ['stock', 'available']).replace(/[^\d]/g, '');
    const stock = Number(stockText || 50);

    return {
      id: `sheet-${index + 1}`,
      name,
      category,
      brand: findValue(row, ['brand']) || '3 Star Grocery',
      description: findValue(row, ['description', 'details']) || `${name} from 3 Star Grocery.`,
      price: rate,
      discount: 0,
      offerPrice: rate,
      stock,
      rating: 4.5,
      reviews: 10 + index,
      unit: findValue(row, ['unit', 'package']) || 'pack',
      weight,
      images: [image],
      featured: index % 2 === 0,
      popular: index % 3 === 0,
      newArrival: index % 4 === 0,
      organic: rawCategory.toLowerCase().includes('organic'),
      deliveryTime: 'Today',
      nutrition: ['Fresh stock', 'Quality checked'],
      highlights: ['Rate loaded from Google Sheet', 'Image loaded from Google Sheet'],
      specifications: {
        Source: 'Google Sheet',
        Weight: weight,
        Package: findValue(row, ['package']) || 'Shop package',
      },
    };
  });
}
