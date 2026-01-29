import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Clock,
  DollarSign,
  Target,
  TrendingUp,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Users,
  BarChart3,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';

interface InvestorMetricsDashboardProps {
  onBack?: () => void;
}

export function InvestorMetricsDashboard({ onBack }: InvestorMetricsDashboardProps) {
  // Comparison data for radar chart
  const comparisonData = [
    {
      metric: 'Speed',
      Brandshift: 95,
      Traditional: 45,
      Competitors: 65,
    },
    {
      metric: 'Quality',
      Brandshift: 94,
      Traditional: 67,
      Competitors: 78,
    },
    {
      metric: 'Research Depth',
      Brandshift: 92,
      Traditional: 85,
      Competitors: 60,
    },
    {
      metric: 'Cost',
      Brandshift: 88,
      Traditional: 40,
      Competitors: 70,
    },
    {
      metric: 'Scalability',
      Brandshift: 96,
      Traditional: 35,
      Competitors: 75,
    },
  ];

  // Growth projection data
  const growthData = [
    { month: 'Jan', users: 150, content: 450, revenue: 7500 },
    { month: 'Feb', users: 220, content: 780, revenue: 11000 },
    { month: 'Mar', users: 340, content: 1200, revenue: 17000 },
    { month: 'Apr', users: 480, content: 1850, revenue: 24000 },
    { month: 'May', users: 650, content: 2600, revenue: 32500 },
    { month: 'Jun', users: 850, content: 3500, revenue: 42500 },
  ];

  const metricCards = [
    {
      id: 'time-saved',
      icon: Clock,
      label: 'Time Saved',
      value: '3.2 hours',
      subtitle: 'per content piece',
      comparison: 'vs 5.5 hours manual',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      trend: '+42%',
    },
    {
      id: 'research-roi',
      icon: DollarSign,
      label: 'Research ROI',
      value: '$24,500',
      subtitle: 'consultant equivalent',
      comparison: 'per year saved',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      trend: '+186%',
    },
    {
      id: 'content-quality',
      icon: Target,
      label: 'Content Quality',
      value: '94%',
      subtitle: 'brand alignment',
      comparison: 'vs 67% without tool',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      trend: '+40%',
    },
    {
      id: 'decision-confidence',
      icon: CheckCircle2,
      label: 'Decision Confidence',
      value: '87%',
      subtitle: 'validated decisions',
      comparison: 'up from 34% before',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      trend: '+156%',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
              <Badge className="rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4 mr-1" />
                Investor Overview
              </Badge>
            </div>
            <h1 className="text-3xl font-semibold">Platform Performance</h1>
            <p className="text-sm text-muted-foreground">
              Key metrics demonstrating Brandshift's value proposition
            </p>
          </div>

          <div className="text-right">
            <div className="text-sm text-muted-foreground">Data Period</div>
            <div className="text-lg font-semibold">Last 6 Months</div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCards.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.id} className="rounded-xl border p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`h-12 w-12 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <Badge variant="outline" className="rounded-full text-green-600 dark:text-green-400">
                    {metric.trend}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                  <div className="text-3xl font-semibold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.subtitle}</div>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground">{metric.comparison}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Chart */}
        <div className="rounded-xl border p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Brandshift vs Alternatives</h2>
            <p className="text-sm text-muted-foreground">
              Performance comparison across key metrics
            </p>
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={comparisonData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Brandshift"
                  dataKey="Brandshift"
                  stroke="#1FD1B2"
                  fill="#1FD1B2"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Competitors"
                  dataKey="Competitors"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Traditional"
                  dataKey="Traditional"
                  stroke="#e2e8f0"
                  fill="#e2e8f0"
                  fillOpacity={0.3}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">67%</div>
              <div className="text-sm text-muted-foreground">Competitors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">54%</div>
              <div className="text-sm text-muted-foreground">Traditional</div>
            </div>
          </div>
        </div>

        {/* Growth Projections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth */}
          <div className="rounded-xl border p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">User Growth</h3>
              <p className="text-sm text-muted-foreground">
                Active users over time
              </p>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#1FD1B2"
                    strokeWidth={2}
                    dot={{ fill: '#1FD1B2' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <div className="text-2xl font-semibold">850</div>
                <div className="text-sm text-muted-foreground">Current Users</div>
              </div>
              <Badge className="rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                +467% growth
              </Badge>
            </div>
          </div>

          {/* Content Generated */}
          <div className="rounded-xl border p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Content Generated</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered content pieces
              </p>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line
                    type="monotone"
                    dataKey="content"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <div className="text-2xl font-semibold">3,500</div>
                <div className="text-sm text-muted-foreground">Total Content</div>
              </div>
              <Badge className="rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                <Sparkles className="h-4 w-4 mr-1" />
                +678% growth
              </Badge>
            </div>
          </div>
        </div>

        {/* Market Opportunity */}
        <div className="rounded-xl border p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Market Opportunity</h2>
            <p className="text-sm text-muted-foreground">
              Total addressable market and growth potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-3xl font-semibold">$12.3B</div>
                <div className="text-sm text-muted-foreground mt-1">Total Addressable Market</div>
                <div className="text-xs text-muted-foreground mt-2">Brand management software (2024)</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-3xl font-semibold">23.4%</div>
                <div className="text-sm text-muted-foreground mt-1">Annual Growth Rate</div>
                <div className="text-xs text-muted-foreground mt-2">CAGR 2024-2029</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-3xl font-semibold">$2.8M</div>
                <div className="text-sm text-muted-foreground mt-1">Revenue Projection</div>
                <div className="text-xs text-muted-foreground mt-2">End of year 1</div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Differentiators */}
        <div className="rounded-xl border p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Key Differentiators</h2>
            <p className="text-sm text-muted-foreground">
              What sets Brandshift apart from the competition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Research-Backed AI</h4>
                  <p className="text-sm text-muted-foreground">
                    Only platform combining enterprise research methods with AI content generation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Decision Intelligence</h4>
                  <p className="text-sm text-muted-foreground">
                    Dual-layer status system provides unprecedented decision confidence
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Strategic Asset Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Prioritized by strategic risk, not just organizational hierarchy
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">End-to-End Platform</h4>
                  <p className="text-sm text-muted-foreground">
                    From research to content generation to campaign management in one tool
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
