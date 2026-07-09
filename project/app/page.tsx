import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Shield, Award, Truck, Factory, Cog, Wrench, Gauge, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/products';
import { HeroSlider } from '@/components/layout/HeroSlider';
import { getCategories } from '@/lib/data';

const WHY_CHOOSE_US = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'AISI 304 & 316 stainless steel products meeting international standards.',
  },
  {
    icon: Award,
    title: 'Expert Support',
    description: 'Technical guidance and product selection assistance from industry experts.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Efficient logistics across Algeria with quick turnaround times.',
  },
  {
    icon: Factory,
    title: 'Industry Solutions',
    description: 'Specialized products for food, pharma, dairy, and chemical industries.',
  },
];

const INDUSTRIES_SERVED = [
  { name: 'Food & Beverage', icon: FlaskConical },
  { name: 'Pharmaceutical', icon: Shield },
  { name: 'Dairy Processing', icon: Factory },
  { name: 'Chemical Industry', icon: Cog },
  { name: 'Water Treatment', icon: Gauge },
  { name: 'Oil & Gas', icon: Wrench },
];

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Stats Bar */}
      <section className="bg-white py-10 border-b border-steel-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-industrial">
                <Image
                  src="/images/logo/Adobe_Express_-_file.jpg"
                  alt="INO-VAP ZONE"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div>
                <div className="text-sm text-steel-500 uppercase tracking-wide">INO-VAP ZONE</div>
                <div className="text-navy-900 font-semibold">Stainless Steel Solutions</div>
              </div>
            </div>
            <div className="h-8 w-px bg-steel-200 hidden md:block" />
            {[
              { value: '4', label: 'Years of Experience' },
              { value: '+50', label: 'Products' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-3xl font-heading font-bold text-navy-900">{stat.value}</div>
                <div className="text-sm text-steel-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="inline-block px-5 py-2 bg-navy-100 text-navy-800 text-sm font-semibold rounded-full mb-6 uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="text-4xl lg:text-display-md font-heading font-bold text-navy-900 mb-6">
              Your Trusted Partner for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-700 to-navy-900">Industrial Solutions</span>
            </h2>
            <p className="text-steel-600 max-w-3xl mx-auto text-xl leading-relaxed">
              We deliver premium stainless steel products backed by expert support and reliable service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US.map((item, index) => (
              <div
                key={index}
                className="group p-10 bg-white rounded-2xl border border-steel-100 hover:border-navy-200 hover:shadow-premium transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-navy-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-navy-800 transition-colors shadow-lg">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-navy-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-steel-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 lg:py-32 bg-steel-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16">
            <div>
              <span className="inline-block px-5 py-2 bg-navy-900 text-white text-sm font-semibold rounded-full mb-6 uppercase tracking-widest">
                Our Range
              </span>
              <h2 className="text-4xl lg:text-display-md font-heading font-bold text-navy-900">
                Product Categories
              </h2>
              <p className="text-steel-600 mt-4 max-w-xl text-lg">
                Explore our comprehensive range of stainless steel industrial products.
              </p>
            </div>
            <Link
              href="/categories"
              className="mt-6 sm:mt-0 text-navy-900 hover:text-navy-700 font-semibold inline-flex items-center gap-2 text-lg"
            >
              View All Categories
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.slice(0, 8).map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-24 lg:py-32 bg-navy-gradient relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-800/95 to-navy-700/95" />

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="inline-block px-5 py-2 bg-white/10 text-white text-sm font-semibold rounded-full mb-6 uppercase tracking-widest backdrop-blur-sm">
              Industries
            </span>
            <h2 className="text-4xl lg:text-display-md font-heading font-bold text-white mb-6">
              Industries We Serve
            </h2>
            <p className="text-steel-300 max-w-3xl mx-auto text-xl leading-relaxed">
              Our products are trusted across diverse industrial sectors requiring premium stainless steel solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {INDUSTRIES_SERVED.map((industry, index) => (
              <div
                key={index}
                className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 text-center"
              >
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-white/20 transition-colors">
                  <industry.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-white font-medium text-lg">{industry.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-12 lg:p-20 relative overflow-hidden">
            <div className="grid-pattern absolute inset-0 opacity-5" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-steel-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-500/20 rounded-full blur-3xl" />

            <div className="relative text-center">
              <h2 className="text-4xl lg:text-display-lg font-heading font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-steel-300 mb-10 max-w-2xl mx-auto text-xl leading-relaxed">
                Contact us today for a custom quote. Our team is ready to help you find the perfect stainless steel solutions for your needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-navy-900 hover:bg-steel-100 font-semibold px-10 h-16 text-lg shadow-lg">
                    Contact Us
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/213661617955?text=Hello%2C%20I%20would%20like%20to%20request%20a%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 h-16 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-lg shadow-lg"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.432-9.884 9.884-9.884 2.635 0 5.114 1.028 6.988 2.894a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.469-19.484A13.916 13.916 0 0012.003 0C5.381 0 .003 5.378.003 12a13.946 13.946 0 001.884 7.054L0 24l7.106-1.864a13.895 13.895 0 006.65 1.702h.006c6.621 0 11.999-5.378 11.999-12S17.992 0 11.371 0"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
