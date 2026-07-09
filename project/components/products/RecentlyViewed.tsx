'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { ProductCard } from '@/components/products';
import { getRecentlyViewed } from '@/lib/data';
import type { ProductWithCategory } from '@/lib/types';

interface RecentlyViewedProps {
  limit?: number;
}

export function RecentlyViewed({ limit = 8 }: RecentlyViewedProps) {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = sessionStorage.getItem('session_id') || crypto.randomUUID();
    sessionStorage.setItem('session_id', sessionId);

    getRecentlyViewed(sessionId, limit)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [limit]);

  if (loading || products.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-navy-700" />
            <h2 className="text-2xl font-heading font-bold text-navy-900">Recently Viewed</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
