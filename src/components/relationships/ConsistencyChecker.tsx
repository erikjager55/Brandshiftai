import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  Zap
} from 'lucide-react';
import { RelationshipService } from '../../services/RelationshipService';
import { ConsistencyReport, ConsistencyIssue } from '../../types/relationship';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface ConsistencyCheckerProps {
  onNavigateToEntity?: (type: string, id: string) => void;
}

export function ConsistencyChecker({ onNavigateToEntity }: ConsistencyCheckerProps) {
  const [report, setReport] = React.useState<ConsistencyReport | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [lastChecked, setLastChecked] = React.useState<Date | null>(null);

  const runCheck = React.useCallback(() => {
    setLoading(true);
    // Simulate async operation
    setTimeout(() => {
      const newReport = RelationshipService.runConsistencyCheck();
      setReport(newReport);
      setLastChecked(new Date());
      setLoading(false);
    }, 500);
  }, []);

  React.useEffect(() => {
    runCheck();
  }, [runCheck]);

  if (!report) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <ShieldCheck className="h-12 w-12 mx-auto text-muted-foreground mb-3 animate-pulse" />
          <p className="text-sm text-muted-foreground">Running consistency check...</p>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-green-500', text: 'text-green-600 dark:text-green-400', label: 'Excellent' };
    if (score >= 60) return { bg: 'bg-yellow-500', text: 'text-yellow-600 dark:text-yellow-400', label: 'Good' };
    if (score >= 40) return { bg: 'bg-orange-500', text: 'text-orange-600 dark:text-orange-400', label: 'Needs Work' };
    return { bg: 'bg-red-500', text: 'text-red-600 dark:text-red-400', label: 'Critical' };
  };

  const scoreColor = getScoreColor(report.overallScore);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${report.overallScore >= 80 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
                <ShieldCheck className={`h-5 w-5 ${scoreColor.text}`} />
              </div>
              <div>
                <CardTitle>Brand Consistency Check</CardTitle>
                <CardDescription>
                  {lastChecked && `Last checked ${lastChecked.toLocaleTimeString()}`}
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={runCheck}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Re-check
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Overall Score */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Health Score</p>
                <p className={`text-3xl font-bold ${scoreColor.text}`}>
                  {report.overallScore}
                  <span className="text-lg font-normal text-muted-foreground">/100</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">{scoreColor.label}</p>
              </div>
              <div className="h-32 w-32 flex items-center justify-center">
                <div className="relative">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - report.overallScore / 100)}`}
                      className={scoreColor.text}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-2xl font-bold ${scoreColor.text}`}>
                      {report.overallScore}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <Progress value={report.overallScore} className="h-2" />
          </div>

          {/* Issue Summary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-lg border bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 mb-1">
                <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-sm font-medium text-red-900 dark:text-red-100">Critical</span>
              </div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{report.criticalCount}</p>
            </div>
            
            <div className="p-4 rounded-lg border bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-medium text-orange-900 dark:text-orange-100">Warnings</span>
              </div>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{report.warningCount}</p>
            </div>
            
            <div className="p-4 rounded-lg border bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-1">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Info</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{report.infoCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues List */}
      {report.totalIssues > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Issues Detected</CardTitle>
            <CardDescription>
              {report.totalIssues} issue{report.totalIssues !== 1 ? 's' : ''} found - sorted by priority
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">
                  All ({report.totalIssues})
                </TabsTrigger>
                <TabsTrigger value="critical">
                  Critical ({report.criticalCount})
                </TabsTrigger>
                <TabsTrigger value="warning">
                  Warnings ({report.warningCount})
                </TabsTrigger>
                <TabsTrigger value="info">
                  Info ({report.infoCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3 mt-4">
                {report.issues.map((issue) => (
                  <IssueCard key={issue.id} issue={issue} onNavigate={onNavigateToEntity} />
                ))}
              </TabsContent>

              <TabsContent value="critical" className="space-y-3 mt-4">
                {report.issues
                  .filter(i => i.severity === 'critical')
                  .map((issue) => (
                    <IssueCard key={issue.id} issue={issue} onNavigate={onNavigateToEntity} />
                  ))}
              </TabsContent>

              <TabsContent value="warning" className="space-y-3 mt-4">
                {report.issues
                  .filter(i => i.severity === 'warning')
                  .map((issue) => (
                    <IssueCard key={issue.id} issue={issue} onNavigate={onNavigateToEntity} />
                  ))}
              </TabsContent>

              <TabsContent value="info" className="space-y-3 mt-4">
                {report.issues
                  .filter(i => i.severity === 'info')
                  .map((issue) => (
                    <IssueCard key={issue.id} issue={issue} onNavigate={onNavigateToEntity} />
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-3" />
            <p className="font-medium text-green-700 dark:text-green-300">Perfect Consistency!</p>
            <p className="text-sm text-muted-foreground mt-1">
              No issues detected. Your brand assets are well-aligned.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Summary Insights */}
      {report.summary && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Summary Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {report.summary.strongestAsset && (
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Most Connected Asset</p>
                    <p className="text-sm text-muted-foreground">{report.summary.strongestAsset.name}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onNavigateToEntity?.(report.summary.strongestAsset!.type, report.summary.strongestAsset!.id)}>
                  View
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            )}

            {report.summary.needsAttention && report.summary.needsAttention.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  Needs Attention ({report.summary.needsAttention.length})
                </p>
                <div className="space-y-1">
                  {report.summary.needsAttention.slice(0, 3).map((entity, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/50 text-sm">
                      <span className="text-muted-foreground">{entity.name}</span>
                      <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => onNavigateToEntity?.(entity.type, entity.id)}>
                        Review
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Individual issue card
interface IssueCardProps {
  issue: ConsistencyIssue;
  onNavigate?: (type: string, id: string) => void;
}

function IssueCard({ issue, onNavigate }: IssueCardProps) {
  const severityConfig = {
    critical: {
      icon: XCircle,
      color: 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800',
      textColor: 'text-red-900 dark:text-red-100',
      iconColor: 'text-red-600 dark:text-red-400',
      badge: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300'
    },
    warning: {
      icon: AlertTriangle,
      color: 'border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800',
      textColor: 'text-orange-900 dark:text-orange-100',
      iconColor: 'text-orange-600 dark:text-orange-400',
      badge: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300'
    },
    info: {
      icon: Info,
      color: 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800',
      textColor: 'text-blue-900 dark:text-blue-100',
      iconColor: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300'
    }
  };

  const config = severityConfig[issue.severity];
  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-lg border ${config.color}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 ${config.iconColor} mt-0.5 flex-shrink-0`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className={`font-medium text-sm ${config.textColor}`}>{issue.title}</h4>
            <div className="flex items-center gap-2 flex-shrink-0">
              {issue.autoFixable && (
                <Badge variant="outline" className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                  <Zap className="h-3 w-3 mr-1" />
                  Auto-fix
                </Badge>
              )}
              <Badge variant="outline" className={`text-xs ${config.badge}`}>
                Priority {issue.priority}
              </Badge>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            {issue.description}
          </p>

          {/* Affected Entities */}
          {issue.affectedEntities.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-2">Affected entities:</p>
              <div className="flex flex-wrap gap-1">
                {issue.affectedEntities.map((entity, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs cursor-pointer hover:bg-accent"
                    onClick={() => onNavigate?.(entity.type, entity.id)}
                  >
                    {entity.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Action */}
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground italic">
              💡 {issue.suggestedAction}
            </p>
            {issue.autoFixable && issue.autoFixAction && (
              <Button size="sm" variant="outline" onClick={issue.autoFixAction}>
                <Zap className="h-3 w-3 mr-2" />
                Auto-fix
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
