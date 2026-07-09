import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Shield, Award, Truck, Users, Target, History, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about SARL INO-VAP ZONE - your trusted partner for premium stainless steel industrial products in Algeria since 2009.',
};

const COMPANY_INFO = {
  legalName: 'SARL INO-VAP ZONE',
  brand: 'INO-VAP ZONE',
  founded: '2009',
  phone: '028 492 144',
  mobile: '0661 61 79 55',
  email: 'inovapzone@hotmail.com',
  address: 'Cité Hamiz 04, Groupe 06, Lot N°08, Alger, Algeria',
};

const VALUES = [
  {
    icon: Shield,
    title: 'Quality First',
    description:
      'We supply only premium-grade AISI 304 and 316 stainless steel products that meet international standards.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description:
      'Our experienced team provides expert technical support and product guidance for every project.',
  },
  {
    icon: Target,
    title: 'Industry Expertise',
    description:
      'Specialized knowledge in food, beverage, pharmaceutical, and chemical industry requirements.',
  },
  {
    icon: Truck,
    title: 'Reliable Delivery',
    description:
      'Efficient logistics network ensuring timely delivery across Algeria and North Africa.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy-gradient relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/90 to-navy-700/90" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-white/10 text-white text-sm font-semibold rounded-full mb-4 uppercase tracking-wide backdrop-blur-sm">
              About Us
            </span>
            <h1 className="text-4xl lg:text-display-md font-heading font-bold text-white mb-4">
              Your Trusted Partner for Industrial Stainless Steel Solutions
            </h1>
            <p className="text-xl text-steel-300">
              Serving Algeria's industrial sector with premium quality products since 2009.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-navy-100 text-navy-800 text-sm font-semibold rounded-full mb-4 uppercase tracking-wide">
                Our Story
              </span>
              <h2 className="text-3xl lg:text-display-sm font-heading font-bold text-navy-900 mb-6">
                Excellence in Stainless Steel
              </h2>
              <div className="space-y-4 text-steel-700 text-lg">
                <p>
                  {COMPANY_INFO.legalName} has established itself as a leading supplier of premium
                  stainless steel industrial products in Algeria since 2009.
                </p>
                <p>
                  We specialize in providing high-quality sanitary fittings, valves, and process
                  equipment to the food and beverage, pharmaceutical, dairy, and chemical industries
                  across Algeria and the broader North African region.
                </p>
                <p>
                  Our commitment to quality, technical expertise, and customer service has made us
                  a trusted partner for industrial projects requiring reliable stainless steel solutions.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-heading font-bold text-navy-900">15+</div>
                  <div className="text-sm text-steel-500">Years Experience</div>
                </div>
                <div className="w-px h-16 bg-steel-200" />
                <div className="text-center">
                  <div className="text-4xl font-heading font-bold text-navy-900">500+</div>
                  <div className="text-sm text-steel-500">Products</div>
                </div>
                <div className="w-px h-16 bg-steel-200" />
                <div className="text-center">
                  <div className="text-4xl font-heading font-bold text-navy-900">100+</div>
                  <div className="text-sm text-steel-500">Happy Clients</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-steel-100 rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-navy-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium">
                      <span className="text-white font-heading font-bold text-4xl">INO</span>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-navy-900 mb-2">
                      {COMPANY_INFO.brand}
                    </h3>
                    <p className="text-steel-500">Stainless Steel Solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-steel-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-navy-900 text-white text-sm font-semibold rounded-full mb-4 uppercase tracking-wide">
              Our Values
            </span>
            <h2 className="text-3xl lg:text-display-sm font-heading font-bold text-navy-900">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl border border-steel-200 hover:shadow-soft transition-shadow"
              >
                <div className="w-14 h-14 bg-navy-900 rounded-xl flex items-center justify-center mb-5">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-navy-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-steel-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-navy-100 text-navy-800 text-sm font-semibold rounded-full mb-4 uppercase tracking-wide">
                Get in Touch
              </span>
              <h2 className="text-3xl lg:text-display-sm font-heading font-bold text-navy-900">
                Contact Us Today
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-steel-50 rounded-xl text-center">
                <div className="w-12 h-12 bg-navy-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">Address</h3>
                <p className="text-steel-600 text-sm">{COMPANY_INFO.address}</p>
              </div>

              <div className="p-6 bg-steel-50 rounded-xl text-center">
                <div className="w-12 h-12 bg-navy-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">Phone</h3>
                <p className="text-steel-600 text-sm">
                  {COMPANY_INFO.phone}
                  <br />
                  {COMPANY_INFO.mobile}
                </p>
              </div>

              <div className="p-6 bg-steel-50 rounded-xl text-center">
                <div className="w-12 h-12 bg-navy-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">Email</h3>
                <p className="text-steel-600 text-sm">{COMPANY_INFO.email}</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/contact">
                <Button size="lg" className="bg-navy-900 hover:bg-navy-800 text-white px-8 h-14">
                  Contact Us
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
