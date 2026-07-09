'use client';

import { useState } from 'react';
import { Download, FileText, FileCheck, File, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Download as DownloadType } from '@/lib/types';

interface DownloadSectionProps {
  downloads: DownloadType[];
  productName: string;
}

const downloadTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  datasheet: FileText,
  certificate: FileCheck,
  cad: File,
  manual: File,
  other: File,
};

const downloadTypeLabels: Record<string, string> = {
  datasheet: 'Datasheet',
  certificate: 'Certificate',
  cad: 'CAD File',
  manual: 'Manual',
  other: 'Document',
};

export function DownloadSection({ downloads, productName }: DownloadSectionProps) {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (download: DownloadType) => {
    if (!download.file_url) return;

    setDownloading(download.id);
    try {
      // Track download
      await fetch(`/api/downloads/${download.id}/increment`, { method: 'POST' }).catch(() => {});

      // Open download
      window.open(download.file_url, '_blank');
    } finally {
      setDownloading(null);
    }
  };

  // Group downloads by type
  const groupedDownloads = downloads.reduce((acc, download) => {
    if (!acc[download.type]) acc[download.type] = [];
    acc[download.type].push(download);
    return acc;
  }, {} as Record<string, DownloadType[]>);

  if (downloads.length === 0) {
    return (
      <div className="p-6 bg-steel-50 rounded-xl border border-steel-200">
        <div className="flex items-center gap-3 mb-4">
          <Download className="w-5 h-5 text-navy-700" />
          <h3 className="font-heading font-semibold text-navy-900">Downloads</h3>
        </div>
        <p className="text-sm text-steel-500">
          Technical documentation (datasheets, certificates, CAD files) will be available soon.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-steel-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Download className="w-5 h-5 text-navy-700" />
        <h3 className="font-heading font-semibold text-navy-900">Technical Documentation</h3>
        <span className="text-sm text-steel-500">({downloads.length} files)</span>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedDownloads).map(([type, typeDownloads]) => {
          const Icon = downloadTypeIcons[type] || File;
          const label = downloadTypeLabels[type] || type;

          return (
            <div key={type}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-steel-500" />
                <span className="text-sm font-semibold text-steel-700 uppercase tracking-wide">
                  {label}
                </span>
              </div>
              <div className="space-y-2">
                {typeDownloads.map(download => (
                  <button
                    key={download.id}
                    onClick={() => handleDownload(download)}
                    disabled={downloading === download.id || !download.file_url}
                    className={cn(
                      'w-full flex items-center justify-between p-4 rounded-lg border transition-colors',
                      download.file_url
                        ? 'border-steel-200 hover:border-navy-300 hover:bg-steel-50'
                        : 'border-steel-200 bg-steel-50 cursor-not-allowed'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-navy-700" />
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="text-sm font-medium text-navy-900 truncate">
                          {download.title}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-steel-500">
                          {download.file_size_kb && (
                            <span>{(download.file_size_kb / 1024).toFixed(1)} MB</span>
                          )}
                          {download.downloads_count > 0 && (
                            <>
                              <span className="w-1 h-1 bg-steel-300 rounded-full" />
                              <span>{download.downloads_count} downloads</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {download.file_url ? (
                      <ArrowUpRight className="w-5 h-5 text-steel-400 flex-shrink-0" />
                    ) : (
                      <span className="text-xs text-steel-400 flex-shrink-0">Coming soon</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
