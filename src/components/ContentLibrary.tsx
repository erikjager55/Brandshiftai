import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Library,
  Plus,
  CheckCircle2,
  Loader2,
  Star,
  Search,
  Grid3x3,
  List,
  MoreVertical,
  Megaphone,
  Zap,
  FileText,
  Share2,
  Mail,
  Layout,
  Eye,
  Copy,
  FolderOpen,
  Trash2,
  X,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ContentItem {
  id: string;
  title: string;
  type: 'blog' | 'social' | 'email' | 'ad' | 'landing' | 'other';
  status: 'draft' | 'in-progress' | 'complete';
  preview: string;
  wordCount: number;
  qualityScore: number;
  campaignId: string;
  campaignName: string;
  campaignType: 'strategic' | 'quick';
  updatedAt: Date;
}

interface ContentLibraryProps {
  onOpenQuickContent?: () => void;
  onNavigateToContent?: (contentId: string, campaignId: string) => void;
  onNavigateToCampaign?: (campaignId: string) => void;
}

// Mock data
const mockContent: ContentItem[] = [
  {
    id: 'c1',
    title: 'Blog: AI Trends in Marketing 2024',
    type: 'blog',
    status: 'complete',
    preview: 'Artificial intelligence is revolutionizing how brands connect with their audiences. From personalized content to predictive analytics...',
    wordCount: 1247,
    qualityScore: 92,
    campaignId: 'camp-1',
    campaignName: 'Q1 Product Launch Campaign',
    campaignType: 'strategic',
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: 'c2',
    title: 'LinkedIn Post Series - Week 1',
    type: 'social',
    status: 'in-progress',
    preview: '5 Ways to Improve Your Brand Positioning: 1. Know your audience deeply 2. Define your unique value...',
    wordCount: 450,
    qualityScore: 78,
    campaignId: 'quick-2',
    campaignName: 'LinkedIn Post Series',
    campaignType: 'quick',
    updatedAt: new Date('2024-01-19'),
  },
  {
    id: 'c3',
    title: 'Welcome Email Sequence - Part 1',
    type: 'email',
    status: 'complete',
    preview: "Welcome to our community! We're thrilled to have you join us on this journey to transform your brand...",
    wordCount: 680,
    qualityScore: 88,
    campaignId: 'camp-1',
    campaignName: 'Q1 Product Launch Campaign',
    campaignType: 'strategic',
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: 'c4',
    title: 'Facebook Ad Copy - New Product',
    type: 'ad',
    status: 'draft',
    preview: "Discover the future of smart home technology. Our new hub connects everything you need in one beautiful device...",
    wordCount: 125,
    qualityScore: 65,
    campaignId: 'camp-1',
    campaignName: 'Q1 Product Launch Campaign',
    campaignType: 'strategic',
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: 'c5',
    title: 'Landing Page: Product Features',
    type: 'landing',
    status: 'in-progress',
    preview: 'The smartest way to control your home. Our AI-powered hub learns your preferences and adapts to your lifestyle...',
    wordCount: 890,
    qualityScore: 82,
    campaignId: 'camp-1',
    campaignName: 'Q1 Product Launch Campaign',
    campaignType: 'strategic',
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: 'c6',
    title: 'Blog Post: 5 Ways to Improve Your Brand',
    type: 'blog',
    status: 'complete',
    preview: 'Building a strong brand takes time and strategy. Here are five proven methods to elevate your brand presence...',
    wordCount: 1050,
    qualityScore: 85,
    campaignId: 'quick-1',
    campaignName: 'Blog Post - Jan 20',
    campaignType: 'quick',
    updatedAt: new Date('2024-01-20'),
  },
];

const contentTypeConfig = {
  blog: { label: 'Blog Article', icon: FileText, color: 'blue' },
  social: { label: 'Social Post', icon: Share2, color: 'purple' },
  email: { label: 'Email', icon: Mail, color: 'green' },
  ad: { label: 'Ad Copy', icon: Megaphone, color: 'orange' },
  landing: { label: 'Landing Page', icon: Layout, color: 'pink' },
  other: { label: 'Other', icon: FileText, color: 'gray' },
};

export function ContentLibrary({
  onOpenQuickContent,
  onNavigateToContent,
  onNavigateToCampaign,
}: ContentLibraryProps) {
  console.log('ContentLibrary rendered with props:', { 
    hasOpenQuickContent: !!onOpenQuickContent,
    hasNavigateToContent: !!onNavigateToContent,
    hasNavigateToCampaign: !!onNavigateToCampaign
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [campaignFilter, setCampaignFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'quality' | 'name'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [groupByCampaign, setGroupByCampaign] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<ContentItem | null>(null);
  const [expandedCampaigns, setExpandedCampaigns] = useState<string[]>([]);

  // Filter and sort content
  const filteredContent = useMemo(() => {
    let filtered = mockContent.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.preview.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesCampaign = campaignFilter === 'all' || 
        (campaignFilter === 'strategic' && item.campaignType === 'strategic') ||
        (campaignFilter === 'quick' && item.campaignType === 'quick') ||
        item.campaignId === campaignFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchesSearch && matchesType && matchesCampaign && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'recent') {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      } else if (sortBy === 'quality') {
        return b.qualityScore - a.qualityScore;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [searchQuery, typeFilter, campaignFilter, statusFilter, sortBy]);

  // Stats
  const stats = useMemo(() => {
    const total = mockContent.length;
    const complete = mockContent.filter(c => c.status === 'complete').length;
    const inProgress = mockContent.filter(c => c.status === 'in-progress').length;
    const avgQuality = Math.round(
      mockContent.reduce((sum, c) => sum + c.qualityScore, 0) / total
    );

    return { total, complete, inProgress, avgQuality };
  }, []);

  // Group by campaign
  const groupedContent = useMemo(() => {
    const groups: Record<string, ContentItem[]> = {};
    filteredContent.forEach(item => {
      if (!groups[item.campaignId]) {
        groups[item.campaignId] = [];
      }
      groups[item.campaignId].push(item);
    });
    return groups;
  }, [filteredContent]);

  const uniqueCampaigns = useMemo(() => {
    const campaigns = new Map<string, { id: string; name: string; type: 'strategic' | 'quick' }>();
    mockContent.forEach(item => {
      if (!campaigns.has(item.campaignId)) {
        campaigns.set(item.campaignId, {
          id: item.campaignId,
          name: item.campaignName,
          type: item.campaignType,
        });
      }
    });
    return Array.from(campaigns.values());
  }, []);

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredContent.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredContent.map(c => c.id));
    }
  };

  const handleClearSelection = () => {
    setSelectedItems([]);
  };

  const toggleCampaignExpanded = (campaignId: string) => {
    setExpandedCampaigns(prev =>
      prev.includes(campaignId)
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const getStatusBadge = (status: ContentItem['status']) => {
    const config = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
      'in-progress': { label: 'In Progress', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
      complete: { label: 'Complete', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
    };
    const c = config[status];
    return <Badge className={cn('rounded-full text-xs', c.className)}>{c.label}</Badge>;
  };

  const getRelativeDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const renderContentCard = (item: ContentItem) => {
    const typeConfig = contentTypeConfig[item.type];
    const Icon = typeConfig.icon;

    return (
      <Card
        key={item.id}
        className={cn(
          'rounded-xl border p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer',
          selectedItems.includes(item.id) && 'border-primary bg-primary/5'
        )}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('button')) return;
          setSelectedDetail(item);
        }}
      >
        {/* Header Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedItems.includes(item.id)}
              onCheckedChange={() => handleSelectItem(item.id)}
              onClick={(e) => e.stopPropagation()}
            />
            <div className={cn(
              'rounded-lg p-2',
              `bg-${typeConfig.color}-100 dark:bg-${typeConfig.color}-900/30`
            )}>
              <Icon className={cn('h-4 w-4', `text-${typeConfig.color}-600 dark:text-${typeConfig.color}-400`)} />
            </div>
            <span className="text-xs uppercase text-muted-foreground tracking-wider">
              {typeConfig.label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {getStatusBadge(item.status)}
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => onNavigateToContent?.(item.id, item.campaignId)}
                >
                  <Eye className="h-4 w-4" />
                  Open
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Copy className="h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <FolderOpen className="h-4 w-4" />
                  Move to Campaign
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-red-600 dark:text-red-400">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{item.title}</h3>

        {/* Preview */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.preview}</p>

        {/* Campaign Row */}
        <div
          className="flex items-center gap-2 mb-4 group"
          onClick={(e) => {
            e.stopPropagation();
            onNavigateToCampaign?.(item.campaignId);
          }}
        >
          {item.campaignType === 'strategic' ? (
            <Megaphone className="h-4 w-4 text-primary flex-shrink-0" />
          ) : (
            <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          )}
          <span className="text-sm font-medium group-hover:underline truncate">
            {item.campaignName}
          </span>
        </div>

        {/* Meta Row */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span>{item.wordCount} words</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold',
                item.qualityScore >= 80 && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
                item.qualityScore >= 60 && item.qualityScore < 80 && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
                item.qualityScore < 60 && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
              )}
            >
              {item.qualityScore}
            </div>
          </div>
          <span>•</span>
          <span>{getRelativeDate(item.updatedAt)}</span>
        </div>

        {/* Footer */}
        <Button
          variant="outline"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onNavigateToContent?.(item.id, item.campaignId);
          }}
        >
          Open in Studio
        </Button>
      </Card>
    );
  };

  const renderListView = () => {
    return (
      <div className="rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left p-4 text-sm font-semibold">
                <Checkbox
                  checked={selectedItems.length === filteredContent.length && filteredContent.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="text-left p-4 text-sm font-semibold">Content</th>
              <th className="text-left p-4 text-sm font-semibold">Type</th>
              <th className="text-left p-4 text-sm font-semibold">Campaign</th>
              <th className="text-left p-4 text-sm font-semibold">Status</th>
              <th className="text-left p-4 text-sm font-semibold">Quality</th>
              <th className="text-left p-4 text-sm font-semibold">Updated</th>
              <th className="text-left p-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContent.map(item => {
              const typeConfig = contentTypeConfig[item.type];
              const Icon = typeConfig.icon;

              return (
                <tr
                  key={item.id}
                  className={cn(
                    'border-b hover:bg-muted/50 transition-colors',
                    selectedItems.includes(item.id) && 'bg-primary/5'
                  )}
                >
                  <td className="p-4">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleSelectItem(item.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={cn('rounded-lg p-2', `bg-${typeConfig.color}-100 dark:bg-${typeConfig.color}-900/30`)}>
                        <Icon className={cn('h-4 w-4', `text-${typeConfig.color}-600 dark:text-${typeConfig.color}-400`)} />
                      </div>
                      <span className="font-semibold truncate max-w-md">{item.title}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className="rounded-full text-xs">{typeConfig.label}</Badge>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => onNavigateToCampaign?.(item.campaignId)}
                      className="flex items-center gap-2 hover:underline"
                    >
                      {item.campaignType === 'strategic' ? (
                        <Megaphone className="h-4 w-4 text-primary" />
                      ) : (
                        <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      )}
                      <span className="text-sm truncate max-w-xs">{item.campaignName}</span>
                    </button>
                  </td>
                  <td className="p-4">{getStatusBadge(item.status)}</td>
                  <td className="p-4">
                    <span className={cn(
                      'font-semibold',
                      item.qualityScore >= 80 && 'text-green-600 dark:text-green-400',
                      item.qualityScore >= 60 && item.qualityScore < 80 && 'text-amber-600 dark:text-amber-400',
                      item.qualityScore < 60 && 'text-red-600 dark:text-red-400'
                    )}>
                      {item.qualityScore}%
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {getRelativeDate(item.updatedAt)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onNavigateToContent?.(item.id, item.campaignId)}
                      >
                        Open
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Copy className="h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <FolderOpen className="h-4 w-4" />
                            Move to Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-red-600 dark:text-red-400">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderGroupedView = () => {
    return (
      <div className="space-y-6">
        {Object.entries(groupedContent).map(([campaignId, items]) => {
          const campaign = uniqueCampaigns.find(c => c.id === campaignId);
          if (!campaign) return null;

          const isExpanded = expandedCampaigns.includes(campaignId);

          return (
            <div key={campaignId} className="rounded-xl border overflow-hidden">
              {/* Campaign Header */}
              <button
                onClick={() => toggleCampaignExpanded(campaignId)}
                className="w-full p-4 bg-muted/50 hover:bg-muted transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {campaign.type === 'strategic' ? (
                    <Megaphone className="h-5 w-5 text-primary" />
                  ) : (
                    <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  )}
                  <h3 className="text-lg font-semibold">{campaign.name}</h3>
                  <Badge className={cn(
                    'rounded-full text-xs',
                    campaign.type === 'strategic'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  )}>
                    {campaign.type === 'strategic' ? 'Strategic' : 'Quick'}
                  </Badge>
                  <Badge className="rounded-full text-xs bg-muted">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </Badge>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              {/* Content Items */}
              {isExpanded && (
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(item => renderContentCard(item))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (mockContent.length === 0) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="rounded-xl bg-muted p-6 mb-6">
              <Library className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No content yet</h2>
            <p className="text-muted-foreground mb-6">
              All your campaign content will appear here
            </p>
            <div className="flex items-center gap-3">
              <Button onClick={onOpenQuickContent} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Quick Content
              </Button>
              <Button variant="outline">Start Campaign</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-8 py-12 space-y-10">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3">
              <Library className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold mb-1">Content Library</h1>
              <p className="text-muted-foreground">All your campaign content in one place</p>
            </div>
          </div>
          <Button onClick={onOpenQuickContent} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Content
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-xl border p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Content</p>
            <p className="text-4xl font-semibold">{stats.total}</p>
          </Card>
          <Card className="rounded-xl border p-6">
            <p className="text-sm text-muted-foreground mb-2">Complete</p>
            <div className="flex items-center gap-2">
              <p className="text-4xl font-semibold text-green-600 dark:text-green-400">
                {stats.complete}
              </p>
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </Card>
          <Card className="rounded-xl border p-6">
            <p className="text-sm text-muted-foreground mb-2">In Progress</p>
            <div className="flex items-center gap-2">
              <p className="text-4xl font-semibold text-blue-600 dark:text-blue-400">
                {stats.inProgress}
              </p>
              <Loader2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </Card>
          <Card className="rounded-xl border p-6">
            <p className="text-sm text-muted-foreground mb-2">Avg Quality</p>
            <div className="flex items-center gap-2">
              <p className="text-4xl font-semibold text-primary">{stats.avgQuality}%</p>
              <Star className="h-6 w-6 text-primary" />
            </div>
          </Card>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 rounded-lg"
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px] rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="blog">Blog</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="ad">Ad Copy</SelectItem>
              <SelectItem value="landing">Landing Page</SelectItem>
            </SelectContent>
          </Select>

          <Select value={campaignFilter} onValueChange={setCampaignFilter}>
            <SelectTrigger className="w-[200px] rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="strategic">Strategic Campaigns</SelectItem>
              <SelectItem value="quick">Quick Campaigns</SelectItem>
              {uniqueCampaigns.map(campaign => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="complete">Complete</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
            <SelectTrigger className="w-[150px] rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="quality">Quality Score</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1 rounded-lg border p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="gap-2"
            >
              <Grid3x3 className="h-4 w-4" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="gap-2"
            >
              <List className="h-4 w-4" />
              List
            </Button>
          </div>

          <Button
            variant={groupByCampaign ? 'default' : 'outline'}
            size="sm"
            onClick={() => setGroupByCampaign(!groupByCampaign)}
          >
            Group by Campaign
          </Button>
        </div>

        {/* Content Display */}
        {groupByCampaign ? (
          renderGroupedView()
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredContent.map(item => renderContentCard(item))}
          </div>
        ) : (
          renderListView()
        )}

        {/* Bulk Actions Bar */}
        {selectedItems.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-background rounded-xl border shadow-lg p-4 flex items-center gap-4 z-50">
            <span className="text-sm font-semibold">
              {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowMoveModal(true)}>
                <FolderOpen className="h-4 w-4 mr-2" />
                Move to Campaign
              </Button>
              <Select defaultValue="draft">
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="Change Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Mark as Draft</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
            <button onClick={handleClearSelection} className="text-sm text-primary hover:underline">
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Move to Campaign Modal */}
      <Dialog open={showMoveModal} onOpenChange={setShowMoveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move Content to Campaign</DialogTitle>
            <DialogDescription>
              Select a campaign to move the selected content to
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Selected items ({selectedItems.length})</p>
              <div className="rounded-lg border p-3 max-h-32 overflow-y-auto space-y-1">
                {selectedItems.map(id => {
                  const item = mockContent.find(c => c.id === id);
                  return item ? (
                    <p key={id} className="text-sm truncate">{item.title}</p>
                  ) : null;
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Target Campaign</Label>
              <Select>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueCampaigns.map(campaign => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="new">+ Create New Campaign</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p className="text-xs text-muted-foreground">
              Note: Content will be removed from current campaign
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMoveModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowMoveModal(false);
              handleClearSelection();
            }}>
              Move Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Content Detail Slide-over */}
      <Dialog open={!!selectedDetail} onOpenChange={(open) => !open && setSelectedDetail(null)}>
        <DialogContent className="max-w-md">
          {selectedDetail && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedDetail.title}</DialogTitle>
                <DialogDescription>
                  {contentTypeConfig[selectedDetail.type].label}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div>
                  <p className="text-sm font-semibold mb-2">Preview</p>
                  <p className="text-sm text-muted-foreground">{selectedDetail.preview}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Word Count</p>
                    <p className="text-sm font-semibold">{selectedDetail.wordCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Quality Score</p>
                    <p className="text-sm font-semibold">{selectedDetail.qualityScore}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    {getStatusBadge(selectedDetail.status)}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Updated</p>
                    <p className="text-sm font-semibold">{getRelativeDate(selectedDetail.updatedAt)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Campaign</p>
                  <button
                    onClick={() => {
                      onNavigateToCampaign?.(selectedDetail.campaignId);
                      setSelectedDetail(null);
                    }}
                    className="flex items-center gap-2 hover:underline"
                  >
                    {selectedDetail.campaignType === 'strategic' ? (
                      <Megaphone className="h-4 w-4 text-primary" />
                    ) : (
                      <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    )}
                    <span className="text-sm font-semibold">{selectedDetail.campaignName}</span>
                  </button>
                </div>
              </div>

              <DialogFooter>
                <Button
                  className="w-full"
                  onClick={() => {
                    onNavigateToContent?.(selectedDetail.id, selectedDetail.campaignId);
                    setSelectedDetail(null);
                  }}
                >
                  Open in Studio
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}