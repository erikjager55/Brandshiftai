import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Save,
  Loader2,
  Network,
  ArrowRight,
  Plus,
  Check,
  X,
  Bell,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

// === LOADING STATES ===

// 1. Page Loading Component
export function PageLoading() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        {/* Logo with pulse animation */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
            <span className="text-3xl font-semibold text-primary">B</span>
          </div>
        </motion.div>

        {/* Loading text */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Loading your workspace...</h3>
          <div className="flex justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Content Generation Loading
export function ContentGenerationLoading() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);

  const phases = [
    'Analyzing brand voice...',
    'Applying persona insights...',
    'Crafting your content...',
  ];

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length);
    }, 3000);

    const timeInterval = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Animated Sparkles */}
      <div className="flex justify-center">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles className="h-12 w-12 text-primary" />
        </motion.div>
      </div>

      {/* Progress text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={currentPhase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm text-muted-foreground text-center"
        >
          {phases[currentPhase]}
        </motion.p>
      </AnimatePresence>

      {/* Skeleton preview */}
      <div className="rounded-xl border p-6 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-4 bg-muted rounded animate-pulse"
            style={{ width: `${100 - i * 10}%` }}
          />
        ))}
      </div>

      {/* Time remaining */}
      <p className="text-xs text-muted-foreground text-center">
        ~{timeRemaining} seconds remaining
      </p>
    </div>
  );
}

// 3. Research Processing Loading
export function ResearchProcessingLoading() {
  const [dataPoints, setDataPoints] = useState(0);
  const [insights, setInsights] = useState<string[]>([]);

  const insightsList = [
    'Brand consistency score: 87%',
    'Target audience alignment detected',
    'Content gap opportunities identified',
    'Competitive positioning analyzed',
  ];

  useEffect(() => {
    const pointsInterval = setInterval(() => {
      setDataPoints((prev) => Math.min(247, prev + 13));
    }, 200);

    const insightsInterval = setInterval(() => {
      setInsights((prev) => {
        if (prev.length < insightsList.length) {
          return [...prev, insightsList[prev.length]];
        }
        return prev;
      });
    }, 1500);

    return () => {
      clearInterval(pointsInterval);
      clearInterval(insightsInterval);
    };
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Animated network */}
      <div className="flex justify-center">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Network className="h-12 w-12 text-primary" />
        </motion.div>
      </div>

      {/* Data points counter */}
      <p className="text-sm text-center font-medium">
        Processing {dataPoints} data points
      </p>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${(dataPoints / 247) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          {Math.round((dataPoints / 247) * 100)}% complete
        </p>
      </div>

      {/* Mini insights appearing */}
      <div className="space-y-2">
        <AnimatePresence>
          {insights.map((insight, index) => (
            <motion.div
              key={insight}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span>{insight}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 4. Card Skeleton
export function CardSkeleton() {
  return (
    <div className="rounded-xl border p-6 space-y-4">
      {/* Shimmer overlay */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-muted to-transparent" />
      </div>

      {/* Avatar + Title */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
          <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
        </div>
      </div>

      {/* Description lines */}
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded animate-pulse" />
        <div className="h-3 bg-muted rounded w-5/6 animate-pulse" />
        <div className="h-3 bg-muted rounded w-4/6 animate-pulse" />
      </div>

      {/* Badges */}
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
        <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
      </div>
    </div>
  );
}

// 5. Table Skeleton
export function TableSkeleton() {
  return (
    <div className="rounded-xl border overflow-hidden">
      {/* Header */}
      <div className="border-b bg-muted/50 p-4">
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-muted rounded w-3/4" />
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="p-4">
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((col) => (
                <div
                  key={col}
                  className="h-4 bg-muted rounded animate-pulse"
                  style={{ width: `${Math.random() * 30 + 50}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// === MICRO-INTERACTIONS ===

// Interactive Button States Demo
export function ButtonStatesDemo() {
  const [buttonState, setButtonState] = useState<'default' | 'loading' | 'success'>('default');

  const handleClick = () => {
    setButtonState('loading');
    setTimeout(() => {
      setButtonState('success');
      setTimeout(() => {
        setButtonState('default');
      }, 2000);
    }, 2000);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={buttonState === 'loading'}
      className={cn(
        'gap-2 transition-all duration-200',
        buttonState === 'success' && 'bg-green-500 hover:bg-green-600'
      )}
    >
      {buttonState === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
      {buttonState === 'success' && <CheckCircle2 className="h-4 w-4" />}
      {buttonState === 'default' && <Plus className="h-4 w-4" />}
      
      {buttonState === 'loading' && 'Loading...'}
      {buttonState === 'success' && 'Success!'}
      {buttonState === 'default' && 'Create Asset'}
    </Button>
  );
}

// Card Hover Demo
export function CardHoverDemo() {
  return (
    <div className="rounded-xl border p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer group">
      <div className="space-y-4">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Hover over me</h3>
          <p className="text-sm text-muted-foreground">
            Notice the shadow, border, and icon background changes
          </p>
        </div>
      </div>
    </div>
  );
}

// Toggle Switch
export function ToggleSwitch({ enabled = false, onChange }: { enabled?: boolean; onChange?: (enabled: boolean) => void }) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  const toggle = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        'relative h-6 w-11 rounded-full transition-colors duration-200',
        isEnabled ? 'bg-primary' : 'bg-muted'
      )}
    >
      <motion.div
        className={cn(
          'absolute top-1 h-4 w-4 rounded-full bg-background shadow-md',
          isEnabled ? 'left-6' : 'left-1'
        )}
        layout
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
    </button>
  );
}

// Dropdown Demo
export function DropdownDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const items = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="gap-2">
        Select an option
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="h-4 w-4 rotate-90" />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full rounded-xl border bg-card shadow-lg overflow-hidden z-10"
          >
            {items.map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 text-sm text-left hover:bg-muted transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Modal Demo
export function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <div className="rounded-xl border p-6 bg-card shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Modal Title</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">
                  This modal has smooth scale and fade animations.
                </p>
                <Button onClick={() => setIsOpen(false)} className="w-full">
                  Close
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Notification Toast
export function NotificationToast({ message, onClose }: { message: string; onClose: () => void }) {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          onClose();
          return 0;
        }
        return prev - 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="fixed top-4 right-4 w-80 rounded-xl border bg-card shadow-lg overflow-hidden z-50"
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Success</p>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Auto-dismiss progress bar */}
      <div className="h-1 bg-muted">
        <motion.div
          className="h-full bg-green-600"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.05 }}
        />
      </div>
    </motion.div>
  );
}

// Progress Bar Demo
export function ProgressBarDemo() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getProgressColor = () => {
    if (progress < 33) return 'bg-red-600';
    if (progress < 66) return 'bg-amber-600';
    return 'bg-green-600';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Progress</span>
        <span className="text-muted-foreground">{progress}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={cn('h-full transition-colors duration-500', getProgressColor())}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

// Save Indicator
export function SaveIndicator() {
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleSave = () => {
    setSaveState('saving');
    setTimeout(() => {
      setSaveState('saved');
      setTimeout(() => {
        setSaveState('idle');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex items-center gap-2">
      <Button onClick={handleSave} disabled={saveState !== 'idle'} variant="outline">
        Save Changes
      </Button>

      <AnimatePresence mode="wait">
        {saveState === 'saving' && (
          <motion.div
            key="saving"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Saving...</span>
          </motion.div>
        )}

        {saveState === 'saved' && (
          <motion.div
            key="saved"
            initial={{ opacity: 0, x: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Saved</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
