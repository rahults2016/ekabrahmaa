/**
 * Utility functions for image optimization
 */

/**
 * Optimizes Pexels image URLs by adding appropriate parameters
 * @param url Original image URL
 * @param width Desired image width
 * @param quality Image quality (1-100)
 * @returns Optimized image URL
 */
export const optimizePexelsImage = (url: string, width = 800, quality = 80): string => {
  if (!url || !url.includes('pexels.com')) return url;
  
  // Add optimization parameters to Pexels URLs
  return `${url}?auto=compress&cs=tinysrgb&w=${width}&q=${quality}`;
};

/**
 * Determines appropriate image size based on viewport
 * @param viewportWidth Current viewport width
 * @returns Appropriate image width
 */
export const getResponsiveImageSize = (viewportWidth: number): number => {
  if (viewportWidth < 640) return 400; // Mobile
  if (viewportWidth < 1024) return 800; // Tablet
  return 1200; // Desktop
};

/**
 * Creates a responsive image srcset for Pexels images
 * @param url Base image URL
 * @returns Srcset string for responsive images
 */
export const createPexelsSrcSet = (url: string): string => {
  if (!url || !url.includes('pexels.com')) return url;
  
  const sizes = [400, 800, 1200, 1600];
  
  return sizes
    .map(size => `${optimizePexelsImage(url, size)} ${size}w`)
    .join(', ');
};

/**
 * Generates appropriate sizes attribute for responsive images
 * @returns Sizes attribute string
 */
export const getResponsiveSizes = (): string => {
  return '(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px';
};

/**
 * Determines if an image should be lazy loaded based on its position
 * @param index Position of the image in a list
 * @param threshold Number of images to eagerly load
 * @returns Loading strategy ('lazy' or 'eager')
 */
export const getLoadingStrategy = (index: number, threshold = 2): 'lazy' | 'eager' => {
  return index < threshold ? 'eager' : 'lazy';
};