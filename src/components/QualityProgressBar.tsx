import React from 'react';
import { Badge } from './ui/badge';
import { TrendingUp, CheckCircle, Target } from 'lucide-react';

interface QualityProgressBarProps {
  currentLevel: 'none' | 'foundation' | 'standard' | 'strategic';
  completedMethods: number;
  totalMethods: number;
  nextMilestone?: {
    level: string;
    methodsNeeded: number;
  };
}

export function QualityProgressBar({
  currentLevel,
  completedMethods,
  totalMethods,
  nextMilestone
}: QualityProgressBarProps) {
  const getQualityColor = (level: string) => {
    switch (level) {
      case 'strategic':
        return 'bg-green-500';
      case 'standard':
        return 'bg-amber-500';
      case 'foundation':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getQualityTextColor = (level: string) => {
    switch (level) {
      case 'strategic':
        return 'text-green-700 dark:text-green-400';
      case 'standard':
        return 'text-amber-700 dark:text-amber-400';
      case 'foundation':
        return 'text-blue-700 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getQualityLabel = (level: string) => {
    switch (level) {
      case 'strategic':
        return 'Strategic Level';
      case 'standard':
        return 'Standard Level';
      case 'foundation':
        return 'Foundation Level';
      default:
        return 'No Research';
    }
  };

  const getLevelThreshold = (level: string) => {
    switch (level) {
      case 'foundation':
        return 1;
      case 'standard':
        return 2;
      case 'strategic':
        return 3;
      default:
        return 0;
    }
  };

  const currentThreshold = getLevelThreshold(currentLevel);
  const progressPercentage = (completedMethods / totalMethods) * 100;

  return (
    <div className="space-y-4">
      {/* Current Level Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Research Quality</h3>
          {currentLevel === 'strategic' && (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
        </div>
        <Badge
          className={`${
            currentLevel === 'strategic'
              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-900/30'
              : currentLevel === 'standard'
              ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 border-amber-200 dark:border-amber-900/30'
              : currentLevel === 'foundation'
              ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-900/30'
              : 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-900/30'
          } border`}
        >
          {currentLevel === 'strategic' && <CheckCircle className="h-3 w-3 mr-1" />}
          {currentLevel === 'foundation' && <TrendingUp className="h-3 w-3 mr-1" />}
          {getQualityLabel(currentLevel)}
        </Badge>
      </div>

      {/* Progress Visualization */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {completedMethods} of {totalMethods} methods completed
          </span>
          <span className={`font-medium ${getQualityTextColor(currentLevel)}`}>
            {Math.round(progressPercentage)}%
          </span>
        </div>

        {/* Three-Tier Progress Bar */}
        <div className="relative h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          {/* Foundation Segment */}
          <div
            className={`absolute left-0 top-0 h-full ${
              completedMethods >= 1 ? getQualityColor('foundation') : 'bg-gray-200 dark:bg-gray-800'
            } transition-all duration-500`}
            style={{ width: '33.33%' }}
          />
          {/* Standard Segment */}
          <div
            className={`absolute left-[33.33%] top-0 h-full ${
              completedMethods >= 2 ? getQualityColor('standard') : 'bg-gray-200 dark:bg-gray-800'
            } transition-all duration-500 delay-150`}
            style={{ width: '33.33%' }}
          />
          {/* Strategic Segment */}
          <div
            className={`absolute left-[66.66%] top-0 h-full ${
              completedMethods >= 3 ? getQualityColor('strategic') : 'bg-gray-200 dark:bg-gray-800'
            } transition-all duration-500 delay-300`}
            style={{ width: '33.34%' }}
          />
        </div>

        {/* Level Markers */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className={completedMethods >= 1 ? 'font-medium text-blue-600 dark:text-blue-400' : ''}>
            Foundation
          </span>
          <span className={completedMethods >= 2 ? 'font-medium text-amber-600 dark:text-amber-400' : ''}>
            Standard
          </span>
          <span className={completedMethods >= 3 ? 'font-medium text-green-600 dark:text-green-400' : ''}>
            Strategic
          </span>
        </div>
      </div>

      {/* Next Milestone */}
      {nextMilestone && currentLevel !== 'strategic' && (
        <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Next Milestone</p>
            <p className="text-xs text-muted-foreground">
              Complete {nextMilestone.methodsNeeded} more research{' '}
              {nextMilestone.methodsNeeded === 1 ? 'method' : 'methods'} to reach{' '}
              <span className="font-medium text-foreground">{nextMilestone.level}</span>
            </p>
          </div>
        </div>
      )}

      {/* Strategic Level Achievement */}
      {currentLevel === 'strategic' && (
        <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-lg">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-green-900 dark:text-green-400">
              Strategic Level Achieved
            </p>
            <p className="text-xs text-green-700 dark:text-green-500">
              This asset has comprehensive, multi-angle validation and is execution-ready
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
