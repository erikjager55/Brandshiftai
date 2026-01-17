import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Users, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2,
  Clock,
  Circle,
  Target,
  Sparkles
} from 'lucide-react';
import { Persona, ResearchMethod } from '../../types/persona';
import { QualityBadge } from '../quality/QualityBadge';
import { calculateQualityScore } from '../../constants/quality-system';

interface EnhancedPersonaCardProps {
  persona: Persona;
  onClick?: (persona: Persona) => void;
  onMethodClick?: (personaId: string, method: ResearchMethod, mode: 'work' | 'results') => void;
}

const researchMethodIcons = {
  'interviews': MessageSquare,
  'surveys': ClipboardList,
  'user-testing': TestTube,
  'analytics': BarChart3,
  'observations': Telescope
};

const getMethodLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'interviews': 'Interviews',
    'surveys': 'Surveys',
    'user-testing': 'User Testing',
    'analytics': 'Analytics',
    'observations': 'Observations'
  };
  return labels[type] || type;
};

// Helper: Map persona status to ValidationMethodStatus
const mapPersonaStatus = (status: string): ValidationMethodStatus => {
  switch (status) {
    case 'completed': return 'completed';
    case 'in-progress': return 'running';
    case 'not-started': return 'available';
    default: return 'available';
  }
};

function PersonaMethodCard({ 
  method, 
  onWorkClick, 
  onResultsClick 
}: { 
  method: ResearchMethod;
  onWorkClick: () => void;
  onResultsClick: () => void;
}) {
  const methodLabel = getMethodLabel(method.type);
  
  // State 1: Completed/Validated (Green solid background)
  if (method.status === 'completed') {
    // Determine button label based on method type
    const buttonLabel = method.type === 'ai-exploration' ? 'View Analysis' : 'View Results';
    
    return (
      <div
        className="flex items-center justify-between gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-green-900 dark:text-green-100">
              Validated by {methodLabel}
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-0.5">
              Research complete • High confidence
            </div>
          </div>
        </div>
        <button
          className="h-8 px-3 text-xs text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-md transition-colors font-medium"
          onClick={(e) => {
            e.stopPropagation();
            onResultsClick();
          }}
        >
          {buttonLabel}
        </button>
      </div>
    );
  }
  
  // State 2: In Progress (Blue outline with subtle background)
  if (method.status === 'in-progress') {
    const progress = method.progress || 45; // Default progress
    
    return (
      <div
        className="flex items-center justify-between gap-3 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-800"
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
            <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Running {methodLabel} ({progress}%)
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
              Active research • Data collecting
            </div>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-8 px-3 text-xs border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
          onClick={(e) => {
            e.stopPropagation();
            onWorkClick();
          }}
        >
          Continue
        </Button>
      </div>
    );
  }
  
  // State 3: Available/Not Started (Gray dashed outline)
  return (
    <div
      className="flex items-center justify-between gap-3 p-3 rounded-lg bg-transparent border border-dashed border-border hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer group"
      onClick={(e) => {
        e.stopPropagation();
        onWorkClick();
      }}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
          <Play className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            Start {methodLabel}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Available • Upgrade persona quality
          </div>
        </div>
      </div>
      <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
    </div>
  );
}

export function EnhancedPersonaCard({ persona, onClick, onMethodClick }: EnhancedPersonaCardProps) {
  const [showMethods, setShowMethods] = useState(false);
  const completedCount = persona.researchMethods.filter(m => m.status === 'completed').length;
  const totalMethods = persona.researchMethods.length;
  
  // Calculate Quality Score based on research completion
  const qualityScore = calculateQualityScore(completedCount, totalMethods);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 50) return 'text-blue-600 dark:text-blue-400';
    return 'text-orange-600 dark:text-orange-400';
  };
  
  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/30';
    if (score >= 50) return 'bg-blue-100 dark:bg-blue-900/30';
    return 'bg-orange-100 dark:bg-orange-900/30';
  };
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
      <CardHeader className="pb-4" onClick={() => onClick?.(persona)}>
        <div className="flex items-start gap-4">
          {/* Persona Avatar or Icon */}
          <div className="relative">
            {persona.avatar ? (
              <img 
                src={persona.avatar} 
                alt={persona.name}
                className="h-12 w-12 rounded-xl object-cover ring-2 ring-background shadow-sm"
              />
            ) : (
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base mb-2 group-hover:text-primary transition-colors">
              {persona.name}
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {/* Quality Score Badge */}
              <QualityBadge
                score={qualityScore}
                completedCount={completedCount}
                totalCount={totalMethods}
                size="sm"
                showIcon={true}
                showScore={true}
                showLabel={false}
                showTooltip={true}
                animated={true}
              />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {persona.tagline}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Demographics Quick View */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pb-3 border-b border-border text-sm">
          <div>
            <div className="text-xs text-muted-foreground">Age</div>
            <div className="font-medium">{persona.demographics.age}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Location</div>
            <div className="font-medium">{persona.demographics.location}</div>
          </div>
        </div>
        
        {/* Validation Methods Section */}
        {persona.researchMethods.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Validation Methods
              </h4>
              <span className="text-xs text-muted-foreground">
                {completedCount}/{totalMethods} validated
              </span>
            </div>
            <div className="space-y-2">
              {persona.researchMethods.map((method, idx) => (
                <ValidationMethodButton
                  key={idx}
                  label={getMethodLabel(method.type)}
                  type={method.type}
                  status={mapPersonaStatus(method.status)}
                  progress={method.progress}
                  onPrimaryClick={method.status === 'completed' 
                    ? () => onMethodClick?.(persona.id, method, 'results')
                    : () => onMethodClick?.(persona.id, method, 'work')
                  }
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Empty state if no methods */}
        {persona.researchMethods.length === 0 && (
          <div className="py-8 text-center border-2 border-dashed border-border rounded-lg">
            <div className="h-10 w-10 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium mb-1">No validation methods yet</p>
            <p className="text-xs text-muted-foreground">
              Start research to improve persona quality
            </p>
          </div>
        )}
        
        {/* Metadata Footer */}
        <div className="pt-3 border-t text-xs text-muted-foreground space-y-1">
          {persona.demographics.occupation && (
            <div>
              Occupation: {persona.demographics.occupation}
            </div>
          )}
          {persona.lastUpdated && (
            <div>
              Last updated: {new Date(persona.lastUpdated).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function EnhancedPersonaCardGrid({
  personas,
  onPersonaClick,
  onMethodClick
}: {
  personas: Persona[];
  onPersonaClick?: (persona: Persona) => void;
  onMethodClick?: (personaId: string, method: ResearchMethod, mode: 'work' | 'results') => void;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {personas.map((persona) => (
        <EnhancedPersonaCard
          key={persona.id}
          persona={persona}
          onClick={onPersonaClick}
          onMethodClick={onMethodClick}
        />
      ))}
    </div>
  );
}