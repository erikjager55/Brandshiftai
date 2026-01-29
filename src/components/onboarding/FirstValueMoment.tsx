import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  X,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  PenTool,
  Microscope,
  Upload,
  Users,
  Play,
  BookOpen,
  Target,
  TrendingUp,
  ChevronRight,
  Palette,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface FirstValueMomentProps {
  userName?: string;
  setupComplete?: boolean;
  brandProfileProgress?: number;
  onDismiss?: () => void;
  onStartAction?: (actionId: string) => void;
  onSkipTour?: () => void;
}

interface QuickAction {
  id: string;
  icon: any;
  title: string;
  description: string;
  timeEstimate: string;
  progress?: number;
  recommended?: boolean;
}

interface TooltipStep {
  id: string;
  target: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const primaryAction: QuickAction = {
  id: 'generate-content',
  icon: PenTool,
  title: 'Generate Your First Content Piece',
  description: 'See how Brandshift creates on-brand content instantly using AI and your brand profile',
  timeEstimate: '~5 minutes',
  recommended: true,
};

const alternativeActions: QuickAction[] = [
  {
    id: 'complete-profile',
    icon: Palette,
    title: 'Complete brand profile',
    description: 'Add logo and colors',
    timeEstimate: '~3 min',
    progress: 60,
  },
  {
    id: 'explore-ai',
    icon: Sparkles,
    title: 'Explore AI features',
    description: 'See how AI enhances your strategy',
    timeEstimate: '~5 min',
  },
  {
    id: 'invite-team',
    icon: Users,
    title: 'Invite your team',
    description: 'Collaborate on brand strategy',
    timeEstimate: '~2 min',
  },
];

const tooltipSteps: TooltipStep[] = [
  {
    id: 'sidebar',
    target: 'sidebar-nav',
    title: 'Navigate Your Workspace',
    description: 'Access all your tools from here: Brand assets, Research, Strategy, and more.',
    position: 'right',
  },
  {
    id: 'create',
    target: 'create-button',
    title: 'Quick Create',
    description: 'Generate content, start research, or create campaigns with one click.',
    position: 'bottom',
  },
  {
    id: 'research',
    target: 'research-hub',
    title: 'Research Hub',
    description: 'Validate your brand decisions with real data and strategic insights.',
    position: 'left',
  },
];

export function FirstValueMoment({
  userName = 'there',
  setupComplete = true,
  brandProfileProgress = 60,
  onDismiss,
  onStartAction,
  onSkipTour,
}: FirstValueMomentProps) {
  const [dismissed, setDismissed] = useState(false);
  const [showTooltipTour, setShowTooltipTour] = useState(false);
  const [currentTooltipStep, setCurrentTooltipStep] = useState(0);

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const handleStartAction = (actionId: string) => {
    onStartAction?.(actionId);
  };

  const handleSkipTour = () => {
    setShowTooltipTour(false);
    onSkipTour?.();
  };

  const handleNextTooltip = () => {
    if (currentTooltipStep < tooltipSteps.length - 1) {
      setCurrentTooltipStep(currentTooltipStep + 1);
    } else {
      handleSkipTour();
    }
  };

  if (dismissed) {
    return null;
  }

  return (
    <>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border p-6 bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-primary blur-3xl" />
            <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-blue-500 blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                Welcome, {userName}! Let's get your first win 🎯
              </h2>
              <p className="text-sm text-muted-foreground">
                Complete one of these quick actions to see Brandshift in action
              </p>
              
              {setupComplete && (
                <div className="flex items-center gap-2 pt-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                    Setup: 100% complete
                  </span>
                </div>
              )}
            </div>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className="p-2 rounded-lg hover:bg-background/50 transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* First Action Card - Prominent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <div className="rounded-2xl border-2 border-primary p-8 shadow-lg bg-card relative overflow-hidden">
            {/* Sparkles Animation */}
            <motion.div
              className="absolute top-6 right-6"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Sparkles className="h-8 w-8 text-primary" />
            </motion.div>

            <div className="space-y-6">
              {/* Label */}
              <div>
                <Badge className="rounded-full bg-primary/10 text-primary dark:bg-primary/20 uppercase tracking-wider text-xs">
                  Your First Task
                </Badge>
              </div>

              {/* Title & Description */}
              <div className="space-y-4 pr-12">
                <h3 className="text-2xl font-semibold">{primaryAction.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {primaryAction.description}
                </p>

                {/* Time Estimate */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="h-4 w-4" />
                  <span>{primaryAction.timeEstimate}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full gap-2 group"
                  onClick={() => handleStartAction(primaryAction.id)}
                >
                  <span>Start Now</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Button>

                <div className="text-center">
                  <button
                    onClick={() => {
                      // Scroll to alternatives
                      const alternatives = document.getElementById('alternative-actions');
                      alternatives?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Choose something else
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alternative Quick Wins */}
        <motion.div
          id="alternative-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h3 className="text-lg font-semibold text-center">Or try one of these</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alternativeActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  onClick={() => handleStartAction(action.id)}
                  className="rounded-xl border p-4 hover:shadow-md transition-all cursor-pointer group bg-card"
                >
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="h-12 w-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold">{action.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>

                      {/* Time */}
                      <p className="text-xs text-muted-foreground">
                        {action.timeEstimate}
                      </p>

                      {/* Progress indicator if partially complete */}
                      {action.progress !== undefined && (
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{action.progress}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${action.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Hover Arrow */}
                    <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Get started</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Side Metrics & Resources Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Brand Health Card */}
          <div className="rounded-xl border p-6 bg-card space-y-6">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Your Brand Health</h4>
              <p className="text-sm text-muted-foreground">
                Complete research to unlock strategic confidence
              </p>
            </div>

            {/* Circular Progress */}
            <div className="flex items-center justify-center py-6">
              <div className="relative">
                {/* Background Circle */}
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.15)}`}
                    className="text-primary transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-semibold">15%</span>
                  <span className="text-xs text-muted-foreground">Ready</span>
                </div>
              </div>
            </div>

            {/* Quick Actions List */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Boost your score:</p>
              <div className="space-y-2">
                {[
                  { label: 'Complete brand profile', points: '+10%' },
                  { label: 'Run first research', points: '+25%' },
                  { label: 'Create persona', points: '+15%' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-primary font-medium">{item.points}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resources Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Demo Video */}
            <div
              onClick={() => handleStartAction('watch-demo')}
              className="rounded-xl border p-6 hover:shadow-md transition-all cursor-pointer group bg-card"
            >
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <Play className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Watch demo video</h4>
                  <p className="text-sm text-muted-foreground">2 minute overview</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Watch now</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Getting Started Guide */}
            <div
              onClick={() => handleStartAction('read-guide')}
              className="rounded-xl border p-6 hover:shadow-md transition-all cursor-pointer group bg-card"
            >
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                  <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Getting started guide</h4>
                  <p className="text-sm text-muted-foreground">Step-by-step walkthrough</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Read guide</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Start Tour */}
            <div
              onClick={() => setShowTooltipTour(true)}
              className="rounded-xl border p-6 hover:shadow-md transition-all cursor-pointer group bg-card"
            >
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                  <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Take a quick tour</h4>
                  <p className="text-sm text-muted-foreground">Learn the interface</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Start tour</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Skip Tour */}
            <div
              onClick={handleDismiss}
              className="rounded-xl border p-6 hover:shadow-md transition-all cursor-pointer group bg-card"
            >
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-muted/70 transition-colors">
                  <TrendingUp className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Skip and explore</h4>
                  <p className="text-sm text-muted-foreground">Jump right in</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Skip tour</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tooltip Tour Overlay */}
      <AnimatePresence>
        {showTooltipTour && (
          <>
            {/* Backdrop with Spotlight Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={handleSkipTour}
            />

            {/* Tooltip Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-md w-full mx-4"
            >
              <div className="rounded-xl border p-6 bg-card shadow-2xl space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className="rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                      Step {currentTooltipStep + 1} of {tooltipSteps.length}
                    </Badge>
                    <button
                      onClick={handleSkipTour}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="text-xl font-semibold">
                    {tooltipSteps[currentTooltipStep].title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tooltipSteps[currentTooltipStep].description}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  {/* Progress Dots */}
                  <div className="flex items-center gap-2">
                    {tooltipSteps.map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          'h-2 w-2 rounded-full transition-all',
                          index === currentTooltipStep
                            ? 'bg-primary w-6'
                            : 'bg-muted'
                        )}
                      />
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSkipTour}
                    >
                      Skip
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleNextTooltip}
                      className="gap-2"
                    >
                      {currentTooltipStep < tooltipSteps.length - 1 ? 'Next' : 'Finish'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
