import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './input';
import { cn } from '../../lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  autoFocus?: boolean;
}

const sizeClasses = {
  sm: 'h-8 text-sm',
  md: 'h-10',
  lg: 'h-12 text-base',
};

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  size = 'md',
  className,
  autoFocus = false,
}: SearchBarProps) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn('pl-10', sizeClasses[size], value && 'pr-10')}
        autoFocus={autoFocus}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
