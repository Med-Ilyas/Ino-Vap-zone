import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getCategoryImage } from '@/lib/categoryImages';

interface CategoryCardProps {
  category: Category;
  productCount?: number;
  className?: string;
  index?: number;
}

export function CategoryCard({ category, productCount, className, index = 0 }: CategoryCardProps) {
  const imageUrl = getCategoryImage(category.slug, category.image_url);

  return (
    <Link
      href={`/products/${category.slug}`}
      className={cn(
        'group relative block bg-white rounded-xl border border-steel-200 overflow-hidden transition-all duration-300 hover:shadow-premium hover:border-navy-300',
        className
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Background or Image */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-navy-900 to-navy-800 overflow-hidden">
        <Image
          src={imageUrl}
          alt={category.name}
          fill
          className="object-cover opacity-60 group-hover:opacity-50 transition-opacity group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />

        {/* Index Number */}
        <div className="absolute top-4 left-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white font-bold text-sm border border-white/20">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Hover Icon */}
        <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/0 group-hover:bg-white rounded-lg flex items-center justify-center transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
          <ArrowUpRight className="w-5 h-5 text-navy-900" />
        </div>

        {/* Category Name Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-heading font-semibold text-lg text-white drop-shadow-lg">
            {category.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {category.description && (
          <p className="text-sm text-steel-500 line-clamp-2">
            {category.description}
          </p>
        )}
        {productCount !== undefined && (
          <p className="mt-3 text-xs font-semibold text-navy-600 uppercase tracking-wide">
            {productCount} {productCount === 1 ? 'product' : 'products'}
          </p>
        )}
      </div>
    </Link>
  );
}
