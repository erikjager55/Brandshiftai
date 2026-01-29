import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { 
  StatusBadge, 
  SuccessBadge, 
  WarningBadge, 
  ErrorBadge, 
  InfoBadge, 
  NeutralBadge,
  LockedBadge 
} from './StatusBadge';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Info, 
  Archive,
  Lock,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

/**
 * StatusBadge Showcase Component
 * 
 * Demonstreert alle 6 badge varianten met voorbeelden
 */
export function StatusBadgeShowcase() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-semibold mb-2">StatusBadge System</h1>
        <p className="text-muted-foreground">
          6 semantische varianten voor consistente status communicatie
        </p>
      </div>

      {/* VARIANT 1: SUCCESS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Success - Positief Afgerond
          </CardTitle>
          <CardDescription>
            Gebruik voor: Completed, Ready, Active, Validated, Approved
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <SuccessBadge>Completed</SuccessBadge>
            <SuccessBadge icon={CheckCircle2}>Ready</SuccessBadge>
            <StatusBadge variant="success">Active</StatusBadge>
            <StatusBadge variant="success" icon={CheckCircle2}>Validated</StatusBadge>
            <SuccessBadge icon={Sparkles}>Approved</SuccessBadge>
          </div>
        </CardContent>
      </Card>

      {/* VARIANT 2: WARNING */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            Warning - Actie Nodig
          </CardTitle>
          <CardDescription>
            Gebruik voor: Pending, In Progress, Needs Attention, Draft
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <WarningBadge>Pending</WarningBadge>
            <WarningBadge icon={Clock}>In Progress</WarningBadge>
            <StatusBadge variant="warning" icon={AlertTriangle}>Needs Attention</StatusBadge>
            <StatusBadge variant="warning">Draft</StatusBadge>
            <WarningBadge icon={Clock}>Review Required</WarningBadge>
          </div>
        </CardContent>
      </Card>

      {/* VARIANT 3: ERROR */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <XCircle className="h-5 w-5 text-red-600" />
            Error - Probleem/Geblokkeerd
          </CardTitle>
          <CardDescription>
            Gebruik voor: Failed, Error, Blocked, Rejected, Overdue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <ErrorBadge>Failed</ErrorBadge>
            <ErrorBadge icon={XCircle}>Error</ErrorBadge>
            <StatusBadge variant="error" icon={XCircle}>Blocked</StatusBadge>
            <StatusBadge variant="error">Rejected</StatusBadge>
            <ErrorBadge icon={AlertTriangle}>Overdue</ErrorBadge>
          </div>
        </CardContent>
      </Card>

      {/* VARIANT 4: INFO */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Info className="h-5 w-5 text-blue-600" />
            Info - Informatief/Nieuw
          </CardTitle>
          <CardDescription>
            Gebruik voor: New, Processing, Info, Beta, Updated
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <InfoBadge>New</InfoBadge>
            <InfoBadge icon={Clock}>Processing</InfoBadge>
            <StatusBadge variant="info" icon={Info}>Info</StatusBadge>
            <StatusBadge variant="info" icon={Sparkles}>Beta</StatusBadge>
            <InfoBadge>Updated</InfoBadge>
          </div>
        </CardContent>
      </Card>

      {/* VARIANT 5: NEUTRAL */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Archive className="h-5 w-5 text-gray-600" />
            Neutral - Inactief/Default
          </CardTitle>
          <CardDescription>
            Gebruik voor: Inactive, Disabled, Archived, None
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <NeutralBadge>Inactive</NeutralBadge>
            <NeutralBadge>Disabled</NeutralBadge>
            <StatusBadge variant="neutral" icon={Archive}>Archived</StatusBadge>
            <StatusBadge variant="neutral">None</StatusBadge>
            <NeutralBadge>Default</NeutralBadge>
          </div>
        </CardContent>
      </Card>

      {/* VARIANT 6: LOCKED */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-amber-600" />
            Locked - Premium/Vergrendeld
          </CardTitle>
          <CardDescription>
            Gebruik voor: Premium, Pro, Locked, Upgrade Required (vaak met Lock icon)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <LockedBadge icon={Lock}>Premium</LockedBadge>
            <LockedBadge icon={Lock}>Pro</LockedBadge>
            <StatusBadge variant="locked" icon={Lock}>Locked</StatusBadge>
            <StatusBadge variant="locked" icon={Lock}>Upgrade Required</StatusBadge>
            <LockedBadge icon={Sparkles}>Premium Feature</LockedBadge>
          </div>
        </CardContent>
      </Card>

      {/* USAGE EXAMPLES */}
      <Card>
        <CardHeader>
          <CardTitle>Praktijkvoorbeelden</CardTitle>
          <CardDescription>
            Hoe badges in context gebruikt worden
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Research Method Status */}
          <div>
            <h4 className="text-sm font-medium mb-3">Research Method Status</h4>
            <div className="flex flex-wrap gap-2">
              <SuccessBadge icon={CheckCircle2}>Completed</SuccessBadge>
              <WarningBadge icon={Clock}>In Progress</WarningBadge>
              <InfoBadge>Not Started</InfoBadge>
            </div>
          </div>

          {/* Brand Asset Status */}
          <div>
            <h4 className="text-sm font-medium mb-3">Brand Asset Status</h4>
            <div className="flex flex-wrap gap-2">
              <SuccessBadge icon={CheckCircle2}>Ready</SuccessBadge>
              <WarningBadge icon={AlertTriangle}>Needs Work</WarningBadge>
              <ErrorBadge icon={XCircle}>Blocked</ErrorBadge>
            </div>
          </div>

          {/* Premium Features */}
          <div>
            <h4 className="text-sm font-medium mb-3">Premium Features</h4>
            <div className="flex flex-wrap gap-2">
              <LockedBadge icon={Lock}>Premium</LockedBadge>
              <SuccessBadge icon={CheckCircle2}>Unlocked</SuccessBadge>
              <NeutralBadge>Free</NeutralBadge>
            </div>
          </div>

          {/* Payment Status */}
          <div>
            <h4 className="text-sm font-medium mb-3">Payment Status</h4>
            <div className="flex flex-wrap gap-2">
              <SuccessBadge icon={CheckCircle2}>Paid</SuccessBadge>
              <WarningBadge icon={Clock}>Pending</WarningBadge>
              <ErrorBadge icon={XCircle}>Failed</ErrorBadge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DESIGN PRINCIPLES */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle>Design Principes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
            <div>
              <strong>NOOIT klikbaar</strong> - Badges tonen alleen status, geen acties
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
            <div>
              <strong>Consistente styling</strong> - rounded-full, text-xs, font-medium, px-2.5 py-0.5
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
            <div>
              <strong>Semantische betekenis</strong> - Elke variant heeft duidelijke use cases
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
            <div>
              <strong>Optionele icons</strong> - Icons zijn h-3 w-3 voor perfecte balans
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
            <div>
              <strong>Dark mode support</strong> - Alle varianten werken in light en dark mode
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
            <div>
              <strong>Maximaal 6 varianten</strong> - Voorkomt variant proliferatie
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
