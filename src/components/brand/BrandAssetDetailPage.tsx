import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { RegenerateAssetWizard } from '../wizard/RegenerateAssetWizard';
import {
  ArrowLeft,
  Edit,
  Clock,
  User,
  Sparkles,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface BrandAssetDetailPageProps {
  assetName: string;
  assetType: string;
  content: string;
  lastUpdated: string;
  updatedBy: string;
  newResearchCount?: number;
  onBack: () => void;
  onEdit?: () => void;
}

export function BrandAssetDetailPage({
  assetName,
  assetType,
  content,
  lastUpdated,
  updatedBy,
  newResearchCount = 2,
  onBack,
  onEdit,
}: BrandAssetDetailPageProps) {
  const [showRegenerateWizard, setShowRegenerateWizard] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);

  console.log('BrandAssetDetailPage render - showRegenerateWizard:', showRegenerateWizard);

  const handleSaveRegenerated = (newContent: string, researchSources: string[]) => {
    setCurrentContent(newContent);
    // Show success toast
    console.log('Saved new content based on', researchSources.length, 'research sources');
    setShowRegenerateWizard(false);
  };

  const handleRegenerateClick = () => {
    console.log('Regenerate button clicked! Current state:', showRegenerateWizard);
    setShowRegenerateWizard(true);
    console.log('State updated to true');
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
          <div className="max-w-5xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Brand Foundation
              </Button>
              <div className="flex items-center gap-2">
                {onEdit && (
                  <Button variant="outline" onClick={onEdit} className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={handleRegenerateClick}
                  className="gap-2 relative"
                >
                  <Sparkles className="h-4 w-4" />
                  Regenerate
                  {newResearchCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                      {newResearchCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-semibold mb-2">{assetName}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Last updated: {lastUpdated}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  by {updatedBy}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-8 py-8 space-y-6">
          {/* New Research Available Banner */}
          {newResearchCount > 0 && (
            <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      New research available
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                      {newResearchCount} research {newResearchCount === 1 ? 'source has' : 'sources have'} been completed since the last update to your {assetName}.
                      Use AI to incorporate these insights and refine your content.
                    </p>
                    <Button
                      size="sm"
                      onClick={() => setShowRegenerateWizard(true)}
                      className="gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      Regenerate with Insights
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Content */}
          <Card className="rounded-xl">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="rounded-xl bg-primary/10 p-3">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">{assetName}</h2>
                  <Badge className="bg-muted text-foreground">
                    {assetType}
                  </Badge>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-base leading-relaxed">
                  "{currentContent}"
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Usage Examples or Guidelines */}
          <Card className="rounded-xl">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Usage Guidelines</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">When to use this</h4>
                  <p className="text-muted-foreground">
                    Use your {assetName} in all external communications, marketing materials, and presentations to ensure consistent brand messaging.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Key considerations</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Ensure alignment with your overall brand strategy</li>
                    <li>Review regularly based on new market insights</li>
                    <li>Communicate updates to all team members</li>
                    <li>Use consistent language across all touchpoints</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Version History */}
          <Card className="rounded-xl">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Version History</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="text-xs text-muted-foreground w-32">
                    {lastUpdated}
                  </div>
                  <div className="flex-1">
                    <Badge className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 mb-2">
                      Current
                    </Badge>
                    <p className="text-sm">{currentContent}</p>
                    <p className="text-xs text-muted-foreground mt-2">Updated by {updatedBy}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="text-xs text-muted-foreground w-32">
                    Dec 15, 2025
                  </div>
                  <div className="flex-1">
                    <Badge className="bg-muted text-muted-foreground mb-2">
                      Previous
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      "To provide innovative software solutions that help businesses grow and succeed in the digital age."
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Updated by Sarah Chen</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Regenerate Wizard */}
      <RegenerateAssetWizard
        open={showRegenerateWizard}
        onClose={() => setShowRegenerateWizard(false)}
        assetName={assetName}
        assetType={assetType}
        currentContent={currentContent}
        onSave={handleSaveRegenerated}
      />
    </>
  );
}