import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import {
  Shield,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  ChevronRight,
  Lightbulb,
  Target,
  FlaskConical,
  Users,
  Package,
  TrendingUp,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ScanningModal } from './brand-alignment/ScanningModal';
import { IssuesList } from './brand-alignment/IssuesList';
import { FixAssistantModal } from './brand-alignment/FixAssistantModal';

// Mock data for alignment score
const alignmentData = {
  score: 78,
  lastScan: '2 hours ago',
  aligned: 14,
  needsReview: 3,
  misaligned: 1,
  totalItems: 18,
};

// Mock data for module alignment
const moduleAlignmentData = [
  {
    id: 'brand-foundation',
    name: 'Brand Foundation',
    icon: Lightbulb,
    score: 92,
    aligned: 5,
    needsReview: 1,
    misaligned: 0,
    lastChecked: '2h ago',
  },
  {
    id: 'business-strategy',
    name: 'Business Strategy',
    icon: Target,
    score: 85,
    aligned: 3,
    needsReview: 1,
    misaligned: 0,
    lastChecked: '2h ago',
  },
  {
    id: 'brandstyle',
    name: 'Brandstyle',
    icon: FlaskConical,
    score: 95,
    aligned: 5,
    needsReview: 0,
    misaligned: 0,
    lastChecked: '2h ago',
  },
  {
    id: 'personas',
    name: 'Personas',
    icon: Users,
    score: 68,
    aligned: 2,
    needsReview: 0,
    misaligned: 1,
    lastChecked: '2h ago',
  },
  {
    id: 'products-services',
    name: 'Products & Services',
    icon: Package,
    score: 72,
    aligned: 2,
    needsReview: 1,
    misaligned: 0,
    lastChecked: '2h ago',
  },
  {
    id: 'market-insights',
    name: 'Market Insights',
    icon: TrendingUp,
    score: 90,
    aligned: 6,
    needsReview: 1,
    misaligned: 0,
    lastChecked: '2h ago',
  },
];

export function BrandAlignmentDashboard() {
  const [showScanningModal, setShowScanningModal] = useState(false);
  const [showFixAssistantModal, setShowFixAssistantModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreFillColor = (score: number) => {
    if (score >= 90) return 'bg-green-600';
    if (score >= 70) return 'bg-amber-600';
    return 'bg-red-600';
  };

  const getScoreDescription = (score: number, issueCount: number) => {
    if (score >= 90) return 'Excellent! Your brand is fully aligned across all knowledge items.';
    if (score >= 70) return `Your brand is mostly aligned, but there ${issueCount === 1 ? 'is' : 'are'} ${issueCount} ${issueCount === 1 ? 'item' : 'items'} that need attention.`;
    if (score >= 50) return 'Several knowledge items are inconsistent. Review recommended.';
    return 'Your brand has significant alignment issues. Immediate review needed.';
  };

  const handleRunScan = () => {
    setShowScanningModal(true);
  };

  const handleModuleClick = (moduleId: string) => {
    // Scroll to issues list filtered by module
    const issuesSection = document.getElementById('issues-list');
    if (issuesSection) {
      issuesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const issueCount = alignmentData.needsReview + alignmentData.misaligned;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-primary/10 p-3">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold">Brand Alignment</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Keep your brand consistent across every touchpoint
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last scan: {alignmentData.lastScan}</span>
              </div>
              <Button onClick={handleRunScan} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Run Full Scan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Alignment Score Hero Card */}
        <Card className="rounded-xl border p-8">
          <div className="flex items-center gap-8">
            {/* Score Circle */}
            <div className="flex-shrink-0">
              <div className="relative h-32 w-32">
                {/* Background circle */}
                <svg className="transform -rotate-90 h-32 w-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted/20"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - alignmentData.score / 100)}`}
                    className={cn(
                      'transition-all duration-1000',
                      alignmentData.score >= 90 ? 'text-green-600' :
                      alignmentData.score >= 70 ? 'text-amber-600' :
                      'text-red-600'
                    )}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={cn('text-4xl font-semibold', getScoreColor(alignmentData.score))}>
                    {alignmentData.score}%
                  </span>
                </div>
              </div>
            </div>

            {/* Score Info */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Your Brand Alignment Score</h2>
              <p className="text-sm text-muted-foreground mb-6">
                {getScoreDescription(alignmentData.score, issueCount)}
              </p>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4">
                {/* Aligned */}
                <div className="rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-2xl font-semibold text-green-600 dark:text-green-400">
                      {alignmentData.aligned}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Aligned</p>
                </div>

                {/* Needs Review */}
                <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-2xl font-semibold text-amber-600 dark:text-amber-400">
                      {alignmentData.needsReview}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Needs Review</p>
                </div>

                {/* Misaligned */}
                <div className="rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <span className="text-2xl font-semibold text-red-600 dark:text-red-400">
                      {alignmentData.misaligned}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Misaligned</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Module Alignment Overview */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Module Alignment Overview</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {moduleAlignmentData.map((module) => {
              const Icon = module.icon;
              return (
                <Card
                  key={module.id}
                  className="rounded-xl border p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleModuleClick(module.id)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">{module.name}</h3>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden mr-3">
                        <div
                          className={cn('h-full transition-all duration-500', getScoreFillColor(module.score))}
                          style={{ width: `${module.score}%` }}
                        />
                      </div>
                      <span className={cn('text-sm font-semibold', getScoreColor(module.score))}>
                        {module.score}%
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    {module.aligned > 0 && (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span>{module.aligned} aligned</span>
                      </div>
                    )}
                    {module.needsReview > 0 && (
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <span>{module.needsReview} review</span>
                      </div>
                    )}
                    {module.misaligned > 0 && (
                      <div className="flex items-center gap-1">
                        <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <span>{module.misaligned} misaligned</span>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      Last checked: {module.lastChecked}
                    </span>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary">
                      View
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Placeholder for Issues List */}
        <div id="issues-list">
          <IssuesList
            onFixClick={(issue) => {
              setSelectedIssue(issue);
              setShowFixAssistantModal(true);
            }}
          />
        </div>
      </div>

      {/* Scanning Modal */}
      {showScanningModal && (
        <ScanningModal
          isOpen={showScanningModal}
          onClose={() => setShowScanningModal(false)}
        />
      )}

      {/* Fix Assistant Modal */}
      {showFixAssistantModal && (
        <FixAssistantModal
          isOpen={showFixAssistantModal}
          onClose={() => setShowFixAssistantModal(false)}
          issue={selectedIssue}
        />
      )}
    </div>
  );
}