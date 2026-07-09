import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { CategoryCard } from '@/components/products';
import { getCategoryBySlug, getProductsByCategory, getCategories, getProductBySlug } from '@/lib/data';
import ProductDetailContent from './ProductDetailContent';

interface PageProps {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate static params for categories only (products are dynamic)
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: [category.slug],
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug || [];

  if (slugPath.length === 0) {
    return { title: 'Products' };
  }

  // Check if it's a category page
  if (slugPath.length === 1) {
    const category = await getCategoryBySlug(slugPath[0]);
    if (category) {
      return {
        title: category.name,
        description: category.description || `Explore ${category.name} products from INO-VAP ZONE.`,
      };
    }
  }

  // Check for product
  const productSlug = slugPath[slugPath.length - 1];
  const product = await getProductBySlug(productSlug);
  if (product) {
    return {
      title: product.name,
      description: product.description || `${product.name} - ${product.material} Stainless Steel. SKU: ${product.sku}`,
    };
  }

  return {
    title: 'Page Not Found',
  };
}

export default async function DynamicProductsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug || [];

  // No slug - redirect to main products page
  if (slugPath.length === 0) {
    notFound();
  }

  // Single segment - could be a category
  if (slugPath.length === 1) {
    const categorySlug = slugPath[0];
    const category = await getCategoryBySlug(categorySlug);

    // It's a category - show products in that category
    if (category) {
      const products = await getProductsByCategory(categorySlug);
      const ProductCard = (await import('@/components/products')).ProductCard;

      return (
        <div className="min-h-screen bg-steel-50">
          {/* Hero */}
          <section className="bg-navy-gradient relative overflow-hidden">
            <div className="grid-pattern absolute inset-0 opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/90 to-navy-700/90" />
            <div className="relative container mx-auto px-4 py-16 lg:py-24">
              <div className="max-w-3xl">
                <span className="inline-block px-4 py-1 bg-white/10 text-white text-sm font-semibold rounded-full mb-4 uppercase tracking-wide backdrop-blur-sm">
                  Category
                </span>
                <h1 className="text-4xl lg:text-display-md font-heading font-bold text-white mb-4">
                  {category.name}
                </h1>
                {category.description && (
                  <p className="text-xl text-steel-300">
                    {category.description}
                  </p>
                )}
                <p className="text-lg text-steel-400 mt-4">
                  {products.length} products available
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
                <Link href="/products" className="text-steel-500 hover:text-navy-800 transition-colors">
                  Products
                </Link>
                <ChevronRight className="w-4 h-4 text-steel-400" />
                <span className="text-navy-900 font-medium">{category.name}</span>
              </nav>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <Link
                  href="/products"
                  className="text-navy-600 hover:text-navy-800 text-sm font-medium inline-flex items-center gap-1"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to All Products
                </Link>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-steel-600 text-lg">
                    No products found in this category.
                  </p>
                  <Link
                    href="/products"
                    className="mt-4 inline-block text-navy-900 font-semibold hover:underline"
                  >
                    View All Products
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Other Categories */}
          <section className="py-12 bg-white border-t border-steel-200">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-heading font-bold text-navy-900 mb-8">
                Browse Other Categories
              </h2>
              <OtherCategories currentSlug={categorySlug} />
            </div>
          </section>
        </div>
      );
    }

    // Not a category - 404
    notFound();
  }

  // Two or more segments - product page (category/product-slug)
  const productSlug = slugPath[slugPath.length - 1];
  const product = await getProductBySlug(productSlug);

  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}

// Server component for other categories
async function OtherCategories({ currentSlug }: { currentSlug: string }) {
  const categories = await getCategories();
  const otherCategories = categories.filter(c => c.slug !== currentSlug);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {otherCategories.map((cat, index) => (
        <CategoryCard key={cat.id} category={cat} index={index} />
      ))}
    </div>
  );
}
