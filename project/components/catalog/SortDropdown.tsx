'use client';

import { useState } from 'react';
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortDropdownProps {
  sortBy: string;
  sortOrder: string;
  onChange: (sortBy: string, sortOrder: string) => void;
}

export function SortDropdown({ sortBy, sortOrder, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'name-asc', label: 'Name (A-Z)', sortBy: 'name', sortOrder: 'asc' },
    { value: 'name-desc', label: 'Name (Z-A)', sortBy: 'name', sortOrder: 'desc' },
    { value: 'sku-asc', label: 'SKU (Ascending)', sortBy: 'sku', sortOrder: 'asc' },
    { value: 'sku-desc', label: 'SKU (Descending)', sortBy: 'sku', sortOrder: 'desc' },
    { value: 'created_at-desc', label: 'Newest First', sortBy: 'created_at', sortOrder: 'desc' },
    { value: 'created_at-asc', label: 'Oldest First', sortBy: 'created_at', sortOrder: 'asc' },
  ];

  const currentValue = `${sortBy}-${sortOrder}`;
  const currentLabel = options.find(o => o.value === currentValue)?.label || 'Sort by';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-steel-200 rounded-lg hover:bg-steel-50 transition-colors"
      >
        <ArrowUpDown className="w-4 h-4 text-steel-500" />
        <span className="text-sm font-medium text-navy-900">{currentLabel}</span>
        <ChevronDown className={cn('w-4 h-4 text-steel-500 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-steel-200 rounded-lg shadow-soft z-20 overflow-hidden">
            {options.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.sortBy, option.sortOrder);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-steel-50 transition-colors',
                  option.value === currentValue && 'bg-navy-50 text-navy-900 font-medium'
                )}
              >
                {option.value === currentValue && (
                  <Check className="w-4 h-4 text-navy-600" />
                )}
                <span className={option.value !== currentValue ? 'pl-6' : ''}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
