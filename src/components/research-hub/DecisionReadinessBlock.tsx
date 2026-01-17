/**
 * COMPONENT: Decision Readiness Block
 * 
 * HOOFDBLOK van Research Hub.
 * Toont de drie decision statussen prominent:
 * - Safe to Decide (≥80% coverage)
 * - Decision at Risk (50-79% coverage)
 * - Do Not Decide (<50% coverage)
 * 
 * Per geblokkeerd item: directe "Start Research" CTA
 * 
 * DOEL: Gebruiker ziet in 1 oogopslag welke beslissingen veilig zijn
 */

import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ShieldCheck, ShieldAlert, ShieldX, Zap, ArrowRight } from 'lucide-react';

interface DecisionItem {
  id: string;
  name: string;
  type: 'asset' | 'persona';
  coverage: number;
  missingTopMethod?: string;
}

interface DecisionReadinessBlockProps {
  safeItems: DecisionItem[];
  atRiskItems: DecisionItem[];
  blockedItems: DecisionItem[];
  onStartResearch?: (itemId: string, itemType: 'asset' | 'persona') => void;
  onViewItem?: (itemId: string, itemType: 'asset' | 'persona') => void;
}

export function DecisionReadinessBlock({
  safeItems,
  atRiskItems,
  blockedItems,
  onStartResearch,
  onViewItem
}: DecisionReadinessBlockProps) {
  
  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Decision Readiness</h2>
        <p className="text-muted-foreground">
          Real-time validatie status van al je merkdata
        </p>
      </div>

      {/* 3 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SAFE TO DECIDE */}
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-950/10">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                  Safe to Decide
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  ≥80% coverage
                </p>
              </div>
              <Badge className="bg-green-600 text-white text-lg px-3 py-1">
                {safeItems.length}
              </Badge>
            </div>

            {/* Items */}
            <div className="space-y-2">
              {safeItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-white dark:bg-green-950/20 border border-green-200 cursor-pointer hover:border-green-300 transition-colors"
                  onClick={() => onViewItem?.(item.id, item.type)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.coverage}% validated</p>
                    </div>
                    <ShieldCheck className="h-4 w-4 text-green-600 shrink-0 ml-2" />
                  </div>
                </div>
              ))}
              
              {safeItems.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">
                    Geen items met ≥80% coverage
                  </p>
                </div>
              )}
              
              {safeItems.length > 3 && (
                <p className="text-xs text-muted-foreground text-center pt-2">
                  +{safeItems.length - 3} meer
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* DECISION AT RISK */}
        <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-950/10">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="h-6 w-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                  Decision at Risk
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  50–79% coverage
                </p>
              </div>
              <Badge className="bg-amber-600 text-white text-lg px-3 py-1">
                {atRiskItems.length}
              </Badge>
            </div>

            {/* Items */}
            <div className="space-y-2">
              {atRiskItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-white dark:bg-amber-950/20 border border-amber-200 cursor-pointer hover:border-amber-300 transition-colors"
                  onClick={() => onViewItem?.(item.id, item.type)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.coverage}% validated</p>
                    </div>
                    <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 ml-2" />
                  </div>
                  {item.missingTopMethod && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs h-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartResearch?.(item.id, item.type);
                      }}
                    >
                      Add {item.missingTopMethod}
                    </Button>
                  )}
                </div>
              ))}
              
              {atRiskItems.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">
                    Geen items met 50-79% coverage
                  </p>
                </div>
              )}
              
              {atRiskItems.length > 3 && (
                <p className="text-xs text-muted-foreground text-center pt-2">
                  +{atRiskItems.length - 3} meer
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* DO NOT DECIDE */}
        <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50/50 to-transparent dark:from-red-950/10">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <ShieldX className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                  Do Not Decide
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  &lt;50% coverage
                </p>
              </div>
              <Badge className="bg-red-600 text-white text-lg px-3 py-1">
                {blockedItems.length}
              </Badge>
            </div>

            {/* Items */}
            <div className="space-y-2">
              {blockedItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-white dark:bg-red-950/20 border border-red-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.coverage}% validated</p>
                    </div>
                    <ShieldX className="h-4 w-4 text-red-600 shrink-0 ml-2" />
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-xs h-8 gap-1"
                    onClick={() => onStartResearch?.(item.id, item.type)}
                  >
                    <Zap className="h-3 w-3" />
                    Start Highest Value Research
                  </Button>
                </div>
              ))}
              
              {blockedItems.length === 0 && (
                <div className="text-center py-6">
                  <ShieldCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-700">Geen geblokkeerde items</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Alle items ≥50% validated
                  </p>
                </div>
              )}
              
              {blockedItems.length > 3 && (
                <p className="text-xs text-muted-foreground text-center pt-2">
                  +{blockedItems.length - 3} meer geblokkeerd
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * DESIGN PRINCIPES:
 * 
 * 1. VISUELE RUST
 *    - 3 kolommen, clean layout
 *    - Geen overload aan informatie
 *    - Whitespace tussen items
 * 
 * 2. DECISION FRAMING
 *    - "Safe to Decide" (niet "Good")
 *    - "Decision at Risk" (niet "Needs work")
 *    - "Do Not Decide" (niet "Bad")
 * 
 * 3. DIRECTE ACTIES
 *    - Per blocked item: "Start Highest Value Research" CTA
 *    - Per at-risk item: "Add [Method]" (indien missing top method)
 *    - Geen indirecte navigatie
 * 
 * 4. BADGES PROMINENT
 *    - Grote count badges (18px)
 *    - Direct zichtbaar hoeveel items per status
 *    - Kleuren matching status
 * 
 * 5. MAX 3 ITEMS
 *    - Focus op top 3 per kolom
 *    - "+" indicator voor meer
 *    - Voorkomt overwhelm
 * 
 * 6. POSITIVE EMPTY STATE
 *    - Bij 0 blocked: positieve boodschap
 *    - Groen check icon
 *    - "Geen geblokkeerde items"
 */
