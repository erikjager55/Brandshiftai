/**
 * FilterBar - Master Component
 * Unified filter bar with search, filters, and view toggles
 */

import React from 'react';
import { Input } from './input';
import { Button } from './button';
import { Search, SlidersHorizontal, Grid3x3, List } from 'lucide-react';
import { cn } from '@/constants/design-system';

export interface FilterBarProps {
  // Search
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  
  // View mode toggle
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  
  // Filter button
  onFilterClick?: () => void;
  filterLabel?: string;
  
  // Custom filters/actions (right side)
  actions?: React.ReactNode;
  
  // Layout
  withBorder?: boolean;
  
  // Custom className
  className?: string;
}

export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  viewMode,
  onViewModeChange,
  onFilterClick,
  filterLabel = 'Filters',
  actions,
  withBorder = false,
  className,
}: FilterBarProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3',
        withBorder ? 'pb-4 mb-6 border-b border-border' : 'mb-6',
        className
      )}
    >
      {/* Search input */}
      {onSearchChange && (
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      {/* Right side controls */}
      <div className="flex items-center gap-2">
        {/* Custom actions */}
        {actions}

        {/* Filter button */}
        {onFilterClick && (
          <Button variant="outline" size="sm" onClick={onFilterClick}>
            <SlidersHorizontal className="h-4 w-4" />
            {filterLabel}
          </Button>
        )}

        {/* View mode toggle */}
        {onViewModeChange && (
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'h-8 w-8 p-0',
                viewMode === 'grid' && 'bg-background shadow-sm'
              )}
              onClick={() => onViewModeChange('grid')}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'h-8 w-8 p-0',
                viewMode === 'list' && 'bg-background shadow-sm'
              )}
              onClick={() => onViewModeChange('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
