/**
 * COMPONENT: Impact Prioritized Actions
 * 
 * Vervangt generieke recommendations met impact-based acties.
 * Elke actie toont:
 * - Waarom deze actie belangrijk is
 * - Welke beslissing hij ontgrendelt
 * - Hoeveel risico hij reduceert
 * 
 * DOEL: Acties zijn geprioriteerd op business impact, niet op taak type
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Target, TrendingUp, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

interface PrioritizedAction {
  id: string;
  title: string;
  reason: string;
  unlocksDecision: string;
  riskReduction: string;
  impact: 'critical' | 'high' | 'medium';
  estimatedTime: string;
  targetType: 'asset' | 'persona' | 'research';
  onAction?: () => void;
}

interface ImpactPrioritizedActionsProps {
  actions: PrioritizedAction[];
  maxActions?: number;
}

export function ImpactPrioritizedActions({ 
  actions, 
  maxActions = 3 
}: ImpactPrioritizedActionsProps) {
  
  // Sort by impact and show top N
  const impactOrder = { critical: 0, high: 1, medium: 2 };
  const topActions = actions
    .sort((a, b) => impactOrder[a.impact] - impactOrder[b.impact])
    .slice(0, maxActions);

  const impactConfig = {
    critical: {
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-red-200',
      label: 'Kritieke Impact',
      icon: ShieldCheck
    },
    high: {
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      borderColor: 'border-amber-200',
      label: 'Hoge Impact',
      icon: TrendingUp
    },
    medium: {
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200',
      label: 'Medium Impact',
      icon: Target
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-base">Aanbevolen Acties</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Geprioriteerd op risicoreductie en besluitimpact
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {topActions.map((action, index) => {
          const config = impactConfig[action.impact];
          const ImpactIcon = config.icon;

          return (
            <div
              key={action.id}
              className={`p-4 rounded-lg border-l-4 ${config.borderColor} bg-card hover:shadow-md transition-shadow`}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold">{action.title}</h4>
                    <Badge variant="outline" className={`${config.color} border-current text-xs shrink-0`}>
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {action.reason}
                  </p>
                </div>
              </div>

              {/* Impact metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 ml-11">
                <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
                  <Target className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">Ontgrendelt</p>
                    <p className="text-sm">{action.unlocksDecision}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
                  <ImpactIcon className={`h-4 w-4 ${config.color} mt-0.5 shrink-0`} />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">Risico Reductie</p>
                    <p className="text-sm">{action.riskReduction}</p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between ml-11">
                <Badge variant="outline" className="text-xs">
                  ~{action.estimatedTime}
                </Badge>
                {action.onAction && (
                  <Button size="sm" onClick={action.onAction}>
                    Start Nu
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}

        {actions.length > maxActions && (
          <p className="text-xs text-muted-foreground text-center pt-2">
            + {actions.length - maxActions} aanvullende acties
          </p>
        )}

        {topActions.length === 0 && (
          <div className="text-center py-6">
            <ShieldCheck className="h-10 w-10 text-green-600 mx-auto mb-2" />
            <p className="font-medium mb-1">Alle Prioriteiten Afgerond</p>
            <p className="text-sm text-muted-foreground">
              Je merkdata voldoet aan alle decision thresholds
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * MOTIVATIE:
 * 
 * 1. IMPACT-BASED PRIORITIZATION
 *    - Niet "suggested" maar "prioritized"
 *    - Critical > High > Medium
 *    - Business impact, niet taak type
 * 
 * 2. WHY + WHAT
 *    - Reason: waarom deze actie
 *    - Unlocks: welke beslissing wordt mogelijk
 *    - Risk reduction: hoeveel risico wordt verkleind
 * 
 * 3. ESTIMATED TIME
 *    - Commitment transparantie
 *    - "~2 uur" vs "~30 min"
 *    - Helpt planning
 * 
 * 4. NUMBERED LIST
 *    - Duidelijke prioriteit (1, 2, 3)
 *    - Top 3 (focus, geen overwhelm)
 *    - Visuele hiërarchie
 * 
 * 5. ACTIONABLE
 *    - "Start Nu" button per actie
 *    - Direct klikbaar
 *    - Callback naar juiste pagina
 * 
 * 6. POSITIVE EMPTY STATE
 *    - Indien geen acties: positieve boodschap
 *    - "Alle prioriteiten afgerond"
 *    - Groen check icon
 */
