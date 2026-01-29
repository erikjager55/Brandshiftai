import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Share2,
  Target,
  Lightbulb,
  Quote,
  BarChart3,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  TrendingUp,
  AlertCircle,
  Clock,
  Users,
  ThumbsUp,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ResearchResultsPageProps {
  onBack: () => void;
  onApplyToAsset?: () => void;
}

// Mock data for the research results
const researchStudy = {
  title: 'Interview Results: Brand Positioning',
  type: 'Stakeholder Interviews',
  status: 'Completed',
  completedDate: 'Jan 20, 2025',
  participantCount: 12,
  confidenceScore: 87,
};

const confidenceBreakdown = [
  { label: 'Sample Size', status: 'Excellent', icon: CheckCircle2 },
  { label: 'Data Quality', status: 'High', icon: CheckCircle2 },
  { label: 'Statistical Significance', status: 'Strong', icon: CheckCircle2 },
];

const keyFindings = [
  {
    id: 1,
    title: 'Strong alignment on core purpose',
    description: 'Participants consistently identified the brand\'s commitment to innovation and sustainability as key differentiators.',
    supportingData: 'Mentioned by 9/12 participants (75%)',
    impact: 'High Impact',
    impactClass: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  },
  {
    id: 2,
    title: 'Value proposition needs clarification',
    description: 'While the core offering is understood, stakeholders struggled to articulate the unique value proposition in customer terms.',
    supportingData: 'Only 4/12 participants (33%) could clearly explain the value prop',
    impact: 'High Impact',
    impactClass: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  },
  {
    id: 3,
    title: 'Brand personality is perceived as professional but distant',
    description: 'Stakeholders see the brand as credible and expert, but lack emotional connection with target audiences.',
    supportingData: 'Mentioned by 7/12 participants (58%)',
    impact: 'Medium Impact',
    impactClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  },
  {
    id: 4,
    title: 'Competitive positioning is unclear in market',
    description: 'Participants had difficulty positioning the brand relative to key competitors, suggesting positioning gaps.',
    supportingData: 'Mentioned by 6/12 participants (50%)',
    impact: 'Medium Impact',
    impactClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  },
];

const notableQuotes = [
  {
    id: 1,
    quote: 'Our commitment to sustainability isn\'t just a marketing message - it\'s embedded in everything we do, from product design to supply chain.',
    attribution: 'Participant 3, Product Director',
    tags: ['Sustainability', 'Core Values', 'Purpose'],
  },
  {
    id: 2,
    quote: 'When I try to explain what makes us different, I find myself talking about features instead of the real value we bring to customers.',
    attribution: 'Participant 7, Marketing Director',
    tags: ['Value Proposition', 'Messaging', 'Differentiation'],
  },
  {
    id: 3,
    quote: 'We\'re seen as the safe, reliable choice - but that doesn\'t inspire people. We need more emotional resonance.',
    attribution: 'Participant 11, Sales Lead',
    tags: ['Brand Personality', 'Emotional Connection'],
  },
];

const sentimentData = [
  { label: 'Positive', value: 58, color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  { label: 'Neutral', value: 33, color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-800' },
  { label: 'Negative', value: 9, color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900/30' },
];

const themeFrequency = [
  { theme: 'Innovation & Technology', percentage: 75 },
  { theme: 'Sustainability', percentage: 67 },
  { theme: 'Customer Focus', percentage: 58 },
  { theme: 'Market Position', percentage: 50 },
  { theme: 'Brand Personality', percentage: 42 },
];

const recommendations = [
  {
    id: 1,
    priority: 'High Priority',
    priorityClass: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    title: 'Refine and simplify value proposition messaging',
    description: 'Develop clear, customer-centric value proposition statements that all stakeholders can articulate consistently.',
  },
  {
    id: 2,
    priority: 'High Priority',
    priorityClass: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    title: 'Evolve brand personality to add warmth and approachability',
    description: 'Maintain professional credibility while introducing more human, relatable brand expressions.',
  },
  {
    id: 3,
    priority: 'Medium Priority',
    priorityClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    title: 'Clarify competitive positioning framework',
    description: 'Create a clear positioning map and competitive differentiation messaging for internal alignment.',
  },
];

const relatedAssets = [
  { id: 1, name: 'Brand Positioning', status: 'In Progress', icon: Target },
  { id: 2, name: 'Value Proposition', status: 'Not Started', icon: MessageSquare },
  { id: 3, name: 'Brand Personality', status: 'In Progress', icon: Users },
];

export function ResearchResultsPage({ onBack, onApplyToAsset }: ResearchResultsPageProps) {
  const [showRawData, setShowRawData] = useState(false);

  return (
    <div className="h-full overflow-auto bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-7xl mx-auto px-8 py-6 space-y-4">
          {/* Back link */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Research Hub
          </button>

          {/* Title row */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-green-100 dark:bg-green-900/30 p-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-semibold">{researchStudy.title}</h1>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full px-3 py-1">
                    {researchStudy.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {researchStudy.participantCount} interviews • Completed {researchStudy.completedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Action bar */}
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share Results
            </Button>
            <Button onClick={onApplyToAsset}>
              Apply to Brand Asset
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* CONFIDENCE SCORE CARD */}
        <Card className="rounded-xl border p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Research Confidence</h2>
              <div className="text-5xl font-semibold text-green-600 dark:text-green-400 mb-6">
                {researchStudy.confidenceScore}%
              </div>

              {/* Progress visualization */}
              <div className="mb-6">
                <Progress value={researchStudy.confidenceScore} className="h-3" />
              </div>

              {/* Breakdown */}
              <div className="space-y-3">
                {confidenceBreakdown.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm">
                        <span className="font-medium">{item.label}:</span>{' '}
                        <span className="text-green-600 dark:text-green-400">{item.status}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress ring visualization */}
            <div className="relative h-40 w-40">
              <svg className="transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/30"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - researchStudy.confidenceScore / 100)}`}
                  className="text-green-600 dark:text-green-400 transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-semibold text-green-600 dark:text-green-400">
                  {researchStudy.confidenceScore}%
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* KEY FINDINGS SECTION */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Key Findings</h2>
          </div>
          <p className="text-sm text-muted-foreground">AI-generated summary of research insights</p>

          {/* Findings cards */}
          <div className="space-y-4">
            {keyFindings.map((finding) => (
              <Card key={finding.id} className="rounded-xl border p-4">
                <div className="flex items-start gap-4">
                  {/* Finding number badge */}
                  <div className="rounded-full bg-primary text-primary-foreground h-6 w-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {finding.id}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold">{finding.title}</h3>
                    <p className="text-sm text-muted-foreground">{finding.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{finding.supportingData}</span>
                        <Badge className={cn("rounded-full px-3 py-1 text-xs", finding.impactClass)}>
                          {finding.impact}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        Use in Content
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* VERBATIM QUOTES SECTION */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Quote className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Notable Quotes</h2>
          </div>

          {/* Quote cards */}
          <div className="space-y-4">
            {notableQuotes.map((quote) => (
              <Card key={quote.id} className="rounded-xl border p-6">
                <blockquote className="border-l-4 border-primary pl-4 mb-4">
                  <p className="text-sm italic mb-2">"{quote.quote}"</p>
                  <footer className="text-sm text-muted-foreground">
                    — {quote.attribution}
                  </footer>
                </blockquote>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {quote.tags.map((tag, idx) => (
                    <Badge key={idx} className="bg-muted text-foreground rounded-full px-3 py-1 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* DATA VISUALIZATION SECTION */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Response Analysis</h2>
          </div>

          {/* Charts (2 columns) */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sentiment Distribution */}
            <Card className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4">Sentiment Distribution</h3>
              
              {/* Simple bar visualization */}
              <div className="space-y-3 mb-6">
                {sentimentData.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className={cn("text-sm font-semibold", item.color)}>{item.value}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn("h-full transition-all duration-500", item.bgColor)}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {sentimentData.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={cn("h-3 w-3 rounded-full", item.bgColor)} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Theme Frequency */}
            <Card className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4">Theme Frequency</h3>
              <p className="text-sm text-muted-foreground mb-4">Top 5 themes mentioned by participants</p>

              {/* Horizontal bar chart */}
              <div className="space-y-3">
                {themeFrequency.map((item) => (
                  <div key={item.theme}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.theme}</span>
                      <span className="text-sm font-semibold text-primary">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* RECOMMENDATIONS SECTION */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Recommended Actions</h2>
          </div>
          <p className="text-sm text-muted-foreground">Based on research findings</p>

          {/* Action cards */}
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="rounded-xl border p-4 bg-primary/5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className={cn("rounded-full px-3 py-1 text-xs", rec.priorityClass)}>
                        {rec.priority}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                  <Button>Take Action</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* RAW DATA ACCESS */}
        <Card className="rounded-xl border p-6">
          <button
            onClick={() => setShowRawData(!showRawData)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">View Raw Data</h2>
            </div>
            {showRawData ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {showRawData && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>

              <Separator />

              {/* Sample table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 font-semibold">Participant</th>
                      <th className="text-left p-2 font-semibold">Role</th>
                      <th className="text-left p-2 font-semibold">Response Date</th>
                      <th className="text-left p-2 font-semibold">Duration</th>
                      <th className="text-left p-2 font-semibold">Sentiment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/50">
                        <td className="p-2">Participant {i}</td>
                        <td className="p-2">{i % 2 === 0 ? 'Marketing Director' : 'Product Manager'}</td>
                        <td className="p-2">Jan {15 + i}, 2025</td>
                        <td className="p-2">{45 + i * 5} min</td>
                        <td className="p-2">
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full px-2 py-1 text-xs">
                            Positive
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Card>

        {/* RELATED ASSETS */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Assets Using This Research</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {relatedAssets.map((asset) => {
              const Icon = asset.icon;
              return (
                <Card
                  key={asset.id}
                  className="rounded-xl border p-4 hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold truncate">{asset.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs",
                            asset.status === 'In Progress'
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          )}
                        >
                          {asset.status}
                        </Badge>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
