/**
 * Content Library - Complete Redesign
 * Central hub for all campaign content (Strategic + Quick Content)
 */

import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
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
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import {
  Library,
  Plus,
  CheckCircle2,
  Clock,
  Star,
  Search,
  Grid3x3,
  List,
  MoreVertical,
  Target,
  Zap,
  FileText,
  Mail,
  Image,
  Video,
  Download,
  Copy,
  Archive,
  Trash2,
  ChevronDown,
  ChevronRight,
  Filter,
  Share2,
  LayoutGrid,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { getContentTypeById, type ContentType } from '../types/content-types';

interface ContentLibraryProps {
  onOpenQuickContent?: () => void;
  onNavigateToContent?: (contentId: string, campaignId: string) => void;
  onNavigateToCampaign?: (campaignId: string) => void;
}

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: string; // content type id
  campaignId: string;
  campaignName: string;
  campaignType: 'strategic' | 'quick';
  status: 'complete' | 'in-progress' | 'draft';
  qualityScore: number;
  wordCount: number;
  updatedAt: string; // ISO date
}

type ViewMode = 'grid' | 'list';
type SortBy = 'recent' | 'oldest' | 'a-z' | 'z-a' | 'quality-high' | 'quality-low';

// Sample data with 2026 dates and fixed titles
const SAMPLE_CONTENT: ContentItem[] = [
  {
    id: 'content-1',
    title: 'AI Trends in Marketing 2026',
    description: 'Explore the latest artificial intelligence trends transforming marketing strategies in 2026.',
    type: 'blog-post',
    campaignId: 'campaign-1',
    campaignName: 'Q1 Product Launch Campaign',
    campaignType: 'strategic',
    status: 'complete',
    qualityScore: 92,
    wordCount: 1247,
    updatedAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'content-2',
    title: '5 Ways to Improve Your Brand',
    description: 'Practical tips to strengthen your brand identity and market presence.',
    type: 'blog-post',
    campaignId: 'quick-1',
    campaignName: 'Blog Post - Jan 20',
    campaignType: 'quick',
    status: 'complete',
    qualityScore: 85,
    wordCount: 1050,
    updatedAt: '2026-01-20T09:00:00Z',
  },
  {
    id: 'content-3',
    title: 'LinkedIn Post Series - Week 1',
    description: 'First week of our LinkedIn thought leadership series.',
    type: 'linkedin-post',
    campaignId: 'quick-2',
    campaignName: 'LinkedIn Post Series',
    campaignType: 'quick',
    status: 'in-progress',
    qualityScore: 78,
    wordCount: 450,
    updatedAt: '2026-01-19T14:30:00Z',
  },
  {
    id: 'content-4',
    title: 'Welcome Email Sequence - Part 1',
    description: 'Engaging welcome email to onboard new subscribers.',
    type: 'welcome-email',
    campaignId: 'campaign-1',
    campaignName: 'Q1 Product Launch Campaign',
    campaignType: 'strategic',
    status: 'complete',
    qualityScore: 88,
    wordCount: 680,
    updatedAt: '2026-01-18T16:00:00Z',
  },
  {
    id: 'content-5',
    title: 'Facebook Ad Copy - New Product',
    description: 'Compelling ad copy for Facebook campaign promoting our new product.',
    type: 'facebook-post',
    campaignId: 'campaign-1',
    campaignName: 'Q1 Product Launch Campaign',
    campaignType: 'strategic',
    status: 'draft',
    qualityScore: 65,
    wordCount: 125,
    updatedAt: '2026-01-17T11:00:00Z',
  },
  {
    id: 'content-6',
    title: 'Landing Page: Product Features',
    description: 'Comprehensive landing page highlighting key product features and benefits.',
    type: 'article',
    campaignId: 'campaign-1',
    campaignName: 'Q1 Product Launch Campaign',
    campaignType: 'strategic',
    status: 'in-progress',
    qualityScore: 82,
    wordCount: 890,
    updatedAt: '2026-01-16T13:00:00Z',
  },
];

// Helper to get content type category
const getContentTypeCategory = (typeId: string): string => {
  const contentType = getContentTypeById(typeId);
  return contentType?.category || 'written';
};

// Helper to get content type display name
const getContentTypeName = (typeId: string): string => {
  const contentType = getContentTypeById(typeId);
  return contentType?.name || typeId;
};

// Helper to format date
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  return `${month} ${day}`;
};

// Status badge component
const StatusBadge = ({ status }: { status: ContentItem['status'] }) => {
  const config = {
    complete: {
      label: 'Complete',
      className: 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400',
    },
    'in-progress': {
      label: 'In Progress',
      className: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    },
    draft: {
      label: 'Draft',
      className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    },
  };

  const { label, className } = config[status];

  return (
    <Badge className={cn('rounded-full px-3 py-1 text-xs font-medium', className)}>
      {label}
    </Badge>
  );
};

// Quality score badge component
const QualityBadge = ({ score }: { score: number }) => {
  const getColor = () => {
    if (score >= 85) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <span className={cn('font-semibold text-sm', getColor())}>
      {score}
    </span>
  );
};

// Type badge component
const TypeBadge = ({ typeId }: { typeId: string }) => {
  const category = getContentTypeCategory(typeId);
  const name = getContentTypeName(typeId).toUpperCase();

  const categoryColors = {
    written: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    social: 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
    visual: 'bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400',
    video: 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400',
    email: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  };

  const colorClass = categoryColors[category as keyof typeof categoryColors] || categoryColors.written;

  return (
    <Badge className={cn('rounded-full px-3 py-1 text-xs font-medium uppercase', colorClass)}>
      {name}
    </Badge>
  );
};

export function ContentLibrary({
  onOpenQuickContent,
  onNavigateToContent,
  onNavigateToCampaign,
}: ContentLibraryProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [groupByCampaign, setGroupByCampaign] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortBy>('recent');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [createMenuOpen, setCreateMenuOpen] = useState(false);

  // Filter and sort content
  const filteredAndSortedContent = useMemo(() => {
    let filtered = SAMPLE_CONTENT.filter((item) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !item.title.toLowerCase().includes(query) &&
          !item.description.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Type filter
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }

      // Campaign filter
      if (selectedCampaign !== 'all' && item.campaignId !== selectedCampaign) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && item.status !== selectedStatus) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'oldest':
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        case 'a-z':
          return a.title.localeCompare(b.title);
        case 'z-a':
          return b.title.localeCompare(a.title);
        case 'quality-high':
          return b.qualityScore - a.qualityScore;
        case 'quality-low':
          return a.qualityScore - b.qualityScore;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedType, selectedCampaign, selectedStatus, sortBy]);

  // Group content by campaign
  const groupedContent = useMemo(() => {
    const groups: Record<string, ContentItem[]> = {};

    filteredAndSortedContent.forEach((item) => {
      const key = item.campaignId;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });

    return groups;
  }, [filteredAndSortedContent]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = SAMPLE_CONTENT.length;
    const complete = SAMPLE_CONTENT.filter((c) => c.status === 'complete').length;
    const inProgress = SAMPLE_CONTENT.filter((c) => c.status === 'in-progress').length;
    const avgQuality =
      SAMPLE_CONTENT.reduce((sum, c) => sum + c.qualityScore, 0) / total || 0;

    return { total, complete, inProgress, avgQuality: Math.round(avgQuality) };
  }, []);

  // Get unique campaigns
  const campaigns = useMemo(() => {
    const uniqueCampaigns = new Map<string, { id: string; name: string; type: 'strategic' | 'quick' }>();
    SAMPLE_CONTENT.forEach((item) => {
      if (!uniqueCampaigns.has(item.campaignId)) {
        uniqueCampaigns.set(item.campaignId, {
          id: item.campaignId,
          name: item.campaignName,
          type: item.campaignType,
        });
      }
    });
    return Array.from(uniqueCampaigns.values());
  }, []);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(filteredAndSortedContent.map((c) => c.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    const newSelection = new Set(selectedItems);
    if (checked) {
      newSelection.add(id);
    } else {
      newSelection.delete(id);
    }
    setSelectedItems(newSelection);
  };

  const handleClearSelection = () => {
    setSelectedItems(new Set());
  };

  const handleToggleGroup = (campaignId: string) => {
    const newCollapsed = new Set(collapsedGroups);
    if (newCollapsed.has(campaignId)) {
      newCollapsed.delete(campaignId);
    } else {
      newCollapsed.add(campaignId);
    }
    setCollapsedGroups(newCollapsed);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCampaign('all');
    setSelectedStatus('all');
    setSortBy('recent');
  };

  const hasActiveFilters =
    searchQuery || selectedType !== 'all' || selectedCampaign !== 'all' || selectedStatus !== 'all';

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
              <LayoutGrid className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">Content Library</h1>
              <p className="text-sm text-muted-foreground mt-1">
                All your campaign content in one place
              </p>
            </div>
          </div>

          {/* Create Content Dropdown */}
          <DropdownMenu open={createMenuOpen} onOpenChange={setCreateMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Content
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={onOpenQuickContent}>
                <Zap className="h-4 w-4 mr-2" />
                Quick Content
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Target className="h-4 w-4 mr-2" />
                New Campaign
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Content</p>
              <p className="text-3xl font-semibold">{stats.total}</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Complete</p>
                <p className="text-3xl font-semibold text-green-600 dark:text-green-400">
                  {stats.complete}
                </p>
              </div>
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-3xl font-semibold text-amber-600 dark:text-amber-400">
                  {stats.inProgress}
                </p>
              </div>
              <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Avg Quality</p>
                <p
                  className={cn(
                    'text-3xl font-semibold',
                    stats.avgQuality >= 85
                      ? 'text-green-600 dark:text-green-400'
                      : stats.avgQuality >= 70
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-red-600 dark:text-red-400'
                  )}
                >
                  {stats.avgQuality}%
                </p>
              </div>
              <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </Card>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {/* Search */}
            <div className="relative w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="blog-post">Blog Post</SelectItem>
                <SelectItem value="linkedin-post">LinkedIn Post</SelectItem>
                <SelectItem value="twitter-post">Twitter Post</SelectItem>
                <SelectItem value="welcome-email">Welcome Email</SelectItem>
                <SelectItem value="facebook-post">Facebook Post</SelectItem>
                <SelectItem value="article">Article</SelectItem>
              </SelectContent>
            </Select>

            {/* Campaign Filter */}
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Campaigns" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.type === 'strategic' ? '🎯' : '⚡'} {campaign.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Recent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="a-z">A-Z</SelectItem>
                <SelectItem value="z-a">Z-A</SelectItem>
                <SelectItem value="quality-high">Quality High-Low</SelectItem>
                <SelectItem value="quality-low">Quality Low-High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            {/* Group by Campaign Toggle */}
            <Button
              variant={groupByCampaign ? 'default' : 'outline'}
              onClick={() => setGroupByCampaign(!groupByCampaign)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Group by Campaign
            </Button>

            {/* View Toggle */}
            <div className="flex items-center border rounded-xl overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bulk Actions Toolbar */}
        {selectedItems.size > 0 && (
          <div className="sticky top-0 z-10 bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm font-medium">
              {selectedItems.size} selected
            </span>
            <div className="flex items-center gap-2">
              {selectedItems.size === 1 && (
                <Button variant="outline" size="sm" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Open in Studio
                </Button>
              )}
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Copy className="h-4 w-4" />
                Duplicate
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Archive className="h-4 w-4" />
                Archive
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSelection}
                className="ml-2"
              >
                Clear selection
              </Button>
            </div>
          </div>
        )}

        {/* Content Grid/List */}
        {filteredAndSortedContent.length === 0 ? (
          <Card className="p-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {hasActiveFilters ? 'No content matches your filters' : 'No content yet'}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {hasActiveFilters
                    ? 'Try adjusting your filters or search term'
                    : 'Create your first piece of content to get started'}
                </p>
              </div>
              {hasActiveFilters ? (
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear filters
                </Button>
              ) : (
                <Button onClick={onOpenQuickContent} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Content
                </Button>
              )}
            </div>
          </Card>
        ) : groupByCampaign ? (
          /* Grouped View */
          <div className="space-y-4">
            {Object.entries(groupedContent).map(([campaignId, items]) => {
              const campaign = campaigns.find((c) => c.id === campaignId);
              const isCollapsed = collapsedGroups.has(campaignId);

              return (
                <div key={campaignId} className="bg-muted/30 rounded-xl overflow-hidden">
                  {/* Group Header */}
                  <button
                    onClick={() => handleToggleGroup(campaignId)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {campaign?.type === 'strategic' ? (
                        <Target className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                      ) : (
                        <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      )}
                      <span className="text-lg font-semibold">{campaign?.name}</span>
                      {campaign?.type === 'strategic' && (
                        <Badge className="bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
                          Strategic
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {items.length} {items.length === 1 ? 'item' : 'items'}
                      </span>
                      {isCollapsed ? (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {/* Group Content */}
                  {!isCollapsed && (
                    <div className="p-6 pt-0">
                      {viewMode === 'grid' ? (
                        <div className="grid grid-cols-3 gap-6">
                          {items.map((item) => (
                            <ContentCard
                              key={item.id}
                              item={item}
                              showCampaign={false}
                              selected={selectedItems.has(item.id)}
                              onSelect={(checked) => handleSelectItem(item.id, checked)}
                              onClick={() => onNavigateToContent?.(item.id, item.campaignId)}
                            />
                          ))}
                        </div>
                      ) : (
                        <ContentTable
                          items={items}
                          selectedItems={selectedItems}
                          onSelectItem={handleSelectItem}
                          onItemClick={(id, campaignId) =>
                            onNavigateToContent?.(id, campaignId)
                          }
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-3 gap-6">
            {filteredAndSortedContent.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
                showCampaign={true}
                selected={selectedItems.has(item.id)}
                onSelect={(checked) => handleSelectItem(item.id, checked)}
                onClick={() => onNavigateToContent?.(item.id, item.campaignId)}
              />
            ))}
          </div>
        ) : (
          /* List View */
          <ContentTable
            items={filteredAndSortedContent}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onItemClick={(id, campaignId) => onNavigateToContent?.(id, campaignId)}
          />
        )}
      </div>
    </div>
  );
}

// Content Card Component
interface ContentCardProps {
  item: ContentItem;
  showCampaign: boolean;
  selected: boolean;
  onSelect: (checked: boolean) => void;
  onClick: () => void;
}

function ContentCard({ item, showCampaign, selected, onSelect, onClick }: ContentCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow relative group">
      {/* Header Row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={selected}
            onCheckedChange={onSelect}
            onClick={(e) => e.stopPropagation()}
          />
          <TypeBadge typeId={item.type} />
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={item.status} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onClick}>
                <FileText className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>

      {/* Campaign Row */}
      {showCampaign && (
        <div className="flex items-center gap-2 mb-4">
          {item.campaignType === 'strategic' ? (
            <Target className="h-4 w-4 text-teal-600 dark:text-teal-400" />
          ) : (
            <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          )}
          <span className="text-sm text-muted-foreground">{item.campaignName}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <span>{item.wordCount} words</span>
        <span>•</span>
        <QualityBadge score={item.qualityScore} />
        <span>•</span>
        <span>{formatDate(item.updatedAt)}</span>
      </div>

      {/* Action Button */}
      <Button variant="outline" className="w-full" onClick={onClick}>
        Open in Studio
      </Button>
    </Card>
  );
}

// Content Table Component
interface ContentTableProps {
  items: ContentItem[];
  selectedItems: Set<string>;
  onSelectItem: (id: string, checked: boolean) => void;
  onItemClick: (id: string, campaignId: string) => void;
}

function ContentTable({ items, selectedItems, onSelectItem, onItemClick }: ContentTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="w-12 px-6 py-3 text-left">
                <Checkbox />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Content
              </th>
              <th className="w-32 px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Type
              </th>
              <th className="w-56 px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Campaign
              </th>
              <th className="w-28 px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </th>
              <th className="w-20 px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Quality
              </th>
              <th className="w-24 px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Updated
              </th>
              <th className="w-28 px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                className={cn(
                  'border-b last:border-b-0 hover:bg-muted/50 cursor-pointer transition-colors',
                  index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                )}
                onClick={() => onItemClick(item.id, item.campaignId)}
              >
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedItems.has(item.id)}
                    onCheckedChange={(checked) =>
                      onSelectItem(item.id, checked as boolean)
                    }
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="font-medium truncate">{item.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <TypeBadge typeId={item.type} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {item.campaignType === 'strategic' ? (
                      <Target className="h-4 w-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                    ) : (
                      <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    )}
                    <span className="text-sm truncate">{item.campaignName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-6 py-4">
                  <QualityBadge score={item.qualityScore} />
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {formatDate(item.updatedAt)}
                </td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => onItemClick(item.id, item.campaignId)}>
                      Open
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="h-4 w-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
