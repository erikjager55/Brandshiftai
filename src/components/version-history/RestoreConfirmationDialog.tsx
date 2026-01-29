import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { AlertCircle } from 'lucide-react';
import { Version } from '../../types/version-history';
import { format } from 'date-fns';

interface RestoreConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  version: Version | null;
  onConfirm: (note?: string) => void;
  isRestoring?: boolean;
}

export function RestoreConfirmationDialog({
  open,
  onClose,
  version,
  onConfirm,
  isRestoring = false,
}: RestoreConfirmationDialogProps) {
  const [note, setNote] = useState('');

  const handleConfirm = () => {
    onConfirm(note.trim() || undefined);
    setNote('');
  };

  const handleClose = () => {
    setNote('');
    onClose();
  };

  if (!version) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <DialogTitle>Restore Version?</DialogTitle>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 space-y-4">
          <DialogDescription className="text-sm">
            You are about to restore <strong>Version {version.versionNumber}</strong> from{' '}
            <strong>{format(new Date(version.createdAt), 'MMM d, yyyy')}</strong>.
          </DialogDescription>

          {/* What will happen */}
          <div className="bg-muted/50 rounded-xl p-4 space-y-2">
            <p className="text-sm font-medium">This will:</p>
            <ul className="text-sm text-muted-foreground space-y-1.5 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Create a new version with the restored content</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Keep all existing versions in history</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Not delete any data</span>
              </li>
            </ul>
          </div>

          {/* Optional note */}
          <div className="space-y-2">
            <Label htmlFor="restore-note">Add a note (optional)</Label>
            <Textarea
              id="restore-note"
              placeholder="Restored previous version because..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              disabled={isRestoring}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isRestoring}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isRestoring}>
            {isRestoring ? 'Restoring...' : 'Restore Version'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
