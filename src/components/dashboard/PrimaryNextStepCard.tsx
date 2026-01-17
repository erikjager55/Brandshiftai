/**
 * COMPONENT: Primary Next Step Card
 * 
 * Toont de ENKELE actie met grootste risico-reductie impact.
 * Prominent, actionable, concrete.
 * 
 * DOEL: Gebruiker weet altijd wat de volgende juiste stap is.
 */

import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowRight, Target, TrendingUp } from 'lucide-react';

interface PrimaryNextStepCardProps {
  /** Actie beschrijving */
  action: string;
  
  /** Waarom deze actie */
  reason: string;
  
  /** Wat wordt ontgrendeld */
  unlocks: string;
  
  /** Risico reductie (percentage of beschrijving) */
  riskReduction: string;
  
  /** Callback */
  onAction: () => void;
  
  /** Optioneel: geschatte tijd */
  estimatedTime?: string;
}

export function PrimaryNextStepCard({
  action,
  reason,
  unlocks,
  riskReduction,
  onAction,
  estimatedTime
}: PrimaryNextStepCardProps) {
  
  return (
    <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Target className="h-6 w-6 text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <Badge className="mb-2 bg-primary/90">
                  Grootste Impact
                </Badge>
                <h3 className="font-semibold text-lg mb-1">
                  {action}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {reason}
                </p>
              </div>
              {estimatedTime && (
                <Badge variant="outline" className="shrink-0">
                  ~{estimatedTime}
                </Badge>
              )}
            </div>

            {/* Impact metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 mb-4">
              <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
                <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">Ontgrendelt</p>
                  <p className="text-sm">{unlocks}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
                <Target className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">Risico Reductie</p>
                  <p className="text-sm">{riskReduction}</p>
                </div>
              </div>
            </div>

            {/* Action button */}
            <Button 
              onClick={onAction}
              size="default"
              className="w-full sm:w-auto font-semibold"
            >
              Start Nu
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * MOTIVATIE:
 * 
 * 1. SINGULAR FOCUS
 *    - 1 actie (niet meerdere)
 *    - Grootste impact
 *    - Duidelijke prioriteit
 * 
 * 2. WHY + WHAT
 *    - Waarom deze actie (reason)
 *    - Wat wordt ontgrendeld (unlocks)
 *    - Risico reductie (concrete metric)
 * 
 * 3. ACTIONABLE
 *    - Prominent button
 *    - "Start Nu" (niet "Learn More")
 *    - Direct klikbaar
 * 
 * 4. VISUEEL PROMINENT
 *    - Gradient border
 *    - Primary kleuren
 *    - "Grootste Impact" badge
 * 
 * 5. TIJD TRANSPARANTIE
 *    - Geschatte tijd indien bekend
 *    - Helpt commitment
 */
