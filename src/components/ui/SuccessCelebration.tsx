/**
 * Success Celebration Component
 * Shows confetti + animated success message for celebrating completions
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles, Trophy, Star, PartyPopper } from 'lucide-react';
import { CustomConfetti } from '../CustomConfetti';
import { cn } from '../../lib/utils';

interface SuccessCelebrationProps {
  show: boolean;
  title?: string;
  message?: string;
  variant?: 'default' | 'milestone' | 'achievement';
  onComplete?: () => void;
  duration?: number;
}

const variantConfig = {
  default: {
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    confettiCount: 30,
  },
  milestone: {
    icon: Trophy,
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    confettiCount: 50,
  },
  achievement: {
    icon: Star,
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    confettiCount: 75,
  },
};

export function SuccessCelebration({
  show,
  title = 'Success!',
  message,
  variant = 'default',
  onComplete,
  duration = 3000,
}: SuccessCelebrationProps) {
  const [visible, setVisible] = useState(false);
  const config = variantConfig[variant];
  const Icon = config.icon;

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onComplete]);

  return (
    <>
      {/* Confetti Layer */}
      <CustomConfetti 
        active={show} 
        numberOfPieces={config.confettiCount} 
        duration={duration} 
      />

      {/* Success Banner */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 25 
            }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[100]"
          >
            <div className={cn(
              'flex items-center gap-3 px-6 py-4 rounded-xl border-2 shadow-lg',
              config.bgColor,
              config.borderColor
            )}>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
              >
                <Icon className={cn('h-8 w-8', config.iconColor)} />
              </motion.div>
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-semibold text-lg"
                >
                  {title}
                </motion.h3>
                {message && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm text-muted-foreground"
                  >
                    {message}
                  </motion.p>
                )}
              </div>
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: 'easeInOut'
                }}
              >
                <Sparkles className="h-5 w-5 text-amber-400" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Hook for triggering success celebrations
 */
export function useSuccessCelebration() {
  const [celebration, setCelebration] = useState<{
    show: boolean;
    title?: string;
    message?: string;
    variant?: 'default' | 'milestone' | 'achievement';
  }>({ show: false });

  const celebrate = (options?: {
    title?: string;
    message?: string;
    variant?: 'default' | 'milestone' | 'achievement';
  }) => {
    setCelebration({
      show: true,
      title: options?.title || 'Success!',
      message: options?.message,
      variant: options?.variant || 'default',
    });
  };

  const reset = () => {
    setCelebration({ show: false });
  };

  return {
    celebration,
    celebrate,
    reset,
    CelebrationComponent: () => (
      <SuccessCelebration
        show={celebration.show}
        title={celebration.title}
        message={celebration.message}
        variant={celebration.variant}
        onComplete={reset}
      />
    ),
  };
}

/**
 * Inline success animation (for buttons, etc.)
 */
export function SuccessCheckmark({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
