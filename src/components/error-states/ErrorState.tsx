import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export type ErrorSeverity = 'error' | 'warning' | 'info';

export interface ErrorStateProps {
  severity?: ErrorSeverity;
  icon?: LucideIcon;
  iconElement?: React.ReactNode;
  title: string;
  description: string;
  errorId?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  children?: React.ReactNode;
  className?: string;
  animate?: boolean;
}

// Page-level error component (full page)
export function ErrorState({
  severity = 'error',
  icon: Icon,
  iconElement,
  title,
  description,
  errorId,
  primaryAction,
  secondaryAction,
  children,
  className,
  animate = true,
}: ErrorStateProps) {
  const getSeverityStyles = () => {
    switch (severity) {
      case 'error':
        return {
          iconBg: 'bg-red-100 dark:bg-red-900/30',
          iconColor: 'text-red-600 dark:text-red-400',
        };
      case 'warning':
        return {
          iconBg: 'bg-amber-100 dark:bg-amber-900/30',
          iconColor: 'text-amber-600 dark:text-amber-400',
        };
      case 'info':
        return {
          iconBg: 'bg-blue-100 dark:bg-blue-900/30',
          iconColor: 'text-blue-600 dark:text-blue-400',
        };
    }
  };

  const styles = getSeverityStyles();

  const content = (
    <div className={cn('flex flex-col items-center justify-center py-12 px-6', className)}>
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          {iconElement || (Icon && (
            <div className={cn('h-24 w-24 rounded-xl flex items-center justify-center', styles.iconBg)}>
              <Icon className={cn('h-12 w-12', styles.iconColor)} />
            </div>
          ))}
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          
          {errorId && (
            <p className="text-xs text-muted-foreground pt-2">
              Error ID: <code className="bg-muted px-2 py-1 rounded">{errorId}</code>
            </p>
          )}
        </div>

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col gap-2 items-center">
            {primaryAction && (
              <Button onClick={primaryAction.onClick}>
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

        {/* Custom children */}
        {children}
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

// Component-level error banner
export interface ErrorBannerProps {
  severity?: ErrorSeverity;
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorBanner({
  severity = 'error',
  icon: Icon,
  title,
  description,
  action,
  dismissible = false,
  onDismiss,
  className,
}: ErrorBannerProps) {
  const getSeverityStyles = () => {
    switch (severity) {
      case 'error':
        return {
          border: 'border-red-200 dark:border-red-900',
          bg: 'bg-red-50 dark:bg-red-900/20',
          iconColor: 'text-red-600 dark:text-red-400',
          textColor: 'text-red-900 dark:text-red-200',
        };
      case 'warning':
        return {
          border: 'border-amber-200 dark:border-amber-900',
          bg: 'bg-amber-50 dark:bg-amber-900/20',
          iconColor: 'text-amber-600 dark:text-amber-400',
          textColor: 'text-amber-900 dark:text-amber-200',
        };
      case 'info':
        return {
          border: 'border-blue-200 dark:border-blue-900',
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          iconColor: 'text-blue-600 dark:text-blue-400',
          textColor: 'text-blue-900 dark:text-blue-200',
        };
    }
  };

  const styles = getSeverityStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'rounded-xl border p-4',
        styles.border,
        styles.bg,
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        {Icon && (
          <div className="flex-shrink-0">
            <Icon className={cn('h-5 w-5', styles.iconColor)} />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 space-y-2">
          <h4 className={cn('text-sm font-semibold', styles.textColor)}>
            {title}
          </h4>
          
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}

          {action && (
            <div className="pt-2">
              <Button size="sm" variant="outline" onClick={action.onClick}>
                {action.label}
              </Button>
            </div>
          )}
        </div>

        {/* Dismiss button */}
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 rounded-lg hover:bg-background/50 transition-colors"
            aria-label="Dismiss"
          >
            <svg
              className="h-4 w-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Form field error
export interface FieldErrorProps {
  message: string;
  className?: string;
}

export function FieldError({ message, className }: FieldErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('flex items-center gap-2 mt-1', className)}
    >
      <svg
        className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-sm text-red-600 dark:text-red-400">{message}</span>
    </motion.div>
  );
}

// Inline warning (less severe than error)
export interface InlineWarningProps {
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: LucideIcon;
  className?: string;
}

export function InlineWarning({
  message,
  action,
  icon: Icon,
  className,
}: InlineWarningProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 p-4',
        className
      )}
    >
      <div className="flex items-start gap-2">
        {Icon && (
          <Icon className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          <p className="text-sm text-amber-900 dark:text-amber-200">{message}</p>
          {action && (
            <button
              onClick={action.onClick}
              className="text-sm text-amber-600 dark:text-amber-400 hover:underline mt-2"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Error card (for sections within pages)
export interface ErrorCardProps {
  severity?: ErrorSeverity;
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function ErrorCard({
  severity = 'error',
  icon: Icon,
  title,
  description,
  action,
  className,
}: ErrorCardProps) {
  const getSeverityStyles = () => {
    switch (severity) {
      case 'error':
        return {
          iconBg: 'bg-red-100 dark:bg-red-900/30',
          iconColor: 'text-red-600 dark:text-red-400',
        };
      case 'warning':
        return {
          iconBg: 'bg-amber-100 dark:bg-amber-900/30',
          iconColor: 'text-amber-600 dark:text-amber-400',
        };
      case 'info':
        return {
          iconBg: 'bg-blue-100 dark:bg-blue-900/30',
          iconColor: 'text-blue-600 dark:text-blue-400',
        };
    }
  };

  const styles = getSeverityStyles();

  return (
    <div className={cn('rounded-xl border p-6 text-center space-y-4', className)}>
      {Icon && (
        <div className="flex justify-center">
          <div className={cn('h-12 w-12 rounded-lg flex items-center justify-center', styles.iconBg)}>
            <Icon className={cn('h-6 w-6', styles.iconColor)} />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {action && (
        <Button size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
