import React from 'react';
import { ErrorState, ErrorBanner, ErrorCard, InlineWarning } from './ErrorState';
import {
  AlertTriangle,
  WifiOff,
  Clock,
  AlertCircle,
  RefreshCw,
  CreditCard,
  Upload,
  Sparkles,
  FileX,
} from 'lucide-react';
import { Button } from '../ui/button';

// === PAGE-LEVEL ERRORS ===

// 1. 404 Not Found
export function NotFoundError({ onGoToDashboard, onGoBack }: {
  onGoToDashboard: () => void;
  onGoBack?: () => void;
}) {
  return (
    <ErrorState
      iconElement={
        <div className="text-center">
          <h1 className="text-8xl font-semibold text-muted-foreground/30 dark:text-muted-foreground/20">
            404
          </h1>
        </div>
      }
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved"
      primaryAction={{
        label: 'Go to Dashboard',
        onClick: onGoToDashboard,
      }}
      secondaryAction={onGoBack ? {
        label: 'Go back',
        onClick: onGoBack,
      } : undefined}
    />
  );
}

// 2. 500 Server Error
export function ServerError({ onTryAgain, onContactSupport, errorId }: {
  onTryAgain: () => void;
  onContactSupport?: () => void;
  errorId?: string;
}) {
  return (
    <ErrorState
      severity="error"
      icon={AlertTriangle}
      title="Something went wrong"
      description="We're having trouble loading this page. Please try again."
      errorId={errorId || `ERR-${Date.now().toString(36).toUpperCase()}`}
      primaryAction={{
        label: 'Try Again',
        onClick: onTryAgain,
      }}
      secondaryAction={onContactSupport ? {
        label: 'Contact support',
        onClick: onContactSupport,
      } : undefined}
    />
  );
}

// 3. No Connection
export function NoConnectionError({ onRetry }: {
  onRetry: () => void;
}) {
  return (
    <ErrorState
      severity="warning"
      icon={WifiOff}
      title="You're offline"
      description="Check your internet connection and try again"
      primaryAction={{
        label: 'Retry',
        onClick: onRetry,
      }}
    />
  );
}

// 4. Session Expired
export function SessionExpiredError({ onSignIn }: {
  onSignIn: () => void;
}) {
  return (
    <ErrorState
      severity="info"
      icon={Clock}
      title="Session expired"
      description="Please sign in again to continue"
      primaryAction={{
        label: 'Sign In',
        onClick: onSignIn,
      }}
    />
  );
}

// === COMPONENT-LEVEL ERRORS ===

// 1. Form Submission Error
export function FormSubmissionError({ 
  message, 
  onTryAgain,
  onDismiss 
}: {
  message: string;
  onTryAgain?: () => void;
  onDismiss?: () => void;
}) {
  return (
    <ErrorBanner
      severity="error"
      icon={AlertTriangle}
      title="Unable to save changes"
      description={message}
      action={onTryAgain ? {
        label: 'Try Again',
        onClick: onTryAgain,
      } : undefined}
      dismissible={!!onDismiss}
      onDismiss={onDismiss}
    />
  );
}

// 2. AI Generation Error
export function AIGenerationError({ onRetry }: {
  onRetry: () => void;
}) {
  return (
    <ErrorCard
      severity="error"
      icon={Sparkles}
      title="Content generation failed"
      description="There was an issue generating your content. Please try again."
      action={{
        label: 'Retry',
        onClick: onRetry,
      }}
    />
  );
}

// 3. Research Processing Error
export function ResearchProcessingError({ 
  details,
  onContactSupport 
}: {
  details?: string;
  onContactSupport?: () => void;
}) {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 p-6 space-y-4">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
        </div>
        
        <div className="flex-1 space-y-2">
          <h4 className="text-lg font-semibold">Research processing encountered an issue</h4>
          <p className="text-sm text-muted-foreground">
            Some research methods may have incomplete data. Please try again or contact support.
          </p>

          {details && (
            <div className="pt-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-sm text-amber-600 dark:text-amber-400 hover:underline"
              >
                {showDetails ? 'Hide details' : 'Show details'}
              </button>
              
              {showDetails && (
                <div className="mt-2 p-4 rounded-lg bg-background border text-sm">
                  <code className="text-muted-foreground">{details}</code>
                </div>
              )}
            </div>
          )}

          {onContactSupport && (
            <div className="pt-2">
              <button
                onClick={onContactSupport}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact support →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 4. Upload Error
export function UploadError({ 
  fileName,
  errorMessage,
  onTryAgain,
  onRemove 
}: {
  fileName: string;
  errorMessage: string;
  onTryAgain?: () => void;
  onRemove?: () => void;
}) {
  return (
    <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 p-4">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
          <FileX className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>

        <div className="flex-1 space-y-2">
          <h4 className="text-sm font-semibold text-red-900 dark:text-red-200">
            Upload failed: {errorMessage}
          </h4>
          <p className="text-sm text-muted-foreground">{fileName}</p>
          
          <div className="flex items-center gap-2 pt-2">
            {onTryAgain && (
              <button
                onClick={onTryAgain}
                className="text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                Try again
              </button>
            )}
            {onRemove && (
              <button
                onClick={onRemove}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Payment Error
export function PaymentError({ 
  message,
  onUpdatePayment,
  onDismiss 
}: {
  message: string;
  onUpdatePayment?: () => void;
  onDismiss?: () => void;
}) {
  return (
    <ErrorBanner
      severity="error"
      icon={CreditCard}
      title="Payment failed"
      description={message || "Please check your card details and try again"}
      action={onUpdatePayment ? {
        label: 'Update Payment Method',
        onClick: onUpdatePayment,
      } : undefined}
      dismissible={!!onDismiss}
      onDismiss={onDismiss}
    />
  );
}

// === INLINE WARNINGS ===

// 1. Validation Warning
export function ValidationWarning({ 
  message,
  onFix 
}: {
  message: string;
  onFix?: () => void;
}) {
  return (
    <InlineWarning
      icon={AlertCircle}
      message={message}
      action={onFix ? {
        label: 'Fix now',
        onClick: onFix,
      } : undefined}
    />
  );
}

// 2. Data Stale Warning
export function DataStaleWarning({ 
  lastUpdated,
  onRefresh 
}: {
  lastUpdated: string;
  onRefresh: () => void;
}) {
  return (
    <div className="rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-900 dark:text-amber-200 font-medium">
              This data may be outdated
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Last updated {lastUpdated}
            </p>
          </div>
        </div>
        
        <Button size="sm" variant="outline" onClick={onRefresh} className="gap-2 flex-shrink-0">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
    </div>
  );
}

// 3. Approaching Limit Warning
export function ApproachingLimitWarning({ 
  current,
  total,
  resourceName,
  onUpgrade 
}: {
  current: number;
  total: number;
  resourceName: string;
  onUpgrade?: () => void;
}) {
  const percentage = (current / total) * 100;
  const isAtLimit = percentage >= 100;
  const isNearLimit = percentage >= 90;

  return (
    <div className={`rounded-lg border p-4 ${
      isAtLimit 
        ? 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20'
        : 'border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20'
    }`}>
      <div className="space-y-4">
        <div className="flex items-start gap-2">
          <AlertCircle className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
            isAtLimit 
              ? 'text-red-600 dark:text-red-400'
              : 'text-amber-600 dark:text-amber-400'
          }`} />
          <div className="flex-1">
            <p className={`text-sm font-medium ${
              isAtLimit
                ? 'text-red-900 dark:text-red-200'
                : 'text-amber-900 dark:text-amber-200'
            }`}>
              {isAtLimit 
                ? `You've reached your ${resourceName} limit`
                : `You've used ${percentage.toFixed(0)}% of your ${resourceName}`
              }
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {current} of {total} used
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              isAtLimit
                ? 'bg-red-600'
                : isNearLimit
                ? 'bg-amber-600'
                : 'bg-primary'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        {onUpgrade && (
          <div className="flex justify-end">
            <button
              onClick={onUpgrade}
              className={`text-sm hover:underline ${
                isAtLimit
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              Upgrade plan →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// General API Error
export function APIError({ 
  message,
  onRetry,
  onDismiss 
}: {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}) {
  return (
    <ErrorBanner
      severity="error"
      icon={AlertTriangle}
      title="API Error"
      description={message}
      action={onRetry ? {
        label: 'Retry',
        onClick: onRetry,
      } : undefined}
      dismissible={!!onDismiss}
      onDismiss={onDismiss}
    />
  );
}

// Permission Error
export function PermissionError({ 
  resource,
  onRequestAccess 
}: {
  resource: string;
  onRequestAccess?: () => void;
}) {
  return (
    <ErrorCard
      severity="warning"
      icon={AlertCircle}
      title="Access denied"
      description={`You don't have permission to access ${resource}`}
      action={onRequestAccess ? {
        label: 'Request Access',
        onClick: onRequestAccess,
      } : undefined}
    />
  );
}

// Rate Limit Error
export function RateLimitError({ 
  resetTime,
  onDismiss 
}: {
  resetTime: string;
  onDismiss?: () => void;
}) {
  return (
    <ErrorBanner
      severity="warning"
      icon={Clock}
      title="Rate limit exceeded"
      description={`Please wait until ${resetTime} before trying again`}
      dismissible={!!onDismiss}
      onDismiss={onDismiss}
    />
  );
}
