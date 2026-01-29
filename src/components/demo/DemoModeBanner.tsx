import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useDemoMode } from '../../contexts/DemoModeContext';
import { X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function DemoModeBanner() {
  const { config, disableDemoMode } = useDemoMode();

  if (!config.enabled) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -48 }}
        animate={{ y: 0 }}
        exit={{ y: -48 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 bg-amber-500 dark:bg-amber-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between gap-4">
          {/* Left: Demo indicator */}
          <div className="flex items-center gap-4">
            <Badge className="bg-white/20 text-white border-white/30 rounded-full">
              <AlertCircle className="h-4 w-4 mr-1" />
              DEMO MODE
            </Badge>
            
            <div className="flex items-center gap-2 text-sm">
              <span>Using sample data from</span>
              <span className="font-semibold">{config.companyName}</span>
              <span className="text-white/70">({config.industry})</span>
            </div>
          </div>

          {/* Right: Exit button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={disableDemoMode}
            className="text-white hover:bg-white/20 gap-2"
          >
            <X className="h-4 w-4" />
            Exit Demo
          </Button>
        </div>
      </motion.div>

      {/* Spacer to prevent content from being hidden under banner */}
      <div className="h-12" />
    </AnimatePresence>
  );
}
