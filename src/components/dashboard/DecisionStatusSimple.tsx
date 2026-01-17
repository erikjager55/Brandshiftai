/**
 * COMPONENT: Decision Status Simple
 * 
 * Ultra-simpele status indicator voor Dashboard.
 * Toont alleen: Safe / Risk / Do Not Decide
 * Geen details, geen complexiteit.
 * 
 * DOEL: In 1 seconde weten: "Kan ik beslissen of niet?"
 */

import React from 'react';
import { Card, CardContent } from '../ui/card';
import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';

interface DecisionStatusSimpleProps {
  status: 'safe-to-decide' | 'decision-at-risk' | 'blocked';
  safeCount: number;
  atRiskCount: number;
  blockedCount: number;
}

export function DecisionStatusSimple({
  status,
  safeCount,
  atRiskCount,
  blockedCount
}: DecisionStatusSimpleProps) {
  
  const statusConfig = {
    'safe-to-decide': {
      icon: ShieldCheck,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200',
      title: 'Safe to Decide',
      description: 'Je merkdata is voldoende gevalideerd voor strategische beslissingen'
    },
    'decision-at-risk': {
      icon: ShieldAlert,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      borderColor: 'border-amber-200',
      title: 'Decision at Risk',
      description: 'Enkele items hebben beperkte validatie — beslissingen dragen verhoogd risico'
    },
    'blocked': {
      icon: ShieldX,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-red-200',
      title: 'Do Not Decide',
      description: 'Kritieke research ontbreekt — beslissingen zijn geblokkeerd'
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card className={`border-2 ${config.borderColor}`}>
      <CardContent className="p-8">
        <div className="flex items-center gap-6">
          {/* Icon */}
          <div className={`h-20 w-20 rounded-2xl ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
            <StatusIcon className={`h-10 w-10 ${config.iconColor}`} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{config.title}</h2>
            <p className="text-muted-foreground mb-4">
              {config.description}
            </p>

            {/* Simple counts */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-600"></div>
                <span className="text-sm">
                  <span className="font-semibold">{safeCount}</span> safe
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                <span className="text-sm">
                  <span className="font-semibold">{atRiskCount}</span> at risk
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-600"></div>
                <span className="text-sm">
                  <span className="font-semibold">{blockedCount}</span> blocked
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * DESIGN PRINCIPES:
 * 
 * 1. ULTRA SIMPEL
 *    - Geen grids, geen complexiteit
 *    - 1 groot blok met status
 *    - Icon + titel + beschrijving
 * 
 * 2. IN 1 SECONDE SCANBAAR
 *    - Grote icon (20x20 = 80px)
 *    - Grote titel (text-2xl)
 *    - Duidelijke kleuren
 * 
 * 3. COUNTS ONDERGESCHIKT
 *    - Kleine dots + cijfers
 *    - Inline, geen grid
 *    - Context, geen focus
 * 
 * 4. DECISION FRAMING
 *    - "Safe to Decide" (positief)
 *    - "Decision at Risk" (waarschuwing)
 *    - "Do Not Decide" (geblokkeerd)
 * 
 * 5. GEEN ACTIES
 *    - Alleen status
 *    - Acties komen in NextBestAction
 */
