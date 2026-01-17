/**
 * COMPONENT: Risk Overview Panel
 * 
 * Top 3 risico's met:
 * - Oorzaak
 * - Impact
 * - Concrete fix
 * 
 * DOEL: Gebruiker begrijpt strategische risico's en hoe ze op te lossen.
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { AlertTriangle, ArrowRight } from 'lucide-react';

interface Risk {
  id: string;
  title: string;
  cause: string;
  impact: string;
  fix: string;
  severity: 'critical' | 'high' | 'medium';
}

interface RiskOverviewPanelProps {
  risks?: Risk[];
  onFixRisk?: (riskId: string) => void;
}

export function RiskOverviewPanel({ risks = [], onFixRisk }: RiskOverviewPanelProps) {
  
  // Top 3 risks
  const topRisks = risks.slice(0, 3);

  const severityConfig = {
    critical: {
      color: 'rgb(220, 38, 38)', // red-600
      textColor: 'text-red-600',
      label: 'Kritiek'
    },
    high: {
      color: 'rgb(217, 119, 6)', // amber-600
      textColor: 'text-amber-600',
      label: 'Hoog'
    },
    medium: {
      color: 'rgb(37, 99, 235)', // blue-600
      textColor: 'text-blue-600',
      label: 'Medium'
    }
  };

  if (topRisks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-green-600" />
            Risico Overzicht
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 mx-auto mb-3 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-green-600" />
            </div>
            <p className="font-medium mb-1">Geen Significante Risico's</p>
            <p className="text-sm text-muted-foreground">
              Alle merkdata voldoet aan validatie thresholds
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          Top {topRisks.length} Strategische Risico's
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Prioriteer deze risico's voor optimale besluitkwaliteit
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {topRisks.map((risk, index) => {
          const config = severityConfig[risk.severity];
          
          return (
            <div 
              key={risk.id}
              className="p-4 rounded-lg border-l-4 bg-card/50"
              style={{ borderLeftColor: config.color }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium mb-1">{risk.title}</h4>
                    <Badge variant="outline" className={`${config.textColor} border-current text-xs`}>
                      {config.label}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ml-10 mb-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Oorzaak</p>
                  <p className="text-sm">{risk.cause}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Impact</p>
                  <p className="text-sm">{risk.impact}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Fix</p>
                  <p className="text-sm">{risk.fix}</p>
                </div>
              </div>

              {/* Action */}
              {onFixRisk && (
                <div className="ml-10">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onFixRisk(risk.id)}
                    className="text-xs"
                  >
                    Los dit op
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          );
        })}

        {risks.length > 3 && (
          <p className="text-xs text-muted-foreground text-center pt-2">
            + {risks.length - 3} aanvullende risico's
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * MOTIVATIE:
 * 
 * 1. TOP 3 FOCUS
 *    - Niet alle risico's (overwhelm)
 *    - Alleen top 3 (actionable)
 *    - Geprioriteerd op severity
 * 
 * 2. STRUCTURED INFORMATIE
 *    - Oorzaak: waarom bestaat dit risico
 *    - Impact: wat is het gevolg
 *    - Fix: concrete oplossing
 *    - Consistent format
 * 
 * 3. SEVERITY LEVELS
 *    - Critical (rood): onmiddellijk adresseren
 *    - High (amber): hoogste prioriteit
 *    - Medium (blauw): belangrijk maar niet urgent
 * 
 * 4. ACTIONABLE
 *    - "Los dit op" button per risk
 *    - Direct navigatie naar fix
 *    - Niet alleen informatie maar ook actie
 * 
 * 5. POSITIVE FRAMING
 *    - Indien geen risico's: positieve boodschap
 *    - Niet "alles oké" maar "voldoet aan thresholds"
 *    - Groen visueel
 */