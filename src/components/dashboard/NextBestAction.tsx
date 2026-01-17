/**
 * COMPONENT: Next Best Action
 * 
 * Toont DE eerstvolgende beste actie (SINGLE).
 * Niet 2, niet 3, maar 1 actie die nu het belangrijkst is.
 * 
 * DOEL: In 1 seconde weten: "Wat moet ik NU doen?"
 */

import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Zap, ArrowRight, Target, Clock } from 'lucide-react';

interface NextBestActionProps {
  title: string;
  reason: string;
  unlocksDecision: string;
  riskReduction: string;
  estimatedTime: string;
  impact: 'critical' | 'high';
  onAction: () => void;
}

export function NextBestAction({
  title,
  reason,
  unlocksDecision,
  riskReduction,
  estimatedTime,
  impact,
  onAction
}: NextBestActionProps) {
  
  const impactConfig = {
    critical: {
      color: 'text-red-600',
      bgGradient: 'from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/10',
      borderColor: 'border-red-300',
      label: 'Kritieke Impact',
      icon: Zap
    },
    high: {
      color: 'text-amber-600',
      bgGradient: 'from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10',
      borderColor: 'border-amber-300',
      label: 'Hoge Impact',
      icon: Target
    }
  };

  const config = impactConfig[impact];
  const ImpactIcon = config.icon;

  return (
    <Card className={`border-2 ${config.borderColor} bg-gradient-to-br ${config.bgGradient}`}>
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <ImpactIcon className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold">Eerstvolgende Beste Actie</h2>
                  <Badge variant="outline" className={`${config.color} border-current`}>
                    {config.label}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground">
                  {reason}
                </p>
              </div>
            </div>
          </div>

          {/* Impact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Unlocks */}
            <div className="p-4 rounded-lg bg-white/80 dark:bg-background/40 border">
              <div className="flex items-start gap-2 mb-2">
                <Target className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-xs font-semibold text-muted-foreground">WAT WORDT MOGELIJK</p>
              </div>
              <p className="text-sm font-medium">{unlocksDecision}</p>
            </div>

            {/* Risk Reduction */}
            <div className="p-4 rounded-lg bg-white/80 dark:bg-background/40 border">
              <div className="flex items-start gap-2 mb-2">
                <ImpactIcon className={`h-4 w-4 ${config.color} mt-0.5 shrink-0`} />
                <p className="text-xs font-semibold text-muted-foreground">RISICO REDUCTIE</p>
              </div>
              <p className="text-sm font-medium">{riskReduction}</p>
            </div>
          </div>

          {/* Action */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Geschatte tijd: <span className="font-semibold">{estimatedTime}</span></span>
            </div>
            <Button size="lg" onClick={onAction} className="gap-2 shadow-md">
              Start Nu
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * DESIGN PRINCIPES:
 * 
 * 1. SINGLE ACTION
 *    - Niet 2, niet 3, maar 1
 *    - De belangrijkste actie van dit moment
 *    - Focus op executie
 * 
 * 2. PROMINENTE PRESENTATIE
 *    - Groot blok (p-8)
 *    - Gradient achtergrond
 *    - 16x16 icon (64px)
 *    - Grote "Start Nu" button
 * 
 * 3. WAT + WAAROM + IMPACT
 *    - Title: wat is de actie
 *    - Reason: waarom deze actie
 *    - Unlocks: wat wordt mogelijk
 *    - Risk reduction: waarom urgent
 * 
 * 4. ESTIMATED TIME
 *    - Commitment transparantie
 *    - "~2 uur" vs "~30 min"
 *    - Helpt planning
 * 
 * 5. VISUELE URGENTIE
 *    - Critical: rode accenten
 *    - High: amber accenten
 *    - Gradient background
 *    - Shadow op CTA button
 * 
 * 6. IN 1 SECONDE SCANBAAR
 *    - Grote icon + titel
 *    - "Start Nu" button opvallend
 *    - Clean layout
 */
