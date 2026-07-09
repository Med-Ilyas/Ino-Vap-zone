'use client';

import { cn } from '@/lib/utils';

interface SpecsTableProps {
  specifications: Record<string, string>;
  title?: string;
  className?: string;
}

export function SpecsTable({ specifications, title, className }: SpecsTableProps) {
  const entries = Object.entries(specifications);

  if (entries.length === 0) return null;

  return (
    <div className={cn('bg-white rounded-xl border border-steel-200 overflow-hidden', className)}>
      {title && (
        <div className="px-6 py-4 bg-steel-50 border-b border-steel-200">
          <h3 className="font-heading font-semibold text-navy-900">{title}</h3>
        </div>
      )}
      <table className="w-full">
        <tbody>
          {entries.map(([key, value], index) => (
            <tr
              key={key}
              className={cn(index !== entries.length - 1 && 'border-b border-steel-100')}
            >
              <td className="px-6 py-3 text-sm text-steel-600 bg-steel-50/50 w-1/3">
                {key}
              </td>
              <td className="px-6 py-3 text-sm font-medium text-navy-900">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
