import React from 'react';
import { Badge } from './ui/badge';
import { CheckCircle, Clock, Circle } from 'lucide-react';

interface AssetProgressBadgeProps {
  progress: 'not-started' | 'in-research' | 'approved';
  variant?: 'default' | 'compact';
}

export function AssetProgressBadge({ progress, variant = 'default' }: AssetProgressBadgeProps) {
  const iconSize = variant === 'compact' ? 'h-3 w-3' : 'h-4 w-4';
  const textSize = variant === 'compact' ? 'text-xs' : '';
  
  const getBadgeConfig = () => {
    switch (progress) {
      case 'approved':
        return {
          variant: 'default' as const,
          icon: CheckCircle,
          text: 'Approved',
          className: 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200'
        };
      
      case 'in-research':
        return {
          variant: 'secondary' as const,
          icon: Clock,
          text: 'Research Active',
          className: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200'
        };
      
      case 'not-started':
      default:
        return {
          variant: 'outline' as const,
          icon: Circle,
          text: 'Not Started',
          className: 'bg-background text-muted-foreground'
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={`${textSize} ${config.className}`}>
      <Icon className={`${iconSize} mr-1.5`} />
      {config.text}
    </Badge>
  );
}