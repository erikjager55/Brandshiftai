import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { AlertTriangle, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { AlignmentIssue } from './IssuesList';

interface FixAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: AlignmentIssue | null;
}

interface FixOption {
  id: string;
  label: string;
  description: string;
  preview: string;
  action: 'adjust-persona' | 'adjust-positioning' | 'mark-intentional';
}

// Mock fix options (these would be AI-generated in reality)
const mockFixOptions: Record<string, FixOption[]> = {
  'issue-1': [
    {
      id: 'option-a',
      label: 'Option A: Adjust Persona',
      description: 'Rewrite persona to target enterprise decision-makers who align with your premium positioning.',
      preview: 'Enterprise innovation lead responsible for digital transformation initiatives, seeking integrated brand strategy platforms for their organization.',
      action: 'adjust-persona',
    },
    {
      id: 'option-b',
      label: 'Option B: Adjust Positioning',
      description: 'Broaden brand positioning to include both enterprise and professional-tier solutions.',
      preview: 'We provide powerful brand strategy solutions for organizations of all sizes — from ambitious professionals to enterprise teams.',
      action: 'adjust-positioning',
    },
    {
      id: 'option-c',
      label: 'Option C: Keep Both (Acknowledge Segmentation)',
      description: 'Add market segmentation to your strategy that explicitly addresses multiple tiers. Mark this as intentional.',
      preview: '',
      action: 'mark-intentional',
    },
  ],
};

export function FixAssistantModal({ isOpen, onClose, issue }: FixAssistantModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  if (!issue) return null;

  const fixOptions = mockFixOptions[issue.id] || [];

  const handleApplyFix = async (optionId: string) => {
    setIsApplying(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsApplying(false);
    // Close modal after successful apply
    onClose();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto px-6 py-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Fix Alignment Issue
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {issue.title}
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Issue Summary */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <h3 className="text-sm font-semibold">Issue Summary</h3>
            </div>
            <Card className={cn('rounded-xl border p-4', getSeverityColor(issue.severity))}>
              <p className="text-sm">{issue.description}</p>
            </Card>
          </div>

          {/* Current Content */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Current Content</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="rounded-xl border bg-muted/30 p-4">
                <h4 className="text-sm font-medium mb-2">Brand Positioning</h4>
                <p className="text-sm text-muted-foreground">
                  "We provide premium enterprise solutions for large organizations seeking to transform their brand strategy."
                </p>
              </Card>
              <Card className="rounded-xl border bg-muted/30 p-4">
                <h4 className="text-sm font-medium mb-2">Persona: Tech-Savvy Millennial</h4>
                <p className="text-sm text-muted-foreground">
                  "Budget-conscious young professional looking for affordable tools to build their personal brand."
                </p>
              </Card>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* AI Suggested Fixes */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">✨</span>
              <h3 className="text-sm font-semibold">AI Suggested Fix</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Choose an approach:
            </p>

            <div className="space-y-3">
              {fixOptions.map((option) => (
                <Card
                  key={option.id}
                  className={cn(
                    'rounded-xl border p-4 cursor-pointer transition-all duration-200',
                    selectedOption === option.id
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:border-primary/50'
                  )}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={cn(
                          'h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors',
                          selectedOption === option.id
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground/30'
                        )}
                      >
                        {selectedOption === option.id && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium mb-1">{option.label}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {option.description}
                      </p>
                      {option.preview && (
                        <div className="rounded-lg bg-muted/30 p-3">
                          <p className="text-sm font-medium mb-1">Preview:</p>
                          <p className="text-sm text-muted-foreground italic">
                            "{option.preview}"
                          </p>
                        </div>
                      )}
                      {selectedOption === option.id && (
                        <div className="mt-3 flex justify-end">
                          <Button
                            size="sm"
                            onClick={() => handleApplyFix(option.id)}
                            disabled={isApplying}
                          >
                            {isApplying ? 'Applying...' : option.action === 'mark-intentional' ? 'Mark as Intentional' : 'Apply This Fix'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3">
            <Button variant="ghost" onClick={onClose}>
              Dismiss Issue
            </Button>
            <Button variant="outline" onClick={onClose}>
              Edit Manually
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
