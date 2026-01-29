import React from 'react';
import { Button } from '../ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export interface EmptyStateProps {
  icon?: LucideIcon;
  iconElement?: React.ReactNode;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  links?: Array<{
    label: string;
    onClick: () => void;
  }>;
  className?: string;
  animate?: boolean;
}

export function EmptyState({
  icon: Icon,
  iconElement,
  title,
  description,
  primaryAction,
  secondaryAction,
  links,
  className,
  animate = true,
}: EmptyStateProps) {
  const content = (
    <div className={cn('flex flex-col items-center justify-center py-12 px-6', className)}>
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          {iconElement || (Icon && (
            <div className="h-24 w-24 rounded-xl bg-muted/50 dark:bg-muted/30 flex items-center justify-center">
              <Icon className="h-12 w-12 text-muted-foreground/30 dark:text-muted-foreground/20" />
            </div>
          ))}
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col gap-2 items-center">
            {primaryAction && (
              <Button
                onClick={primaryAction.onClick}
                className="gap-2"
              >
                {primaryAction.icon && <primaryAction.icon className="h-4 w-4" />}
                {primaryAction.label}
              </Button>
            )}
            
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        )}

        {/* Links */}
        {links && links.length > 0 && (
          <div className="flex items-center justify-center gap-4 pt-2">
            {links.map((link, index) => (
              <React.Fragment key={link.label}>
                {index > 0 && <span className="text-muted-foreground">|</span>}
                <button
                  onClick={link.onClick}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (!animate) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {content}
    </motion.div>
  );
}

// Variant for inline empty states (smaller, in cards)
export function EmptyStateInline({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-8 px-6 text-center', className)}>
      {Icon && (
        <div className="h-12 w-12 rounded-lg bg-muted/50 dark:bg-muted/30 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-muted-foreground/30 dark:text-muted-foreground/20" />
        </div>
      )}
      
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      
      {description && (
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
      )}
      
      {action && (
        <Button size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
