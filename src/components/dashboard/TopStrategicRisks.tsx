/**
 * COMPONENT: Top Strategic Risks
 * 
 * Toont top 2 strategische risico's.
 * Wat is het risico + waarom gevaarlijk.
 * 
 * DOEL: In 3 seconden begrijpen wat er mis kan gaan
 */

import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { AlertTriangle, TrendingDown } from 'lucide-react';

interface StrategicRisk {
  id: string;
  title: string;
  description: string;
  impact: 'critical' | 'high';
  category: string;
}

interface TopStrategicRisksProps {
  risks: StrategicRisk[];
}

export function TopStrategicRisks({ risks }: TopStrategicRisksProps) {
  
  // Only show top 2
  const topRisks = risks.slice(0, 2);

  const impactConfig = {
    critical: {
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-red-300',
      label: 'Kritiek Risico'
    },
    high: {
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      borderColor: 'border-amber-300',
      label: 'Hoog Risico'
    }
  };

  if (topRisks.length === 0) {
    return (
      <Card className="border-2 border-green-200">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="h-16 w-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Geen Strategische Risico's</h3>
            <p className="text-muted-foreground">
              Al je merkdata voldoet aan minimum thresholds
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          Top {topRisks.length} Strategische Risico's
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Belangrijkste bedreigingen voor besliskwaliteit
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topRisks.map((risk, index) => {
          const config = impactConfig[risk.impact];

          return (
            <Card key={risk.id} className={`border-2 ${config.borderColor}`}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <Badge variant="outline" className={`${config.color} border-current text-xs`}>
                        {config.label}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {risk.category}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-semibold mb-2">{risk.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {risk.description}
                    </p>
                  </div>

                  {/* Impact indicator */}
                  <div className={`flex items-center gap-2 p-3 rounded-lg ${config.bgColor}`}>
                    <TrendingDown className={`h-4 w-4 ${config.color}`} />
                    <p className="text-xs font-medium">
                      {risk.impact === 'critical' 
                        ? 'Kan leiden tot fundamentele strategische fouten'
                        : 'Kan leiden tot sub-optimale beslissingen'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/**
 * DESIGN PRINCIPES:
 * 
 * 1. MAX 2 RISKS
 *    - Top 2 alleen
 *    - Focus, geen overwhelm
 *    - Numbered (1, 2)
 * 
 * 2. WAT + WAAROM
 *    - Title: wat is het risico
 *    - Description: waarom gevaarlijk
 *    - Impact indicator: potentiële gevolgen
 * 
 * 3. VISUELE URGENTIE
 *    - Critical: rode border
 *    - High: amber border
 *    - Numbered circles
 * 
 * 4. SCANBAAR IN 3 SECONDEN
 *    - Grid layout (2 kolommen)
 *    - Duidelijke titels
 *    - Korte descriptions
 * 
 * 5. POSITIVE EMPTY STATE
 *    - Indien geen risico's: groene check
 *    - "Geen strategische risico's"
 *    - Positieve framing
 */
