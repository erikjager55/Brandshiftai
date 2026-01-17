import React from 'react';
import { Badge } from '../ui/badge';
import { Users, FileText, Presentation } from 'lucide-react';

interface AssetRelationshipIndicatorProps {
  assetId: string;
  assetName: string;
  sharedAssets: {
    interviews: string[];
    questionnaire: string[];
    workshop: string[];
  };
  currentTool?: 'interviews' | 'questionnaire' | 'workshop';
}

export function AssetRelationshipIndicator({
  assetId,
  assetName,
  sharedAssets,
  currentTool
}: AssetRelationshipIndicatorProps) {
  const toolsUsingAsset: Array<{ tool: string; icon: React.ElementType; color: string }> = [];

  if (sharedAssets.interviews.includes(assetId)) {
    toolsUsingAsset.push({ tool: 'Interviews', icon: Users, color: 'text-purple-600' });
  }
  if (sharedAssets.questionnaire.includes(assetId)) {
    toolsUsingAsset.push({ tool: 'Questionnaire', icon: FileText, color: 'text-green-600' });
  }
  if (sharedAssets.workshop.includes(assetId)) {
    toolsUsingAsset.push({ tool: 'Workshop', icon: Presentation, color: 'text-blue-600' });
  }

  // Filter out current tool
  const otherTools = toolsUsingAsset.filter((t) => {
    const toolMapping = {
      'Interviews': 'interviews',
      'Questionnaire': 'questionnaire',
      'Workshop': 'workshop'
    };
    return toolMapping[t.tool as keyof typeof toolMapping] !== currentTool;
  });

  if (otherTools.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center space-x-1 mt-1">
      {otherTools.map((toolInfo, index) => {
        const Icon = toolInfo.icon;
        return (
          <Badge
            key={index}
            variant="outline"
            className="text-xs px-1.5 py-0 h-5"
          >
            <Icon className={`h-3 w-3 mr-1 ${toolInfo.color}`} />
            <span className="text-muted-foreground">{toolInfo.tool}</span>
          </Badge>
        );
      })}
    </div>
  );
}
