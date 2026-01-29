import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Building,
  Tag,
  Link as LinkIcon,
  Lightbulb,
  ExternalLink,
  Clock,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Trend } from '../../data/mock-trends';

interface MarketInsightDetailProps {
  insight: Trend;
  onBack: () => void;
  onEdit?: (insight: Trend) => void;
  onDelete?: (id: string) => void;
}

export function MarketInsightDetail({
  insight,
  onBack,
  onEdit,
  onDelete,
}: MarketInsightDetailProps) {
  const getImpactConfig = (impact: string) => {
    switch (impact) {
      case 'high':
        return {
          label: 'High Impact',
          class: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
        };
      case 'medium':
        return {
          label: 'Medium Impact',
          class: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
        };
      case 'low':
        return {
          label: 'Low Impact',
          class: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
        };
      default:
        return {
          label: 'Unknown',
          class: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
        };
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technology':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'consumer':
        return 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400';
      case 'social':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      case 'environmental':
        return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'business':
        return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getTimeframeColor = (timeframe: string) => {
    switch (timeframe) {
      case 'short-term':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'medium-term':
        return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
      case 'long-term':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 85) return 'text-green-600 dark:text-green-400';
    if (relevance >= 70) return 'text-amber-600 dark:text-amber-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const impactConfig = getImpactConfig(insight.impact);
  const categoryColor = getCategoryColor(insight.category);
  const timeframeColor = getTimeframeColor(insight.timeframe);
  const relevanceColor = getRelevanceColor(insight.relevance || 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-5xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Market Insights
            </Button>
            <div className="flex items-center gap-2">
              {onEdit && (
                <Button variant="outline" onClick={() => onEdit(insight)} className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="outline"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this insight?')) {
                      onDelete(insight.id);
                    }
                  }}
                  className="gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              )}
            </div>
          </div>

          {/* Title Section */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-semibold">{insight.title}</h1>
              <Badge className={cn('shrink-0', impactConfig.class)}>{impactConfig.label}</Badge>
            </div>

            {/* Badges Row */}
            <div className="flex items-center gap-2">
              <Badge className={cn('rounded-full px-3 py-1', categoryColor)}>
                {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)}
              </Badge>
              {insight.level && (
                <Badge className="rounded-full bg-muted text-muted-foreground px-3 py-1">
                  {insight.level.charAt(0).toUpperCase() + insight.level.slice(1)}
                </Badge>
              )}
              <Badge className={cn('rounded-full px-3 py-1', timeframeColor)}>
                {insight.timeframe
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join('-')}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-8 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Relevance Score */}
          {insight.relevance !== undefined && (
            <Card className="rounded-xl border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Relevance Score</h3>
                </div>
                <div className="space-y-3">
                  <Progress value={insight.relevance} className="h-3" />
                  <div className="flex items-baseline gap-2">
                    <span className={cn('text-3xl font-semibold', relevanceColor)}>
                      {insight.relevance}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {insight.relevance >= 85
                        ? 'Highly relevant to your brand'
                        : insight.relevance >= 70
                        ? 'Moderately relevant'
                        : 'Lower relevance'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Date Added */}
          <Card className="rounded-xl border">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Added</h3>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-semibold">
                  {insight.dateAdded
                    ? new Date(insight.dateAdded).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'Unknown'}
                </p>
                <p className="text-sm text-muted-foreground">Source: Manual Entry</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card className="rounded-xl border">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">Description</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
          </CardContent>
        </Card>

        {/* Industries & Tags Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Relevant Industries */}
          {insight.relevantIndustries && insight.relevantIndustries.length > 0 && (
            <Card className="rounded-xl border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Relevant Industries</h3>
                </div>
                <ul className="space-y-2">
                  {insight.relevantIndustries.map((industry, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {industry}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          {insight.tags && insight.tags.length > 0 && (
            <Card className="rounded-xl border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Tag className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {insight.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="rounded-full bg-muted text-foreground px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Source */}
        {insight.sources && insight.sources.length > 0 && (
          <Card className="rounded-xl border">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <LinkIcon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Source</h3>
              </div>
              <div className="space-y-2">
                {insight.sources.map((source, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <span className="text-sm text-muted-foreground truncate flex-1">
                      {source}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 shrink-0"
                      onClick={() => window.open(source, '_blank')}
                    >
                      <span className="text-xs">Open</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* How to use this insight */}
        <Card className="rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">How to use this insight</h3>
            </div>
            <div className="space-y-3 mb-6">
              <p className="text-sm text-muted-foreground">
                This insight can inform your content strategy in several ways:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>
                    Create content about {insight.title.toLowerCase()} for your audience
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Reference this trend in campaign messaging</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Use as context when generating AI content</span>
                </li>
              </ul>
            </div>
            <div className="flex gap-3">
              <Button className="gap-2">Use in Campaign</Button>
              <Button variant="outline" className="gap-2">
                Generate Content
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}