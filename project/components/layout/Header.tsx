'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X, Phone, Mail, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/types';
import { LanguageSelector } from '@/components/layout/LanguageSelector';

const COMPANY_INFO = {
  name: 'INO-VAP ZONE',
  phone: '028 492 144',
  mobile: '0661 61 79 55',
  email: 'inovapzone@hotmail.com',
  address: 'Cité Hamiz 04, Groupe 06, Lot N°08, Alger, Algeria',
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-steel-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Top bar */}
      <div className="hidden lg:block bg-navy-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-2 hover:text-steel-300 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.mobile}`}
                className="flex items-center gap-2 hover:text-steel-300 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{COMPANY_INFO.mobile}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 hover:text-steel-300 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{COMPANY_INFO.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-steel-300">
              <MapPin className="h-4 w-4" />
              <span>{COMPANY_INFO.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white shadow-soft group-hover:shadow-industrial transition-shadow">
              <Image
                src="/images/logo/Adobe_Express_-_file.jpg"
                alt="INO-VAP ZONE"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-navy-900">INO-VAP ZONE</span>
              <span className="text-xs text-steel-500 tracking-wide">Stainless Steel Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-navy-800 hover:text-navy-900 font-medium transition-colors rounded-lg hover:bg-steel-100"
            >
              Home
            </Link>

            {/* Products Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveCategory('products')}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <button
                className={cn(
                  'flex items-center gap-1 px-4 py-2 text-navy-800 hover:text-navy-900 font-medium transition-colors rounded-lg hover:bg-steel-100',
                  activeCategory === 'products' && 'bg-steel-100'
                )}
              >
                Products
                <ChevronDown className={cn(
                  'h-4 w-4 transition-transform',
                  activeCategory === 'products' && 'rotate-180'
                )} />
              </button>

              {/* Mega Menu Panel */}
              {activeCategory === 'products' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-4xl bg-white border border-steel-200 rounded-xl shadow-premium mt-2 p-6 animate-fade-in">
                  <div className="grid grid-cols-3 gap-6">
                    {CATEGORIES.map((category, index) => (
                      <Link
                        key={category.slug}
                        href={`/products/${category.slug}`}
                        className="group flex items-start gap-3 p-3 rounded-lg hover:bg-steel-50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-navy-900/5 rounded-lg flex items-center justify-center text-navy-900 font-bold text-sm group-hover:bg-navy-900 group-hover:text-white transition-colors">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div>
                          <div className="font-semibold text-navy-900 group-hover:text-navy-700">
                            {category.name}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-steel-200 flex justify-between items-center">
                    <span className="text-sm text-steel-500">Premium stainless steel industrial products</span>
                    <Link
                      href="/products"
                      className="text-sm font-semibold text-navy-900 hover:text-navy-700 flex items-center gap-1"
                    >
                      View All Products
                      <ChevronDown className="h-4 w-4 -rotate-90" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/categories"
              className="px-4 py-2 text-navy-800 hover:text-navy-900 font-medium transition-colors rounded-lg hover:bg-steel-100"
            >
              Categories
            </Link>

            <Link
              href="/about"
              className="px-4 py-2 text-navy-800 hover:text-navy-900 font-medium transition-colors rounded-lg hover:bg-steel-100"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="px-4 py-2 text-navy-800 hover:text-navy-900 font-medium transition-colors rounded-lg hover:bg-steel-100"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-navy-800 hover:text-navy-900 hover:bg-steel-100"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/quote">
              <Button className="bg-navy-900 hover:bg-navy-800 text-white shadow-industrial">
                Request Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-navy-900 hover:bg-steel-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4 animate-fade-in">
            <form action="/search" method="GET" className="relative">
              <Input
                type="search"
                name="q"
                placeholder="Search products by name, SKU, or reference..."
                className="w-full h-12 pl-12 bg-steel-50 border-steel-200 focus:border-navy-500"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-steel-400" />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-steel-200 bg-white animate-slide-up">
          <nav className="container mx-auto px-4 py-6 space-y-2">
            <Link
              href="/"
              className="block py-3 px-4 text-navy-900 font-semibold rounded-lg hover:bg-steel-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block py-3 px-4 text-navy-900 font-semibold rounded-lg hover:bg-steel-50"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            <div className="pl-4 space-y-1">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  className="block py-2 px-4 text-navy-700 hover:text-navy-900 rounded-lg hover:bg-steel-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <Link
              href="/categories"
              className="block py-3 px-4 text-navy-900 font-semibold rounded-lg hover:bg-steel-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="block py-3 px-4 text-navy-900 font-semibold rounded-lg hover:bg-steel-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block py-3 px-4 text-navy-900 font-semibold rounded-lg hover:bg-steel-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-steel-200 space-y-3">
              <Link href="/quote" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-navy-900 hover:bg-navy-800 text-white">
                  Request Quote
                </Button>
              </Link>
              <div className="text-center text-sm text-steel-600 space-y-1">
                <p>{COMPANY_INFO.phone} / {COMPANY_INFO.mobile}</p>
                <p>{COMPANY_INFO.email}</p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
