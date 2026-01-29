/**
 * Delete Asset Confirmation Modal
 * Modal for confirming asset deletion with warning information
 */

import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface DeleteAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  assetName: string;
  artifactsCount?: number;
  researchSessionsCount?: number;
}

export function DeleteAssetModal({
  isOpen,
  onClose,
  onConfirm,
  assetName,
  artifactsCount = 0,
  researchSessionsCount = 0,
}: DeleteAssetModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative max-w-md w-full bg-background border border-border rounded-2xl shadow-xl transition-all duration-300 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-4">
          <h2 id="delete-modal-title" className="text-xl font-semibold mb-2">
            Delete {assetName}?
          </h2>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. This will permanently delete the asset and all associated research data.
          </p>
        </div>

        {/* Warning Box */}
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 mb-6">
          <p className="text-sm font-semibold text-destructive mb-2">
            You will lose:
          </p>
          <ul className="text-sm text-destructive space-y-1">
            <li>• {artifactsCount} artifacts generated</li>
            <li>• {researchSessionsCount} research sessions completed</li>
            <li>• All validation data</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Asset
          </Button>
        </div>
      </div>
    </div>
  );
}
