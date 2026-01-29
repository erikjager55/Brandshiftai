import React from 'react';
import { Button } from './button';
import { LucideIcon } from 'lucide-react';

/**
 * SimpleEmptyState
 * 
 * Consistent empty state component voor lijstpagina's.
 * Gebruikt een vast, herkenbaar patroon met icon, titel, beschrijving en actie.
 */

interface SimpleEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline';
  };
}

export function SimpleEmptyState({
  icon: Icon,
  title,
  description,
  action
}: SimpleEmptyStateProps) {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto h-16 w-16 rounded-xl bg-muted flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} variant={action.variant || 'default'}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
