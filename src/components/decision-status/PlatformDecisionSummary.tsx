/**
 * COMPONENT: Platform Decision Summary
 * 
 * Decision summary die bovenaan ELKE pagina komt.
 * Toont overall decision status, belangrijkste oorzaken, primaire actie.
 * 
 * DOEL: Gebruiker weet ALTIJD:
 * 1. Of beslissingen veilig zijn
 * 2. Waarom niet
 * 3. Wat eerst moet gebeuren
 */

import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight, AlertCircle } from 'lucide-react';

interface PlatformDecisionSummaryProps {
  /** Pagina-specifieke context */
  context: 'dashboard' | 'research-hub' | 'asset-detail' | 'persona-detail' | 'campaign-output' | 'relationships';
  
  /** Overall decision status */
  status: 'safe-to-decide' | 'decision-at-risk' | 'do-not-decide';
  
  /** 1-2 belangrijkste oorzaken (max 2 voor helderheid) */
  topCauses: string[];
  
  /** Primaire actie om status te verbeteren */
  primaryAction: string;
  
  /** Callback voor primaire actie */
  onPrimaryAction?: () => void;
  
  /** Optional: secondary action */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  
  /** Optional: extra context text */
  contextText?: string;
}

export function PlatformDecisionSummary({
  context,
  status,
  topCauses,
  primaryAction,
  onPrimaryAction,
  secondaryAction,
  contextText
}: PlatformDecisionSummaryProps) {
  
  // Status configuratie - consistent met campaign header
  const statusConfig = {
    'safe-to-decide': {
      icon: CheckCircle2,
      label: 'Safe to Decide',
      bgColor: 'bg-green-50/70 dark:bg-green-950/10',
      borderColor: 'border-l-green-600',
      iconColor: 'text-green-600',
      badgeColor: 'bg-green-600/90'
    },
    'decision-at-risk': {
      icon: AlertTriangle,
      label: 'Decision at Risk',
      bgColor: 'bg-amber-50/70 dark:bg-amber-950/10',
      borderColor: 'border-l-amber-600',
      iconColor: 'text-amber-600',
      badgeColor: 'bg-amber-600/90'
    },
    'do-not-decide': {
      icon: ShieldAlert,
      label: 'Do Not Decide',
      bgColor: 'bg-slate-50 dark:bg-slate-950/20',
      borderColor: 'border-l-red-600',
      iconColor: 'text-red-600',
      badgeColor: 'bg-red-600/90'
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  // Context-specifieke labels
  const contextLabels = {
    'dashboard': 'Platform Overview',
    'research-hub': 'Research Validation',
    'asset-detail': 'Asset Decision Quality',
    'persona-detail': 'Persona Decision Quality',
    'campaign-output': 'Campaign Decision Quality',
    'relationships': 'Insight Reliability'
  };

  // Safe state - compact weergave
  if (status === 'safe-to-decide') {
    return (
      <Card className={`border-l-4 ${config.borderColor} ${config.bgColor} mb-6`}>
        <CardContent className="py-3 px-4">
          <div className="flex items-center gap-3">
            <StatusIcon className={`h-5 w-5 ${config.iconColor}`} />
            <Badge className={`${config.badgeColor} text-white text-xs`}>
              {config.label}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {contextText || 'Alle data is voldoende gevalideerd voor strategische beslissingen.'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Risk/Blocked state - full weergave
  return (
    <Card className={`border-l-4 ${config.borderColor} ${config.bgColor} mb-6`}>
      <CardContent className="py-3 px-4">
        <div className="flex items-start gap-4">
          {/* Left: Status + Oorzaken */}
          <div className="flex-1 min-w-0">
            {/* Status header */}
            <div className="flex items-center gap-2 mb-2">
              <StatusIcon className={`h-5 w-5 ${config.iconColor} flex-shrink-0`} />
              <Badge className={`${config.badgeColor} text-white text-xs`}>
                {config.label}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {contextLabels[context]}
              </span>
            </div>

            {/* Top 1-2 oorzaken */}
            {topCauses.length > 0 && (
              <div className="space-y-1.5 ml-7">
                {topCauses.map((cause, i) => (
                  <div 
                    key={i} 
                    className="flex items-baseline gap-2 text-sm"
                  >
                    <AlertCircle className="h-3.5 w-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{cause}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Context text */}
            {contextText && (
              <p className="text-xs text-muted-foreground ml-7 mt-2">
                {contextText}
              </p>
            )}
          </div>

          {/* Right: Acties */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            {/* Primaire actie */}
            <Button 
              onClick={onPrimaryAction}
              size="sm"
              className="font-semibold shadow-sm"
            >
              {primaryAction}
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>

            {/* Secundaire actie (optioneel) */}
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors text-center"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * MOTIVATIE:
 * 
 * 1. UBIQUITEIT
 *    - Elke pagina toont decision status
 *    - Gebruiker weet ALTIJD waar ze staan
 *    - Consistent gedrag door hele platform
 * 
 * 2. COMPACTHEID
 *    - Safe = 1 regel (py-3, geen ruimte verspillen)
 *    - Risk/Blocked = expanded (vraagt aandacht)
 *    - Visuele hiërarchie: probleem = prominent
 * 
 * 3. CONTEXT-AWARE
 *    - Dashboard: "Platform Overview"
 *    - Asset Detail: "Asset Decision Quality"
 *    - Etc. - gebruiker weet welke scope
 * 
 * 4. TOP 1-2 OORZAKEN
 *    - Niet alle oorzaken (cognitive overload)
 *    - Alleen belangrijkste (actionable)
 *    - Max 2 bullets = scanbaar
 * 
 * 5. PRIMAIRE ACTIE
 *    - Altijd 1 concrete next step
 *    - Size="sm" (kleiner dan campaign header)
 *    - Maar nog steeds visueel dominant
 * 
 * 6. SECUNDAIRE ACTIE (optioneel)
 *    - Bijv. "Bekijk alle risico's"
 *    - Tekstlink (minder prominent)
 *    - Alleen indien relevant voor pagina
 */