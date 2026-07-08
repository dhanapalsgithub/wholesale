import json
import pathlib
import re

import openpyxl

XLSX = pathlib.Path(r"C:\Users\DELL\Downloads\3 star.xlsx")
DATA_TS = pathlib.Path(r"C:\Users\DELL\Documents\Codex\2026-07-08\src-components-common-applogo-tsx-pagetitle\src\data\data.ts")

workbook = openpyxl.load_workbook(XLSX, data_only=True)
sheet = workbook["Products"]
rows = []


def number(value, default=0.0):
    if value is None:
      return default
    if isinstance(value, (int, float)):
      return float(value)
    match = re.search(r"\d+(?:\.\d+)?", str(value))
    return float(match.group(0)) if match else default

for row in sheet.iter_rows(min_row=2, values_only=True):
    product_id, name, category, wholesale, retail, unit, stock, sales_count, image, status, _purchase = (list(row) + [None] * 11)[:11]
    if not product_id or not name:
        continue

    wholesale_price = number(wholesale, 1)
    retail_price = number(retail, wholesale_price)
    stock_value = number(stock, 0)

    rows.append(
        {
            "sourceId": str(product_id).strip(),
            "name": str(name).strip(),
            "category": str(category or "Grocery").strip(),
            "wholesalePrice": round(wholesale_price, 2),
            "retailPrice": round(retail_price, 2),
            "unit": str(unit or "pack").strip(),
            "stock": min(max(round(stock_value), 0), 9999),
            "salesCount": round(number(sales_count, 0)),
            "image": str(image or "").strip(),
            "status": str(status or "Active").strip(),
        }
    )


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


raw_lines = ["const excelProductRows = ["]
for item in rows:
    parts = ", ".join(
        f"{key}: {ts_string(value) if isinstance(value, str) else value}"
        for key, value in item.items()
    )
    raw_lines.append(f"  {{ {parts} }},")
raw_lines.append("] as const;")

raw_products = "\n".join(raw_lines)

new_top = f"""import type {{ Category, Customer, Order, Owner, Product }} from '../types';

const fallbackImage = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80';

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'grocery';

{raw_products}

export const categories: Category[] = Array.from(
  new Map(
    excelProductRows.map((product) => [
      slugify(product.category),
      {{
        id: slugify(product.category),
        name: product.category,
        image: product.image || fallbackImage,
      }},
    ]),
  ).values(),
);

export const products: Product[] = excelProductRows.map((product, index) => {{
  const category = slugify(product.category);
  return {{
    id: product.sourceId || `excel-${{index + 1}}`,
    name: product.name,
    category,
    brand: '3 Star Grocery',
    description: `${{product.name}} from 3 Star Grocery, Kovur Chennai.`,
    price: product.retailPrice,
    discount: 0,
    offerPrice: product.retailPrice,
    stock: product.stock,
    rating: 4.5,
    reviews: 20 + index,
    unit: product.unit,
    weight: product.unit,
    images: [product.image || fallbackImage],
    featured: index % 2 === 0,
    popular: product.salesCount > 0 || index % 3 === 0,
    newArrival: index % 5 === 0,
    organic: product.category.toLowerCase().includes('organic'),
    deliveryTime: 'Today',
    nutrition: ['Fresh stock', 'Quality checked', 'Packed by 3 Star Grocery'],
    highlights: ['Rate imported from Excel', 'Image imported from Excel', product.status === 'Active' ? 'Available now' : product.status],
    specifications: {{
      Category: product.category,
      Unit: product.unit,
      WholesalePrice: `₹${{product.wholesalePrice}}`,
      RetailPrice: `₹${{product.retailPrice}}`,
      SourceProductId: product.sourceId,
    }},
  }};
}});
"""

current = DATA_TS.read_text(encoding="utf-8")
owner_index = current.index("export const owner")
DATA_TS.write_text(new_top + "\n" + current[owner_index:], encoding="utf-8")
print(f"Imported {len(rows)} products from Excel into data.ts")
