import React, { useState, useMemo } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { SearchBar } from './ui/SearchBar';
import { Progress } from './ui/progress';
import { EmptyState, SearchEmptyState } from './ui/empty-state';
import {
  Plus,
  TrendingUp,
  Zap,
  Sparkles,
  Clock,
  MoreVertical,
  ChevronRight,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { AddInsightModal } from './market-insights/AddInsightModal';
import { MarketInsightDetail } from './market-insights/MarketInsightDetail';
import { mockTrends, Trend } from '../data/mock-trends';
import { cn } from '../lib/utils';

export function MarketInsights() {
  const [insights, setInsights] = useState<Trend[]>(mockTrends);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingInsight, setEditingInsight] = useState<Trend | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<Trend | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImpact, setSelectedImpact] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('all');

  // Filter insights
  const filteredInsights = useMemo(() => {
    return insights.filter(insight => {
      const matchesSearch = insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           insight.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || insight.category === selectedCategory;
      const matchesImpact = selectedImpact === 'all' || insight.impact === selectedImpact;
      const matchesTimeframe = selectedTimeframe === 'all' || insight.timeframe === selectedTimeframe;

      return matchesSearch && matchesCategory && matchesImpact && matchesTimeframe;
    });
  }, [insights, searchTerm, selectedCategory, selectedImpact, selectedTimeframe]);

  // Calculate stats
  const stats = useMemo(() => {
    const activeInsights = insights.length;
    const highImpact = insights.filter(t => t.impact === 'high').length;
    const newThisMonth = insights.filter(t => {
      if (!t.dateAdded) return false;
      const addedDate = new Date(t.dateAdded);
      const now = new Date();
      const monthAgo = new Date(now.getFullYear(), now.getMonth(), 1);
      return addedDate >= monthAgo;
    }).length;

    return { activeInsights, highImpact, newThisMonth };
  }, [insights]);

  const handleDelete = (id: string) => {
    setInsights(insights.filter(t => t.id !== id));
  };

  const getImpactConfig = (impact: string) => {
    switch (impact) {
      case 'high':
        return {
          label: 'High Impact',
          class: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
        };
      case 'medium':
        return {
          label: 'Medium Impact',
          class: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
        };
      case 'low':
        return {
          label: 'Low Impact',
          class: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
        };
      default:
        return {
          label: 'Unknown',
          class: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
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

  return (
    <div className="min-h-screen bg-background">
      {/* Show detail view when an insight is selected */}
      {selectedInsight ? (
        <MarketInsightDetail
          insight={selectedInsight}
          onBack={() => setSelectedInsight(null)}
          onEdit={(insight) => {
            // TODO: Open edit modal with insight data
            setEditingInsight(insight);
            setShowEditModal(true);
            setSelectedInsight(null);
          }}
          onDelete={(id) => {
            handleDelete(id);
            setSelectedInsight(null);
          }}
        />
      ) : (
        <>
          {/* Header */}
          <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
            <div className="max-w-7xl mx-auto px-8 py-6 space-y-6">
              {/* Title Row */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-semibold">Market Insights</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      Track industry trends and market insights for strategic planning
                    </p>
                  </div>
                </div>
                <Button onClick={() => setShowAddModal(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Insight
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="rounded-xl border">
                  <CardContent className="p-6">
                    <TrendingUp className="h-5 w-5 text-muted-foreground mb-2" />
                    <div className="text-3xl font-semibold mb-1">
                      {stats.activeInsights}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Insights</div>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border">
                  <CardContent className="p-6">
                    <Zap className="h-5 w-5 text-muted-foreground mb-2" />
                    <div className="text-3xl font-semibold mb-1">
                      {stats.highImpact}
                    </div>
                    <div className="text-sm text-muted-foreground">High Impact</div>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border">
                  <CardContent className="p-6">
                    <Sparkles className="h-5 w-5 text-muted-foreground mb-2" />
                    <div className="text-3xl font-semibold mb-1">
                      {stats.newThisMonth}
                    </div>
                    <div className="text-sm text-muted-foreground">New This Month</div>
                  </CardContent>
                </Card>
              </div>

              {/* Filter Bar */}
              <div className="flex items-center gap-4">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search insights..."
                  className="flex-1 max-w-md"
                />
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 rounded-lg">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="consumer">Consumer</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="environmental">Environmental</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedImpact} onValueChange={setSelectedImpact}>
                  <SelectTrigger className="w-40 rounded-lg">
                    <SelectValue placeholder="All Impact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Impact</SelectItem>
                    <SelectItem value="high">High Impact</SelectItem>
                    <SelectItem value="medium">Medium Impact</SelectItem>
                    <SelectItem value="low">Low Impact</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-48 rounded-lg">
                    <SelectValue placeholder="All Timeframes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Timeframes</SelectItem>
                    <SelectItem value="short-term">Short-Term</SelectItem>
                    <SelectItem value="medium-term">Medium-Term</SelectItem>
                    <SelectItem value="long-term">Long-Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-8 py-8">
            {insights.length === 0 ? (
              /* Initial Empty State - No insights at all */
              <EmptyState
                icon={TrendingUp}
                title="No market insights yet"
                description="Track industry trends and market shifts to inform your brand strategy and content planning."
                action={{
                  label: 'Add Your First Insight',
                  onClick: () => setShowAddModal(true),
                  icon: Plus,
                }}
              />
            ) : filteredInsights.length === 0 ? (
              /* Search/Filter Empty State */
              <SearchEmptyState
                onClearFilters={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedImpact('all');
                  setSelectedTimeframe('all');
                }}
              />
            ) : (
              /* Grid with insights */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredInsights.map((insight) => {
                  const impactConfig = getImpactConfig(insight.impact);
                  const categoryColor = getCategoryColor(insight.category);
                  const timeframeColor = getTimeframeColor(insight.timeframe);
                  const relevanceColor = getRelevanceColor(insight.relevance || 0);

                  return (
                    <Card
                      key={insight.id}
                      className="rounded-xl border p-6 hover:shadow-md transition-shadow"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold flex-1 pr-4">
                          {insight.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge className={cn('rounded-full px-3 py-1', impactConfig.class)}>
                            {impactConfig.label}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600 dark:text-red-400"
                                onClick={() => handleDelete(insight.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Category & Scope */}
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={cn('rounded-full px-3 py-1 text-xs', categoryColor)}>
                          {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)}
                        </Badge>
                        {insight.level && (
                          <Badge className="rounded-full bg-muted text-muted-foreground px-3 py-1 text-xs">
                            {insight.level.charAt(0).toUpperCase() + insight.level.slice(1)}
                          </Badge>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {insight.description}
                      </p>

                      {/* Relevance Score */}
                      {insight.relevance !== undefined && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              Relevance Score
                            </span>
                            <span className={cn('text-lg font-semibold', relevanceColor)}>
                              {insight.relevance}%
                            </span>
                          </div>
                          <Progress value={insight.relevance} className="h-2" />
                        </div>
                      )}

                      {/* Timeframe */}
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Badge className={cn('rounded-full px-3 py-1 text-xs', timeframeColor)}>
                          {insight.timeframe
                            .split('-')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join('-')}
                        </Badge>
                      </div>

                      {/* Tags */}
                      {insight.tags && insight.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {insight.tags.slice(0, 3).map((tag, index) => (
                            <Badge
                              key={index}
                              className="rounded-full bg-muted text-foreground px-3 py-1 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-xs text-muted-foreground">
                          Added {insight.dateAdded
                            ? new Date(insight.dateAdded).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })
                            : 'Unknown'}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 h-8"
                          onClick={() => setSelectedInsight(insight)}
                        >
                          <span className="text-xs">View Details</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Add Insight Modal - SINGLE INSTANCE */}
          {showAddModal && (
            <AddInsightModal
              onClose={() => setShowAddModal(false)}
              onAddInsight={(newInsight) => {
                setInsights(prev => [...prev, newInsight]);
                setShowAddModal(false);
              }}
            />
          )}

          {/* Edit Insight Modal - SINGLE INSTANCE */}
          {showEditModal && editingInsight && (
            <AddInsightModal
              onClose={() => setShowEditModal(false)}
              onAddInsight={(updatedInsight) => {
                setInsights(prev => prev.map(t => t.id === updatedInsight.id ? updatedInsight : t));
                setShowEditModal(false);
              }}
              initialData={editingInsight}
            />
          )}
        </>
      )}
    </div>
  );
}