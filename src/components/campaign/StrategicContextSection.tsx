import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Target, ChevronRight, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StrategicContextSectionProps {
  strategyId?: string;
  strategyName?: string;
  linkedObjectives?: Array<{
    id: string;
    title: string;
    progress: number;
    status: 'on-track' | 'at-risk' | 'behind';
  }>;
  onViewStrategy?: () => void;
  onLinkStrategy?: () => void;
  className?: string;
}

export function StrategicContextSection({
  strategyId,
  strategyName,
  linkedObjectives = [],
  onViewStrategy,
  onLinkStrategy,
  className,
}: StrategicContextSectionProps) {
  // If no strategy is linked, show the link option
  if (!strategyId) {
    return (
      <Card className={cn('rounded-xl border', className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Strategic Context</h2>
            </div>
          </div>

          <div className="text-center py-8">
            <Target className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Link this campaign to a business strategy to align with your strategic objectives.
            </p>
            {onLinkStrategy && (
              <Button variant="outline" onClick={onLinkStrategy} className="gap-2">
                <Target className="h-4 w-4" />
                Link to Strategy
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Strategy is linked, show the context
  return (
    <Card className={cn('rounded-xl border', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Strategic Context</h2>
          </div>
        </div>

        <div className="space-y-4">
          {/* Strategy Info */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              This campaign supports:
            </p>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-semibold">{strategyName}</span>
              </div>
              {onViewStrategy && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onViewStrategy}
                  className="gap-1"
                >
                  View Strategy
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Linked Objectives */}
          {linkedObjectives.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Contributing to objectives:</p>
              <div className="space-y-2">
                {linkedObjectives.map((objective) => {
                  const statusColors = {
                    'on-track': 'text-green-600 dark:text-green-400',
                    'at-risk': 'text-amber-600 dark:text-amber-400',
                    'behind': 'text-red-600 dark:text-red-400',
                  };

                  return (
                    <div
                      key={objective.id}
                      className="flex items-center justify-between p-2 text-sm"
                    >
                      <div className="flex-1">
                        <div className="font-medium mb-1">{objective.title}</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-primary h-full rounded-full transition-all"
                              style={{ width: `${objective.progress}%` }}
                            />
                          </div>
                          <span className={cn('text-xs', statusColors[objective.status])}>
                            {objective.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
