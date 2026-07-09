'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center gap-2 text-sm flex-wrap', className)} aria-label="Breadcrumb">
      <Link
        href="/"
        className="text-steel-500 hover:text-navy-800 transition-colors flex items-center gap-1"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      <ChevronRight className="w-4 h-4 text-steel-400" />
      <Link
        href="/products"
        className="text-steel-500 hover:text-navy-800 transition-colors"
      >
        Products
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-steel-400" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-steel-500 hover:text-navy-800 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-navy-900 font-medium truncate max-w-[200px]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
