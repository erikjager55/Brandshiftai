/**
 * COMPONENT: Research Decision Summary
 * 
 * Toont bovenaan Research Hub:
 * - Huidige decision status van het merk
 * - Belangrijkste blokkades
 * - Belangrijkste unlocks bij afronding van lopend onderzoek
 * 
 * DOEL: Gebruiker begrijpt impact van research op besluitkwaliteit
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ShieldCheck, ShieldAlert, TrendingUp, Unlock } from 'lucide-react';

interface ResearchDecisionSummaryProps {
  /** Huidige overall decision status */
  currentStatus: 'safe-to-decide' | 'decision-at-risk' | 'blocked';
  
  /** Aantal safe/risk/blocked items */
  safeCount: number;
  atRiskCount: number;
  blockedCount: number;
  
  /** Top 2 blokkades */
  topBlockers: string[];
  
  /** Top 2 unlocks (wat safe wordt na afronding) */
  topUnlocks: string[];
  
  /** Aantal active research items */
  activeResearchCount: number;
}

export function ResearchDecisionSummary({
  currentStatus,
  safeCount,
  atRiskCount,
  blockedCount,
  topBlockers,
  topUnlocks,
  activeResearchCount
}: ResearchDecisionSummaryProps) {
  
  const statusConfig = {
    'safe-to-decide': {
      icon: ShieldCheck,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200',
      label: 'Merk Beslisklaar',
      description: 'Voldoende validatie voor strategische beslissingen'
    },
    'decision-at-risk': {
      icon: ShieldAlert,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      borderColor: 'border-amber-200',
      label: 'Verhoogd Risico',
      description: 'Enkele items hebben beperkte validatie'
    },
    'blocked': {
      icon: ShieldAlert,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-red-200',
      label: 'Beslissingen Geblokkeerd',
      description: 'Kritieke research ontbreekt voor strategische beslissingen'
    }
  };

  const config = statusConfig[currentStatus];
  const StatusIcon = config.icon;

  return (
    <Card className={`border-2 ${config.borderColor}`}>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className={`h-12 w-12 rounded-xl ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
            <StatusIcon className={`h-6 w-6 ${config.iconColor}`} />
          </div>
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 mb-1">
              {config.label}
              {activeResearchCount > 0 && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {activeResearchCount} actief
                </Badge>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {config.description}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Status Distribution */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200">
            <div className="text-2xl font-bold text-green-700">{safeCount}</div>
            <div className="text-xs text-green-600 mt-1">Safe to Decide</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200">
            <div className="text-2xl font-bold text-amber-700">{atRiskCount}</div>
            <div className="text-xs text-amber-600 mt-1">At Risk</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200">
            <div className="text-2xl font-bold text-red-700">{blockedCount}</div>
            <div className="text-xs text-red-600 mt-1">Blocked</div>
          </div>
        </div>

        {/* Blockers & Unlocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top Blockers */}
          {topBlockers.length > 0 && (
            <div className="p-3 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="h-4 w-4 text-red-600" />
                <h4 className="text-sm font-semibold">Belangrijkste Blokkades</h4>
              </div>
              <ul className="space-y-1">
                {topBlockers.slice(0, 2).map((blocker, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-red-600 shrink-0">•</span>
                    <span>{blocker}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Top Unlocks */}
          {topUnlocks.length > 0 && (
            <div className="p-3 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <h4 className="text-sm font-semibold">Will Be Unlocked</h4>
              </div>
              <ul className="space-y-1">
                {topUnlocks.slice(0, 2).map((unlock, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-600 shrink-0">•</span>
                    <span>{unlock}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* No blockers/unlocks message */}
        {topBlockers.length === 0 && topUnlocks.length === 0 && (
          <div className="text-center py-4">
            <Unlock className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Alle merkdata voldoet aan minimum thresholds
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
 * 1. DECISION CONTEXT
 *    - Niet "X research actief" maar "X beslissingen geblokkeerd"
 *    - Status framing: safe/risk/blocked
 *    - Impact-first
 * 
 * 2. BLOKKADES + UNLOCKS
 *    - Wat houdt beslissingen tegen (blokkades)
 *    - Wat wordt mogelijk na afronding (unlocks)
 *    - Motivatie voor research
 * 
 * 3. VISUELE DISTRIBUTIE
 *    - 3 kolommen: safe/risk/blocked counts
 *    - In 1 oogopslag overzicht
 *    - Kleuren matching decision status
 * 
 * 4. ACTIVE RESEARCH BADGE
 *    - Toont aantal lopende onderzoeken
 *    - Context voor "progress"
 *    - Niet prominent maar wel zichtbaar
 * 
 * 5. POSITIVE FRAMING
 *    - Indien geen blokkades: positieve boodschap
 *    - "Voldoet aan thresholds" (niet "alles ok")
 */