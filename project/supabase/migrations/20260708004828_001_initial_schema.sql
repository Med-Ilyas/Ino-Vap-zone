/*
# Initial Schema for INO-VAP ZONE Product Catalogue

1. New Tables
- `categories`: Product categories (Tri Clamp, SMS, DIN, BSP, Valves, Flanges, Pipe Fittings, Steam Equipment, Pressure Gauges, Industrial Instruments)
  - id (uuid, primary key)
  - name (text, unique, not null)
  - slug (text, unique, not null)
  - description (text)
  - image_url (text)
  - display_order (integer, default 0)
  - created_at (timestamp)
  
- `products`: Product catalogue (scalable to 100,000+ products)
  - id (uuid, primary key)
  - name (text, not null)
  - slug (text, unique, not null)
  - sku (text, unique, not null)
  - reference (text)
  - category_id (uuid, foreign key to categories)
  - description (text)
  - technical_specifications (jsonb)
  - material (text) - 304 or 316 Stainless Steel
  - available_sizes (text[])
  - image_url (text)
  - pdf_datasheet_url (text)
  - is_featured (boolean, default false)
  - created_at (timestamp)
  - updated_at (timestamp)

- `product_relations`: Related products (many-to-many)
  - id (uuid, primary key)
  - product_id (uuid, foreign key)
  - related_product_id (uuid, foreign key)
  - created_at (timestamp)

2. Indexes
- Index on products.category_id for category filtering
- Index on products.slug for fast lookups
- Index on products.sku for SKU searches
- Index on products.is_featured for featured products queries
- Index on categories.slug for category navigation

3. Security
- RLS enabled on all tables
- Public read access (anon + authenticated) - single-tenant, no auth in Phase 1
- No write access from anon (admin features in later phases)

4. Important Notes
- Schema designed for 100,000+ products scalability
- JSONB for flexible technical specifications
- Text array for available sizes
- Timestamps for auditing
*/

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  sku text UNIQUE NOT NULL,
  reference text,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  description text,
  technical_specifications jsonb DEFAULT '{}',
  material text DEFAULT '304',
  available_sizes text[] DEFAULT '{}',
  image_url text,
  pdf_datasheet_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Product Relations Table (for related products)
CREATE TABLE IF NOT EXISTS product_relations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  related_product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(product_id, related_product_id),
  CHECK (product_id != related_product_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_product_relations_product_id ON product_relations(product_id);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_relations ENABLE ROW LEVEL SECURITY;

-- Categories Policies (public read)
DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

-- Products Policies (public read)
DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- Product Relations Policies (public read)
DROP POLICY IF EXISTS "public_read_product_relations" ON product_relations;
CREATE POLICY "public_read_product_relations" ON product_relations FOR SELECT
  TO anon, authenticated USING (true);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for products table
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();