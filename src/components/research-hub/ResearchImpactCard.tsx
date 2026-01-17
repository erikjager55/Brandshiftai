/**
 * COMPONENT: Research Impact Card
 * 
 * Vervangt standaard research card met decision impact focus.
 * Toont per research item:
 * - Welke beslissing hierdoor veiliger wordt
 * - Welk risico ermee wordt verkleind
 * - Wat de verwachte impact is
 * 
 * DOEL: Research is niet een taak, maar een beslissing-enabler
 */

import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  CheckCircle
} from 'lucide-react';

interface ResearchImpactCardProps {
  /** Research method naam */
  methodName: string;
  
  /** Target (asset/persona) naam */
  targetName: string;
  
  /** Current coverage before research */
  currentCoverage: number;
  
  /** Expected coverage after research */
  expectedCoverage: number;
  
  /** Welke beslissing wordt ontgrendeld */
  unlocksDecision: string;
  
  /** Risico reductie beschrijving */
  riskReduction: string;
  
  /** Progress (0-100) */
  progress: number;
  
  /** Status */
  status: 'in-progress' | 'validation-needed' | 'completed';
  
  /** Callbacks */
  onView?: () => void;
  onValidate?: () => void;
}

export function ResearchImpactCard({
  methodName,
  targetName,
  currentCoverage,
  expectedCoverage,
  unlocksDecision,
  riskReduction,
  progress,
  status,
  onView,
  onValidate
}: ResearchImpactCardProps) {
  
  const coverageIncrease = expectedCoverage - currentCoverage;
  
  const statusConfig = {
    'in-progress': {
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200',
      label: 'In Progress'
    },
    'validation-needed': {
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      borderColor: 'border-amber-200',
      label: 'Validatie Nodig'
    },
    'completed': {
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200',
      label: 'Compleet'
    }
  };

  const config = statusConfig[status];

  return (
    <Card className={`border-l-4 ${config.borderColor} hover:shadow-md transition-shadow`}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">{methodName}</h4>
              <Badge variant="outline" className={`${config.color} border-current text-xs`}>
                {config.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Target: {targetName}
            </p>
          </div>
          
          {/* Coverage increase badge */}
          <Badge className="bg-green-600 text-white shrink-0">
            +{coverageIncrease}%
          </Badge>
        </div>

        {/* Progress bar (only if in-progress) */}
        {status === 'in-progress' && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Voortgang</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Impact metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
            <Target className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">Ontgrendelt</p>
              <p className="text-sm">{unlocksDecision}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
            <ShieldCheck className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">Risico Reductie</p>
              <p className="text-sm">{riskReduction}</p>
            </div>
          </div>
        </div>

        {/* Coverage visualization */}
        <div className="flex items-center gap-3 mb-3 p-2 rounded-md bg-muted/30">
          <div className="text-center">
            <div className="text-lg font-bold text-muted-foreground">{currentCoverage}%</div>
            <div className="text-xs text-muted-foreground">Nu</div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{expectedCoverage}%</div>
            <div className="text-xs text-muted-foreground">Na afronding</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {status === 'validation-needed' && onValidate && (
            <Button 
              size="sm" 
              onClick={onValidate}
              className="flex-1"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Valideer Nu
            </Button>
          )}
          {onView && (
            <Button 
              variant={status === 'validation-needed' ? 'outline' : 'default'} 
              size="sm" 
              onClick={onView}
              className={status === 'validation-needed' ? '' : 'flex-1'}
            >
              Bekijk Details
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * MOTIVATIE:
 * 
 * 1. IMPACT-FIRST
 *    - Niet "Research X% done" maar "Ontgrendelt Y beslissing"
 *    - Coverage increase prominent (+15%)
 *    - Voor/na visualisatie
 * 
 * 2. DECISION FRAMING
 *    - "Ontgrendelt" (wat wordt mogelijk)
 *    - "Risico Reductie" (waarom belangrijk)
 *    - Target context (welk asset/persona)
 * 
 * 3. ACTIONABLE
 *    - Status-specifieke acties
 *    - "Valideer Nu" voor validation needed
 *    - "Bekijk Details" voor alle statussen
 * 
 * 4. VISUELE HIËRARCHIE
 *    - Coverage increase badge (meest prominent)
 *    - Impact metrics (2 kolommen)
 *    - Progress bar (alleen indien in progress)
 * 
 * 5. STATUS KLEUREN
 *    - In Progress (blauw): lopend
 *    - Validation Needed (amber): actie vereist
 *    - Completed (groen): klaar
 */
