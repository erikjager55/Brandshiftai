/**
 * COMPONENT: Assumptions Register Preview
 * 
 * Toont belangrijkste aannames, hun status en risico.
 * Preview voor volledig assumptions register.
 * 
 * DOEL: Gebruiker ziet welke aannames gevalideerd zijn en welke niet
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { FileQuestion, CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';

interface Assumption {
  id: string;
  statement: string;
  category: 'brand' | 'persona' | 'market';
  status: 'validated' | 'risky' | 'invalidated' | 'untested';
  risk: 'critical' | 'high' | 'medium' | 'low';
  validationMethod?: string;
}

interface AssumptionsRegisterPreviewProps {
  assumptions: Assumption[];
  onViewAll?: () => void;
}

export function AssumptionsRegisterPreview({ 
  assumptions, 
  onViewAll 
}: AssumptionsRegisterPreviewProps) {
  
  // Show top 4 assumptions (highest risk first)
  const riskOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const topAssumptions = assumptions
    .sort((a, b) => {
      // Sort by status priority, then by risk
      const statusPriority = {
        'invalidated': 0,
        'risky': 1,
        'untested': 2,
        'validated': 3
      };
      const statusDiff = statusPriority[a.status] - statusPriority[b.status];
      if (statusDiff !== 0) return statusDiff;
      return riskOrder[a.risk] - riskOrder[b.risk];
    })
    .slice(0, 4);

  const statusConfig = {
    validated: {
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      label: 'Gevalideerd'
    },
    risky: {
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      label: 'Risicovol'
    },
    invalidated: {
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      label: 'Weerlegd'
    },
    untested: {
      icon: FileQuestion,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50 dark:bg-gray-950/20',
      label: 'Ongetest'
    }
  };

  const riskConfig = {
    critical: { label: 'Kritiek', color: 'text-red-600' },
    high: { label: 'Hoog', color: 'text-amber-600' },
    medium: { label: 'Medium', color: 'text-blue-600' },
    low: { label: 'Laag', color: 'text-gray-600' }
  };

  const categoryConfig = {
    brand: { label: 'Brand', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30' },
    persona: { label: 'Persona', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30' },
    market: { label: 'Market', color: 'bg-green-100 text-green-700 dark:bg-green-900/30' }
  };

  // Stats
  const stats = {
    validated: assumptions.filter(a => a.status === 'validated').length,
    risky: assumptions.filter(a => a.status === 'risky').length,
    invalidated: assumptions.filter(a => a.status === 'invalidated').length,
    untested: assumptions.filter(a => a.status === 'untested').length
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <FileQuestion className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-base">Assumptions Register</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Belangrijkste aannames en validatie status
              </p>
            </div>
          </div>
          {onViewAll && (
            <Button variant="ghost" size="sm" onClick={onViewAll}>
              Bekijk Alles
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center p-2 rounded-md bg-green-50 dark:bg-green-950/20 border border-green-200">
            <div className="text-lg font-bold text-green-700">{stats.validated}</div>
            <div className="text-xs text-green-600">Gevalideerd</div>
          </div>
          <div className="text-center p-2 rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200">
            <div className="text-lg font-bold text-amber-700">{stats.risky}</div>
            <div className="text-xs text-amber-600">Risicovol</div>
          </div>
          <div className="text-center p-2 rounded-md bg-red-50 dark:bg-red-950/20 border border-red-200">
            <div className="text-lg font-bold text-red-700">{stats.invalidated}</div>
            <div className="text-xs text-red-600">Weerlegd</div>
          </div>
          <div className="text-center p-2 rounded-md bg-gray-50 dark:bg-gray-950/20 border border-gray-200">
            <div className="text-lg font-bold text-gray-700">{stats.untested}</div>
            <div className="text-xs text-gray-600">Ongetest</div>
          </div>
        </div>

        {/* Top Assumptions */}
        <div className="space-y-2">
          {topAssumptions.map((assumption) => {
            const statusCfg = statusConfig[assumption.status];
            const riskCfg = riskConfig[assumption.risk];
            const categoryCfg = categoryConfig[assumption.category];
            const StatusIcon = statusCfg.icon;

            return (
              <div
                key={assumption.id}
                className={`p-3 rounded-lg border ${statusCfg.bgColor}`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <StatusIcon className={`h-4 w-4 ${statusCfg.color} mt-0.5 shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium mb-1">{assumption.statement}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={`text-xs ${categoryCfg.color} border-transparent`}>
                        {categoryCfg.label}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${statusCfg.color} border-current`}>
                        {statusCfg.label}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${riskCfg.color} border-current`}>
                        {riskCfg.label}
                      </Badge>
                    </div>
                    {assumption.validationMethod && (
                      <p className="text-xs text-muted-foreground mt-1">
                        via {assumption.validationMethod}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {assumptions.length > 4 && (
          <p className="text-xs text-muted-foreground text-center">
            + {assumptions.length - 4} meer aannames
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * MOTIVATIE:
 * 
 * 1. ASSUMPTION VISIBILITY
 *    - Expliciete aannames zichtbaar maken
 *    - Status per aanname (validated/risky/invalidated/untested)
 *    - Risico level per aanname
 * 
 * 2. PRIORITIZATION
 *    - Toon top 4 (hoogste risico eerst)
 *    - Invalidated > Risky > Untested > Validated
 *    - Focus op wat aandacht nodig heeft
 * 
 * 3. STATS OVERVIEW
 *    - 4 kolommen: validated/risky/invalidated/untested
 *    - Quick scan mogelijk
 *    - Kleuren matching status
 * 
 * 4. METADATA
 *    - Category (brand/persona/market)
 *    - Risk level (critical/high/medium/low)
 *    - Validation method (indien gevalideerd)
 * 
 * 5. ACTIONABLE
 *    - "Bekijk Alles" button
 *    - Link naar volledige register
 *    - Preview functie
 */