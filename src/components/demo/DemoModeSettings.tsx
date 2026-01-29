import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useDemoMode } from '../../contexts/DemoModeContext';
import {
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Play,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function DemoModeSettings() {
  const { config, enableDemoMode, disableDemoMode, startTour } = useDemoMode();
  
  const [companyName, setCompanyName] = useState(config.companyName);
  const [industry, setIndustry] = useState(config.industry);
  const [dataDensity, setDataDensity] = useState<'minimal' | 'moderate' | 'full'>(config.dataDensity);

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Retail',
    'Education',
    'Manufacturing',
    'Marketing Agency',
    'Consulting',
  ];

  const dataDensityOptions = [
    {
      value: 'minimal' as const,
      label: 'Minimal',
      description: 'Basic data for quick demos',
      items: '5-10 items per category',
    },
    {
      value: 'moderate' as const,
      label: 'Moderate',
      description: 'Balanced dataset for presentations',
      items: '15-25 items per category',
    },
    {
      value: 'full' as const,
      label: 'Full',
      description: 'Complete dataset for deep dives',
      items: '50+ items per category',
    },
  ];

  const handleEnableDemo = () => {
    enableDemoMode(companyName, industry, dataDensity);
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-semibold">Demo Mode</h2>
          {config.enabled && (
            <Badge className="rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
              Active
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Configure demo mode for investor presentations and product demonstrations
        </p>
      </div>

      {/* Demo Mode Toggle Card */}
      <div className="rounded-xl border p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Enable Demo Mode</h3>
            <p className="text-sm text-muted-foreground">
              Use pre-populated sample data for presentations
            </p>
          </div>

          {config.enabled ? (
            <Button variant="outline" onClick={disableDemoMode} className="gap-2">
              <X className="h-4 w-4" />
              Disable
            </Button>
          ) : (
            <Button onClick={handleEnableDemo} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Enable
            </Button>
          )}
        </div>

        {/* Warning */}
        {config.enabled && (
          <div className="rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                  Demo mode is active
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  All data shown is sample data from {config.companyName}. Your real data is safely preserved.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Configuration */}
      <div className="rounded-xl border p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Demo Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Customize the demo experience
          </p>
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <Label htmlFor="company-name">Company Name for Demo</Label>
          <Input
            id="company-name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g., TechNova Inc."
          />
          <p className="text-xs text-muted-foreground">
            The fictitious company name shown in demo mode
          </p>
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label htmlFor="industry">Industry Preset</Label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">
            Sample data will be tailored to this industry
          </p>
        </div>

        {/* Data Density */}
        <div className="space-y-4">
          <Label>Data Density</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dataDensityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setDataDensity(option.value)}
                className={cn(
                  'rounded-xl border p-4 text-left transition-colors',
                  dataDensity === option.value
                    ? 'border-primary bg-primary/5'
                    : 'hover:bg-muted'
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-lg font-semibold">{option.label}</h4>
                  {dataDensity === option.value && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {option.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {option.items}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Apply Changes */}
        {config.enabled && (
          <div className="pt-4 border-t">
            <Button onClick={handleEnableDemo} className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Apply Changes
            </Button>
          </div>
        )}
      </div>

      {/* Guided Tour */}
      {config.enabled && (
        <div className="rounded-xl border p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Guided Tour</h3>
            <p className="text-sm text-muted-foreground">
              Start a step-by-step presentation tour
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={startTour} className="gap-2">
              <Play className="h-4 w-4" />
              Start Guided Tour
            </Button>
            <div className="text-sm text-muted-foreground">
              8 steps • ~5 minutes
            </div>
          </div>

          <div className="rounded-lg bg-muted/30 p-4 space-y-2">
            <h4 className="text-sm font-semibold">Tour includes:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Dashboard Overview</li>
              <li>• Brand Assets Management</li>
              <li>• Audience Personas</li>
              <li>• Research Hub</li>
              <li>• AI Content Generation</li>
              <li>• Campaign Management</li>
              <li>• Analytics & Insights</li>
              <li>• Platform Summary</li>
            </ul>
          </div>
        </div>
      )}

      {/* Demo Features */}
      <div className="rounded-xl border p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Demo Features</h3>
          <p className="text-sm text-muted-foreground">
            What's included in demo mode
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold mb-1">Pre-populated Data</h4>
              <p className="text-xs text-muted-foreground">
                Complete brand profile, personas, campaigns, and content
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold mb-1">Instant AI Results</h4>
              <p className="text-xs text-muted-foreground">
                Pre-cached responses for smooth demonstrations
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold mb-1">Investor Metrics</h4>
              <p className="text-xs text-muted-foreground">
                Special dashboard with ROI and performance data
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold mb-1">Quick Actions</h4>
              <p className="text-xs text-muted-foreground">
                Jump to any section, reset data, toggle metrics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* URL Access */}
      <div className="rounded-xl border p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">URL Access</h3>
          <p className="text-sm text-muted-foreground">
            Quick access links for demo mode
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-muted px-3 py-2 rounded-lg text-sm">
              app.brandshift.ai/demo
            </code>
            <Button size="sm" variant="outline">
              Copy
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-muted px-3 py-2 rounded-lg text-sm">
              app.brandshift.ai/?demo=true
            </code>
            <Button size="sm" variant="outline">
              Copy
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Share these links to enable demo mode automatically
        </p>
      </div>
    </div>
  );
}
