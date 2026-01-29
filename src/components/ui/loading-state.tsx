import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoadingStateProps {
  /** Loading text to display */
  text?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
}

/**
 * Page/Section Loading State
 * Centered spinner with optional text
 */
export function LoadingState({ text = 'Loading...', size = 'md', className }: LoadingStateProps) {
  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center py-12', className)}>
      <Loader2 className={cn(iconSizes[size], 'text-primary animate-spin')} />
      {text && <p className="text-sm text-muted-foreground mt-3">{text}</p>}
    </div>
  );
}

/**
 * Skeleton Card for List/Grid Loading
 */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-xl border p-6 space-y-4', className)}>
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 bg-muted rounded-lg animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-full" />
        <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2">
        <div className="h-6 bg-muted rounded animate-pulse w-20" />
        <div className="h-6 bg-muted rounded animate-pulse w-20" />
        <div className="h-6 bg-muted rounded animate-pulse w-20" />
      </div>

      {/* Action */}
      <div className="h-8 bg-muted rounded animate-pulse w-32" />
    </div>
  );
}

/**
 * Skeleton List Row for Table Loading
 */
export function SkeletonRow({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-4 p-4 border-b', className)}>
      <div className="h-4 w-4 bg-muted rounded animate-pulse" />
      <div className="h-4 bg-muted rounded animate-pulse w-1/4" />
      <div className="h-4 bg-muted rounded animate-pulse w-1/6" />
      <div className="h-4 bg-muted rounded animate-pulse w-1/6" />
      <div className="h-4 bg-muted rounded animate-pulse w-1/6" />
      <div className="h-4 bg-muted rounded animate-pulse w-20" />
    </div>
  );
}

/**
 * Inline Loading (for buttons/actions)
 */
export function InlineLoading({ text }: { text?: string }) {
  return (
    <div className="flex items-center gap-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      {text && <span>{text}</span>}
    </div>
  );
}
