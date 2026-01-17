/**
 * COMPONENT: Bulk Action Bar
 * 
 * Bottom action bar shown when items are selected.
 * Provides quick access to bulk operations.
 */

import React, { useState } from 'react';
import { 
  CheckSquare, 
  X, 
  RefreshCw, 
  Tag, 
  FolderInput, 
  Archive, 
  Trash2, 
  Download,
  Copy,
  Star,
  Undo2,
  ChevronUp
} from 'lucide-react';
import { Button } from './ui/button';
import { BulkActionType } from '../types/bulk-operations';

interface BulkActionBarProps {
  selectedCount: number;
  totalCount: number;
  onClearSelection: () => void;
  onBulkAction: (action: BulkActionType) => void;
  isProcessing?: boolean;
  canUndo?: boolean;
  onUndo?: () => void;
}

export function BulkActionBar({
  selectedCount,
  totalCount,
  onClearSelection,
  onBulkAction,
  isProcessing = false,
  canUndo = false,
  onUndo
}: BulkActionBarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300">
      {/* Main Bar */}
      <div className="bg-primary text-primary-foreground shadow-2xl border-t-2 border-primary">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Selection Info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                <span className="font-medium">
                  {selectedCount} {selectedCount === 1 ? 'item' : 'items'} selected
                </span>
                {selectedCount < totalCount && (
                  <span className="text-primary-foreground/70 text-sm">
                    of {totalCount}
                  </span>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSelection}
                className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>

            {/* Center: Quick Actions */}
            {isExpanded && (
              <div className="flex items-center gap-2 flex-1 justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onBulkAction('change-status')}
                  disabled={isProcessing}
                  className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
                  title="Change Status"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Status
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onBulkAction('change-priority')}
                  disabled={isProcessing}
                  className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
                  title="Change Priority"
                >
                  <Star className="h-4 w-4 mr-1" />
                  Priority
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onBulkAction('assign-tags')}
                  disabled={isProcessing}
                  className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
                  title="Assign Tags"
                >
                  <Tag className="h-4 w-4 mr-1" />
                  Tags
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onBulkAction('change-category')}
                  disabled={isProcessing}
                  className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
                  title="Change Category"
                >
                  <FolderInput className="h-4 w-4 mr-1" />
                  Category
                </Button>

                <div className="h-6 w-px bg-primary-foreground/30 mx-1" />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onBulkAction('archive')}
                  disabled={isProcessing}
                  className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
                  title="Archive"
                >
                  <Archive className="h-4 w-4 mr-1" />
                  Archive
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onBulkAction('export')}
                  disabled={isProcessing}
                  className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
                  title="Export"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onBulkAction('duplicate')}
                  disabled={isProcessing}
                  className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
                  title="Duplicate"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Duplicate
                </Button>

                <div className="h-6 w-px bg-primary-foreground/30 mx-1" />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onBulkAction('delete')}
                  disabled={isProcessing}
                  className="text-primary-foreground hover:text-red-400 hover:bg-red-500/20"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            )}

            {/* Right: Undo & Collapse */}
            <div className="flex items-center gap-2">
              {canUndo && onUndo && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onUndo}
                  disabled={isProcessing}
                  className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
                  title="Undo Last Action"
                >
                  <Undo2 className="h-4 w-4 mr-1" />
                  Undo
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                <ChevronUp className={`h-4 w-4 transition-transform ${!isExpanded ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="mt-3 pt-3 border-t border-primary-foreground/20">
              <div className="flex items-center gap-2 text-sm">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground" />
                <span>Processing {selectedCount} {selectedCount === 1 ? 'item' : 'items'}...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}