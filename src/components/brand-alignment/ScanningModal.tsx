import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Shield, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ScanningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const scanSteps = [
  'Scanning Brand Foundation',
  'Analyzing Business Strategy',
  'Checking Brandstyle consistency',
  'Cross-referencing Personas with positioning',
  'Validating Products & Services',
  'Evaluating Market Insights relevance',
  'Checking Knowledge Library references',
  'Calculating alignment score',
];

export function ScanningModal({ isOpen, onClose }: ScanningModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setCurrentStep(0);
      setProgress(0);
      setIsComplete(false);
      return;
    }

    // Simulate scanning progress
    const stepDuration = 500; // 500ms per step
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        } else {
          setIsComplete(true);
          clearInterval(interval);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    // Update progress based on current step
    if (currentStep < scanSteps.length) {
      setProgress(((currentStep + 1) / scanSteps.length) * 100);
    }
  }, [currentStep]);

  const handleClose = () => {
    if (isComplete) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={isComplete ? onClose : undefined}>
      <DialogContent className="sm:max-w-md px-6 py-4">
        {!isComplete ? (
          // Scanning State
          <div className="text-center space-y-6 py-6">
            {/* Animated Shield Icon */}
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-4 animate-pulse">
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Analyzing Brand Alignment</h2>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {Math.round(progress)}%
              </p>
            </div>

            {/* Step Checklist */}
            <div className="space-y-2 text-left max-h-64 overflow-y-auto">
              {scanSteps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-center gap-2 text-sm transition-opacity duration-200',
                    index > currentStep ? 'opacity-40' : 'opacity-100'
                  )}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                  ) : index === currentStep ? (
                    <Loader2 className="h-4 w-4 text-primary flex-shrink-0 animate-spin" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-muted flex-shrink-0" />
                  )}
                  <span className={index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            {/* Item count */}
            <p className="text-sm text-muted-foreground">
              Analyzing 18 knowledge items across 6 modules
            </p>

            {/* Time estimate */}
            <p className="text-xs text-muted-foreground">
              This may take up to 30 seconds
            </p>

            {/* Cancel button - disabled during scan */}
            <Button variant="outline" disabled className="mt-4">
              Cancel
            </Button>
          </div>
        ) : (
          // Complete State
          <div className="text-center space-y-6 py-6">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4">
                <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Alignment Scan Complete</h2>
              <p className="text-sm text-muted-foreground">
                Score: <span className="font-semibold text-amber-600 dark:text-amber-400">78%</span>
                {' · '}
                <span className="font-semibold">4 issues found</span>
              </p>
            </div>

            {/* View Results Button */}
            <Button onClick={handleClose} className="mt-4">
              View Results
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
