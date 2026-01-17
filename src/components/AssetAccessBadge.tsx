import React from 'react';
import { Badge } from './ui/badge';
import { Lock, Unlock } from 'lucide-react';

interface AssetAccessBadgeProps {
  isUnlocked: boolean;
  variant?: 'default' | 'compact';
}

export function AssetAccessBadge({ isUnlocked, variant = 'default' }: AssetAccessBadgeProps) {
  const iconSize = variant === 'compact' ? 'h-3 w-3' : 'h-4 w-4';
  const textSize = variant === 'compact' ? 'text-xs' : '';
  
  if (isUnlocked) {
    return (
      <Badge 
        variant="outline" 
        className={`${textSize} bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800`}
      >
        <Unlock className={`${iconSize} mr-1.5`} />
        Unlocked
      </Badge>
    );
  }

  return (
    <Badge 
      variant="secondary" 
      className={`${textSize} bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300`}
    >
      <Lock className={`${iconSize} mr-1.5`} />
      Locked
    </Badge>
  );
}
