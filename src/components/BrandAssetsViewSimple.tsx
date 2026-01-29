import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { SearchBar } from './ui/SearchBar';
import { SimpleEmptyState } from './ui/SimpleEmptyState';
import {
  Plus,
  Lock,
  ArrowLeft,
  Search,
  TrendingUp,
  ArrowRight,
  Package,
  AlertCircle,
  Layers,
  Hexagon,
  CheckCircle2,
  Loader
} from 'lucide-react';
import { useBrandAssets } from '../contexts';
import { calculateDecisionStatus } from '../utils/decision-status-calculator';
import { DecisionStatus } from '../types/decision-status';
import { UnlockService } from '../services/UnlockService';
import { EnhancedAssetCardUnified } from './brand-assets/EnhancedAssetCardUnified';
import { PurchaseModal } from './payment/PurchaseModal';
import { AddBrandAssetModal } from './modals/AddBrandAssetModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { cn } from '../lib/utils';

// Types
interface UnlockableTool {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: any;
  supportsMultiAsset: boolean;
  relatedAssets: string[];
}

interface BrandAssetOption {
  id: string;
  name: string;
  type: string;
  icon: any;
}

type ResearchMethodType = string;

interface BrandAssetsViewSimpleProps {
  onAssetClick?: (assetId: string) => void;
  onNavigateToResearchMethod?: (assetId: string, methodType: ResearchMethodType, mode: 'work' | 'results') => void;
  onNavigate?: (route: string) => void;
}

// Mock data for unlockable tools (for method/tool unlock only)
const toolsMap: Record<string, UnlockableTool[]> = {
  'questionnaire': [
    {
      id: 'questionnaire',
      name: 'Questionnaire Research',
      description: 'Structured questionnaire to gather insights from stakeholders',
      price: 99,
      icon: Plus,
      supportsMultiAsset: true,
      relatedAssets: ['Core Values', 'Brand Story', 'Brand Positioning'],
    },
  ],
  'interviews': [
    {
      id: 'interviews',
      name: 'Stakeholder Interviews',
      description: 'In-depth interviews to understand brand from multiple perspectives',
      price: 149,
      icon: Lock,
      supportsMultiAsset: true,
      relatedAssets: ['Core Values', 'Brand Voice', 'Brand Messaging'],
    },
  ],
  'workshop': [
    {
      id: 'workshop',
      name: 'Workshop Facilitation',
      description: 'Complete workshop kit with facilitation guides',
      price: 199,
      icon: ArrowLeft,
      supportsMultiAsset: true,
      relatedAssets: ['Brand Archetype', 'Mission Statement', 'Vision Statement'],
    },
  ],
};

export function BrandAssetsViewSimple({ onAssetClick, onNavigateToResearchMethod, onNavigate }: BrandAssetsViewSimpleProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [selectedItemForUnlock, setSelectedItemForUnlock] = useState<{
    type: 'tool';
    id: string;
    assetId: string;
    name: string;
  } | null>(null);
  const [unlockingToolId, setUnlockingToolId] = useState<string | null>(null);
  const [addBrandAssetModalOpen, setAddBrandAssetModalOpen] = useState(false);
  
  // Use context to get brand assets (synchronized with detail page)
  const { brandAssets } = useBrandAssets();
  
  // Track unlock state from service (for tools only)
  const [unlockedTools, setUnlockedTools] = useState<Record<string, string[]>>(() => 
    UnlockService.getState().unlockedTools
  );

  // Subscribe to unlock service changes
  useEffect(() => {
    const unsubscribe = UnlockService.subscribe(() => {
      const state = UnlockService.getState();
      setUnlockedTools(state.unlockedTools);
    });
    return unsubscribe;
  }, []);
  
  // Map locked tools per asset (tool type -> locked)
  const lockedToolsPerAsset: Record<string, string[]> = {
    '4': ['questionnaire', 'interviews'], // Brand Archetype locked tools
    '5': ['workshop', 'questionnaire', 'interviews'], // Core Values locked tools
    '6': ['workshop', 'interviews'], // Brand Story locked tools
  };

  // Filter assets based on search
  const filteredAssets = useMemo(() => {
    let filtered = brandAssets;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(asset =>
        asset.type.toLowerCase().includes(query) ||
        asset.title.toLowerCase().includes(query) ||
        asset.description.toLowerCase().includes(query) ||
        asset.category.toLowerCase().includes(query)
      );
    }

    // Sort by strategic risk (decision status)
    return filtered.sort((a, b) => {
      const statusA = calculateDecisionStatus(a).status;
      const statusB = calculateDecisionStatus(b).status;
      
      const priorityOrder: Record<DecisionStatus, number> = {
        'blocked': 1,
        'decision-at-risk': 2,
        'safe-to-decide': 3,
      };
      
      return priorityOrder[statusA] - priorityOrder[statusB];
    });
  }, [brandAssets, searchQuery]);

  // Calculate stats
  const readyCount = filteredAssets.filter(a => calculateDecisionStatus(a).status === 'safe-to-decide').length;
  const needsWorkCount = filteredAssets.filter(a => calculateDecisionStatus(a).status !== 'safe-to-decide').length;

  const handleToolUnlockClick = (assetId: string, toolId: string, toolName: string) => {
    setSelectedItemForUnlock({
      type: 'tool',
      id: toolId,
      assetId: assetId,
      name: toolName,
    });
    setPurchaseModalOpen(true);
  };

  const handlePurchaseConfirm = (selectedToolIds: string[]) => {
    if (!selectedItemForUnlock) return;

    const targetAssetId = selectedItemForUnlock.assetId;

    // Start unlock animation for tool
    setUnlockingToolId(selectedItemForUnlock.id);

    // Update unlock service - only unlock tools
    UnlockService.unlockTools(targetAssetId, selectedToolIds);

    // Close modal
    setPurchaseModalOpen(false);

    // Reset unlock animation after it completes
    setTimeout(() => {
      setUnlockingToolId(null);
      setSelectedItemForUnlock(null);
    }, 1000);
  };

  // Get available tools for selected item (tool unlock)
  const availableTools: UnlockableTool[] = useMemo(() => {
    if (!selectedItemForUnlock) return [];
    
    const toolId = selectedItemForUnlock.id;
    const tools = toolsMap[toolId] || [];
    return tools;
  }, [selectedItemForUnlock]);
  
  // Helper function to map asset type to icon
  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'Golden Circle': return Search;
      case 'Vision Statement': return TrendingUp;
      case 'Mission Statement': return ArrowRight;
      case 'Brand Archetype': return Plus;
      case 'Core Values': return ArrowRight;
      case 'Social Relevancy': return Package;
      case 'Brand Tone & Voice': return AlertCircle;
      case 'Brand Promise': return ArrowRight;
      case 'Brand Story': return Search;
      default: return Plus;
    }
  };
  
  // Prepare available assets for the modal
  const availableAssetsForModal: BrandAssetOption[] = useMemo(() => {
    return brandAssets.map(asset => ({
      id: asset.id,
      name: asset.title,
      type: asset.type,
      icon: getAssetIcon(asset.type),
    }));
  }, [brandAssets]);

  // Get existing asset IDs (for "Already created" indicators)
  const existingAssetIds = useMemo(() => {
    // Map asset types to their IDs - this will be used to show "Already created" badges
    const typeMap: Record<string, string> = {
      'Golden Circle': 'golden-circle',
      'Vision Statement': 'vision-statement',
      'Mission Statement': 'mission-statement',
      'Brand Archetype': 'brand-archetype',
      'Core Values': 'core-values',
      'Social Relevancy': 'social-relevancy',
      'Brand Tone & Voice': 'brand-tone-voice',
      'Brand Promise': 'brand-promise',
      'Brand Story': 'brand-story',
    };
    
    return brandAssets
      .map(asset => typeMap[asset.type])
      .filter(Boolean);
  }, [brandAssets]);

  const handleAddBrandAsset = (assetTypeSlug: string) => {
    // Navigate to brand asset creation page
    onNavigate?.(`/brand-foundation/new/${assetTypeSlug}`);
  };

  return (
    <div className="h-full overflow-auto bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-primary/10 p-3">
                <Hexagon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold">Your Brand</h1>
                <p className="text-sm text-muted-foreground">
                  Build your strategic foundation with premium brand tools
                </p>
              </div>
            </div>
            <Button onClick={() => setAddBrandAssetModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Brand Asset
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        
        {/* BLOCK 1: Overview Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-xl border p-6">
            <div className="text-4xl font-semibold text-green-600 dark:text-green-400 mb-2">
              {readyCount}
            </div>
            <div className="text-sm text-muted-foreground">Ready to use</div>
          </Card>
          <Card className="rounded-xl border p-6">
            <div className="text-4xl font-semibold text-amber-600 dark:text-amber-400 mb-2">
              {needsWorkCount}
            </div>
            <div className="text-sm text-muted-foreground">Need validation</div>
          </Card>
          <Card className="rounded-xl border p-6">
            <div className="text-4xl font-semibold mb-2">
              {filteredAssets.length}
            </div>
            <div className="text-sm text-muted-foreground">Total assets</div>
          </Card>
        </div>

        {/* BLOCK 2: Search & Filter */}
        <div className="flex gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search brand assets..."
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="foundation">Foundation</SelectItem>
              <SelectItem value="identity">Identity</SelectItem>
              <SelectItem value="expression">Expression</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* BLOCK 3: Assets List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAssets.map((asset) => {
            // Get locked tools for this asset
            const assetLockedTools = lockedToolsPerAsset[asset.id] || [];
            const assetUnlockedTools = unlockedTools[asset.id] || [];
            
            // Filter out unlocked tools from locked list
            const actuallyLockedTools = assetLockedTools.filter(
              toolId => !assetUnlockedTools.includes(toolId)
            );

            return (
              <EnhancedAssetCardUnified
                key={asset.id}
                asset={asset}
                onClick={() => onAssetClick?.(asset.id)}
                onMethodClick={(method, mode) => onNavigateToResearchMethod?.(asset.id, method.type, mode)}
                lockedToolIds={actuallyLockedTools}
                unlockingToolId={unlockingToolId}
                onToolUnlockClick={(toolId, toolName) => handleToolUnlockClick(asset.id, toolId, toolName)}
              />
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAssets.length === 0 && searchQuery.trim() === '' && brandAssets.length === 0 && (
          <SimpleEmptyState
            icon={Hexagon}
            title="No brand assets yet"
            description="Start building your brand foundation by adding your first brand asset."
            action={{
              label: 'Add Brand Asset',
              onClick: () => setAddBrandAssetModalOpen(true),
              variant: 'default'
            }}
          />
        )}
        
        {/* Search Empty State */}
        {filteredAssets.length === 0 && (searchQuery.trim() !== '' || brandAssets.length > 0) && (
          <SimpleEmptyState
            icon={Search}
            title="No results found"
            description="Try adjusting your search to find brand assets."
            action={{
              label: 'Clear search',
              onClick: () => setSearchQuery(''),
              variant: 'outline'
            }}
          />
        )}
      </div>

      {/* Purchase Modal */}
      {selectedItemForUnlock && (
        <PurchaseModal
          isOpen={purchaseModalOpen}
          onClose={() => {
            setPurchaseModalOpen(false);
            setTimeout(() => setSelectedItemForUnlock(null), 300);
          }}
          onConfirm={handlePurchaseConfirm}
          itemType={selectedItemForUnlock.type}
          itemId={selectedItemForUnlock.id}
          itemName={selectedItemForUnlock.name}
          availableTools={availableTools}
          currentAssetId={selectedItemForUnlock.assetId}
          availableAssets={availableAssetsForModal}
        />
      )}

      {/* Add Brand Asset Modal */}
      <AddBrandAssetModal
        isOpen={addBrandAssetModalOpen}
        onClose={() => setAddBrandAssetModalOpen(false)}
        onAddBrandAsset={handleAddBrandAsset}
        existingAssetIds={existingAssetIds}
      />
    </div>
  );
}