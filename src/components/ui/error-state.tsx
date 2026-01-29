import React from 'react';
import { AlertCircle, WifiOff, ServerCrash, FileX, Lock } from 'lucide-react';
import { Button } from './button';
import { cn } from '../../lib/utils';

interface ErrorStateProps {
  /** Error type */
  type?: 'generic' | 'network' | 'server' | 'notFound' | 'forbidden';
  /** Custom title (overrides default) */
  title?: string;
  /** Custom description (overrides default) */
  description?: string;
  /** Retry action */
  onRetry?: () => void;
  /** Navigate to dashboard action */
  onGoToDashboard?: () => void;
  /** Additional className */
  className?: string;
}

const errorConfigs = {
  generic: {
    icon: AlertCircle,
    iconColor: 'text-red-500',
    title: 'Something went wrong',
    description:
      "We couldn't load this page. Please try again or contact support if the problem persists.",
  },
  network: {
    icon: WifiOff,
    iconColor: 'text-muted-foreground',
    title: 'No internet connection',
    description: 'Please check your connection and try again.',
  },
  server: {
    icon: ServerCrash,
    iconColor: 'text-red-500',
    title: 'Server error',
    description: "Our servers are having issues. We're working on it. Please try again later.",
  },
  notFound: {
    icon: FileX,
    iconColor: 'text-muted-foreground',
    title: 'Page not found',
    description: "The page you're looking for doesn't exist or has been moved.",
  },
  forbidden: {
    icon: Lock,
    iconColor: 'text-muted-foreground',
    title: 'Access denied',
    description: "You don't have permission to view this page. Contact your admin for access.",
  },
};

/**
 * Page Error State
 * Full page error with retry/navigation options
 */
export function ErrorState({
  type = 'generic',
  title,
  description,
  onRetry,
  onGoToDashboard,
  className,
}: ErrorStateProps) {
  const config = errorConfigs[type];
  const Icon = config.icon;

  return (
    <div className={cn('flex flex-col items-center justify-center py-16', className)}>
      {/* Icon */}
      <Icon className={cn('h-12 w-12 mb-6', config.iconColor)} />

      {/* Title */}
      <h2 className="text-lg font-semibold mb-2">{title || config.title}</h2>

      {/* Description */}
      <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
        {description || config.description}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {onRetry && <Button onClick={onRetry}>Try Again</Button>}
        {onGoToDashboard && (
          <Button variant="outline" onClick={onGoToDashboard}>
            Go to Dashboard
          </Button>
        )}
        {!onRetry && !onGoToDashboard && type === 'network' && (
          <Button onClick={() => window.location.reload()}>Retry</Button>
        )}
        {!onRetry && !onGoToDashboard && (type === 'notFound' || type === 'forbidden') && (
          <Button onClick={() => (window.location.href = '/')}>Go to Dashboard</Button>
        )}
      </div>
    </div>
  );
}

/**
 * Inline Error Message
 * For form errors or action failures
 */
interface InlineErrorProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function InlineError({ message, onRetry, onDismiss, className }: InlineErrorProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 shrink-0" />
        <span className="text-sm text-red-700 dark:text-red-400">{message}</span>
      </div>
      <div className="flex items-center gap-2">
        {onRetry && (
          <Button variant="ghost" size="sm" onClick={onRetry} className="h-7 text-xs">
            Retry
          </Button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </div>
  );
}

/**
 * Field Validation Error
 * For individual form field errors
 */
interface FieldErrorProps {
  message: string;
  className?: string;
}

export function FieldError({ message, className }: FieldErrorProps) {
  return (
    <div className={cn('flex items-center gap-1 mt-1', className)}>
      <AlertCircle className="h-3 w-3 text-red-600 dark:text-red-400" />
      <span className="text-xs text-red-600 dark:text-red-400">{message}</span>
    </div>
  );
}
