/**
 * COMPONENT: Research Impact Indicator
 * 
 * Toont voor elke research activiteit:
 * - Welke beslissing hiermee veiliger wordt
 * - Welk risico hiermee wordt verkleind
 * - Impact op decision coverage
 * 
 * GEBRUIKT IN:
 * - Research Hub (bij research methods)
 * - Asset Detail (bij "add research" buttons)
 * - Persona Detail (bij "add research" buttons)
 */

import React from 'react';
import { Badge } from '../ui/badge';
import { TrendingUp, Shield, Target, AlertTriangle } from 'lucide-react';

interface ResearchImpactIndicatorProps {
  /** Research method naam */
  methodName: string;
  
  /** Wat wordt veiliger (asset/persona naam) */
  affectsItem: string;
  
  /** Current coverage percentage */
  currentCoverage: number;
  
  /** Expected coverage na deze research */
  expectedCoverage: number;
  
  /** Welk risico wordt verkleind */
  risksReduced?: string[];
  
  /** Compact mode (alleen impact percentage) */
  compact?: boolean;
}

export function ResearchImpactIndicator({
  methodName,
  affectsItem,
  currentCoverage,
  expectedCoverage,
  risksReduced = [],
  compact = false
}: ResearchImpactIndicatorProps) {
  
  const coverageGain = expectedCoverage - currentCoverage;
  const crossesThreshold = 
    (currentCoverage < 50 && expectedCoverage >= 50) || 
    (currentCoverage < 80 && expectedCoverage >= 80);

  // Determine impact level
  let impactLevel: 'critical' | 'high' | 'medium' | 'low';
  let impactColor: string;
  let impactIcon: typeof Shield;

  if (currentCoverage < 50 && expectedCoverage >= 50) {
    impactLevel = 'critical';
    impactColor = 'text-green-600';
    impactIcon = Shield;
  } else if (currentCoverage < 80 && expectedCoverage >= 80) {
    impactLevel = 'high';
    impactColor = 'text-blue-600';
    impactIcon = TrendingUp;
  } else if (coverageGain >= 10) {
    impactLevel = 'medium';
    impactColor = 'text-amber-600';
    impactIcon = Target;
  } else {
    impactLevel = 'low';
    impactColor = 'text-muted-foreground';
    impactIcon = AlertTriangle;
  }

  const ImpactIcon = impactIcon;

  // Compact mode - alleen badge met percentage
  if (compact) {
    return (
      <Badge 
        variant="outline" 
        className={`gap-1 ${impactColor} border-current`}
      >
        <ImpactIcon className="h-3 w-3" />
        +{coverageGain}%
        {crossesThreshold && ' ⭐'}
      </Badge>
    );
  }

  // Full mode - met details
  return (
    <div className="flex items-start gap-2 p-2 rounded-md bg-muted/30 border border-muted">
      <ImpactIcon className={`h-4 w-4 mt-0.5 ${impactColor} flex-shrink-0`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <p className="text-xs font-medium">
            Verbetert {affectsItem}
          </p>
          <Badge variant="outline" className={`text-xs ${impactColor} border-current`}>
            {currentCoverage}% → {expectedCoverage}%
          </Badge>
        </div>
        
        {/* Status transition */}
        {crossesThreshold && (
          <p className="text-xs text-muted-foreground mb-1">
            {currentCoverage < 50 && expectedCoverage >= 50 && (
              <span className="text-green-600 font-medium">
                ⭐ Bereikt minimum threshold (50%) - beslissing wordt veilig
              </span>
            )}
            {currentCoverage < 80 && expectedCoverage >= 80 && currentCoverage >= 50 && (
              <span className="text-blue-600 font-medium">
                ⭐ Bereikt optimum threshold (80%) - maximale betrouwbaarheid
              </span>
            )}
          </p>
        )}
        
        {/* Risks reduced */}
        {risksReduced.length > 0 && (
          <div className="mt-1">
            <p className="text-xs text-muted-foreground">Verkleint risico:</p>
            <ul className="text-xs text-muted-foreground ml-3 mt-0.5">
              {risksReduced.slice(0, 2).map((risk, i) => (
                <li key={i} className="list-disc">{risk}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * MOTIVATIE:
 * 
 * 1. RESEARCH → DECISION KOPPELING
 *    - Elke research activiteit toont impact op besluitkwaliteit
 *    - Niet "doe research" maar "dit verbetert X van Y% naar Z%"
 *    - Concrete, meetbare impact
 * 
 * 2. THRESHOLD AWARENESS
 *    - ⭐ indien 50% of 80% wordt bereikt
 *    - Gebruiker ziet wanneer status verandert (blocked → risk → safe)
 *    - Motiverend: "nog 1 method en je bent safe"
 * 
 * 3. RISK REDUCTION
 *    - Niet alleen "coverage stijgt"
 *    - Ook "verkleint risico op X"
 *    - Business value ipv technische metric
 * 
 * 4. IMPACT LEVELS
 *    - Critical (groen): bereikt 50% → blocked naar risk
 *    - High (blauw): bereikt 80% → risk naar safe
 *    - Medium (amber): significante vooruitgang (+10%)
 *    - Low (gray): marginale vooruitgang
 * 
 * 5. COMPACT MODE
 *    - Voor research hub overview: alleen +X% badge
 *    - Voor detail pagina's: volledige uitleg
 *    - Flexibel in verschillende contexten
 */
