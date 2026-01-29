/**
 * Knowledge Context Modal for Persona Chat
 * Allows selecting brand assets and research insights to add context to AI conversations
 * 
 * Features:
 * - Categorized asset selection by type
 * - Dual filter system (Type + Status)
 * - Collapsible sections
 * - Real-time search
 * - Multi-select with visual feedback
 * - Sample data for all asset types
 */

import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import {
  Target,
  Heart,
  Users,
  Package,
  TrendingUp,
  BookOpen,
  FileText,
  Palette,
  MessageSquare,
  Flag,
  Search,
  X,
  Check,
  ChevronDown,
  Video,
} from 'lucide-react';
import { cn } from '../../lib/utils';

// ==================== TYPES ====================

type AssetType = 'brand-assets' | 'personas' | 'products' | 'insights' | 'library';
type AssetStatus = 'validated' | 'ready' | 'in-progress' | 'not-started';

interface BaseAsset {
  id: string;
  name: string;
  type: AssetType;
  status: AssetStatus;
  icon: any;
  subtitle?: string;
}

interface PersonaAsset extends BaseAsset {
  type: 'personas';
  researchConfidence: number; // 0-100
}

interface ProductAsset extends BaseAsset {
  type: 'products';
  productType: 'Software' | 'Consulting' | 'Mobile';
}

interface InsightAsset extends BaseAsset {
  type: 'insights';
  impact: 'high' | 'medium';
}

interface LibraryAsset extends BaseAsset {
  type: 'library';
  category: string;
}

type Asset = BaseAsset | PersonaAsset | ProductAsset | InsightAsset | LibraryAsset;

interface KnowledgeContextModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplySelection: (assetIds: string[]) => void;
}

// ==================== SAMPLE DATA ====================

const SAMPLE_ASSETS: Asset[] = [
  // Brand Assets (4)
  {
    id: 'ba-1',
    name: 'Mission Statement',
    type: 'brand-assets',
    status: 'ready',
    icon: Target,
  },
  {
    id: 'ba-2',
    name: 'Core Values',
    type: 'brand-assets',
    status: 'validated',
    icon: Heart,
  },
  {
    id: 'ba-3',
    name: 'Visual Identity',
    type: 'brand-assets',
    status: 'in-progress',
    icon: Palette,
  },
  {
    id: 'ba-4',
    name: 'Brand Voice',
    type: 'brand-assets',
    status: 'not-started',
    icon: FileText,
  },
  // Personas (3)
  {
    id: 'p-1',
    name: 'Sarah the Startup Founder',
    type: 'personas',
    status: 'ready',
    icon: Users,
    researchConfidence: 25,
  } as PersonaAsset,
  {
    id: 'p-2',
    name: 'Marcus the Marketing Director',
    type: 'personas',
    status: 'ready',
    icon: Users,
    researchConfidence: 25,
  } as PersonaAsset,
  {
    id: 'p-3',
    name: 'Lisa the Freelance Designer',
    type: 'personas',
    status: 'ready',
    icon: Users,
    researchConfidence: 0,
  } as PersonaAsset,
  // Products & Services (3)
  {
    id: 'pr-1',
    name: 'Digital Platform Suite',
    type: 'products',
    status: 'ready',
    icon: Package,
    productType: 'Software',
  } as ProductAsset,
  {
    id: 'pr-2',
    name: 'Brand Strategy Consulting',
    type: 'products',
    status: 'validated',
    icon: Package,
    productType: 'Consulting',
  } as ProductAsset,
  {
    id: 'pr-3',
    name: 'Mobile App Framework',
    type: 'products',
    status: 'ready',
    icon: Package,
    productType: 'Mobile',
  } as ProductAsset,
  // Market Insights (7)
  {
    id: 'mi-1',
    name: 'AI-Powered Personalization',
    type: 'insights',
    status: 'validated',
    icon: TrendingUp,
    impact: 'high',
  } as InsightAsset,
  {
    id: 'mi-2',
    name: 'Sustainability as Standard',
    type: 'insights',
    status: 'validated',
    icon: TrendingUp,
    impact: 'high',
  } as InsightAsset,
  {
    id: 'mi-3',
    name: 'Remote-First Work Culture',
    type: 'insights',
    status: 'ready',
    icon: TrendingUp,
    impact: 'high',
  } as InsightAsset,
  {
    id: 'mi-4',
    name: 'Micro-Moment Marketing',
    type: 'insights',
    status: 'ready',
    icon: TrendingUp,
    impact: 'high',
  } as InsightAsset,
  {
    id: 'mi-5',
    name: 'Community Commerce',
    type: 'insights',
    status: 'validated',
    icon: TrendingUp,
    impact: 'medium',
  } as InsightAsset,
  {
    id: 'mi-6',
    name: 'Privacy-First Data Strategies',
    type: 'insights',
    status: 'ready',
    icon: TrendingUp,
    impact: 'high',
  } as InsightAsset,
  {
    id: 'mi-7',
    name: 'Experience Economy',
    type: 'insights',
    status: 'in-progress',
    icon: TrendingUp,
    impact: 'high',
  } as InsightAsset,
  // Knowledge Library (3)
  {
    id: 'kl-1',
    name: 'Building Better Brands',
    type: 'library',
    status: 'ready',
    icon: BookOpen,
    category: 'Brand Strategy',
  } as LibraryAsset,
  {
    id: 'kl-2',
    name: 'Design System Gallery',
    type: 'library',
    status: 'ready',
    icon: FileText,
    category: 'Design',
  } as LibraryAsset,
  {
    id: 'kl-3',
    name: 'AI Implementation Guide',
    type: 'library',
    status: 'validated',
    icon: Video,
    category: 'Technology',
  } as LibraryAsset,
];

// ==================== CONFIGURATION ====================

const TYPE_CONFIG: Record<AssetType, { label: string; icon: any; color: string }> = {
  'brand-assets': {
    label: 'Brand Assets',
    icon: Target,
    color: 'text-primary',
  },
  'personas': {
    label: 'Personas',
    icon: Users,
    color: 'text-blue-600 dark:text-blue-400',
  },
  'products': {
    label: 'Products',
    icon: Package,
    color: 'text-purple-600 dark:text-purple-400',
  },
  'insights': {
    label: 'Insights',
    icon: TrendingUp,
    color: 'text-amber-600 dark:text-amber-400',
  },
  'library': {
    label: 'Library',
    icon: BookOpen,
    color: 'text-gray-600 dark:text-gray-400',
  },
};

const STATUS_CONFIG: Record<AssetStatus, { label: string; dotColor: string; badgeColor: string }> = {
  'validated': {
    label: 'Validated',
    dotColor: 'bg-green-600',
    badgeColor: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  },
  'ready': {
    label: 'Ready',
    dotColor: 'bg-green-500',
    badgeColor: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  },
  'in-progress': {
    label: 'In Progress',
    dotColor: 'bg-blue-600',
    badgeColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  },
  'not-started': {
    label: 'Not Started',
    dotColor: 'bg-gray-400',
    badgeColor: 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400',
  },
};

// ==================== COMPONENTS ====================

function ProgressDots({ percentage }: { percentage: number }) {
  const filled = Math.ceil(percentage / 25);
  
  return (
    <div className="flex gap-1 items-center">
      <span className="text-xs text-muted-foreground mr-1">{percentage}%</span>
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
  );
}

function AssetItem({ 
  asset, 
  isSelected, 
  onToggle 
}: { 
  asset: Asset; 
  isSelected: boolean; 
  onToggle: () => void;
}) {
  const Icon = asset.icon;
  
  return (
    <div
      onClick={onToggle}
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all',
        'hover:bg-muted/50',
        isSelected && 'bg-primary/5 border-l-2 border-primary'
      )}
    >
      {/* Checkbox */}
      <div
        className={cn(
          'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
          isSelected
            ? 'bg-primary border-primary'
            : 'border-muted-foreground/30'
        )}
      >
        {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
      </div>

      {/* Icon */}
      <div className="flex-shrink-0">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{asset.name}</div>
        {asset.type === 'personas' && (
          <ProgressDots percentage={(asset as PersonaAsset).researchConfidence} />
        )}
        {asset.subtitle && (
          <div className="text-xs text-muted-foreground">{asset.subtitle}</div>
        )}
      </div>

      {/* Status Badge */}
      <Badge className={cn('rounded-full px-2 py-0.5 text-xs', STATUS_CONFIG[asset.status].badgeColor)}>
        {STATUS_CONFIG[asset.status].label}
      </Badge>

      {/* Additional Badges */}
      {asset.type === 'products' && (
        <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs">
          {(asset as ProductAsset).productType}
        </Badge>
      )}
      {asset.type === 'insights' && (
        <Badge
          className={cn(
            'rounded-full px-2 py-0.5 text-xs',
            (asset as InsightAsset).impact === 'high'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
              : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
          )}
        >
          {(asset as InsightAsset).impact === 'high' ? 'High Impact' : 'Medium Impact'}
        </Badge>
      )}
      {asset.type === 'library' && (
        <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs">
          {(asset as LibraryAsset).category}
        </Badge>
      )}
    </div>
  );
}

function AssetSection({
  type,
  assets,
  selectedIds,
  onToggle,
}: {
  type: AssetType;
  assets: Asset[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const config = TYPE_CONFIG[type];
  const SectionIcon = config.icon;

  if (assets.length === 0) return null;

  return (
    <div>
      {/* Section Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between py-2 cursor-pointer hover:bg-muted/50 rounded-lg px-2 transition-colors"
      >
        <div className="flex items-center gap-2">
          <SectionIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {config.label}
          </span>
          <span className="text-xs text-muted-foreground">({assets.length})</span>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform',
            isExpanded && 'rotate-180'
          )}
        />
      </div>

      {/* Section Content */}
      {isExpanded && (
        <div className="mt-2 space-y-1">
          {assets.map((asset) => (
            <AssetItem
              key={asset.id}
              asset={asset}
              isSelected={selectedIds.includes(asset.id)}
              onToggle={() => onToggle(asset.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ==================== MAIN COMPONENT ====================

export function KnowledgeContextModal({
  open,
  onOpenChange,
  onApplySelection,
}: KnowledgeContextModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<AssetType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<AssetStatus | 'all'>('all');

  // Filter assets
  const filteredAssets = useMemo(() => {
    let filtered = SAMPLE_ASSETS;

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (asset) =>
          asset.name.toLowerCase().includes(query) ||
          TYPE_CONFIG[asset.type].label.toLowerCase().includes(query)
      );
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((asset) => asset.type === typeFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((asset) => asset.status === statusFilter);
    }

    return filtered;
  }, [searchQuery, typeFilter, statusFilter]);

  // Group by type
  const groupedAssets = useMemo(() => {
    const groups: Partial<Record<AssetType, Asset[]>> = {};
    
    filteredAssets.forEach((asset) => {
      if (!groups[asset.type]) {
        groups[asset.type] = [];
      }
      groups[asset.type]!.push(asset);
    });

    return groups;
  }, [filteredAssets]);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    onApplySelection(selectedIds);
    onOpenChange(false);
  };

  const totalCount = SAMPLE_ASSETS.length;
  const hasResults = filteredAssets.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 flex flex-col rounded-2xl">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b flex-shrink-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <DialogTitle className="text-lg font-semibold">Select Knowledge Context</DialogTitle>
            </div>
            <Badge variant="secondary" className="text-sm px-2 py-1 rounded-full">
              {totalCount} Available
            </Badge>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Choose brand assets and research insights to add context to the conversation
          </DialogDescription>
        </div>

        {/* Search */}
        <div className="px-6 pt-4 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-lg border p-3"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 pt-4 pb-4 border-b flex-shrink-0">
          {/* Filter by Type */}
          <div className="mb-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              FILTER BY TYPE:
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={typeFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('all')}
                className="rounded-full px-3 py-1.5 text-sm"
              >
                All
              </Button>
              {(Object.keys(TYPE_CONFIG) as AssetType[]).map((type) => {
                const config = TYPE_CONFIG[type];
                const Icon = config.icon;
                return (
                  <Button
                    key={type}
                    variant={typeFilter === type ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTypeFilter(type)}
                    className="rounded-full px-3 py-1.5 text-sm gap-1.5"
                  >
                    <Icon className="h-3 w-3" />
                    {config.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Filter by Status */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              FILTER BY STATUS:
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
                className="rounded-full px-3 py-1.5 text-sm"
              >
                All
              </Button>
              {(Object.keys(STATUS_CONFIG) as AssetStatus[]).map((status) => {
                const config = STATUS_CONFIG[status];
                return (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                    className="rounded-full px-3 py-1.5 text-sm gap-1.5"
                  >
                    <div className={cn('w-2 h-2 rounded-full', config.dotColor)} />
                    {config.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <ScrollArea className="flex-1 px-6 py-4 max-h-[400px]">
          {hasResults ? (
            <div className="space-y-6 pb-4">
              {/* Render sections in order */}
              {(['brand-assets', 'personas', 'products', 'insights', 'library'] as AssetType[]).map(
                (type) => (
                  <AssetSection
                    key={type}
                    type={type}
                    assets={groupedAssets[type] || []}
                    selectedIds={selectedIds}
                    onToggle={handleToggle}
                  />
                )
              )}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="text-sm font-medium mt-4">No results found</h3>
              <p className="text-sm text-muted-foreground text-center max-w-xs mt-1">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex-shrink-0 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {selectedIds.length} {selectedIds.length === 1 ? 'item' : 'items'} selected
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              disabled={selectedIds.length === 0}
              className={cn(
                'gap-2',
                selectedIds.length === 0 && 'opacity-50 cursor-not-allowed'
              )}
            >
              <Check className="h-4 w-4" />
              Apply Selection
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}