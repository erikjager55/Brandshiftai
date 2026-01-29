import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Version } from '../../types/version-history';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import { Diff } from 'lucide-react';

interface CompareVersionsModalProps {
  open: boolean;
  onClose: () => void;
  versions: Version[];
  initialVersion1?: Version;
  initialVersion2?: Version;
  itemName: string;
  onRestore?: (version: Version) => void;
}

export function CompareVersionsModal({
  open,
  onClose,
  versions,
  initialVersion1,
  initialVersion2,
  itemName,
  onRestore,
}: CompareVersionsModalProps) {
  const [version1Id, setVersion1Id] = useState<string>(
    initialVersion1?.id || versions[1]?.id || ''
  );
  const [version2Id, setVersion2Id] = useState<string>(
    initialVersion2?.id || versions[0]?.id || ''
  );

  const version1 = useMemo(
    () => versions.find((v) => v.id === version1Id),
    [versions, version1Id]
  );
  const version2 = useMemo(
    () => versions.find((v) => v.id === version2Id),
    [versions, version2Id]
  );

  // Simple text diff highlighting
  const getDiff = (text1: string, text2: string) => {
    // This is a very simple diff - in production you'd use a proper diff library
    const words1 = text1.split(/(\s+)/);
    const words2 = text2.split(/(\s+)/);

    return { words1, words2 };
  };

  const getContentText = (content: any): string => {
    if (typeof content === 'string') return content;
    if (content?.text) return content.text;
    return JSON.stringify(content, null, 2);
  };

  const text1 = version1 ? getContentText(version1.content) : '';
  const text2 = version2 ? getContentText(version2.content) : '';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 gap-0 overflow-hidden flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Diff className="h-5 w-5" />
            Compare Versions
          </DialogTitle>
          <DialogDescription>{itemName}</DialogDescription>
        </DialogHeader>

        <div className="px-6 py-6 overflow-y-auto flex-1 space-y-4">
          {/* Version Selectors */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Version 1</label>
              <Select value={version1Id} onValueChange={setVersion1Id}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {versions.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      Version {v.versionNumber} -{' '}
                      {format(new Date(v.createdAt), 'MMM d, yyyy')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Version 2</label>
              <Select value={version2Id} onValueChange={setVersion2Id}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {versions.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      Version {v.versionNumber} -{' '}
                      {format(new Date(v.createdAt), 'MMM d, yyyy')}
                      {v.versionNumber === versions[0].versionNumber && ' (Current)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Comparison View */}
          {version1 && version2 && (
            <div className="grid grid-cols-2 gap-4">
              {/* Version 1 */}
              <div className="space-y-2">
                <div className="bg-card rounded-lg border p-3">
                  <div className="mb-2">
                    <h4 className="font-semibold text-sm">
                      Version {version1.versionNumber}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(version1.createdAt), 'MMM d, yyyy')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {version1.createdBy.name}
                    </p>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-xl p-4 min-h-[200px]">
                  <p className="text-sm whitespace-pre-wrap">{text1}</p>
                </div>
              </div>

              {/* Version 2 */}
              <div className="space-y-2">
                <div className="bg-card rounded-lg border p-3">
                  <div className="mb-2">
                    <h4 className="font-semibold text-sm">
                      Version {version2.versionNumber}
                      {version2.versionNumber === versions[0].versionNumber && (
                        <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                          (Current)
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(version2.createdAt), 'MMM d, yyyy')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {version2.createdBy.name}
                    </p>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-xl p-4 min-h-[200px]">
                  <p className="text-sm whitespace-pre-wrap">{text2}</p>
                </div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
            <span className="font-medium">Legend:</span>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded">
                Removed
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded">
                Added
              </span>
            </div>
          </div>

          {/* Diff Note */}
          {text1 !== text2 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3">
              <p className="text-xs text-blue-900 dark:text-blue-100">
                <strong>Note:</strong> This is a basic comparison view. Detailed
                word-by-word diff highlighting coming soon.
              </p>
            </div>
          )}

          {text1 === text2 && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 text-center">
              <p className="text-sm text-green-900 dark:text-green-100 font-medium">
                No changes detected between these versions
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {version1 && onRestore && (
            <Button onClick={() => onRestore(version1)}>
              Restore Version {version1.versionNumber}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
