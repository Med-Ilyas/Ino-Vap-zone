import { Metadata } from 'next';
import { CategoryCard } from '@/components/products';
import { getCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Product Categories',
  description:
    'Explore our complete range of stainless steel product categories - Tri Clamp, SMS, DIN, BSP fittings, valves, flanges, and more.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-steel-50">
      {/* Hero */}
      <section className="bg-navy-gradient relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/90 to-navy-700/90" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-white/10 text-white text-sm font-semibold rounded-full mb-4 uppercase tracking-wide backdrop-blur-sm">
              Our Products
            </span>
            <h1 className="text-4xl lg:text-display-md font-heading font-bold text-white mb-4">
              Product Categories
            </h1>
            <p className="text-xl text-steel-300">
              Discover our comprehensive range of premium stainless steel industrial products
              designed for demanding applications.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-navy-900 mb-4">
              Premium Stainless Steel Products
            </h2>
            <p className="text-steel-600 text-lg mb-8">
              All our products are manufactured from high-grade AISI 304 and 316 stainless steel,
              perfect for hygienic applications in food, beverage, pharmaceutical, and chemical industries.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center px-4 py-2 bg-navy-100 text-navy-800 rounded-lg font-medium">
                AISI 304 Stainless Steel
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-navy-100 text-navy-800 rounded-lg font-medium">
                AISI 316 Stainless Steel
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-navy-100 text-navy-800 rounded-lg font-medium">
                Food Grade Certified
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
