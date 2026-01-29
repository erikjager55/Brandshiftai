import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  PageLoading,
  ContentGenerationLoading,
  ResearchProcessingLoading,
  CardSkeleton,
  TableSkeleton,
  ButtonStatesDemo,
  CardHoverDemo,
  ToggleSwitch,
  DropdownDemo,
  ModalDemo,
  NotificationToast,
  ProgressBarDemo,
  SaveIndicator,
} from '../loading/LoadingStates';
import { Play, Code } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

export function LoadingStatesLibrary() {
  const [showPageLoading, setShowPageLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toggleEnabled, setToggleEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Loading Overlay */}
      {showPageLoading && <PageLoading />}

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <NotificationToast
            message="Your changes have been saved successfully"
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Loading States & Micro-interactions</h1>
          <p className="text-sm text-muted-foreground">
            A comprehensive library of loading states and interactive components for Brandshift.ai
          </p>
        </div>

        {/* === LOADING STATES === */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Loading States</h2>
            <Badge className="rounded-full">5 variants</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Page Loading */}
            <div className="rounded-xl border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Page Loading</h3>
                  <p className="text-sm text-muted-foreground">
                    Full page spinner with logo pulse animation
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowPageLoading(true);
                    setTimeout(() => setShowPageLoading(false), 3000);
                  }}
                  className="gap-2"
                >
                  <Play className="h-4 w-4" />
                  Demo
                </Button>
              </div>
            </div>

            {/* 2. Content Generation Loading */}
            <div className="rounded-xl border overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold mb-2">Content Generation</h3>
                <p className="text-sm text-muted-foreground">
                  AI generation with cycling progress text
                </p>
              </div>
              <div className="bg-muted/30">
                <ContentGenerationLoading />
              </div>
            </div>

            {/* 3. Research Processing */}
            <div className="rounded-xl border overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold mb-2">Research Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Network animation with data points counter
                </p>
              </div>
              <div className="bg-muted/30">
                <ResearchProcessingLoading />
              </div>
            </div>

            {/* 4. Card Skeleton */}
            <div className="rounded-xl border overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold mb-2">Card Skeleton</h3>
                <p className="text-sm text-muted-foreground">
                  Animated gradient shimmer placeholder
                </p>
              </div>
              <div className="p-6 bg-muted/30">
                <CardSkeleton />
              </div>
            </div>

            {/* 5. Table Skeleton */}
            <div className="rounded-xl border overflow-hidden lg:col-span-2">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold mb-2">Table Skeleton</h3>
                <p className="text-sm text-muted-foreground">
                  Row placeholders with shimmer effect
                </p>
              </div>
              <div className="p-6 bg-muted/30">
                <TableSkeleton />
              </div>
            </div>
          </div>
        </section>

        {/* === MICRO-INTERACTIONS === */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Micro-interactions</h2>
            <Badge className="rounded-full">8 variants</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Button States */}
            <div className="rounded-xl border p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Button States</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Hover, active, loading, and success states
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <ButtonStatesDemo />
                <Button variant="outline" className="gap-2">
                  Hover me
                </Button>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                <p className="text-xs font-medium">Interactions:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Hover: translateY(-1px) + shadow</li>
                  <li>• Active: translateY(0) + shadow-sm</li>
                  <li>• Loading: Spinner + disabled</li>
                  <li>• Success: CheckCircle2 + green bg</li>
                </ul>
              </div>
            </div>

            {/* 2. Card Hover */}
            <div className="rounded-xl border p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Card Hover</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Shadow, border, and subtle scale effect
                </p>
              </div>
              <CardHoverDemo />
            </div>

            {/* 3. Toggle Switch */}
            <div className="rounded-xl border p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Toggle Switch</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Smooth slide with spring animation
                </p>
              </div>
              <div className="flex items-center gap-4">
                <ToggleSwitch enabled={toggleEnabled} onChange={setToggleEnabled} />
                <span className="text-sm text-muted-foreground">
                  {toggleEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs font-medium mb-2">Spring animation:</p>
                <code className="text-xs text-muted-foreground">
                  stiffness: 500, damping: 30
                </code>
              </div>
            </div>

            {/* 4. Dropdown */}
            <div className="rounded-xl border p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Dropdown Menu</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fade in + slide down with staggered items
                </p>
              </div>
              <DropdownDemo />
            </div>

            {/* 5. Modal */}
            <div className="rounded-xl border p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Modal</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Backdrop fade + modal scale animation
                </p>
              </div>
              <ModalDemo />
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs font-medium mb-2">Animation:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Backdrop: opacity 0 → 1</li>
                  <li>• Modal: scale 95% → 100%</li>
                  <li>• Duration: 300ms</li>
                </ul>
              </div>
            </div>

            {/* 6. Notification Toast */}
            <div className="rounded-xl border p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Notification Toast</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Slide in with auto-dismiss timer
                </p>
              </div>
              <Button onClick={() => setShowToast(true)}>Show Toast</Button>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs font-medium mb-2">Features:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Slide in from right</li>
                  <li>• Auto-dismiss progress bar</li>
                  <li>• Hover pauses timer</li>
                  <li>• Manual close button</li>
                </ul>
              </div>
            </div>

            {/* 7. Progress Bar */}
            <div className="rounded-xl border p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Progress Bar</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Animated fill with color transitions
                </p>
              </div>
              <ProgressBarDemo />
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs font-medium mb-2">Color thresholds:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 0-33%: Red</li>
                  <li>• 34-66%: Amber</li>
                  <li>• 67-100%: Green</li>
                </ul>
              </div>
            </div>

            {/* 8. Save Indicator */}
            <div className="rounded-xl border p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Save Indicator</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Loading → Success → Fade out
                </p>
              </div>
              <SaveIndicator />
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs font-medium mb-2">State flow:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Saving: Spinner icon</li>
                  <li>• Saved: CheckCircle2 (green)</li>
                  <li>• Auto-fade after 2s</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* === DESIGN SYSTEM COMPLIANCE === */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Design System Compliance</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Icons */}
            <div className="rounded-xl border p-6 space-y-4">
              <h3 className="text-lg font-semibold">Icons</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Standard size: <code className="text-xs bg-muted px-2 py-1 rounded">h-4 w-4</code></p>
                <p className="text-muted-foreground">Large: <code className="text-xs bg-muted px-2 py-1 rounded">h-6 w-6</code></p>
                <p className="text-muted-foreground">Extra large: <code className="text-xs bg-muted px-2 py-1 rounded">h-8 w-8</code></p>
              </div>
            </div>

            {/* Spacing */}
            <div className="rounded-xl border p-6 space-y-4">
              <h3 className="text-lg font-semibold">Spacing</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Cards: <code className="text-xs bg-muted px-2 py-1 rounded">p-6</code></p>
                <p className="text-muted-foreground">Compact: <code className="text-xs bg-muted px-2 py-1 rounded">p-4</code></p>
                <p className="text-muted-foreground">Grid: <code className="text-xs bg-muted px-2 py-1 rounded">gap-4 / gap-6</code></p>
              </div>
            </div>

            {/* Border Radius */}
            <div className="rounded-xl border p-6 space-y-4">
              <h3 className="text-lg font-semibold">Border Radius</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Cards: <code className="text-xs bg-muted px-2 py-1 rounded">rounded-xl</code></p>
                <p className="text-muted-foreground">Inputs: <code className="text-xs bg-muted px-2 py-1 rounded">rounded-lg</code></p>
                <p className="text-muted-foreground">Badges: <code className="text-xs bg-muted px-2 py-1 rounded">rounded-full</code></p>
              </div>
            </div>

            {/* Transitions */}
            <div className="rounded-xl border p-6 space-y-4">
              <h3 className="text-lg font-semibold">Transitions</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Standard: <code className="text-xs bg-muted px-2 py-1 rounded">duration-200</code></p>
                <p className="text-muted-foreground">Modal: <code className="text-xs bg-muted px-2 py-1 rounded">duration-300</code></p>
                <p className="text-muted-foreground">All: <code className="text-xs bg-muted px-2 py-1 rounded">transition-all</code></p>
              </div>
            </div>

            {/* Status Colors */}
            <div className="rounded-xl border p-6 space-y-4">
              <h3 className="text-lg font-semibold">Status Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-green-600" />
                  <span className="text-sm text-muted-foreground">Success</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-amber-600" />
                  <span className="text-sm text-muted-foreground">Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-red-600" />
                  <span className="text-sm text-muted-foreground">Error</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-blue-600" />
                  <span className="text-sm text-muted-foreground">Info</span>
                </div>
              </div>
            </div>

            {/* Dark Mode */}
            <div className="rounded-xl border p-6 space-y-4">
              <h3 className="text-lg font-semibold">Dark Mode</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">All colors have <code className="text-xs bg-muted px-2 py-1 rounded">dark:</code> variants</p>
                <p className="text-muted-foreground">Tested in both light and dark modes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Usage Examples</h2>

          <div className="rounded-xl border overflow-hidden">
            <div className="p-6 border-b bg-muted/50">
              <h3 className="text-lg font-semibold mb-2">Implementing Loading States</h3>
              <p className="text-sm text-muted-foreground">
                Import and use components directly in your application
              </p>
            </div>
            <div className="p-6 bg-card">
              <pre className="text-xs overflow-x-auto">
                <code className="text-muted-foreground">{`import { 
  ContentGenerationLoading, 
  NotificationToast,
  SaveIndicator 
} from './components/loading/LoadingStates';

// In your component
{isGenerating && <ContentGenerationLoading />}
{showToast && <NotificationToast message="Success!" />}
<SaveIndicator />`}</code>
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
