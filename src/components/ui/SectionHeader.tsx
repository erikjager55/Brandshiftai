/**
 * SectionHeader - Master Component
 * Unified section header for content areas
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/constants/design-system';

export interface SectionHeaderProps {
  // Icon (optional)
  icon?: LucideIcon;
  
  // Title & subtitle
  title: string;
  subtitle?: string;
  
  // Right side actions
  actions?: React.ReactNode;
  
  // Spacing
  spacing?: 'default' | 'compact' | 'large';
  
  // Bottom border
  withBorder?: boolean;
  
  // Custom className
  className?: string;
}

export function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  actions,
  spacing = 'default',
  withBorder = false,
  className,
}: SectionHeaderProps) {
  const spacingClasses = {
    default: 'mb-4',
    compact: 'mb-2',
    large: 'mb-6',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between',
        spacingClasses[spacing],
        withBorder && 'pb-4 border-b border-border',
        className
      )}
    >
      {/* Left: Icon + Title */}
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
        
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
