'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Package, ChevronDown, Filter, ArrowUpRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products';
import { advancedSearch, getCategories } from '@/lib/data';
import type { ProductWithCategory, Category } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Get filter values from URL
  const query = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || '';
  const selectedMaterial = searchParams.get('material') || '';
  const selectedConnection = searchParams.get('connection') || '';
  const selectedStandard = searchParams.get('standard') || '';

  const materials = ['304', '316', '316L', '304L'];
  const connections = ['Tri-Clamp', 'SMS', 'DIN', 'BSP Threaded', 'NPT Threaded', 'Butt Weld', 'Flanged'];
  const standards = ['ISO 2852', 'DIN 11851', 'SMS 1145', 'ASTM A403', 'ANSI B16.5', 'BS 21'];

  // Update search
  const updateSearch = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    router.push(`/search?${params.toString()}`);
  };

  const activeFiltersCount = [selectedCategory, selectedMaterial, selectedConnection, selectedStandard].filter(Boolean).length;

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    advancedSearch({
      query: query || undefined,
      category: selectedCategory || undefined,
      material: selectedMaterial || undefined,
      connectionType: selectedConnection || undefined,
      standard: selectedStandard || undefined,
    })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [query, selectedCategory, selectedMaterial, selectedConnection, selectedStandard]);

  return (
    <div className="min-h-screen bg-steel-50">
      {/* Search Header */}
      <section className="bg-white border-b border-steel-200">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-heading font-bold text-navy-900 mb-6">Search Products</h1>

            {/* Search Box */}
            <div className="relative mb-6">
              <input
                type="search"
                defaultValue={query}
                placeholder="Search by name, SKU, or reference..."
                className="w-full h-14 pl-14 pr-6 bg-steel-50 border border-steel-200 rounded-xl focus:outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 transition-all"
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams.toString());
                  const searchTerm = e.target.value;
                  if (searchTerm) {
                    params.set('q', searchTerm);
                  } else {
                    params.delete('q');
                  }
                  router.push(`/search?${params.toString()}`);
                }}
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-steel-400" />
            </div>

            {/* Show Filters Toggle */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                Advanced Filters
                {activeFiltersCount > 0 && (
                  <span className="px-1.5 py-0.5 bg-navy-900 text-white text-xs rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
                <ChevronDown className={cn('w-4 h-4 transition-transform', showFilters && 'rotate-180')} />
              </Button>

              {activeFiltersCount > 0 && (
                <Button variant="ghost" onClick={clearFilters} className="text-sm">
                  Clear all
                </Button>
              )}
            </div>
          </div>

          {/* Filter Dropdowns */}
          {showFilters && (
            <div className="max-w-4xl mx-auto mt-6 p-6 bg-steel-50 rounded-xl border border-steel-200 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => updateSearch('category', e.target.value)}
                    className="w-full h-10 px-3 bg-white border border-steel-200 rounded-lg focus:outline-none focus:border-navy-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Material Filter */}
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">Material</label>
                  <select
                    value={selectedMaterial}
                    onChange={(e) => updateSearch('material', e.target.value)}
                    className="w-full h-10 px-3 bg-white border border-steel-200 rounded-lg focus:outline-none focus:border-navy-500"
                  >
                    <option value="">All Materials</option>
                    {materials.map((mat) => (
                      <option key={mat} value={mat}>
                        {mat} SS
                      </option>
                    ))}
                  </select>
                </div>

                {/* Connection Filter */}
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">Connection</label>
                  <select
                    value={selectedConnection}
                    onChange={(e) => updateSearch('connection', e.target.value)}
                    className="w-full h-10 px-3 bg-white border border-steel-200 rounded-lg focus:outline-none focus:border-navy-500"
                  >
                    <option value="">All Connections</option>
                    {connections.map((conn) => (
                      <option key={conn} value={conn}>
                        {conn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Standard Filter */}
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">Standard</label>
                  <select
                    value={selectedStandard}
                    onChange={(e) => updateSearch('standard', e.target.value)}
                    className="w-full h-10 px-3 bg-white border border-steel-200 rounded-lg focus:outline-none focus:border-navy-500"
                  >
                    <option value="">All Standards</option>
                    {standards.map((std) => (
                      <option key={std} value={std}>
                        {std}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Active Filters Pills */}
      {activeFiltersCount > 0 && (
        <section className="bg-white border-b border-steel-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-steel-500">Filters:</span>
              {selectedCategory && (
                <button
                  onClick={() => updateSearch('category', '')}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-navy-100 text-navy-800 text-sm rounded-full hover:bg-navy-200 transition-colors"
                >
                  {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                  <X className="w-3 h-3" />
                </button>
              )}
              {selectedMaterial && (
                <button
                  onClick={() => updateSearch('material', '')}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-navy-100 text-navy-800 text-sm rounded-full hover:bg-navy-200 transition-colors"
                >
                  {selectedMaterial} SS
                  <X className="w-3 h-3" />
                </button>
              )}
              {selectedConnection && (
                <button
                  onClick={() => updateSearch('connection', '')}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-navy-100 text-navy-800 text-sm rounded-full hover:bg-navy-200 transition-colors"
                >
                  {selectedConnection}
                  <X className="w-3 h-3" />
                </button>
              )}
              {selectedStandard && (
                <button
                  onClick={() => updateSearch('standard', '')}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-navy-100 text-navy-800 text-sm rounded-full hover:bg-navy-200 transition-colors"
                >
                  {selectedStandard}
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square bg-steel-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : query || activeFiltersCount > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-steel-600">
                  {products.length > 0
                    ? `Found ${products.length} ${products.length === 1 ? 'product' : 'products'}`
                    : `No products found for "${query || 'selected filters'}"`}
                </p>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-steel-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-steel-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">No products found</h3>
                  <p className="text-steel-600 mb-6">
                    Try adjusting your search terms or filters.
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center text-navy-900 font-semibold hover:text-navy-700 gap-1"
                  >
                    Browse All Products
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-steel-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-steel-400" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">Search our products</h3>
              <p className="text-steel-600">
                Enter a product name, SKU, or reference to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
