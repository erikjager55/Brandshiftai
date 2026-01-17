import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { 
  Users, 
  Eye,
  Target,
  Heart,
  Globe,
  TrendingUp,
  CheckCircle,
  Clock,
  ShoppingCart,
  Euro,
  Info,
  ChevronRight,
  X,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  ClipboardList,
  Check,
  ArrowRight,
  Sparkles,
  AlertCircle,
  UserCheck,
  Calendar,
  FileText,
  Zap,
  BarChart3
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';

interface ResearchApproachSelectionProps {
  onApproachPurchase: (config: {
    approachId: string;
    selectedAssets: string[];
    configuration: any;
  }) => void;
  onCancel: () => void;
}

// Available brand assets
const allAssets = [
  { id: 'vision-mission', name: 'Vision & Mission Statement', icon: Eye, type: 'Strategy', category: 'foundation' },
  { id: 'core-values', name: 'Core Values', icon: Heart, type: 'Culture', category: 'foundation' },
  { id: 'golden-circle', name: 'Golden Circle Framework', icon: Target, type: 'Foundation', category: 'foundation' },
  { id: 'brand-positioning', name: 'Brand Positioning', icon: Target, type: 'Strategy', category: 'strategy' },
  { id: 'brand-archetype', name: 'Brand Archetype', icon: Users, type: 'Personality', category: 'culture' },
  { id: 'social-relevancy', name: 'Social Relevancy', icon: Globe, type: 'Purpose', category: 'market' },
  { id: 'trends', name: 'Market Trends', icon: TrendingUp, type: 'Context', category: 'market' }
];

// Research approaches with metadata
const researchApproaches = [
  {
    id: 'workshop',
    name: 'Brainstorm Session',
    tagline: 'Facilitated collaborative discovery',
    description: 'Group workshop with AI facilitation for rapid brand alignment',
    icon: Lightbulb,
    defaultAssets: ['vision-mission', 'core-values', 'golden-circle'],
    pricing: {
      base: 199,
      perAsset: 25,
      bundleDiscount: 15
    },
    metadata: {
      timePerAsset: 35,
      minParticipants: 4,
      maxParticipants: 8,
      facilitatorRequired: true,
      effortLevel: 'Facilitated',
      evidenceDepth: 'Exploratory',
      outputFormat: 'Group consensus canvas',
      validationType: 'Team alignment',
      bestFor: 'Strategy alignment & team consensus',
      timeline: '1 session (2-4 hours)',
      recommended: ['small', 'fast']
    },
    benefits: [
      'Real-time collaboration with team',
      'AI-guided facilitation',
      'Immediate consensus building',
      'Visual canvas outputs'
    ],
    antiPattern: 'Not ideal for teams >10 or distributed teams without video conferencing'
  },
  {
    id: 'interviews',
    name: '1-on-1 Interviews',
    tagline: 'Deep individual perspectives',
    description: 'Structured interviews with key stakeholders for nuanced insights',
    icon: MessageSquare,
    defaultAssets: ['vision-mission', 'core-values', 'brand-positioning'],
    pricing: {
      base: 149,
      perAsset: 15,
      bundleDiscount: 20,
      perInterview: 45
    },
    metadata: {
      timePerAsset: 25,
      minParticipants: 3,
      maxParticipants: 20,
      facilitatorRequired: false,
      effortLevel: 'Self-guided',
      evidenceDepth: 'Validated',
      outputFormat: 'Individual transcripts + synthesis',
      validationType: 'Multiple perspectives',
      bestFor: 'Individual insights & diverse viewpoints',
      timeline: '3-10 interviews (1-2 weeks)',
      recommended: ['medium', 'depth']
    },
    benefits: [
      'Capture diverse perspectives',
      'Structured interview guides',
      'Individual depth per stakeholder',
      'AI synthesis across interviews'
    ],
    antiPattern: 'Time-intensive for teams needing immediate results'
  },
  {
    id: 'questionnaire',
    name: 'Online Survey',
    tagline: 'Broad quantitative validation',
    description: 'Scalable questionnaire for statistical validation across large groups',
    icon: ClipboardList,
    defaultAssets: ['core-values', 'brand-archetype', 'social-relevancy'],
    pricing: {
      base: 99,
      perAsset: 12,
      bundleDiscount: 10
    },
    metadata: {
      timePerAsset: 15,
      minParticipants: 10,
      maxParticipants: 1000,
      facilitatorRequired: false,
      effortLevel: 'Self-guided',
      evidenceDepth: 'Statistical',
      outputFormat: 'Data dashboard + insights',
      validationType: 'Quantitative validation',
      bestFor: 'Broad validation & trend identification',
      timeline: '1-2 weeks (async)',
      recommended: ['large', 'validation']
    },
    benefits: [
      'Scale to unlimited respondents',
      'Statistical significance',
      'Async participation',
      'Automated analysis'
    ],
    antiPattern: 'Limited depth compared to interviews; not ideal for exploratory discovery'
  }
];

// Research programs (multi-approach bundles)
const researchPrograms = [
  {
    id: 'starter',
    name: 'Starter Program',
    description: 'Foundation-building with team alignment',
    approaches: ['workshop'],
    totalAssets: 3,
    price: 199,
    savings: 0,
    badge: 'Quick Start'
  },
  {
    id: 'professional',
    name: 'Professional Program',
    description: 'Comprehensive insights from multiple angles',
    approaches: ['workshop', 'interviews'],
    totalAssets: 6,
    price: 449,
    originalPrice: 529,
    savings: 80,
    badge: 'Most Popular'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Program',
    description: 'Complete research suite for validated strategy',
    approaches: ['workshop', 'interviews', 'questionnaire'],
    totalAssets: 9,
    price: 699,
    originalPrice: 879,
    savings: 180,
    badge: 'Best Value'
  }
];

export function ResearchApproachSelection({ onApproachPurchase, onCancel }: ResearchApproachSelectionProps) {
  const [selectedApproach, setSelectedApproach] = useState<string | null>(null);
  const [selectedAssets, setSelectedAssets] = useState<Record<string, string[]>>({});
  const [showDecisionWizard, setShowDecisionWizard] = useState(false);
  const [showScopeReview, setShowScopeReview] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardAnswers, setWizardAnswers] = useState<Record<string, string>>({});
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [expandedApproach, setExpandedApproach] = useState<string | null>(null);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedMultipleApproaches, setSelectedMultipleApproaches] = useState<string[]>([]);

  // Decision wizard questions
  const wizardQuestions = [
    {
      id: 'team-size',
      question: 'What is your team size?',
      options: [
        { value: 'small', label: 'Small (< 5 people)', icon: Users },
        { value: 'medium', label: 'Medium (5-20 people)', icon: Users },
        { value: 'large', label: 'Large (20+ people)', icon: Users }
      ]
    },
    {
      id: 'timeline',
      question: 'What is your timeline?',
      options: [
        { value: 'fast', label: 'Urgent (1 week)', icon: Zap },
        { value: 'moderate', label: 'Standard (2-4 weeks)', icon: Calendar },
        { value: 'thorough', label: 'Thorough (4+ weeks)', icon: Clock }
      ]
    },
    {
      id: 'depth',
      question: 'What level of depth do you need?',
      options: [
        { value: 'exploratory', label: 'Exploratory (get started)', icon: Lightbulb },
        { value: 'depth', label: 'Deep insights (validated)', icon: MessageSquare },
        { value: 'validation', label: 'Statistical validation', icon: BarChart3 }
      ]
    }
  ];

  const getRecommendedApproach = () => {
    const teamSize = wizardAnswers['team-size'];
    const timeline = wizardAnswers['timeline'];
    const depth = wizardAnswers['depth'];

    // Simple recommendation logic
    if (depth === 'validation' || teamSize === 'large') {
      return 'questionnaire';
    } else if (depth === 'depth' || teamSize === 'medium') {
      return 'interviews';
    } else if (timeline === 'fast' || teamSize === 'small') {
      return 'workshop';
    }
    return 'workshop';
  };

  const toggleAssetForApproach = (approachId: string, assetId: string) => {
    setSelectedAssets(prev => {
      const currentAssets = prev[approachId] || [];
      const newAssets = currentAssets.includes(assetId)
        ? currentAssets.filter(id => id !== assetId)
        : [...currentAssets, assetId];
      return { ...prev, [approachId]: newAssets };
    });
  };

  const getSelectedAssetsForApproach = (approachId: string) => {
    return selectedAssets[approachId] || researchApproaches.find(a => a.id === approachId)?.defaultAssets || [];
  };

  const calculatePrice = (approachId: string) => {
    const approach = researchApproaches.find(a => a.id === approachId);
    if (!approach) return 0;

    const assets = getSelectedAssetsForApproach(approachId);
    const additionalAssets = assets.length - (approach.defaultAssets.length || 0);
    const additionalCost = Math.max(0, additionalAssets) * approach.pricing.perAsset;
    
    return approach.pricing.base + additionalCost;
  };

  const handleProceedToReview = () => {
    if (!selectedApproach && !multiSelectMode) return;
    setShowScopeReview(true);
  };

  const handleConfirmPurchase = () => {
    if (selectedApproach) {
      onApproachPurchase({
        approachId: selectedApproach,
        selectedAssets: getSelectedAssetsForApproach(selectedApproach),
        configuration: {}
      });
    }
  };

  const toggleMultiApproach = (approachId: string) => {
    setSelectedMultipleApproaches(prev => 
      prev.includes(approachId)
        ? prev.filter(id => id !== approachId)
        : [...prev, approachId]
    );
  };

  const ComparisonTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 font-medium text-muted-foreground w-1/4">Dimension</th>
            {researchApproaches.map(approach => {
              const Icon = approach.icon;
              return (
                <th key={approach.id} className="p-4 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{approach.name}</div>
                      <div className="text-xs text-muted-foreground font-normal">{approach.tagline}</div>
                    </div>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-muted/50">
            <td className="p-4 font-medium">Default Assets Covered</td>
            {researchApproaches.map(approach => (
              <td key={approach.id} className="p-4 text-center">
                <Badge variant="secondary" className="mb-2">
                  {approach.defaultAssets.length} assets included
                </Badge>
                <div className="flex flex-wrap gap-1 justify-center mt-2">
                  {approach.defaultAssets.map(assetId => {
                    const asset = allAssets.find(a => a.id === assetId);
                    if (!asset) return null;
                    const AssetIcon = asset.icon;
                    return (
                      <Badge key={assetId} variant="outline" className="text-xs">
                        <AssetIcon className="h-3 w-3 mr-1" />
                        {asset.name}
                      </Badge>
                    );
                  })}
                </div>
              </td>
            ))}
          </tr>
          <tr className="border-b hover:bg-muted/50">
            <td className="p-4 font-medium">Time Investment</td>
            {researchApproaches.map(approach => (
              <td key={approach.id} className="p-4 text-center text-sm">
                <div className="font-medium">{approach.metadata.timeline}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  ~{approach.metadata.timePerAsset}min per asset
                </div>
              </td>
            ))}
          </tr>
          <tr className="border-b hover:bg-muted/50">
            <td className="p-4 font-medium">Participants</td>
            {researchApproaches.map(approach => (
              <td key={approach.id} className="p-4 text-center text-sm">
                <div className="font-medium">
                  {approach.metadata.minParticipants}-{approach.metadata.maxParticipants === 1000 ? '∞' : approach.metadata.maxParticipants}
                </div>
                <div className="text-xs text-muted-foreground mt-1">participants</div>
              </td>
            ))}
          </tr>
          <tr className="border-b hover:bg-muted/50">
            <td className="p-4 font-medium">Effort Level</td>
            {researchApproaches.map(approach => (
              <td key={approach.id} className="p-4 text-center text-sm">
                <Badge variant={approach.metadata.facilitatorRequired ? 'default' : 'outline'}>
                  {approach.metadata.effortLevel}
                </Badge>
                {approach.metadata.facilitatorRequired && (
                  <div className="text-xs text-muted-foreground mt-1">Facilitator required</div>
                )}
              </td>
            ))}
          </tr>
          <tr className="border-b hover:bg-muted/50">
            <td className="p-4 font-medium">Evidence Depth</td>
            {researchApproaches.map(approach => (
              <td key={approach.id} className="p-4 text-center text-sm">
                <div className="font-medium">{approach.metadata.evidenceDepth}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {approach.metadata.validationType}
                </div>
              </td>
            ))}
          </tr>
          <tr className="border-b hover:bg-muted/50">
            <td className="p-4 font-medium">Output Format</td>
            {researchApproaches.map(approach => (
              <td key={approach.id} className="p-4 text-center text-sm">
                {approach.metadata.outputFormat}
              </td>
            ))}
          </tr>
          <tr className="border-b hover:bg-muted/50">
            <td className="p-4 font-medium">Best For</td>
            {researchApproaches.map(approach => (
              <td key={approach.id} className="p-4 text-center text-sm">
                {approach.metadata.bestFor}
              </td>
            ))}
          </tr>
          <tr className="border-b hover:bg-muted/50">
            <td className="p-4 font-medium">Starting Price</td>
            {researchApproaches.map(approach => (
              <td key={approach.id} className="p-4 text-center">
                <div className="text-2xl font-bold text-primary flex items-center justify-center">
                  <Euro className="h-5 w-5" />
                  {approach.pricing.base}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  includes {approach.defaultAssets.length} assets
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  const ApproachCard = ({ approach }: { approach: typeof researchApproaches[0] }) => {
    const Icon = approach.icon;
    const isSelected = selectedApproach === approach.id;
    const isExpanded = expandedApproach === approach.id;
    const currentAssets = getSelectedAssetsForApproach(approach.id);
    const price = calculatePrice(approach.id);

    return (
      <Card 
        className={`transition-all ${
          isSelected 
            ? 'border-primary ring-2 ring-primary shadow-lg' 
            : 'hover:border-primary/50 hover:shadow-md'
        }`}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg mb-1">{approach.name}</CardTitle>
                <CardDescription className="text-sm">{approach.tagline}</CardDescription>
              </div>
            </div>
            {isSelected && <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{approach.description}</p>

          {/* Default assets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Includes {approach.defaultAssets.length} assets by default:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {approach.defaultAssets.map(assetId => {
                const asset = allAssets.find(a => a.id === assetId);
                if (!asset) return null;
                const AssetIcon = asset.icon;
                return (
                  <Badge key={assetId} variant="secondary" className="text-xs">
                    <AssetIcon className="h-3 w-3 mr-1" />
                    {asset.name}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Key benefits */}
          <div className="space-y-2">
            {approach.benefits.slice(0, 3).map((benefit, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Metadata highlights */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-muted rounded-lg">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Timeline</div>
              <div className="text-sm font-medium">{approach.metadata.timeline.split('(')[0].trim()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Evidence</div>
              <div className="text-sm font-medium">{approach.metadata.evidenceDepth}</div>
            </div>
          </div>

          {/* Price */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Starting price</div>
                <div className="text-2xl font-bold text-primary flex items-center mt-1">
                  <Euro className="h-5 w-5" />
                  {approach.pricing.base}
                </div>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                {approach.defaultAssets.length} assets<br />
                +€{approach.pricing.perAsset} per add-on
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-2">
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => {
                setSelectedApproach(approach.id);
                setExpandedApproach(approach.id);
                if (!selectedAssets[approach.id]) {
                  setSelectedAssets(prev => ({ ...prev, [approach.id]: approach.defaultAssets }));
                }
              }}
              variant={isSelected ? 'default' : 'outline'}
            >
              {isSelected ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Selected
                </>
              ) : (
                <>
                  Select {approach.name}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
            
            {isSelected && (
              <Button 
                variant="outline" 
                className="w-full" 
                size="sm"
                onClick={() => setExpandedApproach(isExpanded ? null : approach.id)}
              >
                {isExpanded ? 'Hide' : 'Customize'} Assets
                <ChevronRight className={`h-4 w-4 ml-2 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </Button>
            )}
          </div>

          {/* Expanded configuration */}
          {isExpanded && isSelected && (
            <div className="mt-4 pt-4 border-t space-y-3">
              <h4 className="font-medium text-sm">Customize Assets ({currentAssets.length} selected)</h4>
              <div className="grid grid-cols-1 gap-2">
                {allAssets.map(asset => {
                  const AssetIcon = asset.icon;
                  const isIncluded = currentAssets.includes(asset.id);
                  const isDefault = approach.defaultAssets.includes(asset.id);
                  
                  return (
                    <div
                      key={asset.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                        isIncluded 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => toggleAssetForApproach(approach.id, asset.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox checked={isIncluded} />
                        <AssetIcon className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">{asset.name}</div>
                          <div className="text-xs text-muted-foreground">{asset.type}</div>
                        </div>
                      </div>
                      {isDefault && (
                        <Badge variant="secondary" className="text-xs">Included</Badge>
                      )}
                      {!isDefault && isIncluded && (
                        <span className="text-xs text-muted-foreground">+€{approach.pricing.perAsset}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Anti-pattern warning */}
          {isSelected && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 dark:text-amber-100">
                  <strong>Note:</strong> {approach.antiPattern}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const DecisionWizardModal = () => {
    const currentQuestion = wizardQuestions[wizardStep - 1];
    const progress = (wizardStep / wizardQuestions.length) * 100;
    const isLastStep = wizardStep === wizardQuestions.length;
    const recommendedApproach = isLastStep ? researchApproaches.find(a => a.id === getRecommendedApproach()) : null;

    return (
      <Dialog open={showDecisionWizard} onOpenChange={setShowDecisionWizard}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span>Find Your Ideal Research Approach</span>
            </DialogTitle>
            <DialogDescription>
              Answer 3 quick questions to get a personalized recommendation
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Question {wizardStep} of {wizardQuestions.length}</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>

            {!isLastStep ? (
              <>
                {/* Question */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
                  <RadioGroup
                    value={wizardAnswers[currentQuestion.id]}
                    onValueChange={(value) => setWizardAnswers(prev => ({ ...prev, [currentQuestion.id]: value }))}
                  >
                    <div className="space-y-3">
                      {currentQuestion.options.map(option => {
                        const OptionIcon = option.icon;
                        return (
                          <div key={option.value} className="flex items-center space-x-3">
                            <RadioGroupItem value={option.value} id={option.value} />
                            <Label 
                              htmlFor={option.value} 
                              className="flex items-center space-x-3 flex-1 cursor-pointer p-3 border rounded-lg hover:border-primary transition-all"
                            >
                              <OptionIcon className="h-5 w-5 text-primary" />
                              <span>{option.label}</span>
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </RadioGroup>
                </div>
              </>
            ) : (
              <>
                {/* Recommendation */}
                {recommendedApproach && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-primary">
                      <Sparkles className="h-5 w-5" />
                      <h3 className="text-lg font-semibold">We Recommend: {recommendedApproach.name}</h3>
                    </div>
                    
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm mb-3">{recommendedApproach.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Best for:</span>
                          <span className="font-medium">{recommendedApproach.metadata.bestFor}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Timeline:</span>
                          <span className="font-medium">{recommendedApproach.metadata.timeline}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Default assets:</span>
                          <span className="font-medium">{recommendedApproach.defaultAssets.length} included</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-900 dark:text-blue-100">
                          Based on your answers: {wizardAnswers['team-size']} team, {wizardAnswers['timeline']} timeline, {wizardAnswers['depth']} depth
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <DialogFooter className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => {
                if (wizardStep > 1) {
                  setWizardStep(wizardStep - 1);
                } else {
                  setShowDecisionWizard(false);
                  setWizardStep(1);
                  setWizardAnswers({});
                }
              }}
            >
              {wizardStep > 1 ? 'Back' : 'Cancel'}
            </Button>
            <Button 
              onClick={() => {
                if (isLastStep) {
                  setShowDecisionWizard(false);
                  setSelectedApproach(getRecommendedApproach());
                  setWizardStep(1);
                } else {
                  setWizardStep(wizardStep + 1);
                }
              }}
              disabled={!isLastStep && !wizardAnswers[currentQuestion?.id]}
            >
              {isLastStep ? 'Select This Approach' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const ScopeReviewModal = () => {
    if (!selectedApproach) return null;
    
    const approach = researchApproaches.find(a => a.id === selectedApproach);
    if (!approach) return null;

    const assets = getSelectedAssetsForApproach(selectedApproach);
    const price = calculatePrice(selectedApproach);

    return (
      <Dialog open={showScopeReview} onOpenChange={setShowScopeReview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Review & Confirm Your Research Approach</span>
            </DialogTitle>
            <DialogDescription>
              Verify the scope and impact before starting your research
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Configuration Summary */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Selected Approach</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    {React.createElement(approach.icon, { className: "h-8 w-8 text-primary" })}
                    <div>
                      <div className="font-semibold">{approach.name}</div>
                      <div className="text-sm text-muted-foreground">{approach.tagline}</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Timeline:</span>
                      <span className="font-medium">{approach.metadata.timeline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Evidence depth:</span>
                      <span className="font-medium">{approach.metadata.evidenceDepth}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Output format:</span>
                      <span className="font-medium">{approach.metadata.outputFormat}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Participants:</span>
                      <span className="font-medium">
                        {approach.metadata.minParticipants}-{approach.metadata.maxParticipants === 1000 ? '∞' : approach.metadata.maxParticipants}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Total Investment</span>
                      <div className="text-2xl font-bold text-primary flex items-center">
                        <Euro className="h-5 w-5" />
                        {price}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {assets.length} assets • {approach.metadata.timeline}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Asset Manifest */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Assets to be Unlocked</CardTitle>
                  <CardDescription>
                    These {assets.length} assets will show as "Approved" across your library
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {assets.map(assetId => {
                      const asset = allAssets.find(a => a.id === assetId);
                      if (!asset) return null;
                      const AssetIcon = asset.icon;
                      const isDefault = approach.defaultAssets.includes(assetId);

                      return (
                        <div key={assetId} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <AssetIcon className="h-5 w-5 text-primary" />
                            <div>
                              <div className="text-sm font-medium">{asset.name}</div>
                              <div className="text-xs text-muted-foreground">{asset.type}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs text-muted-foreground">
                              Empty
                            </Badge>
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            <Badge variant="default" className="text-xs">
                              Approved
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-900 dark:text-blue-100">
                        After purchase, these assets will display insights from your {approach.name.toLowerCase()} and show an "Approved via {approach.name}" badge on each asset page.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setShowScopeReview(false)}>
              Back to Configuration
            </Button>
            <Button size="lg" onClick={handleConfirmPurchase}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Start Research (€{price})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">How Do You Want to Build Your Brand?</h1>
              <p className="text-muted-foreground">
                Each research approach covers multiple brand assets through different research methods
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Quick actions */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setShowDecisionWizard(true);
                setWizardStep(1);
                setWizardAnswers({});
              }}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help Me Choose
            </Button>
            <Badge variant="secondary" className="cursor-pointer">
              <UserCheck className="h-3 w-3 mr-1" />
              For teams with medium to high brand maturity
            </Badge>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Comparison Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-primary" />
              Compare Research Approaches
            </CardTitle>
            <CardDescription>
              Understand the differences to choose the right method for your situation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ComparisonTable />
          </CardContent>
        </Card>

        {/* Approach Cards */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Select Your Research Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchApproaches.map(approach => (
              <ApproachCard key={approach.id} approach={approach} />
            ))}
          </div>
        </div>

        {/* Research Programs */}
        <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-primary" />
                  Build a Comprehensive Research Program
                </CardTitle>
                <CardDescription className="mt-2">
                  Combine multiple approaches for deeper insights and save up to 25%
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {researchPrograms.map(program => (
                <div
                  key={program.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedProgram === program.id
                      ? 'border-primary bg-primary/5 ring-2 ring-primary'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedProgram(program.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{program.name}</h4>
                        {program.badge && (
                          <Badge variant="secondary" className="text-xs">{program.badge}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{program.description}</p>
                    </div>
                    {selectedProgram === program.id && (
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 ml-2" />
                    )}
                  </div>

                  <div className="space-y-2 mb-3">
                    {program.approaches.map(approachId => {
                      const approach = researchApproaches.find(a => a.id === approachId);
                      if (!approach) return null;
                      const Icon = approach.icon;
                      return (
                        <div key={approachId} className="flex items-center space-x-2 text-sm">
                          <Icon className="h-4 w-4 text-primary" />
                          <span>{approach.name}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between p-3 bg-background rounded border border-dashed">
                    <div>
                      {program.savings > 0 && (
                        <div className="text-xs text-muted-foreground line-through">
                          €{program.originalPrice}
                        </div>
                      )}
                      <div className="text-xl font-bold text-primary flex items-center">
                        <Euro className="h-4 w-4" />
                        {program.price}
                      </div>
                    </div>
                    {program.savings > 0 && (
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                        Save €{program.savings}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-3 text-xs text-muted-foreground text-center">
                    Unlocks {program.totalAssets} assets
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action bar */}
        {selectedApproach && (
          <div className="sticky bottom-6 bg-background border rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Selected approach:</div>
                <div className="font-semibold text-lg">
                  {researchApproaches.find(a => a.id === selectedApproach)?.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {getSelectedAssetsForApproach(selectedApproach).length} assets selected
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Total investment</div>
                  <div className="text-2xl font-bold text-primary flex items-center">
                    <Euro className="h-5 w-5" />
                    {calculatePrice(selectedApproach)}
                  </div>
                </div>
                <Button size="lg" onClick={handleProceedToReview}>
                  Review & Confirm
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <DecisionWizardModal />
      <ScopeReviewModal />
    </div>
  );
}