import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Network, 
  ArrowRight, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  ShieldCheck
} from 'lucide-react';
import { RelationshipService } from '../services/RelationshipService';
import { SmartSuggestionsService } from '../services/SmartSuggestionsService';

interface RelationshipsWidgetProps {
  onViewAll?: () => void;
  onNavigate?: (url: string) => void;
}

export function RelationshipsWidget({ onViewAll, onNavigate }: RelationshipsWidgetProps) {
  const stats = React.useMemo(() => RelationshipService.getStats(), []);
  const report = React.useMemo(() => RelationshipService.runConsistencyCheck(), []);
  const suggestions = React.useMemo(() => SmartSuggestionsService.getSuggestions().slice(0, 3), []);

  const healthColor = report.overallScore >= 80 
    ? 'text-green-600 dark:text-green-400' 
    : report.overallScore >= 60
    ? 'text-yellow-600 dark:text-yellow-400'
    : 'text-orange-600 dark:text-orange-400';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Network className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle>Relationships & Insights</CardTitle>
              <CardDescription>
                {stats.totalRelationships} connections across your brand
              </CardDescription>
            </div>
          </div>
          {onViewAll && (
            <Button variant="ghost" size="sm" onClick={onViewAll}>
              View All
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Health Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className={`h-4 w-4 ${healthColor}`} />
              <span className="text-sm font-medium">Brand Consistency</span>
            </div>
            <span className={`text-sm font-bold ${healthColor}`}>
              {report.overallScore}/100
            </span>
          </div>
          <Progress value={report.overallScore} className="h-2" />
          {report.overallScore < 80 && (
            <p className="text-xs text-muted-foreground">
              {report.criticalCount > 0 && `${report.criticalCount} critical issue${report.criticalCount !== 1 ? 's' : ''} detected. `}
              {report.warningCount > 0 && `${report.warningCount} warning${report.warningCount !== 1 ? 's' : ''} found.`}
            </p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border bg-card">
            <p className="text-2xl font-bold text-foreground">{stats.totalRelationships}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Links</p>
          </div>
          <div className="p-3 rounded-lg border bg-card">
            <p className="text-2xl font-bold text-foreground">{stats.orphanedEntities.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Unconnected</p>
          </div>
        </div>

        {/* Most Connected */}
        {stats.mostConnectedEntity && (
          <div className="p-3 rounded-lg border bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-green-900 dark:text-green-100">
                  Most Connected
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 truncate">
                  {stats.mostConnectedEntity.name}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Top Suggestion */}
        {suggestions.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Top Suggestion</p>
            <div className={`p-3 rounded-lg border ${
              suggestions[0].priority === 'critical' ? 'border-red-200 bg-red-50 dark:bg-red-900/20' :
              suggestions[0].priority === 'high' ? 'border-orange-200 bg-orange-50 dark:bg-orange-900/20' :
              'border-blue-200 bg-blue-50 dark:bg-blue-900/20'
            }`}>
              <p className="text-sm font-medium mb-1">{suggestions[0].title}</p>
              <p className="text-xs text-muted-foreground mb-2">
                {suggestions[0].description}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onNavigate?.(suggestions[0].actionUrl)}
              >
                {suggestions[0].action}
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        {/* Critical Issues Alert */}
        {report.criticalCount > 0 && (
          <div className="p-3 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900 dark:text-red-100">
                  {report.criticalCount} Critical Issue{report.criticalCount !== 1 ? 's' : ''}
                </p>
                <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                  Resolve these to improve brand consistency
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={onViewAll}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* All Clear */}
        {report.overallScore === 100 && (
          <div className="p-3 rounded-lg border border-green-200 bg-green-50 dark:bg-green-900/20 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-900 dark:text-green-100">
              Perfect Consistency!
            </p>
            <p className="text-xs text-green-700 dark:text-green-300 mt-1">
              All brand assets are well-aligned
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
