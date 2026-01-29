import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Version } from '../../types/version-history';
import { format } from 'date-fns';

interface VersionPreviewModalProps {
  open: boolean;
  onClose: () => void;
  version: Version | null;
  itemName: string;
  onRestore?: (version: Version) => void;
}

export function VersionPreviewModal({
  open,
  onClose,
  version,
  itemName,
  onRestore,
}: VersionPreviewModalProps) {
  if (!version) return null;

  const isCurrent = false; // You can pass this as a prop if needed

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            Version {version.versionNumber} -{' '}
            {format(new Date(version.createdAt), 'MMM d, yyyy')}
          </DialogTitle>
          <DialogDescription>{itemName}</DialogDescription>
        </DialogHeader>

        <div className="px-6 py-6 overflow-y-auto flex-1 space-y-4">
          {/* Content Display */}
          <div className="bg-muted/30 rounded-xl p-4">
            {typeof version.content === 'string' ? (
              <p className="text-sm whitespace-pre-wrap">{version.content}</p>
            ) : version.content.text ? (
              <p className="text-sm whitespace-pre-wrap">{version.content.text}</p>
            ) : (
              <pre className="text-sm whitespace-pre-wrap overflow-auto">
                {JSON.stringify(version.content, null, 2)}
              </pre>
            )}
          </div>

          {/* Metadata */}
          <div className="space-y-2 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Changed by:</span>
              <span className="font-medium">{version.createdBy.name}</span>
            </div>
            {version.changeNote && (
              <div className="flex items-start justify-between text-sm">
                <span className="text-muted-foreground">Change note:</span>
                <span className="font-medium italic text-right max-w-[60%]">
                  "{version.changeNote}"
                </span>
              </div>
            )}
            {version.isRestored && version.restoredFromVersion && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Restored from:</span>
                <span className="font-medium">Version {version.restoredFromVersion}</span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {!isCurrent && onRestore && (
            <Button onClick={() => onRestore(version)}>
              Restore This Version
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
