import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import {
  Bot,
  MessageCircle,
  ClipboardList,
  PenTool,
  Play,
  Target,
  Eye,
  Zap,
  Users,
  Heart,
  TrendingUp,
  Globe,
  Mic,
  MessageSquare,
  Book,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface BrandAsset {
  id: number;
  type: string;
  title: string;
  content: string;
  category: string;
  lastUpdated: string;
  status: 'approved' | 'draft' | 'empty';
  description?: string;
}

interface ResearchMethodsDashboardProps {
  brandAssets: BrandAsset[];
  getIcon: (type: string) => any;
  getAssetStatus: (asset: BrandAsset) => 'approved' | 'draft' | 'empty';
}

export function ResearchMethodsDashboard({ brandAssets, getIcon, getAssetStatus }: ResearchMethodsDashboardProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [selectedAssets, setSelectedAssets] = useState<number[]>([]);
  const [expandedMethod, setExpandedMethod] = useState<string | null>('ai-agent');

  const researchMethods = [
    {
      id: 'ai-agent',
      name: 'AI-Agent Analysis',
      icon: Bot,
      description: 'Instant AI-powered brand analysis based on your inputs and market data',
      duration: '5-10 minutes',
      participants: 'Just you',
      effort: 'Minimal',
      color: 'bg-purple-100 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-200 dark:border-purple-900/30',
      recommended: true,
      recommendedAssets: [1, 2, 3, 5, 13], // Golden Circle, Vision, Mission, Core Values, Positioning
      benefits: [
        'Fastest way to get started',
        'Data-driven insights',
        'Iterative refinement',
        'No scheduling needed'
      ]
    },
    {
      id: 'questionnaire',
      name: 'Questionnaire',
      icon: ClipboardList,
      description: 'Structured questions to capture your brand vision and values',
      duration: '15-20 minutes',
      participants: '1-3 people',
      effort: 'Low',
      color: 'bg-blue-100 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-900/30',
      recommended: false,
      recommendedAssets: [1, 2, 3, 4, 5, 7, 10, 12, 13], // Most assets
      benefits: [
        'Structured approach',
        'Thoughtful responses',
        'Can involve team',
        'Self-paced completion'
      ]
    },
    {
      id: 'interviews',
      name: 'Stakeholder Interviews',
      icon: MessageCircle,
      description: 'In-depth conversations with key stakeholders to uncover insights',
      duration: '1-2 hours',
      participants: '3-8 people',
      effort: 'Medium',
      color: 'bg-green-100 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
      borderColor: 'border-green-200 dark:border-green-900/30',
      recommended: false,
      recommendedAssets: [1, 2, 3, 4, 5, 7, 10, 12, 13], // Deep insights
      benefits: [
        'Rich qualitative data',
        'Stakeholder alignment',
        'Multiple perspectives',
        'Deeper understanding'
      ]
    },
    {
      id: 'workshop',
      name: 'Canvas Workshop',
      icon: PenTool,
      description: 'Collaborative workshop to co-create and validate brand elements',
      duration: '2-4 hours',
      participants: '5-15 people',
      effort: 'High',
      color: 'bg-orange-100 dark:bg-orange-900/20',
      iconColor: 'text-orange-600 dark:text-orange-400',
      borderColor: 'border-orange-200 dark:border-orange-900/30',
      recommended: false,
      recommendedAssets: [1, 2, 3, 4, 5, 6, 7, 10, 12, 13], // Comprehensive
      benefits: [
        'Team collaboration',
        'Immediate consensus',
        'Creative brainstorming',
        'Comprehensive results'
      ]
    }
  ];

  const toggleAssetSelection = (assetId: number) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const selectRecommendedAssets = (methodId: string) => {
    const method = researchMethods.find(m => m.id === methodId);
    if (method) {
      setSelectedAssets(method.recommendedAssets);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle>Choose Your Validation Method</CardTitle>
          <CardDescription>
            Select a research approach and the brand assets you want to develop. Each method has different time commitments and collaboration requirements.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Research Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {researchMethods.map((method) => {
          const Icon = method.icon;
          const isExpanded = expandedMethod === method.id;
          
          return (
            <Card 
              key={method.id} 
              className={`relative transition-all ${
                method.recommended ? 'border-primary' : ''
              }`}
            >
              {method.recommended && (
                <Badge className="absolute -top-2 -right-2 bg-primary">Recommended</Badge>
              )}
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className={`h-14 w-14 rounded-lg ${method.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-7 w-7 ${method.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle>{method.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {method.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">{method.duration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Participants</p>
                    <p className="font-medium">{method.participants}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Effort</p>
                    <p className="font-medium">{method.effort}</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setExpandedMethod(isExpanded ? null : method.id)}
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-2" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Show Details & Select Assets
                    </>
                  )}
                </Button>

                {isExpanded && (
                  <div className="space-y-4 pt-4 border-t">
                    {/* Benefits */}
                    <div>
                      <p className="font-medium mb-2">Benefits</p>
                      <ul className="space-y-1">
                        {method.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Asset Selection */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-medium">Select Assets to Develop</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => selectRecommendedAssets(method.id)}
                        >
                          Select Recommended
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2">
                        {brandAssets
                          .filter(asset => method.recommendedAssets.includes(asset.id))
                          .map((asset) => {
                            const Icon = getIcon(asset.type);
                            const isSelected = selectedAssets.includes(asset.id);
                            const status = getAssetStatus(asset);
                            
                            return (
                              <label
                                key={asset.id}
                                className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                  isSelected 
                                    ? `${method.borderColor} ${method.color}` 
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={() => toggleAssetSelection(asset.id)}
                                />
                                <div className="flex items-center space-x-2 flex-1 min-w-0">
                                  <Icon className={`h-4 w-4 flex-shrink-0 ${isSelected ? method.iconColor : 'text-muted-foreground'}`} />
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium truncate ${isSelected ? '' : 'text-muted-foreground'}`}>
                                      {asset.type}
                                    </p>
                                    <p className="text-xs text-muted-foreground capitalize">{status}</p>
                                  </div>
                                </div>
                              </label>
                            );
                          })}
                      </div>
                    </div>

                    {/* Start Button */}
                    <Button 
                      className="w-full" 
                      disabled={selectedAssets.length === 0}
                      variant={method.recommended ? 'default' : 'outline'}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start {method.name}
                      {selectedAssets.length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {selectedAssets.length} selected
                        </Badge>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selection Summary */}
      {selectedAssets.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Selection</CardTitle>
            <CardDescription>
              {selectedAssets.length} brand asset{selectedAssets.length !== 1 ? 's' : ''} selected for research
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedAssets.map(assetId => {
                const asset = brandAssets.find(a => a.id === assetId);
                if (!asset) return null;
                const Icon = getIcon(asset.type);
                
                return (
                  <Badge key={assetId} variant="secondary" className="px-3 py-1.5">
                    <Icon className="h-3 w-3 mr-1.5" />
                    {asset.type}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}