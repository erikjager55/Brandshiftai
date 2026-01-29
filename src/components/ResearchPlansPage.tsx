import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Target,
  ArrowRight,
  Crown,
  Sparkles,
  Clock,
  BarChart3,
  MessageSquare,
  FileText,
  Map,
  Rocket,
  Radio,
  Mic,
  PieChart,
  Star,
  Lightbulb,
  TrendingUp,
  Package,
  CheckCircle2,
  Search,
  Shield,
  Users,
  Award,
} from 'lucide-react';
import { ResearchBundle } from '../data/research-bundles';
import { researchBundles } from '../data/research-bundles';
import { cn } from '../lib/utils';

interface ResearchPlansPageProps {
  onSelectBundle: (bundle: ResearchBundle) => void;
  onNavigateToCustomValidation?: () => void;
}

// Method configuration for display
const methodConfig: Record<string, { icon: any; label: string; type: string }> = {
  'workshop': { icon: Users, label: 'Stakeholder Workshop', type: 'Qualitative' },
  'interviews': { icon: Mic, label: 'Depth Interviews', type: 'Qualitative' },
  'questionnaire': { icon: PieChart, label: 'Validation Survey', type: 'Quantitative' },
  'ai-exploration': { icon: Sparkles, label: 'AI Exploration', type: 'AI-Powered' },
};

export function ResearchPlansPage({ onSelectBundle, onNavigateToCustomValidation }: ResearchPlansPageProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter bundles
  const filteredBundles = researchBundles.filter(bundle => {
    const matchesCategory = categoryFilter === 'all' || bundle.bundleType === categoryFilter;
    const matchesSearch = bundle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bundle.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort bundles
  const sortedBundles = [...filteredBundles].sort((a, b) => {
    if (sortBy === 'recommended') {
      // Foundation bundles first, then by price
      if (a.bundleType === 'foundation' && b.bundleType !== 'foundation') return -1;
      if (a.bundleType !== 'foundation' && b.bundleType === 'foundation') return 1;
      return a.bundlePrice - b.bundlePrice;
    }
    if (sortBy === 'price-low') return a.bundlePrice - b.bundlePrice;
    if (sortBy === 'price-high') return b.bundlePrice - a.bundlePrice;
    return 0;
  });

  // Group by type
  const foundationBundles = sortedBundles.filter(b => b.bundleType === 'foundation');
  const specializedBundles = sortedBundles.filter(b => b.bundleType === 'specialized');

  // Helper to format method names for display
  const getMethodChips = (primaryTool: string, secondaryTool: string | null) => {
    const methods = [primaryTool];
    if (secondaryTool) methods.push(secondaryTool);
    return methods;
  };

  // Helper to get unlocked assets list
  const getUnlockedAssetsList = (strategyTools: string | string[] | undefined) => {
    if (!strategyTools) return [];
    const tools = Array.isArray(strategyTools) ? strategyTools : [strategyTools];
    
    const toolNames: Record<string, string> = {
      'campaign-strategy-generator': 'Campaign Strategy',
      'messaging-framework-builder': 'Messaging Framework',
      'go-to-market-strategy': 'Go-to-Market Strategy',
      'competitive-positioning-framework': 'Competitive Positioning',
      'brand-extension-opportunities': 'Brand Extensions',
      'brand-architecture-framework': 'Brand Architecture',
      'customer-journey-mapping': 'Journey Mapping',
      'touchpoint-strategy': 'Touchpoint Strategy',
      'loyalty-retention-strategy': 'Retention Strategy',
      'product-concept-generator': 'Product Concepts',
      'content-strategy-planner': 'Content Strategy',
      'channel-strategy-advisor': 'Channel Strategy',
      'growth-strategy-roadmap': 'Growth Roadmap',
    };
    
    return tools.map(t => toolNames[t] || t).slice(0, 3);
  };

  return (
    <div className="h-full overflow-auto bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-primary/10 p-3">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold">Research Bundles</h1>
                <p className="text-sm text-muted-foreground">
                  Pre-packaged research plans that solve strategic risks and unlock decisions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Filter/Sort Row */}
        <div className="flex items-center gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="foundation">Foundation</SelectItem>
              <SelectItem value="specialized">Specialized</SelectItem>
              <SelectItem value="legacy">Legacy</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Sort by: Recommended</SelectItem>
              <SelectItem value="price-low">Sort by: Price (Low to High)</SelectItem>
              <SelectItem value="price-high">Sort by: Price (High to Low)</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1" />

          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bundles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-lg"
            />
          </div>
        </div>

        {/* Foundation Plans Section */}
        {foundationBundles.length > 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Foundation Plans</h2>
              <p className="text-sm text-muted-foreground">Essential research for core brand elements</p>
            </div>

            {/* Bundle Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {foundationBundles.map((bundle, index) => {
                const isRecommended = index === 0;
                const isFeatured = index === 0;
                const methods = getMethodChips(bundle.primaryTool, bundle.secondaryTool);
                const unlockedAssets = getUnlockedAssetsList(bundle.strategyToolUnlocked);
                const savingsPercent = Math.round((bundle.savings / bundle.basePrice) * 100);

                return (
                  <Card
                    key={bundle.id}
                    className={cn(
                      "rounded-xl border p-6 hover:shadow-lg transition-all duration-200",
                      isFeatured && "border-primary/50 bg-primary/5"
                    )}
                  >
                    {/* Header */}
                    <div className="space-y-2 mb-4">
                      {isFeatured && (
                        <Badge className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs mb-2">
                          Most Popular
                        </Badge>
                      )}
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold">{bundle.name}</h3>
                        {isRecommended && !isFeatured && (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full px-3 py-1 text-xs">
                            Recommended
                          </Badge>
                        )}
                      </div>

                      {/* Key info row */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{bundle.timeline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                          <TrendingUp className="h-4 w-4" />
                          <span>High Impact</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {bundle.description}
                    </p>

                    {/* Methods Included */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                        Methods Included:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {methods.map((methodId, idx) => {
                          const method = methodConfig[methodId];
                          if (!method) return null;
                          
                          return (
                            <Badge
                              key={idx}
                              className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full px-3 py-1 text-xs"
                            >
                              {method.label}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>

                    {/* Assets Unlocked */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                        Unlocks:
                      </p>
                      <div className="space-y-1">
                        {unlockedAssets.map((asset, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm">{asset}</span>
                          </div>
                        ))}
                        {Array.isArray(bundle.strategyToolUnlocked) && bundle.strategyToolUnlocked.length > 3 && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm text-muted-foreground">
                              +{bundle.strategyToolUnlocked.length - 3} more tools
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="mb-4 p-4 rounded-lg bg-muted/50">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-sm line-through text-muted-foreground">
                            ${bundle.basePrice.toLocaleString()}
                          </p>
                          <p className="text-2xl font-semibold text-primary">
                            ${bundle.bundlePrice.toLocaleString()}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full px-3 py-1 text-xs">
                          Save {savingsPercent}%
                        </Badge>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        Learn More
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={() => onSelectBundle(bundle)}
                      >
                        Select Bundle
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Specialized Plans Section */}
        {specializedBundles.length > 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Specialized Plans</h2>
              <p className="text-sm text-muted-foreground">Targeted research for specific strategic needs</p>
            </div>

            {/* Bundle Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {specializedBundles.map((bundle) => {
                const methods = getMethodChips(bundle.primaryTool, bundle.secondaryTool);
                const unlockedAssets = getUnlockedAssetsList(bundle.strategyToolUnlocked);
                const savingsPercent = Math.round((bundle.savings / bundle.basePrice) * 100);

                return (
                  <Card
                    key={bundle.id}
                    className="rounded-xl border p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200"
                  >
                    {/* Header */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold">{bundle.name}</h3>
                      </div>

                      {/* Key info row */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{bundle.timeline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                          <TrendingUp className="h-4 w-4" />
                          <span>High Impact</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {bundle.description}
                    </p>

                    {/* Methods Included */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                        Methods Included:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {methods.map((methodId, idx) => {
                          const method = methodConfig[methodId];
                          if (!method) return null;
                          
                          return (
                            <Badge
                              key={idx}
                              className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full px-3 py-1 text-xs"
                            >
                              {method.label}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>

                    {/* Assets Unlocked */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                        Unlocks:
                      </p>
                      <div className="space-y-1">
                        {unlockedAssets.map((asset, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm">{asset}</span>
                          </div>
                        ))}
                        {Array.isArray(bundle.strategyToolUnlocked) && bundle.strategyToolUnlocked.length > 3 && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm text-muted-foreground">
                              +{bundle.strategyToolUnlocked.length - 3} more tools
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="mb-4 p-4 rounded-lg bg-muted/50">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-sm line-through text-muted-foreground">
                            ${bundle.basePrice.toLocaleString()}
                          </p>
                          <p className="text-2xl font-semibold text-primary">
                            ${bundle.bundlePrice.toLocaleString()}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full px-3 py-1 text-xs">
                          Save {savingsPercent}%
                        </Badge>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        Learn More
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={() => onSelectBundle(bundle)}
                      >
                        Select Bundle
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Trust Signals */}
        <Card className="rounded-xl border p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-sm text-muted-foreground">100% Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-muted-foreground">Expert-led Research</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-muted-foreground">Proven Methodology</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
