import React, { useState, useMemo } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { SearchBar } from './ui/SearchBar';
import { NewCampaignWizard } from './NewCampaignWizard';
import { QuickContentModal } from './QuickContentModalNew';
import { 
  Edit,
  Trash2,
  Megaphone,
  Plus,
  FileText,
  CheckCircle2,
  MoreVertical,
  Play,
  Sparkles,
  Copy,
  Archive,
  Zap,
  LayoutGrid,
  List,
  ChevronRight,
  Users2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from '../lib/utils';

interface Deliverable {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'email' | 'website' | 'social';
  status: 'completed' | 'in-progress' | 'not-started';
  progress?: number;
}

interface Campaign {
  id: string;
  name: string;
  type: 'strategic' | 'quick';
  status: 'active' | 'draft' | 'completed';
  deliverables: Deliverable[];
  confidence?: number;
  assetsUsed?: number;
  contentType?: string;
  qualityScore?: number;
  team?: { name: string; avatar: string }[];
  createdAt: string;
}

interface ActiveCampaignsPageProps {
  onNavigateToCampaign?: (campaignId: string, tab?: 'configure' | 'result') => void;
}

// Mock data
const mockCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Q1 Product Launch Campaign',
    type: 'strategic',
    status: 'active',
    confidence: 87,
    assetsUsed: 4,
    deliverables: [
      { id: 'd1', name: 'Landing Page', type: 'website', status: 'completed', progress: 100 },
      { id: 'd2', name: 'Email Series', type: 'email', status: 'completed', progress: 100 },
      { id: 'd3', name: 'Social Media Assets', type: 'social', status: 'in-progress', progress: 60 },
      { id: 'd4', name: 'Product Video', type: 'video', status: 'in-progress', progress: 40 },
      { id: 'd5', name: 'Blog Post Series', type: 'document', status: 'not-started', progress: 0 },
      { id: 'd6', name: 'Ad Creatives', type: 'image', status: 'not-started', progress: 0 },
    ],
    team: [
      { name: 'Sarah', avatar: 'S' },
      { name: 'Mike', avatar: 'M' },
      { name: 'Lisa', avatar: 'L' },
    ],
    createdAt: '2024-01-15',
  },
  {
    id: 'camp-2',
    name: 'Brand Awareness Campaign',
    type: 'strategic',
    status: 'active',
    confidence: 92,
    assetsUsed: 3,
    deliverables: [
      { id: 'd7', name: 'Brand Video', type: 'video', status: 'completed', progress: 100 },
      { id: 'd8', name: 'Social Campaign', type: 'social', status: 'completed', progress: 100 },
      { id: 'd9', name: 'Press Release', type: 'document', status: 'in-progress', progress: 75 },
    ],
    team: [
      { name: 'John', avatar: 'J' },
      { name: 'Emma', avatar: 'E' },
    ],
    createdAt: '2024-01-10',
  },
  {
    id: 'quick-1',
    name: 'New pricing model for startup founders...',
    type: 'quick',
    status: 'completed',
    contentType: 'Blog Post',
    qualityScore: 8.5,
    deliverables: [
      { id: 'd10', name: 'Blog Post', type: 'document', status: 'completed', progress: 100 },
    ],
    createdAt: '2024-01-22',
  },
  {
    id: 'quick-2',
    name: 'Announcing Q1 results and upcoming...',
    type: 'quick',
    status: 'active',
    contentType: 'Social Media',
    deliverables: [
      { id: 'd11', name: 'LinkedIn Posts', type: 'social', status: 'in-progress', progress: 50 },
    ],
    createdAt: '2024-01-21',
  },
  {
    id: 'quick-3',
    name: 'Monthly newsletter highlights...',
    type: 'quick',
    status: 'completed',
    contentType: 'Email',
    qualityScore: 9.2,
    deliverables: [
      { id: 'd12', name: 'Newsletter', type: 'email', status: 'completed', progress: 100 },
    ],
    createdAt: '2024-01-20',
  },
  {
    id: 'camp-3',
    name: 'Customer Success Stories',
    type: 'strategic',
    status: 'completed',
    confidence: 95,
    assetsUsed: 2,
    deliverables: [
      { id: 'd13', name: 'Case Study 1', type: 'document', status: 'completed', progress: 100 },
      { id: 'd14', name: 'Case Study 2', type: 'document', status: 'completed', progress: 100 },
      { id: 'd15', name: 'Video Testimonials', type: 'video', status: 'completed', progress: 100 },
    ],
    team: [
      { name: 'David', avatar: 'D' },
    ],
    createdAt: '2023-12-20',
  },
];

export function ActiveCampaignsPage({ onNavigateToCampaign }: ActiveCampaignsPageProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'strategic' | 'quick' | 'completed'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showWizard, setShowWizard] = useState(false);
  const [showQuickContentModal, setShowQuickContentModal] = useState(false);

  // Filter campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesTab = true;
      if (selectedTab === 'strategic') {
        matchesTab = campaign.type === 'strategic';
      } else if (selectedTab === 'quick') {
        matchesTab = campaign.type === 'quick';
      } else if (selectedTab === 'completed') {
        matchesTab = campaign.status === 'completed';
      }

      return matchesSearch && matchesTab;
    });
  }, [campaigns, searchTerm, selectedTab]);

  // Calculate stats
  const stats = useMemo(() => {
    const activeCount = campaigns.filter(c => c.status === 'active').length;
    const quickCount = campaigns.filter(c => c.type === 'quick').length;
    const completedCount = campaigns.filter(c => c.status === 'completed').length;
    const totalContent = campaigns.reduce((sum, c) => sum + c.deliverables.length, 0);

    return { activeCount, quickCount, completedCount, totalContent };
  }, [campaigns]);

  const handleDelete = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  const handleDuplicate = (campaign: Campaign) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: `${campaign.id}-copy-${Date.now()}`,
      name: `${campaign.name} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString(),
    };
    setCampaigns([newCampaign, ...campaigns]);
  };

  const handleConvertToCampaign = (quickCampaignId: string) => {
    setCampaigns(campaigns.map(c => 
      c.id === quickCampaignId 
        ? { ...c, type: 'strategic' as const, confidence: 75, assetsUsed: 1 }
        : c
    ));
  };

  const getStatusBadge = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">
            Active
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-xs">
            Draft
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
            Completed
          </Badge>
        );
    }
  };

  const calculateProgress = (deliverables: Deliverable[]) => {
    if (deliverables.length === 0) return 0;
    const completed = deliverables.filter(d => d.status === 'completed').length;
    return (completed / deliverables.length) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-7xl mx-auto px-8 py-6 space-y-6">
          {/* Title Row */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-primary/10 p-3">
                <Megaphone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold">Campaigns</h1>
                <p className="text-sm text-muted-foreground">
                  All your strategic campaigns and content
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2" onClick={() => setShowQuickContentModal(true)}>
                <Zap className="h-4 w-4" />
                Quick Content
              </Button>
              <Button className="gap-2" onClick={() => setShowWizard(true)}>
                <Plus className="h-4 w-4" />
                New Campaign
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            {/* Active */}
            <Card className="rounded-xl border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-2">
                    <Play className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="text-4xl font-semibold text-green-600 dark:text-green-400 mb-1">
                  {stats.activeCount}
                </div>
                <div className="text-sm text-muted-foreground">Active</div>
              </CardContent>
            </Card>

            {/* Quick */}
            <Card className="rounded-xl border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                    <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="text-4xl font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  {stats.quickCount}
                </div>
                <div className="text-sm text-muted-foreground">Quick</div>
              </CardContent>
            </Card>

            {/* Completed */}
            <Card className="rounded-xl border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>
                <div className="text-4xl font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {stats.completedCount}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </CardContent>
            </Card>

            {/* Total Content */}
            <Card className="rounded-xl border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2">
                    <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="text-4xl font-semibold text-purple-600 dark:text-purple-400 mb-1">
                  {stats.totalContent}
                </div>
                <div className="text-sm text-muted-foreground">Total Content</div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-3">
            {/* Tabs */}
            <div className="flex items-center gap-2">
              {(['all', 'strategic', 'quick', 'completed'] as const).map(tab => (
                <Button
                  key={tab}
                  variant={selectedTab === tab ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedTab(tab)}
                  className="capitalize"
                >
                  {tab}
                </Button>
              ))}
            </div>

            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search campaigns..."
              className="flex-1 max-w-md"
            />

            <div className="flex items-center rounded-xl border bg-background">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {filteredCampaigns.length > 0 ? (
          <div className={cn('grid gap-6', viewMode === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1')}>
            {filteredCampaigns.map(campaign => {
              const progress = calculateProgress(campaign.deliverables);
              const completedDeliverables = campaign.deliverables.filter(d => d.status === 'completed').length;

              // Strategic Campaign Card
              if (campaign.type === 'strategic') {
                return (
                  <Card
                    key={campaign.id}
                    className="rounded-xl border p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer"
                    onClick={() => onNavigateToCampaign?.(campaign.id, 'result')}
                  >
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{campaign.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className="rounded-full bg-primary/10 text-primary text-xs">
                            Strategic
                          </Badge>
                          {getStatusBadge(campaign.status)}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={e => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open campaign menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={e => e.stopPropagation()}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={e => {
                            e.stopPropagation();
                            handleDuplicate(campaign);
                          }}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={e => e.stopPropagation()}>
                            <Archive className="h-4 w-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400"
                            onClick={e => {
                              e.stopPropagation();
                              handleDelete(campaign.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Meta Row */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <span>{campaign.confidence}% Confidence</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>Based on {campaign.assetsUsed} assets</span>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Deliverables</span>
                        <span className="font-semibold">
                          {completedDeliverables}/{campaign.deliverables.length} complete
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={e => {
                          e.stopPropagation();
                          onNavigateToCampaign?.(campaign.id, 'result');
                        }}
                      >
                        View Campaign
                      </Button>
                    </div>
                  </Card>
                );
              }

              // Quick Campaign Card
              return (
                <Card
                  key={campaign.id}
                  className="rounded-xl border border-dashed border-blue-200 dark:border-blue-800 p-6 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 cursor-pointer"
                  onClick={() => onNavigateToCampaign?.(campaign.id, 'result')}
                >
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{campaign.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-xs flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          Quick
                        </Badge>
                        {getStatusBadge(campaign.status)}
                      </div>
                      {/* Origin Indicator */}
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Zap className="h-3 w-3 text-amber-500" />
                        <span>Created via Quick Content</span>
                        <span>•</span>
                        <span>{campaign.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Compact Meta */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>{campaign.contentType}</span>
                    </div>
                    <span>•</span>
                    <span>{campaign.deliverables.length} deliverable</span>
                    {campaign.qualityScore && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-4 w-4 text-amber-500" />
                          <span>{campaign.qualityScore}/10</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <button
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={e => {
                        e.stopPropagation();
                        handleConvertToCampaign(campaign.id);
                      }}
                    >
                      Convert to Campaign
                    </button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation();
                        onNavigateToCampaign?.(campaign.id, 'result');
                      }}
                    >
                      Open
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Megaphone className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No campaigns yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Create your first campaign or quick content
            </p>
            <div className="flex items-center gap-3">
              <Button className="gap-2" onClick={() => setShowWizard(true)}>
                <Plus className="h-4 w-4" />
                New Campaign
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => setShowQuickContentModal(true)}>
                <Zap className="h-4 w-4" />
                Quick Content
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* New Campaign Wizard */}
      {showWizard && (
        <div className="fixed inset-0 z-50">
          <NewCampaignWizard onClose={() => setShowWizard(false)} />
        </div>
      )}

      {/* Quick Content Modal */}
      {showQuickContentModal && (
        <div className="fixed inset-0 z-50">
          <QuickContentModal 
            isOpen={showQuickContentModal} 
            onClose={() => setShowQuickContentModal(false)} 
          />
        </div>
      )}
    </div>
  );
}