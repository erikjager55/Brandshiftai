import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import {
  X,
  FileSearch,
  Lightbulb,
  GitCompare,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Edit,
  Check,
  AlertCircle,
  Plus,
  Minus,
  Loader2,
  Circle,
} from 'lucide-react';
import { cn } from '../../lib/utils';

// Mock research sources
const mockResearchSources = [
  {
    id: 'ws-1',
    title: 'Brand Workshop - January 2026',
    type: 'workshop',
    completedDate: 'Jan 15, 2026',
    stats: '12 participants • 24 insights',
    themes: ['Customer-centricity', 'Innovation', 'Sustainability'],
  },
  {
    id: 'int-1',
    title: 'Customer Interviews Q1',
    type: 'interviews',
    completedDate: 'Jan 20, 2026',
    stats: '8 interviews • 18 insights',
    themes: ['Trust', 'Simplicity', 'Support'],
  },
  {
    id: 'surv-1',
    title: 'Market Positioning Survey',
    type: 'questionnaire',
    completedDate: 'Jan 10, 2026',
    stats: '250 responses • 15 insights',
    themes: ['Differentiation', 'Value perception'],
  },
  {
    id: 'ai-1',
    title: 'AI Exploration: Competitor Analysis',
    type: 'ai',
    completedDate: 'Jan 22, 2026',
    stats: '8 insights',
    themes: ['Market gaps', 'Opportunities'],
  },
];

// Mock key findings
const mockFindings = {
  'ws-1': [
    {
      icon: '🎯',
      title: 'Customer-centricity emerged as the #1 priority',
      quote: 'Customers want to feel understood, not just served',
      relevance: 'high',
    },
    {
      icon: '🌱',
      title: 'Sustainability is increasingly important to stakeholders',
      quote: 'Our impact on the world should be part of our identity',
      relevance: 'medium',
    },
    {
      icon: '💡',
      title: 'Innovation should be purposeful, not for its own sake',
      quote: 'Technology as enabler, not the end goal',
      relevance: 'high',
    },
  ],
  'int-1': [
    {
      icon: '🤝',
      title: 'Trust is the foundation of customer relationships',
      quote: 'I need to know they have my best interests at heart',
      relevance: 'high',
    },
    {
      icon: '✨',
      title: 'Simplicity is valued over feature richness',
      quote: 'I want solutions that just work, without complexity',
      relevance: 'medium',
    },
  ],
};

// Mock AI suggestions
const mockSuggestions = [
  {
    id: 'opt-a',
    title: 'Customer-Centric Focus',
    recommended: true,
    text: 'To empower businesses with intuitive, purposeful solutions that put their customers at the heart of every decision, building lasting trust through simplicity and meaningful innovation.',
    changes: {
      added: ['customer-centricity', 'trust', 'simplicity'],
      modified: ['"innovative" → "purposeful"'],
      removed: ['"digital age" (dated phrasing)'],
    },
  },
  {
    id: 'opt-b',
    title: 'Impact-Driven Focus',
    recommended: false,
    text: 'To create positive change for businesses and the world through thoughtful technology that prioritizes people, trust, and sustainable growth.',
    changes: {
      added: ['sustainability', 'positive change', 'people-focus'],
      modified: ['complete restructure'],
      removed: ['software-specific language'],
    },
  },
  {
    id: 'opt-c',
    title: 'Balanced Evolution',
    recommended: false,
    text: 'To deliver innovative solutions that businesses trust, putting customer success and meaningful impact at the center of everything we create.',
    changes: {
      added: ['trust', 'customer success', 'impact'],
      modified: ['retained innovation focus'],
      removed: ['"digital age"'],
    },
  },
];

interface RegenerateAssetWizardProps {
  open: boolean;
  onClose: () => void;
  assetName: string;
  assetType: string;
  currentContent: string;
  onSave: (newContent: string, researchSources: string[]) => void;
}

export function RegenerateAssetWizard({
  open,
  onClose,
  assetName,
  assetType,
  currentContent,
  onSave,
}: RegenerateAssetWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [processingStep, setProcessingStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shouldRefine, setShouldRefine] = useState<boolean | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [keepHistory, setKeepHistory] = useState(true);

  useEffect(() => {
    if (!open) {
      // Reset wizard state when closed
      setStep(1);
      setSelectedSources([]);
      setProcessingStep(0);
      setSelectedOption(null);
      setShouldRefine(null);
      setEditedContent('');
      setKeepHistory(true);
    }
  }, [open]);

  // Auto-advance from Step 2 to Step 3
  useEffect(() => {
    if (step === 2 && processingStep === 6) {
      setTimeout(() => setStep(3), 1000);
    }
  }, [step, processingStep]);

  // Start processing when entering Step 2
  useEffect(() => {
    if (step === 2) {
      const steps = [0, 1, 2, 3, 4, 5, 6];
      steps.forEach((s, index) => {
        setTimeout(() => setProcessingStep(s), index * 800);
      });
    }
  }, [step]);

  const toggleSource = (id: string) => {
    setSelectedSources((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'workshop':
        return { label: 'Workshop', className: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' };
      case 'interviews':
        return { label: 'Interviews', className: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' };
      case 'questionnaire':
        return { label: 'Questionnaire', className: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' };
      case 'ai':
        return { label: 'AI Research', className: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400' };
      default:
        return { label: type, className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' };
    }
  };

  const getRelevanceConfig = (relevance: string) => {
    switch (relevance) {
      case 'high':
        return { label: 'High Relevance', className: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' };
      case 'medium':
        return { label: 'Medium Relevance', className: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' };
      case 'low':
        return { label: 'Low Relevance', className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' };
      default:
        return { label: relevance, className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' };
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4 && selectedOption) {
      setStep(5);
    } else if (step === 5 && shouldRefine === true) {
      const selected = mockSuggestions.find((s) => s.id === selectedOption);
      setEditedContent(selected?.text || '');
      setStep(6);
    } else if (step === 5 && shouldRefine === false) {
      const selected = mockSuggestions.find((s) => s.id === selectedOption);
      setEditedContent(selected?.text || '');
      setStep(7);
    } else if (step === 6) {
      setStep(7);
    }
  };

  const handleBack = () => {
    if (step > 1 && step !== 2) {
      setStep(step - 1);
    }
  };

  const handleSave = () => {
    const finalContent = editedContent || mockSuggestions.find((s) => s.id === selectedOption)?.text || currentContent;
    onSave(finalContent, selectedSources);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const progressPercent = (step / 7) * 100;

  console.log('RegenerateAssetWizard render:', { open, step, showRegenerateWizard: open });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-3xl bg-background rounded-2xl shadow-xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">Regenerate {assetName}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Step {step} of 7
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* STEP 1: SELECT RESEARCH SOURCE */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Hero */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 text-center">
                <FileSearch className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Select Research to Incorporate</h3>
                <p className="text-sm text-muted-foreground">
                  Choose which research insights should inform the update of your {assetName}. AI will analyze the findings and suggest changes.
                </p>
              </div>

              {/* Research List */}
              <div>
                <h4 className="text-sm font-semibold mb-4">Available Research</h4>
                <div className="border rounded-xl divide-y">
                  {mockResearchSources.map((source) => {
                    const typeConfig = getTypeConfig(source.type);
                    const isSelected = selectedSources.includes(source.id);

                    return (
                      <div
                        key={source.id}
                        className={cn(
                          'p-4 cursor-pointer transition-all hover:bg-muted/50',
                          isSelected && 'bg-primary/5 border-l-2 border-l-primary'
                        )}
                        onClick={() => toggleSource(source.id)}
                      >
                        <div className="flex items-start gap-4">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleSource(source.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h5 className="font-semibold">{source.title}</h5>
                              <Badge className={cn('text-xs', typeConfig.className)}>
                                {typeConfig.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Completed {source.completedDate} • {source.stats}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">Key themes:</span>
                              {source.themes.map((theme, idx) => (
                                <span key={idx} className="text-xs text-foreground">
                                  {theme}
                                  {idx < source.themes.length - 1 && ','}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-start gap-4">
                  <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    Select one or more research sources. The more context you provide, the better AI can suggest relevant updates.
                  </p>
                </div>
              </div>

              {/* Selected Count */}
              <p className="text-sm font-medium">
                {selectedSources.length} source{selectedSources.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          )}

          {/* STEP 2: ANALYZING */}
          {step === 2 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-6" />
              <h3 className="text-xl font-semibold mb-6">Analyzing Research Insights</h3>

              <div className="w-full max-w-md space-y-4 mb-6">
                {[
                  'Loading research data',
                  'Extracting key findings',
                  `Analyzing current ${assetName}`,
                  'Identifying relevant insights',
                  'Comparing with existing content',
                  'Generating improvement suggestions',
                ].map((label, index) => {
                  const stepNumber = index + 1;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      {processingStep > stepNumber ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : processingStep === stepNumber ? (
                        <Loader2 className="h-5 w-5 text-primary animate-spin" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span
                        className={cn(
                          'text-sm',
                          processingStep >= stepNumber ? 'text-foreground' : 'text-muted-foreground'
                        )}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Processing {selectedSources.length} research source{selectedSources.length !== 1 ? 's' : ''}...
              </p>
            </div>
          )}

          {/* STEP 3: KEY FINDINGS */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Hero */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 text-center">
                <Lightbulb className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Key Findings from Your Research</h3>
                <p className="text-sm text-muted-foreground">
                  We analyzed {selectedSources.length} research source{selectedSources.length !== 1 ? 's' : ''} and identified 8 relevant insights that could inform your {assetName}.
                </p>
              </div>

              {/* Findings by Source */}
              {selectedSources.slice(0, 2).map((sourceId) => {
                const source = mockResearchSources.find((s) => s.id === sourceId);
                const findings = mockFindings[sourceId as keyof typeof mockFindings] || [];

                return (
                  <div key={sourceId}>
                    <h4 className="text-sm font-semibold mb-4">From: {source?.title}</h4>
                    <div className="border rounded-xl divide-y">
                      {findings.map((finding, idx) => {
                        const relevanceConfig = getRelevanceConfig(finding.relevance);
                        return (
                          <div key={idx} className="p-4">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex items-start gap-4">
                                <span className="text-2xl">{finding.icon}</span>
                                <div>
                                  <h5 className="font-semibold mb-1">{finding.title}</h5>
                                  <p className="text-sm text-muted-foreground italic">
                                    "{finding.quote}"
                                  </p>
                                </div>
                              </div>
                              <Badge className={cn('shrink-0 text-xs', relevanceConfig.className)}>
                                {relevanceConfig.label}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Summary */}
              <div className="border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">📊</span>
                  <h4 className="font-semibold">Relevance Analysis</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>High Relevance: 4 findings</span>
                    <span className="text-muted-foreground">These directly relate to mission</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Medium Relevance: 3 findings</span>
                    <span className="text-muted-foreground">These could influence positioning</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Low Relevance: 1 finding</span>
                    <span className="text-muted-foreground">Less applicable to mission</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: COMPARE & SUGGEST */}
          {step === 4 && (
            <div className="space-y-6">
              {/* Hero */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 text-center">
                <GitCompare className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Current vs. Suggested Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Based on your research findings, here's how your {assetName} compares to the new insights, and our suggested improvements.
                </p>
              </div>

              {/* Current Content */}
              <div className="border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">📄</span>
                  <h4 className="font-semibold">Current {assetName}</h4>
                </div>
                <p className="text-sm mb-6 italic text-muted-foreground">"{currentContent}"</p>

                {/* Gap Analysis */}
                <div className="bg-muted/50 rounded-xl p-4">
                  <h5 className="text-sm font-semibold mb-4">Gap Analysis</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>Missing: Customer-centricity focus</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>Missing: Trust and relationship emphasis</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>Missing: Sustainability/impact dimension</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                      <span>Present: Innovation focus</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                      <span>Present: Business growth orientation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div>
                <h4 className="text-sm font-semibold mb-4">AI Suggestions</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  We've generated 3 alternative versions based on the research insights:
                </p>

                <div className="space-y-4">
                  {mockSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className={cn(
                        'border rounded-xl p-6 cursor-pointer transition-all hover:border-primary',
                        selectedOption === suggestion.id && 'border-primary bg-primary/5'
                      )}
                      onClick={() => setSelectedOption(suggestion.id)}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full border-2 border-current shrink-0 mt-1">
                          {selectedOption === suggestion.id && (
                            <div className="h-3 w-3 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-semibold">
                              Option {suggestion.id.split('-')[1].toUpperCase()}: {suggestion.title}
                            </h5>
                            {suggestion.recommended && (
                              <Badge className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm mb-4 italic">"{suggestion.text}"</p>

                          <div className="space-y-2 text-sm">
                            <p className="font-medium">Changes from current:</p>
                            {suggestion.changes.added.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <Plus className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                                <span>Added: {item}</span>
                              </div>
                            ))}
                            {suggestion.changes.modified.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <RefreshCw className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                <span>Modified: {item}</span>
                              </div>
                            ))}
                            {suggestion.changes.removed.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <Minus className="h-4 w-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                                <span>Removed: {item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CONFIRM CHOICE */}
          {step === 5 && selectedOption && (
            <div className="space-y-6">
              {/* Hero */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 text-center">
                <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  You Selected: Option {selectedOption.split('-')[1].toUpperCase()}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {mockSuggestions.find((s) => s.id === selectedOption)?.title}
                </p>
              </div>

              {/* Side-by-Side Comparison */}
              <div>
                <h4 className="text-sm font-semibold mb-4">Side-by-Side Comparison</h4>
                <div className="grid grid-cols-2 gap-4">
                  {/* Before */}
                  <div className="border rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <h5 className="text-sm font-semibold">Before</h5>
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{currentContent}"</p>
                  </div>

                  {/* After */}
                  <div className="border rounded-xl p-6 bg-primary/5">
                    <div className="flex items-center gap-2 mb-4">
                      <h5 className="text-sm font-semibold">After</h5>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-semibold italic">
                      "{mockSuggestions.find((s) => s.id === selectedOption)?.text}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Change Summary */}
              <div className="border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">📊</span>
                  <h4 className="font-semibold">Change Summary</h4>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                      +{mockSuggestions.find((s) => s.id === selectedOption)?.changes.added.length}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Added</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                    <div className="text-2xl font-semibold text-amber-600 dark:text-amber-400">
                      ~{mockSuggestions.find((s) => s.id === selectedOption)?.changes.modified.length}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Modified</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                    <div className="text-2xl font-semibold text-red-600 dark:text-red-400">
                      -{mockSuggestions.find((s) => s.id === selectedOption)?.changes.removed.length}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Removed</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {mockSuggestions.find((s) => s.id === selectedOption)?.changes.added.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Plus className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                  {mockSuggestions.find((s) => s.id === selectedOption)?.changes.modified.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <RefreshCw className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                  {mockSuggestions.find((s) => s.id === selectedOption)?.changes.removed.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Minus className="h-4 w-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Sources Used */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-start gap-4">
                  <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                      Research Sources Used
                    </p>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      {selectedSources.map((sourceId) => {
                        const source = mockResearchSources.find((s) => s.id === sourceId);
                        return <li key={sourceId}>• {source?.title}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Choice */}
              <div>
                <h4 className="text-sm font-semibold mb-4">What would you like to do?</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={cn(
                      'border rounded-xl p-6 cursor-pointer transition-all hover:border-primary',
                      shouldRefine === true && 'border-primary bg-primary/5'
                    )}
                    onClick={() => setShouldRefine(true)}
                  >
                    <Edit className="h-5 w-5 text-primary mb-4" />
                    <h5 className="font-semibold mb-2">Refine this version</h5>
                    <p className="text-sm text-muted-foreground">
                      Make manual adjustments before finalizing
                    </p>
                  </div>
                  <div
                    className={cn(
                      'border rounded-xl p-6 cursor-pointer transition-all hover:border-primary',
                      shouldRefine === false && 'border-primary bg-primary/5'
                    )}
                    onClick={() => setShouldRefine(false)}
                  >
                    <Check className="h-5 w-5 text-primary mb-4" />
                    <h5 className="font-semibold mb-2">Accept as-is</h5>
                    <p className="text-sm text-muted-foreground">Use this exact text</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: REFINE CHANGES */}
          {step === 6 && (
            <div className="space-y-6">
              {/* Hero */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 text-center">
                <Edit className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Refine Your {assetName}</h3>
                <p className="text-sm text-muted-foreground">
                  Make any adjustments to perfect the wording. Your changes are highlighted in real-time.
                </p>
              </div>

              {/* Editor */}
              <div className="space-y-2">
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows={6}
                  className="resize-none text-sm"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {editedContent.length} chars
                </p>
              </div>

              {/* AI Writing Assistant */}
              <div className="border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">AI Writing Assistant</h4>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4">
                  <Button variant="outline" size="sm" className="text-xs">
                    Make Shorter
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Make it Bolder
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    More Specific
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Add Emotion
                  </Button>
                </div>

                <Input placeholder='Ask AI to help... e.g., "make it more inspiring"' />
              </div>

              {/* Original Reference */}
              <div className="border rounded-xl p-6 bg-muted/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📋</span>
                    <h4 className="font-semibold">Original for Reference</h4>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditedContent(currentContent)}
                  >
                    Restore
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground italic">"{currentContent}"</p>
              </div>
            </div>
          )}

          {/* STEP 7: CONFIRM & SAVE */}
          {step === 7 && (
            <div className="space-y-6">
              {/* Success State */}
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ready to Update</h3>
              </div>

              {/* Final Content */}
              <div className="border rounded-xl p-6 bg-primary/5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">📄</span>
                  <h4 className="font-semibold">Your New {assetName}</h4>
                </div>
                <p className="text-sm font-medium italic">
                  "{editedContent || mockSuggestions.find((s) => s.id === selectedOption)?.text}"
                </p>
              </div>

              {/* Update Summary */}
              <div className="border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">📊</span>
                  <h4 className="font-semibold">Update Summary</h4>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium mb-2">Research incorporated:</p>
                    <ul className="space-y-1">
                      {selectedSources.map((sourceId) => {
                        const source = mockResearchSources.find((s) => s.id === sourceId);
                        return (
                          <li key={sourceId} className="text-muted-foreground">
                            • {source?.title}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium mb-2">Key themes added:</p>
                    <ul className="space-y-1">
                      <li className="text-muted-foreground">• Customer-centricity</li>
                      <li className="text-muted-foreground">• Trust and simplicity</li>
                      <li className="text-muted-foreground">• Purposeful innovation</li>
                    </ul>
                  </div>

                  <p className="text-muted-foreground">
                    This update will be saved to your Brand Foundation.
                  </p>
                </div>
              </div>

              {/* Version History Option */}
              <div className="border rounded-xl p-4">
                <div className="flex items-start gap-4">
                  <Checkbox
                    id="keep-history"
                    checked={keepHistory}
                    onCheckedChange={(checked) => setKeepHistory(checked as boolean)}
                  />
                  <div>
                    <Label htmlFor="keep-history" className="cursor-pointer font-medium">
                      Keep previous version in history
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Save the original as a previous version for reference
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div>
            {step > 1 && step !== 2 && (
              <Button variant="ghost" onClick={handleBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            {step === 5 && shouldRefine !== null && (
              <Button variant="outline" onClick={() => setStep(4)}>
                Choose Different Option
              </Button>
            )}
            {step === 6 && (
              <Button variant="outline" onClick={() => setStep(5)}>
                Back to Suggestions
              </Button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {step === 2 && (
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}

            {step === 1 && (
              <>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={selectedSources.length === 0}
                  className="gap-2"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {step === 3 && (
              <Button onClick={handleNext} className="gap-2">
                See Suggestions
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}

            {step === 4 && (
              <Button
                onClick={handleNext}
                disabled={!selectedOption}
                className="gap-2"
              >
                Choose Option
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}

            {step === 5 && shouldRefine !== null && (
              <Button onClick={handleNext} className="gap-2">
                {shouldRefine ? 'Refine' : 'Skip to Confirm'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}

            {step === 6 && (
              <Button onClick={handleNext} className="gap-2">
                Finalize
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}

            {step === 7 && (
              <Button onClick={handleSave} className="gap-2">
                <Check className="h-4 w-4" />
                Save & Update
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}