import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Target,
  Users,
  Clock,
  TrendingUp,
  Shield,
  Sparkles,
  Award,
  BarChart3,
  Lightbulb,
  AlertCircle,
  Check,
  Zap,
  Eye,
  Heart,
  Globe,
  MessageSquare,
  Book,
  Rocket,
  Mic,
  ClipboardList,
  PresentationIcon as Presentation,
  Users2,
  Brain,
  X,
  Plus,
  Minus,
  UserCheck,
  Wand,
  Bot,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ValidationPlanLandingPageProps {
  onBack: () => void;
  onStartPlan: (selectedAssets: string[], selectedMethods: string[]) => void;
}

// Available brand assets for validation
const availableAssets = [
  { 
    id: '1', 
    name: 'Golden Circle', 
    category: 'Foundation', 
    icon: Target, 
    description: 'Core purpose and value proposition',
    details: 'Why you exist, how you do it, and what you offer',
    estimatedTime: '2-3 weeks',
    recommended: true,
  },
  { 
    id: '2', 
    name: 'Vision Statement', 
    category: 'Strategy', 
    icon: Eye, 
    description: 'Future aspirations and direction',
    details: 'Where you want to be in 5-10 years',
    estimatedTime: '1-2 weeks',
    recommended: true,
  },
  { 
    id: '3', 
    name: 'Mission Statement', 
    category: 'Strategy', 
    icon: Zap, 
    description: 'Current purpose and activities',
    details: 'What you do and who you serve today',
    estimatedTime: '1-2 weeks',
    recommended: false,
  },
  { 
    id: '4', 
    name: 'Brand Archetype', 
    category: 'Personality', 
    icon: Users, 
    description: 'Personality framework and traits',
    details: 'Your brand personality and character',
    estimatedTime: '2-3 weeks',
    recommended: false,
  },
  { 
    id: '5', 
    name: 'Core Values', 
    category: 'Culture', 
    icon: Heart, 
    description: 'Guiding principles and beliefs',
    details: 'What you stand for and believe in',
    estimatedTime: '2-3 weeks',
    recommended: true,
  },
  { 
    id: '6', 
    name: 'Brand Story', 
    category: 'Narrative', 
    icon: Book, 
    description: 'Origin, journey, and purpose',
    details: 'Your brand narrative and history',
    estimatedTime: '1-2 weeks',
    recommended: false,
  },
];

// ✅ TAAK 1 & 2: Consistente namen en valuta (USD)
const validationMethods = [
  {
    id: 'ai-exploration',
    name: 'AI Exploration',
    icon: Bot,
    description: 'AI-powered analysis of your brand assets and market positioning',
    confidence: 'Low Confidence',
    confidenceBadgeClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', // ✅ TAAK 5: Amber voor Low
    pricePerUnit: 0,
    priceLabel: 'FREE',
    unit: 'analysis',
    minQuantity: 1,
    maxQuantity: 5,
    defaultQuantity: 1,
    increment: 1,
  },
  {
    id: 'questionnaire',
    name: 'Questionnaire', // ✅ TAAK 1: Consistent met Brand Asset Detail
    icon: ClipboardList,
    description: 'Quantitative validation through structured questionnaires',
    confidence: 'Medium Confidence',
    confidenceBadgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', // ✅ TAAK 5: Blue voor Medium
    pricePerUnit: 10,
    priceLabel: '$10/response', // ✅ TAAK 2: Consistent USD
    unit: 'response',
    minQuantity: 25,
    maxQuantity: 500,
    defaultQuantity: 50,
    increment: 25,
  },
  {
    id: 'interviews',
    name: 'Interviews', // ✅ TAAK 1: Consistent met Brand Asset Detail
    icon: Mic,
    description: 'Deep qualitative insights from stakeholder conversations',
    confidence: 'High Confidence',
    confidenceBadgeClass: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', // ✅ TAAK 5: Green voor High
    pricePerUnit: 80,
    priceLabel: '$80/interview', // ✅ TAAK 2: Consistent USD
    unit: 'interview',
    minQuantity: 1,
    maxQuantity: 50,
    defaultQuantity: 10,
    increment: 1,
  },
  {
    id: 'workshop',
    name: 'Workshop', // ✅ TAAK 1: Consistent met Brand Asset Detail
    icon: Presentation,
    description: 'Interactive group sessions to validate and align stakeholders',
    confidence: 'Medium-High Confidence',
    confidenceBadgeClass: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400', // ✅ TAAK 5: Teal voor Medium-High
    pricePerUnit: 1200,
    priceLabel: '$1,200/session', // ✅ TAAK 2: Consistent USD
    unit: 'session',
    minQuantity: 1,
    maxQuantity: 5,
    defaultQuantity: 1,
    increment: 1,
  },
];

export function ValidationPlanLandingPage({ onBack, onStartPlan }: ValidationPlanLandingPageProps) {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [methodQuantities, setMethodQuantities] = useState<Record<string, number>>({});

  // ✅ TAAK 3: URL parameter parsing voor voorinvulling
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Parse asset parameter(s)
    const assetParam = params.get('asset');
    const assetsParam = params.get('assets');
    
    if (assetParam) {
      setSelectedAssets([assetParam]);
    } else if (assetsParam) {
      setSelectedAssets(assetsParam.split(','));
    }
    
    // Parse method parameter(s)
    const methodParam = params.get('method');
    const methodsParam = params.get('methods');
    
    const methodsToActivate: string[] = [];
    if (methodParam) {
      methodsToActivate.push(methodParam);
    } else if (methodsParam) {
      methodsToActivate.push(...methodsParam.split(','));
    }
    
    // Set quantity to 1 for pre-selected methods (or use default quantity)
    if (methodsToActivate.length > 0) {
      const newQuantities: Record<string, number> = {};
      methodsToActivate.forEach(methodId => {
        const method = validationMethods.find(m => m.id === methodId);
        if (method) {
          newQuantities[methodId] = method.defaultQuantity;
        }
      });
      setMethodQuantities(newQuantities);
    } else {
      // Default: AI Exploration always active
      setMethodQuantities({ 'ai-exploration': 1 });
    }
  }, []);

  const toggleAsset = (assetId: string) => {
    setSelectedAssets(prev =>
      prev.includes(assetId)
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const updateMethodQuantity = (methodId: string, delta: number) => {
    setMethodQuantities(prev => {
      const method = validationMethods.find(m => m.id === methodId);
      if (!method) return prev;

      const currentValue = prev[methodId] || 0;
      const newValue = Math.max(
        method.minQuantity,
        Math.min(method.maxQuantity, currentValue + (delta * method.increment))
      );

      // If setting to 0 or below minimum, remove the method
      if (newValue < method.minQuantity) {
        const newQuantities = { ...prev };
        delete newQuantities[methodId];
        return newQuantities;
      }

      return {
        ...prev,
        [methodId]: newValue
      };
    });
  };

  const removeMethod = (methodId: string) => {
    setMethodQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[methodId];
      return newQuantities;
    });
  };

  // Get selected methods (those with quantities > 0)
  const selectedMethods = Object.keys(methodQuantities).filter(
    methodId => methodQuantities[methodId] > 0
  );

  // Calculate pricing
  const pricingBreakdown = useMemo(() => {
    const items: { label: string; amount: number }[] = [];
    let subtotal = 0;

    selectedMethods.forEach(methodId => {
      const method = validationMethods.find(m => m.id === methodId);
      if (method && method.pricePerUnit > 0) {
        const quantity = methodQuantities[methodId];
        const amount = method.pricePerUnit * quantity;
        items.push({
          label: `${method.name} (${quantity} ${method.unit}${quantity !== 1 ? 's' : ''})`, // ✅ TAAK 6: Improved label
          amount
        });
        subtotal += amount;
      }
    });

    return { items, subtotal, total: subtotal };
  }, [selectedMethods, methodQuantities]);

  const removeAsset = (assetId: string) => {
    setSelectedAssets(prev => prev.filter(id => id !== assetId));
  };

  const canStartPlan = selectedAssets.length > 0 && selectedMethods.length > 0;

  return (
    <div className="h-full overflow-auto bg-background">
      {/* Content - Split Screen Layout */}
      <div className="flex h-full">
        {/* LEFT PANEL - BUILDER (65%) */}
        <div className="w-[65%] h-full overflow-auto border-r border-border">
          <div className="max-w-4xl mx-auto px-8 py-8 space-y-8">
            {/* HEADER */}
            <div>
              <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <div className="flex items-start gap-4 mb-6">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Wand className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-semibold">Custom Validation</h1>
                  <p className="text-sm text-muted-foreground">
                    Build your own research plan to validate strategic decisions
                  </p>
                </div>
              </div>

              {/* VALUE PROPS ROW */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-primary" />
                  <span className="text-sm">Expert-Led</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Data-Driven</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm">Actionable</span>
                </div>
              </div>
            </div>

            {/* STEP 1 - SELECT ASSETS */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">1. Select Brand Assets to Validate</h2>
                <p className="text-sm text-muted-foreground">Choose which assets need research validation</p>
              </div>

              {/* Asset cards grid (2 columns) */}
              <div className="grid md:grid-cols-2 gap-4">
                {availableAssets.map((asset) => {
                  const isSelected = selectedAssets.includes(asset.id);
                  const AssetIcon = asset.icon;

                  return (
                    <Card
                      key={asset.id}
                      className={cn(
                        "rounded-xl border p-4 cursor-pointer transition-all duration-200",
                        isSelected 
                          ? "border-primary bg-primary/5" 
                          : "hover:border-primary/30 hover:shadow-sm"
                      )}
                      onClick={() => toggleAsset(asset.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleAsset(asset.id)}
                          className="mt-1 rounded border-2"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{asset.name}</h3>
                            <AssetIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-muted text-foreground rounded-full px-2 text-xs">
                              {asset.category}
                            </Badge>
                            {asset.recommended && (
                              <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full px-2 text-xs">
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{asset.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* STEP 2 - SELECT METHODS */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">2. Choose Validation Methods</h2>
                <p className="text-sm text-muted-foreground">Select research methods for each asset</p>
              </div>

              {/* Method cards (vertical list) */}
              <div className="space-y-4">
                {validationMethods.map((method) => {
                  const MethodIcon = method.icon;
                  const quantity = methodQuantities[method.id] || 0;
                  const isActive = quantity > 0;

                  return (
                    <Card
                      key={method.id}
                      className={cn(
                        "rounded-xl border p-4",
                        isActive && "border-primary/30"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="rounded-lg bg-primary/10 p-3">
                          <MethodIcon className="h-5 w-5 text-primary" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="text-lg font-semibold">{method.name}</h3>
                              <Badge className={cn("rounded-full px-2 py-0.5 text-xs font-medium", method.confidenceBadgeClass)}>
                                {method.confidence}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>

                          {/* Quantity selector */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 rounded-xl"
                                onClick={() => updateMethodQuantity(method.id, -1)}
                                disabled={quantity <= 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <div className="w-16 text-center">
                                <span className="text-lg font-semibold tabular-nums">{quantity}</span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 rounded-xl"
                                onClick={() => updateMethodQuantity(method.id, 1)}
                                disabled={quantity >= method.maxQuantity}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="text-right">
                              <div className="text-lg font-semibold text-primary">
                                {method.pricePerUnit === 0 ? (
                                  <span className="text-green-600 dark:text-green-400">FREE</span>
                                ) : (
                                  method.priceLabel
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - SUMMARY (35%, sticky) */}
        <div className="w-[35%] h-full overflow-auto bg-muted/30">
          <div className="sticky top-0 p-6">
            <Card className="rounded-xl border p-6 bg-background">
              {/* Header */}
              <h2 className="text-xl font-semibold mb-6">Your Validation Plan</h2>

              {/* Assets section - ✅ TAAK 6: Count badge in header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Assets to Validate</span>
                    {selectedAssets.length > 0 && (
                      <Badge className="ml-2 bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full text-xs font-medium">
                        {selectedAssets.length}
                      </Badge>
                    )}
                  </div>
                </div>

                {selectedAssets.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">Select assets from the left to start</p>
                ) : (
                  <div className="space-y-2">
                    {selectedAssets.map((assetId) => {
                      const asset = availableAssets.find(a => a.id === assetId);
                      if (!asset) return null;
                      const AssetIcon = asset.icon;

                      return (
                        <div
                          key={assetId}
                          className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/50"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <AssetIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm truncate">{asset.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => removeAsset(assetId)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <Separator className="my-6" />

              {/* Methods section - ✅ TAAK 6: Count badge in header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Validation Methods</span>
                    {selectedMethods.length > 0 && (
                      <Badge className="ml-2 bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full text-xs font-medium">
                        {selectedMethods.length}
                      </Badge>
                    )}
                  </div>
                </div>

                {selectedMethods.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">Choose validation methods below</p>
                ) : (
                  <div className="space-y-2">
                    {selectedMethods.map((methodId) => {
                      const method = validationMethods.find(m => m.id === methodId);
                      if (!method) return null;
                      const quantity = methodQuantities[methodId];

                      return (
                        <div
                          key={methodId}
                          className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/50"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{method.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {quantity} {method.unit}{quantity !== 1 ? 's' : ''}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => removeMethod(methodId)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ✅ TAAK 6: Border before total */}
              <div className="border-t border-border pt-4 mt-4">
                {/* Pricing breakdown */}
                <div className="space-y-3">
                  {pricingBreakdown.items.length > 0 ? (
                    <>
                      {pricingBreakdown.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium tabular-nums">${item.amount.toLocaleString()}</span>
                        </div>
                      ))}
                      
                      <Separator className="my-3" />
                      
                      {/* ✅ TAAK 6: Improved total styling */}
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold">Total Investment</span>
                        <span className="text-xl font-semibold text-primary tabular-nums">
                          ${pricingBreakdown.total.toLocaleString()}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">
                        Select methods to see pricing
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* ✅ TAAK 4: CTA Button */}
              <Button
                className="w-full mt-6 py-3 rounded-xl"
                disabled={!canStartPlan}
                onClick={() => canStartPlan && onStartPlan(selectedAssets, selectedMethods)}
              >
                {pricingBreakdown.total === 0 ? 'Start Validation' : 'Purchase Plan'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              {/* ✅ TAAK 4: Info text onder button */}
              <p className="text-xs text-muted-foreground text-center mt-2">
                Free methods start immediately. Paid methods require payment.
              </p>

              {/* Trust badge */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-xs text-muted-foreground">100% Satisfaction Guarantee</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
