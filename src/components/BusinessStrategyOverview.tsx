import React, { useState, useMemo } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { EmptyState } from './ui/empty-state';
import { AddStrategyModal } from './strategy/AddStrategyModal';
import {
  Target,
  Plus,
  TrendingUp,
  Flag,
  BarChart3,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  ChevronRight,
  Rocket,
} from 'lucide-react';
import { mockBusinessStrategies, BusinessStrategy } from '../data/mock-business-strategies';
import { cn } from '../lib/utils';

interface BusinessStrategyOverviewProps {
  onNavigateToDetail?: (strategyId: string) => void;
  onCreateStrategy?: () => void;
}

export function BusinessStrategyOverview({
  onNavigateToDetail,
  onCreateStrategy,
}: BusinessStrategyOverviewProps) {
  const [strategies] = useState<BusinessStrategy[]>(mockBusinessStrategies);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSaveStrategy = (strategyData: Partial<BusinessStrategy>) => {
    console.log('Saving strategy:', strategyData);
    // TODO: Add to strategies list
    setShowAddModal(false);
  };

  // Calculate stats
  const stats = useMemo(() => {
    const activeStrategies = strategies.filter(s => s.status === 'active').length;
    const totalObjectives = strategies.reduce((sum, s) => sum + s.objectives.length, 0);
    const onTrackObjectives = strategies.reduce(
      (sum, s) => sum + s.objectives.filter(o => o.status === 'on-track').length,
      0
    );
    const atRiskObjectives = strategies.reduce(
      (sum, s) => sum + s.objectives.filter(o => o.status === 'at-risk').length,
      0
    );
    
    // Get current planning period (Q1 2026)
    const currentPeriod = 'Q1 2026';

    return {
      activeStrategies,
      totalObjectives,
      onTrackObjectives,
      atRiskObjectives,
      currentPeriod,
    };
  }, [strategies]);

  const getStrategyIcon = (icon: BusinessStrategy['icon']) => {
    switch (icon) {
      case 'target':
        return Target;
      case 'rocket':
        return Rocket;
      case 'trending-up':
        return TrendingUp;
      case 'zap':
        return Zap;
      case 'flag':
        return Flag;
      default:
        return Target;
    }
  };

  const getStatusConfig = (status: BusinessStrategy['status']) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          className: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
        };
      case 'draft':
        return {
          label: 'Draft',
          className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
        };
      case 'completed':
        return {
          label: 'Completed',
          className: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
        };
      case 'archived':
        return {
          label: 'Archived',
          className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-300 dark:border-gray-700',
        };
      default:
        return {
          label: 'Unknown',
          className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
        };
    }
  };

  const calculateDaysSinceUpdate = (dateString: string) => {
    const updateDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - updateDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (strategies.length === 0) {
    return (
      <>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <div className="bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-7xl mx-auto px-8 py-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-semibold">Business Strategy</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      Define and track your strategic business objectives
                    </p>
                  </div>
                </div>
                <Button onClick={() => setShowAddModal(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Strategy
                </Button>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="max-w-7xl mx-auto px-8 py-8">
            <EmptyState
              icon={Target}
              title="No strategies defined yet"
              description="Define your business strategies to align your brand and content with business objectives."
              action={{
                label: 'Create Your First Strategy',
                onClick: () => setShowAddModal(true),
                icon: Plus,
              }}
            />
          </div>
        </div>

        {/* Add Strategy Modal */}
        <AddStrategyModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveStrategy}
        />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
          <div className="max-w-7xl mx-auto px-8 py-6 space-y-6">
            {/* Title Row */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-semibold">Business Strategy</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Define and track your strategic business objectives
                  </p>
                </div>
              </div>
              <Button onClick={() => setShowAddModal(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Strategy
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="rounded-xl border">
                <CardContent className="p-6">
                  <Target className="h-5 w-5 text-muted-foreground mb-2" />
                  <div className="text-3xl font-semibold mb-1">
                    {stats.activeStrategies}
                  </div>
                  <div className="text-sm text-muted-foreground">Active Strategies</div>
                </CardContent>
              </Card>

              <Card className="rounded-xl border">
                <CardContent className="p-6">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground mb-2" />
                  <div className="text-3xl font-semibold mb-1">
                    {stats.onTrackObjectives}
                  </div>
                  <div className="text-sm text-muted-foreground">Objectives On Track</div>
                </CardContent>
              </Card>

              <Card className="rounded-xl border">
                <CardContent className="p-6">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground mb-2" />
                  <div className="text-3xl font-semibold mb-1">
                    {stats.atRiskObjectives}
                  </div>
                  <div className="text-sm text-muted-foreground">At Risk Objectives</div>
                </CardContent>
              </Card>

              <Card className="rounded-xl border">
                <CardContent className="p-6">
                  <Calendar className="h-5 w-5 text-muted-foreground mb-2" />
                  <div className="text-3xl font-semibold mb-1">
                    {stats.currentPeriod}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Planning Period</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Strategy Cards */}
        <div className="max-w-7xl mx-auto px-8 py-8 space-y-6">
          {strategies.map((strategy) => {
            const Icon = getStrategyIcon(strategy.icon);
            const statusConfig = getStatusConfig(strategy.status);
            const daysSinceUpdate = calculateDaysSinceUpdate(strategy.lastUpdated);
            const onTrackCount = strategy.objectives.filter(o => o.status === 'on-track').length;
            const atRiskCount = strategy.objectives.filter(o => o.status === 'at-risk').length;
            const timeframe = `${new Date(strategy.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${new Date(strategy.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;

            return (
              <Card
                key={strategy.id}
                className="rounded-xl border p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onNavigateToDetail?.(strategy.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Icon className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{strategy.name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge className={cn('rounded-full px-3 py-1', statusConfig.className)}>
                      {statusConfig.label}
                    </Badge>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {strategy.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Progress</span>
                    <span className="text-lg font-semibold text-primary">
                      {strategy.progress}%
                    </span>
                  </div>
                  <Progress value={strategy.progress} className="h-2" />
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>{strategy.objectives.length} Objectives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span>{onTrackCount} On Track</span>
                  </div>
                  {atRiskCount > 0 && (
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <span>{atRiskCount} At Risk</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{timeframe}</span>
                  </div>
                </div>

                {/* Key Focus Areas */}
                {strategy.focusAreas.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Key Focus Areas:</p>
                    <div className="flex flex-wrap gap-2">
                      {strategy.focusAreas.slice(0, 4).map((area) => (
                        <Badge
                          key={area.id}
                          className="rounded-full bg-muted text-foreground px-3 py-1 text-xs"
                        >
                          {area.name}
                        </Badge>
                      ))}
                      {strategy.focusAreas.length > 4 && (
                        <Badge className="rounded-full bg-muted text-muted-foreground px-3 py-1 text-xs">
                          +{strategy.focusAreas.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t text-xs text-muted-foreground">
                  <span>
                    Linked Campaigns: {strategy.linkedCampaigns.length}
                  </span>
                  <span>
                    Last updated: {daysSinceUpdate === 0 ? 'today' : `${daysSinceUpdate}d ago`}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add Strategy Modal */}
      <AddStrategyModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveStrategy}
      />
    </>
  );
}
