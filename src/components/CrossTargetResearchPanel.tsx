import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import {
  Target,
  Users,
  Package,
  ArrowRight,
  Sparkles,
  Link2,
  Info,
  TrendingUp,
  Brain,
  CheckCircle2
} from 'lucide-react';

type TargetType = 'persona' | 'brand-asset' | 'product';

interface CrossTargetResearchPanelProps {
  currentTargetType: TargetType;
  currentTargetId: string;
  currentTargetName: string;
  onStartResearch: (linkConfig: LinkConfig) => void;
}

interface LinkConfig {
  sourceType: TargetType;
  sourceId: string;
  targetType: TargetType;
  targetId?: string;
  researchType: string;
}

export function CrossTargetResearchPanel({
  currentTargetType,
  currentTargetId,
  currentTargetName,
  onStartResearch
}: CrossTargetResearchPanelProps) {
  const [selectedLinkType, setSelectedLinkType] = useState<string | null>(null);

  // Define available research links based on current target type
  const getAvailableLinks = () => {
    switch (currentTargetType) {
      case 'persona':
        return [
          {
            id: 'persona-to-brand',
            title: 'Brand Perception Research',
            description: 'How does this persona perceive your brand assets?',
            targetType: 'brand-asset' as TargetType,
            icon: Sparkles,
            color: 'blue'
          },
          {
            id: 'persona-to-product',
            title: 'Product Validation Research',
            description: 'Validate products against this persona\'s needs',
            targetType: 'product' as TargetType,
            icon: Package,
            color: 'green'
          }
        ];
      case 'brand-asset':
        return [
          {
            id: 'brand-to-persona',
            title: 'Target Audience Research',
            description: 'How do different personas respond to this brand asset?',
            targetType: 'persona' as TargetType,
            icon: Users,
            color: 'purple'
          }
        ];
      case 'product':
        return [
          {
            id: 'product-to-persona',
            title: 'User Research',
            description: 'Understand how personas use and value this product',
            targetType: 'persona' as TargetType,
            icon: Users,
            color: 'purple'
          }
        ];
      default:
        return [];
    }
  };

  const availableLinks = getAvailableLinks();

  const handleStartResearch = (linkType: string, targetType: TargetType) => {
    onStartResearch({
      sourceType: currentTargetType,
      sourceId: currentTargetId,
      targetType: targetType,
      researchType: linkType
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
            <Link2 className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <CardTitle>Cross-Target Research</CardTitle>
            <CardDescription>
              Research how this {currentTargetType} relates to other elements
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-blue-200 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/10">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-blue-900 dark:text-blue-100">
            Link research between personas, brand assets, and products to gain deeper insights
          </AlertDescription>
        </Alert>

        {availableLinks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableLinks.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Card
                  key={link.id}
                  className="cursor-pointer transition-all hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700"
                  onClick={() => handleStartResearch(link.id, link.targetType)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        link.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        link.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                        'bg-purple-100 dark:bg-purple-900/30'
                      }`}>
                        <LinkIcon className={`h-5 w-5 ${
                          link.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                          link.color === 'green' ? 'text-green-600 dark:text-green-400' :
                          'text-purple-600 dark:text-purple-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{link.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {link.description}
                        </p>
                        <Button size="sm" variant="outline" className="w-full gap-2">
                          Start Research
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No cross-target research available for this item</p>
          </div>
        )}

        {/* Research Benefits */}
        <div className="mt-6 p-4 rounded-lg bg-muted">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Brain className="h-4 w-4 text-purple-600" />
            Why Cross-Target Research?
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Understand relationships between different elements</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Validate assumptions across multiple dimensions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Discover unexpected insights and connections</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
