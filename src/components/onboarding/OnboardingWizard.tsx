import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';
import {
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  User,
  Target,
  Hexagon,
  FileText,
  Heart,
  Flag,
  Microscope,
  PenTool,
  LayoutDashboard,
  RefreshCw,
  Edit,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingWizardProps {
  onComplete?: (data: OnboardingData) => void;
  onSkip?: () => void;
}

interface OnboardingData {
  brandProfile: {
    name: string;
    industry: string;
    companySize: string;
    description: string;
  };
  targetAudience: {
    template?: string;
    customDescription?: string;
  };
  firstAsset: {
    type: string;
    content?: string;
  };
}

interface PersonaTemplate {
  id: string;
  name: string;
  ageRange: string;
  keyTrait: string;
  description: string;
}

interface AssetOption {
  id: string;
  name: string;
  description: string;
  icon: any;
  timeEstimate: string;
  recommended?: boolean;
}

const steps = ['Brand Profile', 'Audience', 'First Asset', 'Complete'];

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Retail',
  'Education',
  'Manufacturing',
  'Professional Services',
  'Media & Entertainment',
  'Other',
];

const personaTemplates: PersonaTemplate[] = [
  {
    id: 'tech-professional',
    name: 'Tech-Savvy Professional',
    ageRange: '25-40',
    keyTrait: 'Early adopter',
    description: 'Values innovation and efficiency',
  },
  {
    id: 'value-buyer',
    name: 'Value-Conscious Buyer',
    ageRange: '30-50',
    keyTrait: 'Price-sensitive',
    description: 'Seeks best value for money',
  },
  {
    id: 'enterprise-decision',
    name: 'Enterprise Decision Maker',
    ageRange: '35-55',
    keyTrait: 'B2B focused',
    description: 'Strategic and risk-averse',
  },
  {
    id: 'creative-entrepreneur',
    name: 'Creative Entrepreneur',
    ageRange: '22-38',
    keyTrait: 'Innovation-driven',
    description: 'Values creativity and uniqueness',
  },
];

const assetOptions: AssetOption[] = [
  {
    id: 'golden-circle',
    name: 'Golden Circle (Why/How/What)',
    description: 'Define your purpose, process, and product',
    icon: Target,
    timeEstimate: '~5 min',
    recommended: true,
  },
  {
    id: 'positioning',
    name: 'Brand Positioning Statement',
    description: 'Clarify your unique market position',
    icon: Hexagon,
    timeEstimate: '~5 min',
  },
  {
    id: 'values',
    name: 'Core Values',
    description: 'Establish guiding principles',
    icon: Heart,
    timeEstimate: '~3 min',
  },
  {
    id: 'mission',
    name: 'Mission Statement',
    description: 'Define your brand mission',
    icon: Flag,
    timeEstimate: '~3 min',
  },
];

export function OnboardingWizard({ onComplete, onSkip }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Step 1: Brand Profile
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [brandDescription, setBrandDescription] = useState('');

  // Step 2: Target Audience
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customAudience, setCustomAudience] = useState('');
  const [useTemplate, setUseTemplate] = useState(true);

  // Step 3: First Asset
  const [selectedAsset, setSelectedAsset] = useState('golden-circle');
  const [generatedContent, setGeneratedContent] = useState('');

  const maxDescriptionChars = 500;

  const canContinueStep = () => {
    switch (currentStep) {
      case 0:
        return brandName.trim() !== '' && industry !== '' && companySize !== '';
      case 1:
        return (useTemplate && selectedTemplate !== '') || (!useTemplate && customAudience.trim() !== '');
      case 2:
        return selectedAsset !== '';
      default:
        return true;
    }
  };

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    const data: OnboardingData = {
      brandProfile: {
        name: brandName,
        industry,
        companySize,
        description: brandDescription,
      },
      targetAudience: {
        template: useTemplate ? selectedTemplate : undefined,
        customDescription: !useTemplate ? customAudience : undefined,
      },
      firstAsset: {
        type: selectedAsset,
        content: generatedContent,
      },
    };

    // Set flag for First Value Moment to show on dashboard
    sessionStorage.setItem('onboarding-completed', 'true');

    onComplete?.(data);
  };

  const handleAIAssist = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setBrandDescription(
      `${brandName} is a leading ${industry.toLowerCase()} company committed to delivering exceptional value through innovation and customer-centric solutions. We combine cutting-edge technology with deep industry expertise to help our clients achieve their goals.`
    );
    setIsGenerating(false);
  };

  const handleGenerateAsset = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const templates = {
      'golden-circle': `WHY: ${brandName} exists to transform how ${industry.toLowerCase()} companies deliver value to their customers.\n\nHOW: We combine innovative technology with human-centered design to create solutions that truly resonate.\n\nWHAT: We provide ${industry.toLowerCase()} solutions that help businesses grow and thrive in a competitive market.`,
      'positioning': `For [target customer] who [need/opportunity], ${brandName} is a [product category] that [key benefit]. Unlike [competitors], ${brandName} [unique differentiator].`,
      'values': `• Innovation: We push boundaries and embrace new ideas\n• Integrity: We do the right thing, always\n• Excellence: We deliver quality in everything we do\n• Customer Focus: Our customers' success is our success\n• Collaboration: We achieve more together`,
      'mission': `${brandName}'s mission is to empower ${industry.toLowerCase()} organizations with innovative solutions that drive sustainable growth and create lasting value for all stakeholders.`,
    };

    setGeneratedContent(templates[selectedAsset as keyof typeof templates] || '');
    setIsGenerating(false);
  };

  useEffect(() => {
    if (currentStep === 2 && !generatedContent) {
      handleGenerateAsset();
    }
  }, [currentStep, selectedAsset]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Bar - Sticky Header */}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">Brandshift.ai</h1>
            <button
              onClick={onSkip}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip Setup
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const isUpcoming = index > currentStep;

              return (
                <React.Fragment key={step}>
                  <div className="flex items-center gap-4">
                    {/* Step Indicator */}
                    <div
                      className={cn(
                        'flex items-center justify-center h-10 w-10 rounded-full transition-colors',
                        isCompleted && 'bg-green-100 dark:bg-green-900/30',
                        isActive && 'bg-primary/10',
                        isUpcoming && 'bg-muted'
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <Circle
                          className={cn(
                            'h-5 w-5',
                            isActive && 'fill-primary text-primary',
                            isUpcoming && 'text-muted-foreground'
                          )}
                        />
                      )}
                    </div>

                    {/* Step Label */}
                    <span
                      className={cn(
                        'text-sm font-medium transition-colors',
                        isActive && 'text-primary',
                        isCompleted && 'text-foreground',
                        isUpcoming && 'text-muted-foreground'
                      )}
                    >
                      {step}
                    </span>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'flex-1 h-0.5 mx-4',
                        index < currentStep ? 'bg-green-600' : 'bg-muted'
                      )}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-12">
          <AnimatePresence mode="wait">
            {/* Step 1: Brand Profile */}
            {currentStep === 0 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Header */}
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-semibold">Tell us about your brand</h2>
                  <p className="text-muted-foreground">
                    This helps us personalize your experience
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Form */}
                  <div className="rounded-xl border p-6 space-y-6">
                    {/* Brand Name */}
                    <div className="space-y-2">
                      <Label htmlFor="brand-name" className="text-sm font-medium">
                        Brand/Company Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="brand-name"
                        placeholder="Your brand name"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="rounded-lg"
                      />
                    </div>

                    {/* Industry */}
                    <div className="space-y-2">
                      <Label htmlFor="industry" className="text-sm font-medium">
                        Industry <span className="text-red-500">*</span>
                      </Label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((ind) => (
                            <SelectItem key={ind} value={ind}>
                              {ind}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Company Size */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Company Size <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup value={companySize} onValueChange={setCompanySize}>
                        <div className="space-y-2">
                          {['1-10', '11-50', '51-200', '200+'].map((size) => (
                            <div key={size} className="flex items-center gap-2">
                              <RadioGroupItem value={size} id={`size-${size}`} />
                              <Label
                                htmlFor={`size-${size}`}
                                className="text-sm font-medium cursor-pointer"
                              >
                                {size} employees
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Brand Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Brand Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your brand in a few sentences..."
                        value={brandDescription}
                        onChange={(e) => {
                          if (e.target.value.length <= maxDescriptionChars) {
                            setBrandDescription(e.target.value);
                          }
                        }}
                        className="rounded-lg min-h-[120px]"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {brandDescription.length}/{maxDescriptionChars}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleAIAssist}
                          disabled={!brandName || !industry || isGenerating}
                          className="gap-2"
                        >
                          <Sparkles className="h-4 w-4" />
                          {isGenerating ? 'Generating...' : 'Help me write this'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Live Preview */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Your Brand Card</h3>
                    <div className="rounded-xl border p-6 space-y-4 bg-card">
                      <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-semibold text-primary">
                          {brandName.charAt(0).toUpperCase() || '?'}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-semibold">
                          {brandName || 'Your Brand Name'}
                        </h4>
                        {industry && (
                          <Badge className="rounded-full">{industry}</Badge>
                        )}
                        {companySize && (
                          <p className="text-sm text-muted-foreground">
                            {companySize} employees
                          </p>
                        )}
                      </div>
                      {brandDescription && (
                        <p className="text-sm text-muted-foreground">
                          {brandDescription}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Target Audience */}
            {currentStep === 1 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Header */}
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-semibold">Who is your ideal customer?</h2>
                  <p className="text-muted-foreground">
                    We'll create your first persona based on this
                  </p>
                </div>

                {/* Template / Custom Toggle */}
                <div className="flex justify-center gap-4">
                  <Button
                    variant={useTemplate ? 'default' : 'outline'}
                    onClick={() => setUseTemplate(true)}
                  >
                    Choose Template
                  </Button>
                  <Button
                    variant={!useTemplate ? 'default' : 'outline'}
                    onClick={() => setUseTemplate(false)}
                  >
                    Describe Custom
                  </Button>
                </div>

                {useTemplate ? (
                  <>
                    {/* Quick Select Templates */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-center">
                        Choose a starting template
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {personaTemplates.map((template) => (
                          <div
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={cn(
                              'rounded-xl border p-6 cursor-pointer transition-all hover:border-primary',
                              selectedTemplate === template.id &&
                                'border-primary bg-primary/5'
                            )}
                          >
                            <div className="flex items-start gap-4">
                              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                <User className="h-6 w-6 text-muted-foreground" />
                              </div>
                              <div className="flex-1 space-y-2">
                                <h4 className="text-lg font-semibold">
                                  {template.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {template.ageRange} • {template.keyTrait}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {template.description}
                                </p>
                              </div>
                              {selectedTemplate === template.id && (
                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Custom Description */}
                    <div className="max-w-2xl mx-auto space-y-4">
                      <h3 className="text-lg font-semibold text-center">
                        Describe your audience
                      </h3>
                      <Textarea
                        placeholder="Tell us about your ideal customer: their goals, challenges, demographics, behaviors..."
                        value={customAudience}
                        onChange={(e) => setCustomAudience(e.target.value)}
                        className="rounded-lg min-h-[200px]"
                      />
                      <p className="text-sm text-muted-foreground text-center">
                        Our AI will generate a detailed persona from your description
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Step 3: First Asset */}
            {currentStep === 2 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Header */}
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-semibold">
                    Let's create your first brand asset
                  </h2>
                  <p className="text-muted-foreground">
                    Choose what matters most to you right now
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Asset Options */}
                  <div className="space-y-4">
                    {assetOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <div
                          key={option.id}
                          onClick={() => setSelectedAsset(option.id)}
                          className={cn(
                            'rounded-xl border p-6 cursor-pointer transition-all hover:border-primary',
                            selectedAsset === option.id &&
                              'border-primary bg-primary/5'
                          )}
                        >
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <h4 className="text-lg font-semibold">
                                  {option.name}
                                </h4>
                                {option.recommended && (
                                  <Badge className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                    Recommended
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {option.description}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {option.timeEstimate}
                              </p>
                            </div>
                            {selectedAsset === option.id && (
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* AI Generation Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">AI-Generated Draft</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleGenerateAsset}
                        disabled={isGenerating}
                        className="gap-2"
                      >
                        <RefreshCw
                          className={cn(
                            'h-4 w-4',
                            isGenerating && 'animate-spin'
                          )}
                        />
                        Regenerate
                      </Button>
                    </div>

                    <div className="rounded-xl border p-6 bg-card min-h-[400px]">
                      {isGenerating ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center space-y-4">
                            <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto" />
                            <p className="text-sm text-muted-foreground">
                              Generating your {assetOptions.find(a => a.id === selectedAsset)?.name.toLowerCase()}...
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Textarea
                            value={generatedContent}
                            onChange={(e) => setGeneratedContent(e.target.value)}
                            className="rounded-lg min-h-[350px] font-mono text-sm"
                          />
                          <Button variant="outline" size="sm" className="gap-2 w-full">
                            <Edit className="h-4 w-4" />
                            Edit Content
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Complete */}
            {currentStep === 3 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-12 text-center"
              >
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="flex justify-center"
                >
                  <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </div>
                </motion.div>

                {/* Header */}
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold">You're all set! 🎉</h2>
                  <p className="text-lg text-muted-foreground">
                    Your brand foundation is ready
                  </p>
                </div>

                {/* Summary */}
                <div className="max-w-md mx-auto rounded-xl border p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm">Brand profile created</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm">First persona created</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm">First brand asset created</span>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Research coverage</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[15%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-xl font-semibold mb-6">What's next?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-xl border p-6 text-center space-y-4 hover:bg-muted/50 transition-colors">
                      <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto">
                        <Microscope className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">
                          Validate with Research
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Start your first research study
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border p-6 text-center space-y-4 hover:bg-muted/50 transition-colors">
                      <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto">
                        <PenTool className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">
                          Create Content
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Generate your first content piece
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border p-6 text-center space-y-4 hover:bg-muted/50 transition-colors">
                      <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                        <LayoutDashboard className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">
                          Explore Dashboard
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          See your brand overview
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button size="lg" onClick={handleComplete} className="gap-2 px-8">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer - Navigation */}
      {currentStep < 3 && (
        <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-5xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <p className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </p>

              <Button
                onClick={handleContinue}
                disabled={!canContinueStep()}
                className="gap-2"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}