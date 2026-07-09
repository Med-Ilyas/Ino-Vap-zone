'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, CheckCircle, List, User, Building } from 'lucide-react';

const COMPANY_INFO = {
  mobile: '0661 61 79 55',
};

export default function QuotePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productInterest: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    'Hello, I would like to request a quote for stainless steel products.\n\nPlease find my details below:'
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy-gradient relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/90 to-navy-700/90" />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-white/10 text-white text-sm font-semibold rounded-full mb-4 uppercase tracking-wide backdrop-blur-sm">
              Request Quote
            </span>
            <h1 className="text-4xl lg:text-display-md font-heading font-bold text-white mb-4">
              Get a Custom Quote
            </h1>
            <p className="text-xl text-steel-300">
              Tell us about your stainless steel product requirements and we will provide a competitive quote.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <div className="p-8 bg-green-50 border border-green-200 rounded-2xl text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">Quote Request Submitted!</h3>
                <p className="text-steel-600 mb-6">
                  Thank you for your interest. Our team will review your request and contact you within 24-48 hours with a detailed quote.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Submit Another Request
                  </Button>
                  <a
                    href={`https://wa.me/213661617955?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Contact via WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="p-6 bg-steel-50 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900">Contact Information</h3>
                      <p className="text-sm text-steel-500">How can we reach you?</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="h-12 border-white focus:border-navy-500 bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="h-12 border-white focus:border-navy-500 bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+213 XXX XXX XXX"
                        className="h-12 border-white focus:border-navy-500 bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your company"
                        className="h-12 border-white focus:border-navy-500 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Requirements */}
                <div className="p-6 bg-steel-50 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center">
                      <List className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900">Product Requirements</h3>
                      <p className="text-sm text-steel-500">What products are you interested in?</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="productInterest">Products of Interest</Label>
                      <Input
                        id="productInterest"
                        value={formData.productInterest}
                        onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                        placeholder="e.g., Tri Clamp fittings, Ball valves, Pressure gauges..."
                        className="h-12 border-white focus:border-navy-500 bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Details *</Label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please provide details such as quantities, sizes, material type (304 or 316), and any specific requirements..."
                        className="border-white focus:border-navy-500 bg-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 h-14 bg-navy-900 hover:bg-navy-800 text-white"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Submit Quote Request
                  </Button>
                  <a
                    href={`https://wa.me/213661617955?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      className="w-full h-14 bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
                    >
                      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.432-9.884 9.884-9.884 2.635 0 5.114 1.028 6.988 2.894a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.469-19.484A13.916 13.916 0 0012.003 0C5.381 0 .003 5.378.003 12a13.946 13.946 0 001.884 7.054L0 24l7.106-1.864a13.895 13.895 0 006.65 1.702h.006c6.621 0 11.999-5.378 11.999-12S17.992 0 11.371 0"/>
                      </svg>
                      Quote via WhatsApp
                    </Button>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
