import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  X,
  Plus,
  Database,
  Sparkles,
  ExternalLink,
  Lightbulb,
  Loader2,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { cn } from '../../lib/utils';

interface AddInsightModalProps {
  onClose: () => void;
  onAddInsight: (insight: any) => void;
  initialData?: any;
}

// Trend intelligence databases
const trendDatabases = [
  {
    id: 'wgsn',
    name: 'WGSN',
    badge: 'Enterprise',
    description: 'Global trend forecasting and consumer insights',
    categories: ['Fashion', 'Beauty', 'Lifestyle'],
    url: 'https://www.wgsn.com',
  },
  {
    id: 'mintel',
    name: 'Mintel',
    badge: 'Custom',
    description: 'Consumer market research and intel',
    categories: ['CPG', 'Retail', 'Food', 'Beauty'],
    url: 'https://www.mintel.com',
  },
  {
    id: 'gartner',
    name: 'Gartner',
    badge: 'Enterprise',
    description: 'Technology and business trend analysis',
    categories: ['Technology', 'Business', 'IT'],
    url: 'https://www.gartner.com',
  },
  {
    id: 'forrester',
    name: 'Forrester',
    badge: 'Enterprise',
    description: 'Customer experience and tech research',
    categories: ['CX', 'Digital', 'Marketing'],
    url: 'https://www.forrester.com',
  },
];

// Focus area options
const focusAreas = [
  { id: 'technology', label: 'Technology' },
  { id: 'consumer', label: 'Consumer Behavior' },
  { id: 'social', label: 'Social Trends' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'business', label: 'Business Models' },
  { id: 'marketing', label: 'Marketing Trends' },
];

// Industry options
const industries = [
  'E-commerce',
  'Technology',
  'Retail',
  'Healthcare',
  'Finance',
  'Fashion',
  'Food & Beverage',
  'Travel',
  'Entertainment',
  'Education',
  'Manufacturing',
  'Real Estate',
];

// Mock AI results
const mockAIResults = [
  {
    id: 'ai-1',
    title: 'AI-Powered Visual Search',
    category: 'technology',
    impact: 'high',
    timeframe: 'short-term',
    description: 'Consumers using images instead of text to find products',
    relevance: 92,
  },
  {
    id: 'ai-2',
    title: 'Conversational Commerce',
    category: 'technology',
    impact: 'high',
    timeframe: 'short-term',
    description: 'AI chatbots handling complete purchase journeys',
    relevance: 89,
  },
  {
    id: 'ai-3',
    title: 'Predictive Inventory Management',
    category: 'business',
    impact: 'medium',
    timeframe: 'medium-term',
    description: 'AI forecasting demand to optimize stock levels',
    relevance: 85,
  },
  {
    id: 'ai-4',
    title: 'Hyper-Personalized Pricing',
    category: 'consumer',
    impact: 'medium',
    timeframe: 'short-term',
    description: 'Dynamic pricing based on individual behavior patterns',
    relevance: 78,
  },
  {
    id: 'ai-5',
    title: 'AR-Enhanced Shopping Experiences',
    category: 'technology',
    impact: 'high',
    timeframe: 'medium-term',
    description: 'Augmented reality transforming online product discovery',
    relevance: 88,
  },
];

type AIResearchState = 'input' | 'processing' | 'results';

export function AddInsightModal({ onClose, onAddInsight, initialData }: AddInsightModalProps) {
  const [activeTab, setActiveTab] = useState<'ai' | 'manual' | 'database'>('ai');
  
  // AI Research state
  const [aiState, setAiState] = useState<AIResearchState>('input');
  const [aiQuery, setAiQuery] = useState('');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([
    'E-commerce',
    'Technology',
    'Retail',
  ]);
  const [timeframePreference, setTimeframePreference] = useState<'short' | 'all' | 'long'>('all');
  const [insightCount, setInsightCount] = useState(5);
  const [useBrandContext, setUseBrandContext] = useState(false);
  const [aiResults, setAiResults] = useState<any[]>([]);
  const [selectedResults, setSelectedResults] = useState<string[]>([]);
  const [processingStep, setProcessingStep] = useState(0);

  // Manual form state
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || '',
    impact: initialData?.impact || 'medium',
    timeframe: initialData?.timeframe || '',
    description: initialData?.description || '',
    relevantIndustries: initialData?.relevantIndustries || '',
    tags: initialData?.tags || '',
    relevance: initialData?.relevance || 75,
    sourceUrl: initialData?.sourceUrl || '',
  });

  const handleStartAIResearch = () => {
    setAiState('processing');
    setProcessingStep(0);

    // Simulate AI research process
    const steps = [
      () => setProcessingStep(1),
      () => setProcessingStep(2),
      () => setProcessingStep(3),
      () => setProcessingStep(4),
      () => setProcessingStep(5),
      () => {
        setAiResults(mockAIResults.slice(0, insightCount));
        setSelectedResults(mockAIResults.slice(0, insightCount).map(r => r.id));
        setAiState('results');
      },
    ];

    steps.forEach((step, index) => {
      setTimeout(step, (index + 1) * 800);
    });
  };

  const handleAddSelectedInsights = () => {
    const insightsToAdd = aiResults.filter(r => selectedResults.includes(r.id));
    
    insightsToAdd.forEach(result => {
      const insight = {
        id: `insight-${Date.now()}-${Math.random()}`,
        title: result.title,
        category: result.category,
        impact: result.impact,
        timeframe: result.timeframe,
        description: result.description,
        relevance: result.relevance,
        level: 'macro',
        tags: [],
        dateAdded: new Date().toISOString().split('T')[0],
      };
      onAddInsight(insight);
    });

    onClose();
  };

  const handleResearchAgain = () => {
    setAiState('input');
    setSelectedResults([]);
    setAiResults([]);
  };

  const handleManualSubmit = () => {
    const insight = {
      id: `insight-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      impact: formData.impact,
      timeframe: formData.timeframe,
      description: formData.description,
      relevance: formData.relevance,
      level: 'macro',
      tags: formData.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0),
      dateAdded: new Date().toISOString().split('T')[0],
    };
    onAddInsight(insight);
  };

  const isFormValid =
    formData.title.trim().length > 0 &&
    formData.category &&
    formData.description.trim().length >= 10 &&
    formData.timeframe;

  const isAIFormValid = aiQuery.trim().length > 0;

  const toggleFocusArea = (id: string) => {
    setSelectedFocusAreas(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const toggleResultSelection = (id: string) => {
    setSelectedResults(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedResults.length === aiResults.length) {
      setSelectedResults([]);
    } else {
      setSelectedResults(aiResults.map(r => r.id));
    }
  };

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close on Escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'High Impact';
      case 'medium':
        return 'Medium Impact';
      case 'low':
        return 'Low Impact';
      default:
        return impact;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
      case 'low':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-2xl bg-background rounded-2xl shadow-xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">Add Market Insight</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manually add an insight or let AI research trends for you
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as any)}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="border-b px-6">
            <TabsList className="grid w-full grid-cols-3 h-12">
              <TabsTrigger value="ai" className="gap-2">
                <Sparkles className="h-4 w-4" />
                AI Research
              </TabsTrigger>
              <TabsTrigger value="manual" className="gap-2">
                <Plus className="h-4 w-4" />
                Manual Entry
              </TabsTrigger>
              <TabsTrigger value="database" className="gap-2">
                <Database className="h-4 w-4" />
                Import from Database
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content - scrollable */}
          <div className="flex-1 overflow-y-auto">
            {/* AI RESEARCH TAB */}
            <TabsContent value="ai" className="p-6 mt-0">
              {aiState === 'input' && (
                <div className="space-y-6">
                  {/* Hero Section */}
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 text-center">
                    <Sparkles className="h-10 w-10 text-primary mx-auto mb-3" />
                    <h3 className="text-lg font-semibold mb-2">
                      Let AI discover relevant market insights
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI researches current trends, analyzes industry shifts, and finds
                      insights relevant to your brand and audience.
                    </p>
                  </div>

                  {/* Research Query */}
                  <div className="space-y-2">
                    <Label htmlFor="ai-query">What should AI research?</Label>
                    <Textarea
                      id="ai-query"
                      rows={3}
                      placeholder='e.g., "AI trends in e-commerce" or "sustainability in fashion industry" or "Gen Z consumer behavior"'
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                    />
                  </div>

                  {/* Focus Areas */}
                  <div className="space-y-2">
                    <Label>Focus Areas (optional)</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {focusAreas.map((area) => (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => toggleFocusArea(area.id)}
                          className={cn(
                            'border rounded-lg p-3 text-sm text-left transition-all',
                            selectedFocusAreas.includes(area.id)
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                'h-4 w-4 rounded border-2 flex items-center justify-center',
                                selectedFocusAreas.includes(area.id)
                                  ? 'border-primary bg-primary'
                                  : 'border-muted-foreground'
                              )}
                            >
                              {selectedFocusAreas.includes(area.id) && (
                                <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                              )}
                            </div>
                            <span className="font-medium">{area.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Industry Context */}
                  <div className="space-y-2">
                    <Label htmlFor="industries">Industry Context</Label>
                    <Select>
                      <SelectTrigger id="industries">
                        <SelectValue placeholder="Select industries..." />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedIndustries.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-sm text-muted-foreground">Selected:</span>
                        {selectedIndustries.map((industry) => (
                          <Badge key={industry} variant="secondary">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Timeframe Focus */}
                  <div className="space-y-2">
                    <Label>Timeframe Focus</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setTimeframePreference('short')}
                        className={cn(
                          'border rounded-lg p-3 text-sm text-center transition-all',
                          timeframePreference === 'short'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        <div className="font-medium mb-1">Short-Term</div>
                        <div className="text-xs text-muted-foreground">{'< 1 year'}</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTimeframePreference('all')}
                        className={cn(
                          'border rounded-lg p-3 text-sm text-center transition-all',
                          timeframePreference === 'all'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        <div className="font-medium mb-1">All Timeframes</div>
                        <div className="text-xs text-muted-foreground">&nbsp;</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTimeframePreference('long')}
                        className={cn(
                          'border rounded-lg p-3 text-sm text-center transition-all',
                          timeframePreference === 'long'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        <div className="font-medium mb-1">Long-Term</div>
                        <div className="text-xs text-muted-foreground">2+ years</div>
                      </button>
                    </div>
                  </div>

                  {/* Number of Insights */}
                  <div className="space-y-2">
                    <Label htmlFor="insight-count">Number of Insights</Label>
                    <div className="flex items-center gap-4">
                      <input
                        id="insight-count"
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={insightCount}
                        onChange={(e) => setInsightCount(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                            ((insightCount - 1) / 9) * 100
                          }%, hsl(var(--muted)) ${
                            ((insightCount - 1) / 9) * 100
                          }%, hsl(var(--muted)) 100%)`,
                        }}
                      />
                      <span className="text-lg font-semibold w-20 text-right">
                        {insightCount} insights
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>5</span>
                      <span>10</span>
                    </div>
                  </div>

                  {/* Brand Context */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="brand-context"
                        checked={useBrandContext}
                        onCheckedChange={(checked) => setUseBrandContext(checked as boolean)}
                      />
                      <div className="flex-1">
                        <Label htmlFor="brand-context" className="cursor-pointer font-medium">
                          Use my brand context
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          AI will consider your brand foundation, personas, and products when
                          finding relevant insights
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {aiState === 'processing' && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-12 w-12 text-primary animate-spin mb-6" />
                  <h3 className="text-lg font-semibold mb-6">Researching Market Insights</h3>
                  
                  <div className="w-full max-w-md space-y-3 mb-6">
                    {[
                      'Analyzing your research query',
                      'Scanning industry sources',
                      'Identifying relevant trends',
                      'Evaluating impact and relevance',
                      'Generating insight summaries',
                      'Calculating relevance scores',
                    ].map((step, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {processingStep > index ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : processingStep === index ? (
                          <Loader2 className="h-5 w-5 text-primary animate-spin" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                        <span
                          className={cn(
                            'text-sm',
                            processingStep >= index
                              ? 'text-foreground'
                              : 'text-muted-foreground'
                          )}
                        >
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground mb-6">
                    Finding {insightCount} insights for you...
                  </p>

                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              )}

              {aiState === 'results' && (
                <div className="space-y-6">
                  {/* Results Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">AI Research Results</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Found {aiResults.length} insights for "{aiQuery}"
                    </p>
                  </div>

                  {/* Results List */}
                  <div className="border rounded-lg divide-y">
                    {aiResults.map((result) => (
                      <div
                        key={result.id}
                        onClick={() => toggleResultSelection(result.id)}
                        className="w-full p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedResults.includes(result.id)}
                            onCheckedChange={() => toggleResultSelection(result.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-1">
                              <h4 className="font-semibold">{result.title}</h4>
                              <Badge className={cn('shrink-0', getImpactColor(result.impact))}>
                                {getImpactLabel(result.impact)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs text-muted-foreground capitalize">
                                {result.category}
                              </span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground capitalize">
                                {result.timeframe.replace('-', ' ')}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {result.description}
                            </p>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Relevance: </span>
                              <span className="font-semibold text-primary">
                                {result.relevance}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Select All */}
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedResults.length === aiResults.length}
                        onCheckedChange={toggleSelectAll}
                      />
                      <Label className="cursor-pointer" onClick={toggleSelectAll}>
                        Select All ({aiResults.length})
                      </Label>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {selectedResults.length} selected
                    </span>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* MANUAL ENTRY TAB */}
            <TabsContent value="manual" className="p-6 mt-0">
              <div className="space-y-6">
                {/* Section Header */}
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Insight Details</h3>
                    <p className="text-sm text-muted-foreground">
                      Define the core characteristics of this insight
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Insight Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g., AI-Powered Personalization"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  {/* Category, Impact, Timeframe */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(v) => setFormData({ ...formData, category: v })}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="consumer">Consumer</SelectItem>
                          <SelectItem value="social">Social</SelectItem>
                          <SelectItem value="environmental">Environmental</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="impact">Impact Level</Label>
                      <Select
                        value={formData.impact}
                        onValueChange={(v) => setFormData({ ...formData, impact: v })}
                      >
                        <SelectTrigger id="impact">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeframe">Timeframe</Label>
                      <Select
                        value={formData.timeframe}
                        onValueChange={(v) => setFormData({ ...formData, timeframe: v })}
                      >
                        <SelectTrigger id="timeframe">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short-term">Short-Term</SelectItem>
                          <SelectItem value="medium-term">Medium-Term</SelectItem>
                          <SelectItem value="long-term">Long-Term</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the trend and its implications..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  {/* Relevant Industries */}
                  <div className="space-y-2">
                    <Label htmlFor="industries">Relevant Industries</Label>
                    <Input
                      id="industries"
                      placeholder="E-commerce, Marketing, Technology (comma-separated)"
                      value={formData.relevantIndustries}
                      onChange={(e) =>
                        setFormData({ ...formData, relevantIndustries: e.target.value })
                      }
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (Keywords)</Label>
                    <Input
                      id="tags"
                      placeholder="AI, Personalization, Customer Experience"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    />
                  </div>

                  {/* Relevance Score */}
                  <div className="space-y-2">
                    <Label htmlFor="relevance">Relevance Score</Label>
                    <div className="flex items-center gap-4">
                      <input
                        id="relevance"
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={formData.relevance}
                        onChange={(e) =>
                          setFormData({ ...formData, relevance: parseInt(e.target.value) })
                        }
                        className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${formData.relevance}%, hsl(var(--muted)) ${formData.relevance}%, hsl(var(--muted)) 100%)`,
                        }}
                      />
                      <span className="text-lg font-semibold w-12 text-right">
                        {formData.relevance}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      How relevant is this insight to your brand strategy?
                    </p>
                  </div>

                  {/* Source URL */}
                  <div className="space-y-2">
                    <Label htmlFor="source">Source URL (optional)</Label>
                    <Input
                      id="source"
                      type="url"
                      placeholder="https://example.com/article"
                      value={formData.sourceUrl}
                      onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                    />
                  </div>

                  {/* Required fields note */}
                  <p className="text-xs text-muted-foreground">* Required fields</p>
                </div>
              </div>
            </TabsContent>

            {/* IMPORT FROM DATABASE TAB */}
            <TabsContent value="database" className="p-6 mt-0">
              <div className="space-y-6">
                {/* Info Banner */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        Professional Trend Intelligence Databases
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        These services provide expert-curated insights. Most require paid
                        subscriptions or enterprise licenses.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Database Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trendDatabases.map((db) => (
                    <Card key={db.id} className="rounded-xl">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <CardTitle className="text-base">{db.name}</CardTitle>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {db.badge}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-sm">{db.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Categories */}
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2">
                            Categories:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {db.categories.map((cat, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-2"
                            onClick={() => window.open(db.url, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Visit Website
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              alert(
                                `Connecting to ${db.name}...\n\nThis would typically require:\n• API credentials\n• OAuth setup\n• Data mapping\n\nContact ${db.name} sales for API access.`
                              );
                            }}
                          >
                            Connect
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Help box */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        Don't have access to these databases?
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        You can manually add insights using the Manual Entry tab.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>

          {/* Footer - conditional based on tab and state */}
          <div className="px-6 py-4 border-t flex items-center justify-end gap-3">
            {activeTab === 'ai' && aiState === 'input' && (
              <>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleStartAIResearch}
                  disabled={!isAIFormValid}
                  className="gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Start AI Research
                </Button>
              </>
            )}
            {activeTab === 'ai' && aiState === 'results' && (
              <>
                <Button variant="outline" onClick={handleResearchAgain}>
                  Research Again
                </Button>
                <Button
                  onClick={handleAddSelectedInsights}
                  disabled={selectedResults.length === 0}
                  className="gap-2"
                >
                  Add Selected Insights
                </Button>
              </>
            )}
            {activeTab === 'manual' && (
              <>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleManualSubmit} disabled={!isFormValid} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Insight
                </Button>
              </>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}