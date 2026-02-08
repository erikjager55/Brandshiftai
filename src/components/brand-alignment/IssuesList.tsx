import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  AlertTriangle,
  XCircle,
  Sparkles,
  ChevronRight,
  Users,
  Package,
  Target,
  Lightbulb,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export type IssueSeverity = 'critical' | 'warning' | 'suggestion';
export type IssueType = 'all' | 'contradiction' | 'tone-mismatch' | 'missing-reference' | 'outdated';
export type ModuleFilter = 'all' | 'brand-foundation' | 'business-strategy' | 'brandstyle' | 'personas' | 'products-services' | 'market-insights';

export interface AlignmentIssue {
  id: string;
  severity: IssueSeverity;
  title: string;
  module: string;
  modulePath: string;
  moduleIcon: any;
  description: string;
  conflictsWith: string[];
  recommendation: string;
  onFix?: () => void;
  viewLinks?: { label: string; onClick: () => void }[];
}

// Mock data
const mockIssues: AlignmentIssue[] = [
  {
    id: 'issue-1',
    severity: 'critical',
    title: 'Persona "Tech-Savvy Millennial" contradicts Brand Positioning',
    module: 'Personas',
    modulePath: 'Personas → Tech-Savvy Millennial',
    moduleIcon: Users,
    description: 'Your brand positioning emphasizes "premium enterprise solutions" but this persona targets budget-conscious consumers. This creates a fundamental misalignment in your target audience strategy.',
    conflictsWith: ['Brand Foundation (Positioning)', 'Business Strategy'],
    recommendation: 'Consider either adjusting the persona to focus on enterprise decision-makers, or broadening your brand positioning to include both segments with a tiered approach.',
    viewLinks: [
      { label: 'View Persona', onClick: () => {} },
      { label: 'View Positioning', onClick: () => {} },
    ],
  },
  {
    id: 'issue-2',
    severity: 'warning',
    title: 'Product "Mobile App Framework" tone doesn\'t match Brandstyle',
    module: 'Products & Services',
    modulePath: 'Products & Services → Mobile App Framework',
    moduleIcon: Package,
    description: 'Your brandstyle defines a "professional and authoritative" tone, but the product description uses casual language like "super easy" and "awesome features". This inconsistency weakens brand perception.',
    conflictsWith: ['Brandstyle (Tone of Voice)'],
    recommendation: 'Rewrite the product description using the professional tone defined in your brandstyle. Replace casual terms with authoritative language.',
    viewLinks: [
      { label: 'View Product', onClick: () => {} },
      { label: 'View Brandstyle', onClick: () => {} },
    ],
  },
  {
    id: 'issue-3',
    severity: 'warning',
    title: 'Business Strategy objective misaligned with Market Insights',
    module: 'Business Strategy',
    modulePath: 'Business Strategy → Growth Strategy 2026 → Market Share Objective',
    moduleIcon: Target,
    description: 'Your growth strategy targets 25% market share growth, but recent market insights indicate a contracting market with 5% decline. The target may need adjustment based on current market reality.',
    conflictsWith: ['Market Insights (Market Contraction Trend)'],
    recommendation: 'Review the market share target in light of the contraction trend. Consider adjusting to a relative market share goal or update the market insight if the data is outdated.',
    viewLinks: [
      { label: 'View Strategy', onClick: () => {} },
      { label: 'View Insight', onClick: () => {} },
    ],
  },
  {
    id: 'issue-4',
    severity: 'suggestion',
    title: 'Brand Foundation values could be reflected in Product descriptions',
    module: 'Brand Foundation',
    modulePath: 'Brand Foundation → Core Values',
    moduleIcon: Lightbulb,
    description: 'Your core value "sustainability" isn\'t mentioned in any of your product descriptions. Reinforcing values in product messaging strengthens brand coherence.',
    conflictsWith: [],
    recommendation: 'Add sustainability messaging to product descriptions where relevant. This reinforces brand values at every customer touchpoint.',
    viewLinks: [
      { label: 'View Values', onClick: () => {} },
      { label: 'View Products', onClick: () => {} },
    ],
  },
];

interface IssuesListProps {
  onFixClick?: (issue: AlignmentIssue) => void;
}

export function IssuesList({ onFixClick }: IssuesListProps) {
  const [issueTypeFilter, setIssueTypeFilter] = useState<IssueType>('all');
  const [moduleFilter, setModuleFilter] = useState<ModuleFilter>('all');
  const [severityFilter, setSeverityFilter] = useState<IssueSeverity | 'all'>('all');

  const filteredIssues = mockIssues.filter((issue) => {
    if (severityFilter !== 'all' && issue.severity !== severityFilter) return false;
    // Add more filter logic as needed
    return true;
  });

  const getSeverityBadge = (severity: IssueSeverity) => {
    switch (severity) {
      case 'critical':
        return (
          <Badge className="rounded-full px-3 py-1 text-xs font-medium uppercase bg-red-600 dark:bg-red-600 text-white border-0">
            Critical
          </Badge>
        );
      case 'warning':
        return (
          <Badge className="rounded-full px-3 py-1 text-xs font-medium uppercase bg-amber-600 dark:bg-amber-600 text-white border-0">
            Warning
          </Badge>
        );
      case 'suggestion':
        return (
          <Badge className="rounded-full px-3 py-1 text-xs font-medium uppercase bg-blue-600 dark:bg-blue-600 text-white border-0">
            Suggestion
          </Badge>
        );
    }
  };

  const getSeverityCardClasses = (severity: IssueSeverity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800';
      case 'suggestion':
        return 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-xl font-semibold">Alignment Issues</h2>
          <Badge className="rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-0">
            {filteredIssues.length} items need review
          </Badge>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3">
        <Select value={issueTypeFilter} onValueChange={(value) => setIssueTypeFilter(value as IssueType)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Issues" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Issues</SelectItem>
            <SelectItem value="contradiction">Contradictions</SelectItem>
            <SelectItem value="tone-mismatch">Tone Mismatches</SelectItem>
            <SelectItem value="missing-reference">Missing References</SelectItem>
            <SelectItem value="outdated">Outdated Content</SelectItem>
          </SelectContent>
        </Select>

        <Select value={moduleFilter} onValueChange={(value) => setModuleFilter(value as ModuleFilter)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Modules" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modules</SelectItem>
            <SelectItem value="brand-foundation">Brand Foundation</SelectItem>
            <SelectItem value="business-strategy">Business Strategy</SelectItem>
            <SelectItem value="brandstyle">Brandstyle</SelectItem>
            <SelectItem value="personas">Personas</SelectItem>
            <SelectItem value="products-services">Products & Services</SelectItem>
            <SelectItem value="market-insights">Market Insights</SelectItem>
          </SelectContent>
        </Select>

        <Select value={severityFilter} onValueChange={(value) => setSeverityFilter(value as IssueSeverity | 'all')}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severity</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="suggestion">Suggestion</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => {
          const Icon = issue.moduleIcon;
          return (
            <Card
              key={issue.id}
              className={cn(
                'rounded-xl border p-6',
                getSeverityCardClasses(issue.severity)
              )}
            >
              {/* Severity Badge */}
              <div className="mb-3">
                {getSeverityBadge(issue.severity)}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>

              {/* Source Path */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Icon className="h-4 w-4" />
                <span>{issue.modulePath}</span>
              </div>

              {/* Description */}
              <p className="text-sm mb-3">{issue.description}</p>

              {/* Conflicts With */}
              {issue.conflictsWith.length > 0 && (
                <p className="text-sm mb-3">
                  <span className="font-medium">Conflicts with:</span>{' '}
                  {issue.conflictsWith.join(', ')}
                </p>
              )}

              {/* Recommendation */}
              <div className="rounded-lg bg-background p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Recommendation:</p>
                    <p className="text-sm text-muted-foreground">{issue.recommendation}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                {issue.viewLinks?.map((link, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={link.onClick}
                  >
                    {link.label}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => onFixClick?.(issue)}
                >
                  Fix
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}