import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { X, Eye, GitBranch, RotateCcw, Circle, CheckCircle2, User } from 'lucide-react';
import { Version, ItemType } from '../../types/version-history';
import { useVersionHistory } from '../../contexts';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '../../lib/utils';

interface VersionHistoryPanelProps {
  open: boolean;
  onClose: () => void;
  itemType: ItemType;
  itemId: string;
  sectionId?: string;
  itemName: string;
  onViewVersion: (version: Version) => void;
  onCompareVersions: (version1: Version, version2: Version) => void;
  onRestoreVersion: (version: Version) => void;
}

export function VersionHistoryPanel({
  open,
  onClose,
  itemType,
  itemId,
  sectionId,
  itemName,
  onViewVersion,
  onCompareVersions,
  onRestoreVersion,
}: VersionHistoryPanelProps) {
  const { getVersionHistory } = useVersionHistory();
  const [versions, setVersions] = useState<Version[]>([]);
  const [displayCount, setDisplayCount] = useState(10);

  useEffect(() => {
    if (open) {
      const history = getVersionHistory(itemType, itemId, sectionId);
      if (history) {
        // Sort versions by version number descending (newest first)
        const sortedVersions = [...history.versions].sort(
          (a, b) => b.versionNumber - a.versionNumber
        );
        setVersions(sortedVersions);
      }
    }
  }, [open, itemType, itemId, sectionId, getVersionHistory]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 10);
  };

  const displayedVersions = versions.slice(0, displayCount);
  const hasMore = versions.length > displayCount;

  const currentVersion = versions[0]; // Newest version

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-200"
        onClick={handleBackdropClick}
      />

      {/* Panel */}
      <div
        className={cn(
          'fixed right-0 top-0 h-full w-[400px] bg-background border-l shadow-xl z-50',
          'transform transition-transform duration-300 ease-out',
          'flex flex-col',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-lg font-semibold">Version History</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 -mr-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{itemName}</p>
        </div>

        {/* Versions List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {displayedVersions.length === 0 ? (
            <div className="text-center py-12">
              <Circle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-sm text-muted-foreground">
                No version history available
              </p>
            </div>
          ) : (
            displayedVersions.map((version, index) => {
              const isCurrent = index === 0;
              const isFirstVersion = version.versionNumber === 1;

              return (
                <div
                  key={version.id}
                  className={cn(
                    'bg-card rounded-xl border p-4 transition-all hover:shadow-md',
                    isCurrent && 'border-green-500 dark:border-green-600 border-2'
                  )}
                >
                  {/* Status and Version Number */}
                  <div className="flex items-center gap-2 mb-2">
                    {isCurrent ? (
                      <>
                        <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs">
                          Current Version
                        </Badge>
                      </>
                    ) : (
                      <>
                        <Circle className="h-3 w-3 text-gray-400" />
                        <span className="text-sm font-medium text-muted-foreground">
                          Version {version.versionNumber}
                        </span>
                      </>
                    )}
                    {isFirstVersion && (
                      <Badge variant="outline" className="text-xs ml-auto">
                        Created
                      </Badge>
                    )}
                    {version.isRestored && (
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs ml-auto">
                        Restored
                      </Badge>
                    )}
                  </div>

                  {/* Timestamp */}
                  <p className="text-xs text-muted-foreground mb-2">
                    {formatDistanceToNow(new Date(version.createdAt), {
                      addSuffix: true,
                    })}
                  </p>

                  {/* User */}
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-6 w-6">
                      {version.createdBy.avatar ? (
                        <AvatarImage src={version.createdBy.avatar} />
                      ) : null}
                      <AvatarFallback className="text-xs">
                        {version.createdBy.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      {version.createdBy.name}
                    </span>
                  </div>

                  {/* Change Note */}
                  {version.changeNote && (
                    <p className="text-sm italic text-muted-foreground mb-3">
                      "{version.changeNote}"
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewVersion(version)}
                      className="h-7 text-xs"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    {!isCurrent && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            onCompareVersions(version, currentVersion)
                          }
                          className="h-7 text-xs"
                        >
                          <GitBranch className="h-3 w-3 mr-1" />
                          Compare
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRestoreVersion(version)}
                          className="h-7 text-xs text-primary hover:text-primary"
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Restore
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {/* Load More */}
          {hasMore && (
            <div className="pt-4 pb-2">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                className="w-full"
              >
                Load More Versions
              </Button>
            </div>
          )}
        </div>

        {/* Footer Info */}
        {versions.length > 0 && (
          <div className="px-6 py-3 border-t flex-shrink-0">
            <p className="text-xs text-muted-foreground text-center">
              Showing {displayedVersions.length} of {versions.length} versions
            </p>
          </div>
        )}
      </div>
    </>
  );
}
