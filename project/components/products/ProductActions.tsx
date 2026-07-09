'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Download, Heart, Scale, Share, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { addFavorite, removeFavorite, isFavorite } from '@/lib/data';

interface ProductActionsProps {
  productId: string;
  productName: string;
  productSku: string;
  productReference?: string | null;
  material: string;
  availableSizes: string[];
  pdfDatasheet?: string | null;
}

export function ProductActions({
  productId,
  productName,
  productSku,
  productReference,
  material,
  availableSizes,
  pdfDatasheet,
}: ProductActionsProps) {
  const [isFav, setIsFav] = useState(false);
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('session_id');
      if (stored) return stored;
      const newId = crypto.randomUUID();
      sessionStorage.setItem('session_id', newId);
      return newId;
    }
    return '';
  });

  useEffect(() => {
    if (sessionId) {
      isFavorite(sessionId, productId).then(setIsFav);
    }
  }, [sessionId, productId]);

  const toggleFavorite = async () => {
    if (!sessionId) return;
    if (isFav) {
      await removeFavorite(sessionId, productId);
      setIsFav(false);
    } else {
      await addFavorite(sessionId, productId);
      setIsFav(true);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to request a quote for:\n\nProduct: ${productName}\nSKU: ${productSku}\nReference: ${productReference || 'N/A'}\nMaterial: ${material} Stainless Steel\nAvailable Sizes: ${availableSizes.join(', ') || 'Please specify'}\n\nPlease provide pricing and availability.`
  );

  const mailtoSubject = encodeURIComponent(`Quote Request: ${productName} (${productSku})`);
  const mailtoBody = encodeURIComponent(
    `Hello,\n\nI would like to request a quote for:\n\nProduct: ${productName}\nSKU: ${productSku}\nReference: ${productReference || 'N/A'}\nMaterial: ${material} Stainless Steel\nSizes: ${availableSizes.join(', ') || 'Please specify'}\n\nPlease provide pricing and availability.\n\nBest regards`
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `Check out ${productName} - ${productSku}`,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-4">
      {/* WhatsApp Quote Button */}
      <a
        href={`https://wa.me/213661617955?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-3 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors shadow-lg"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.432-9.884 9.884-9.884 2.635 0 5.114 1.028 6.988 2.894a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.469-19.484A13.916 13.916 0 0012.003 0C5.381 0 .003 5.378.003 12a13.946 13.946 0 001.884 7.054L0 24l7.106-1.864a13.895 13.895 0 006.65 1.702h.006c6.621 0 11.999-5.378 11.999-12S17.992 0 11.371 0"/>
        </svg>
        Request Quote via WhatsApp
      </a>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/quote">
          <Button
            variant="outline"
            className="w-full h-12 border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-semibold"
          >
            Request Quote
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <a href={`mailto:inovapzone@hotmail.com?subject=${mailtoSubject}&body=${mailtoBody}`}>
          <Button
            variant="outline"
            className="w-full h-12 border-2 border-steel-300 text-steel-700 hover:bg-steel-50 font-semibold"
          >
            Email Inquiry
          </Button>
        </a>
      </div>

      {/* Tertiary Actions */}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFavorite}
          className={cn(
            'flex-1 gap-2',
            isFav && 'text-red-500 hover:text-red-600'
          )}
        >
          <Heart className={cn('w-5 h-5', isFav && 'fill-current')} />
          {isFav ? 'Saved' : 'Save'}
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 gap-2">
          <Scale className="w-5 h-5" />
          Compare
        </Button>
        <Button variant="ghost" size="sm" onClick={handleShare} className="flex-1 gap-2">
          <Share2 className="w-5 h-5" />
          Share
        </Button>
      </div>
    </div>
  );
}
