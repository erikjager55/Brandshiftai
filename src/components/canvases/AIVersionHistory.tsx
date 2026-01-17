import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { WarningBadge, SuccessBadge, InfoBadge } from '../ui/StatusBadge';
import { InfoMessage } from '../ui/InfoBox';
import { Clock, GitBranch, CheckCircle, Eye, ArrowRight, Sparkles, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';

export interface AIVersion {
  id: string;
  timestamp: Date;
  why: string;
  how: string;
  what: string;
  insights: number;
  averageConfidence: number;
  contextSnapshot: {
    questionsAnswered: number;
    totalQuestions: number;
  };
  isActive?: boolean;
}

interface AIVersionHistoryProps {
  versions: AIVersion[];
  currentVersionId: string;
  onSelectVersion: (version: AIVersion) => void;
  onCompareVersions?: (v1: AIVersion, v2: AIVersion) => void;
  onRestoreVersion: (version: AIVersion) => void;
}

export function AIVersionHistory({ 
  versions, 
  currentVersionId, 
  onSelectVersion,
  onCompareVersions,
  onRestoreVersion 
}: AIVersionHistoryProps) {
  const [selectedForCompare, setSelectedForCompare] = React.useState<string | null>(null);

  const handleCompareToggle = (versionId: string) => {
    if (selectedForCompare === versionId) {
      setSelectedForCompare(null);
    } else if (selectedForCompare === null) {
      setSelectedForCompare(versionId);
    } else {
      // Two versions selected, trigger compare
      const v1 = versions.find(v => v.id === selectedForCompare);
      const v2 = versions.find(v => v.id === versionId);
      if (v1 && v2 && onCompareVersions) {
        onCompareVersions(v1, v2);
      }
      setSelectedForCompare(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-violet-600" />
              Version History
            </CardTitle>
            <CardDescription>
              Track and compare different iterations of your AI analysis
            </CardDescription>
          </div>
          <Badge variant="secondary">
            {versions.length} {versions.length === 1 ? 'version' : 'versions'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {versions.map((version, index) => {
              const isCurrent = version.id === currentVersionId;
              const isSelectedForCompare = selectedForCompare === version.id;

              return (
                <motion.div
                  key={version.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className={`transition-all ${
                      isCurrent 
                        ? 'border-2 border-violet-500 bg-violet-50/50 dark:bg-violet-950/20' 
                        : isSelectedForCompare
                        ? 'border-2 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
                        : 'border hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  >
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              isCurrent 
                                ? 'bg-violet-100 dark:bg-violet-900/30' 
                                : 'bg-gray-100 dark:bg-gray-800'
                            }`}>
                              <Sparkles className={`h-5 w-5 ${
                                isCurrent 
                                  ? 'text-violet-600 dark:text-violet-400' 
                                  : 'text-gray-600 dark:text-gray-400'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">Version {versions.length - index}</h4>
                                {isCurrent && (
                                  <Badge variant="secondary" className="bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400">
                                    Current
                                  </Badge>
                                )}
                                {version.isActive && !isCurrent && (
                                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    Active
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {formatDistanceToNow(version.timestamp, { addSuffix: true })}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-background rounded p-2 border">
                            <p className="text-xs text-muted-foreground mb-0.5">Insights</p>
                            <p className="text-sm font-semibold">{version.insights}</p>
                          </div>
                          <div className="bg-background rounded p-2 border">
                            <p className="text-xs text-muted-foreground mb-0.5">Confidence</p>
                            <p className="text-sm font-semibold">{version.averageConfidence}%</p>
                          </div>
                          <div className="bg-background rounded p-2 border">
                            <p className="text-xs text-muted-foreground mb-0.5">Questions</p>
                            <p className="text-sm font-semibold">{version.contextSnapshot.questionsAnswered}/{version.contextSnapshot.totalQuestions}</p>
                          </div>
                        </div>

                        {/* Preview */}
                        <div className="space-y-2">
                          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded p-2">
                            <p className="text-xs font-medium text-yellow-700 dark:text-yellow-400 mb-1">WHY</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{version.why}</p>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 rounded p-2">
                            <p className="text-xs font-medium text-purple-700 dark:text-purple-400 mb-1">HOW</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{version.how}</p>
                          </div>
                          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded p-2">
                            <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">WHAT</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{version.what}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-2 border-t">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onSelectVersion(version)}
                            className="flex-1 gap-2"
                          >
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                          
                          {onCompareVersions && (
                            <Button
                              size="sm"
                              variant={isSelectedForCompare ? "default" : "outline"}
                              onClick={() => handleCompareToggle(version.id)}
                              className="flex-1 gap-2"
                            >
                              <CheckCircle className="h-3 w-3" />
                              {isSelectedForCompare ? 'Selected' : 'Compare'}
                            </Button>
                          )}

                          {!isCurrent && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onRestoreVersion(version)}
                              className="gap-2"
                            >
                              <RotateCcw className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </ScrollArea>

        {selectedForCompare && (
          <div className="mt-4">
            <InfoMessage size="md">
              Select another version to compare
            </InfoMessage>
          </div>
        )}

        {versions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <GitBranch className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No versions yet</p>
            <p className="text-xs">Complete your first analysis to create a version</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}