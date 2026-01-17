import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Lock, 
  Play, 
  Sparkles,
  MessageSquare,
  Users,
  ClipboardList,
  Target,
  Plus,
  ArrowRight,
  FileText
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  SPACING, 
  TYPOGRAPHY, 
  ICON_SIZES, 
  ICON_CONTAINERS,
  COLORS,
  BADGE_VARIANTS,
  BUTTON_VARIANTS,
  cn 
} from '../../constants/design-system';
import { CardStatus } from '../unified/design-system';
import { ResearchMethodStatus } from '../../types/persona';

// ============================================================================
// TYPES
// ============================================================================

export interface ResearchMethod {
  id: string;
  name: string;
  description: string;
  status: ResearchMethodStatus;
  progress?: number; // 0-100 for running methods
  confidence?: string; // e.g. "High confidence" for completed
  artifactCount?: number;
  icon: React.ComponentType<any>;
  unlockLevel?: 'free' | 'basic'; // Optional unlock level
  impact?: string; // Optional impact level
  duration?: string; // Optional duration
  unlocksPotential?: number; // Optional unlock percentage
}

export interface PersonaResearchValidationPanelProps {
  // Progress header data
  completedCount: number;
  totalCount: number;
  lastUpdated?: string;
  
  // Research methods data
  methods: ResearchMethod[];
  
  // Callbacks
  onMethodClick?: (methodId: string) => void;
  onStartMethod?: (methodId: string) => void;
  onContinueMethod?: (methodId: string) => void;
  onViewResults?: (methodId: string) => void;
  
  // Optional customization
  className?: string;
  showArtifactCounts?: boolean;
}

// ============================================================================
// STATUS CONFIGURATIONS (aligned with Persona ResearchMethodStatus type)
// ============================================================================

const STATUS_CONFIG: Record<ResearchMethodStatus, {
  containerClasses: string;
  iconContainerClasses: string;
  textColor: string;
  primaryAction?: { label: string; variant: 'default' | 'outline' | 'ghost' };
  secondaryAction?: { label: string; icon: React.ComponentType<any> };
}> = {
  'not-started': {
    containerClasses: 'bg-[#1FD1B2]/5 border-2 border-dashed border-[#1FD1B2]/30 hover:border-[#1FD1B2]/50 transition-all',
    iconContainerClasses: 'bg-[#1FD1B2]/10',
    textColor: 'text-[#1FD1B2]',
    primaryAction: { label: 'Start', variant: 'outline' },
    secondaryAction: { label: 'Start', icon: Plus },
  },
  'in-progress': {
    containerClasses: 'bg-blue-50/50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-800',
    iconContainerClasses: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600',
    primaryAction: { label: 'Continue', variant: 'default' },
  },
  'completed': {
    containerClasses: 'bg-green-50/50 dark:bg-green-900/10 border-2 border-green-200 dark:border-green-800',
    iconContainerClasses: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600',
    primaryAction: { label: 'View Results', variant: 'ghost' },
  },
  'cancelled': {
    containerClasses: 'bg-muted/30 border-2 border-dashed border-border opacity-60',
    iconContainerClasses: 'bg-muted',
    textColor: 'text-muted-foreground',
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function PersonaResearchValidationPanel({
  completedCount,
  totalCount,
  lastUpdated,
  methods,
  onMethodClick,
  onStartMethod,
  onContinueMethod,
  onViewResults,
  className,
  showArtifactCounts = true,
}: PersonaResearchValidationPanelProps) {
  
  // Calculate progress percentage
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  // ============================================================================
  // ZONE 1: PROGRESS HEADER
  // ============================================================================
  
  const renderProgressHeader = () => (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className={cn(TYPOGRAPHY.sectionTitle, 'mb-1')}>
          Validation Methods
        </h3>
        <p className={TYPOGRAPHY.metadata}>
          {completedCount}/{totalCount} validated
          {lastUpdated && <span className="ml-2">• Last updated {lastUpdated}</span>}
        </p>
      </div>
      
      {/* Progress indicator */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className={cn(TYPOGRAPHY.statSmall, COLORS.status.success.text)}>
            {completedCount}/{totalCount}
          </div>
          <p className={TYPOGRAPHY.caption}>validated</p>
        </div>
      </div>
    </div>
  );
  
  // ============================================================================
  // ZONE 2-5: RESEARCH METHOD ITEM (contains status, indicators, actions, artifacts)
  // ============================================================================
  
  const renderMethodItem = (method: ResearchMethod) => {
    // Defensive: ensure status exists in config, fallback to 'not-started'
    const status = method.status in STATUS_CONFIG ? method.status : 'not-started';
    const config = STATUS_CONFIG[status];
    const Icon = method.icon;
    
    // Determine primary action handler
    const handlePrimaryAction = () => {
      if (status === 'not-started' && onStartMethod) {
        onStartMethod(method.id);
      } else if (status === 'in-progress' && onContinueMethod) {
        onContinueMethod(method.id);
      } else if (status === 'completed' && onViewResults) {
        onViewResults(method.id);
      } else if (onMethodClick) {
        onMethodClick(method.id);
      }
    };
    
    return (
      <div
        key={method.id}
        className={cn(
          'rounded-xl transition-all',
          SPACING.card.padding,
          config.containerClasses,
          status !== 'cancelled' && 'cursor-pointer',
        )}
        onClick={status !== 'cancelled' ? handlePrimaryAction : undefined}
      >
        <div className="flex items-start justify-between gap-4">
          {/* Left side: Icon + Content */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* ICON CONTAINER */}
            <div className={cn(ICON_CONTAINERS.large, config.iconContainerClasses)}>
              {status === 'cancelled' ? (
                <Lock className={cn(ICON_SIZES.lg, 'text-muted-foreground')} />
              ) : (
                <Icon className={cn(ICON_SIZES.lg, config.textColor)} />
              )}
            </div>
            
            {/* CONTENT */}
            <div className="flex-1 min-w-0">
              {/* Method name */}
              <h4 className={cn(TYPOGRAPHY.cardTitle, 'mb-1')}>
                {method.name}
              </h4>
              
              {/* ZONE 3: STATUS & IMPACT INDICATORS */}
              <div className="flex items-center gap-2 mb-2">
                {/* Unlock level badge */}
                {method.unlockLevel === 'free' && (
                  <Badge className="bg-[#1FD1B2] text-white px-2 py-0 text-xs font-semibold">
                    FREE
                  </Badge>
                )}
                {method.unlockLevel === 'basic' && (
                  <Badge variant="outline" className="border px-2 py-0 text-xs">
                    <Lock className={cn(ICON_SIZES.xs, 'mr-1')} />
                    Basic
                  </Badge>
                )}
                
                {/* Status badge */}
                {status === 'completed' && method.confidence && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-300">
                    <CheckCircle2 className={cn(ICON_SIZES.xs, 'mr-1')} />
                    {method.confidence}
                  </Badge>
                )}
                
                {status === 'in-progress' && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-300">
                    <Clock className={cn(ICON_SIZES.xs, 'mr-1')} />
                    Active research
                  </Badge>
                )}
                
                {status === 'not-started' && (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-300">
                    Available
                  </Badge>
                )}
                
                {status === 'cancelled' && (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-gray-200">
                    <Lock className={cn(ICON_SIZES.xs, 'mr-1')} />
                    Locked
                  </Badge>
                )}
                
                {/* ZONE 6: ARTIFACT COUNTER */}
                {showArtifactCounts && method.artifactCount !== undefined && method.artifactCount > 0 && (
                  <Badge variant="outline" className="gap-1">
                    <FileText className={ICON_SIZES.xs} />
                    {method.artifactCount}
                  </Badge>
                )}
              </div>
              
              {/* Description */}
              <p className={cn(TYPOGRAPHY.bodySmall, COLORS.status.neutral.text)}>
                {method.description}
              </p>
              
              {/* Progress bar for running methods */}
              {status === 'in-progress' && method.progress !== undefined && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className={TYPOGRAPHY.caption}>Progress</span>
                    <span className={cn(TYPOGRAPHY.caption, TYPOGRAPHY.emphasis)}>
                      {method.progress}%
                    </span>
                  </div>
                  <Progress value={method.progress} className="h-2" />
                </div>
              )}
            </div>
          </div>
          
          {/* ZONE 4: PRIMARY & SECONDARY ACTIONS */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {status === 'not-started' && config.secondaryAction && (
              <Button
                variant="ghost"
                size="icon"
                className={cn('rounded-lg', config.textColor)}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrimaryAction();
                }}
              >
                <config.secondaryAction.icon className={ICON_SIZES.lg} />
              </Button>
            )}
            
            {config.primaryAction && status !== 'cancelled' && (
              <Button
                variant={config.primaryAction.variant}
                size="sm"
                className={status === 'completed' ? cn('text-green-600 hover:text-green-700') : ''}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrimaryAction();
                }}
              >
                {config.primaryAction.label}
                {status === 'completed' && (
                  <ArrowRight className={cn(ICON_SIZES.sm, 'ml-1')} />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <div className={cn(className)}>
      {/* ZONE 1: Progress Header */}
      {renderProgressHeader()}
      
      {/* ZONES 2-6: Methods List */}
      <div className={SPACING.section.gap}>
        {methods.map(renderMethodItem)}
      </div>
    </div>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default PersonaResearchValidationPanel;