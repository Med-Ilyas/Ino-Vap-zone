'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80',
    alt: 'Stainless steel manufacturing facility',
    title: 'Premium Stainless Steel',
    subtitle: 'Industrial Products',
    description: 'High-quality stainless steel products manufactured to international standards.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5a21ad3?w=1920&q=80',
    alt: 'Food processing facility',
    title: 'Food Processing',
    subtitle: 'Solutions',
    description: 'Sanitary fittings and equipment for the food and beverage industry.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    alt: 'Beverage production line',
    title: 'Beverage',
    subtitle: 'Production',
    description: 'Specialized components for dairy, juice, and beverage processing.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1582719471384-8948c6c73a4e?w=1920&q=80',
    alt: 'Pharmaceutical laboratory',
    title: 'Pharmaceutical',
    subtitle: 'Grade Equipment',
    description: 'Premium sanitary solutions for pharmaceutical and biotech industries.',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    alt: 'Industrial piping systems',
    title: 'Industrial',
    subtitle: 'Piping Systems',
    description: 'Comprehensive range of valves, flanges, and pipe fittings.',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1532187863486-b86f5b504cc6?w=1920&q=80',
    alt: 'Chemical plant',
    title: 'Chemical',
    subtitle: 'Industry Solutions',
    description: 'Corrosion-resistant equipment for chemical processing applications.',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 500);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % SLIDES.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 30000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/85 via-navy-800/80 to-navy-900/90" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-4xl">
          <div
            className={`transition-all duration-700 ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Leading Supplier in Algeria
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-display-xl font-heading font-bold text-white mb-4 leading-tight">
              {SLIDES[currentSlide].title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-steel-200 to-steel-400">
                {SLIDES[currentSlide].subtitle}
              </span>
            </h1>

            <p className="text-xl text-steel-300 mb-10 max-w-2xl">
              {SLIDES[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-navy-900 hover:bg-steel-100 font-semibold px-10 h-16 text-lg shadow-premium">
                  Explore Products
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a
                href="https://wa.me/213661617955?text=Hello%2C%20I%20would%20like%20to%20request%20a%20quote."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold px-10 h-16 text-lg backdrop-blur-sm">
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.432-9.884 9.884-9.884 2.635 0 5.114 1.028 6.988 2.894a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.469-19.484A13.916 13.916 0 0012.003 0C5.381 0 .003 5.378.003 12a13.946 13.946 0 001.884 7.054L0 24l7.106-1.864a13.895 13.895 0 006.65 1.702h.006c6.621 0 11.999-5.378 11.999-12S17.992 0 11.371 0"/>
                  </svg>
                  Request Quote
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-12 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
