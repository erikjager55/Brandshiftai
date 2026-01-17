/**
 * COMPONENT: Bulk Action Dialog
 * 
 * Confirmation dialog and input form for bulk operations.
 */

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { BulkActionType, BulkOperationResult } from '../types/bulk-operations';

interface BulkActionDialogProps {
  isOpen: boolean;
  action: BulkActionType | null;
  selectedCount: number;
  onClose: () => void;
  onConfirm: (action: BulkActionType, params?: Record<string, any>) => Promise<void>;
  result?: BulkOperationResult | null;
}

export function BulkActionDialog({
  isOpen,
  action,
  selectedCount,
  onClose,
  onConfirm,
  result
}: BulkActionDialogProps) {
  const [params, setParams] = useState<Record<string, any>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !action) return null;

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm(action, params);
    } finally {
      setIsProcessing(false);
    }
  };

  const getActionConfig = () => {
    switch (action) {
      case 'change-status':
        return {
          title: 'Change Status',
          description: `Change the status of ${selectedCount} item${selectedCount > 1 ? 's' : ''}`,
          isDestructive: false,
          fields: (
            <div className="space-y-2">
              <label className="text-sm font-medium">New Status</label>
              <select
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                value={params.status || ''}
                onChange={(e) => setParams({ ...params, status: e.target.value })}
              >
                <option value="">Select status...</option>
                <option value="awaiting-research">Awaiting Research</option>
                <option value="in-development">In Development</option>
                <option value="ready-to-validate">Ready to Validate</option>
                <option value="validated">Validated</option>
              </select>
            </div>
          )
        };

      case 'change-priority':
        return {
          title: 'Change Priority',
          description: `Change the priority of ${selectedCount} item${selectedCount > 1 ? 's' : ''}`,
          isDestructive: false,
          fields: (
            <div className="space-y-2">
              <label className="text-sm font-medium">New Priority</label>
              <select
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                value={params.priority || ''}
                onChange={(e) => setParams({ ...params, priority: e.target.value })}
              >
                <option value="">Select priority...</option>
                <option value="essential">⭐ Essential</option>
                <option value="recommended">💎 Recommended</option>
                <option value="nice-to-have">✨ Nice to Have</option>
              </select>
            </div>
          )
        };

      case 'assign-tags':
        return {
          title: 'Assign Tags',
          description: `Add tags to ${selectedCount} item${selectedCount > 1 ? 's' : ''}`,
          isDestructive: false,
          fields: (
            <div className="space-y-2">
              <label className="text-sm font-medium">Tags (comma-separated)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="e.g. core, template, important"
                value={params.tagsInput || ''}
                onChange={(e) => {
                  const tagsInput = e.target.value;
                  const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
                  setParams({ ...params, tagsInput, tags });
                }}
              />
            </div>
          )
        };

      case 'change-category':
        return {
          title: 'Change Category',
          description: `Move ${selectedCount} item${selectedCount > 1 ? 's' : ''} to a different category`,
          isDestructive: false,
          fields: (
            <div className="space-y-2">
              <label className="text-sm font-medium">New Category</label>
              <select
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                value={params.category || ''}
                onChange={(e) => setParams({ ...params, category: e.target.value })}
              >
                <option value="">Select category...</option>
                <option value="Foundation">Foundation</option>
                <option value="Strategy">Strategy</option>
                <option value="Personality">Personality</option>
                <option value="Culture">Culture</option>
              </select>
            </div>
          )
        };

      case 'archive':
        return {
          title: 'Archive Items',
          description: `Archive ${selectedCount} item${selectedCount > 1 ? 's' : ''}? You can restore them later.`,
          isDestructive: false,
          fields: null
        };

      case 'delete':
        return {
          title: 'Delete Items',
          description: `Are you sure you want to delete ${selectedCount} item${selectedCount > 1 ? 's' : ''}? This action cannot be undone.`,
          isDestructive: true,
          fields: null
        };

      case 'export':
        return {
          title: 'Export Items',
          description: `Export ${selectedCount} item${selectedCount > 1 ? 's' : ''} to JSON format`,
          isDestructive: false,
          fields: null
        };

      case 'duplicate':
        return {
          title: 'Duplicate Items',
          description: `Create copies of ${selectedCount} item${selectedCount > 1 ? 's' : ''}`,
          isDestructive: false,
          fields: null
        };

      default:
        return {
          title: 'Bulk Action',
          description: `Perform action on ${selectedCount} item${selectedCount > 1 ? 's' : ''}`,
          isDestructive: false,
          fields: null
        };
    }
  };

  const config = getActionConfig();

  // Show result if available
  if (result) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-background rounded-lg shadow-xl max-w-md w-full p-6">
          {/* Result Header */}
          <div className="flex items-center gap-3 mb-4">
            {result.status === 'completed' ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
            <h2 className="text-xl font-semibold">
              {result.status === 'completed' ? 'Operation Complete' : 'Operation Failed'}
            </h2>
          </div>

          {/* Result Details */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Items:</span>
              <span className="font-medium">{result.itemsTotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Succeeded:</span>
              <span className="font-medium text-green-600">{result.itemsSucceeded}</span>
            </div>
            {result.itemsFailed > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Failed:</span>
                <span className="font-medium text-red-600">{result.itemsFailed}</span>
              </div>
            )}

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  result.status === 'completed' ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${(result.itemsSucceeded / result.itemsTotal) * 100}%` }}
              />
            </div>
          </div>

          {/* Errors */}
          {result.errors && result.errors.length > 0 && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
              <p className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">Errors:</p>
              <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
                {result.errors.slice(0, 3).map((error, i) => (
                  <li key={i}>• {error}</li>
                ))}
                {result.errors.length > 3 && (
                  <li>• ...and {result.errors.length - 3} more</li>
                )}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end">
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show confirmation dialog
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          {config.isDestructive ? (
            <AlertTriangle className="h-6 w-6 text-destructive" />
          ) : (
            <CheckCircle className="h-6 w-6 text-primary" />
          )}
          <h2 className="text-xl font-semibold">{config.title}</h2>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6">
          {config.description}
        </p>

        {/* Input Fields */}
        {config.fields && (
          <div className="mb-6">
            {config.fields}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            variant={config.isDestructive ? 'destructive' : 'default'}
            onClick={handleConfirm}
            disabled={isProcessing}
            className="gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
