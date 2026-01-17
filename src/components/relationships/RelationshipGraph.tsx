import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Network, 
  Maximize2, 
  AlertTriangle,
  Info,
  ChevronRight,
  Users,
  Target,
  Zap,
  Palette,
  BookOpen,
  TrendingUp,
  Package,
  Plus,
  GitBranch,
  Link2
} from 'lucide-react';
import { RelationshipService } from '../../services/RelationshipService';
import { EntityType, Relationship, RelationType } from '../../types/relationship';
import { Separator } from '../ui/separator';

interface RelationshipGraphProps {
  entityType: EntityType;
  entityId: string;
  entityName: string;
  onNavigate?: (type: EntityType, id: string) => void;
}

export function RelationshipGraph({ 
  entityType, 
  entityId, 
  entityName,
  onNavigate 
}: RelationshipGraphProps) {
  const [viewMode, setViewMode] = useState<'compact' | 'detailed'>('compact');
  
  const relationships = useMemo(() => {
    return RelationshipService.getForEntity(entityType, entityId);
  }, [entityType, entityId]);

  const impactAnalysis = useMemo(() => {
    return RelationshipService.getImpactAnalysis(entityType, entityId);
  }, [entityType, entityId]);

  // Group relationships by type
  const groupedRelationships = useMemo(() => {
    const groups: Record<string, Relationship[]> = {
      personas: [],
      researchPlans: [],
      brandAssets: [],
      strategyTools: [],
      trends: [],
      knowledge: [],
      products: []
    };

    relationships.forEach(rel => {
      // Determine the "other" entity (not the current one)
      const isSource = rel.sourceType === entityType && rel.sourceId === entityId;
      const targetType = isSource ? rel.targetType : rel.sourceType;
      
      if (targetType === 'persona') groups.personas.push(rel);
      if (targetType === 'research-plan') groups.researchPlans.push(rel);
      if (targetType === 'brand-asset') groups.brandAssets.push(rel);
      if (targetType === 'strategy-tool') groups.strategyTools.push(rel);
      if (targetType === 'trend') groups.trends.push(rel);
      if (targetType === 'knowledge') groups.knowledge.push(rel);
      if (targetType === 'product') groups.products.push(rel);
    });

    return groups;
  }, [relationships, entityType, entityId]);

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800';
      case 'high':
        return 'border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800';
      default:
        return 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800';
    }
  };

  const getRiskLevelIcon = (level: string) => {
    if (level === 'critical' || level === 'high') return AlertTriangle;
    return Info;
  };

  const RiskIcon = getRiskLevelIcon(impactAnalysis.riskLevel);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Network className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle>Relationship Map</CardTitle>
              <CardDescription>
                {entityName} is connected to {relationships.length} other {relationships.length === 1 ? 'entity' : 'entities'}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setViewMode(viewMode === 'detailed' ? 'compact' : 'detailed')}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Impact Warning */}
        {(impactAnalysis.riskLevel === 'high' || impactAnalysis.riskLevel === 'critical') && (
          <div className={`mt-4 p-3 rounded-lg border ${getRiskLevelColor(impactAnalysis.riskLevel)}`}>
            <div className="flex items-start gap-2">
              <RiskIcon className="h-5 w-5 mt-0.5 flex-shrink-0 text-orange-600 dark:text-orange-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {impactAnalysis.riskLevel === 'critical' ? 'Critical' : 'High'} Impact Entity
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Changes to this will affect <strong>{impactAnalysis.directImpacts} entities</strong> directly
                  {impactAnalysis.indirectImpacts > 0 && (
                    <> and <strong>{impactAnalysis.indirectImpacts} entities</strong> indirectly</>
                  )}.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Personas Section */}
        {groupedRelationships.personas.length > 0 && (
          <RelationshipSection
            title="Connected Personas"
            icon={Users}
            relationships={groupedRelationships.personas}
            currentEntityType={entityType}
            currentEntityId={entityId}
            onNavigate={onNavigate}
          />
        )}

        {/* Research Plans Section */}
        {groupedRelationships.researchPlans.length > 0 && (
          <RelationshipSection
            title="Research Plans"
            icon={Target}
            relationships={groupedRelationships.researchPlans}
            currentEntityType={entityType}
            currentEntityId={entityId}
            onNavigate={onNavigate}
          />
        )}

        {/* Brand Assets Section */}
        {groupedRelationships.brandAssets.length > 0 && (
          <RelationshipSection
            title="Related Brand Assets"
            icon={Palette}
            relationships={groupedRelationships.brandAssets}
            currentEntityType={entityType}
            currentEntityId={entityId}
            onNavigate={onNavigate}
          />
        )}

        {/* Strategy Tools Section */}
        {groupedRelationships.strategyTools.length > 0 && (
          <RelationshipSection
            title="Strategy Tools"
            icon={Zap}
            relationships={groupedRelationships.strategyTools}
            currentEntityType={entityType}
            currentEntityId={entityId}
            onNavigate={onNavigate}
          />
        )}

        {/* Trends Section */}
        {groupedRelationships.trends.length > 0 && (
          <RelationshipSection
            title="Market Trends"
            icon={TrendingUp}
            relationships={groupedRelationships.trends}
            currentEntityType={entityType}
            currentEntityId={entityId}
            onNavigate={onNavigate}
          />
        )}

        {/* Knowledge Section */}
        {groupedRelationships.knowledge.length > 0 && (
          <RelationshipSection
            title="Knowledge Library"
            icon={BookOpen}
            relationships={groupedRelationships.knowledge}
            currentEntityType={entityType}
            currentEntityId={entityId}
            onNavigate={onNavigate}
          />
        )}

        {/* Products Section */}
        {groupedRelationships.products.length > 0 && (
          <RelationshipSection
            title="Products & Services"
            icon={Package}
            relationships={groupedRelationships.products}
            currentEntityType={entityType}
            currentEntityId={entityId}
            onNavigate={onNavigate}
          />
        )}

        {/* No Relationships */}
        {relationships.length === 0 && (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <GitBranch className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              No relationships detected yet
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Create relationships to see how this entity connects to others
            </p>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Relationship
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Section component for each relationship type
interface RelationshipSectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  relationships: Relationship[];
  currentEntityType: EntityType;
  currentEntityId: string;
  onNavigate?: (type: EntityType, id: string) => void;
}

function RelationshipSection({ 
  title, 
  icon: Icon, 
  relationships, 
  currentEntityType,
  currentEntityId,
  onNavigate 
}: RelationshipSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <h4 className="font-medium text-sm">{title} ({relationships.length})</h4>
      </div>
      <div className="grid gap-2">
        {relationships.map((rel) => (
          <RelationshipCard 
            key={rel.id}
            relationship={rel}
            currentEntityType={currentEntityType}
            currentEntityId={currentEntityId}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}

// Individual relationship card component
interface RelationshipCardProps {
  relationship: Relationship;
  currentEntityType: EntityType;
  currentEntityId: string;
  onNavigate?: (type: EntityType, id: string) => void;
}

function RelationshipCard({ relationship, currentEntityType, currentEntityId, onNavigate }: RelationshipCardProps) {
  // Determine which entity is the "other" one (not the current entity)
  const isSource = relationship.sourceType === currentEntityType && relationship.sourceId === currentEntityId;
  const otherEntityType = isSource ? relationship.targetType : relationship.sourceType;
  const otherEntityId = isSource ? relationship.targetId : relationship.sourceId;
  const otherEntityName = isSource ? relationship.targetName : relationship.sourceName;

  const getRelationshipLabel = (type: RelationType): string => {
    const labels: Record<RelationType, string> = {
      'informs': 'Informs',
      'validates': 'Validates',
      'influences': 'Influences',
      'uses': 'Uses',
      'targets': 'Targets',
      'references': 'References',
      'derives-from': 'Derives From',
      'conflicts-with': 'Conflicts With',
      'supports': 'Supports'
    };
    return labels[type];
  };

  const getStrengthColor = (strength: string): string => {
    if (strength === 'strong') return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
    if (strength === 'medium') return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
    return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
  };

  const getStatusColor = (status: string): string => {
    if (status === 'conflict') return 'border-red-200 bg-red-50 dark:bg-red-900/30';
    if (status === 'proposed') return 'border-blue-200 bg-blue-50 dark:bg-blue-900/30';
    if (status === 'archived') return 'border-gray-200 bg-gray-50 dark:bg-gray-900/30';
    return 'border-border bg-card';
  };

  return (
    <div 
      className={`flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer ${getStatusColor(relationship.status)}`}
      onClick={() => onNavigate?.(otherEntityType, otherEntityId)}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs whitespace-nowrap">
            {getRelationshipLabel(relationship.relationType)}
          </Badge>
          <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate">{otherEntityName}</p>
          {relationship.metadata?.notes && (
            <p className="text-xs text-muted-foreground truncate">{relationship.metadata.notes}</p>
          )}
          {relationship.metadata?.autoGenerated && (
            <div className="flex items-center gap-1 mt-1">
              <Zap className="h-3 w-3 text-blue-500" />
              <span className="text-xs text-blue-600 dark:text-blue-400">AI-suggested</span>
              {relationship.metadata.confidence && (
                <span className="text-xs text-muted-foreground">
                  ({Math.round(relationship.metadata.confidence * 100)}% confidence)
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {relationship.status === 'conflict' && (
          <Badge variant="destructive" className="text-xs">
            Conflict
          </Badge>
        )}
        <Badge variant="outline" className={`text-xs ${getStrengthColor(relationship.strength)}`}>
          {relationship.strength}
        </Badge>
      </div>
    </div>
  );
}
