'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronRight, SlidersHorizontal, Package, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products';
import { FilterSidebar, Pagination, SortDropdown } from '@/components/catalog';
import { getCategories, getProductsWithFilters } from '@/lib/data';
import type { Category, ProductWithCategory } from '@/lib/types';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  // Read filters from URL
  const page = parseInt(searchParams.get('page') || '1');
  const selectedCategory = searchParams.get('category') || undefined;
  const selectedMaterial = searchParams.get('material') || undefined;
  const selectedConnection = searchParams.get('connectionType') || undefined;
  const selectedStandard = searchParams.get('standard') || undefined;
  const search = searchParams.get('search') || undefined;
  const sortBy = (searchParams.get('sortBy') || 'name') as 'name' | 'sku' | 'created_at';
  const sortOrder = (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc';

  // Update URL with new filters
  const updateFilters = (updates: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === '' || value === 1) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    // Reset to page 1 when changing filters
    if (!updates.hasOwnProperty('page')) {
      params.delete('page');
    }

    router.push(`/products?${params.toString()}`);
  };

  const handleFilterChange = (key: string, value: string | undefined) => {
    updateFilters({ [key]: value });
  };

  const handleClearFilters = () => {
    router.push('/products');
  };

  const handlePageChange = (newPage: number) => {
    updateFilters({ page: newPage });
  };

  const handleSortChange = (newSortBy: string, newSortOrder: string) => {
    updateFilters({ sortBy: newSortBy, sortOrder: newSortOrder });
  };

  // Fetch data
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    getProductsWithFilters({
      category: selectedCategory,
      material: selectedMaterial,
      connectionType: selectedConnection,
      standard: selectedStandard,
      search,
      sortBy,
      sortOrder,
      page,
      pageSize: 24,
    })
      .then(result => {
        setProducts(result.products);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      })
      .finally(() => setLoading(false));
  }, [selectedCategory, selectedMaterial, selectedConnection, selectedStandard, search, sortBy, sortOrder, page]);

  const activeFiltersCount = [selectedCategory, selectedMaterial, selectedConnection, selectedStandard].filter(Boolean).length;

  const selectedCategoryName = useMemo(() => {
    return categories.find(c => c.slug === selectedCategory)?.name;
  }, [categories, selectedCategory]);

  return (
    <div className="min-h-screen bg-steel-50">
      {/* Hero */}
      <section className="bg-navy-gradient relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/90 to-navy-700/90" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-white/10 text-white text-sm font-semibold rounded-full mb-4 uppercase tracking-wide backdrop-blur-sm">
              Catalogue
            </span>
            <h1 className="text-4xl lg:text-display-md font-heading font-bold text-white mb-4">
              Product Catalogue
            </h1>
            <p className="text-xl text-steel-300">
              Browse our complete range of {total}+ premium stainless steel products.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-white border-b border-steel-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-steel-500 hover:text-navy-800 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-steel-400" />
            <span className="text-navy-900 font-medium">Products</span>
            {selectedCategoryName && (
              <>
                <ChevronRight className="w-4 h-4 text-steel-400" />
                <span className="text-navy-900 font-medium">{selectedCategoryName}</span>
              </>
            )}
          </nav>
        </div>
      </section>

      {/* Active Filters Pills */}
      {activeFiltersCount > 0 && (
        <section className="bg-white border-b border-steel-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-steel-500">Active filters:</span>
              {selectedCategoryName && (
                <button
                  onClick={() => handleFilterChange('category', undefined)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-navy-100 text-navy-800 text-sm rounded-full hover:bg-navy-200 transition-colors"
                >
                  {selectedCategoryName}
                  <X className="w-3 h-3" />
                </button>
              )}
              {selectedMaterial && (
                <button
                  onClick={() => handleFilterChange('material', undefined)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-navy-100 text-navy-800 text-sm rounded-full hover:bg-navy-200 transition-colors"
                >
                  {selectedMaterial} SS
                  <X className="w-3 h-3" />
                </button>
              )}
              {selectedConnection && (
                <button
                  onClick={() => handleFilterChange('connectionType', undefined)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-navy-100 text-navy-800 text-sm rounded-full hover:bg-navy-200 transition-colors"
                >
                  {selectedConnection}
                  <X className="w-3 h-3" />
                </button>
              )}
              {selectedStandard && (
                <button
                  onClick={() => handleFilterChange('standard', undefined)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-navy-100 text-navy-800 text-sm rounded-full hover:bg-navy-200 transition-colors"
                >
                  {selectedStandard}
                  <X className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={handleClearFilters}
                className="text-sm text-navy-600 hover:text-navy-800 underline"
              >
                Clear all
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 -mx-4">
            {/* Filter Sidebar */}
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              selectedMaterial={selectedMaterial}
              selectedConnection={selectedConnection}
              selectedStandard={selectedStandard}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isOpen={filterOpen}
              onClose={() => setFilterOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0 px-4">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setFilterOpen(true)}
                    className="lg:hidden"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="ml-2 px-1.5 py-0.5 bg-navy-900 text-white text-xs rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                  <p className="text-sm text-steel-600">
                    Showing <span className="font-medium text-navy-900">{products.length}</span> of <span className="font-medium text-navy-900">{total}</span> products
                  </p>
                </div>
                <SortDropdown
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onChange={handleSortChange}
                />
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-steel-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="mt-8"
                  />
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-steel-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-steel-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">No products found</h3>
                  <p className="text-steel-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
                  <Button onClick={handleClearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
