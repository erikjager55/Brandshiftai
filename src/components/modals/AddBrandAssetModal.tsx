/**
 * Add Brand Asset Modal
 * Modal for selecting and creating new brand assets
 */

import React, { useState, useEffect, useMemo } from 'react';
import { X, Search, ArrowRight, CheckCircle2, Target, Eye, Flag, Crosshair, Shield, TrendingUp, MessageSquare, BookOpen, Smile, Users, Heart, Globe, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

// ============================================================================
// ASSET TYPES DATA
// ============================================================================

interface AssetType {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: React.ElementType;
  category: 'Foundation' | 'Strategy' | 'Communication' | 'Personality' | 'Culture' | 'Purpose';
}

const ASSET_TYPES: AssetType[] = [
  // Foundation
  {
    id: 'golden-circle',
    name: 'Golden Circle',
    slug: 'golden-circle',
    description: "Define your Why, How, and What using Simon Sinek's framework",
    icon: Target,
    category: 'Foundation'
  },
  {
    id: 'vision-statement',
    name: 'Vision Statement',
    slug: 'vision-statement',
    description: "A forward-looking declaration of your organization's purpose and aspirations",
    icon: Eye,
    category: 'Foundation'
  },
  {
    id: 'mission-statement',
    name: 'Mission Statement',
    slug: 'mission-statement',
    description: "Define what your organization does, how it does it, and for whom",
    icon: Flag,
    category: 'Foundation'
  },
  // Strategy
  {
    id: 'brand-positioning',
    name: 'Brand Positioning',
    slug: 'brand-positioning',
    description: "How your brand is uniquely positioned in the market relative to competitors",
    icon: Crosshair,
    category: 'Strategy'
  },
  {
    id: 'brand-promise',
    name: 'Brand Promise',
    slug: 'brand-promise',
    description: "The commitment you make to your customers about what they can expect",
    icon: Shield,
    category: 'Strategy'
  },
  {
    id: 'transformative-goals',
    name: 'Transformative Goals',
    slug: 'transformative-goals',
    description: "Define ambitious goals that will transform your business and create lasting impact",
    icon: TrendingUp,
    category: 'Strategy'
  },
  // Communication
  {
    id: 'brand-tone-voice',
    name: 'Brand Tone & Voice',
    slug: 'brand-tone-voice',
    description: "The consistent voice and tone that defines how your brand communicates",
    icon: MessageSquare,
    category: 'Communication'
  },
  {
    id: 'brand-story',
    name: 'Brand Story',
    slug: 'brand-story',
    description: "The narrative that connects your brand's past, present, and future",
    icon: BookOpen,
    category: 'Communication'
  },
  // Personality
  {
    id: 'brand-personality',
    name: 'Brand Personality',
    slug: 'brand-personality',
    description: "The human characteristics and traits that define your brand's character",
    icon: Smile,
    category: 'Personality'
  },
  {
    id: 'brand-archetype',
    name: 'Brand Archetype',
    slug: 'brand-archetype',
    description: "Universal patterns of behavior that help define your brand's personality",
    icon: Users,
    category: 'Personality'
  },
  // Culture
  {
    id: 'core-values',
    name: 'Core Values',
    slug: 'core-values',
    description: "The fundamental beliefs and principles that guide your organization's decisions",
    icon: Heart,
    category: 'Culture'
  },
  // Purpose
  {
    id: 'social-relevancy',
    name: 'Social Relevancy',
    slug: 'social-relevancy',
    description: "How your brand contributes to society and addresses relevant social issues",
    icon: Globe,
    category: 'Purpose'
  },
  {
    id: 'brand-essence',
    name: 'Brand Essence',
    slug: 'brand-essence',
    description: "The core idea that captures the heart and soul of your brand",
    icon: Sparkles,
    category: 'Purpose'
  }
];

const CATEGORIES = ['All', 'Foundation', 'Strategy', 'Communication', 'Personality', 'Culture', 'Purpose'] as const;
type Category = typeof CATEGORIES[number];

// ============================================================================
// MODAL PROPS
// ============================================================================

interface AddBrandAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBrandAsset: (assetTypeSlug: string) => void;
  existingAssetIds?: string[]; // IDs of assets that already exist
}

// ============================================================================
// MODAL COMPONENT
// ============================================================================

export function AddBrandAssetModal({
  isOpen,
  onClose,
  onAddBrandAsset,
  existingAssetIds = []
}: AddBrandAssetModalProps) {
  const [selectedAssetType, setSelectedAssetType] = useState<AssetType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [isClosing, setIsClosing] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedAssetType(null);
      setSearchQuery('');
      setSelectedCategory('All');
      setIsClosing(false);
    }
  }, [isOpen]);

  // Filter asset types
  const filteredAssets = useMemo(() => {
    let filtered = ASSET_TYPES;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(asset => asset.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(asset =>
        asset.name.toLowerCase().includes(query) ||
        asset.description.toLowerCase().includes(query) ||
        asset.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      const searchInput = document.getElementById('asset-search-input');
      searchInput?.focus();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  const handleContinue = () => {
    if (selectedAssetType) {
      handleClose();
      setTimeout(() => {
        onAddBrandAsset(selectedAssetType.slug);
      }, 250);
    }
  };

  const handleAssetTypeClick = (assetType: AssetType) => {
    setSelectedAssetType(assetType);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity duration-200",
          isClosing ? "opacity-0" : "opacity-100"
        )}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative max-w-2xl w-full bg-background border border-border rounded-2xl shadow-xl transition-all duration-300",
          isClosing 
            ? "scale-95 opacity-0" 
            : "scale-100 opacity-100"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex justify-between items-center">
            <h2 id="modal-title" className="text-xl font-semibold">
              Create Brand Asset
            </h2>
            <button
              onClick={handleClose}
              className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Choose the type of brand asset you want to create
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="asset-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search asset types..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors dark:bg-background dark:text-foreground"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Asset Type Grid */}
          {filteredAssets.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
              {filteredAssets.map((assetType) => {
                const Icon = assetType.icon;
                const isSelected = selectedAssetType?.id === assetType.id;
                const alreadyExists = existingAssetIds.includes(assetType.id);

                return (
                  <div
                    key={assetType.id}
                    onClick={() => handleAssetTypeClick(assetType)}
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      "relative p-4 rounded-xl cursor-pointer transition-all duration-200",
                      isSelected
                        ? "border-2 border-primary bg-primary/5 shadow-sm"
                        : "border border-border bg-card hover:border-primary/30 hover:shadow-sm"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold">
                          {assetType.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {assetType.description}
                        </p>
                      </div>
                    </div>

                    {/* Selected Indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                    )}

                    {/* Already Exists Badge */}
                    {alreadyExists && !isSelected && (
                      <div className="absolute top-2 right-2">
                        <div className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          Created
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            // Empty Search State
            <div className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="text-sm font-semibold mt-4">
                No asset types found
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Try a different search term
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex justify-between items-center">
          {/* Left Side */}
          <div className="text-sm text-muted-foreground">
            {selectedAssetType ? (
              <span>Selected: <span className="font-medium">{selectedAssetType.name}</span></span>
            ) : (
              <span>No asset type selected</span>
            )}
          </div>

          {/* Right Side */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedAssetType}
              className={cn(
                !selectedAssetType && "opacity-50 cursor-not-allowed"
              )}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}