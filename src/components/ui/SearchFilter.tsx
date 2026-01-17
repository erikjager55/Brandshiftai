/**
 * Unified Search & Filter Components
 * Standardized search bars and filter controls for consistency
 * 
 * USE THESE COMPONENTS instead of creating custom implementations!
 */

import React, { useState, useCallback } from 'react';
import { Input } from './input';
import { Button } from './button';
import { Badge } from './badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from './dropdown-menu';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Check,
  SlidersHorizontal,
} from 'lucide-react';
import { cn } from '../../lib/utils';

// ============================================================================
// SEARCH BAR - Standard search input
// ============================================================================

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  autoFocus?: boolean;
  onClear?: () => void;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  size = 'md',
  className,
  autoFocus = false,
  onClear,
}: SearchBarProps) {
  const sizeClasses = {
    sm: 'h-8 text-sm pl-8',
    md: 'h-10 text-sm pl-10',
    lg: 'h-12 text-base pl-12',
  };

  const iconSizes = {
    sm: 'h-3.5 w-3.5 left-2.5',
    md: 'h-4 w-4 left-3',
    lg: 'h-5 w-5 left-4',
  };

  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <div className={cn('relative flex-1', className)}>
      <Search className={cn(
        'absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none',
        iconSizes[size]
      )} />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn(
          sizeClasses[size],
          value && 'pr-8'
        )}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </button>
      )}
    </div>
  );
}

// ============================================================================
// FILTER SELECT - Standard single-select filter
// ============================================================================

interface FilterOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
  label?: string;
  allLabel?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function FilterSelect({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  label,
  allLabel = 'All',
  size = 'md',
  className,
}: FilterSelectProps) {
  const allOptions: FilterOption[] = [
    { value: 'all', label: allLabel },
    ...options,
  ];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {label && (
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          {label}:
        </span>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn(
          size === 'sm' ? 'h-8 text-sm' : 'h-10',
          'w-[150px]'
        )}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {allOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                {option.icon && <option.icon className="h-4 w-4" />}
                {option.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// ============================================================================
// FILTER DROPDOWN - Standard multi-option filter with checkboxes
// ============================================================================

interface FilterDropdownProps {
  label?: string;
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  size?: 'sm' | 'md';
  className?: string;
}

export function FilterDropdown({
  label = 'Filter',
  options,
  selected,
  onChange,
  size = 'md',
  className,
}: FilterDropdownProps) {
  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={size === 'sm' ? 'sm' : 'default'}
          className={cn('gap-2', className)}
        >
          <Filter className="h-4 w-4" />
          {label}
          {selected.length > 0 && (
            <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
              {selected.length}
            </Badge>
          )}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Filters</span>
          {selected.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selected.includes(option.value)}
            onCheckedChange={() => handleToggle(option.value)}
          >
            <div className="flex items-center gap-2">
              {option.icon && <option.icon className="h-4 w-4" />}
              {option.label}
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ============================================================================
// SEARCH FILTER BAR - Combined search + filters
// ============================================================================

interface SearchFilterBarProps {
  // Search
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  
  // Single select filter (optional)
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: FilterOption[];
  filterLabel?: string;
  filterAllLabel?: string;
  
  // Multi-select filter (optional)
  multiFilterSelected?: string[];
  onMultiFilterChange?: (selected: string[]) => void;
  multiFilterOptions?: FilterOption[];
  multiFilterLabel?: string;
  
  // Actions slot (optional)
  actions?: React.ReactNode;
  
  // Styling
  size?: 'sm' | 'md';
  className?: string;
}

export function SearchFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filterValue,
  onFilterChange,
  filterOptions,
  filterLabel,
  filterAllLabel,
  multiFilterSelected,
  onMultiFilterChange,
  multiFilterOptions,
  multiFilterLabel = 'Filter',
  actions,
  size = 'md',
  className,
}: SearchFilterBarProps) {
  const hasActiveFilters = (filterValue && filterValue !== 'all') || 
                           (multiFilterSelected && multiFilterSelected.length > 0);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Search */}
      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        size={size}
        className="max-w-md"
      />

      {/* Single Select Filter */}
      {filterOptions && onFilterChange && (
        <FilterSelect
          value={filterValue || 'all'}
          onChange={onFilterChange}
          options={filterOptions}
          label={filterLabel}
          allLabel={filterAllLabel}
          size={size}
        />
      )}

      {/* Multi-Select Filter */}
      {multiFilterOptions && onMultiFilterChange && (
        <FilterDropdown
          label={multiFilterLabel}
          options={multiFilterOptions}
          selected={multiFilterSelected || []}
          onChange={onMultiFilterChange}
          size={size}
        />
      )}

      {/* Active filters indicator */}
      {hasActiveFilters && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>Filters active</span>
        </div>
      )}

      {/* Actions slot */}
      {actions && (
        <div className="ml-auto flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// ACTIVE FILTERS DISPLAY - Shows active filters as chips
// ============================================================================

interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

interface ActiveFiltersProps {
  filters: ActiveFilter[];
  onRemove: (key: string) => void;
  onClearAll: () => void;
  className?: string;
}

export function ActiveFilters({
  filters,
  onRemove,
  onClearAll,
  className,
}: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      <span className="text-xs text-muted-foreground">Active filters:</span>
      {filters.map((filter) => (
        <Badge
          key={filter.key}
          variant="secondary"
          className="gap-1 pr-1"
        >
          <span className="text-muted-foreground">{filter.label}:</span>
          <span>{filter.value}</span>
          <button
            onClick={() => onRemove(filter.key)}
            className="ml-1 hover:bg-muted rounded-full p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs text-muted-foreground hover:text-foreground underline"
      >
        Clear all
      </button>
    </div>
  );
}

// ============================================================================
// QUICK FILTER TABS - Tab-style filter for common statuses
// ============================================================================

interface QuickFilterOption {
  value: string;
  label: string;
  count?: number;
}

interface QuickFilterTabsProps {
  value: string;
  onChange: (value: string) => void;
  options: QuickFilterOption[];
  className?: string;
}

export function QuickFilterTabs({
  value,
  onChange,
  options,
  className,
}: QuickFilterTabsProps) {
  return (
    <div className={cn('flex items-center gap-1 p-1 bg-muted rounded-lg', className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
            value === option.value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {option.label}
          {option.count !== undefined && (
            <span className={cn(
              'ml-1.5 text-xs',
              value === option.value ? 'text-muted-foreground' : 'text-muted-foreground/60'
            )}>
              {option.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
