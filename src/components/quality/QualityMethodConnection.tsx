/**
 * Quality Method Connection
 * Visual component showing the connection between validation methods and quality score
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, ArrowRight, TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getQualityConfig } from '../../constants/quality-system';

interface QualityMethodConnectionProps {
  completedCount: number;
  totalCount: number;
  score: number;
  className?: string;
  animated?: boolean;
}

/**
 * Shows visual connection between completed methods and quality score
 */
export function QualityMethodConnection({
  completedCount,
  totalCount,
  score,
  className,
  animated = true
}: QualityMethodConnectionProps) {
  const config = getQualityConfig(score);
  const pendingCount = totalCount - completedCount;
  const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Methods Visualization */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {/* Completed methods */}
          {Array.from({ length: Math.min(completedCount, 5) }).map((_, i) => (
            <motion.div
              key={`completed-${i}`}
              initial={animated ? { scale: 0, opacity: 0 } : undefined}
              animate={animated ? { scale: 1, opacity: 1 } : undefined}
              transition={animated ? { delay: i * 0.1 } : undefined}
            >
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </motion.div>
          ))}
          
          {/* Pending methods */}
          {Array.from({ length: Math.min(pendingCount, 5 - completedCount) }).map((_, i) => (
            <Circle key={`pending-${i}`} className="h-4 w-4 text-gray-300" />
          ))}
          
          {/* Show "+X" if more than 5 total */}
          {totalCount > 5 && (
            <span className="text-xs text-gray-500 ml-1">
              +{totalCount - 5}
            </span>
          )}
        </div>
      </div>

      {/* Arrow connector */}
      <motion.div
        initial={animated ? { x: -10, opacity: 0 } : undefined}
        animate={animated ? { x: 0, opacity: 1 } : undefined}
        transition={animated ? { delay: 0.3 } : undefined}
      >
        <ArrowRight className="h-4 w-4 text-gray-400" />
      </motion.div>

      {/* Quality Score Result */}
      <motion.div
        className={cn(
          'flex items-center gap-1.5 px-2 py-1 rounded-md',
          config.containerClasses
        )}
        initial={animated ? { scale: 0.8, opacity: 0 } : undefined}
        animate={animated ? { scale: 1, opacity: 1 } : undefined}
        transition={animated ? { delay: 0.4 } : undefined}
      >
        <TrendingUp className={cn('h-3.5 w-3.5', config.iconClasses)} />
        <span className={cn('text-sm font-bold', config.textColor)}>
          {score}%
        </span>
      </motion.div>
    </div>
  );
}

/**
 * Compact inline version for smaller spaces
 */
interface QualityMethodConnectionInlineProps {
  completedCount: number;
  totalCount: number;
  score: number;
  className?: string;
}

export function QualityMethodConnectionInline({
  completedCount,
  totalCount,
  score,
  className
}: QualityMethodConnectionInlineProps) {
  const config = getQualityConfig(score);

  return (
    <div className={cn('inline-flex items-center gap-2 text-xs', className)}>
      <div className="flex items-center gap-1">
        <CheckCircle2 className="h-3 w-3 text-green-600" />
        <span className="text-gray-600">
          {completedCount}/{totalCount}
        </span>
      </div>
      <ArrowRight className="h-3 w-3 text-gray-400" />
      <span className={cn('font-bold', config.textColor)}>
        {score}%
      </span>
    </div>
  );
}

/**
 * Animated progress flow showing methods contributing to quality
 */
interface QualityFlowVisualizationProps {
  completedCount: number;
  totalCount: number;
  score: number;
  className?: string;
}

export function QualityFlowVisualization({
  completedCount,
  totalCount,
  score,
  className
}: QualityFlowVisualizationProps) {
  const config = getQualityConfig(score);
  const Icon = config.icon;

  return (
    <div className={cn('relative py-6 px-4', className)}>
      {/* Connection line */}
      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200" />
      
      <div className="relative flex items-center justify-between">
        {/* Left: Methods */}
        <div className="bg-white px-3 py-2 rounded-lg border-2 border-gray-200">
          <div className="text-xs text-gray-500 mb-1">Validation Methods</div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              {Array.from({ length: Math.min(completedCount, 3) }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center"
                >
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
              ))}
              {completedCount > 3 && (
                <div className="h-6 w-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-xs text-white font-bold">
                  +{completedCount - 3}
                </div>
              )}
            </div>
            <span className="text-sm font-medium">
              {completedCount}/{totalCount}
            </span>
          </div>
        </div>

        {/* Center: Flow arrows */}
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 2,
                duration: 0.5
              }}
            >
              <ArrowRight className="h-4 w-4 text-primary" />
            </motion.div>
          ))}
        </div>

        {/* Right: Quality Score */}
        <div className={cn('px-4 py-2 rounded-lg border-2', config.containerClasses)}>
          <div className="text-xs mb-1" style={{ color: config.color }}>
            Quality Score
          </div>
          <div className="flex items-center gap-2">
            <Icon className={cn('h-5 w-5', config.iconClasses)} />
            <span className={cn('text-2xl font-bold', config.textColor)}>
              {score}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
