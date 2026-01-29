import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Persona, ResearchMethodStatus } from '../../types/persona';
import { PersonaContent } from './PersonaContent';
import { ValidationMethodButton, ValidationMethodStatus } from '../validation/ValidationMethodButton';
import { RegenerateAssetWizard } from '../wizard/RegenerateAssetWizard';
import { toast } from 'sonner';
import {
  ArrowLeft,
  User,
  Target,
  Heart,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  CheckCircle2,
  Users,
  Lightbulb,
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  Home,
  ChartBar,
  FlaskConical,
  BookOpen,
  Edit,
  Save,
  X,
  Lock,
  Unlock,
  RefreshCw,
  Brain,
  MessageCircle,
  FileText,
  BarChart3,
  MousePointer,
  UserCheck,
  Network,
  Search,
  Clock,
  Shield,
  Sparkles,
  HelpCircle,
  IdCard,
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  SPACING, 
  TYPOGRAPHY, 
  ICON_SIZES, 
  ICON_CONTAINERS,
  COLORS,
  CARD_VARIANTS,
  ANIMATION,
  BADGE_VARIANTS,
  BUTTON_VARIANTS,
  cn,
} from '../../constants/design-system';
import { VALIDATION_METHODS } from '../../config/validation-methods';
import { QualityDisplay, QualityBadge } from '../quality/QualityBadge';
import { calculateQualityScore } from '../../constants/quality-system';

interface PersonaDetailPageProps {
  persona: Persona;
  onBack: () => void;
  onUpdate?: (updated: Persona) => void;
  onNavigateToAIExploration?: () => void;
  onNavigateToInterviews?: () => void;
  onNavigateToQuestionnaire?: () => void;
  onNavigateToUserTesting?: () => void;
}

export function PersonaDetailPage({ persona, onBack, onUpdate, onNavigateToAIExploration, onNavigateToInterviews, onNavigateToQuestionnaire, onNavigateToUserTesting }: PersonaDetailPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockedBy, setLockedBy] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showRegenerateWizard, setShowRegenerateWizard] = useState(false);
  const [localPersona, setLocalPersona] = useState(persona);
  
  // Calculate metrics
  const completedMethods = localPersona.researchMethods.filter(m => m.status === 'completed').length;
  const totalMethods = localPersona.researchMethods.length;
  const qualityScore = calculateQualityScore(completedMethods, totalMethods);

  // Get status colors for persona status badge
  const getPersonaStatusInfo = (status: string) => {
    switch (status) {
      case 'draft':
        return { color: 'bg-gray-100 text-gray-700 border-gray-300', label: 'Draft' };
      case 'in-research':
        return { color: 'bg-blue-100 text-blue-700 border-blue-300', label: 'In Research' };
      case 'validated':
        return { color: 'bg-green-100 text-green-700 border-green-300', label: 'Validated' };
      case 'archived':
        return { color: 'bg-gray-100 text-gray-600 border-gray-200', label: 'Archived' };
      default:
        return { color: 'bg-gray-100 text-gray-700 border-gray-300', label: status };
    }
  };

  const personaStatusInfo = getPersonaStatusInfo(persona.status);

  // Edit handlers
  const handleSaveEdits = () => {
    setIsEditing(false);
    toast.success('Persona profile saved successfully');
  };

  const handleCancelEdits = () => {
    setIsEditing(false);
    toast.info('Edit cancelled');
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    
    // Simulate AI regeneration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsRegenerating(false);
    toast.success('Persona profile regenerated with AI');
  };

  const handleToggleLock = () => {
    if (isLocked) {
      setIsLocked(false);
      setLockedBy(null);
      toast.success('Persona unlocked');
    } else {
      setIsLocked(true);
      setLockedBy('You');
      toast.success('Persona locked for editing');
    }
  };

  const handleStartResearch = (methodId: string) => {
    if (methodId === 'ai-exploration' && onNavigateToAIExploration) {
      // Navigate to fullscreen AI exploration page
      onNavigateToAIExploration();
    } else if (methodId === 'interviews' && onNavigateToInterviews) {
      // Navigate to interviews page
      onNavigateToInterviews();
    } else if ((methodId === 'questionnaire' || methodId === 'surveys') && onNavigateToQuestionnaire) {
      // Navigate to questionnaire page
      onNavigateToQuestionnaire();
    } else if (methodId === 'user-testing' && onNavigateToUserTesting) {
      // Navigate to user testing page
      onNavigateToUserTesting();
    } else {
      toast.success(`Starting ${methodId} research...`);
    }
  };

  const handleViewResults = (methodId: string) => {
    toast.info(`Viewing ${methodId} results...`);
  };

  const handleAIExplorationComplete = () => {
    // Update local persona state to mark AI exploration as completed
    setLocalPersona(prev => {
      const updatedMethods = prev.researchMethods.map(m =>
        m.type === 'ai-exploration' ? { ...m, status: 'completed' as const, completedDate: new Date().toISOString() } : m
      );

      // If method doesn't exist, add it
      const methodExists = prev.researchMethods.some(m => m.type === 'ai-exploration');
      if (!methodExists) {
        updatedMethods.push({
          type: 'ai-exploration' as any,
          status: 'completed',
          completedDate: new Date().toISOString(),
        });
      }

      return { ...prev, researchMethods: updatedMethods };
    });

    // Show success toast
    toast.success('AI Exploration voltooid!', {
      description: '+35% research vertrouwen toegevoegd aan ' + persona.name,
      duration: 5000,
    });
  };

  // Helper: Map persona status to ValidationMethodStatus
  const mapPersonaStatus = (status: ResearchMethodStatus): ValidationMethodStatus => {
    switch (status) {
      case 'completed': return 'completed';
      case 'in-progress': return 'running';
      case 'not-started': return 'available';
      case 'cancelled': return 'locked';
      default: return 'available';
    }
  };

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="max-w-7xl mx-auto px-8 py-6">
      {/* Header */}
      <div className={SPACING.section.marginSmall}>
        <button 
          onClick={onBack} 
          className="mb-4 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Personas
        </button>

        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex items-start space-x-4 flex-1">
            {/* Persona Avatar - groot */}
            <Avatar className="h-16 w-16 rounded-full">
              <AvatarImage src={persona.avatar} alt={persona.name} />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-semibold">
                {persona.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            {/* Persona Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-semibold">{persona.name}</h1>
                {persona.status === 'validated' && (
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800" variant="outline">
                    Validated
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4">{persona.tagline}</p>
              
              {/* Meta row */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <svg className="h-12 w-12" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-muted-foreground/20"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${(qualityScore / 100) * 100.53}, 100.53`}
                        strokeLinecap="round"
                        transform="rotate(-90 18 18)"
                        className={cn(
                          qualityScore >= 80 ? "text-green-600" : 
                          qualityScore >= 50 ? "text-amber-600" : 
                          "text-red-600"
                        )}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-semibold">{qualityScore}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Research Confidence</div>
                    <div className="text-xs text-muted-foreground">{qualityScore >= 80 ? 'High' : qualityScore >= 50 ? 'Medium' : 'Low'}</div>
                  </div>
                </div>
                <div className="h-10 w-px bg-border" />
                <div>
                  <div className="text-sm font-medium">Methods Completed</div>
                  <div className="text-lg font-semibold">{completedMethods}/{totalMethods}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persona Framework Accordion */}
      <Accordion type="single" collapsible className="mb-6">
        <AccordionItem value="framework" className="border rounded-xl bg-background border-primary/30 shadow-sm hover:shadow-md transition-all overflow-hidden">
          <AccordionTrigger className="hover:no-underline px-6 py-5 hover:bg-primary/5 transition-colors relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex items-center justify-between w-full pr-2">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-lg text-foreground">What are Personas?</span>
                  <span className="text-sm text-muted-foreground font-normal mt-0.5">Research-based representations of your target users</span>
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
                <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-sm font-semibold">
                      User-Centered
                    </Badge>
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-base font-medium mb-3 leading-relaxed">Evidence-Based Profiles</p>
                  <p className="text-sm text-muted-foreground">
                    Personas synthesize research data into fictional but realistic characters that represent key user segments
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-sm font-semibold">
                      Strategic Tool
                    </Badge>
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-base font-medium mb-3 leading-relaxed">Alignment & Focus</p>
                  <p className="text-sm text-muted-foreground">
                    Create shared understanding across teams and guide product, marketing, and UX decisions
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-sm font-semibold">
                      Living Documents
                    </Badge>
                    <FlaskConical className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-base font-medium mb-3 leading-relaxed">Continuous Validation</p>
                  <p className="text-sm text-muted-foreground">
                    Personas evolve through ongoing research validation using interviews, surveys, analytics, and behavioral data
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Why Personas Matter
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Empathy:</strong> Help teams understand and empathize with real user needs, goals, and frustrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Decision-Making:</strong> Provide clear criteria for evaluating features, content, and campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Communication:</strong> Enable stakeholder alignment through concrete, memorable user representations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Validation:</strong> Track research confidence and ensure strategic decisions are grounded in evidence</span>
                  </li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Edit Controls Toolbar */}
      <div className="mb-0 px-6 py-4 rounded-t-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 border-b-0 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          {!isEditing ? (
            <>
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className={cn(BUTTON_VARIANTS.sm, "transition-colors duration-200")}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Content
              </Button>
              <Button
                onClick={() => setShowRegenerateWizard(true)}
                variant="outline"
                size="sm"
                disabled={isRegenerating || (isLocked && lockedBy !== 'You')}
                className="transition-colors duration-200 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
                {isRegenerating ? 'Regenerating...' : 'Regenerate with AI'}
              </Button>
            </>
          ) : (
            <>
              <Button 
                onClick={handleSaveEdits} 
                size="sm"
                className={cn(BUTTON_VARIANTS.sm, BUTTON_VARIANTS.primary)}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button 
                onClick={handleCancelEdits} 
                variant="ghost"
                size="sm"
                className={BUTTON_VARIANTS.sm}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          )}
        </div>

        <Button
          onClick={handleToggleLock}
          variant="ghost"
          size="sm"
          className={BUTTON_VARIANTS.sm}
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
      </div>

      {/* Persona Content Component */}
      <PersonaContent
        persona={localPersona}
        isEditing={isEditing}
        hasToolbar={true}
        onUpdate={onUpdate}
      />

      {/* Research & Validation Section */}
      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Research & Validation</CardTitle>
              <CardDescription>
                Strengthen this persona through evidence-based research
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              {completedMethods}/{totalMethods} methods completed
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {VALIDATION_METHODS
            .filter(method => ['ai-exploration', 'interviews', 'questionnaire', 'user-testing'].includes(method.id))
            .map((method) => {
              const personaMethod = localPersona.researchMethods.find((m) => m.type === method.id);
              
              // Determine status with proper type checking
              let status: ResearchMethodStatus = 'not-started';
              
              if (personaMethod?.status) {
                status = personaMethod.status;
              } else if (method.unlockLevel !== 'free' && method.unlockLevel !== 'basic') {
                // Locked methods
                status = 'cancelled';
              }
              
              return (
                <ValidationMethodButton
                  key={method.id}
                  label={method.name}
                  description={method.description}
                  type={method.id}
                  status={mapPersonaStatus(status)}
                  progress={personaMethod?.progress}
                  icon={method.icon}
                  onPrimaryClick={() => {
                    if (status === 'completed') {
                      handleViewResults(method.id);
                    } else {
                      handleStartResearch(method.id);
                    }
                  }}
                />
              );
            })}
        </CardContent>
      </Card>

      {/* Lock Indicator */}
      {isLocked && lockedBy && (
        <div className="mt-4 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 flex items-center gap-2">
          <Lock className="h-4 w-4 text-yellow-700 dark:text-yellow-400" />
          <span className="text-sm text-yellow-700 dark:text-yellow-400">
            <strong>{lockedBy}</strong> locked this persona for editing
          </span>
        </div>
      )}
      </div>

      {/* Regenerate Asset Wizard */}
      <RegenerateAssetWizard
        open={showRegenerateWizard}
        onClose={() => setShowRegenerateWizard(false)}
        assetName={persona.name}
        assetType="Persona"
        currentContent={JSON.stringify({
          name: persona.name,
          role: persona.role,
          age: persona.age,
          location: persona.location,
          bio: persona.bio,
          goals: persona.goals,
          frustrations: persona.frustrations,
          behaviors: persona.behaviors,
        }, null, 2)}
        onSave={(newContent, researchSources) => {
          console.log('Saved new persona content based on', researchSources.length, 'research sources');
          toast.success(`${persona.name} updated!`, {
            description: `Persona regenerated based on ${researchSources.length} research source${researchSources.length > 1 ? 's' : ''}.`,
          });
          setShowRegenerateWizard(false);
        }}
      />
    </div>
  );
}