/**
 * UTILITY: Assign Priorities
 * 
 * Helper to assign priority to brand assets based on various criteria.
 */

import { BrandAsset, AssetPriority } from '../types/brand-asset';

/**
 * Determine asset priority based on multiple factors
 */
export function determinePriority(asset: BrandAsset): AssetPriority {
  // If explicitly marked as critical, it's essential
  if (asset.isCritical) {
    return 'essential';
  }

  // Foundation and core Strategy assets are essential
  const essentialCategories = ['Foundation', 'Core'];
  const essentialTypes = ['Golden Circle', 'Vision Statement', 'Mission Statement', 'Core Values', 'Brand Positioning'];
  
  if (essentialCategories.includes(asset.category) || essentialTypes.includes(asset.type)) {
    return 'essential';
  }

  // Strategy and Personality assets are typically recommended
  const recommendedCategories = ['Strategy', 'Personality', 'Culture'];
  
  if (recommendedCategories.includes(asset.category)) {
    return 'recommended';
  }

  // Everything else is nice-to-have
  return 'nice-to-have';
}

/**
 * Apply priorities to all assets in an array
 */
export function applyPriorities(assets: BrandAsset[]): BrandAsset[] {
  return assets.map(asset => ({
    ...asset,
    priority: asset.priority || determinePriority(asset)
  }));
}
