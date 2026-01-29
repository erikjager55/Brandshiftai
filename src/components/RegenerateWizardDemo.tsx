import React, { useState } from 'react';
import { BrandAssetDetailPage } from './brand/BrandAssetDetailPage';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Target,
  Eye,
  Heart,
  Compass,
  Sparkles,
  User,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '../lib/utils';

type AssetType = 'mission' | 'vision' | 'values' | 'positioning' | 'uvp' | 'personality';

const brandAssets = {
  mission: {
    name: 'Mission Statement',
    type: 'Brand Foundation',
    icon: Target,
    content: 'To provide innovative software solutions that help businesses grow and succeed in the digital age.',
    lastUpdated: 'Jan 5, 2026',
    updatedBy: 'Emma Rodriguez',
    newResearchCount: 2,
  },
  vision: {
    name: 'Vision Statement',
    type: 'Brand Foundation',
    icon: Eye,
    content: 'To become the leading platform that empowers businesses worldwide to achieve digital transformation through intelligent, user-centric solutions.',
    lastUpdated: 'Dec 28, 2025',
    updatedBy: 'Michael Chen',
    newResearchCount: 1,
  },
  values: {
    name: 'Brand Values',
    type: 'Brand Foundation',
    icon: Heart,
    content: 'Innovation, Customer Success, Integrity, Collaboration, Continuous Learning',
    lastUpdated: 'Dec 20, 2025',
    updatedBy: 'Sarah Johnson',
    newResearchCount: 3,
  },
  positioning: {
    name: 'Brand Positioning',
    type: 'Brand Foundation',
    icon: Compass,
    content: 'For growing businesses who need reliable digital solutions, we are the software partner that prioritizes simplicity and customer success over feature complexity.',
    lastUpdated: 'Jan 8, 2026',
    updatedBy: 'David Park',
    newResearchCount: 0,
  },
  uvp: {
    name: 'Unique Value Proposition',
    type: 'Brand Foundation',
    icon: Sparkles,
    content: 'We deliver powerful yet intuitive software that grows with your business, backed by exceptional support and a genuine commitment to your success.',
    lastUpdated: 'Jan 3, 2026',
    updatedBy: 'Lisa Wang',
    newResearchCount: 2,
  },
  personality: {
    name: 'Brand Personality',
    type: 'Brand Foundation',
    icon: User,
    content: 'Professional yet approachable, innovative but grounded, expert without being intimidating. We speak with confidence and clarity while maintaining warmth and empathy.',
    lastUpdated: 'Dec 22, 2025',
    updatedBy: 'James Miller',
    newResearchCount: 1,
  },
};

export function RegenerateWizardDemo() {
  const [selectedAsset, setSelectedAsset] = useState<AssetType | null>(null);

  if (selectedAsset) {
    const asset = brandAssets[selectedAsset];
    return (
      <BrandAssetDetailPage
        assetName={asset.name}
        assetType={asset.type}
        content={asset.content}
        lastUpdated={asset.lastUpdated}
        updatedBy={asset.updatedBy}
        newResearchCount={asset.newResearchCount}
        onBack={() => setSelectedAsset(null)}
        onEdit={() => console.log('Edit clicked')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="rounded-xl bg-primary/10 p-3">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">Brand Foundation</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Define your brand's core identity and messaging
              </p>
            </div>
          </div>

          {/* Demo Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-start gap-4">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Regenerate Asset Wizard Demo
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Click on any asset card to see the detail page with the "Regenerate" button. The wizard will guide you through a 7-step process to update your brand assets based on research insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(Object.keys(brandAssets) as AssetType[]).map((key) => {
            const asset = brandAssets[key];
            const Icon = asset.icon;
            return (
              <Card
                key={key}
                className="rounded-xl cursor-pointer hover:shadow-md transition-all group"
                onClick={() => setSelectedAsset(key)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="rounded-xl bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    {asset.newResearchCount > 0 && (
                      <div className="relative">
                        <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                          {asset.newResearchCount}
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{asset.name}</h3>
                  <Badge className="mb-4 bg-muted text-muted-foreground">
                    {asset.type}
                  </Badge>

                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    "{asset.content}"
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Updated {asset.lastUpdated}</span>
                    {asset.newResearchCount > 0 && (
                      <Badge className="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 text-xs">
                        New insights
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Instructions */}
        <Card className="rounded-xl mt-8">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-4">How the Regenerate Wizard Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    1
                  </span>
                  Select Research Sources
                </h3>
                <p className="text-sm text-muted-foreground pl-8">
                  Choose from workshops, interviews, surveys, and AI research to inform your updates.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    2
                  </span>
                  AI Analysis
                </h3>
                <p className="text-sm text-muted-foreground pl-8">
                  AI analyzes your research and identifies key findings relevant to your asset.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    3
                  </span>
                  Review Findings
                </h3>
                <p className="text-sm text-muted-foreground pl-8">
                  See key insights grouped by source with relevance scores.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    4
                  </span>
                  Compare & Suggest
                </h3>
                <p className="text-sm text-muted-foreground pl-8">
                  AI generates 3 alternative versions showing gaps and improvements.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    5
                  </span>
                  Confirm Choice
                </h3>
                <p className="text-sm text-muted-foreground pl-8">
                  Side-by-side comparison of before and after with change summary.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    6
                  </span>
                  Refine (Optional)
                </h3>
                <p className="text-sm text-muted-foreground pl-8">
                  Use AI writing assistant to perfect the wording before saving.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    7
                  </span>
                  Save & Update
                </h3>
                <p className="text-sm text-muted-foreground pl-8">
                  Review final content and save with optional version history.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
