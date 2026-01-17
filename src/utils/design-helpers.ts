/**
 * 🎨 Design System Helpers
 * =========================
 * Consistent styling utilities and helpers
 */

/**
 * Status Badge Variants
 */
export const statusVariants = {
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  info: 'badge-info',
  neutral: 'badge-neutral',
  approved: 'badge-success',
  draft: 'badge-warning',
  empty: 'badge-neutral',
  'in-progress': 'badge-info',
  completed: 'badge-success',
  'not-started': 'badge-neutral',
} as const;

/**
 * Get status badge className
 */
export function getStatusBadgeClass(status: string): string {
  const key = status.toLowerCase().replace(/\s+/g, '-');
  return statusVariants[key as keyof typeof statusVariants] || 'badge-neutral';
}

/**
 * Status Color Variants (for backgrounds/borders)
 */
export const statusColorVariants = {
  success: 'status-success',
  warning: 'status-warning',
  error: 'status-error',
  info: 'status-info',
  neutral: 'status-neutral',
  approved: 'status-success',
  draft: 'status-warning',
  empty: 'status-neutral',
  'in-progress': 'status-info',
  completed: 'status-success',
  'not-started': 'status-neutral',
} as const;

/**
 * Get status color className for containers
 */
export function getStatusColorClass(status: string): string {
  const key = status.toLowerCase().replace(/\s+/g, '-');
  return statusColorVariants[key as keyof typeof statusColorVariants] || 'status-neutral';
}

/**
 * Icon Container Sizes
 */
export const iconContainerSizes = {
  sm: 'icon-container-sm',
  md: 'icon-container',
  lg: 'icon-container-lg',
  xl: 'icon-container-xl',
} as const;

/**
 * Get icon container className
 */
export function getIconContainerClass(size: 'sm' | 'md' | 'lg' | 'xl' = 'md'): string {
  return iconContainerSizes[size];
}

/**
 * Card Spacing Variants
 */
export const cardSpacingVariants = {
  sm: 'card-spacing-sm',
  md: 'card-spacing',
  lg: 'card-spacing-lg',
} as const;

/**
 * Get card spacing className
 */
export function getCardSpacingClass(size: 'sm' | 'md' | 'lg' = 'md'): string {
  return cardSpacingVariants[size];
}

/**
 * Shadow Variants
 */
export const shadowVariants = {
  none: '',
  sm: 'shadow-card',
  md: 'shadow-card-elevated',
  lg: 'shadow-card-floating',
} as const;

/**
 * Get shadow className
 */
export function getShadowClass(variant: 'none' | 'sm' | 'md' | 'lg' = 'sm'): string {
  return shadowVariants[variant];
}

/**
 * Grid Layout Variants
 */
export const gridVariants = {
  standard: 'grid-cards',
  dense: 'grid-cards-dense',
  wide: 'grid-cards-wide',
} as const;

/**
 * Get grid layout className
 */
export function getGridClass(variant: 'standard' | 'dense' | 'wide' = 'standard'): string {
  return gridVariants[variant];
}

/**
 * Container Width Variants
 */
export const containerVariants = {
  narrow: 'container-narrow',
  standard: 'container-standard',
  wide: 'container-wide',
} as const;

/**
 * Get container width className
 */
export function getContainerClass(variant: 'narrow' | 'standard' | 'wide' = 'standard'): string {
  return containerVariants[variant];
}

/**
 * Combine classNames utility (simple version)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Get hover effect className
 */
export const hoverEffects = {
  none: '',
  card: 'hover-card',
  scale: 'hover-scale',
  lift: 'hover-lift',
} as const;

export function getHoverEffect(effect: 'none' | 'card' | 'scale' | 'lift' = 'card'): string {
  return hoverEffects[effect];
}

/**
 * Transition speed variants
 */
export const transitionSpeeds = {
  fast: 'transition-fast',
  default: 'transition-default',
  slow: 'transition-slow',
} as const;

export function getTransitionSpeed(speed: 'fast' | 'default' | 'slow' = 'default'): string {
  return transitionSpeeds[speed];
}

/**
 * Get research method badge color
 */
export function getResearchMethodColor(method: string): string {
  const methodLower = method.toLowerCase();
  
  if (methodLower.includes('workshop')) {
    return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
  }
  if (methodLower.includes('interview')) {
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
  }
  if (methodLower.includes('survey') || methodLower.includes('questionnaire')) {
    return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
  }
  if (methodLower.includes('ai') || methodLower.includes('agent')) {
    return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
  }
  
  return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800';
}

/**
 * Get quality score color
 */
export function getQualityScoreColor(score: number): string {
  if (score >= 80) {
    return 'text-green-600 dark:text-green-400';
  }
  if (score >= 60) {
    return 'text-blue-600 dark:text-blue-400';
  }
  if (score >= 40) {
    return 'text-yellow-600 dark:text-yellow-400';
  }
  return 'text-red-600 dark:text-red-400';
}

/**
 * Get progress bar color
 */
export function getProgressBarColor(percentage: number): string {
  if (percentage >= 80) {
    return 'bg-green-500 dark:bg-green-600';
  }
  if (percentage >= 60) {
    return 'bg-blue-500 dark:bg-blue-600';
  }
  if (percentage >= 40) {
    return 'bg-yellow-500 dark:bg-yellow-600';
  }
  return 'bg-red-500 dark:bg-red-600';
}

/**
 * Format consistency helpers
 */
export const formatHelpers = {
  /**
   * Truncate text with ellipsis
   */
  truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  },

  /**
   * Format date consistently
   */
  formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  /**
   * Format percentage
   */
  formatPercentage(value: number, decimals: number = 0): string {
    return `${value.toFixed(decimals)}%`;
  },

  /**
   * Format number with commas
   */
  formatNumber(value: number): string {
    return value.toLocaleString('en-US');
  },
};

/**
 * Consistent spacing values
 */
export const spacing = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
} as const;

/**
 * Get spacing className
 */
export function getSpacing(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'): string {
  return spacing[size];
}
