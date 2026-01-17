import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  Rocket, 
  CheckCircle, 
  Circle,
  ArrowRight,
  X,
  Sparkles,
  Target,
  FlaskConical,
  Lightbulb,
  PartyPopper
} from 'lucide-react';

interface QuickStartStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  actionLabel: string;
  actionRoute: string;
  checkCondition: () => boolean;
}

interface QuickStartChecklistProps {
  onNavigate: (route: string) => void;
  brandAssetsCount: number;
  personasCount: number;
  researchPlansCount: number;
  strategiesCount: number;
}

const CHECKLIST_DISMISSED_KEY = 'quick-start-dismissed';
const CHECKLIST_DISMISSED_DATE_KEY = 'quick-start-dismissed-date';
const REMIND_AFTER_DAYS = 7;

export function QuickStartChecklist({
  onNavigate,
  brandAssetsCount,
  personasCount,
  researchPlansCount,
  strategiesCount
}: QuickStartChecklistProps) {
  const [isDismissed, setIsDismissed] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  // Define steps
  const steps: QuickStartStep[] = [
    {
      id: 'brand-asset',
      title: 'Create your first Brand Asset',
      description: 'Start with Golden Circle to define your WHY',
      icon: Target,
      actionLabel: 'Create Golden Circle',
      actionRoute: '/foundation/brand-library',
      checkCondition: () => brandAssetsCount > 0
    },
    {
      id: 'persona',
      title: 'Define your Target Persona',
      description: 'Understand who you\'re creating for',
      icon: Sparkles,
      actionLabel: 'Create Persona',
      actionRoute: '/foundation/personas',
      checkCondition: () => personasCount > 0
    },
    {
      id: 'research',
      title: 'Run your first Research',
      description: 'Validate your assumptions with data',
      icon: FlaskConical,
      actionLabel: 'Plan Research',
      actionRoute: '/research/plans',
      checkCondition: () => researchPlansCount > 0
    },
    {
      id: 'strategy',
      title: 'Generate Campaign Strategy',
      description: 'Let AI create your first strategy',
      icon: Lightbulb,
      actionLabel: 'Go to Strategy Hub',
      actionRoute: '/strategy/hub',
      checkCondition: () => strategiesCount > 0
    }
  ];

  // Calculate completion
  const completedSteps = steps.filter(step => step.checkCondition());
  const completionPercentage = Math.round((completedSteps.length / steps.length) * 100);
  const isComplete = completedSteps.length === steps.length;

  // Check if should show
  useEffect(() => {
    const dismissed = localStorage.getItem(CHECKLIST_DISMISSED_KEY);
    const dismissedDate = localStorage.getItem(CHECKLIST_DISMISSED_DATE_KEY);

    if (!dismissed) {
      // Never dismissed - show it
      setIsDismissed(false);
    } else if (dismissedDate) {
      // Check if enough time has passed to show again
      const daysSinceDismissed = (Date.now() - parseInt(dismissedDate)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed >= REMIND_AFTER_DAYS && !isComplete) {
        // Show again if not complete
        setIsDismissed(false);
        localStorage.removeItem(CHECKLIST_DISMISSED_KEY);
        localStorage.removeItem(CHECKLIST_DISMISSED_DATE_KEY);
      } else {
        setIsDismissed(true);
      }
    }
  }, [isComplete]);

  // Show confetti when complete
  useEffect(() => {
    if (isComplete && !isDismissed) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem(CHECKLIST_DISMISSED_KEY, 'true');
    localStorage.setItem(CHECKLIST_DISMISSED_DATE_KEY, Date.now().toString());
  };

  const handleStepClick = (route: string) => {
    onNavigate(route);
  };

  // Don't render if dismissed
  if (isDismissed) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
        {/* Confetti effect overlay */}
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
            >
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: '50%',
                    y: '50%',
                    scale: 0,
                    rotate: 0
                  }}
                  animate={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: [0, 1, 0.8, 0],
                    rotate: Math.random() * 360
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 0.5,
                    ease: 'easeOut'
                  }}
                >
                  <PartyPopper className="h-6 w-6 text-primary" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 h-8 w-8 z-20"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>

        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0">
              {isComplete ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                >
                  <PartyPopper className="h-6 w-6 text-primary-foreground" />
                </motion.div>
              ) : (
                <Rocket className="h-6 w-6 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">
                {isComplete ? '🎉 All Set! You\'re Ready!' : 'Get Started'}
              </CardTitle>
              <CardDescription className="mt-1">
                {isComplete
                  ? 'You\'ve completed all the essentials. Your strategic foundation is ready!'
                  : 'Complete these steps to unlock the full power of the platform'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Steps */}
          <div className="space-y-3">
            {steps.map((step, index) => {
              const isCompleted = step.checkCondition();
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
                    isCompleted
                      ? 'border-green-500/30 bg-green-50/50 dark:bg-green-900/10'
                      : 'border-border bg-background hover:border-primary/30 hover:bg-muted/50'
                  }`}
                >
                  {/* Check icon */}
                  <div className="shrink-0 mt-0.5">
                    <AnimatePresence mode="wait">
                      {isCompleted ? (
                        <motion.div
                          key="checked"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        >
                          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="unchecked"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Circle className="h-6 w-6 text-muted-foreground" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className={`h-4 w-4 ${isCompleted ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                          <h4 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                            {index + 1}. {step.title}
                          </h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>

                      {/* Action button */}
                      {!isCompleted && (
                        <Button
                          size="sm"
                          onClick={() => handleStepClick(step.actionRoute)}
                          className="gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {step.actionLabel}
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">
                {completedSteps.length}/{steps.length} complete
              </span>
            </div>
            <div className="relative h-3 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-primary/60"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-white/30"
                initial={{ width: 0, x: '-100%' }}
                animate={{ 
                  width: `${completionPercentage}%`,
                  x: 0
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: 'easeOut',
                  delay: 0.2 
                }}
              />
            </div>
            <p className="text-xs text-center text-muted-foreground">
              {isComplete
                ? '✨ You\'re all set! Keep building your strategic foundation.'
                : `${completionPercentage}% complete • Keep going!`}
            </p>
          </div>

          {/* Complete message */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 rounded-lg border-2 border-green-500/30 bg-green-50 dark:bg-green-900/20"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                    Great Job! 🎊
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    You've completed the essentials. Now you can explore advanced features, 
                    run more research, and generate powerful strategies based on your validated data.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Dismiss hint */}
          {!isComplete && (
            <p className="text-xs text-center text-muted-foreground pt-2">
              💡 You can dismiss this checklist. We'll remind you in {REMIND_AFTER_DAYS} days if not complete.
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Hook to manually show checklist (for testing)
export function useQuickStartChecklist() {
  const showChecklist = () => {
    localStorage.removeItem(CHECKLIST_DISMISSED_KEY);
    localStorage.removeItem(CHECKLIST_DISMISSED_DATE_KEY);
    window.location.reload();
  };

  const hideChecklist = () => {
    localStorage.setItem(CHECKLIST_DISMISSED_KEY, 'true');
    localStorage.setItem(CHECKLIST_DISMISSED_DATE_KEY, Date.now().toString());
  };

  return { showChecklist, hideChecklist };
}

// Reset function for testing
export function resetQuickStartChecklist() {
  localStorage.removeItem(CHECKLIST_DISMISSED_KEY);
  localStorage.removeItem(CHECKLIST_DISMISSED_DATE_KEY);
}
