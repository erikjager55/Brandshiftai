/**
 * New Campaign Wizard
 * 5-step wizard for creating strategic campaigns
 * 
 * Steps:
 * 1. Campaign Setup - Name, type, timeline
 * 2. Select Knowledge - Brand assets, personas, products, insights
 * 3. AI Strategy - Generate and review AI strategy
 * 4. Deliverables - Choose content types and quantities
 * 5. Review & Launch - Final review and campaign creation
 */

import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Target,
  Users,
  Package,
  TrendingUp,
  BookOpen,
  FileText,
  Mail,
  MessageSquare,
  Linkedin,
  Twitter,
  Instagram,
  Plus,
  X,
  Loader2,
  CheckCircle2,
  Circle,
  Heart,
  Palette,
  ChevronDown,
  ChevronRight,
  Megaphone,
  Lightbulb,
  RefreshCw,
  Edit,
  Image,
} from 'lucide-react';
import { cn } from '../lib/utils';

interface NewCampaignWizardProps {
  onClose: () => void;
  onComplete?: (campaignId: string) => void;
}

interface CampaignSetup {
  name: string;
  description: string;
  type: 'brand' | 'product' | 'content' | 'engagement' | null;
  startDate: string;
  endDate: string;
}

interface SelectedKnowledge {
  brandAssets: string[];
  personas: string[];
  products: string[];
  insights: string[];
}

interface Deliverable {
  id: string;
  name: string;
  type: string;
  category: 'written' | 'social' | 'visual' | 'email';
  quantity: number;
}

interface GeneratedStrategy {
  approach: string;
  keyMessages: string[];
  audienceInsights: string;
  channels: string[];
  confidence: number;
}

const STEPS = [
  { id: 1, label: 'Setup' },
  { id: 2, label: 'Knowledge' },
  { id: 3, label: 'Strategy' },
  { id: 4, label: 'Deliverables' },
  { id: 5, label: 'Review' },
];

const CAMPAIGN_TYPES = [
  {
    id: 'brand',
    name: 'Brand Campaign',
    description: 'Build awareness and establish brand positioning',
    icon: Megaphone,
  },
  {
    id: 'product',
    name: 'Product Campaign',
    description: 'Promote specific products or services',
    icon: Package,
  },
  {
    id: 'content',
    name: 'Content Campaign',
    description: 'Create thought leadership and educational content',
    icon: FileText,
  },
  {
    id: 'engagement',
    name: 'Engagement Campaign',
    description: 'Drive audience interaction and community building',
    icon: Users,
  },
];

// Sample knowledge data
const SAMPLE_BRAND_ASSETS = [
  { id: 'ba-1', name: 'Mission Statement', status: 'validated' },
  { id: 'ba-2', name: 'Core Values', status: 'validated' },
  { id: 'ba-3', name: 'Brand Voice', status: 'in-progress' },
  { id: 'ba-4', name: 'Visual Identity', status: 'ready' },
];

const SAMPLE_PERSONAS = [
  { id: 'p-1', name: 'Sarah', role: 'Startup Founder', confidence: 25 },
  { id: 'p-2', name: 'Marcus', role: 'Marketing Director', confidence: 25 },
  { id: 'p-3', name: 'Lisa', role: 'Freelance Designer', confidence: 0 },
];

const SAMPLE_PRODUCTS = [
  { id: 'pr-1', name: 'Digital Platform Suite', type: 'Software' },
  { id: 'pr-2', name: 'Brand Strategy Consulting', type: 'Consulting' },
  { id: 'pr-3', name: 'Mobile App Framework', type: 'Mobile' },
];

const SAMPLE_INSIGHTS = [
  { id: 'mi-1', name: 'AI-Powered Personalization', impact: 'high' },
  { id: 'mi-2', name: 'Sustainability as Standard', impact: 'high' },
  { id: 'mi-3', name: 'Remote-First Work Culture', impact: 'high' },
  { id: 'mi-4', name: 'Micro-Moment Marketing', impact: 'high' },
  { id: 'mi-5', name: 'Community Commerce', impact: 'medium' },
  { id: 'mi-6', name: 'Privacy-First Data Strategies', impact: 'high' },
  { id: 'mi-7', name: 'Experience Economy', impact: 'high' },
];

const DELIVERABLE_OPTIONS = {
  written: [
    { id: 'blog', name: 'Blog Post', description: 'Long-form articles for your website', icon: FileText },
    { id: 'case-study', name: 'Case Study', description: 'Customer success stories', icon: BookOpen },
    { id: 'whitepaper', name: 'Whitepaper', description: 'In-depth research documents', icon: FileText },
    { id: 'press-release', name: 'Press Release', description: 'Official announcements', icon: Megaphone },
  ],
  social: [
    { id: 'linkedin', name: 'LinkedIn Post', description: 'Professional network updates', icon: Linkedin },
    { id: 'twitter', name: 'Twitter/X Thread', description: 'Threaded conversations', icon: Twitter },
    { id: 'instagram', name: 'Instagram Caption', description: 'Visual-first captions', icon: Instagram },
    { id: 'carousel', name: 'Social Carousel', description: 'Multi-slide posts', icon: Image },
  ],
  visual: [
    { id: 'infographic', name: 'Infographic', description: 'Data visualization graphics', icon: Image },
    { id: 'social-graphics', name: 'Social Graphics', description: 'Platform-optimized images', icon: Image },
    { id: 'presentation', name: 'Presentation', description: 'Slide decks', icon: FileText },
    { id: 'banner-ads', name: 'Banner Ads', description: 'Digital advertising creatives', icon: Image },
  ],
  email: [
    { id: 'newsletter', name: 'Newsletter', description: 'Regular subscriber updates', icon: Mail },
    { id: 'drip-campaign', name: 'Drip Campaign', description: 'Automated email sequence', icon: Mail },
    { id: 'promotional', name: 'Promotional Email', description: 'Sales and offers', icon: Mail },
    { id: 'welcome-series', name: 'Welcome Series', description: 'New subscriber onboarding', icon: Mail },
  ],
};

export function NewCampaignWizard({ onClose, onComplete }: NewCampaignWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  // Step 1: Campaign Setup
  const [setup, setSetup] = useState<CampaignSetup>({
    name: '',
    description: '',
    type: null,
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step 2: Knowledge Selection
  const [knowledge, setKnowledge] = useState<SelectedKnowledge>({
    brandAssets: [],
    personas: [],
    products: [],
    insights: [],
  });
  const [insightsExpanded, setInsightsExpanded] = useState(false);

  // Step 3: AI Strategy
  const [generatingStrategy, setGeneratingStrategy] = useState(false);
  const [strategy, setStrategy] = useState<GeneratedStrategy | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(['approach']);

  // Step 4: Deliverables
  const [selectedDeliverables, setSelectedDeliverables] = useState<Deliverable[]>([]);
  const [activeTab, setActiveTab] = useState<'written' | 'social' | 'visual' | 'email'>('written');

  // Step 5: Review
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);

  // Validation
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!setup.name.trim()) newErrors.name = 'Campaign name is required';
    if (!setup.type) newErrors.type = 'Please select a campaign type';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const total =
      knowledge.brandAssets.length +
      knowledge.personas.length +
      knowledge.products.length +
      knowledge.insights.length;
    return total > 0;
  };

  const validateStep4 = () => {
    return selectedDeliverables.length > 0;
  };

  const canContinue = () => {
    switch (currentStep) {
      case 1:
        return setup.name.trim() && setup.type;
      case 2:
        return (
          knowledge.brandAssets.length +
            knowledge.personas.length +
            knowledge.products.length +
            knowledge.insights.length >
          0
        );
      case 3:
        return strategy !== null;
      case 4:
        return selectedDeliverables.length > 0;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 4 && !validateStep4()) return;

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleLaunch();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateStrategy = () => {
    setGeneratingStrategy(true);
    // Simulate AI generation
    setTimeout(() => {
      setStrategy({
        approach:
          'This campaign will leverage your strong brand foundation and target personas to create authentic connections. We\'ll focus on educational content that demonstrates value while building trust with your audience.',
        keyMessages: [
          'Innovative solutions that empower creative professionals',
          'Built by designers, for designers - we understand your workflow',
          'Proven results with measurable ROI and transparent pricing',
        ],
        audienceInsights:
          'Your target audience is highly motivated by efficiency and creative freedom. They value tools that integrate seamlessly into their existing workflows.',
        channels: ['LinkedIn', 'Email', 'Blog', 'Instagram'],
        confidence: 87,
      });
      setGeneratingStrategy(false);
    }, 2000);
  };

  const handleLaunch = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onComplete?.('new-campaign-id');
    }, 2000);
  };

  const toggleKnowledgeItem = (category: keyof SelectedKnowledge, id: string) => {
    setKnowledge((prev) => ({
      ...prev,
      [category]: prev[category].includes(id)
        ? prev[category].filter((item) => item !== id)
        : [...prev[category], id],
    }));
  };

  const selectAllInCategory = (category: keyof SelectedKnowledge, items: any[]) => {
    const allIds = items.map((item) => item.id);
    const allSelected = allIds.every((id) => knowledge[category].includes(id));

    setKnowledge((prev) => ({
      ...prev,
      [category]: allSelected ? [] : allIds,
    }));
  };

  const toggleDeliverable = (option: any, category: 'written' | 'social' | 'visual' | 'email') => {
    const existing = selectedDeliverables.find((d) => d.id === option.id);

    if (existing) {
      setSelectedDeliverables(selectedDeliverables.filter((d) => d.id !== option.id));
    } else {
      setSelectedDeliverables([
        ...selectedDeliverables,
        {
          id: option.id,
          name: option.name,
          type: option.id,
          category,
          quantity: 1,
        },
      ]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setSelectedDeliverables(
      selectedDeliverables.map((d) =>
        d.id === id ? { ...d, quantity: Math.max(1, Math.min(10, d.quantity + delta)) } : d
      )
    );
  };

  const totalSelected =
    knowledge.brandAssets.length +
    knowledge.personas.length +
    knowledge.products.length +
    knowledge.insights.length;

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  return (
    <div className="fixed inset-0 bg-background overflow-y-auto">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full rounded-2xl p-8 text-center shadow-xl">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" />
            <h2 className="text-2xl font-semibold mt-4">Campaign Launched!</h2>
            <p className="text-muted-foreground mt-2">
              Your campaign is now active and ready for content creation.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button onClick={() => onComplete?.('new-campaign-id')} className="w-full">
                View Campaign
              </Button>
              <Button variant="outline" className="w-full">
                Create First Content
              </Button>
              <button
                onClick={onClose}
                className="text-sm text-muted-foreground hover:underline"
              >
                Back to Campaigns
              </button>
            </div>
          </Card>
        </div>
      )}

      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Campaigns
          </button>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-8">
          {STEPS.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all',
                    step.id < currentStep &&
                      'bg-green-600 border-green-600 text-white dark:bg-green-600 dark:border-green-600',
                    step.id === currentStep &&
                      'bg-primary border-primary text-primary-foreground',
                    step.id > currentStep && 'bg-background border-muted-foreground/30 text-muted-foreground'
                  )}
                >
                  {step.id < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                {/* Step Label */}
                <div
                  className={cn(
                    'text-xs mt-2 text-center',
                    step.id === currentStep && 'text-foreground font-medium',
                    step.id !== currentStep && 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </div>
              </div>
              {/* Connector Line */}
              {idx < STEPS.length - 1 && (
                <div
                  className={cn(
                    'w-16 h-0.5 mx-2 mb-6 transition-all',
                    step.id < currentStep ? 'bg-green-600' : 'bg-muted-foreground/30'
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Content Card */}
        <Card className="bg-card border rounded-2xl p-8 shadow-sm">
          {/* STEP 1: Campaign Setup */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">Campaign Setup</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Define the basics of your campaign
                </p>
              </div>

              {/* Campaign Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Campaign Name
                </Label>
                <Input
                  id="name"
                  value={setup.name}
                  onChange={(e) => setSetup({ ...setup, name: e.target.value })}
                  placeholder="e.g., Q1 Product Launch Campaign"
                  className={cn('rounded-lg border p-3', errors.name && 'border-red-500')}
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Campaign Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={setup.description}
                  onChange={(e) => setSetup({ ...setup, description: e.target.value })}
                  placeholder="Briefly describe the goals and scope of this campaign..."
                  className="rounded-lg border p-3 min-h-[100px]"
                />
              </div>

              {/* Campaign Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Campaign Type</Label>
                {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
                <div className="grid grid-cols-2 gap-4">
                  {CAMPAIGN_TYPES.map((type) => {
                    const Icon = type.icon;
                    const isSelected = setup.type === type.id;

                    return (
                      <div
                        key={type.id}
                        onClick={() => setSetup({ ...setup, type: type.id as any })}
                        className={cn(
                          'border rounded-xl p-4 cursor-pointer hover:bg-muted transition-colors',
                          isSelected && 'border-primary bg-primary/5'
                        )}
                      >
                        <Icon className="h-6 w-6 text-primary mb-2" />
                        <div className="font-medium">{type.name}</div>
                        <div className="text-sm text-muted-foreground">{type.description}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Target Timeline</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="date"
                      value={setup.startDate}
                      onChange={(e) => setSetup({ ...setup, startDate: e.target.value })}
                      className="rounded-lg border p-3"
                    />
                  </div>
                  <div>
                    <Input
                      type="date"
                      value={setup.endDate}
                      onChange={(e) => setSetup({ ...setup, endDate: e.target.value })}
                      className="rounded-lg border p-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Select Knowledge */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">Select Knowledge</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose the brand assets, personas, and insights to inform your campaign strategy
                </p>
              </div>

              {/* Info Banner */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  The more validated knowledge you select, the more accurate your AI-generated
                  strategy will be.
                </p>
              </div>

              {/* Brand Assets Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">Brand Assets</h3>
                    <span className="text-sm text-muted-foreground">
                      ({SAMPLE_BRAND_ASSETS.length} available)
                    </span>
                  </div>
                  <button
                    onClick={() => selectAllInCategory('brandAssets', SAMPLE_BRAND_ASSETS)}
                    className="text-sm text-primary hover:underline"
                  >
                    {knowledge.brandAssets.length === SAMPLE_BRAND_ASSETS.length
                      ? 'Deselect All'
                      : 'Select All'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {SAMPLE_BRAND_ASSETS.map((asset) => {
                    const isSelected = knowledge.brandAssets.includes(asset.id);

                    return (
                      <div
                        key={asset.id}
                        onClick={() => toggleKnowledgeItem('brandAssets', asset.id)}
                        className={cn(
                          'border rounded-xl p-4 cursor-pointer hover:bg-muted transition-all flex items-start gap-3',
                          isSelected && 'border-primary bg-primary/5'
                        )}
                      >
                        <div
                          className={cn(
                            'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0',
                            isSelected
                              ? 'bg-primary border-primary'
                              : 'border-muted-foreground/30'
                          )}
                        >
                          {isSelected && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{asset.name}</div>
                          <Badge
                            className={cn(
                              'text-xs px-2 py-0.5 rounded-full mt-1',
                              asset.status === 'validated' &&
                                'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
                              asset.status === 'in-progress' &&
                                'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
                              asset.status === 'ready' &&
                                'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            )}
                          >
                            {asset.status === 'validated'
                              ? 'Validated'
                              : asset.status === 'in-progress'
                              ? 'In Progress'
                              : 'Ready'}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Personas Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">Personas</h3>
                    <span className="text-sm text-muted-foreground">
                      ({SAMPLE_PERSONAS.length} available)
                    </span>
                  </div>
                  <button
                    onClick={() => selectAllInCategory('personas', SAMPLE_PERSONAS)}
                    className="text-sm text-primary hover:underline"
                  >
                    {knowledge.personas.length === SAMPLE_PERSONAS.length
                      ? 'Deselect All'
                      : 'Select All'}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {SAMPLE_PERSONAS.map((persona) => {
                    const isSelected = knowledge.personas.includes(persona.id);
                    const filled = Math.ceil(persona.confidence / 25);

                    return (
                      <div
                        key={persona.id}
                        onClick={() => toggleKnowledgeItem('personas', persona.id)}
                        className={cn(
                          'border rounded-xl p-4 cursor-pointer hover:bg-muted transition-all',
                          isSelected && 'border-primary bg-primary/5'
                        )}
                      >
                        <div className="flex flex-col items-center text-center relative">
                          <div
                            className={cn(
                              'absolute top-0 right-0 w-5 h-5 rounded border-2 flex items-center justify-center',
                              isSelected
                                ? 'bg-primary border-primary'
                                : 'border-muted-foreground/30'
                            )}
                          >
                            {isSelected && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <div className="w-12 h-12 rounded-full bg-muted mb-2 flex items-center justify-center">
                            <Users className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div className="text-sm font-medium">{persona.name}</div>
                          <div className="text-xs text-muted-foreground">{persona.role}</div>
                          <div className="flex items-center gap-1 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {persona.confidence}%
                            </span>
                            <div className="flex gap-1">
                              {[0, 1, 2, 3].map((i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    'w-1.5 h-1.5 rounded-full',
                                    i < filled ? 'bg-primary' : 'bg-muted'
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Products Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">Products & Services</h3>
                    <span className="text-sm text-muted-foreground">
                      ({SAMPLE_PRODUCTS.length} available)
                    </span>
                  </div>
                  <button
                    onClick={() => selectAllInCategory('products', SAMPLE_PRODUCTS)}
                    className="text-sm text-primary hover:underline"
                  >
                    {knowledge.products.length === SAMPLE_PRODUCTS.length
                      ? 'Deselect All'
                      : 'Select All'}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {SAMPLE_PRODUCTS.map((product) => {
                    const isSelected = knowledge.products.includes(product.id);

                    return (
                      <div
                        key={product.id}
                        onClick={() => toggleKnowledgeItem('products', product.id)}
                        className={cn(
                          'border rounded-xl p-4 cursor-pointer hover:bg-muted transition-all',
                          isSelected && 'border-primary bg-primary/5'
                        )}
                      >
                        <div className="flex flex-col items-center text-center relative">
                          <div
                            className={cn(
                              'absolute top-0 right-0 w-5 h-5 rounded border-2 flex items-center justify-center',
                              isSelected
                                ? 'bg-primary border-primary'
                                : 'border-muted-foreground/30'
                            )}
                          >
                            {isSelected && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <Package className="h-8 w-8 text-muted-foreground mb-2" />
                          <div className="text-sm font-medium">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.type}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Market Insights Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">Market Insights</h3>
                    <span className="text-sm text-muted-foreground">
                      ({SAMPLE_INSIGHTS.length} available)
                    </span>
                  </div>
                  <button
                    onClick={() => setInsightsExpanded(!insightsExpanded)}
                    className="text-sm text-primary hover:underline"
                  >
                    {insightsExpanded ? 'Collapse' : 'Show all'}
                  </button>
                </div>

                {insightsExpanded && (
                  <div className="grid grid-cols-2 gap-3">
                    {SAMPLE_INSIGHTS.map((insight) => {
                      const isSelected = knowledge.insights.includes(insight.id);

                      return (
                        <div
                          key={insight.id}
                          onClick={() => toggleKnowledgeItem('insights', insight.id)}
                          className={cn(
                            'border rounded-xl p-3 cursor-pointer hover:bg-muted transition-all flex items-start gap-3',
                            isSelected && 'border-primary bg-primary/5'
                          )}
                        >
                          <div
                            className={cn(
                              'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
                              isSelected
                                ? 'bg-primary border-primary'
                                : 'border-muted-foreground/30'
                            )}
                          >
                            {isSelected && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{insight.name}</div>
                            <Badge
                              className={cn(
                                'text-xs px-2 py-0.5 rounded-full mt-1',
                                insight.impact === 'high'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                  : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                              )}
                            >
                              {insight.impact === 'high' ? 'High Impact' : 'Medium Impact'}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {!insightsExpanded && (
                  <div className="text-sm text-muted-foreground">
                    {knowledge.insights.length} insights selected
                  </div>
                )}
              </div>

              {/* Selection Summary */}
              <div className="bg-muted/50 rounded-xl p-4 mt-6">
                <div className="text-sm">
                  <span className="font-medium">Selected:</span> {knowledge.brandAssets.length}{' '}
                  brand assets, {knowledge.personas.length} personas, {knowledge.products.length}{' '}
                  products, {knowledge.insights.length} insights
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: AI Strategy */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">Generate Strategy</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Our AI will create a tailored campaign strategy based on your selected knowledge
                </p>
              </div>

              {!strategy && !generatingStrategy && (
                <>
                  {/* Initial State */}
                  <div className="border-2 border-dashed rounded-2xl p-12 text-center">
                    <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Ready to Generate Your Strategy</h3>
                    <p className="text-muted-foreground mb-6">
                      Based on your {totalSelected} selected knowledge items, we'll create a
                      comprehensive campaign strategy.
                    </p>
                    <Button size="lg" onClick={handleGenerateStrategy} className="gap-2">
                      <Sparkles className="h-4 w-4" />
                      Generate Strategy
                    </Button>
                  </div>

                  {/* Selected Items Summary */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {knowledge.brandAssets.map((id) => {
                      const asset = SAMPLE_BRAND_ASSETS.find((a) => a.id === id);
                      return (
                        <Badge
                          key={id}
                          variant="secondary"
                          className="rounded-full px-3 py-1 flex items-center gap-1"
                        >
                          {asset?.name}
                          <button
                            onClick={() => toggleKnowledgeItem('brandAssets', id)}
                            className="ml-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      );
                    })}
                    {knowledge.personas.map((id) => {
                      const persona = SAMPLE_PERSONAS.find((p) => p.id === id);
                      return (
                        <Badge
                          key={id}
                          variant="secondary"
                          className="rounded-full px-3 py-1 flex items-center gap-1"
                        >
                          {persona?.name}
                          <button
                            onClick={() => toggleKnowledgeItem('personas', id)}
                            className="ml-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Loading State */}
              {generatingStrategy && (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
                  <h3 className="text-xl font-semibold mt-4">Generating Your Strategy...</h3>
                  <p className="text-muted-foreground mt-1">This usually takes 15-30 seconds</p>
                  <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                      Analyzing brand assets...
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                      Understanding target personas...
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      Crafting strategic recommendations...
                    </div>
                    <div className="flex items-center gap-2 justify-center text-muted-foreground/50">
                      <Circle className="h-4 w-4" />
                      Finalizing campaign approach...
                    </div>
                  </div>
                </div>
              )}

              {/* Generated State */}
              {strategy && !generatingStrategy && (
                <div className="space-y-4">
                  {/* Strategy Header */}
                  <div>
                    <Badge className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      AI Generated
                    </Badge>
                    <h3 className="text-xl font-semibold mt-2">Campaign Strategy</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">Strategy Confidence:</span>
                      <span className="text-sm font-medium">{strategy.confidence}%</span>
                      <Progress value={strategy.confidence} className="h-2 w-32" />
                    </div>
                  </div>

                  {/* Strategy Sections */}
                  <div className="space-y-3">
                    {/* Strategic Approach */}
                    <div className="border rounded-xl">
                      <button
                        onClick={() => toggleSection('approach')}
                        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 rounded-xl transition-colors"
                      >
                        <span className="font-semibold flex items-center gap-2">
                          Strategic Approach
                        </span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            expandedSections.includes('approach') && 'rotate-180'
                          )}
                        />
                      </button>
                      {expandedSections.includes('approach') && (
                        <div className="px-4 pb-4">
                          <p className="text-sm text-muted-foreground">{strategy.approach}</p>
                        </div>
                      )}
                    </div>

                    {/* Key Messages */}
                    <div className="border rounded-xl">
                      <button
                        onClick={() => toggleSection('messages')}
                        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 rounded-xl transition-colors"
                      >
                        <span className="font-semibold">Key Messages</span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            expandedSections.includes('messages') && 'rotate-180'
                          )}
                        />
                      </button>
                      {expandedSections.includes('messages') && (
                        <div className="px-4 pb-4 space-y-2">
                          {strategy.keyMessages.map((message, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <p className="text-sm">{message}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Audience Insights */}
                    <div className="border rounded-xl">
                      <button
                        onClick={() => toggleSection('audience')}
                        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 rounded-xl transition-colors"
                      >
                        <span className="font-semibold">Target Audience Insights</span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            expandedSections.includes('audience') && 'rotate-180'
                          )}
                        />
                      </button>
                      {expandedSections.includes('audience') && (
                        <div className="px-4 pb-4">
                          <p className="text-sm text-muted-foreground">
                            {strategy.audienceInsights}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Recommended Channels */}
                    <div className="border rounded-xl">
                      <button
                        onClick={() => toggleSection('channels')}
                        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 rounded-xl transition-colors"
                      >
                        <span className="font-semibold">Recommended Channels</span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            expandedSections.includes('channels') && 'rotate-180'
                          )}
                        />
                      </button>
                      {expandedSections.includes('channels') && (
                        <div className="px-4 pb-4">
                          <div className="flex flex-wrap gap-2">
                            {strategy.channels.map((channel) => (
                              <Badge
                                key={channel}
                                variant="secondary"
                                className="rounded-full px-3 py-1"
                              >
                                {channel}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Regenerate
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Strategy
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Deliverables */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">Choose Deliverables</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Select the content types you want to create for this campaign
                </p>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="written">Written Content</TabsTrigger>
                  <TabsTrigger value="social">Social Media</TabsTrigger>
                  <TabsTrigger value="visual">Visual Assets</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>

                {Object.entries(DELIVERABLE_OPTIONS).map(([category, options]) => (
                  <TabsContent key={category} value={category} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {options.map((option) => {
                        const Icon = option.icon;
                        const selected = selectedDeliverables.find((d) => d.id === option.id);

                        return (
                          <div
                            key={option.id}
                            className={cn(
                              'border rounded-xl p-4 cursor-pointer hover:border-primary/50 transition-all',
                              selected && 'border-primary bg-primary/5 shadow-sm'
                            )}
                          >
                            <div
                              onClick={() =>
                                toggleDeliverable(option, category as any)
                              }
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <Icon className="h-6 w-6 text-muted-foreground" />
                                <div>
                                  <div className="font-medium">{option.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {option.description}
                                  </div>
                                </div>
                              </div>
                              <div
                                className={cn(
                                  'w-5 h-5 rounded border-2 flex items-center justify-center',
                                  selected
                                    ? 'bg-primary border-primary'
                                    : 'border-muted-foreground/30'
                                )}
                              >
                                {selected && <Check className="h-3 w-3 text-white" />}
                              </div>
                            </div>

                            {selected && (
                              <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                                <span className="text-sm font-medium">Quantity:</span>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-8 h-8 p-0 rounded-lg"
                                    onClick={() => updateQuantity(option.id, -1)}
                                  >
                                    -
                                  </Button>
                                  <span className="w-8 text-center text-sm font-medium">
                                    {selected.quantity}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-8 h-8 p-0 rounded-lg"
                                    onClick={() => updateQuantity(option.id, 1)}
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              {/* Selected Summary */}
              {selectedDeliverables.length > 0 && (
                <div className="bg-muted rounded-xl p-4 flex items-center justify-between">
                  <div className="font-medium">
                    {selectedDeliverables.length} deliverable
                    {selectedDeliverables.length !== 1 && 's'} selected
                  </div>
                  <button className="text-sm text-primary hover:underline">View list</button>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Review & Launch */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">Review & Launch</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Review your campaign setup before launching
                </p>
              </div>

              {/* Campaign Details */}
              <div className="border rounded-xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Campaign Details</h3>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-sm text-primary hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span> {setup.name}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>{' '}
                    {CAMPAIGN_TYPES.find((t) => t.id === setup.type)?.name}
                  </div>
                  {setup.startDate && setup.endDate && (
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Timeline:</span> {setup.startDate} -{' '}
                      {setup.endDate}
                    </div>
                  )}
                  {setup.description && (
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Description:</span>{' '}
                      {setup.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Knowledge */}
              <div className="border rounded-xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Selected Knowledge</h3>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-sm text-primary hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Brand Assets ({knowledge.brandAssets.length}):</span>{' '}
                    {knowledge.brandAssets
                      .map((id) => SAMPLE_BRAND_ASSETS.find((a) => a.id === id)?.name)
                      .join(', ')}
                  </div>
                  <div>
                    <span className="font-medium">Personas ({knowledge.personas.length}):</span>{' '}
                    {knowledge.personas
                      .map((id) => SAMPLE_PERSONAS.find((p) => p.id === id)?.name)
                      .join(', ')}
                  </div>
                  {knowledge.products.length > 0 && (
                    <div>
                      <span className="font-medium">Products ({knowledge.products.length}):</span>{' '}
                      {knowledge.products
                        .map((id) => SAMPLE_PRODUCTS.find((p) => p.id === id)?.name)
                        .join(', ')}
                    </div>
                  )}
                  {knowledge.insights.length > 0 && (
                    <div>
                      <span className="font-medium">Insights ({knowledge.insights.length}):</span>{' '}
                      {knowledge.insights.length} market insights selected
                    </div>
                  )}
                </div>
              </div>

              {/* Strategy Summary */}
              {strategy && (
                <div className="border rounded-xl p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">AI Strategy</h3>
                      <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                        {strategy.confidence}% Confidence
                      </Badge>
                    </div>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="space-y-1 text-sm">
                    {strategy.keyMessages.slice(0, 2).map((msg, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{msg}</span>
                      </div>
                    ))}
                    <button className="text-primary text-sm hover:underline">
                      Show full strategy
                    </button>
                  </div>
                </div>
              )}

              {/* Deliverables */}
              <div className="border rounded-xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Deliverables ({selectedDeliverables.length})</h3>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="text-sm text-primary hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedDeliverables.map((d) => (
                    <div key={d.id} className="text-sm text-muted-foreground">
                      {d.quantity}× {d.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Estimated Timeline */}
              <div className="border rounded-xl p-6">
                <h3 className="font-semibold mb-2">Estimated Timeline</h3>
                <p className="text-sm text-muted-foreground">
                  Estimated completion: 2-3 weeks based on deliverable complexity
                </p>
              </div>

              {/* Save as Template */}
              <div className="flex items-center gap-2 pt-6 border-t">
                <input
                  type="checkbox"
                  id="save-template"
                  checked={saveAsTemplate}
                  onChange={(e) => setSaveAsTemplate(e.target.checked)}
                  className="w-4 h-4 rounded border-muted-foreground"
                />
                <label htmlFor="save-template" className="text-sm cursor-pointer">
                  Save as template for future campaigns
                </label>
              </div>
            </div>
          )}
        </Card>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between mt-8">
          {currentStep > 1 ? (
            <Button variant="outline" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <Button onClick={handleNext} disabled={!canContinue()} className="gap-2">
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleLaunch} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Launch Campaign
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
