import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import {
  Lightbulb,
  MessageSquare,
  ClipboardList,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Circle,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

export type ToolStatus = 'not-started' | 'in-progress' | 'needs-review' | 'done';
export type FilterOption = 'all' | 'action-required' | 'completed' | 'not-started';

interface ResearchTool {
  id: string;
  name: string;
  shortName: string;
  icon: any;
  status: ToolStatus;
  statusMeta?: {
    count?: number;
    message?: string;
    lastUpdated?: string;
  };
}

interface ResearchToolNavProps {
  tools: ResearchTool[];
  activeToolId?: string | null;
  onToolClick: (toolId: string) => void;
  isCollapsed?: boolean;
}

export function ResearchToolNav({ 
  tools, 
  activeToolId, 
  onToolClick,
  isCollapsed = false 
}: ResearchToolNavProps) {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate counts for each filter
  const counts = {
    all: tools.length,
    'action-required': tools.filter(t => 
      t.status === 'in-progress' || t.status === 'needs-review'
    ).length,
    completed: tools.filter(t => t.status === 'done').length,
    'not-started': tools.filter(t => t.status === 'not-started').length
  };

  // Sort tools by priority
  const sortedTools = [...tools].sort((a, b) => {
    const priority = {
      'needs-review': 1,
      'in-progress': 2,
      'not-started': 3,
      'done': 4
    };
    return priority[a.status] - priority[b.status];
  });

  // Filter tools based on selected filter
  const filteredTools = sortedTools.filter(tool => {
    switch (filter) {
      case 'action-required':
        return tool.status === 'in-progress' || tool.status === 'needs-review';
      case 'completed':
        return tool.status === 'done';
      case 'not-started':
        return tool.status === 'not-started';
      default:
        return true;
    }
  });

  const getStatusIndicator = (status: ToolStatus) => {
    switch (status) {
      case 'needs-review':
        return {
          icon: AlertTriangle,
          color: 'text-amber-600 dark:text-amber-500',
          bgColor: 'bg-amber-600 dark:bg-amber-500',
          pulse: false
        };
      case 'in-progress':
        return {
          icon: Circle,
          color: 'text-orange-600 dark:text-orange-500',
          bgColor: 'bg-orange-600 dark:bg-orange-500',
          pulse: true
        };
      case 'done':
        return {
          icon: CheckCircle,
          color: 'text-green-600 dark:text-green-500',
          bgColor: 'bg-green-600 dark:bg-green-500',
          pulse: false
        };
      default: // not-started
        return {
          icon: Circle,
          color: 'text-gray-400 dark:text-gray-600',
          bgColor: 'bg-gray-400 dark:bg-gray-600',
          pulse: false
        };
    }
  };

  const getStatusBadge = (status: ToolStatus) => {
    switch (status) {
      case 'needs-review':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 text-xs">Needs Review</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/20 dark:text-orange-400 text-xs">In Progress</Badge>;
      default:
        return null;
    }
  };

  const getToolOpacity = (status: ToolStatus) => {
    return status === 'done' ? 'opacity-70' : 'opacity-100';
  };

  const getToolFontWeight = (status: ToolStatus, isActive: boolean) => {
    if (isActive) return 'font-semibold';
    return status === 'in-progress' || status === 'needs-review' ? 'font-medium' : 'font-normal';
  };

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <div className="space-y-1">
          {sortedTools.map(tool => {
            const ToolIcon = tool.icon;
            const statusInfo = getStatusIndicator(tool.status);
            const StatusIcon = statusInfo.icon;
            const isActive = activeToolId === tool.id;

            return (
              <Tooltip key={tool.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-center px-2 relative"
                    onClick={() => onToolClick(tool.id)}
                  >
                    <ToolIcon className="h-4 w-4" />
                    {/* Status indicator dot */}
                    <div className={`absolute top-1 right-1 h-2 w-2 rounded-full ${statusInfo.bgColor} ${statusInfo.pulse ? 'animate-pulse' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="w-64">
                  <div>
                    <p className="font-medium">{tool.name}</p>
                    {tool.statusMeta?.message && (
                      <p className="text-xs text-muted-foreground mt-1">{tool.statusMeta.message}</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    );
  }

  return (
    <div className="space-y-2">
      {/* Section Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-muted/50 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Research Tools</span>
          {counts['action-required'] > 0 && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400 text-xs px-1.5 py-0">
              {counts['action-required']}
            </Badge>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-3 w-3 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <>
          {/* Filter Chips */}
          <div className="px-2 pb-2 space-y-1">
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setFilter('all')}
                className={`px-2 py-1.5 rounded-lg text-xs transition-colors ${
                  filter === 'all'
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                All ({counts.all})
              </button>
              <button
                onClick={() => setFilter('action-required')}
                className={`px-2 py-1.5 rounded-lg text-xs transition-colors ${
                  filter === 'action-required'
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                Action ({counts['action-required']})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-2 py-1.5 rounded-lg text-xs transition-colors ${
                  filter === 'completed'
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                Done ({counts.completed})
              </button>
              <button
                onClick={() => setFilter('not-started')}
                className={`px-2 py-1.5 rounded-lg text-xs transition-colors ${
                  filter === 'not-started'
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                Not Started ({counts['not-started']})
              </button>
            </div>
          </div>

          {/* Tool List */}
          <div className="space-y-0.5">
            {filteredTools.length === 0 ? (
              <div className="px-2 py-4 text-center">
                <p className="text-xs text-muted-foreground">No tools in this state</p>
                <button
                  onClick={() => setFilter('all')}
                  className="text-xs text-primary hover:underline mt-1"
                >
                  View all tools
                </button>
              </div>
            ) : (
              filteredTools.map(tool => {
                const ToolIcon = tool.icon;
                const statusInfo = getStatusIndicator(tool.status);
                const StatusIcon = statusInfo.icon;
                const isActive = activeToolId === tool.id;

                return (
                  <TooltipProvider key={tool.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onToolClick(tool.id)}
                          className={`w-full flex items-center justify-between px-2 py-2 rounded-lg transition-all ${
                            isActive 
                              ? 'bg-secondary' 
                              : 'hover:bg-muted/50'
                          } ${getToolOpacity(tool.status)}`}
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {/* Status Icon */}
                            <StatusIcon className={`h-3.5 w-3.5 shrink-0 ${statusInfo.color} ${statusInfo.pulse ? 'animate-pulse' : ''}`} />
                            
                            {/* Tool Icon & Name */}
                            <ToolIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <span className={`text-sm truncate ${getToolFontWeight(tool.status, isActive)}`}>
                              {tool.shortName}
                            </span>
                          </div>

                          {/* Status Badge */}
                          <div className="shrink-0">
                            {getStatusBadge(tool.status)}
                          </div>
                        </button>
                      </TooltipTrigger>
                      {tool.statusMeta?.message && (
                        <TooltipContent side="right" className="max-w-xs">
                          <div className="space-y-1">
                            <p className="text-xs font-medium">{tool.name}</p>
                            <p className="text-xs text-muted-foreground">{tool.statusMeta.message}</p>
                            {tool.statusMeta.lastUpdated && (
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Updated {tool.statusMeta.lastUpdated}
                              </p>
                            )}
                          </div>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}