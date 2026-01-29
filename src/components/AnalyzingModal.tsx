/**
 * Analyzing Modal Component
 * Shows progress while AI analyzes website URL or PDF
 * Used by Brandstyle Analyzer and Product & Service Analyzer
 */

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import {
  Loader2,
  CheckCircle2,
  Circle,
  AlertCircle,
} from 'lucide-react';
import { cn } from '../lib/utils';

type AnalysisType = 'brandstyle' | 'product';
type AnalysisState = 'analyzing' | 'success' | 'error';
type InputType = 'url' | 'pdf';

interface AnalyzingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  analysisType: AnalysisType;
  inputType: InputType;
  source: string; // URL or filename
}

interface ProgressStep {
  id: string;
  label: string;
  status: 'completed' | 'processing' | 'pending';
}

const BRANDSTYLE_STEPS_URL = [
  'Connecting to website',
  'Scanning page structure',
  'Extracting color palette',
  'Analyzing typography',
  'Detecting component styles',
  'Identifying imagery guidelines',
  'Extracting tone of voice',
  'Generating styleguide',
];

const BRANDSTYLE_STEPS_PDF = [
  'Uploading document',
  'Processing PDF',
  'Extracting visual elements',
  'Analyzing colors and typography',
  'Detecting logos',
  'Extracting tone of voice',
  'Generating styleguide',
];

const PRODUCT_STEPS_URL = [
  'Connecting to website',
  'Scanning product information',
  'Extracting features & specifications',
  'Analyzing pricing model',
  'Identifying use cases',
  'Detecting target audience',
  'Generating product profile',
];

const PRODUCT_STEPS_PDF = [
  'Reading document',
  'Scanning product information',
  'Extracting features & specifications',
  'Analyzing pricing model',
  'Identifying use cases',
  'Detecting target audience',
  'Generating product profile',
];

export function AnalyzingModal({
  isOpen,
  onClose,
  onComplete,
  analysisType,
  inputType,
  source,
}: AnalyzingModalProps) {
  const [state, setState] = useState<AnalysisState>('analyzing');
  const [currentStep, setCurrentStep] = useState(0);

  // Get steps based on analysis type and input type
  const getSteps = () => {
    if (analysisType === 'brandstyle') {
      return inputType === 'pdf' ? BRANDSTYLE_STEPS_PDF : BRANDSTYLE_STEPS_URL;
    } else {
      return inputType === 'pdf' ? PRODUCT_STEPS_PDF : PRODUCT_STEPS_URL;
    }
  };

  const steps = getSteps();

  // Simulate progress
  useEffect(() => {
    if (!isOpen || state !== 'analyzing') return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          // Analysis complete
          clearInterval(interval);
          setState('success');
          setTimeout(() => {
            onComplete();
          }, 1500);
          return prev;
        }
      });
    }, 2000); // Each step takes ~2 seconds

    return () => clearInterval(interval);
  }, [isOpen, state, steps.length, onComplete]);

  // Map steps to progress items
  const progressSteps: ProgressStep[] = steps.map((label, index) => ({
    id: `step-${index}`,
    label,
    status:
      index < currentStep
        ? 'completed'
        : index === currentStep
        ? 'processing'
        : 'pending',
  }));

  const handleCancel = () => {
    setState('analyzing');
    setCurrentStep(0);
    onClose();
  };

  const handleRetry = () => {
    setState('analyzing');
    setCurrentStep(0);
  };

  if (!isOpen) return null;

  const title =
    analysisType === 'brandstyle' ? 'Analyzing Brand Style' : 'Analyzing Product';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full">
        {/* Analyzing State */}
        {state === 'analyzing' && (
          <div className="p-6">
            {/* Spinner */}
            <div className="flex justify-center mb-4">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center">{title}</h2>

            {/* Source */}
            <p className="text-sm text-muted-foreground text-center mt-1 max-w-[280px] truncate mx-auto">
              {source}
            </p>

            {/* Progress Checklist */}
            <div className="bg-muted/50 rounded-xl p-4 mt-6 space-y-2">
              {progressSteps.map((step) => (
                <div key={step.id} className="flex items-center gap-3 py-2">
                  {step.status === 'completed' && (
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  )}
                  {step.status === 'processing' && (
                    <Loader2 className="h-5 w-5 text-primary animate-spin flex-shrink-0" />
                  )}
                  {step.status === 'pending' && (
                    <Circle className="h-5 w-5 text-muted-foreground/40 flex-shrink-0" />
                  )}
                  <span
                    className={cn(
                      'text-sm',
                      step.status === 'processing' && 'font-medium text-foreground',
                      step.status === 'completed' && 'text-foreground',
                      step.status === 'pending' && 'text-muted-foreground'
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Time Estimate */}
            <p className="text-xs text-muted-foreground text-center mt-6">
              This may take up to 30 seconds
            </p>

            {/* Cancel Button */}
            <div className="flex justify-center mt-4">
              <Button variant="outline" onClick={handleCancel} className="rounded-xl">
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Success State */}
        {state === 'success' && (
          <div className="p-6">
            {/* Checkmark */}
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400 animate-in zoom-in duration-300" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 text-center">
              Analysis Complete!
            </h2>

            {/* Source */}
            <p className="text-sm text-muted-foreground text-center mt-1">
              {source}
            </p>

            {/* Redirect Message */}
            <p className="text-sm text-muted-foreground text-center mt-4">
              Redirecting to results...
            </p>
          </div>
        )}

        {/* Error State */}
        {state === 'error' && (
          <div className="p-6">
            {/* Alert Icon */}
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 text-center">
              Analysis Failed
            </h2>

            {/* Error Message */}
            <p className="text-sm text-muted-foreground text-center mt-4 max-w-[280px] mx-auto">
              We couldn't analyze this {inputType === 'url' ? 'website' : 'document'}. The{' '}
              {inputType === 'url' ? 'site may block automated access or be' : 'file may be'}{' '}
              temporarily unavailable.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button variant="outline" onClick={handleCancel} className="rounded-xl">
                Cancel
              </Button>
              <Button onClick={handleRetry} className="rounded-xl">
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
