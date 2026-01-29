/**
 * COMPONENT: Bulk Selection Controls
 * 
 * Controls for selecting items (Select All, Select None, Select by Criteria).
 */

import React, { useState } from 'react';
import { CheckSquare, Square, Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from './ui/dropdown-menu';

interface SelectionCriterion<T = any> {
  id: string;
  label: string;
  predicate: (item: T) => boolean;
  icon?: React.ReactNode;
}

interface BulkSelectionControlsProps<T = any> {
  selectedCount: number;
  totalCount: number;
  isAllSelected: boolean;
  onToggleAll: () => void;
  onClearSelection: () => void;
  onSelectByCriteria?: (predicate: (item: T) => boolean) => void;
  selectionCriteria?: SelectionCriterion<T>[];
  showCriteriaSelector?: boolean;
}

export function BulkSelectionControls<T = any>({
  selectedCount,
  totalCount,
  isAllSelected,
  onToggleAll,
  onClearSelection,
  onSelectByCriteria,
  selectionCriteria = [],
  showCriteriaSelector = true
}: BulkSelectionControlsProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {/* Select All/None Toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleAll}
        className="gap-2 transition-colors duration-200"
      >
        {isAllSelected ? (
          <>
            <CheckSquare className="h-4 w-4" />
            Deselect All
          </>
        ) : (
          <>
            <Square className="h-4 w-4" />
            Select All
          </>
        )}
      </Button>

      {/* Clear Selection (only show when items selected) */}
      {selectedCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="gap-2 transition-colors duration-200"
        >
          <X className="h-4 w-4" />
          Clear ({selectedCount})
        </Button>
      )}

      {/* Select by Criteria */}
      {showCriteriaSelector && selectionCriteria.length > 0 && onSelectByCriteria && (
        <>
          <div className="h-6 w-px bg-border" />
          
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 transition-colors duration-200"
              >
                <Filter className="h-4 w-4" />
                Select By...
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="start" className="w-56">
              <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                Select items by criteria
              </div>
              <DropdownMenuSeparator />
              
              {selectionCriteria.map(criterion => (
                <DropdownMenuItem
                  key={criterion.id}
                  onClick={() => {
                    onSelectByCriteria(criterion.predicate);
                    setIsOpen(false);
                  }}
                  className="gap-2 transition-colors duration-200"
                >
                  {criterion.icon}
                  {criterion.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}

      {/* Selection Info */}
      {selectedCount > 0 && (
        <div className="text-sm text-muted-foreground ml-2">
          {selectedCount} of {totalCount} selected
        </div>
      )}
    </div>
  );
}