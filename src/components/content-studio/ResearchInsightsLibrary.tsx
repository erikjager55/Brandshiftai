import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  X,
  Search,
  BarChart3,
  FileText,
  MessageSquare,
  TrendingUp,
  Lightbulb,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ResearchInsight, InsightType } from './InsertInsightPopover';

interface ResearchInsightsLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  insights: ResearchInsight[];
  onInsert: (insightId: string) => void;
}

export function ResearchInsightsLibrary({
  isOpen,
  onClose,
  insights,
  onInsert,
}: ResearchInsightsLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevance');

  if (!isOpen) return null;

  const getTypeIcon = (type: InsightType) => {
    switch (type) {
      case 'survey':
      case 'statistic':
        return BarChart3;
      case 'analysis':
      case 'report':
        return FileText;
      case 'interview':
        return MessageSquare;
      default:
        return FileText;
    }
  };

  const getTypeBadgeStyles = (type: InsightType) => {
    switch (type) {
      case 'survey':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      case 'analysis':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'interview':
        return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'report':
        return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
      case 'statistic':
        return 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Filter and sort insights
  const filteredInsights = insights
    .filter(insight => {
      // Search filter
      if (searchQuery && !insight.text.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Type filter
      if (filterType !== 'all' && insight.type !== filterType) {
        return false;
      }
      // Source filter
      if (filterSource !== 'all' && !insight.source.toLowerCase().includes(filterSource.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'relevance') {
        return (b.relevance || 0) - (a.relevance || 0);
      }
      return 0;
    });

  const uniqueSources = Array.from(new Set(insights.map(i => i.source)));

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background rounded-2xl shadow-xl border w-full max-w-3xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Research Insights Library</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b bg-muted/30">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search insights..."
              className="pl-9"
            />
          </div>

          <div className="flex gap-3">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="survey">Survey</SelectItem>
                <SelectItem value="analysis">Analysis</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="report">Report</SelectItem>
                <SelectItem value="statistic">Statistic</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {uniqueSources.map(source => (
                  <SelectItem key={source} value={source.toLowerCase()}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Insights List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {filteredInsights.map((insight) => {
              const TypeIcon = getTypeIcon(insight.type);
              
              return (
                <div
                  key={insight.id}
                  className="bg-card rounded-xl border p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <TypeIcon className="h-4 w-4 text-muted-foreground" />
                      <Badge className={cn('rounded-full text-xs', getTypeBadgeStyles(insight.type))}>
                        {insight.type}
                      </Badge>
                      {insight.used && (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          Used
                        </Badge>
                      )}
                    </div>
                    {insight.relevance && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-primary" />
                        <span className="text-xs font-medium text-primary">
                          {insight.relevance}% relevant
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm mb-2">{insight.fullText || insight.text}</p>
                  
                  <p className="text-xs text-muted-foreground mb-3">
                    Source: {insight.source}
                  </p>

                  {/* Why Relevant */}
                  {insight.relevance && insight.relevance > 70 && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-3">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-primary mb-1">Why relevant:</p>
                          <p className="text-xs text-muted-foreground">
                            {getRelevanceReason(insight)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-end">
                    <Button
                      size="sm"
                      onClick={() => onInsert(insight.id)}
                      disabled={insight.used}
                    >
                      {insight.used ? 'Already Used' : 'Insert'}
                    </Button>
                  </div>
                </div>
              );
            })}

            {filteredInsights.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No insights found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-muted/30 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredInsights.length} of {insights.length} insights
          </p>
          {filteredInsights.length < insights.length && (
            <Button variant="outline" size="sm">
              Load More
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

// Helper function to generate relevance reasons
function getRelevanceReason(insight: ResearchInsight): string {
  switch (insight.type) {
    case 'survey':
      return 'Directly supports your persona targeting and product positioning.';
    case 'analysis':
      return 'Reinforces your innovation messaging and brand strategy.';
    case 'interview':
      return 'Addresses pain points mentioned in your content.';
    case 'report':
      return 'Provides credible data to support your claims.';
    case 'statistic':
      return 'Adds quantitative evidence to strengthen your argument.';
    default:
      return 'Aligns with your content themes and objectives.';
  }
}
