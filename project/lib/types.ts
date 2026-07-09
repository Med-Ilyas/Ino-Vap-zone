export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  reference: string | null;
  category_id: string;
  description: string | null;
  technical_specifications: Record<string, string>;
  material: string;
  available_sizes: string[];
  image_url: string | null;
  pdf_datasheet_url: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  // Enhanced fields
  brand: string;
  connection_type: string | null;
  standard: string | null;
  applications: string[];
  dimensions: Record<string, string>;
  weight_kg: number | null;
  pressure_rating: string | null;
  temperature_range: string | null;
  surface_finish: string | null;
  is_accessory: boolean;
  parent_product_id: string | null;
  downloads_count: number;
  gallery_images: string[];
}

export interface ProductWithCategory extends Product {
  categories: Category;
}

export interface ProductRelation {
  id: string;
  product_id: string;
  related_product_id: string;
  created_at: string;
}

export interface Download {
  id: string;
  product_id: string;
  type: 'datasheet' | 'certificate' | 'cad' | 'manual' | 'other';
  title: string;
  file_url: string | null;
  filename: string | null;
  file_size_kb: number | null;
  downloads_count: number;
  created_at: string;
}

export interface Favorite {
  id: string;
  session_id: string;
  product_id: string;
  created_at: string;
}

export interface RecentlyViewed {
  id: string;
  session_id: string;
  product_id: string;
  viewed_at: string;
}

export const CATEGORIES = [
  { name: 'Tri Clamp', slug: 'tri-clamp' },
  { name: 'SMS', slug: 'sms' },
  { name: 'DIN', slug: 'din' },
  { name: 'BSP Threaded Fittings', slug: 'bsp-threaded-fittings' },
  { name: 'Stainless Steel Valves', slug: 'stainless-steel-valves' },
  { name: 'Stainless Steel Flanges', slug: 'stainless-steel-flanges' },
  { name: 'Pipe Fittings', slug: 'pipe-fittings' },
  { name: 'Steam Equipment', slug: 'steam-equipment' },
  { name: 'Pressure Gauges', slug: 'pressure-gauges' },
  { name: 'Industrial Instruments', slug: 'industrial-instruments' },
] as const;

export const CONNECTION_TYPES = [
  'Tri-Clamp',
  'SMS',
  'DIN',
  'BSP Threaded',
  'NPT Threaded',
  'Butt Weld',
  'Socket Weld',
  'Flanged',
  'Sanitary Clamp',
  'Compression',
] as const;

export const STANDARDS = [
  'ISO 2852',
  'DIN 11851',
  'DIN 32676',
  'SMS 1145',
  'ASTM A403',
  'ASTM A182',
  'ANSI B16.5',
  'BS 4504',
  'EN 1092-1',
] as const;

export const MATERIALS = ['304', '316', '316L', '304L'] as const;

export const APPLICATIONS = [
  'Food Processing',
  'Dairy',
  'Beverage',
  'Pharmaceutical',
  'Biotechnology',
  'Chemical',
  'Water Treatment',
  'Steam Systems',
  'Oil & Gas',
] as const;
