import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { cn } from '../../lib/utils';

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  allLabel?: string;
  placeholder?: string;
  className?: string;
}

export function FilterSelect({
  value,
  onChange,
  options,
  allLabel = 'All',
  placeholder,
  className,
}: FilterSelectProps) {
  // Always include "All" as first option
  const allOptions = [
    { value: 'all', label: allLabel },
    ...options,
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn('min-w-[140px] w-auto', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}