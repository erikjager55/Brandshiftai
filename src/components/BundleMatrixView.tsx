import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  CheckCircle2, 
  Package, 
  Lock,
  ArrowRight,
  Clock,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { ResearchBundle } from '../data/research-bundles';
import { strategyTools } from '../data/strategy-tools';
import { getStrategyToolsUnlockedByBundle } from '../data/research-bundles';

interface BundleMatrixViewProps {
  bundles: ResearchBundle[];
  onSelectBundle: (bundle: ResearchBundle) => void;
}

export function BundleMatrixView({ bundles, onSelectBundle }: BundleMatrixViewProps) {
  // Group bundles by target category
  const bundlesByCategory = bundles.reduce((acc, bundle) => {
    const category = bundle.targetCategory;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(bundle);
    return acc;
  }, {} as Record<string, ResearchBundle[]>);

  const categoryLabels: Record<string, { label: string; icon: string }> = {
    brand: { label: 'Brand', icon: '🎨' },
    persona: { label: 'Personas', icon: '👥' },
    trends: { label: 'Market & Trends', icon: '📈' },
    'products-services': { label: 'Products/Services', icon: '📦' },
    knowledge: { label: 'Knowledge', icon: '📚' },
  };

  const tierColors = {
    starter: 'bg-blue-50 text-blue-700 border-blue-200',
    professional: 'bg-purple-50 text-purple-700 border-purple-200',
    enterprise: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <div className="space-y-6">
      {Object.entries(bundlesByCategory).map(([category, categoryBundles]) => {
        const categoryInfo = categoryLabels[category] || { label: category, icon: '📋' };
        
        return (
          <div key={category}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{categoryInfo.icon}</span>
              <h3 className="text-lg font-semibold">{categoryInfo.label}</h3>
              <Badge variant="outline" className="ml-2">
                {categoryBundles.length} bundle{categoryBundles.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium text-sm">Bundle Name</th>
                    <th className="text-left p-3 font-medium text-sm">Type</th>
                    <th className="text-left p-3 font-medium text-sm">Methods</th>
                    <th className="text-left p-3 font-medium text-sm">Timeline</th>
                    <th className="text-left p-3 font-medium text-sm">Strategy Tools</th>
                    <th className="text-left p-3 font-medium text-sm">Price</th>
                    <th className="text-left p-3 font-medium text-sm">Tier</th>
                    <th className="text-right p-3 font-medium text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryBundles.map((bundle, idx) => {
                    const Icon = bundle.icon;
                    const strategyToolsUnlocked = getStrategyToolsUnlockedByBundle(bundle.id);
                    
                    return (
                      <tr 
                        key={bundle.id} 
                        className={`border-b hover:bg-accent/50 transition-colors cursor-pointer ${
                          idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                        }`}
                        onClick={() => onSelectBundle(bundle)}
                      >
                        {/* Bundle Name */}
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-${bundle.color}-50 border border-${bundle.color}-200 flex-shrink-0`}>
                              <Icon className={`w-4 h-4 text-${bundle.color}-600`} />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{bundle.name}</div>
                              {bundle.badge && (
                                <Badge variant="outline" className="text-xs mt-1">
                                  {bundle.badge}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="p-3">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              bundle.bundleType === 'foundation' 
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : bundle.bundleType === 'specialized'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-gray-50 text-gray-700 border-gray-200'
                            }`}
                          >
                            {bundle.bundleType || 'Standard'}
                          </Badge>
                        </td>

                        {/* Methods */}
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">
                              {bundle.primaryTool}
                            </Badge>
                            {bundle.secondaryTool && (
                              <Badge variant="outline" className="text-xs">
                                {bundle.secondaryTool}
                              </Badge>
                            )}
                          </div>
                        </td>

                        {/* Timeline */}
                        <td className="p-3">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span className="whitespace-nowrap">{bundle.timeline}</span>
                          </div>
                        </td>

                        {/* Strategy Tools */}
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                            <span className="text-sm font-medium">
                              {strategyToolsUnlocked.length} tool{strategyToolsUnlocked.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="p-3">
                          <div>
                            <div className="font-bold text-sm">€{bundle.bundlePrice.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground line-through">
                              €{bundle.basePrice.toLocaleString()}
                            </div>
                          </div>
                        </td>

                        {/* Tier */}
                        <td className="p-3">
                          {bundle.tier && (
                            <Badge variant="outline" className={`text-xs ${tierColors[bundle.tier]}`}>
                              {bundle.tier}
                            </Badge>
                          )}
                        </td>

                        {/* Action */}
                        <td className="p-3 text-right">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectBundle(bundle);
                            }}
                          >
                            Select
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {bundles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium mb-2">No bundles found</p>
              <p className="text-sm">Try adjusting your filters to see more results</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}