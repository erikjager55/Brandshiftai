import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Sparkles,
  Target,
  Users,
  TrendingUp,
  AlertTriangle,
  Info,
  Link2,
  Award,
  X,
  Lightbulb
} from 'lucide-react';
import { SmartSuggestionsService } from '../../services/SmartSuggestionsService';
import { Suggestion } from '../../types/relationship';

interface SmartSuggestionsPanelProps {
  onNavigate: (url: string) => void;
  maxSuggestions?: number;
}

export function SmartSuggestionsPanel({ onNavigate, maxSuggestions = 5 }: SmartSuggestionsPanelProps) {
  const [dismissedIds, setDismissedIds] = React.useState<Set<string>>(new Set());
  
  const allSuggestions = React.useMemo(() => {
    return SmartSuggestionsService.getSuggestions();
  }, []);

  const suggestions = allSuggestions
    .filter(s => !dismissedIds.has(s.id))
    .slice(0, maxSuggestions);

  const handleDismiss = (suggestionId: string) => {
    setDismissedIds(prev => new Set([...prev, suggestionId]));
    SmartSuggestionsService.dismissSuggestion(suggestionId);
  };

  if (suggestions.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-3" />
          <p className="font-medium">You're all caught up!</p>
          <p className="text-sm text-muted-foreground mt-1">
            No immediate suggestions at this time.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <CardTitle className="text-lg">Smart Suggestions</CardTitle>
          </div>
          <Badge variant="secondary">{suggestions.length}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {suggestions.map((suggestion) => (
          <SuggestionCard 
            key={suggestion.id}
            suggestion={suggestion}
            onAction={() => onNavigate(suggestion.actionUrl)}
            onDismiss={suggestion.dismissible !== false ? () => handleDismiss(suggestion.id) : undefined}
          />
        ))}
      </CardContent>
    </Card>
  );
}

interface SuggestionCardProps {
  suggestion: Suggestion;
  onAction: () => void;
  onDismiss?: () => void;
}

function SuggestionCard({ suggestion, onAction, onDismiss }: SuggestionCardProps) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      Sparkles,
      Target,
      Users,
      TrendingUp,
      AlertTriangle,
      Info,
      Link2,
      Award,
      CheckCircle,
      Clock
    };
    return icons[iconName] || Sparkles;
  };

  const Icon = getIcon(suggestion.icon);
  
  const priorityColors = {
    critical: 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800',
    high: 'border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800',
    medium: 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800',
    low: 'border-gray-200 bg-gray-50 dark:bg-gray-900/20 dark:border-gray-800'
  };

  const priorityTextColors = {
    critical: 'text-red-900 dark:text-red-100',
    high: 'text-orange-900 dark:text-orange-100',
    medium: 'text-blue-900 dark:text-blue-100',
    low: 'text-gray-900 dark:text-gray-100'
  };

  const typeLabels = {
    'next-asset': 'Next Step',
    'relationship': 'Connection',
    'research': 'Research',
    'warning': 'Warning',
    'maintenance': 'Maintenance',
    'opportunity': 'Opportunity'
  };

  const impactColors = {
    high: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300',
    low: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300'
  };

  return (
    <div className={`p-4 rounded-lg border ${priorityColors[suggestion.priority]} relative`}>
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
      
      <div className="flex items-start gap-3 pr-6">
        <div className={`p-2 rounded-lg bg-background`}>
          <Icon className={`h-5 w-5 ${priorityTextColors[suggestion.priority]}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className={`font-medium text-sm ${priorityTextColors[suggestion.priority]}`}>
              {suggestion.title}
            </h4>
            <div className="flex items-center gap-1 flex-shrink-0">
              {suggestion.urgent && (
                <Badge variant="destructive" className="text-xs">Urgent</Badge>
              )}
              <Badge variant="outline" className="text-xs">
                {typeLabels[suggestion.type]}
              </Badge>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">
            {suggestion.description}
          </p>
          
          {suggestion.reasoning && (
            <p className="text-xs text-muted-foreground mb-3 italic flex items-start gap-1">
              <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span>{suggestion.reasoning}</span>
            </p>
          )}
          
          {/* Stats */}
          {suggestion.stats && (
            <div className="flex items-center gap-2 mb-3">
              <div className="px-2 py-1 rounded bg-background border text-xs">
                <span className="text-muted-foreground">{suggestion.stats.label}: </span>
                <span className="font-medium">{suggestion.stats.value}</span>
              </div>
            </div>
          )}

          {/* Related Entities */}
          {suggestion.relatedEntities && suggestion.relatedEntities.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-1">
                Affects {suggestion.relatedEntities.length} {suggestion.relatedEntities.length === 1 ? 'entity' : 'entities'}:
              </p>
              <div className="flex flex-wrap gap-1">
                {suggestion.relatedEntities.slice(0, 3).map((entity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {entity.name}
                  </Badge>
                ))}
                {suggestion.relatedEntities.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{suggestion.relatedEntities.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 flex-wrap">
            <Button size="sm" variant="outline" onClick={onAction}>
              {suggestion.action}
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {suggestion.estimatedTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {suggestion.estimatedTime}
                </span>
              )}
              {suggestion.estimatedImpact && (
                <Badge variant="outline" className={`text-xs ${impactColors[suggestion.estimatedImpact]}`}>
                  {suggestion.estimatedImpact} impact
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact version for sidebars
export function SmartSuggestionsCompact({ onNavigate, maxSuggestions = 3 }: SmartSuggestionsPanelProps) {
  const suggestions = React.useMemo(() => {
    return SmartSuggestionsService.getSuggestions().slice(0, maxSuggestions);
  }, [maxSuggestions]);

  if (suggestions.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-2">
        <Lightbulb className="h-4 w-4 text-yellow-500" />
        <span className="text-sm font-medium">Suggestions</span>
        <Badge variant="secondary" className="ml-auto text-xs">{suggestions.length}</Badge>
      </div>
      
      <div className="space-y-1">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onNavigate(suggestion.actionUrl)}
            className="w-full text-left p-2 rounded-lg hover:bg-accent transition-colors border border-transparent hover:border-border"
          >
            <div className="flex items-start gap-2">
              <div className={`p-1 rounded ${
                suggestion.priority === 'critical' ? 'bg-red-100 dark:bg-red-900/30' :
                suggestion.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/30' :
                suggestion.priority === 'medium' ? 'bg-blue-100 dark:bg-blue-900/30' :
                'bg-gray-100 dark:bg-gray-900/30'
              }`}>
                <Sparkles className="h-3 w-3" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{suggestion.title}</p>
                <p className="text-xs text-muted-foreground truncate">{suggestion.action}</p>
              </div>
              {suggestion.urgent && (
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-1.5" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
