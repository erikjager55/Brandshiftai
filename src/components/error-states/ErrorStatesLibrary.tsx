import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  NotFoundError,
  ServerError,
  NoConnectionError,
  SessionExpiredError,
  FormSubmissionError,
  AIGenerationError,
  ResearchProcessingError,
  UploadError,
  PaymentError,
  ValidationWarning,
  DataStaleWarning,
  ApproachingLimitWarning,
  APIError,
  PermissionError,
  RateLimitError,
} from './SpecificErrorStates';
import { FieldError } from './ErrorState';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ErrorStatesLibrary() {
  const [selectedTab, setSelectedTab] = useState('page-level');
  const [showFormError, setShowFormError] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showBannerError, setShowBannerError] = useState(true);

  const handleAction = (action: string) => {
    console.log('Action triggered:', action);
  };

  const handleEmailChange = (value: string) => {
    if (!value) {
      setEmailError('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Error States</h1>
          <p className="text-sm text-muted-foreground">
            A comprehensive collection of error handling patterns for Brandshift.ai
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <Badge className="rounded-full">15+ error states</Badge>
          <Badge variant="outline" className="rounded-full">4 page-level</Badge>
          <Badge variant="outline" className="rounded-full">6 component-level</Badge>
          <Badge variant="outline" className="rounded-full">3 inline warnings</Badge>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="page-level">Page-Level Errors</TabsTrigger>
            <TabsTrigger value="component-level">Component Errors</TabsTrigger>
            <TabsTrigger value="warnings">Inline Warnings</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>

          {/* Page-Level Errors */}
          <TabsContent value="page-level" className="space-y-6 mt-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Page-Level Errors</h2>
              <p className="text-sm text-muted-foreground">
                Full-page error states for critical failures
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 404 Not Found */}
              <div className="rounded-xl border overflow-hidden">
                <div className="p-4 border-b bg-muted/30">
                  <h3 className="text-lg font-semibold">404 Not Found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Page doesn't exist or has been moved
                  </p>
                </div>
                <div className="bg-card min-h-[400px] flex items-center">
                  <NotFoundError
                    onGoToDashboard={() => handleAction('go-to-dashboard')}
                    onGoBack={() => handleAction('go-back')}
                  />
                </div>
              </div>

              {/* 500 Server Error */}
              <div className="rounded-xl border overflow-hidden">
                <div className="p-4 border-b bg-muted/30">
                  <h3 className="text-lg font-semibold">500 Server Error</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Unexpected server error with error ID
                  </p>
                </div>
                <div className="bg-card min-h-[400px] flex items-center">
                  <ServerError
                    onTryAgain={() => handleAction('try-again')}
                    onContactSupport={() => handleAction('contact-support')}
                    errorId="ERR-ABC123"
                  />
                </div>
              </div>

              {/* No Connection */}
              <div className="rounded-xl border overflow-hidden">
                <div className="p-4 border-b bg-muted/30">
                  <h3 className="text-lg font-semibold">No Connection</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Network connectivity issue
                  </p>
                </div>
                <div className="bg-card min-h-[400px] flex items-center">
                  <NoConnectionError
                    onRetry={() => handleAction('retry')}
                  />
                </div>
              </div>

              {/* Session Expired */}
              <div className="rounded-xl border overflow-hidden">
                <div className="p-4 border-b bg-muted/30">
                  <h3 className="text-lg font-semibold">Session Expired</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    User needs to sign in again
                  </p>
                </div>
                <div className="bg-card min-h-[400px] flex items-center">
                  <SessionExpiredError
                    onSignIn={() => handleAction('sign-in')}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Component-Level Errors */}
          <TabsContent value="component-level" className="space-y-6 mt-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Component-Level Errors</h2>
              <p className="text-sm text-muted-foreground">
                Errors within specific components and features
              </p>
            </div>

            <div className="space-y-6">
              {/* Form Field Error */}
              <div className="rounded-xl border p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Form Field Error</h3>
                  <p className="text-sm text-muted-foreground">
                    Inline validation errors on form fields
                  </p>
                </div>

                <div className="max-w-md space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email address
                    </label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      onChange={(e) => handleEmailChange(e.target.value)}
                      className={cn(
                        emailError && 'border-red-500 dark:border-red-500'
                      )}
                    />
                    {emailError && <FieldError message={emailError} />}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Password (always shows error)
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="border-red-500 dark:border-red-500"
                    />
                    <FieldError message="Password must be at least 8 characters" />
                  </div>
                </div>
              </div>

              {/* Form Submission Error */}
              <div className="rounded-xl border p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Form Submission Error</h3>
                  <p className="text-sm text-muted-foreground">
                    Banner shown after failed form submission
                  </p>
                </div>

                {showBannerError && (
                  <FormSubmissionError
                    message="Network error. Please check your connection and try again."
                    onTryAgain={() => handleAction('try-again')}
                    onDismiss={() => setShowBannerError(false)}
                  />
                )}

                {!showBannerError && (
                  <Button onClick={() => setShowBannerError(true)}>
                    Show Error Banner
                  </Button>
                )}
              </div>

              {/* AI Generation Error */}
              <div className="rounded-xl border p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">AI Generation Error</h3>
                  <p className="text-sm text-muted-foreground">
                    Shown when AI content generation fails
                  </p>
                </div>

                <div className="max-w-md">
                  <AIGenerationError
                    onRetry={() => handleAction('retry-generation')}
                  />
                </div>
              </div>

              {/* Research Processing Error */}
              <div className="rounded-xl border p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Research Processing Error</h3>
                  <p className="text-sm text-muted-foreground">
                    Warning when research processing has issues
                  </p>
                </div>

                <ResearchProcessingError
                  details="Method 'Survey Analysis' failed: Insufficient response data (min: 50, received: 23)"
                  onContactSupport={() => handleAction('contact-support')}
                />
              </div>

              {/* Upload Error */}
              <div className="rounded-xl border p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Upload Error</h3>
                  <p className="text-sm text-muted-foreground">
                    File upload failure with error message
                  </p>
                </div>

                <div className="max-w-md space-y-4">
                  <UploadError
                    fileName="brand-guidelines.pdf"
                    errorMessage="File too large (max 10MB)"
                    onTryAgain={() => handleAction('retry-upload')}
                    onRemove={() => handleAction('remove-file')}
                  />

                  <UploadError
                    fileName="logo-design.ai"
                    errorMessage="Unsupported file format"
                    onRemove={() => handleAction('remove-file')}
                  />
                </div>
              </div>

              {/* Payment Error */}
              <div className="rounded-xl border p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Payment Error</h3>
                  <p className="text-sm text-muted-foreground">
                    Payment processing failure
                  </p>
                </div>

                <PaymentError
                  message="Your card was declined. Please check your card details and try again."
                  onUpdatePayment={() => handleAction('update-payment')}
                  onDismiss={() => handleAction('dismiss')}
                />
              </div>

              {/* API Error */}
              <div className="rounded-xl border p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">API Error</h3>
                  <p className="text-sm text-muted-foreground">
                    General API failure
                  </p>
                </div>

                <APIError
                  message="Failed to fetch brand assets. The server may be temporarily unavailable."
                  onRetry={() => handleAction('retry')}
                  onDismiss={() => handleAction('dismiss')}
                />
              </div>

              {/* Permission Error */}
              <div className="rounded-xl border p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Permission Error</h3>
                  <p className="text-sm text-muted-foreground">
                    Access denied to resource
                  </p>
                </div>

                <div className="max-w-md">
                  <PermissionError
                    resource="Team Settings"
                    onRequestAccess={() => handleAction('request-access')}
                  />
                </div>
              </div>

              {/* Rate Limit Error */}
              <div className="rounded-xl border p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Rate Limit Error</h3>
                  <p className="text-sm text-muted-foreground">
                    API rate limit exceeded
                  </p>
                </div>

                <RateLimitError
                  resetTime="2:30 PM"
                  onDismiss={() => handleAction('dismiss')}
                />
              </div>
            </div>
          </TabsContent>

          {/* Inline Warnings */}
          <TabsContent value="warnings" className="space-y-6 mt-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Inline Warnings</h2>
              <p className="text-sm text-muted-foreground">
                Less severe warnings and notifications
              </p>
            </div>

            <div className="space-y-6">
              {/* Validation Warning */}
              <div className="rounded-xl border p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Validation Warning</h3>
                  <p className="text-sm text-muted-foreground">
                    Non-critical validation issues
                  </p>
                </div>

                <div className="max-w-md space-y-4">
                  <ValidationWarning
                    message="Your brand profile is incomplete. Add a logo and color palette for better results."
                    onFix={() => handleAction('fix-validation')}
                  />

                  <ValidationWarning
                    message="Some research methods don't have enough data for accurate insights."
                  />
                </div>
              </div>

              {/* Data Stale Warning */}
              <div className="rounded-xl border p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Data Stale Warning</h3>
                  <p className="text-sm text-muted-foreground">
                    Outdated data notification
                  </p>
                </div>

                <div className="max-w-md">
                  <DataStaleWarning
                    lastUpdated="30 days ago"
                    onRefresh={() => handleAction('refresh-data')}
                  />
                </div>
              </div>

              {/* Approaching Limit Warning */}
              <div className="rounded-xl border p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Approaching Limit Warning</h3>
                  <p className="text-sm text-muted-foreground">
                    Usage approaching or at limit
                  </p>
                </div>

                <div className="max-w-md space-y-4">
                  <ApproachingLimitWarning
                    current={90}
                    total={100}
                    resourceName="AI generations"
                    onUpgrade={() => handleAction('upgrade')}
                  />

                  <ApproachingLimitWarning
                    current={100}
                    total={100}
                    resourceName="team members"
                    onUpgrade={() => handleAction('upgrade')}
                  />

                  <ApproachingLimitWarning
                    current={45}
                    total={50}
                    resourceName="research plans"
                    onUpgrade={() => handleAction('upgrade')}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Guidelines */}
          <TabsContent value="guidelines" className="space-y-6 mt-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Error Handling Guidelines</h2>
              <p className="text-sm text-muted-foreground">
                Best practices for implementing error states
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Error Severity */}
              <div className="rounded-xl border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Error Severity Levels</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-600" />
                      <span className="text-sm font-medium">Error (Critical)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Prevents user from completing their task. Requires immediate action.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Examples: Server error, payment failed, upload failed
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-600" />
                      <span className="text-sm font-medium">Warning</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      May impact user experience but not blocking. Should be addressed.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Examples: Validation issues, stale data, approaching limits
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-600" />
                      <span className="text-sm font-medium">Info</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Informational message that doesn't require immediate action.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Examples: Session expired, maintenance notice
                    </p>
                  </div>
                </div>
              </div>

              {/* Color System */}
              <div className="rounded-xl border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Color System</h3>
                <div className="space-y-3 text-sm">
                  <div className="space-y-1">
                    <p className="font-medium">Error (Red)</p>
                    <p className="text-muted-foreground">
                      Border: <code className="bg-muted px-2 py-1 rounded text-xs">border-red-200 dark:border-red-900</code>
                    </p>
                    <p className="text-muted-foreground">
                      Background: <code className="bg-muted px-2 py-1 rounded text-xs">bg-red-50 dark:bg-red-900/20</code>
                    </p>
                    <p className="text-muted-foreground">
                      Icon: <code className="bg-muted px-2 py-1 rounded text-xs">text-red-600 dark:text-red-400</code>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium">Warning (Amber)</p>
                    <p className="text-muted-foreground">
                      Border: <code className="bg-muted px-2 py-1 rounded text-xs">border-amber-200 dark:border-amber-900</code>
                    </p>
                    <p className="text-muted-foreground">
                      Background: <code className="bg-muted px-2 py-1 rounded text-xs">bg-amber-50 dark:bg-amber-900/20</code>
                    </p>
                    <p className="text-muted-foreground">
                      Icon: <code className="bg-muted px-2 py-1 rounded text-xs">text-amber-600 dark:text-amber-400</code>
                    </p>
                  </div>
                </div>
              </div>

              {/* Structure */}
              <div className="rounded-xl border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Error Structure</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Clear Error Message</p>
                      <p className="text-muted-foreground">What went wrong?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Context</p>
                      <p className="text-muted-foreground">Why did it happen?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Action</p>
                      <p className="text-muted-foreground">How can they fix it?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary">4</span>
                    </div>
                    <div>
                      <p className="font-medium">Error ID (optional)</p>
                      <p className="text-muted-foreground">For support reference</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Copy Guidelines */}
              <div className="rounded-xl border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Error Copy Guidelines</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium mb-1">Do's</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>✓ Be specific about what went wrong</li>
                      <li>✓ Provide clear next steps</li>
                      <li>✓ Use friendly, helpful tone</li>
                      <li>✓ Offer support options</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Don'ts</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>✗ Use technical jargon</li>
                      <li>✗ Blame the user</li>
                      <li>✗ Leave users stuck</li>
                      <li>✗ Show raw error codes</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Animation */}
              <div className="rounded-xl border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Animations</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">Errors should appear smoothly</p>
                  <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`// Page-level errors
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}

// Banners & inline
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.2 }}`}
                  </pre>
                </div>
              </div>

              {/* Accessibility */}
              <div className="rounded-xl border p-6 space-y-4">
                <h3 className="text-lg font-semibold">Accessibility</h3>
                <div className="space-y-2 text-sm">
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Use ARIA live regions for dynamic errors</li>
                    <li>• Ensure sufficient color contrast</li>
                    <li>• Don't rely on color alone</li>
                    <li>• Make action buttons keyboard accessible</li>
                    <li>• Provide alternative text for icons</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Usage Example */}
            <div className="rounded-xl border overflow-hidden">
              <div className="p-6 border-b bg-muted/30">
                <h3 className="text-lg font-semibold">Usage Example</h3>
              </div>
              <div className="p-6 bg-card">
                <pre className="text-xs overflow-x-auto">
                  <code className="text-muted-foreground">{`import { 
  FormSubmissionError,
  ValidationWarning,
  FieldError 
} from './components/error-states';

// Form submission error
{submitError && (
  <FormSubmissionError
    message={submitError}
    onTryAgain={handleRetry}
    onDismiss={() => setSubmitError(null)}
  />
)}

// Field validation
<Input
  value={email}
  onChange={(e) => validateEmail(e.target.value)}
  className={emailError && 'border-red-500'}
/>
{emailError && <FieldError message={emailError} />}

// Warning banner
{incompleteProfile && (
  <ValidationWarning
    message="Complete your profile for better AI results"
    onFix={() => navigate('/settings')}
  />
)}`}</code>
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
