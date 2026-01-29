import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, X, Lightbulb, Users, Target, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'motion/react';

interface QuickStartChecklistProps {
  onNavigate: (section: string) => void;
  onDismiss?: () => void;
}

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  route: string;
  icon: LucideIcon;
}

const CHECKLIST_KEY = 'quick-start-checklist';
const CHECKLIST_DISMISSED_KEY = 'quick-start-checklist-dismissed';

export function QuickStartChecklist({ onNavigate, onDismiss }: QuickStartChecklistProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: 'brand-asset',
      label: 'Create your first brand asset',
      completed: false,
      route: 'brand',
      icon: Lightbulb
    },
    {
      id: 'persona',
      label: 'Define your target persona',
      completed: false,
      route: 'personas',
      icon: Users
    },
    {
      id: 'research',
      label: 'Plan your first research session',
      completed: false,
      route: 'research',
      icon: Target
    },
    {
      id: 'campaign',
      label: 'Generate your first campaign strategy',
      completed: false,
      route: 'strategy',
      icon: Rocket
    }
  ]);

  // Load checklist state from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(CHECKLIST_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Re-add icon functions based on id (icons can't be serialized)
        const iconMap: Record<string, LucideIcon> = {
          'brand-asset': Lightbulb,
          'persona': Users,
          'research': Target,
          'campaign': Rocket
        };
        const restoredItems = parsed.map((item: any) => ({
          ...item,
          icon: iconMap[item.id] || Circle
        }));
        setItems(restoredItems);
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  // Save checklist state to localStorage (without icon functions)
  useEffect(() => {
    const itemsToSave = items.map(({ icon, ...rest }) => rest);
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(itemsToSave));
  }, [items]);

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progressPercentage = (completedCount / totalCount) * 100;
  const allCompleted = completedCount === totalCount;

  const handleItemClick = (item: ChecklistItem) => {
    if (!item.completed) {
      // Mark as completed
      setItems(prev =>
        prev.map(i =>
          i.id === item.id ? { ...i, completed: true } : i
        )
      );
    }
    // Navigate to the route
    onNavigate(item.route);
  };

  const handleDismiss = () => {
    localStorage.setItem(CHECKLIST_DISMISSED_KEY, 'true');
    onDismiss?.();
  };

  const currentItemIndex = items.findIndex(item => !item.completed);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-20 right-6 z-40 w-72"
    >
      <Card className="rounded-xl border bg-card shadow-lg overflow-hidden">
        {/* Header */}
        <div
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">Quick Start</h3>
              <span className="text-xs text-muted-foreground">
                {completedCount}/{totalCount}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          <div className="ml-3 flex items-center gap-2">
            {!allCompleted && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCollapsed(!isCollapsed);
                }}
              >
                {isCollapsed ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Checklist Items */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border"
            >
              <div className="p-4 space-y-2">
                {items.map((item, index) => {
                  const Icon = item.icon;
                  const isCurrent = index === currentItemIndex;
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleItemClick(item)}
                      className={`
                        flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-all duration-200
                        ${item.completed 
                          ? 'hover:bg-muted/30' 
                          : isCurrent 
                            ? 'bg-primary/10 hover:bg-primary/15 ring-1 ring-primary/20' 
                            : 'hover:bg-muted/50'
                        }
                      `}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />
                      ) : (
                        <Circle 
                          className={`h-4 w-4 shrink-0 ${
                            isCurrent 
                              ? 'text-primary animate-pulse' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      )}
                      <Icon className={`h-4 w-4 shrink-0 ${
                        item.completed 
                          ? 'text-muted-foreground' 
                          : isCurrent 
                            ? 'text-primary' 
                            : 'text-muted-foreground'
                      }`} />
                      <span
                        className={`text-sm flex-1 ${
                          item.completed
                            ? 'line-through text-muted-foreground'
                            : isCurrent
                              ? 'font-medium'
                              : ''
                        }`}
                      >
                        {item.label}
                      </span>
                    </motion.div>
                  );
                })}

                {/* All Complete Message */}
                {allCompleted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="pt-4 border-t border-border mt-4"
                  >
                    <div className="text-center space-y-3">
                      <div className="text-2xl">🎉</div>
                      <p className="text-sm font-semibold">All done!</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDismiss();
                        }}
                        className="w-full"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

// Hook to check if checklist should show
export function useShouldShowChecklist(): boolean {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(CHECKLIST_DISMISSED_KEY);
    const tourCompleted = localStorage.getItem('welcome-modal-shown');
    setShouldShow(!!tourCompleted && !dismissed);
  }, []);

  return shouldShow;
}

// Function to reset checklist (for testing)
export function resetChecklist() {
  localStorage.removeItem(CHECKLIST_KEY);
  localStorage.removeItem(CHECKLIST_DISMISSED_KEY);
}