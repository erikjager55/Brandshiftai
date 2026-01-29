import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useDemoMode } from '../../contexts/DemoModeContext';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface SpotlightConfig {
  selector?: string; // CSS selector for element to spotlight
  position?: 'top' | 'right' | 'bottom' | 'left';
  offset?: number; // Offset in pixels from spotlighted element
}

// Tour step spotlight configurations
const SPOTLIGHT_CONFIGS: Record<number, SpotlightConfig> = {
  0: { selector: '[data-tour="dashboard"]', position: 'right', offset: 20 },
  1: { selector: '[data-tour="brand-assets"]', position: 'right', offset: 20 },
  2: { selector: '[data-tour="personas"]', position: 'right', offset: 20 },
  3: { selector: '[data-tour="research"]', position: 'right', offset: 20 },
  4: { selector: '[data-tour="content-generation"]', position: 'bottom', offset: 20 },
  5: { selector: '[data-tour="campaigns"]', position: 'right', offset: 20 },
  6: { selector: '[data-tour="analytics"]', position: 'right', offset: 20 },
  7: { selector: '[data-tour="summary"]', position: 'bottom', offset: 20 },
};

export function DemoSpotlight() {
  const { config, tourSteps } = useDemoMode();
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const currentStep = tourSteps[config.currentTourStep];
  const spotlightConfig = SPOTLIGHT_CONFIGS[config.currentTourStep];

  // Update spotlight position when step changes
  useEffect(() => {
    if (!config.tourActive || !spotlightConfig?.selector) {
      setSpotlightRect(null);
      return;
    }

    // Find element to spotlight
    const element = document.querySelector(spotlightConfig.selector);
    if (!element) {
      console.warn(`Spotlight element not found: ${spotlightConfig.selector}`);
      setSpotlightRect(null);
      return;
    }

    // Get element position
    const rect = element.getBoundingClientRect();
    setSpotlightRect(rect);

    // Calculate tooltip position
    const offset = spotlightConfig.offset || 20;
    let top = 0;
    let left = 0;

    switch (spotlightConfig.position) {
      case 'right':
        top = rect.top + rect.height / 2;
        left = rect.right + offset;
        break;
      case 'left':
        top = rect.top + rect.height / 2;
        left = rect.left - offset;
        break;
      case 'bottom':
        top = rect.bottom + offset;
        left = rect.left + rect.width / 2;
        break;
      case 'top':
        top = rect.top - offset;
        left = rect.left + rect.width / 2;
        break;
    }

    setTooltipPosition({ top, left });
  }, [config.tourActive, config.currentTourStep, spotlightConfig]);

  // Don't render if tour is not active
  if (!config.tourActive) {
    return null;
  }

  // Don't render spotlight for summary step (no specific element)
  if (!spotlightRect) {
    return null;
  }

  const padding = 8; // Padding around spotlighted element

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 pointer-events-none"
        style={{ isolation: 'isolate' }}
      >
        {/* Dark overlay with cutout */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        >
          <defs>
            <mask id="spotlight-mask">
              {/* White background (visible) */}
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              
              {/* Black cutout (transparent) with rounded corners */}
              <rect
                x={spotlightRect.left - padding}
                y={spotlightRect.top - padding}
                width={spotlightRect.width + padding * 2}
                height={spotlightRect.height + padding * 2}
                rx="12"
                fill="black"
              />
            </mask>
          </defs>
          
          {/* Dark overlay */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="black"
            fillOpacity="0.7"
            mask="url(#spotlight-mask)"
          />
        </svg>

        {/* Spotlight glow */}
        <div
          className="absolute rounded-xl pointer-events-none"
          style={{
            left: spotlightRect.left - padding,
            top: spotlightRect.top - padding,
            width: spotlightRect.width + padding * 2,
            height: spotlightRect.height + padding * 2,
            boxShadow: '0 0 0 2px rgba(31, 209, 178, 0.5), 0 0 40px rgba(31, 209, 178, 0.3)',
          }}
        />

        {/* Tooltip card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="absolute pointer-events-auto"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform: getTooltipTransform(spotlightConfig.position),
          }}
        >
          <div className="rounded-xl border bg-card shadow-2xl p-6 space-y-4 max-w-sm">
            {/* Feature name */}
            <div className="flex items-start gap-2">
              <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <h3 className="text-lg font-semibold">{currentStep.title}</h3>
            </div>

            {/* Key benefit */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {currentStep.description}
              </p>
              <div className="rounded-lg bg-primary/10 p-4">
                <p className="text-sm font-medium text-primary">
                  {currentStep.benefit}
                </p>
              </div>
            </div>

            {/* Magic message */}
            <div className="pt-2 border-t">
              <p className="text-sm italic text-muted-foreground">
                "This is where the magic happens"
              </p>
            </div>

            {/* Try it button */}
            <Button className="w-full gap-2" size="sm">
              Try it
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Helper function to calculate tooltip transform based on position
function getTooltipTransform(position?: 'top' | 'right' | 'bottom' | 'left'): string {
  switch (position) {
    case 'right':
      return 'translateY(-50%)';
    case 'left':
      return 'translate(-100%, -50%)';
    case 'bottom':
      return 'translateX(-50%)';
    case 'top':
      return 'translate(-50%, -100%)';
    default:
      return 'translateY(-50%)';
  }
}
