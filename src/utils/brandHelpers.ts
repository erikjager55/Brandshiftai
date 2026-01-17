/**
 * UTILITY: Brand Helpers
 * 
 * Helper functions for brand assets.
 */

import { AssetPriority } from '../types/brand-asset';

export function getStatusColor(status: string): string {
  switch (status) {
    case 'validated':
    case 'approved':
      return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
    case 'ready-to-validate':
      return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
    case 'in-development':
    case 'in-progress':
      return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800';
    case 'awaiting-research':
    case 'draft':
      return 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
    default:
      return 'bg-gray-50 text-gray-600 border-gray-200';
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'validated':
      return 'Validated';
    case 'approved':
      return 'Approved';
    case 'ready-to-validate':
      return 'Ready';
    case 'in-development':
      return 'In Progress';
    case 'in-progress':
      return 'In Progress';
    case 'awaiting-research':
      return 'Not Started';
    case 'draft':
      return 'Draft';
    default:
      return status;
  }
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Foundation': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
    'Strategy': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    'Personality': 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800',
    'Culture': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    'Communication': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
    'Visual': 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
  };
  return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
}

export function getPriorityColor(priority: AssetPriority): string {
  switch (priority) {
    case 'essential':
      return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
    case 'recommended':
      return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
    case 'nice-to-have':
      return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
    default:
      return 'bg-gray-50 text-gray-600 border-gray-200';
  }
}

export function getPriorityLabel(priority?: AssetPriority): string {
  switch (priority) {
    case 'essential':
      return 'Essential';
    case 'recommended':
      return 'Recommended';
    case 'nice-to-have':
      return 'Nice to Have';
    default:
      return 'Standard';
  }
}

export function getPriorityIcon(priority?: AssetPriority): string {
  switch (priority) {
    case 'essential':
      return '⭐'; // Star for essential
    case 'recommended':
      return '💎'; // Gem for recommended
    case 'nice-to-have':
      return '✨'; // Sparkles for nice-to-have
    default:
      return '';
  }
}