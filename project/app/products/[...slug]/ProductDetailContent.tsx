import { ArrowUpRight, Package, Layers, Ruler, Weight, Thermometer, Gauge, Settings, Check } from 'lucide-react';
import Link from 'next/link';
import { ProductCard, ImageGallery, DownloadSection, Breadcrumb, ProductActions, SpecsTable } from '@/components/products';
import { getRelatedProducts, getProductDownloads, getProductAccessories } from '@/lib/data';
import type { ProductWithCategory } from '@/lib/types';

interface ProductDetailContentProps {
  product: ProductWithCategory;
}

export default async function ProductDetailContent({ product }: ProductDetailContentProps) {
  const relatedProducts = await getRelatedProducts(product.id, 4);
  const downloads = await getProductDownloads(product.id);
  const accessories = await getProductAccessories(product.id);

  // Category might be null, provide fallback
  const categorySlug = product.categories?.slug || 'unknown';
  const categoryName = product.categories?.name || 'Products';

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="bg-white border-b border-steel-200">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb
            items={[
              { label: categoryName, href: `/products/${categorySlug}` },
              { label: product.name },
            ]}
          />
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <ImageGallery
                images={product.gallery_images || []}
                mainImage={product.image_url}
                productName={product.name}
              />
            </div>

            {/* Product Info */}
            <div>
              {/* Category */}
              <Link
                href={`/products/${categorySlug}`}
                className="text-sm font-semibold text-navy-600 hover:text-navy-800 uppercase tracking-wider"
              >
                {categoryName}
              </Link>

              {/* Name */}
              <h1 className="mt-3 text-3xl lg:text-display-sm font-heading font-bold text-navy-900">
                {product.name}
              </h1>

              {/* SKU & Reference */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-steel-600">
                <div className="flex items-center gap-2">
                  <span className="text-sm">SKU:</span>
                  <span className="font-mono font-semibold text-navy-900">{product.sku}</span>
                </div>
                {product.reference && (
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-steel-300 rounded-full" />
                    <span className="text-sm">Ref:</span>
                    <span className="font-mono font-semibold text-navy-900">{product.reference}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="mt-6 text-lg text-steel-700 leading-relaxed">{product.description}</p>
              )}

              {/* Quick Specs */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {product.material && (
                  <div className="p-4 bg-steel-50 rounded-xl">
                    <div className="text-xs text-steel-500 uppercase tracking-wide mb-1">Material</div>
                    <div className="font-semibold text-navy-900">{product.material} SS</div>
                  </div>
                )}
                {product.connection_type && (
                  <div className="p-4 bg-steel-50 rounded-xl">
                    <div className="text-xs text-steel-500 uppercase tracking-wide mb-1">Connection</div>
                    <div className="font-semibold text-navy-900">{product.connection_type}</div>
                  </div>
                )}
                {product.standard && (
                  <div className="p-4 bg-steel-50 rounded-xl">
                    <div className="text-xs text-steel-500 uppercase tracking-wide mb-1">Standard</div>
                    <div className="font-semibold text-navy-900">{product.standard}</div>
                  </div>
                )}
                {product.pressure_rating && (
                  <div className="p-4 bg-steel-50 rounded-xl">
                    <div className="text-xs text-steel-500 uppercase tracking-wide mb-1">Pressure</div>
                    <div className="font-semibold text-navy-900">{product.pressure_rating}</div>
                  </div>
                )}
              </div>

              {/* Available Sizes */}
              {product.available_sizes.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-navy-900 uppercase tracking-wider mb-3">
                    Available Sizes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.available_sizes.map((size) => (
                      <span
                        key={size}
                        className="inline-flex items-center px-4 py-2 bg-steel-100 text-navy-800 text-sm font-medium rounded-lg border border-steel-200"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {product.applications && product.applications.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-navy-900 uppercase tracking-wider mb-3">
                    Applications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app) => (
                      <span
                        key={app}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy-100 text-navy-700 text-sm rounded-full"
                      >
                        <Check className="w-3.5 h-3.5" />
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-10">
                <ProductActions
                  productId={product.id}
                  productName={product.name}
                  productSku={product.sku}
                  productReference={product.reference}
                  material={product.material}
                  availableSizes={product.available_sizes}
                  pdfDatasheet={product.pdf_datasheet_url}
                />
              </div>

              {/* Trust Signals */}
              <div className="mt-10 pt-8 border-t border-steel-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-navy-900">AISI</div>
                    <div className="text-xs text-steel-500 uppercase tracking-wider">Standard</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-navy-900">{product.material}</div>
                    <div className="text-xs text-steel-500 uppercase tracking-wider">Grade SS</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-navy-900">ISO</div>
                    <div className="text-xs text-steel-500 uppercase tracking-wider">Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      {Object.keys(product.technical_specifications).length > 0 && (
        <section className="py-12 bg-steel-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-heading font-bold text-navy-900 mb-8">
              Technical Specifications
            </h2>
            <SpecsTable specifications={product.technical_specifications} />
          </div>
        </section>
      )}

      {/* Dimensions Section */}
      {(product.dimensions && Object.keys(product.dimensions).length > 0) || product.weight_kg || product.temperature_range || product.surface_finish ? (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-heading font-bold text-navy-900 mb-8">
              Product Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.dimensions && Object.keys(product.dimensions).length > 0 && (
                <div className="p-6 bg-steel-50 rounded-xl border border-steel-200">
                  <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center mb-4">
                    <Ruler className="w-5 h-5 text-navy-700" />
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2">Dimensions</h3>
                  <div className="space-y-1 text-sm text-steel-600">
                    {Object.entries(product.dimensions).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span>{key}:</span>
                        <span className="font-medium text-navy-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {product.weight_kg && (
                <div className="p-6 bg-steel-50 rounded-xl border border-steel-200">
                  <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center mb-4">
                    <Weight className="w-5 h-5 text-navy-700" />
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2">Weight</h3>
                  <p className="text-2xl font-bold text-navy-900">{product.weight_kg} <span className="text-sm font-normal">kg</span></p>
                </div>
              )}
              {product.temperature_range && (
                <div className="p-6 bg-steel-50 rounded-xl border border-steel-200">
                  <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center mb-4">
                    <Thermometer className="w-5 h-5 text-navy-700" />
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2">Temperature</h3>
                  <p className="text-lg font-semibold text-navy-900">{product.temperature_range}</p>
                </div>
              )}
              {product.surface_finish && (
                <div className="p-6 bg-steel-50 rounded-xl border border-steel-200">
                  <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center mb-4">
                    <Settings className="w-5 h-5 text-navy-700" />
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-2">Surface Finish</h3>
                  <p className="text-lg font-semibold text-navy-900">{product.surface_finish}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* Downloads Section */}
      <section className="py-12 bg-steel-50">
        <div className="container mx-auto px-4">
          <DownloadSection downloads={downloads} productName={product.name} />
        </div>
      </section>

      {/* Accessories */}
      {accessories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-heading font-bold text-navy-900">Accessories</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {accessories.map((accessory) => (
                <ProductCard key={accessory.id} product={accessory} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-heading font-bold text-navy-900">Related Products</h2>
              <Link
                href={`/products/${categorySlug}`}
                className="text-navy-900 hover:text-navy-700 font-semibold inline-flex items-center gap-1"
              >
                View All
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
