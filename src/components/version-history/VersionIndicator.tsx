import React from 'react';
import { Button } from '../ui/button';
import { History, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '../../lib/utils';

interface VersionIndicatorProps {
  versionNumber: number;
  lastEditedAt: Date;
  lastEditedBy: string;
  onOpenHistory: () => void;
  className?: string;
}

export function VersionIndicator({
  versionNumber,
  lastEditedAt,
  lastEditedBy,
  onOpenHistory,
  className,
}: VersionIndicatorProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between text-xs text-muted-foreground pt-3 mt-3 border-t',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="font-medium">v{versionNumber}</span>
        <span>•</span>
        <span>
          Last edited {formatDistanceToNow(new Date(lastEditedAt), { addSuffix: true })}
        </span>
        <span>by</span>
        <span className="font-medium">{lastEditedBy}</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpenHistory}
        className="h-7 text-xs gap-1.5 hover:text-foreground"
      >
        <History className="h-3 w-3" />
        History
      </Button>
    </div>
  );
}
