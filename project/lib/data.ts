import { createClient } from './supabase/client';
import type { Category, Product, ProductWithCategory, Download } from './types';

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// Get all products (basic)
export async function getProducts(): Promise<ProductWithCategory[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .order('name', { ascending: true });

  if (error) throw error;
  return data || [];
}

// Filter params interface
export interface ProductFilters {
  category?: string;
  material?: string;
  connectionType?: string;
  standard?: string;
  search?: string;
  sortBy?: 'name' | 'sku' | 'created_at';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
  featured?: boolean;
}

// Get products with filters, sorting, and pagination
export async function getProductsWithFilters(filters: ProductFilters = {}): Promise<{
  products: ProductWithCategory[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  const supabase = createClient();
  const page = filters.page || 1;
  const pageSize = filters.pageSize || 24;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // If filtering by category, first get the category ID
  let categoryId: string | undefined;
  if (filters.category) {
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', filters.category)
      .maybeSingle();
    categoryId = category?.id;
  }

  let query = supabase
    .from('products')
    .select('*, categories(*)', { count: 'exact' });

  // Apply filters
  if (filters.category && categoryId) {
    query = query.eq('category_id', categoryId);
  } else if (filters.category && !categoryId) {
    // Category slug doesn't exist - return empty
    return {
      products: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
    };
  }

  if (filters.material) {
    query = query.eq('material', filters.material);
  }

  if (filters.connectionType) {
    query = query.eq('connection_type', filters.connectionType);
  }

  if (filters.standard) {
    query = query.eq('standard', filters.standard);
  }

  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,sku.ilike.%${filters.search}%,reference.ilike.%${filters.search}%`);
  }

  if (filters.featured) {
    query = query.eq('is_featured', true);
  }

  // Apply sorting
  const sortBy = filters.sortBy || 'name';
  const sortOrder = filters.sortOrder || 'asc';
  query = query.order(sortBy, { ascending: sortOrder === 'asc' });

  // Apply pagination
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    products: data || [],
    total: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize),
  };
}

// Get featured products
export async function getFeaturedProducts(limit = 8): Promise<ProductWithCategory[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('is_featured', true)
    .limit(limit);

  if (error) throw error;
  return data || [];
}

// Get products by category
export async function getProductsByCategory(categorySlug: string): Promise<ProductWithCategory[]> {
  const supabase = createClient();

  // First get the category by slug
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .maybeSingle();

  if (categoryError) throw categoryError;
  if (!category) return [];

  // Then get products by category_id
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('category_id', category.id)
    .order('name', { ascending: true });

  if (error) throw error;
  return data || [];
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// Get related products
export async function getRelatedProducts(productId: string, limit = 4): Promise<ProductWithCategory[]> {
  const supabase = createClient();

  // Get related product IDs
  const { data: relations, error: relationsError } = await supabase
    .from('product_relations')
    .select('related_product_id')
    .eq('product_id', productId)
    .limit(limit);

  if (relationsError) throw relationsError;

  if (!relations || relations.length === 0) {
    // Return products from same category if no relations
    const { data: product } = await supabase
      .from('products')
      .select('category_id')
      .eq('id', productId)
      .maybeSingle();

    if (product) {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(*)')
        .eq('category_id', product.category_id)
        .neq('id', productId)
        .limit(limit);

      if (error) throw error;
      return data || [];
    }
    return [];
  }

  const relatedIds = relations.map(r => r.related_product_id);
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .in('id', relatedIds);

  if (error) throw error;
  return data || [];
}

// Get accessories for a product
export async function getProductAccessories(productId: string): Promise<ProductWithCategory[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('parent_product_id', productId)
    .eq('is_accessory', true);

  if (error) throw error;
  return data || [];
}

// Search products
export async function searchProducts(query: string): Promise<ProductWithCategory[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .or(`name.ilike.%${query}%,sku.ilike.%${query}%,reference.ilike.%${query}%`)
    .limit(20);

  if (error) throw error;
  return data || [];
}

// Advanced search with filters
export async function advancedSearch(params: {
  query?: string;
  category?: string;
  material?: string;
  connectionType?: string;
  standard?: string;
  diameter?: string;
}): Promise<ProductWithCategory[]> {
  const supabase = createClient();
  let query = supabase
    .from('products')
    .select('*, categories(*)')
    .limit(50);

  if (params.query) {
    query = query.or(`name.ilike.%${params.query}%,sku.ilike.%${params.query}%,reference.ilike.%${params.query}%`);
  }

  if (params.category) {
    query = query.eq('categories.slug', params.category);
  }

  if (params.material) {
    query = query.eq('material', params.material);
  }

  if (params.connectionType) {
    query = query.eq('connection_type', params.connectionType);
  }

  if (params.standard) {
    query = query.eq('standard', params.standard);
  }

  if (params.diameter) {
    query = query.contains('available_sizes', [params.diameter]);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

// Get downloads for a product
export async function getProductDownloads(productId: string): Promise<Download[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('downloads')
    .select('*')
    .eq('product_id', productId)
    .order('type', { ascending: true });

  if (error) throw error;
  return data || [];
}

// Get distinct filter values
export async function getFilterOptions(categorySlug?: string): Promise<{
  materials: string[];
  connectionTypes: string[];
  standards: string[];
}> {
  const supabase = createClient();

  let query = supabase.from('products').select('material, connection_type, standard');

  if (categorySlug) {
    query = query.eq('categories.slug', categorySlug);
  }

  const { data, error } = await query;

  if (error) throw error;

  const materials = Array.from(new Set(data?.map(p => p.material).filter(Boolean))) as string[];
  const connectionTypes = Array.from(new Set(data?.map(p => p.connection_type).filter(Boolean))) as string[];
  const standards = Array.from(new Set(data?.map(p => p.standard).filter(Boolean))) as string[];

  return { materials, connectionTypes, standards };
}

// Favorites (session-based)
export async function getFavorites(sessionId: string): Promise<ProductWithCategory[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('favorites')
    .select('products(*, categories(*))')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  if (!data) return [];
  return data.map((f: unknown) => (f as { products: ProductWithCategory }).products).filter(Boolean);
}

export async function addFavorite(sessionId: string, productId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('favorites')
    .insert({ session_id: sessionId, product_id: productId });

  if (error && error.code !== '23505') throw error; // Ignore duplicate key error
}

export async function removeFavorite(sessionId: string, productId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('session_id', sessionId)
    .eq('product_id', productId);

  if (error) throw error;
}

export async function isFavorite(sessionId: string, productId: string): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('session_id', sessionId)
    .eq('product_id', productId)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

// Recently viewed
export async function getRecentlyViewed(sessionId: string, limit = 10): Promise<ProductWithCategory[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('recently_viewed')
    .select('products(*, categories(*))')
    .eq('session_id', sessionId)
    .order('viewed_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  if (!data) return [];
  return data.map((r: unknown) => (r as { products: ProductWithCategory }).products).filter(Boolean);
}

export async function addToRecentlyViewed(sessionId: string, productId: string): Promise<void> {
  const supabase = createClient();

  // Upsert (insert or update viewed_at)
  const { error } = await supabase
    .from('recently_viewed')
    .upsert(
      { session_id: sessionId, product_id: productId, viewed_at: new Date().toISOString() },
      { onConflict: 'session_id,product_id' }
    );

  if (error) throw error;
}

// Increment download count
export async function incrementDownloadCount(downloadId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.rpc('increment_download_count', { download_id: downloadId });

  // If RPC doesn't exist, use direct update
  if (error) {
    await supabase
      .from('downloads')
      .update({ downloads_count: supabase.rpc('increment') })
      .eq('id', downloadId);
  }
}
