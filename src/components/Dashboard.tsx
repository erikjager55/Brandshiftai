import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  ArrowRight,
  Target,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Clock,
  Plus,
  Users,
  Lightbulb,
  Rocket,
  FileText
} from 'lucide-react';
import { WelcomeModal, useShouldShowWelcome } from './WelcomeModal';
import { QuickStartChecklist, useShouldShowChecklist } from './QuickStartChecklist';
import { FirstValueMoment } from './onboarding/FirstValueMoment';
import { DecisionStatusBadge } from './decision-status/DecisionStatusBadge';
import { calculateDecisionStatus } from '../utils/decision-status-calculator';
import { 
  calculateSimpleDashboardStatus,
  generateTopStrategicRisks,
  generateNextBestAction,
  transformToDecisionCockpit 
} from '../utils/dashboard-decision-transformer';
import { mockBrandAssets } from '../data/mock-brand-assets';
import { mockPersonas } from '../data/mock-personas';
import { DecisionImpactPanel } from './impact/DecisionImpactPanel';
import { cn } from '../lib/utils';

interface DashboardProps {
  onStartResearch?: () => void;
  onNavigateToRelationships?: () => void;
  onNavigate?: (url: string) => void;
}

export function Dashboard({ onStartResearch, onNavigateToRelationships, onNavigate }: DashboardProps) {
  const [showWelcome, setShowWelcome] = React.useState(false);
  const [showFirstValueMoment, setShowFirstValueMoment] = React.useState(false);
  const [showChecklist, setShowChecklist] = React.useState(false);
  const shouldShowWelcome = useShouldShowWelcome();
  const shouldShowChecklist = useShouldShowChecklist();

  React.useEffect(() => {
    setShowWelcome(shouldShowWelcome);
    
    // Check if user just completed onboarding
    const justCompletedOnboarding = sessionStorage.getItem('onboarding-completed');
    if (justCompletedOnboarding === 'true') {
      setShowFirstValueMoment(true);
      // Clear the flag so it only shows once
      sessionStorage.removeItem('onboarding-completed');
    }
  }, [shouldShowWelcome]);

  React.useEffect(() => {
    setShowChecklist(shouldShowChecklist);
  }, [shouldShowChecklist]);

  // Simple dashboard status
  const dashboardStatus = React.useMemo(() => calculateSimpleDashboardStatus(), []);
  
  // Top 3 strategic risks
  const topRisks = React.useMemo(() => generateTopStrategicRisks(), []);
  
  // Next best action (SINGLE)
  const nextBestAction = React.useMemo(() => {
    const action = generateNextBestAction();
    if (!action) {
      return {
        title: 'Validate Social Relevancy',
        description: 'Your Golden Circle needs validation with target audiences to ensure it resonates. Social relevancy research helps validate emotional connection and cultural fit.',
        actionLabel: 'Take Action',
        targetSection: 'research',
        estimatedTime: '1-2 hours'
      };
    }
    return {
      title: action.title,
      description: action.reason,
      actionLabel: 'Take Action',
      targetSection: action.targetType === 'asset' ? 'brand' : action.targetType === 'persona' ? 'personas' : 'research',
      estimatedTime: action.estimatedTime
    };
  }, []);

  // Decision cockpit data for overview
  const decisionCockpitData = React.useMemo(() => transformToDecisionCockpit(), []);

  const handleNavigate = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
  };

  // Calculate progress percentage
  const totalAssets = 16; // Example total
  const readyAssets = 1;
  const progressPercentage = Math.round((readyAssets / totalAssets) * 100);

  return (
    <div className="h-full overflow-auto bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Strategic overview of your brand research and validation progress
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        
        {/* First Value Moment - Show after onboarding */}
        {showFirstValueMoment && (
          <FirstValueMoment
            userName="Sarah"
            setupComplete={true}
            brandProfileProgress={60}
            onDismiss={() => setShowFirstValueMoment(false)}
            onStartAction={(actionId) => {
              console.log('Starting action:', actionId);
              
              // Navigate based on action
              switch (actionId) {
                case 'generate-content':
                  handleNavigate('content-library');
                  break;
                case 'complete-profile':
                  handleNavigate('brand');
                  break;
                case 'explore-ai':
                  handleNavigate('strategy');
                  break;
                case 'invite-team':
                  handleNavigate('team');
                  break;
                case 'watch-demo':
                  // Open demo video
                  console.log('Opening demo video');
                  break;
                case 'read-guide':
                  // Open getting started guide
                  console.log('Opening getting started guide');
                  break;
                default:
                  break;
              }
            }}
            onSkipTour={() => {
              console.log('Tour skipped');
              setShowFirstValueMoment(false);
            }}
          />
        )}
        
        {/* Decision Readiness Card - Main Focus */}
        <Card className="p-6 rounded-xl border">
          <div className="flex items-start gap-8">
            {/* Left side - 60% */}
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  Decision Readiness
                </p>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-5xl font-semibold">{progressPercentage}%</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  of your brand assets are ready for strategic decisions
                </p>
              </div>

              {/* Progress Bar */}
              <Progress value={progressPercentage} className="h-3 rounded-full" />
            </div>

            {/* Right side - 40% Breakdown */}
            <div className="w-[200px] flex-shrink-0 space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Ready</span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {decisionCockpitData.readyToDecide}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Need attention</span>
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                  {decisionCockpitData.atRiskCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">In progress</span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {decisionCockpitData.blockedCount}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Row - 5 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Ready to use */}
          <Card className="p-4 rounded-xl border">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
              {decisionCockpitData.readyToDecide}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Ready to use
            </div>
          </Card>

          {/* Need attention */}
          <Card className="p-4 rounded-xl border">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="text-2xl font-semibold text-amber-600 dark:text-amber-400">
              {decisionCockpitData.atRiskCount}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Need attention
            </div>
          </Card>

          {/* In progress */}
          <Card className="p-4 rounded-xl border">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
              {decisionCockpitData.blockedCount}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              In progress
            </div>
          </Card>

          {/* Active Campaigns */}
          <Card className="p-4 rounded-xl border">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Rocket className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
              2
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Active campaigns
            </div>
          </Card>

          {/* Content Created */}
          <Card className="p-4 rounded-xl border">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/30">
                <FileText className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              </div>
            </div>
            <div className="text-2xl font-semibold text-teal-600 dark:text-teal-400">
              12
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Content created
            </div>
          </Card>
        </div>

        {/* What Needs Your Attention Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
            <h2 className="text-xl font-semibold">What Needs Your Attention</h2>
          </div>

          <div className="space-y-3">
            {topRisks.slice(0, 3).map((risk, idx) => (
              <Card 
                key={idx}
                className="p-4 rounded-xl border hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer"
                onClick={() => handleNavigate(risk.targetSection)}
              >
                <div className="flex items-start gap-4">
                  {/* Numbered Badge */}
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                        {idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1">{risk.title}</h3>
                    <p className="text-sm text-muted-foreground">{risk.description}</p>
                  </div>

                  {/* Fix Button */}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex-shrink-0"
                  >
                    Fix
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </Card>
            ))}

            {topRisks.length === 0 && (
              <Card className="p-8 rounded-xl border">
                <div className="text-center text-muted-foreground">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-green-600 dark:text-green-500" />
                  <p className="font-semibold text-foreground">All systems ready</p>
                  <p className="text-sm mt-1">No immediate risks detected</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Recommended Next Step Card */}
        <Card className="p-6 rounded-xl border-2 bg-primary/5 dark:bg-primary/10 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold mb-2">{nextBestAction.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {nextBestAction.description}
              </p>
              
              <div className="flex items-center gap-3">
                <Button onClick={() => handleNavigate(nextBestAction.targetSection)}>
                  {nextBestAction.actionLabel}
                </Button>
                {nextBestAction.estimatedTime && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{nextBestAction.estimatedTime}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Access Cards - 3 columns */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
            Quick Access
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Brand Assets */}
            <Card
              className="p-4 rounded-xl border hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer"
              onClick={() => handleNavigate('brand')}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">Brand Assets</h3>
              <p className="text-sm text-muted-foreground">
                {mockBrandAssets.length} assets
              </p>
            </Card>

            {/* Personas */}
            <Card
              className="p-4 rounded-xl border hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer"
              onClick={() => handleNavigate('personas')}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">Personas</h3>
              <p className="text-sm text-muted-foreground">
                {mockPersonas.length} personas
              </p>
            </Card>

            {/* Research Hub */}
            <Card
              className="p-4 rounded-xl border hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer"
              onClick={() => handleNavigate('research')}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">Research Hub</h3>
              <p className="text-sm text-muted-foreground">
                Active research
              </p>
            </Card>
          </div>
        </div>

        {/* Active Campaigns Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Campaigns</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigate('active-campaigns')}
              className="gap-2"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Campaign 1 - Summer Launch */}
            <Card className="p-4 rounded-xl border hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer"
              onClick={() => handleNavigate('active-campaigns')}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Summer Launch 2026</h3>
                    <Badge variant="outline" className="rounded-full text-xs">
                      Strategic
                    </Badge>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <Rocket className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">3/6 deliverables</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground">On track</span>
                </div>
              </div>
            </Card>

            {/* Campaign 2 - Product Positioning */}
            <Card className="p-4 rounded-xl border hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer"
              onClick={() => handleNavigate('active-campaigns')}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Product Positioning</h3>
                    <Badge variant="outline" className="rounded-full text-xs">
                      Quick
                    </Badge>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">2/4 deliverables</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="text-xs text-muted-foreground">Needs review</span>
                </div>
              </div>
            </Card>

            {/* Empty slot - CTA */}
            <Card className="p-4 rounded-xl border border-dashed hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer"
              onClick={() => handleNavigate('strategy')}
            >
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="p-3 rounded-xl bg-muted mb-3">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-1">Start New Campaign</h3>
                <p className="text-sm text-muted-foreground">
                  Launch a strategic campaign
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Welcome Modal */}
      {showWelcome && (
        <WelcomeModal 
          onClose={() => setShowWelcome(false)}
          onGetStarted={() => {
            setShowWelcome(false);
            handleNavigate('brand'); // Navigate to brand page after tour
          }}
        />
      )}

      {/* Quick Start Checklist */}
      {showChecklist && (
        <QuickStartChecklist 
          onNavigate={handleNavigate}
          onDismiss={() => setShowChecklist(false)}
        />
      )}
    </div>
  );
}