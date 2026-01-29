import React, { useState, useMemo } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  ArrowLeft,
  Share2,
  Zap,
  Info,
  CheckCircle2,
  Sparkles,
  Edit,
  ChevronDown,
  ChevronUp,
  Plus,
  FileText,
  Image,
  Video,
  Mail,
  Globe,
  Target,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { cn } from '../lib/utils';

interface Deliverable {
  id: string;
  name: string;
  description?: string;
  type: 'document' | 'image' | 'video' | 'email' | 'website' | 'social';
  status: 'completed' | 'in-progress' | 'not-started';
  progress?: number;
  assignee?: string;
}

interface Asset {
  id: string;
  name: string;
  type: 'brand' | 'product' | 'persona' | 'trend' | 'research';
  validationStatus?: 'validated' | 'unvalidated';
}

interface Campaign {
  id: string;
  name: string;
  type: 'strategic' | 'quick';
  status: 'active' | 'draft' | 'completed';
  deliverables: Deliverable[];
  assets?: Asset[];
  confidence?: number;
  contentType?: string;
  qualityScore?: number;
  quickSettings?: {
    targetPersona: string;
    tone: string;
    createdAt: string;
  };
  team?: { name: string; avatar: string }[];
}

interface CampaignWorkspaceProps {
  campaignId: string;
  initialTab?: 'configure' | 'result';
  onBack?: () => void;
  onNavigateToDeliverable?: (deliverableId: string) => void;
}

// Mock campaigns data
const mockCampaigns: Record<string, Campaign> = {
  'camp-1': {
    id: 'camp-1',
    name: 'Q1 Product Launch Campaign',
    type: 'strategic',
    status: 'active',
    confidence: 87,
    deliverables: [
      { id: 'd1', name: 'Landing Page', type: 'website', status: 'completed', progress: 100, assignee: 'Sarah' },
      { id: 'd2', name: 'Email Series', type: 'email', status: 'completed', progress: 100, assignee: 'Mike' },
      { id: 'd3', name: 'Social Media Assets', type: 'social', status: 'in-progress', progress: 60, assignee: 'Lisa' },
      { id: 'd4', name: 'Product Video', type: 'video', status: 'in-progress', progress: 40, assignee: 'John' },
      { id: 'd5', name: 'Blog Post Series', type: 'document', status: 'not-started', progress: 0, assignee: 'Emma' },
      { id: 'd6', name: 'Ad Creatives', type: 'image', status: 'not-started', progress: 0, assignee: 'David' },
    ],
    assets: [
      { id: 'a1', name: 'Brand Positioning', type: 'brand', validationStatus: 'validated' },
      { id: 'a2', name: 'Tech Enthusiast Persona', type: 'persona', validationStatus: 'validated' },
      { id: 'a3', name: 'Product Features', type: 'product', validationStatus: 'validated' },
      { id: 'a4', name: 'Market Trends 2024', type: 'trend', validationStatus: 'validated' },
    ],
    team: [
      { name: 'Sarah', avatar: 'S' },
      { name: 'Mike', avatar: 'M' },
      { name: 'Lisa', avatar: 'L' },
    ],
  },
  'quick-1': {
    id: 'quick-1',
    name: 'Blog Post - Jan 20',
    type: 'quick',
    status: 'completed',
    contentType: 'Blog Post',
    qualityScore: 8.5,
    confidence: 78,
    deliverables: [
      { id: 'd10', name: 'Blog Post: "5 Ways to Improve Your Brand"', type: 'document', status: 'completed', progress: 100 },
    ],
    assets: [
      { id: 'a10', name: 'Brand Voice Guidelines', type: 'brand', validationStatus: 'validated' },
      { id: 'a11', name: 'Content Strategy', type: 'research', validationStatus: 'validated' },
    ],
    quickSettings: {
      targetPersona: 'Small Business Owner',
      tone: 'Professional & Empowering',
      createdAt: '2024-01-20',
    },
  },
  'quick-2': {
    id: 'quick-2',
    name: 'LinkedIn Post Series',
    type: 'quick',
    status: 'active',
    contentType: 'Social Media',
    confidence: 82,
    deliverables: [
      { id: 'd11', name: 'LinkedIn Posts (Week 1)', type: 'social', status: 'in-progress', progress: 50 },
    ],
    assets: [
      { id: 'a12', name: 'Brand Positioning', type: 'brand', validationStatus: 'validated' },
      { id: 'a13', name: 'Professional Persona', type: 'persona', validationStatus: 'validated' },
    ],
    quickSettings: {
      targetPersona: 'Marketing Manager',
      tone: 'Insightful & Data-driven',
      createdAt: '2024-01-19',
    },
  },
};

const deliverableIcons = {
  document: FileText,
  image: Image,
  video: Video,
  email: Mail,
  website: Globe,
  social: Target,
};

export function CampaignWorkspace({
  campaignId,
  initialTab = 'result',
  onBack,
  onNavigateToDeliverable,
}: CampaignWorkspaceProps) {
  const campaign = mockCampaigns[campaignId];
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [convertedName, setConvertedName] = useState('');
  const [showQuickSettings, setShowQuickSettings] = useState(false);

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Campaign not found</h2>
          <Button onClick={onBack}>Back to Campaigns</Button>
        </div>
      </div>
    );
  }

  const isQuickCampaign = campaign.type === 'quick';
  const completedDeliverables = campaign.deliverables.filter(d => d.status === 'completed').length;
  const totalDeliverables = campaign.deliverables.length;
  const progress = (completedDeliverables / totalDeliverables) * 100;

  const handleConvertToFull = () => {
    setConvertedName(campaign.name);
    setShowConvertModal(true);
  };

  const handleConfirmConvert = () => {
    console.log('Converting to full campaign:', convertedName);
    // In real app: update campaign type, redirect to configure tab
    setShowConvertModal(false);
  };

  // Quick Campaign View
  if (isQuickCampaign) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
          <div className="max-w-5xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Campaigns
              </button>
              <Button variant="outline" onClick={handleConvertToFull} className="gap-2">
                <Sparkles className="h-4 w-4" />
                Convert to Full Campaign
              </Button>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-semibold mb-2">{campaign.name}</h1>
                <div className="flex items-center gap-2">
                  <Badge className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Quick Content
                  </Badge>
                  <Badge className={cn(
                    'rounded-full text-xs',
                    campaign.status === 'active' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
                    campaign.status === 'completed' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
                  )}>
                    {campaign.status === 'active' ? 'Active' : 'Completed'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-8 py-8 space-y-6">
          {/* Upgrade Banner */}
          <Card className="rounded-xl border p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm mb-1">
                  This is a Quick Campaign with auto-selected settings
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  Convert to full campaign for more control and strategy generation
                </p>
                <button
                  onClick={handleConvertToFull}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Convert Now →
                </button>
              </div>
            </div>
          </Card>

          {/* Research Foundation Card */}
          <Card className="rounded-xl border p-4 bg-primary/5">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Research Foundation</h3>
                <p className="text-sm text-muted-foreground">
                  Auto-selected validated assets
                </p>
              </div>

              {/* Asset List */}
              <div className="space-y-2">
                {campaign.assets?.map(asset => (
                  <div
                    key={asset.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-background"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{asset.name}</p>
                    </div>
                    {asset.validationStatus === 'validated' && (
                      <Badge className="rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">
                        Validated
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span className="font-semibold">{campaign.confidence}% Coverage</span>
                </div>
                <button
                  onClick={handleConvertToFull}
                  className="text-sm text-primary hover:underline"
                >
                  Edit Assets
                </button>
              </div>
            </div>
          </Card>

          {/* Content Card (Deliverable) */}
          <Card className="rounded-xl border p-6">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {(() => {
                      const deliverable = campaign.deliverables[0];
                      const Icon = deliverable ? deliverableIcons[deliverable.type] : FileText;
                      return (
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                      );
                    })()}
                    <div>
                      <h3 className="text-xl font-semibold">
                        {campaign.deliverables[0]?.name || 'Untitled'}
                      </h3>
                      <p className="text-sm text-muted-foreground">{campaign.contentType}</p>
                    </div>
                  </div>

                  {campaign.deliverables[0]?.status === 'completed' && campaign.qualityScore && (
                    <div className="flex items-center gap-2 mt-4">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-semibold">
                        Quality Score: {campaign.qualityScore}/10
                      </span>
                    </div>
                  )}

                  {campaign.deliverables[0]?.status === 'in-progress' && campaign.deliverables[0]?.progress && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{campaign.deliverables[0].progress}%</span>
                      </div>
                      <Progress value={campaign.deliverables[0].progress} className="h-2" />
                    </div>
                  )}
                </div>

                <Badge className={cn(
                  'rounded-full text-xs',
                  campaign.deliverables[0]?.status === 'completed' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
                  campaign.deliverables[0]?.status === 'in-progress' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
                )}>
                  {campaign.deliverables[0]?.status === 'completed' ? 'Completed' : 'In Progress'}
                </Badge>
              </div>

              <Button
                size="lg"
                className="w-full gap-2"
                onClick={() => onNavigateToDeliverable?.(campaign.deliverables[0]?.id)}
              >
                <Edit className="h-4 w-4" />
                Open in Studio
              </Button>
            </div>
          </Card>

          {/* Quick Settings (Collapsible) */}
          <Card className="rounded-xl border">
            <button
              onClick={() => setShowQuickSettings(!showQuickSettings)}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-xl"
            >
              <h3 className="text-lg font-semibold">Quick Settings</h3>
              {showQuickSettings ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {showQuickSettings && campaign.quickSettings && (
              <div className="px-4 pb-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Target Persona</Label>
                    <p className="text-sm font-semibold mt-1">{campaign.quickSettings.targetPersona}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Tone</Label>
                    <p className="text-sm font-semibold mt-1">{campaign.quickSettings.tone}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Created</Label>
                  <p className="text-sm font-semibold mt-1">
                    {new Date(campaign.quickSettings.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Convert Modal */}
        <Dialog open={showConvertModal} onOpenChange={setShowConvertModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upgrade to Strategic Campaign</DialogTitle>
              <DialogDescription>
                This will allow you to:
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Add more deliverables</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Generate full strategy</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Customize knowledge assets</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Add team collaboration</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Campaign Name</Label>
              <Input
                value={convertedName}
                onChange={e => setConvertedName(e.target.value)}
                placeholder="Enter campaign name"
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConvertModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmConvert}>
                Convert to Campaign
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Strategic Campaign View
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Campaigns
            </button>
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                {campaign.team?.map((member, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-xs font-semibold text-primary"
                  >
                    {member.avatar}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-2">{campaign.name}</h1>
              <Badge className="rounded-full bg-primary/10 text-primary">
                Strategic Campaign
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="configure">Configure Inputs</TabsTrigger>
            <TabsTrigger value="result">Strategy Result</TabsTrigger>
          </TabsList>

          {/* Configure Tab */}
          <TabsContent value="configure" className="space-y-6 mt-6">
            <Card className="rounded-xl border p-6">
              <h2 className="text-xl font-semibold mb-4">Knowledge Assets</h2>
              <div className="space-y-3">
                {campaign.assets?.map(asset => (
                  <div
                    key={asset.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{asset.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{asset.type}</p>
                    </div>
                    <Badge className="rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">
                      Validated
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 gap-2">
                <Plus className="h-4 w-4" />
                Add Assets
              </Button>
            </Card>

            <Card className="rounded-xl border p-6">
              <h2 className="text-xl font-semibold mb-4">Campaign Parameters</h2>
              <p className="text-sm text-muted-foreground">
                Configure campaign objectives, budget, and channels
              </p>
            </Card>
          </TabsContent>

          {/* Strategy Result Tab */}
          <TabsContent value="result" className="space-y-6 mt-6">
            <Tabs defaultValue="deliverables">
              <TabsList>
                <TabsTrigger value="concept">Core Concept</TabsTrigger>
                <TabsTrigger value="channels">Channel Mix</TabsTrigger>
                <TabsTrigger value="audience">Target Audience</TabsTrigger>
                <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
              </TabsList>

              {/* Deliverables Sub-Tab */}
              <TabsContent value="deliverables" className="space-y-6 mt-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Deliverables</h2>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <span>{completedDeliverables}/{totalDeliverables} complete</span>
                      <span>•</span>
                      <span>{Math.round(progress)}% progress</span>
                    </div>
                  </div>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Deliverable
                  </Button>
                </div>

                {/* Progress Bar */}
                <Progress value={progress} className="h-2" />

                {/* Deliverables List */}
                <div className="space-y-4">
                  {campaign.deliverables.map(deliverable => {
                    const Icon = deliverableIcons[deliverable.type];
                    return (
                      <Card key={deliverable.id} className="rounded-xl border p-4">
                        <div className="flex items-start gap-4">
                          <div className="rounded-lg bg-primary/10 p-2">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-semibold">{deliverable.name}</h3>
                                {deliverable.description && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {deliverable.description}
                                  </p>
                                )}
                              </div>
                              <Badge className={cn(
                                'rounded-full text-xs',
                                deliverable.status === 'completed' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
                                deliverable.status === 'in-progress' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
                                deliverable.status === 'not-started' && 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
                              )}>
                                {deliverable.status === 'completed' && 'Completed'}
                                {deliverable.status === 'in-progress' && 'In Progress'}
                                {deliverable.status === 'not-started' && 'Not Started'}
                              </Badge>
                            </div>

                            {deliverable.status === 'in-progress' && deliverable.progress !== undefined && (
                              <div className="mb-3">
                                <Progress value={deliverable.progress} className="h-1.5" />
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                {deliverable.assignee && (
                                  <span>Assigned to {deliverable.assignee}</span>
                                )}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onNavigateToDeliverable?.(deliverable.id)}
                              >
                                Open in Studio
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Other Sub-Tabs */}
              <TabsContent value="concept" className="mt-6">
                <Card className="rounded-xl border p-6">
                  <h3 className="text-lg font-semibold mb-4">Core Campaign Concept</h3>
                  <p className="text-sm text-muted-foreground">
                    Strategy concept content will be displayed here
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="channels" className="mt-6">
                <Card className="rounded-xl border p-6">
                  <h3 className="text-lg font-semibold mb-4">Channel Mix Strategy</h3>
                  <p className="text-sm text-muted-foreground">
                    Channel strategy content will be displayed here
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="audience" className="mt-6">
                <Card className="rounded-xl border p-6">
                  <h3 className="text-lg font-semibold mb-4">Target Audience</h3>
                  <p className="text-sm text-muted-foreground">
                    Audience insights will be displayed here
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
