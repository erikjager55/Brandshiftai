import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { AddObjectiveModal } from './strategy/AddObjectiveModal';
import {
  ArrowLeft,
  Edit,
  Archive,
  Calendar,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Circle,
  Plus,
  Megaphone,
  Target,
  TrendingUp,
  DollarSign,
  Users,
  Zap,
  Layers,
  Flag,
  Milestone,
  ChevronRight,
} from 'lucide-react';
import { BusinessStrategy, Objective } from '../data/mock-business-strategies';
import { cn } from '../lib/utils';

interface BusinessStrategyDetailProps {
  strategy: BusinessStrategy;
  onBack?: () => void;
  onEdit?: () => void;
  onArchive?: () => void;
  onAddObjective?: () => void;
  onLinkCampaign?: () => void;
  onAddMilestone?: () => void;
  onNavigateToCampaign?: (campaignId: string) => void;
}

export function BusinessStrategyDetail({
  strategy,
  onBack,
  onEdit,
  onArchive,
  onAddObjective,
  onLinkCampaign,
  onAddMilestone,
  onNavigateToCampaign,
}: BusinessStrategyDetailProps) {
  const [showAddObjectiveModal, setShowAddObjectiveModal] = useState(false);

  const handleSaveObjective = (objectiveData: Partial<Objective>) => {
    console.log('Saving objective:', objectiveData);
    // TODO: Add to strategy objectives
    setShowAddObjectiveModal(false);
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
          className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
        };
      default:
        return {
          label: 'Unknown',
          className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
        };
    }
  };

  const getObjectiveStatusConfig = (status: Objective['status']) => {
    switch (status) {
      case 'on-track':
        return {
          label: 'On Track',
          icon: CheckCircle2,
          className: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
        };
      case 'at-risk':
        return {
          label: 'At Risk',
          icon: AlertTriangle,
          className: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
        };
      case 'behind':
        return {
          label: 'Behind',
          icon: AlertTriangle,
          className: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
        };
      case 'complete':
        return {
          label: 'Complete',
          icon: CheckCircle2,
          className: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
        };
      case 'not-started':
        return {
          label: 'Not Started',
          icon: Circle,
          className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
        };
      default:
        return {
          label: 'Unknown',
          icon: Circle,
          className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
        };
    }
  };

  const getKeyResultStatusIcon = (status: 'complete' | 'in-progress' | 'not-started') => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      case 'not-started':
        return <Circle className="h-4 w-4 text-gray-400 dark:text-gray-600" />;
    }
  };

  const getFocusAreaIcon = (icon: string) => {
    switch (icon) {
      case 'trending-up':
        return TrendingUp;
      case 'dollar-sign':
        return DollarSign;
      case 'users':
        return Users;
      case 'zap':
        return Zap;
      case 'layers':
        return Layers;
      case 'target':
        return Target;
      case 'flag':
        return Flag;
      default:
        return Target;
    }
  };

  const statusConfig = getStatusConfig(strategy.status);
  const timeframe = `${new Date(strategy.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - ${new Date(strategy.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
  
  const totalObjectives = strategy.objectives.length;
  const onTrackObjectives = strategy.objectives.filter(o => o.status === 'on-track').length;
  const atRiskObjectives = strategy.objectives.filter(o => o.status === 'at-risk').length;

  const calculateDaysSinceUpdate = (dateString: string) => {
    const updateDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - updateDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysSinceUpdate = calculateDaysSinceUpdate(strategy.lastUpdated);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-5xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Business Strategy
            </Button>
            <div className="flex items-center gap-2">
              {onEdit && (
                <Button variant="outline" onClick={onEdit} className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              )}
              {onArchive && (
                <Button
                  variant="outline"
                  onClick={onArchive}
                  className="gap-2 text-muted-foreground"
                >
                  <Archive className="h-4 w-4" />
                  Archive
                </Button>
              )}
            </div>
          </div>

          {/* Title and Description */}
          <div className="flex items-start gap-4 mb-4">
            <div className="rounded-xl bg-primary/10 p-3">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-semibold">{strategy.name}</h1>
                <Badge className={cn('rounded-full px-3 py-1', statusConfig.className)}>
                  {statusConfig.label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {strategy.description}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{timeframe}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Last updated: {daysSinceUpdate === 0 ? 'today' : `${daysSinceUpdate} days ago`}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-8 py-8 space-y-6">
        {/* Progress Overview Card */}
        <Card className="rounded-xl border">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Strategy Progress</h2>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
                <span className="text-2xl font-semibold text-primary">
                  {strategy.progress}%
                </span>
              </div>
              <Progress value={strategy.progress} className="h-3" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-semibold mb-1">{totalObjectives}</div>
                <div className="text-sm text-muted-foreground">Total Objectives</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-green-600 dark:text-green-400 mb-1">
                  {onTrackObjectives}
                </div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  On Track
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-amber-600 dark:text-amber-400 mb-1">
                  {atRiskObjectives}
                </div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  At Risk
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Context Section */}
        <Card className="rounded-xl border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Strategic Context</h2>
              </div>
              {onEdit && (
                <Button variant="ghost" size="sm" onClick={onEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {/* Vision */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Vision for this Strategy</h3>
                <p className="text-sm text-muted-foreground">{strategy.vision}</p>
              </div>

              {/* Rationale */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Strategic Rationale</h3>
                <p className="text-sm text-muted-foreground">{strategy.rationale}</p>
              </div>

              {/* Assumptions */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Key Assumptions</h3>
                <ul className="space-y-1">
                  {strategy.assumptions.map((assumption, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{assumption}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Objectives Section */}
        <Card className="rounded-xl border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Strategic Objectives</h2>
              </div>
              {onAddObjective && (
                <Button onClick={() => setShowAddObjectiveModal(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Objective
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {strategy.objectives.map((objective, index) => {
                const objectiveStatus = getObjectiveStatusConfig(objective.status);
                const StatusIcon = objectiveStatus.icon;

                return (
                  <Card key={objective.id} className="rounded-xl border">
                    <CardContent className="p-6">
                      {/* Objective Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">
                            {index + 1}. {objective.title}
                          </h3>
                        </div>
                        <Badge className={cn('rounded-full px-3 py-1 flex items-center gap-1', objectiveStatus.className)}>
                          <StatusIcon className="h-3 w-3" />
                          {objectiveStatus.label}
                        </Badge>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4">
                        {objective.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <Progress value={objective.progress} className="h-2 mb-2" />
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Target: {objective.targetValue}{objective.metricType === 'percentage' ? '%' : ''}</span>
                          <span>Current: {objective.currentValue}{objective.metricType === 'percentage' ? '%' : ''}</span>
                          <span>Start: {objective.startValue}{objective.metricType === 'percentage' ? '%' : ''}</span>
                        </div>
                      </div>

                      {/* Key Results */}
                      {objective.keyResults.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Key Results:</h4>
                          <div className="space-y-2">
                            {objective.keyResults.map((kr) => (
                              <div key={kr.id} className="flex items-start justify-between gap-3 text-sm">
                                <div className="flex items-start gap-2 flex-1">
                                  {getKeyResultStatusIcon(kr.status)}
                                  <span className={cn(
                                    kr.status === 'complete' ? 'text-muted-foreground line-through' : ''
                                  )}>
                                    {kr.description}
                                  </span>
                                </div>
                                {kr.current && (
                                  <span className="text-muted-foreground shrink-0">
                                    {kr.current}
                                  </span>
                                )}
                                {kr.status === 'complete' && (
                                  <span className="text-xs text-green-600 dark:text-green-400 shrink-0">
                                    Complete
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Linked Campaigns */}
                      {objective.linkedCampaigns.length > 0 && (
                        <div className="flex items-start gap-2 text-sm text-muted-foreground pt-4 border-t">
                          <Megaphone className="h-4 w-4 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium">Linked Campaigns: </span>
                            {objective.linkedCampaigns.map((campaignId, i) => {
                              const campaign = strategy.linkedCampaigns.find(c => c.id === campaignId);
                              return campaign ? (
                                <span key={campaignId}>
                                  {i > 0 && ', '}
                                  <button
                                    onClick={() => onNavigateToCampaign?.(campaignId)}
                                    className="text-primary hover:underline"
                                  >
                                    {campaign.name}
                                  </button>
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Key Focus Areas Section */}
        <Card className="rounded-xl border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Key Focus Areas</h2>
              </div>
              {onEdit && (
                <Button variant="ghost" size="sm" onClick={onEdit}>
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {strategy.focusAreas.map((area) => {
                const Icon = getFocusAreaIcon(area.icon);
                return (
                  <Card key={area.id} className="rounded-xl bg-muted/50 border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{area.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {area.description}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        {area.objectiveCount} {area.objectiveCount === 1 ? 'Objective' : 'Objectives'}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Linked Campaigns Section */}
        <Card className="rounded-xl border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Linked Campaigns</h2>
              </div>
              {onLinkCampaign && (
                <Button variant="outline" onClick={onLinkCampaign} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Link Campaign
                </Button>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Campaigns executing this strategy
            </p>

            <div className="space-y-3">
              {strategy.linkedCampaigns.map((campaign) => {
                const statusColors = {
                  active: 'text-green-600 dark:text-green-400',
                  completed: 'text-blue-600 dark:text-blue-400',
                  scheduled: 'text-amber-600 dark:text-amber-400',
                };

                return (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => onNavigateToCampaign?.(campaign.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <span className={cn('text-sm capitalize', statusColors[campaign.status])}>
                          {campaign.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{campaign.deliverableCount} deliverables</span>
                        <span>•</span>
                        <span>{campaign.progress}% complete</span>
                        <span>•</span>
                        <span>Targets: {campaign.targetObjectives.map(id => {
                          const obj = strategy.objectives.find(o => o.id === id);
                          return obj?.title;
                        }).filter(Boolean).join(', ')}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      View
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Milestones Timeline */}
        <Card className="rounded-xl border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Key Milestones</h2>
              </div>
              {onAddMilestone && (
                <Button variant="outline" onClick={onAddMilestone} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Milestone
                </Button>
              )}
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-border" />
              
              {/* Milestones */}
              <div className="grid grid-cols-4 gap-4">
                {strategy.milestones.map((milestone) => {
                  const isComplete = milestone.status === 'complete';
                  const isPending = milestone.status === 'pending';
                  
                  return (
                    <div key={milestone.id} className="relative">
                      {/* Marker */}
                      <div className={cn(
                        'absolute top-5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 z-10',
                        isComplete
                          ? 'bg-primary border-primary'
                          : isPending
                          ? 'bg-amber-500 border-amber-500'
                          : 'bg-background border-border'
                      )} />
                      
                      {/* Content */}
                      <div className="pt-12 text-center">
                        <div className="text-xs font-medium text-muted-foreground mb-1">
                          {milestone.quarter}
                        </div>
                        <Card className="rounded-lg p-3 text-left">
                          <h4 className="text-sm font-semibold mb-1">{milestone.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {milestone.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {new Date(milestone.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                            {isComplete && (
                              <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                            )}
                          </div>
                        </Card>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Objective Modal */}
      {showAddObjectiveModal && (
        <AddObjectiveModal
          open={showAddObjectiveModal}
          onClose={() => setShowAddObjectiveModal(false)}
          onSave={handleSaveObjective}
          focusAreas={strategy.focusAreas}
        />
      )}
    </div>
  );
}