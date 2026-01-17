/**
 * COMPONENT: Decision Cockpit
 * 
 * Centrale decision overview voor Dashboard.
 * 3 kolommen: Safe / At Risk / Do Not Decide
 * Max 3 items per kolom (focus, geen overwhelm)
 * 
 * DOEL: Gebruiker ziet in 1 oogopslag:
 * - Welke beslissingen veilig zijn
 * - Welke risico dragen
 * - Welke geblokkeerd zijn
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, AlertTriangle, ShieldAlert, ArrowRight } from 'lucide-react';

interface DecisionItem {
  id: string;
  name: string;
  type: 'asset' | 'persona' | 'research' | 'strategy';
  coverage: number;
  reason?: string; // Waarom safe/risk/blocked
}

interface DecisionCockpitProps {
  safeItems?: DecisionItem[];
  atRiskItems?: DecisionItem[];
  blockedItems?: DecisionItem[];
  onItemClick?: (itemId: string, itemType: string) => void;
}

export function DecisionCockpit({
  safeItems = [],
  atRiskItems = [],
  blockedItems = [],
  onItemClick
}: DecisionCockpitProps) {
  
  // Max 3 items per kolom
  const safeDisplay = safeItems.slice(0, 3);
  const riskDisplay = atRiskItems.slice(0, 3);
  const blockedDisplay = blockedItems.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* SAFE TO DECIDE */}
      <Card className="border-l-4 border-l-green-600">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Safe to Decide
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Voldoende gevalideerd voor strategische beslissingen
          </p>
        </CardHeader>
        <CardContent className="space-y-2">
          {safeDisplay.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              Geen items voldoen aan minimum validatie (80%+)
            </p>
          ) : (
            <>
              {safeDisplay.map(item => (
                <button
                  key={item.id}
                  onClick={() => onItemClick?.(item.id, item.type)}
                  className="w-full text-left p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 shrink-0">
                      {item.coverage}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.reason || 'Top research methods compleet'}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    Bekijk details
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </button>
              ))}
              {safeItems.length > 3 && (
                <p className="text-xs text-muted-foreground text-center pt-2">
                  + {safeItems.length - 3} meer veilige items
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* DECISION AT RISK */}
      <Card className="border-l-4 border-l-amber-600">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            Decision at Risk
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Bruikbaar maar met verhoogd strategisch risico
          </p>
        </CardHeader>
        <CardContent className="space-y-2">
          {riskDisplay.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              Geen items in risico zone (50-79%)
            </p>
          ) : (
            <>
              {riskDisplay.map(item => (
                <button
                  key={item.id}
                  onClick={() => onItemClick?.(item.id, item.type)}
                  className="w-full text-left p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200 shrink-0">
                      {item.coverage}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.reason || 'Beperkte research validatie'}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Verbeter nu
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </button>
              ))}
              {atRiskItems.length > 3 && (
                <p className="text-xs text-muted-foreground text-center pt-2">
                  + {atRiskItems.length - 3} meer risico items
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* DO NOT DECIDE */}
      <Card className="border-l-4 border-l-red-600">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldAlert className="h-5 w-5 text-red-600" />
            Do Not Decide
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Onvoldoende validatie voor strategische beslissingen
          </p>
        </CardHeader>
        <CardContent className="space-y-2">
          {blockedDisplay.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              Alle items voldoen aan minimum threshold
            </p>
          ) : (
            <>
              {blockedDisplay.map(item => (
                <button
                  key={item.id}
                  onClick={() => onItemClick?.(item.id, item.type)}
                  className="w-full text-left p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200 shrink-0">
                      {item.coverage}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.reason || 'Kritieke research ontbreekt'}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Valideer nu
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </button>
              ))}
              {blockedItems.length > 3 && (
                <p className="text-xs text-muted-foreground text-center pt-2">
                  + {blockedItems.length - 3} meer geblokkeerde items
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * MOTIVATIE:
 * 
 * 1. DECISION-FIRST
 *    - Niet "voortgang" maar "wat kan ik beslissen"
 *    - 3 categorieën: safe, risk, blocked
 *    - In 1 oogopslag overzicht
 * 
 * 2. MAX 3 ITEMS
 *    - Focus, geen overwhelm
 *    - Belangrijkste items bovenaan
 *    - + X meer indien nodig
 * 
 * 3. ACTIONABLE
 *    - Click → ga naar item
 *    - Hover: "Verbeter nu", "Valideer nu"
 *    - Concrete acties, niet abstract
 * 
 * 4. REASON WHY
 *    - Niet alleen percentage
 *    - Ook waarom safe/risk/blocked
 *    - "Top research methods compleet" vs "Kritieke research ontbreekt"
 * 
 * 5. VISUELE HIËRARCHIE
 *    - Groen/Amber/Rood border
 *    - Badges met matching kleuren
 *    - Hover states voor interactie
 */