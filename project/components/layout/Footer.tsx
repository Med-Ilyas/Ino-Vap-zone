import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Clock, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/types';

const COMPANY_INFO = {
  legalName: 'SARL INO-VAP ZONE',
  brand: 'INO-VAP ZONE',
  phone: '028 492 144',
  mobile: '0661 61 79 55',
  email: 'inovapzone@hotmail.com',
  address: 'Cité Hamiz 04, Groupe 06, Lot N°08, Alger, Algeria',
  facebook: 'Sarl Ino-vap Zone',
  hours: 'Sunday - Thursday: 8:00 - 17:00',
};

const QUICK_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Categories', href: '/categories' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Request Quote', href: '/quote' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      {/* Newsletter/CTA Section */}
      <div className="border-b border-navy-700">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-2">Need Industrial Solutions?</h3>
              <p className="text-steel-300">Contact us for custom quotes and technical support.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/213661617955?text=${encodeURIComponent('Hello, I would like to request a quote for stainless steel products.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.432-9.884 9.884-9.884 2.635 0 5.114 1.028 6.988 2.894a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.469-19.484A13.916 13.916 0 0012.003 0C5.381 0 .003 5.378.003 12a13.946 13.946 0 001.884 7.054L0 24l7.106-1.864a13.895 13.895 0 006.65 1.702h.006c6.621 0 11.999-5.378 11.999-12S17.992 0 11.371 0"/>
                </svg>
                WhatsApp Quote
              </a>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-navy-900 font-semibold rounded-lg hover:bg-steel-100 transition-colors shadow-lg"
              >
                Request Quote
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden shadow-soft">
                <Image
                  src="/images/logo/Adobe_Express_-_file.jpg"
                  alt="INO-VAP ZONE"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white">{COMPANY_INFO.brand}</span>
                <span className="text-xs text-steel-400 tracking-wide">Stainless Steel Solutions</span>
              </div>
            </Link>
            <p className="text-steel-300 mb-6">
              Premium supplier of stainless steel industrial products for food, beverage, pharmaceutical, and chemical industries.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-3 text-steel-300 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.mobile}`}
                className="flex items-center gap-3 text-steel-300 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{COMPANY_INFO.mobile}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 text-steel-300 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <div className="flex items-start gap-3 text-steel-300">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3 text-steel-300">
                <Clock className="h-4 w-4" />
                <span>{COMPANY_INFO.hours}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-steel-300 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 h-px bg-white group-hover:w-3 transition-all duration-200"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">Product Categories</h4>
            <ul className="space-y-3">
              {CATEGORIES.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/products/${category.slug}`}
                    className="text-steel-300 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 h-px bg-white group-hover:w-3 transition-all duration-200"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-white hover:text-steel-200 transition-colors font-medium inline-flex items-center gap-1"
                >
                  View All
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </li>
            </ul>
          </div>

          {/* More Categories */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6 text-white">More Categories</h4>
            <ul className="space-y-3">
              {CATEGORIES.slice(6).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/products/${category.slug}`}
                    className="text-steel-300 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 h-px bg-white group-hover:w-3 transition-all duration-200"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-steel-400 text-sm text-center md:text-left">
              <p>&copy; {currentYear} {COMPANY_INFO.legalName}. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/people/Sarl-Ino-vap-Zone/61558175401273/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-navy-800 hover:bg-navy-700 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
