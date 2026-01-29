import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useDemoMode } from '../../contexts/DemoModeContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Play, 
  Pause,
  Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export function DemoControlPanel({ onNavigate }: { onNavigate?: (route: string) => void }) {
  const {
    config,
    tourSteps,
    endTour,
    nextTourStep,
    previousTourStep,
    formatTourTime,
  } = useDemoMode();

  const [time, setTime] = useState('00:00');

  // Update timer every second
  useEffect(() => {
    if (!config.tourActive) return;

    const interval = setInterval(() => {
      setTime(formatTourTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [config.tourActive, formatTourTime]);

  // Navigate when tour step changes
  useEffect(() => {
    if (!config.tourActive || !onNavigate) return;

    const currentStep = tourSteps[config.currentTourStep];
    if (currentStep?.route) {
      onNavigate(currentStep.route);
    }
  }, [config.currentTourStep, config.tourActive, tourSteps, onNavigate]);

  if (!config.tourActive) return null;

  const currentStep = tourSteps[config.currentTourStep];
  const isFirstStep = config.currentTourStep === 0;
  const isLastStep = config.currentTourStep === tourSteps.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="rounded-xl border bg-card shadow-2xl overflow-hidden max-w-md">
          {/* Header */}
          <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-lg font-semibold">Demo Guide</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="rounded-full font-mono text-xs">
                {time}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                onClick={endTour}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Step indicator */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Step {config.currentTourStep + 1} of {tourSteps.length}
              </span>
              
              {/* Progress dots */}
              <div className="flex items-center gap-1">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      'h-2 w-2 rounded-full transition-colors',
                      index === config.currentTourStep
                        ? 'bg-primary'
                        : index < config.currentTourStep
                        ? 'bg-primary/40'
                        : 'bg-muted'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Step content */}
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">{currentStep.title}</h4>
              <p className="text-sm text-muted-foreground">
                {currentStep.description}
              </p>
            </div>

            {/* Benefit callout */}
            <div className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 p-4">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900 dark:text-green-200">
                    Key Benefit
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentStep.benefit}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Navigation */}
          <div className="p-4 border-t bg-muted/30 flex items-center justify-between gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={previousTourStep}
              disabled={isFirstStep}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {isLastStep ? (
              <Button
                size="sm"
                onClick={endTour}
                className="gap-2"
              >
                Complete Tour
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={nextTourStep}
                className="gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
