import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import {
  Sparkles,
  TrendingUp,
  Target,
  Eye,
  Copy,
  Check,
  X,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { copyToClipboard } from '../../utils/clipboard';

interface QualityMetric {
  name: string;
  score: number;
  category: 'brand-alignment' | 'pacing' | 'visual-quality' | 'message-clarity';
  potentialGain: number;
  suggestions: Suggestion[];
}

interface Suggestion {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'replace' | 'add' | 'restructure';
  current?: string;
  suggested?: string;
  insertAfter?: string;
  bulletPoints?: string[];
}

interface ImproveScorePanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentScore: number;
  metrics: QualityMetric[];
  onApplySuggestion: (suggestionId: string) => void;
  onApplyAll: () => void;
  onPreview: (suggestionId: string) => void;
  onDismiss: (suggestionId: string) => void;
}

export function ImproveScorePanel({
  isOpen,
  onClose,
  currentScore,
  metrics,
  onApplySuggestion,
  onApplyAll,
  onPreview,
  onDismiss,
}: ImproveScorePanelProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const targetScore = 95;
  const totalSuggestions = metrics.reduce((sum, m) => sum + m.suggestions.length, 0);
  const maxPotentialScore = currentScore + metrics.reduce((sum, m) => sum + m.potentialGain, 0);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'brand-alignment':
        return 'text-primary';
      case 'pacing':
        return 'text-purple-600 dark:text-purple-400';
      case 'visual-quality':
        return 'text-pink-600 dark:text-pink-400';
      case 'message-clarity':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const getProgressColor = (category: string) => {
    switch (category) {
      case 'brand-alignment':
        return '[&>div]:bg-primary';
      case 'pacing':
        return '[&>div]:bg-purple-600';
      case 'visual-quality':
        return '[&>div]:bg-pink-600';
      case 'message-clarity':
        return '[&>div]:bg-blue-600';
      default:
        return '[&>div]:bg-muted';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'brand-alignment':
        return 'Brand Alignment';
      case 'pacing':
        return 'Pacing';
      case 'visual-quality':
        return 'Visual Quality';
      case 'message-clarity':
        return 'Message Clarity';
      default:
        return category;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-[420px] bg-background border-l shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-lg font-semibold">Improve Content Quality</h2>
              <p className="text-sm text-muted-foreground mt-1">
                AI suggestions to boost your score
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Score Overview */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-sm text-muted-foreground">Current Score:</span>
              <span className="text-lg font-semibold ml-2">{currentScore}/100</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Target:</span>
              <span className="text-lg font-semibold ml-2">{targetScore}+</span>
            </div>
          </div>
          <Progress value={(currentScore / targetScore) * 100} className="h-2" />
          {maxPotentialScore >= targetScore && (
            <p className="text-xs text-muted-foreground mt-2">
              Potential score: <span className="font-medium text-green-600 dark:text-green-400">{maxPotentialScore}/100</span>
            </p>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Score Breakdown */}
          <h3 className="text-sm font-semibold mb-4">📊 Score Breakdown</h3>

          <div className="space-y-3">
            {metrics.map((metric) => (
              <CategoryCard
                key={metric.name}
                metric={metric}
                isExpanded={expandedCategory === metric.category}
                onToggle={() =>
                  setExpandedCategory(expandedCategory === metric.category ? null : metric.category)
                }
                getCategoryColor={getCategoryColor}
                getProgressColor={getProgressColor}
                getCategoryLabel={getCategoryLabel}
                onApplySuggestion={onApplySuggestion}
                onPreview={onPreview}
                onDismiss={onDismiss}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        {totalSuggestions > 0 && (
          <div className="p-6 border-t">
            <Button
              onClick={onApplyAll}
              className="w-full"
              size="lg"
            >
              Apply All Suggestions ({totalSuggestions} changes)
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

interface CategoryCardProps {
  metric: QualityMetric;
  isExpanded: boolean;
  onToggle: () => void;
  getCategoryColor: (category: string) => string;
  getProgressColor: (category: string) => string;
  getCategoryLabel: (category: string) => string;
  onApplySuggestion: (suggestionId: string) => void;
  onPreview: (suggestionId: string) => void;
  onDismiss: (suggestionId: string) => void;
}

function CategoryCard({
  metric,
  isExpanded,
  onToggle,
  getCategoryColor,
  getProgressColor,
  getCategoryLabel,
  onApplySuggestion,
  onPreview,
  onDismiss,
}: CategoryCardProps) {
  const hasNoConcerns = metric.suggestions.length === 0;

  return (
    <div className="bg-card rounded-xl border p-4">
      {/* Category Header */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className={cn('text-sm font-semibold', getCategoryColor(metric.category))}>
            {getCategoryLabel(metric.category)}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{metric.score}%</span>
            {!hasNoConcerns && (
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-0.5">
                +{metric.potentialGain} pts
              </Badge>
            )}
          </div>
        </div>
        <Progress value={metric.score} className={cn('h-1.5', getProgressColor(metric.category))} />
      </div>

      {/* Suggestions Count or Success Message */}
      {hasNoConcerns ? (
        <p className="text-sm text-muted-foreground">
          Looking great! No suggestions needed. ✓
        </p>
      ) : (
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>{metric.suggestions.length} suggestion{metric.suggestions.length !== 1 ? 's' : ''} available</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      )}

      {/* Expanded Suggestions */}
      {isExpanded && (
        <div className="mt-4 space-y-3">
          {metric.suggestions.map((suggestion, index) => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              index={index + 1}
              onApply={() => onApplySuggestion(suggestion.id)}
              onPreview={() => onPreview(suggestion.id)}
              onDismiss={() => onDismiss(suggestion.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface SuggestionCardProps {
  suggestion: Suggestion;
  index: number;
  onApply: () => void;
  onPreview: () => void;
  onDismiss: () => void;
}

function SuggestionCard({ suggestion, index, onApply, onPreview, onDismiss }: SuggestionCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (suggestion.suggested) {
      copyToClipboard(suggestion.suggested);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-muted/50 rounded-xl border p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            SUGGESTION {index}
          </span>
        </div>
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-0.5">
          +{suggestion.points} pts
        </Badge>
      </div>

      {/* Title */}
      <h4 className="text-sm font-semibold mt-1">{suggestion.title}</h4>

      {/* Description */}
      <p className="text-sm text-muted-foreground mt-2">{suggestion.description}</p>

      {/* Current/Suggested Comparison */}
      {suggestion.type === 'replace' && suggestion.current && suggestion.suggested && (
        <div className="mt-3 space-y-2">
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg p-3">
            <p className="text-xs font-medium text-red-700 dark:text-red-400 mb-1">Current:</p>
            <p className="text-sm text-foreground">{suggestion.current}</p>
          </div>
          <div className="flex justify-center">
            <span className="text-muted-foreground">↓</span>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium text-green-700 dark:text-green-400">Suggested:</p>
              <button
                onClick={handleCopy}
                className="text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
            <p className="text-sm text-foreground">{suggestion.suggested}</p>
          </div>
        </div>
      )}

      {/* Add Type */}
      {suggestion.type === 'add' && suggestion.suggested && (
        <div className="mt-3">
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-lg p-3">
            <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">
              {suggestion.insertAfter ? `Insert after ${suggestion.insertAfter}:` : 'Add:'}
            </p>
            <p className="text-sm text-foreground">{suggestion.suggested}</p>
          </div>
        </div>
      )}

      {/* Restructure Type with Bullet Points */}
      {suggestion.type === 'restructure' && suggestion.bulletPoints && (
        <div className="mt-3">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg p-3">
            <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-2">Recommendations:</p>
            <ul className="space-y-1">
              {suggestion.bulletPoints.map((point, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-3">
        <Button variant="outline" size="sm" onClick={onPreview} className="flex-1">
          Preview in Content
        </Button>
        <Button size="sm" onClick={onApply} className="flex-1">
          Apply Change
        </Button>
        <Button variant="ghost" size="sm" onClick={onDismiss}>
          Dismiss
        </Button>
      </div>
    </div>
  );
}