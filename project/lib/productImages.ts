// Product fallback images based on category
// Professional industrial product images from Unsplash
export const CATEGORY_PRODUCT_IMAGES: Record<string, string> = {
  'tri-clamp': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',
  'sms': 'https://images.unsplash.com/photo-1581091226825-a6a2a5a21ad3?w=600&q=80',
  'din': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
  'bsp-threaded-fittings': 'https://images.unsplash.com/photo-1532187863486-b86f5b504cc6?w=600&q=80',
  'stainless-steel-valves': 'https://images.unsplash.com/photo-1635070041074-89c162a8197a?w=600&q=80',
  'stainless-steel-flanges': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',
  'pipe-fittings': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
  'steam-equipment': 'https://images.unsplash.com/photo-1581091226825-a6a2a5a21ad3?w=600&q=80',
  'pressure-gauges': 'https://images.unsplash.com/photo-1635070041074-89c162a8197a?w=600&q=80',
  'industrial-instruments': 'https://images.unsplash.com/photo-1582719471384-8948c6c73a4e?w=600&q=80',
};

// Default product image
export const DEFAULT_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80';

// Get product image with fallback
export function getProductImage(categorySlug?: string, imageUrl?: string | null): string {
  if (imageUrl) return imageUrl;
  if (categorySlug && CATEGORY_PRODUCT_IMAGES[categorySlug]) {
    return CATEGORY_PRODUCT_IMAGES[categorySlug];
  }
  return DEFAULT_PRODUCT_IMAGE;
}
