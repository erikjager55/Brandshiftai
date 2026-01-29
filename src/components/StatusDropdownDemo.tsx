/**
 * StatusDropdown Demo Page
 * Shows all StatusDropdown variants and research method headers
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { StatusDropdown, SimpleStatus, ExtendedStatus } from './research/StatusDropdown';
import { CanvasWorkshopHeader } from './canvases/CanvasWorkshopHeader';
import { InterviewsHeader } from './canvases/InterviewsHeader';
import { QuestionnaireHeader } from './canvases/QuestionnaireHeader';

export function StatusDropdownDemo() {
  // Simple variant states
  const [aiStatus, setAiStatus] = useState<SimpleStatus>('in_progress');
  const [questionnaireStatus, setQuestionnaireStatus] = useState<SimpleStatus>('draft');
  
  // Extended variant states
  const [workshopStatus, setWorkshopStatus] = useState<ExtendedStatus>('in_progress');
  const [interviewsStatus, setInterviewsStatus] = useState<ExtendedStatus>('scheduled');

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">StatusDropdown Components</h1>
        <p className="text-muted-foreground">
          Demonstration of all StatusDropdown variants and research method headers
        </p>
      </div>

      <Separator />

      {/* Standalone Dropdowns */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Standalone Dropdowns</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Simple Variant */}
          <Card>
            <CardHeader>
              <CardTitle>Simple Variant</CardTitle>
              <CardDescription>
                3 statuses: Draft, In Progress, Completed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <StatusDropdown
                variant="simple"
                currentStatus={aiStatus}
                onChange={(status) => setAiStatus(status as SimpleStatus)}
              />
              <div className="text-sm text-muted-foreground">
                Current status: <span className="font-medium">{aiStatus}</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>✓ Used for: AI Exploration, Questionnaires</div>
                <div>✓ Simple workflows without scheduling</div>
              </div>
            </CardContent>
          </Card>

          {/* Extended Variant */}
          <Card>
            <CardHeader>
              <CardTitle>Extended Variant</CardTitle>
              <CardDescription>
                5 statuses: Draft, Scheduled, In Progress, In Review, Completed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <StatusDropdown
                variant="extended"
                currentStatus={interviewsStatus}
                onChange={(status) => setInterviewsStatus(status as ExtendedStatus)}
              />
              <div className="text-sm text-muted-foreground">
                Current status: <span className="font-medium">{interviewsStatus}</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>✓ Used for: Interviews, Workshops</div>
                <div>✓ Complex workflows with scheduling & review</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Full Headers */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Research Method Headers</h2>
        <p className="text-sm text-muted-foreground">
          Complete header components with integrated StatusDropdown
        </p>

        <div className="space-y-6">
          {/* Canvas Workshop Header */}
          <div>
            <p className="text-sm font-medium mb-3 text-muted-foreground">Canvas Workshop (Extended)</p>
            <CanvasWorkshopHeader
              researchStatus={workshopStatus}
              onStatusChange={setWorkshopStatus}
            />
          </div>

          {/* Interviews Header */}
          <div>
            <p className="text-sm font-medium mb-3 text-muted-foreground">1-on-1 Interviews (Extended)</p>
            <InterviewsHeader
              researchStatus={interviewsStatus}
              onStatusChange={setInterviewsStatus}
            />
          </div>

          {/* Questionnaire Header */}
          <div>
            <p className="text-sm font-medium mb-3 text-muted-foreground">Questionnaire (Simple)</p>
            <QuestionnaireHeader
              researchStatus={questionnaireStatus}
              onStatusChange={setQuestionnaireStatus}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Features List */}
      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>Built-in functionality for all StatusDropdown components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="text-green-600">✓</div>
                <div>
                  <div className="font-medium">Keyboard Navigation</div>
                  <div className="text-muted-foreground text-xs">ESC, Arrow keys, Enter, Tab</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-600">✓</div>
                <div>
                  <div className="font-medium">Click Outside to Close</div>
                  <div className="text-muted-foreground text-xs">Automatic dropdown dismissal</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-600">✓</div>
                <div>
                  <div className="font-medium">Status Change Toasts</div>
                  <div className="text-muted-foreground text-xs">User feedback on every change</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-600">✓</div>
                <div>
                  <div className="font-medium">Disabled States</div>
                  <div className="text-muted-foreground text-xs">Prevent invalid transitions</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="text-green-600">✓</div>
                <div>
                  <div className="font-medium">Dark Mode Support</div>
                  <div className="text-muted-foreground text-xs">All colors have dark variants</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-600">✓</div>
                <div>
                  <div className="font-medium">Animated Transitions</div>
                  <div className="text-muted-foreground text-xs">Smooth fade-in and zoom effects</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-600">✓</div>
                <div>
                  <div className="font-medium">Design System Compliant</div>
                  <div className="text-muted-foreground text-xs">Consistent spacing, colors, typography</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-600">✓</div>
                <div>
                  <div className="font-medium">Active Status Indicator</div>
                  <div className="text-muted-foreground text-xs">Checkmark on selected status</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Status Colors</CardTitle>
          <CardDescription>Consistent color scheme across all statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <div className="text-gray-600 dark:text-gray-400 font-medium">Draft</div>
              </div>
              <div className="text-xs text-center text-muted-foreground">gray-500/400</div>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <div className="text-blue-600 dark:text-blue-400 font-medium">Scheduled</div>
              </div>
              <div className="text-xs text-center text-muted-foreground">blue-600/400</div>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <div className="text-blue-600 dark:text-blue-400 font-medium">In Progress</div>
              </div>
              <div className="text-xs text-center text-muted-foreground">blue-600/400</div>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <div className="text-amber-600 dark:text-amber-400 font-medium">In Review</div>
              </div>
              <div className="text-xs text-center text-muted-foreground">amber-600/400</div>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <div className="text-green-600 dark:text-green-400 font-medium">Completed</div>
              </div>
              <div className="text-xs text-center text-muted-foreground">green-600/400</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
