'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Trash2, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products';
import { getFavorites, removeFavorite } from '@/lib/data';
import type { ProductWithCategory } from '@/lib/types';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const sid = sessionStorage.getItem('session_id') || crypto.randomUUID();
    sessionStorage.setItem('session_id', sid);
    setSessionId(sid);

    getFavorites(sid)
      .then(setFavorites)
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (productId: string) => {
    await removeFavorite(sessionId, productId);
    setFavorites(prev => prev.filter(p => p.id !== productId));
  };

  const clearAll = async () => {
    for (const product of favorites) {
      await removeFavorite(sessionId, product.id);
    }
    setFavorites([]);
  };

  return (
    <div className="min-h-screen bg-steel-50">
      {/* Hero */}
      <section className="bg-navy-gradient relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/90 to-navy-700/90" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-white/10 text-white text-sm font-semibold rounded-full mb-4 uppercase tracking-wide backdrop-blur-sm">
              Saved Products
            </span>
            <h1 className="text-4xl lg:text-display-md font-heading font-bold text-white mb-4">
              My Favorites
            </h1>
            <p className="text-xl text-steel-300">
              Save products for quick access and comparison.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-steel-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : favorites.length > 0 ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-steel-600">
                  <span className="font-semibold text-navy-900">{favorites.length}</span> saved products
                </p>
                <Button variant="outline" onClick={clearAll} className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </Button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((product) => (
                  <div key={product.id} className="relative group">
                    <ProductCard product={product} />
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                    >
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-steel-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-steel-400" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">No favorites yet</h3>
              <p className="text-steel-600 mb-6 max-w-md mx-auto">
                Start browsing our products and click the heart icon to save your favorites.
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
