'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Category } from '@/lib/types';
import { getFilterOptions } from '@/lib/data';

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory?: string;
  selectedMaterial?: string;
  selectedConnection?: string;
  selectedStandard?: string;
  onFilterChange: (key: string, value: string | undefined) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({
  categories,
  selectedCategory,
  selectedMaterial,
  selectedConnection,
  selectedStandard,
  onFilterChange,
  onClearFilters,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['category', 'material']);
  const [filterOptions, setFilterOptions] = useState<{
    materials: string[];
    connectionTypes: string[];
    standards: string[];
  }>({ materials: [], connectionTypes: [], standards: [] });

  useEffect(() => {
    getFilterOptions(selectedCategory).then(setFilterOptions);
  }, [selectedCategory]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const activeFiltersCount = [selectedCategory, selectedMaterial, selectedConnection, selectedStandard].filter(Boolean).length;

  const connections = [
    'Tri-Clamp',
    'SMS',
    'DIN',
    'BSP Threaded',
    'NPT Threaded',
    'Butt Weld',
    'Flanged',
    'Socket Weld',
  ];

  const standards = [
    'ISO 2852',
    'DIN 11851',
    'DIN 32676',
    'SMS 1145',
    'ASTM A403',
    'ANSI B16.5',
    'BS 21',
  ];

  const materials = ['304', '316', '316L', '304L'];

  const FilterSection = ({
    id,
    title,
    options,
    selected,
    onChange,
  }: {
    id: string;
    title: string;
    options: string[];
    selected?: string;
    onChange: (value: string | undefined) => void;
  }) => {
    const isExpanded = expandedSections.includes(id);
    return (
      <div className="border-b border-steel-200 py-4">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between text-left"
        >
          <span className="font-semibold text-navy-900">{title}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-steel-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-steel-500" />
          )}
        </button>
        {isExpanded && (
          <div className="mt-3 space-y-2">
            {options.map(option => (
              <label
                key={option}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name={id}
                  checked={selected === option}
                  onChange={() => onChange(selected === option ? undefined : option)}
                  className="w-4 h-4 text-navy-900 border-steel-300 focus:ring-navy-500"
                />
                <span className={cn(
                  'text-sm transition-colors',
                  selected === option ? 'text-navy-900 font-medium' : 'text-steel-600 group-hover:text-navy-800'
                )}>
                  {option}
                </span>
              </label>
            ))}
            {selected && (
              <button
                onClick={() => onChange(undefined)}
                className="text-xs text-navy-600 hover:text-navy-800 underline"
              >
                Clear selection
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-navy-900/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 w-80 bg-white border-r border-steel-200 z-50 overflow-y-auto transition-transform lg:relative lg:translate-x-0 lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="sticky top-0 bg-white border-b border-steel-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-navy-900" />
            <h2 className="font-heading font-semibold text-navy-900">Filters</h2>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 bg-navy-900 text-white text-xs font-semibold rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <button
                onClick={onClearFilters}
                className="text-sm text-navy-600 hover:text-navy-800 underline"
              >
                Clear all
              </button>
            )}
            <button onClick={onClose} className="lg:hidden p-1 hover:bg-steel-100 rounded">
              <X className="w-5 h-5 text-navy-900" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Category Filter */}
          <FilterSection
            id="category"
            title="Category"
            options={categories.map(c => c.name)}
            selected={selectedCategory}
            onChange={(value) => {
              const category = categories.find(c => c.name === value);
              onFilterChange('category', category?.slug || value);
            }}
          />

          {/* Material Filter */}
          <FilterSection
            id="material"
            title="Material"
            options={materials}
            selected={selectedMaterial}
            onChange={(value) => onFilterChange('material', value)}
          />

          {/* Connection Type Filter */}
          <FilterSection
            id="connection"
            title="Connection Type"
            options={connections}
            selected={selectedConnection}
            onChange={(value) => onFilterChange('connectionType', value)}
          />

          {/* Standard Filter */}
          <FilterSection
            id="standard"
            title="Standard"
            options={standards}
            selected={selectedStandard}
            onChange={(value) => onFilterChange('standard', value)}
          />
        </div>

        {/* Mobile Apply Button */}
        <div className="lg:hidden sticky bottom-0 bg-white border-t border-steel-200 p-4">
          <Button onClick={onClose} className="w-full bg-navy-900 hover:bg-navy-800 text-white">
            Apply Filters
          </Button>
        </div>
      </aside>
    </>
  );
}
