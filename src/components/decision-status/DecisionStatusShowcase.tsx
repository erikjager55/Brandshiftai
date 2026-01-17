import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DecisionStatusBadge } from './DecisionStatusBadge';
import { DecisionStatusPanel } from './DecisionStatusPanel';
import { DecisionWarningModal } from './DecisionWarningModal';
import { Button } from '../ui/button';
import { DecisionStatusInfo } from '../../types/decision-status';

/**
 * DecisionStatusShowcase
 * 
 * Visual demonstration of all Decision Quality Layer components.
 * Use this as a reference for styling and behavior.
 * 
 * Can be accessed via: /decision-status-showcase (add route if needed)
 */
export function DecisionStatusShowcase() {
  const [showSafeWarning, setShowSafeWarning] = useState(false);
  const [showRiskWarning, setShowRiskWarning] = useState(false);
  const [showBlockedWarning, setShowBlockedWarning] = useState(false);

  // Example status info objects
  const safeStatus: DecisionStatusInfo = {
    status: 'safe-to-decide',
    coverage: 85,
    completedMethods: ['workshop', 'interviews', 'questionnaire'],
    topMethodsCompleted: true,
    missingTopMethods: [],
    recommendation: 'You have sufficient validated research to make confident strategic decisions.',
    risk: 'Minimal risk - your decisions are backed by comprehensive research.',
    nextSteps: [
      'Proceed with confidence to strategy tools',
      'Consider additional validation if needed',
      'Document key insights before strategizing'
    ]
  };

  const riskStatus: DecisionStatusInfo = {
    status: 'decision-at-risk',
    coverage: 65,
    completedMethods: ['questionnaire', 'ai-exploration'],
    topMethodsCompleted: false,
    missingTopMethods: ['workshop', 'interviews'],
    recommendation: 'Complete the highest-ranked research methods (workshop, interviews) for better decision quality.',
    risk: 'Moderate risk - missing critical strategic research methods.',
    nextSteps: [
      'Complete Workshop and 1-on-1 Interviews',
      'Reach 80% coverage for safe decision-making',
      'Consider the strategic importance of missing methods'
    ]
  };

  const blockedStatus: DecisionStatusInfo = {
    status: 'blocked',
    coverage: 25,
    completedMethods: ['ai-exploration'],
    topMethodsCompleted: false,
    missingTopMethods: ['workshop', 'interviews', 'questionnaire'],
    recommendation: 'Critical: Complete core research before making strategic decisions.',
    risk: 'High risk - decisions would be speculative without proper validation.',
    nextSteps: [
      'Start with Workshop and 1-on-1 Interviews (highest strategic value)',
      'Reach minimum 50% research coverage',
      'Validate core assumptions before proceeding'
    ]
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Decision Quality Layer Showcase</h1>
        <p className="text-muted-foreground">
          Visual reference for all Decision Quality components and their states
        </p>
      </div>

      <Tabs defaultValue="badges">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="panels">Panels</TabsTrigger>
          <TabsTrigger value="modals">Warning Modals</TabsTrigger>
        </TabsList>

        {/* BADGES TAB */}
        <TabsContent value="badges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Decision Status Badges</CardTitle>
              <CardDescription>
                Compact indicators for cards, lists, and navigation. Available in 3 sizes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Safe to Decide */}
              <div>
                <h3 className="font-semibold mb-3">✅ Safe to Decide</h3>
                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Small</p>
                    <DecisionStatusBadge status="safe-to-decide" size="sm" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Medium</p>
                    <DecisionStatusBadge status="safe-to-decide" size="md" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Large</p>
                    <DecisionStatusBadge status="safe-to-decide" size="lg" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Without Icon</p>
                    <DecisionStatusBadge status="safe-to-decide" size="md" showIcon={false} />
                  </div>
                </div>
              </div>

              {/* Decision at Risk */}
              <div>
                <h3 className="font-semibold mb-3">⚠️ Decision at Risk</h3>
                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Small</p>
                    <DecisionStatusBadge status="decision-at-risk" size="sm" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Medium</p>
                    <DecisionStatusBadge status="decision-at-risk" size="md" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Large</p>
                    <DecisionStatusBadge status="decision-at-risk" size="lg" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Without Icon</p>
                    <DecisionStatusBadge status="decision-at-risk" size="md" showIcon={false} />
                  </div>
                </div>
              </div>

              {/* Blocked */}
              <div>
                <h3 className="font-semibold mb-3">✕ Blocked</h3>
                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Small</p>
                    <DecisionStatusBadge status="blocked" size="sm" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Medium</p>
                    <DecisionStatusBadge status="blocked" size="md" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Large</p>
                    <DecisionStatusBadge status="blocked" size="lg" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Without Icon</p>
                    <DecisionStatusBadge status="blocked" size="md" showIcon={false} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Example in Context */}
          <Card>
            <CardHeader>
              <CardTitle>Example: Asset Card with Badge</CardTitle>
              <CardDescription>
                How badges appear on actual asset cards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Safe Card */}
                <Card className="border-2">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Brand Purpose</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your core reason for existing beyond profit
                    </p>
                    <DecisionStatusBadge status="safe-to-decide" size="sm" />
                  </CardContent>
                </Card>

                {/* Risk Card */}
                <Card className="border-2">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Core Values</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Fundamental beliefs that guide behavior
                    </p>
                    <DecisionStatusBadge status="decision-at-risk" size="sm" />
                  </CardContent>
                </Card>

                {/* Blocked Card */}
                <Card className="border-2">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Positioning</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your unique place in the market
                    </p>
                    <DecisionStatusBadge status="blocked" size="sm" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PANELS TAB */}
        <TabsContent value="panels" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Safe Panel */}
            <div>
              <h3 className="font-semibold mb-3">✅ Safe to Decide - Full Panel</h3>
              <DecisionStatusPanel 
                statusInfo={safeStatus}
                compact={false}
              />
            </div>

            {/* Risk Panel */}
            <div>
              <h3 className="font-semibold mb-3">⚠️ Decision at Risk - Full Panel</h3>
              <DecisionStatusPanel 
                statusInfo={riskStatus}
                onStartResearch={() => alert('Starting research...')}
                compact={false}
              />
            </div>

            {/* Blocked Panel */}
            <div>
              <h3 className="font-semibold mb-3">✕ Blocked - Full Panel</h3>
              <DecisionStatusPanel 
                statusInfo={blockedStatus}
                onStartResearch={() => alert('Starting research...')}
                compact={false}
              />
            </div>

            {/* Compact Variants */}
            <div>
              <h3 className="font-semibold mb-3">Compact Panels</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DecisionStatusPanel statusInfo={safeStatus} compact={true} />
                <DecisionStatusPanel statusInfo={riskStatus} compact={true} />
                <DecisionStatusPanel statusInfo={blockedStatus} compact={true} />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* MODALS TAB */}
        <TabsContent value="modals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Warning Modal Triggers</CardTitle>
              <CardDescription>
                Click each button to see how warnings appear when users attempt risky actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => setShowSafeWarning(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Trigger Safe Warning
                  <br />
                  <span className="text-xs opacity-80">(No warning shown)</span>
                </Button>
                
                <Button 
                  onClick={() => setShowRiskWarning(true)}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  Trigger Risk Warning
                  <br />
                  <span className="text-xs opacity-80">(Proceed with caution)</span>
                </Button>
                
                <Button 
                  onClick={() => setShowBlockedWarning(true)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Trigger Blocked Warning
                  <br />
                  <span className="text-xs opacity-80">(Action prevented)</span>
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> In actual usage, "Safe to Decide" wouldn't show a warning modal. 
                  Users would proceed directly to their action. The modal only appears for "Decision at Risk" 
                  and "Blocked" statuses.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Warning Modals */}
      <DecisionWarningModal
        isOpen={showSafeWarning}
        onClose={() => setShowSafeWarning(false)}
        onProceed={() => {
          setShowSafeWarning(false);
          alert('Proceeding with safe action!');
        }}
        statusInfo={safeStatus}
        actionName="generate campaign for"
        itemName="Brand Purpose"
      />

      <DecisionWarningModal
        isOpen={showRiskWarning}
        onClose={() => setShowRiskWarning(false)}
        onProceed={() => {
          setShowRiskWarning(false);
          alert('User chose to proceed despite risks');
        }}
        statusInfo={riskStatus}
        actionName="generate campaign for"
        itemName="Core Values"
      />

      <DecisionWarningModal
        isOpen={showBlockedWarning}
        onClose={() => setShowBlockedWarning(false)}
        onProceed={() => {
          setShowBlockedWarning(false);
        }}
        statusInfo={blockedStatus}
        actionName="generate campaign for"
        itemName="Positioning"
      />
    </div>
  );
}
