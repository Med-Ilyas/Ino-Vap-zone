'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Scale, Trash2, ArrowUpRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ProductWithCategory } from '@/lib/types';

const MAX_COMPARE = 4;

export default function ComparePage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('compare_products');
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      sessionStorage.setItem('compare_products', JSON.stringify(products));
    }
  }, [products, mounted]);

  const removeProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearAll = () => {
    setProducts([]);
  };

  const getAllValues = (key: string): (string | null)[] => {
    return products.map(p => {
      const specs = p.technical_specifications as Record<string, string>;
      return specs?.[key] || null;
    });
  };

  const uniqueKeys = products.length > 0
    ? Array.from(new Set(products.flatMap(p => Object.keys(p.technical_specifications || {}))))
    : [];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-steel-50">
      {/* Hero */}
      <section className="bg-navy-gradient relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/90 to-navy-700/90" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-white/10 text-white text-sm font-semibold rounded-full mb-4 uppercase tracking-wide backdrop-blur-sm">
              Compare
            </span>
            <h1 className="text-4xl lg:text-display-md font-heading font-bold text-white mb-4">
              Compare Products
            </h1>
            <p className="text-xl text-steel-300">
              Compare up to 4 products side by side to find the best fit.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {products.length > 0 ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-steel-600">
                  Comparing <span className="font-semibold text-navy-900">{products.length}</span> products
                </p>
                <Button variant="outline" onClick={clearAll} className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </Button>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-white sticky top-0 z-10">
                      <th className="p-4 text-left w-48 bg-steel-50 border border-steel-200">
                        <span className="text-sm font-semibold text-navy-900 uppercase">Attribute</span>
                      </th>
                      {products.map((product) => (
                        <th key={product.id} className="p-4 border border-steel-200 relative min-w-[200px]">
                          <button
                            onClick={() => removeProduct(product.id)}
                            className="absolute top-2 right-2 w-6 h-6 bg-steel-100 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors"
                          >
                            <X className="w-3 h-3 text-steel-500" />
                          </button>
                          <div className="aspect-square bg-steel-50 rounded-lg mb-3 overflow-hidden relative">
                            {product.image_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-steel-300">
                                <Scale className="w-12 h-12" />
                              </div>
                            )}
                          </div>
                          <Link
                            href={`/products/${product.categories?.slug || 'unknown'}/${product.slug}`}
                            className="font-heading font-semibold text-navy-900 hover:text-navy-700 line-clamp-2"
                          >
                            {product.name}
                          </Link>
                          <div className="text-xs text-steel-500 mt-1 font-mono">SKU: {product.sku}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Category */}
                    <tr className="bg-white">
                      <td className="p-4 border border-steel-200 bg-steel-50 font-medium text-sm text-navy-900">
                        Category
                      </td>
                      {products.map((product) => (
                        <td key={product.id} className="p-4 border border-steel-200 text-sm text-steel-700">
                          {product.categories?.name || 'Unknown'}
                        </td>
                      ))}
                    </tr>

                    {/* Material */}
                    <tr className="bg-white">
                      <td className="p-4 border border-steel-200 bg-steel-50 font-medium text-sm text-navy-900">
                        Material
                      </td>
                      {products.map((product) => (
                        <td key={product.id} className="p-4 border border-steel-200 text-sm text-navy-700">
                          {product.material} Stainless Steel
                        </td>
                      ))}
                    </tr>

                    {/* Connection Type */}
                    <tr className="bg-white">
                      <td className="p-4 border border-steel-200 bg-steel-50 font-medium text-sm text-navy-900">
                        Connection
                      </td>
                      {products.map((product) => (
                        <td key={product.id} className="p-4 border border-steel-200 text-sm text-steel-700">
                          {product.connection_type || '-'}
                        </td>
                      ))}
                    </tr>

                    {/* Standard */}
                    <tr className="bg-white">
                      <td className="p-4 border border-steel-200 bg-steel-50 font-medium text-sm text-navy-900">
                        Standard
                      </td>
                      {products.map((product) => (
                        <td key={product.id} className="p-4 border border-steel-200 text-sm text-steel-700">
                          {product.standard || '-'}
                        </td>
                      ))}
                    </tr>

                    {/* Pressure Rating */}
                    <tr className="bg-white">
                      <td className="p-4 border border-steel-200 bg-steel-50 font-medium text-sm text-navy-900">
                        Pressure Rating
                      </td>
                      {products.map((product) => (
                        <td key={product.id} className="p-4 border border-steel-200 text-sm text-steel-700">
                          {product.pressure_rating || '-'}
                        </td>
                      ))}
                    </tr>

                    {/* Temperature Range */}
                    <tr className="bg-white">
                      <td className="p-4 border border-steel-200 bg-steel-50 font-medium text-sm text-navy-900">
                        Temperature
                      </td>
                      {products.map((product) => (
                        <td key={product.id} className="p-4 border border-steel-200 text-sm text-steel-700">
                          {product.temperature_range || '-'}
                        </td>
                      ))}
                    </tr>

                    {/* Surface Finish */}
                    <tr className="bg-white">
                      <td className="p-4 border border-steel-200 bg-steel-50 font-medium text-sm text-navy-900">
                        Surface Finish
                      </td>
                      {products.map((product) => (
                        <td key={product.id} className="p-4 border border-steel-200 text-sm text-steel-700">
                          {product.surface_finish || '-'}
                        </td>
                      ))}
                    </tr>

                    {/* Available Sizes */}
                    <tr className="bg-white">
                      <td className="p-4 border border-steel-200 bg-steel-50 font-medium text-sm text-navy-900">
                        Available Sizes
                      </td>
                      {products.map((product) => (
                        <td key={product.id} className="p-4 border border-steel-200 text-sm text-steel-700">
                          {product.available_sizes?.slice(0, 5).join(', ') || '-'}
                          {product.available_sizes?.length > 5 && '...'}
                        </td>
                      ))}
                    </tr>

                    {/* Dynamic Specs from technical_specifications */}
                    {uniqueKeys.map((key) => (
                      <tr key={key} className="bg-white">
                        <td className="p-4 border border-steel-200 bg-steel-50 font-medium text-sm text-navy-900">
                          {key}
                        </td>
                        {products.map((product) => {
                          const specs = product.technical_specifications as Record<string, string>;
                          const value = specs?.[key] || '-';
                          return (
                            <td key={product.id} className="p-4 border border-steel-200 text-sm text-steel-700">
                              {value}
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                    {/* Actions Row */}
                    <tr className="bg-steel-50">
                      <td className="p-4 border border-steel-200 bg-steel-50">
                        <span className="font-medium text-sm text-navy-900">Actions</span>
                      </td>
                      {products.map((product) => {
                        const whatsappMessage = encodeURIComponent(
                          `Hello, I would like to request a quote for:\n\nProduct: ${product.name}\nSKU: ${product.sku}\nMaterial: ${product.material} Stainless Steel\n\nPlease provide pricing and availability.`
                        );
                        return (
                          <td key={product.id} className="p-4 border border-steel-200">
                            <div className="flex flex-col gap-2">
                              <Link
                                href={`/products/${product.categories?.slug || 'unknown'}/${product.slug}`}
                                className="block"
                              >
                                <Button size="sm" variant="outline" className="w-full">
                                  View Details
                                </Button>
                              </Link>
                              <a
                                href={`https://wa.me/213661617955?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                              >
                                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                                  Get Quote
                                </Button>
                              </a>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Add more products */}
              {products.length < MAX_COMPARE && (
                <div className="mt-8 text-center">
                  <Link href="/products">
                    <Button variant="outline" className="gap-2">
                      Add more products (up to {MAX_COMPARE - products.length} more)
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-steel-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-10 h-10 text-steel-400" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">No products to compare</h3>
              <p className="text-steel-600 mb-6 max-w-md mx-auto">
                Select products from the catalogue to compare their specifications side by side.
              </p>
              <Link href="/products">
                <Button className="bg-navy-900 hover:bg-navy-800 text-white gap-2">
                  Browse Products
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
