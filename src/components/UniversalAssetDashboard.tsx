import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { RegenerateAssetWizard } from './wizard/RegenerateAssetWizard';
import {
  Edit,
  Save,
  X,
  Lock,
  Unlock,
  RefreshCw,
  Clock,
  User,
  AlertCircle,
  Info,
  FileText,
  Lightbulb,
  ArrowLeft,
  CheckCircle2,
  Crown,
  BarChart3,
  Target,
  Eye,
  Zap,
  Users,
  Heart,
  Sparkles,
  Globe,
  MessageCircle,
  Shield,
  Compass,
  Users2,
  Palette,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  MoreVertical,
  Download,
  Copy,
  Trash2,
  Archive,
  Circle,
  AlertTriangle,
} from 'lucide-react';
import { useResearchStore } from '../store/researchStore';
import { ThinkFeelActContent } from './asset-content/ThinkFeelActContent';
import { ESGContent } from './asset-content/ESGContent';
import { SimpleTextContent } from './asset-content/SimpleTextContent';
import { assetDashboardConfigs } from '../config/asset-dashboard-configs';
import { DecisionQualityIndicator } from './DecisionQualityIndicator';
import { ResearchMethodModal } from './ResearchMethodModal';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Progress } from './ui/progress';
import { mockBrandAssets } from '../data/mock-brand-assets';
import { ResearchFlowModal } from './ResearchFlowModal';
import { VALIDATION_METHODS } from '../config/validation-methods';
import { ResearchStatusOverview, ResearchMethodWithStatus } from './research/ResearchStatusOverview';
import { MethodStatus, MethodImpact, MethodConfidence } from './research/ResearchMethodCard';
import { ValidationBadge } from './validation/ValidationBadge';
import { getValidationConfig } from '../constants/quality-system';
import { cn } from '../lib/utils';
import { DeleteAssetModal } from './modals/DeleteAssetModal';

interface UniversalAssetDashboardProps {
  assetId: string;
  onBack: () => void;
  onStartResearch: (methodId: string, mode?: 'work' | 'results') => void;
}

// Default config fallback
const defaultAssetConfig = {
  contentType: 'simple-text' as const,
  contentEditable: true,
  showRegenerateButton: true,
  enableLocking: true,
  enableVersionHistory: false,
  showDecisionQuality: true,
  gradientColors: {
    from: '#1FD1B2',
    to: '#1FD1B2',
  },
};

// Helper function to calculate decision status
const calculateDecisionStatus = (asset: any) => {
  const completedMethods = asset.researchMethods?.filter((m: any) => m.status === 'completed') || [];
  const totalMethods = VALIDATION_METHODS.length;
  const progress = (completedMethods.length / totalMethods) * 100;
  
  if (progress === 0) return 'awaiting-research';
  if (progress < 50) return 'in-development';
  if (progress >= 50) return 'ready-to-activate';
  return 'locked';
};

const statusConfig = {
  'awaiting-research': {
    label: 'Draft',
    className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700',
    icon: AlertCircle,
  },
  'in-development': {
    label: 'In Development',
    className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    icon: Lightbulb,
  },
  'ready-to-activate': {
    label: 'Validated',
    className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
    icon: CheckCircle2,
  },
  'locked': {
    label: 'Locked',
    className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700',
    icon: Lock,
  },
};

export function UniversalAssetDashboard({ assetId, onBack, onStartResearch }: UniversalAssetDashboardProps) {
  const [selectedMethod, setSelectedMethod] = useState<typeof VALIDATION_METHODS[0] | null>(null);
  const [isFlowModalOpen, setIsFlowModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showRegenerateWizard, setShowRegenerateWizard] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockedBy, setLockedBy] = useState<string | null>(null);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  
  // Get the asset
  const asset = mockBrandAssets.find((a) => a.id === assetId);
  
  if (!asset) return null;

  // Get configuration for this asset
  const config = assetDashboardConfigs[assetId] || defaultAssetConfig;

  const decisionStatus = calculateDecisionStatus(asset);
  const completedMethods = asset.researchMethods.filter((m) => m.status === 'completed');
  const totalMethods = VALIDATION_METHODS.length;
  const unlockProgress = (completedMethods.length / totalMethods) * 100;

  // Handle research start
  const handleStartResearch = (methodId: string) => {
    const method = VALIDATION_METHODS.find((m) => m.id === methodId);
    if (method) {
      // For canvas-workshop, interviews, questionnaire, and ai-exploration, navigate to dedicated manager page
      if (methodId === 'canvas-workshop' || methodId === 'interviews' || methodId === 'questionnaire' || methodId === 'ai-exploration') {
        onStartResearch(methodId);
      } else {
        // For other methods, show the flow modal
        setSelectedMethod(method);
        setIsFlowModalOpen(true);
      }
    }
  };

  // Handle research completion
  const handleResearchComplete = (methodId: string) => {
    setIsFlowModalOpen(false);
    setSelectedMethod(null);
    
    toast.success('Research completed!', {
      description: `${VALIDATION_METHODS.find(m => m.id === methodId)?.name} data has been added to ${asset.type}.`,
    });

    onStartResearch(methodId);
  };

  // Handle regenerate
  const handleRegenerate = () => {
    setIsRegenerating(true);
    
    // Simulate regeneration
    setTimeout(() => {
      setIsRegenerating(false);
      toast.success('Content regenerated!', {
        description: 'Updated based on your research data.',
      });
    }, 2000);
  };

  // Handle save edits
  const handleSaveEdits = () => {
    setIsEditing(false);
    toast.success('Changes saved!', {
      description: `Your ${asset.type} has been updated.`,
    });
  };

  // Handle cancel edits
  const handleCancelEdits = () => {
    setIsEditing(false);
  };

  // Handle lock/unlock
  const handleToggleLock = () => {
    if (isLocked) {
      setIsLocked(false);
      setLockedBy(null);
      toast.success('Asset unlocked!', {
        description: 'The asset is now available for editing by others.',
      });
    } else {
      setIsLocked(true);
      setLockedBy('You');
      toast.success('Asset locked!', {
        description: 'You have exclusive editing rights. Others can view but not modify.',
      });
    }
  };

  const StatusIcon = statusConfig[asset.status]?.icon || AlertCircle;

  // Get asset icon
  const getAssetIcon = (type: string) => {
    const iconMap: Record<string, any> = {
      'Golden Circle': Target,
      'Vision Statement': Eye,
      'Mission Statement': Zap,
      'Brand Archetype': Users,
      'Core Values': Heart,
      'Transformative Goals': Sparkles,
      'Social Relevancy': Globe,
      'Brand Tone & Voice': MessageCircle,
      'Brand Promise': Shield,
      'Brand Story': Crown,
      'Brand Essence': Lightbulb,
      'Brand Personality': Users2,
      'Brand Positioning': Compass,
    };
    return iconMap[type] || Target;
  };

  const AssetIcon = getAssetIcon(asset.type);

  // Convert asset research methods to ResearchMethodWithStatus format
  // ✅ NO MAPPING NEEDED - statuses are now uniform across the app
  const researchMethodsWithStatus: ResearchMethodWithStatus[] = asset.researchMethods.map((method) => {
    return {
      type: method.type,
      status: method.status,  // Direct assignment - no mapping!
      impact: 'high' as MethodImpact,
      qualityScore: method.status === 'completed' ? 95 : undefined,
      confidence: method.status === 'completed' ? ('high' as MethodConfidence) : undefined,
      completedAt: method.completedAt,
      progress: method.progress,
      metadata: method.metadata,
    };
  });

  // Handle method click from ResearchStatusOverview
  const handleMethodClick = (method: ResearchMethodWithStatus) => {
    // Determine the correct mode based on method status and type
    let mode: 'work' | 'results' = 'work';
    
    if (method.status === 'completed') {
      // For AI Exploration, always go to 'work' mode (chat interface) even when completed
      // For other methods, go to 'results' mode to view the results
      mode = method.type === 'ai-exploration' ? 'work' : 'results';
    }
    
    onStartResearch(method.type, mode);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <button 
            onClick={onBack}
            className="text-primary hover:underline"
          >
            Dashboard
          </button>
          <ChevronRight className="h-4 w-4" />
          <button 
            onClick={onBack}
            className="text-primary hover:underline"
          >
            Brand Assets
          </button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{asset.type}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Your Brand
          </Button>

          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <AssetIcon className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold">{asset.type}</h1>
                <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                  {asset.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Validation % Badge */}
              <ValidationBadge
                score={Math.round(unlockProgress)}
                size="lg"
                showIcon={true}
                showPercentage={true}
              />

              {/* Status Badge */}
              <Badge
                variant="outline"
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold",
                  statusConfig[asset.status]?.className,
                  "border"
                )}
              >
                <StatusIcon className="h-3.5 w-3.5" />
                {statusConfig[asset.status]?.label}
              </Badge>

              {/* Actions Menu */}
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setIsActionsMenuOpen(!isActionsMenuOpen)}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
                
                {/* Dropdown Menu */}
                {isActionsMenuOpen && (
                  <>
                    {/* Overlay to close menu */}
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsActionsMenuOpen(false)}
                    />
                    
                    {/* Menu */}
                    <div className="absolute right-0 top-10 z-20 w-48 bg-popover border border-border rounded-xl shadow-lg p-1">
                      {/* Edit Details */}
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors text-left"
                        onClick={() => {
                          setIsActionsMenuOpen(false);
                          setIsEditing(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        Edit Details
                      </button>
                      
                      {/* Change Status */}
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors text-left"
                        onClick={() => {
                          setIsStatusMenuOpen(!isStatusMenuOpen);
                        }}
                      >
                        <RefreshCw className="h-4 w-4" />
                        Change Status
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </button>
                      
                      {/* Duplicate Asset */}
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors text-left"
                        onClick={() => {
                          setIsActionsMenuOpen(false);
                          toast.success('Asset duplicated!', {
                            description: `A copy of ${asset.type} has been created.`,
                          });
                        }}
                      >
                        <Copy className="h-4 w-4" />
                        Duplicate Asset
                      </button>
                      
                      {/* Export */}
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors text-left"
                        onClick={() => {
                          setIsActionsMenuOpen(false);
                          toast.success('Exporting...', {
                            description: `Downloading ${asset.type} as PDF.`,
                          });
                        }}
                      >
                        <Download className="h-4 w-4" />
                        Export
                      </button>
                      
                      {/* Divider */}
                      <div className="my-1 h-px bg-border" />
                      
                      {/* Delete Asset */}
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-destructive/10 transition-colors text-left text-destructive"
                        onClick={() => {
                          setIsActionsMenuOpen(false);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Asset
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Framework Accordion - only show if configured */}
          {config.frameworkInfo && (
            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="framework" className="border rounded-xl bg-background border-primary/30 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <AccordionTrigger className="hover:no-underline px-6 py-5 hover:bg-primary/5 transition-colors relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                  <div className="flex items-center justify-between w-full pr-2">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm flex-shrink-0">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-lg text-foreground">{config.frameworkInfo.title}</span>
                        <span className="text-sm text-muted-foreground font-normal mt-0.5">{config.frameworkInfo.description}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="ml-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium">
                      Learn More
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4 pb-6 px-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {config.frameworkInfo.examples.map((example, idx) => (
                        <div key={idx} className="p-6 rounded-xl bg-primary/5 border border-primary/20 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="outline" className="text-sm font-semibold">
                              {example.category}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                example.impact === 'high' 
                                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
                                  : example.impact === 'medium'
                                  ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                                  : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                              }`}
                            >
                              {example.impact} impact
                            </Badge>
                          </div>
                          <p className="text-base font-medium mb-4 leading-relaxed">{example.commitment}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>{example.initiatives}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          {/* Lock Indicator */}
          {config.enableLocking && isLocked && lockedBy && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 flex items-center gap-2"
            >
              <Lock className="h-4 w-4 text-amber-700 dark:text-amber-400" />
              <span className="text-sm text-amber-700 dark:text-amber-400">
                <strong>{lockedBy}</strong> locked this asset for editing
              </span>
            </motion.div>
          )}
        </div>

        {/* Content Section - Dynamic based on contentType */}
        <div className="mb-8">
          {/* Edit Controls - Above content blocks */}
          {config.contentEditable && (
            <div className="mb-0 px-6 py-4 rounded-t-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 border-b-0 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                {!isEditing ? (
                  <>
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                      disabled={isLocked && lockedBy !== 'You'}
                      className="h-9 px-4 font-medium border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Content
                    </Button>
                    {config.showRegenerateButton && (
                      <Button
                        onClick={() => setShowRegenerateWizard(true)}
                        variant="outline"
                        size="sm"
                        disabled={isRegenerating || (isLocked && lockedBy !== 'You')}
                        className="h-9 px-4 font-medium border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all"
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
                        {isRegenerating ? 'Regenerating...' : 'Regenerate with AI'}
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button 
                      onClick={handleSaveEdits} 
                      size="sm"
                      className="h-9 px-6 font-medium bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow transition-all"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button 
                      onClick={handleCancelEdits} 
                      variant="ghost"
                      size="sm"
                      className="h-9 px-4 font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>

              {config.enableLocking && (
                <Button
                  onClick={handleToggleLock}
                  variant="ghost"
                  size="sm"
                  className="h-9 px-4 font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {isLocked ? (
                    <>
                      <Unlock className="h-4 w-4 mr-2" />
                      Unlock
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Lock for Editing
                    </>
                  )}
                </Button>
              )}
            </div>
          )}

          {/* Content blocks with rounded top only if no edit controls */}
          <div className={config.contentEditable ? '' : 'mt-0'}>
            {config.contentType === 'think-feel-act' && (
              <ThinkFeelActContent
                assetId={assetId}
                isEditing={isEditing}
                config={config}
                hasToolbar={config.contentEditable}
              />
            )}
            
            {config.contentType === 'esg' && (
              <ESGContent
                assetId={assetId}
                isEditing={isEditing}
                config={config}
                hasToolbar={config.contentEditable}
              />
            )}
            
            {config.contentType === 'simple-text' && (
              <SimpleTextContent
                assetId={assetId}
                isEditing={isEditing}
                config={config}
                hasToolbar={config.contentEditable}
              />
            )}
          </div>
        </div>

        {/* Research Methods Section - Uses centralized ResearchStatusOverview component */}
        <ResearchStatusOverview
          methods={researchMethodsWithStatus}
          progressPercentage={unlockProgress}
          completedCount={completedMethods.length}
          totalCount={asset.researchMethods.length}
          lastUpdated={asset.lastUpdated}
          generatedArtifacts={asset.artifactsGenerated}
          onMethodClick={handleMethodClick}
          variant="full"
          showProgress={config.showDecisionQuality}
          showHeader={true}
          showMetadata={true}
          showActions={true}
        />
      </div>

      {/* Research Flow Modal */}
      <AnimatePresence>
        {isFlowModalOpen && selectedMethod && (
          <ResearchFlowModal
            isOpen={isFlowModalOpen}
            onClose={() => {
              setIsFlowModalOpen(false);
              setSelectedMethod(null);
            }}
            onComplete={() => handleResearchComplete(selectedMethod.id)}
            method={selectedMethod}
            assetName={asset.type}
          />
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteAssetModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          assetName={asset.type}
          artifactsCount={asset.artifactsGenerated}
          researchSessionsCount={completedMethods.length}
          onConfirm={() => {
            toast.success('Asset deleted!', {
              description: `Your ${asset.type} has been removed.`,
            });
            onBack();
          }}
        />
      )}

      {/* Regenerate Asset Wizard */}
      <RegenerateAssetWizard
        open={showRegenerateWizard}
        onClose={() => setShowRegenerateWizard(false)}
        assetName={asset.type}
        assetType="Brand Foundation"
        currentContent={asset.content || ''}
        onSave={(newContent, researchSources) => {
          console.log('Saved new content based on', researchSources.length, 'research sources');
          toast.success(`${asset.type} updated!`, {
            description: `Updated based on ${researchSources.length} research source${researchSources.length > 1 ? 's' : ''}.`,
          });
          setShowRegenerateWizard(false);
        }}
      />
    </div>
  );
}