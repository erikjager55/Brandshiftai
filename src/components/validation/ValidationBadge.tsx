/**
 * Validation Badge Component
 * Displays validation percentage with proper color coding for brand assets
 */

import React from 'react';
import { cn } from '../../lib/utils';
import { getValidationConfig } from '../../constants/quality-system';

interface ValidationBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showPercentage?: boolean;
  className?: string;
}

export function ValidationBadge({
  score,
  size = 'md',
  showIcon = true,
  showPercentage = true,
  className
}: ValidationBadgeProps) {
  const config = getValidationConfig(score);
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2 py-0.5',
    lg: 'text-sm px-2.5 py-1'
  };

  const iconSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-3 w-3',
    lg: 'h-4 w-4'
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-semibold',
        config.badgeClasses,
        config.darkBadgeClasses,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <Icon className={iconSizeClasses[size]} />}
      {showPercentage && <span>{score}%</span>}
    </div>
  );
}
