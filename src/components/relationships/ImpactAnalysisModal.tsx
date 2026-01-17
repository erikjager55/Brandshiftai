import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Users,
  Target,
  Zap,
  ArrowRight,
  Palette,
  BookOpen,
  TrendingUp,
  Package,
  Shield
} from 'lucide-react';
import { RelationshipService } from '../../services/RelationshipService';
import { EntityType, ImpactAnalysis } from '../../types/relationship';
import { Separator } from '../ui/separator';

interface ImpactAnalysisModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityType: EntityType;
  entityId: string;
  entityName: string;
  changeType: 'update' | 'delete';
}

export function ImpactAnalysisModal({ 
  open, 
  onClose, 
  onConfirm, 
  entityType, 
  entityId, 
  entityName,
  changeType 
}: ImpactAnalysisModalProps) {
  
  const impact = React.useMemo(() => 
    RelationshipService.getImpactAnalysis(entityType, entityId),
    [entityType, entityId]
  );
  
  const totalAffected = impact.directImpacts + impact.indirectImpacts;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', border: 'border-red-200 dark:border-red-800' };
      case 'high':
        return { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800' };
      case 'medium':
        return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-400', border: 'border-yellow-200 dark:border-yellow-800' };
      default:
        return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', border: 'border-green-200 dark:border-green-800' };
    }
  };

  const riskColors = getRiskColor(impact.riskLevel);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${riskColors.bg}`}>
              <AlertTriangle className={`h-5 w-5 ${riskColors.text}`} />
            </div>
            <div>
              <DialogTitle>Impact Analysis</DialogTitle>
              <DialogDescription>
                {changeType === 'delete' ? 'Deleting' : 'Updating'} "{entityName}"
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Risk Level Alert */}
          {(impact.riskLevel === 'critical' || impact.riskLevel === 'high') && (
            <Alert className={`${riskColors.border} ${riskColors.bg}`}>
              <AlertTriangle className={`h-4 w-4 ${riskColors.text}`} />
              <AlertDescription className="text-foreground">
                <strong className={riskColors.text}>
                  {impact.riskLevel === 'critical' ? 'Critical' : 'High'} Impact Change
                </strong> - This will affect {totalAffected} related {totalAffected === 1 ? 'entity' : 'entities'}. Please review carefully.
              </AlertDescription>
            </Alert>
          )}

          {impact.riskLevel === 'low' && (
            <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-foreground">
                <strong className="text-green-700 dark:text-green-300">Low Impact</strong> - Safe to proceed. Minimal dependencies detected.
              </AlertDescription>
            </Alert>
          )}

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-lg border bg-card">
              <div className="text-2xl font-bold text-foreground">{impact.directImpacts}</div>
              <div className="text-xs text-muted-foreground mt-1">Direct Impacts</div>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <div className="text-2xl font-bold text-foreground">{impact.indirectImpacts}</div>
              <div className="text-xs text-muted-foreground mt-1">Indirect Impacts</div>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <div className="text-2xl font-bold text-foreground">{totalAffected}</div>
              <div className="text-xs text-muted-foreground mt-1">Total Affected</div>
            </div>
          </div>

          {/* Affected Entities Breakdown */}
          {totalAffected > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Affected Entities</h4>
                
                {impact.affectedByType.personas.length > 0 && (
                  <EntityTypeRow
                    icon={Users}
                    label="Personas"
                    count={impact.affectedByType.personas.length}
                    items={impact.affectedByType.personas}
                  />
                )}

                {impact.affectedByType.researchPlans.length > 0 && (
                  <EntityTypeRow
                    icon={Target}
                    label="Research Plans"
                    count={impact.affectedByType.researchPlans.length}
                    items={impact.affectedByType.researchPlans}
                  />
                )}

                {impact.affectedByType.brandAssets.length > 0 && (
                  <EntityTypeRow
                    icon={Palette}
                    label="Brand Assets"
                    count={impact.affectedByType.brandAssets.length}
                    items={impact.affectedByType.brandAssets}
                  />
                )}

                {impact.affectedByType.strategyTools.length > 0 && (
                  <EntityTypeRow
                    icon={Zap}
                    label="Strategy Tools"
                    count={impact.affectedByType.strategyTools.length}
                    items={impact.affectedByType.strategyTools}
                  />
                )}

                {impact.affectedByType.trends.length > 0 && (
                  <EntityTypeRow
                    icon={TrendingUp}
                    label="Market Trends"
                    count={impact.affectedByType.trends.length}
                    items={impact.affectedByType.trends}
                  />
                )}

                {impact.affectedByType.knowledge.length > 0 && (
                  <EntityTypeRow
                    icon={BookOpen}
                    label="Knowledge Library"
                    count={impact.affectedByType.knowledge.length}
                    items={impact.affectedByType.knowledge}
                  />
                )}

                {impact.affectedByType.products.length > 0 && (
                  <EntityTypeRow
                    icon={Package}
                    label="Products & Services"
                    count={impact.affectedByType.products.length}
                    items={impact.affectedByType.products}
                  />
                )}
              </div>
            </>
          )}

          {/* Estimated Time */}
          {impact.estimatedUpdateTime && (
            <>
              <Separator />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>Estimated time to update all affected entities: <strong>{impact.estimatedUpdateTime}</strong></span>
              </div>
            </>
          )}

          {/* Recommendations */}
          {impact.recommendations.length > 0 && (
            <>
              <Separator />
              <div className="p-4 rounded-lg border bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Recommended Actions
                    </p>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
                      {impact.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                      {changeType === 'delete' && (
                        <li className="text-red-600 dark:text-red-400 font-medium">
                          Deletion is permanent - consider archiving instead
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant={impact.riskLevel === 'critical' ? 'destructive' : impact.riskLevel === 'high' ? 'destructive' : 'default'}
            onClick={onConfirm}
          >
            {changeType === 'delete' ? 'Delete Anyway' : 'Continue Update'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Helper component for displaying entity type rows
interface EntityTypeRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count: number;
  items: Array<{ id: string; name: string; strength: string }>;
}

function EntityTypeRow({ icon: Icon, label, count, items }: EntityTypeRowProps) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="space-y-2">
      <div 
        className="flex items-center justify-between p-3 rounded-lg border bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <Badge variant="secondary">{count}</Badge>
      </div>
      
      {expanded && (
        <div className="ml-7 space-y-1">
          {items.map((item, index) => (
            <div key={index} className="text-xs text-muted-foreground flex items-center justify-between py-1">
              <span>• {item.name}</span>
              <Badge variant="outline" className="text-xs ml-2">
                {item.strength}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
