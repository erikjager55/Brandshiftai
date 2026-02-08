import React, { useState } from 'react';
import { Rocket, CheckCircle2, Circle, X, ChevronRight } from 'lucide-react';
import { onboardingItems as initialItems, type OnboardingItem } from '../../data/help-data';

interface OnboardingChecklistProps {
  onDismiss: () => void;
  onNavigate?: (route: string) => void;
}

export function OnboardingChecklist({ onDismiss, onNavigate }: OnboardingChecklistProps) {
  const [items, setItems] = useState<OnboardingItem[]>(initialItems);
  const [collapsed, setCollapsed] = useState(false);

  const completedCount = items.filter(i => i.completed).length;
  const totalCount = items.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handleToggleItem = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Find next incomplete item
  const nextItem = items.find(i => !i.completed);

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-6 left-6 bg-card dark:bg-gray-900 rounded-full shadow-lg border border-border dark:border-gray-800 px-4 py-2.5 flex items-center gap-2 z-40 hover:shadow-xl transition-all duration-200"
      >
        <Rocket className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-foreground dark:text-white">{completedCount}/{totalCount}</span>
        <div className="w-16 h-1.5 bg-muted dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 w-80 bg-card dark:bg-gray-900 rounded-2xl shadow-2xl border border-border dark:border-gray-800 z-40 overflow-hidden">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Rocket className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground dark:text-white">Getting Started</h3>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground dark:text-gray-400">{completedCount}/{totalCount} done</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-muted dark:bg-gray-700 rounded-full overflow-hidden mb-1">
          <div
            className="h-full bg-primary rounded-full transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground dark:text-gray-500 text-right">{progressPercent}%</p>
      </div>

      {/* Items */}
      <div className="px-4 pb-2 space-y-1 max-h-48 overflow-y-auto">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => handleToggleItem(item.id)}
            className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all duration-200 ${
              item.completed
                ? 'opacity-60'
                : 'hover:bg-muted/50 dark:hover:bg-gray-800'
            }`}
          >
            {item.completed ? (
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground dark:text-gray-500 flex-shrink-0" />
            )}
            <span className={`text-sm flex-1 ${
              item.completed
                ? 'line-through text-muted-foreground dark:text-gray-500'
                : 'text-foreground dark:text-white'
            }`}>
              {item.title}
            </span>
            {!item.completed && item.route && (
              <ChevronRight className="h-3 w-3 text-muted-foreground dark:text-gray-500" />
            )}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 pt-2 flex gap-2 border-t border-border dark:border-gray-800 mt-2">
        {nextItem && (
          <button
            onClick={() => {
              if (nextItem.route && onNavigate) {
                onNavigate(nextItem.route);
              }
            }}
            className="flex-1 bg-primary text-white rounded-lg px-3 py-2 text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Continue Setup
          </button>
        )}
        <button
          onClick={onDismiss}
          className="px-3 py-2 text-sm text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white rounded-lg hover:bg-muted/50 dark:hover:bg-gray-800 transition-all duration-200"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
