import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Sparkles,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type InsightType = 'survey' | 'analysis' | 'interview' | 'report' | 'statistic';
export type InsertMode = 'inline' | 'quote' | 'visualization' | 'ai-adapted';
export type InsertLocation = 'cursor' | 'ai-best';

export interface ResearchInsight {
  id: string;
  type: InsightType;
  text: string;
  fullText?: string;
  source: string;
  relevance?: number;
  used?: boolean;
}

interface InsertInsightPopoverProps {
  insight: ResearchInsight;
  isOpen: boolean;
  onClose: () => void;
  onInsert: (mode: InsertMode, location: InsertLocation) => void;
  position?: { x: number; y: number };
}

export function InsertInsightPopover({
  insight,
  isOpen,
  onClose,
  onInsert,
  position,
}: InsertInsightPopoverProps) {
  const [selectedMode, setSelectedMode] = useState<InsertMode>('inline');
  const [insertLocation, setInsertLocation] = useState<InsertLocation>('ai-best');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const getTypeIcon = (type: InsightType) => {
    switch (type) {
      case 'survey':
      case 'statistic':
        return BarChart3;
      case 'analysis':
      case 'report':
        return FileText;
      case 'interview':
        return MessageSquare;
      default:
        return FileText;
    }
  };

  const getTypeBadgeStyles = (type: InsightType) => {
    switch (type) {
      case 'survey':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      case 'analysis':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'interview':
        return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'report':
        return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
      case 'statistic':
        return 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleInsert = async () => {
    if (selectedMode === 'ai-adapted' && insertLocation === 'ai-best') {
      setIsProcessing(true);
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsProcessing(false);
    }
    onInsert(selectedMode, insertLocation);
    onClose();
  };

  const TypeIcon = getTypeIcon(insight.type);

  const insertModes = [
    {
      id: 'inline' as InsertMode,
      icon: FileText,
      title: 'As inline text',
      description: 'Insert the statistic naturally into your content',
      preview: `According to our research, ${insight.fullText || insight.text}`,
    },
    {
      id: 'quote' as InsertMode,
      icon: MessageSquare,
      title: 'As a quote block',
      description: 'Insert as a highlighted callout or blockquote',
      preview: insight.fullText || insight.text,
    },
    {
      id: 'visualization' as InsertMode,
      icon: BarChart3,
      title: 'As data visualization',
      description: 'Create a simple stat graphic for the content',
      preview: null, // Will show visual preview
    },
    {
      id: 'ai-adapted' as InsertMode,
      icon: Sparkles,
      title: 'AI-adapted text',
      description: 'Let AI naturally weave this into your existing content',
      preview: null, // Will show AI processing
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Popover */}
      <div
        className="fixed z-50 bg-background rounded-2xl shadow-xl border w-[400px] max-h-[600px] overflow-y-auto"
        style={{
          left: position?.x ? `${position.x}px` : '50%',
          top: position?.y ? `${position.y}px` : '50%',
          transform: position ? 'translate(-50%, -100%)' : 'translate(-50%, -50%)',
        }}
      >
        {/* Header */}
        <div className="p-4 border-b">
          <h3 className="font-semibold">Insert Research Insight</h3>
        </div>

        {/* Insight Preview */}
        <div className="p-4 border-b bg-muted/30">
          <div className="flex items-center gap-2 mb-2">
            <TypeIcon className="h-4 w-4 text-muted-foreground" />
            <Badge className={cn('rounded-full text-xs', getTypeBadgeStyles(insight.type))}>
              {insight.type}
            </Badge>
          </div>
          <p className="text-sm mb-2">&ldquo;{insight.fullText || insight.text}&rdquo;</p>
          <p className="text-xs text-muted-foreground">
            Source: {insight.source}
          </p>
        </div>

        {/* Insert Options */}
        <div className="p-4">
          <p className="text-sm font-medium mb-3">How would you like to insert this?</p>
          
          <div className="space-y-3">
            {insertModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={cn(
                  'w-full text-left p-3 rounded-xl border-2 transition-all',
                  selectedMode === mode.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-muted/50'
                )}
              >
                <div className="flex items-start gap-3">
                  <mode.icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium mb-1">{mode.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {mode.description}
                    </p>

                    {/* Preview */}
                    {mode.preview && mode.id === 'inline' && (
                      <div className="bg-muted/50 rounded-lg p-2 mt-2">
                        <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                        <p className="text-xs italic">{mode.preview}</p>
                      </div>
                    )}

                    {mode.id === 'quote' && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                        <div className="border-l-4 border-primary bg-muted/30 p-3 rounded-r-lg">
                          <p className="text-sm italic">&ldquo;{mode.preview}&rdquo;</p>
                          <p className="text-xs text-muted-foreground mt-1">— {insight.source}</p>
                        </div>
                      </div>
                    )}

                    {mode.id === 'visualization' && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 text-center border border-primary/20">
                          <div className="text-3xl font-bold text-primary mb-1">
                            {insight.text.match(/\d+%/)?.[0] || '78%'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {insight.text.split(/\d+%/)[1]?.trim().slice(0, 30) || 'value performance'}
                          </div>
                        </div>
                      </div>
                    )}

                    {mode.id === 'ai-adapted' && (
                      <div className="bg-muted/50 rounded-lg p-2 mt-2">
                        <p className="text-xs text-muted-foreground">
                          AI will find the best place and phrasing to incorporate this insight while maintaining your content flow.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Insert Location */}
        <div className="p-4 border-t bg-muted/30">
          <p className="text-sm font-medium mb-2">Insert at:</p>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="location"
                value="cursor"
                checked={insertLocation === 'cursor'}
                onChange={() => setInsertLocation('cursor')}
                className="w-4 h-4"
              />
              <span className="text-sm">Cursor position</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="location"
                value="ai-best"
                checked={insertLocation === 'ai-best'}
                onChange={() => setInsertLocation('ai-best')}
                className="w-4 h-4"
              />
              <span className="text-sm">Best location (AI)</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t flex items-center justify-between">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleInsert} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              selectedMode === 'ai-adapted' ? 'Generate & Insert' : 'Insert Here'
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
