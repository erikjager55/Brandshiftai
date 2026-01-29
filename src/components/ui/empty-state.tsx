import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from './button';
import { cn } from '../../lib/utils';

interface EmptyStateProps {
  /** Icon to display */
  icon: LucideIcon;
  /** Title text */
  title: string;
  /** Description text */
  description: string;
  /** Primary action button */
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  /** Secondary action button */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
}

/**
 * Generic Empty State Component
 * Used for empty lists, pages, or sections
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  size = 'md',
  className,
}: EmptyStateProps) {
  const iconSizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  const paddingSizes = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        paddingSizes[size],
        className
      )}
    >
      {/* Icon */}
      <div className="rounded-full bg-primary/10 p-4 mb-4">
        <Icon className={cn(iconSizes[size], 'text-muted-foreground/50')} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-center mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground text-center max-w-sm mx-auto">
        {description}
      </p>

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-6">
          {action && (
            <Button onClick={action.onClick} className="gap-2">
              {action.icon && <action.icon className="h-4 w-4" />}
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Search/Filter Empty State
 * Used when search or filter returns no results
 */
interface SearchEmptyStateProps {
  onClearFilters: () => void;
  className?: string;
}

export function SearchEmptyState({ onClearFilters, className }: SearchEmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12', className)}>
      <div className="rounded-full bg-primary/10 p-4 mb-4">
        <svg
          className="h-12 w-12 text-muted-foreground/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-center mb-2">No results found</h3>

      <p className="text-sm text-muted-foreground text-center max-w-sm mx-auto mb-6">
        No items match your current filters. Try adjusting your search or filters.
      </p>

      <Button variant="outline" onClick={onClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
}

/**
 * Inline/Section Empty State
 * Used for smaller sections within a page (e.g., related items)
 */
interface InlineEmptyStateProps {
  icon: LucideIcon;
  text: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function InlineEmptyState({ icon: Icon, text, action, className }: InlineEmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-8', className)}>
      <Icon className="h-8 w-8 text-muted-foreground/30 mb-3" />
      <p className="text-sm text-muted-foreground text-center mb-4">{text}</p>
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
