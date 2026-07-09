import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, FileText } from 'lucide-react';
import type { ProductWithCategory } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getProductImage } from '@/lib/productImages';

interface ProductCardProps {
  product: ProductWithCategory;
  featured?: boolean;
  className?: string;
}

export function ProductCard({ product, featured, className }: ProductCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to request a quote for:\n\nProduct: ${product.name}\nSKU: ${product.sku}\nReference: ${product.reference || 'N/A'}\nMaterial: ${product.material} Stainless Steel\n\nPlease provide pricing and availability.`
  );

  const productImage = getProductImage(product.categories?.slug, product.image_url);
  const categorySlug = product.categories?.slug || 'unknown';
  const categoryName = product.categories?.name || 'Products';

  return (
    <article
      className={cn(
        'group relative bg-white rounded-xl border border-steel-200 overflow-hidden transition-all duration-300 hover:shadow-premium hover:border-navy-300',
        featured && 'shadow-soft',
        className
      )}
    >
      {/* Product Image */}
      <Link href={`/products/${categorySlug}/${product.slug}`} className="block">
        <div className="relative aspect-square bg-steel-50 overflow-hidden">
          <Image
            src={productImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/10 transition-colors" />

          {/* Material Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 bg-navy-900 text-white text-xs font-semibold rounded-full">
              {product.material} SS
            </span>
          </div>

          {/* Featured Badge */}
          {product.is_featured && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-3 py-1 bg-steel-600 text-white text-xs font-semibold rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5">
        {/* Category */}
        <Link
          href={`/products/${categorySlug}`}
          className="text-xs font-semibold text-navy-600 hover:text-navy-800 uppercase tracking-wider"
        >
          {categoryName}
        </Link>

        {/* Name */}
        <Link href={`/products/${categorySlug}/${product.slug}`}>
          <h3 className="mt-2 font-heading font-semibold text-lg text-navy-900 hover:text-navy-700 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* SKU & Reference */}
        <div className="mt-2 flex items-center gap-2 text-sm text-steel-500">
          <span className="font-mono">SKU: {product.sku}</span>
          {product.reference && (
            <>
              <span className="w-1 h-1 bg-steel-300 rounded-full" />
              <span>Ref: {product.reference}</span>
            </>
          )}
        </div>

        {/* Available Sizes */}
        {product.available_sizes.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {product.available_sizes.slice(0, 4).map((size) => (
              <span
                key={size}
                className="inline-flex items-center px-2 py-0.5 bg-steel-100 text-steel-700 text-xs rounded"
              >
                {size}
              </span>
            ))}
            {product.available_sizes.length > 4 && (
              <span className="text-xs text-steel-500">
                +{product.available_sizes.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <a
            href={`https://wa.me/213661617955?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.432-9.884 9.884-9.884 2.635 0 5.114 1.028 6.988 2.894a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.469-19.484A13.916 13.916 0 0012.003 0C5.381 0 .003 5.378.003 12a13.946 13.946 0 001.884 7.054L0 24l7.106-1.864a13.895 13.895 0 006.65 1.702h.006c6.621 0 11.999-5.378 11.999-12S17.992 0 11.371 0"/>
            </svg>
            Quote
          </a>
          <Link
            href={`/products/${categorySlug}/${product.slug}`}
            className="inline-flex items-center justify-center px-3 py-2.5 border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white rounded-lg transition-colors"
            aria-label="View details"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
