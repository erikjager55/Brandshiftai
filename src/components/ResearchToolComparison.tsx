import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Bot, PenTool, MessageCircle, ClipboardList, Check, ArrowRight } from 'lucide-react';

interface ResearchToolComparisonProps {
  open: boolean;
  onClose: () => void;
  onSelectTool: (toolType: string) => void;
  completedMethods?: string[];
}

export function ResearchToolComparison({
  open,
  onClose,
  onSelectTool,
  completedMethods = []
}: ResearchToolComparisonProps) {
  const tools = [
    {
      id: 'ai',
      name: 'AI Assistant',
      icon: Bot,
      effort: 'Low',
      effortColor: 'text-green-600 dark:text-green-400',
      time: '15-30 min',
      participants: '1 (you)',
      outputType: 'Quantitative',
      bestFor: 'Initial exploration, quick directional insights',
      strengths: ['Fast results', 'Data-driven', 'No coordination needed'],
      limitations: ['Less depth', 'Requires existing content', 'May miss nuance'],
      recommendedWith: ['Interviews', 'Brainstorm']
    },
    {
      id: 'brainstorm',
      name: 'Brainstorm Session',
      icon: PenTool,
      effort: 'Medium',
      effortColor: 'text-amber-600 dark:text-amber-400',
      time: '1-2 hours',
      participants: '4-8 people',
      outputType: 'Qualitative',
      bestFor: 'Creative alignment, team perspectives',
      strengths: ['Diverse ideas', 'Team buy-in', 'Creative solutions'],
      limitations: ['Needs facilitation', 'Scheduling required', 'Can be unfocused'],
      recommendedWith: ['AI Assistant', 'Survey']
    },
    {
      id: 'interview',
      name: 'Stakeholder Interviews',
      icon: MessageCircle,
      effort: 'High',
      effortColor: 'text-red-600 dark:text-red-400',
      time: '3-5 hours',
      participants: '5-10 people',
      outputType: 'Qualitative',
      bestFor: 'Deep understanding, stakeholder nuance',
      strengths: ['Rich insights', 'Personal stories', 'High confidence'],
      limitations: ['Time intensive', '1-on-1 scheduling', 'Analysis needed'],
      recommendedWith: ['Survey', 'AI Assistant']
    },
    {
      id: 'survey',
      name: 'Online Survey',
      icon: ClipboardList,
      effort: 'Medium',
      effortColor: 'text-amber-600 dark:text-amber-400',
      time: '2-3 hours',
      participants: '20-100+ people',
      outputType: 'Quantitative',
      bestFor: 'Scaled validation, broad stakeholder input',
      strengths: ['Large sample', 'Statistical validation', 'Async participation'],
      limitations: ['Less depth', 'Survey design needed', 'Response rates vary'],
      recommendedWith: ['Interviews', 'Brainstorm']
    }
  ];

  const isCompleted = (toolId: string) => completedMethods.includes(toolId);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compare Validation Methods</DialogTitle>
          <DialogDescription>
            Choose the methods that best fit your goals. Combining qualitative and quantitative approaches
            strengthens strategic confidence.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const completed = isCompleted(tool.id);

              return (
                <div
                  key={tool.id}
                  className={`border rounded-lg p-4 space-y-4 ${
                    completed ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' : 'bg-card'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    {completed && (
                      <Badge className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-900/30 border">
                        <Check className="h-3 w-3 mr-1" />
                        Done
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground">{tool.bestFor}</p>
                  </div>

                  {/* Key Specs */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Effort:</span>
                      <span className={`font-medium ${tool.effortColor}`}>{tool.effort}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">{tool.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Participants:</span>
                      <span className="font-medium">{tool.participants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Output:</span>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          tool.outputType === 'Qualitative'
                            ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                            : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                        }`}
                      >
                        {tool.outputType}
                      </Badge>
                    </div>
                  </div>

                  {/* Strengths */}
                  <div>
                    <p className="text-xs font-medium mb-1.5">Strengths:</p>
                    <ul className="space-y-1">
                      {tool.strengths.map((strength, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <span className="text-green-500 mt-0.5">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Combinations */}
                  <div>
                    <p className="text-xs font-medium mb-1.5">Combines well with:</p>
                    <div className="flex flex-wrap gap-1">
                      {tool.recommendedWith.map((rec, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {rec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full"
                    size="sm"
                    variant={completed ? 'outline' : 'default'}
                    onClick={() => {
                      onSelectTool(tool.id);
                      onClose();
                    }}
                  >
                    {completed ? 'Run Again' : 'Start This Method'}
                    <ArrowRight className="h-3.5 w-3.5 ml-2" />
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Best Practices */}
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-sm">Best Practice Combinations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <p className="font-medium mb-1">Quick Validation (Foundation)</p>
                <p className="text-muted-foreground">AI Assistant → Get directional insights fast</p>
              </div>
              <div>
                <p className="font-medium mb-1">Balanced Approach (Standard)</p>
                <p className="text-muted-foreground">AI + Brainstorm or AI + Survey → Validate with team/stakeholders</p>
              </div>
              <div>
                <p className="font-medium mb-1">Comprehensive Strategy (Strategic)</p>
                <p className="text-muted-foreground">AI + Interviews + Survey → Multi-angle validation with depth and scale</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}