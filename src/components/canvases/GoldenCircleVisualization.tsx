import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Sparkles, Layers, Info } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface GoldenCircleVisualizationProps {
  why: string;
  how: string;
  what: string;
  interactive?: boolean;
}

export function GoldenCircleVisualization({ 
  why, 
  how, 
  what, 
  interactive = true 
}: GoldenCircleVisualizationProps) {
  const [activeCircle, setActiveCircle] = useState<'why' | 'how' | 'what' | null>(null);

  const circles = [
    {
      id: 'why' as const,
      label: 'WHY',
      content: why,
      icon: Target,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      borderColor: 'border-yellow-300 dark:border-yellow-700',
      textColor: 'text-yellow-700 dark:text-yellow-300',
      size: 280,
      description: 'Your Purpose - Why you exist'
    },
    {
      id: 'how' as const,
      label: 'HOW',
      content: how,
      icon: Sparkles,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      borderColor: 'border-purple-300 dark:border-purple-700',
      textColor: 'text-purple-700 dark:text-purple-300',
      size: 380,
      description: 'Your Process - How you do it differently'
    },
    {
      id: 'what' as const,
      label: 'WHAT',
      content: what,
      icon: Layers,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-300 dark:border-green-700',
      textColor: 'text-green-700 dark:text-green-300',
      size: 480,
      description: 'Your Offering - What you deliver'
    }
  ];

  return (
    <div className="w-full">
      {/* SVG Visualization */}
      <div className="relative aspect-square max-w-2xl mx-auto mb-8">
        <svg viewBox="0 0 500 500" className="w-full h-full">
          {/* WHAT - Outer Circle */}
          <motion.circle
            cx="250"
            cy="250"
            r="240"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className={circles[2].textColor}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1, delay: 0 }}
            style={{
              filter: activeCircle === 'what' ? 'drop-shadow(0 0 8px currentColor)' : 'none',
              opacity: activeCircle && activeCircle !== 'what' ? 0.15 : 0.3
            }}
          />

          {/* HOW - Middle Circle */}
          <motion.circle
            cx="250"
            cy="250"
            r="190"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className={circles[1].textColor}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              filter: activeCircle === 'how' ? 'drop-shadow(0 0 8px currentColor)' : 'none',
              opacity: activeCircle && activeCircle !== 'how' ? 0.15 : 0.4
            }}
          />

          {/* WHY - Inner Circle */}
          <motion.circle
            cx="250"
            cy="250"
            r="140"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className={circles[0].textColor}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              filter: activeCircle === 'why' ? 'drop-shadow(0 0 8px currentColor)' : 'none',
              opacity: activeCircle && activeCircle !== 'why' ? 0.15 : 0.5
            }}
          />

          {/* Center filled circles with gradient effect */}
          <defs>
            <radialGradient id="whyGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(251, 191, 36)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(251, 191, 36)" stopOpacity="0.05" />
            </radialGradient>
            <radialGradient id="howGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.03" />
            </radialGradient>
            <radialGradient id="whatGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(52, 211, 153)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="rgb(52, 211, 153)" stopOpacity="0.02" />
            </radialGradient>
          </defs>

          <motion.circle
            cx="250"
            cy="250"
            r="140"
            fill="url(#whyGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />

          <motion.circle
            cx="250"
            cy="250"
            r="190"
            fill="url(#howGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          <motion.circle
            cx="250"
            cy="250"
            r="240"
            fill="url(#whatGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />

          {/* Labels */}
          <motion.text
            x="250"
            y="250"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-current text-yellow-600 dark:text-yellow-400 font-bold text-3xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            WHY
          </motion.text>

          <motion.text
            x="250"
            y="130"
            textAnchor="middle"
            className="fill-current text-purple-600 dark:text-purple-400 font-semibold text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            HOW
          </motion.text>

          <motion.text
            x="250"
            y="60"
            textAnchor="middle"
            className="fill-current text-green-600 dark:text-green-400 font-semibold text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            WHAT
          </motion.text>
        </svg>

        {/* Interactive hover areas */}
        {interactive && (
          <>
            {/* WHY hover area */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28%] h-[28%] rounded-full cursor-pointer"
              onMouseEnter={() => setActiveCircle('why')}
              onMouseLeave={() => setActiveCircle(null)}
            />
            
            {/* HOW hover area (ring) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] h-[38%] rounded-full cursor-pointer"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, 14% 14%, 14% 86%, 86% 86%, 86% 14%, 14% 14%)' }}
              onMouseEnter={() => setActiveCircle('how')}
              onMouseLeave={() => setActiveCircle(null)}
            />
            
            {/* WHAT hover area (outer ring) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48%] h-[48%] rounded-full cursor-pointer"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, 10% 10%, 10% 90%, 90% 90%, 90% 10%, 10% 10%)' }}
              onMouseEnter={() => setActiveCircle('what')}
              onMouseLeave={() => setActiveCircle(null)}
            />
          </>
        )}
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {circles.map((circle) => {
          const Icon = circle.icon;
          const isActive = activeCircle === circle.id;

          return (
            <motion.div
              key={circle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: circle.id === 'why' ? 0.8 : circle.id === 'how' ? 1 : 1.2 }}
            >
              <Card
                className={`transition-all duration-300 ${
                  isActive 
                    ? `border-2 ${circle.borderColor} shadow-lg scale-105` 
                    : 'border hover:border-gray-300 dark:hover:border-gray-700'
                }`}
                onMouseEnter={() => interactive && setActiveCircle(circle.id)}
                onMouseLeave={() => interactive && setActiveCircle(null)}
              >
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${circle.color} flex items-center justify-center shadow-md`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className={`font-bold ${circle.textColor}`}>{circle.label}</h3>
                          <p className="text-xs text-muted-foreground">{circle.description}</p>
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{circle.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${circle.bgColor} border ${circle.borderColor}`}>
                      <p className="text-sm leading-relaxed">{circle.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">The Golden Circle Framework</p>
            <p>Start with <span className="font-semibold text-yellow-600 dark:text-yellow-400">WHY</span> (your purpose), then explain <span className="font-semibold text-purple-600 dark:text-purple-400">HOW</span> (your unique process), and finally <span className="font-semibold text-green-600 dark:text-green-400">WHAT</span> (your products/services).</p>
            {interactive && <p className="text-xs italic">Hover over the circles or cards to highlight each layer</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
