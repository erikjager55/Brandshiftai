import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useDemoMode } from '../../contexts/DemoModeContext';
import {
  RefreshCw,
  Navigation,
  BarChart3,
  Maximize,
  Minimize,
  ChevronUp,
  ChevronDown,
  Play,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface DemoQuickActionsProps {
  onNavigate?: (route: string) => void;
}

export function DemoQuickActions({ onNavigate }: DemoQuickActionsProps) {
  const {
    config,
    resetDemoData,
    togglePresentationMode,
    toggleInvestorMetrics,
    startTour,
  } = useDemoMode();

  const [expanded, setExpanded] = useState(true);
  const [showJumpMenu, setShowJumpMenu] = useState(false);

  if (!config.enabled) return null;

  // Quick navigation options
  const jumpOptions = [
    { label: 'Dashboard', route: 'dashboard' },
    { label: 'Brand Assets', route: 'brand' },
    { label: 'Personas', route: 'personas' },
    { label: 'Research Hub', route: 'research' },
    { label: 'Content Library', route: 'content-library' },
    { label: 'Active Campaigns', route: 'active-campaigns' },
    { label: 'Investor Metrics', route: 'investor-metrics' },
  ];

  const handleJumpTo = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    }
    setShowJumpMenu(false);
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed bottom-6 left-6 z-40"
    >
      <div className="space-y-2">
        {/* Jump to menu */}
        <AnimatePresence>
          {showJumpMenu && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="rounded-xl border bg-card shadow-lg p-2 space-y-1 min-w-[200px]"
            >
              <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                Jump to...
              </div>
              {jumpOptions.map((option) => (
                <button
                  key={option.route}
                  onClick={() => handleJumpTo(option.route)}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="rounded-xl border bg-card shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Demo Actions</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setExpanded(!expanded)}
              className="h-6 w-6 p-0"
            >
              {expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Actions */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-2 space-y-1">
                  {/* Start Tour */}
                  {!config.tourActive && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={startTour}
                      className="w-full justify-start gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Start Guided Tour
                    </Button>
                  )}

                  {/* Reset Demo Data */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={resetDemoData}
                    className="w-full justify-start gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset Demo Data
                  </Button>

                  {/* Jump to... */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowJumpMenu(!showJumpMenu)}
                    className={cn(
                      'w-full justify-start gap-2',
                      showJumpMenu && 'bg-muted'
                    )}
                  >
                    <Navigation className="h-4 w-4" />
                    Jump to...
                  </Button>

                  {/* Toggle Metrics */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleInvestorMetrics}
                    className={cn(
                      'w-full justify-start gap-2',
                      config.showInvestorMetrics && 'bg-green-100 dark:bg-green-900/20 text-green-900 dark:text-green-200'
                    )}
                  >
                    <BarChart3 className="h-4 w-4" />
                    {config.showInvestorMetrics ? 'Hide' : 'Show'} Metrics
                  </Button>

                  {/* Presentation Mode */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={togglePresentationMode}
                    className={cn(
                      'w-full justify-start gap-2',
                      config.presentationMode && 'bg-blue-100 dark:bg-blue-900/20 text-blue-900 dark:text-blue-200'
                    )}
                  >
                    {config.presentationMode ? (
                      <Minimize className="h-4 w-4" />
                    ) : (
                      <Maximize className="h-4 w-4" />
                    )}
                    Presentation Mode
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
