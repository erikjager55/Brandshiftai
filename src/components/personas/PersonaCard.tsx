/**
 * Persona Card Component
 * Displays persona with demographics, chat button, and accordion validation methods
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import {
  MapPin,
  Briefcase,
  GraduationCap,
  DollarSign,
  Users as FamilyIcon,
  Calendar,
  Sparkles,
  Users,
  Search,
  MessageCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Persona, PersonaResearchMethod } from '../../types/persona';
import { ValidationMethodButton } from '../validation/ValidationMethodButton';
import { VALIDATION_METHODS } from '../../config/validation-methods';
import { QualityBadge } from '../quality/QualityBadge';
import { calculateQualityScore } from '../../constants/quality-system';
import { cn } from '../../lib/utils';
import { SimpleEmptyState } from '../ui/SimpleEmptyState';

interface PersonaCardProps {
  persona: Persona;
  onClick?: (persona: Persona) => void;
  onMethodClick?: (personaId: string, method: PersonaResearchMethod, mode: 'work' | 'results') => void;
  onChatClick?: (persona: Persona) => void;
}

export function PersonaCard({
  persona,
  onClick,
  onMethodClick,
  onChatClick,
}: PersonaCardProps) {
  const [isValidationExpanded, setIsValidationExpanded] = useState(false);

  // Calculate quality score
  const completedCount = persona.researchMethods.filter(m => m.status === 'completed').length;
  const totalMethods = persona.researchMethods.length;
  const qualityScore = calculateQualityScore(completedCount, totalMethods);

  // Demographics data
  const demographics = [
    { 
      icon: Calendar, 
      label: 'Leeftijd', 
      value: persona.demographics.age 
    },
    { 
      icon: MapPin, 
      label: 'Locatie', 
      value: persona.demographics.location 
    },
    { 
      icon: Briefcase, 
      label: 'Beroep', 
      value: persona.demographics.occupation 
    },
    { 
      icon: GraduationCap, 
      label: 'Opleiding', 
      value: persona.demographics.education 
    },
    { 
      icon: DollarSign, 
      label: 'Inkomen', 
      value: persona.demographics.income 
    },
    { 
      icon: FamilyIcon, 
      label: 'Gezin', 
      value: persona.demographics.familyStatus 
    }
  ];

  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3 cursor-pointer" onClick={() => onClick?.(persona)}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="h-12 w-12 ring-2 ring-background">
              <AvatarImage src={persona.avatar} alt={persona.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {persona.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg mb-1 truncate group-hover:text-primary transition-colors">
                {persona.name}
              </CardTitle>
              <CardDescription className="line-clamp-1">
                {persona.tagline}
              </CardDescription>
            </div>
          </div>
          
          {/* Quality Badge */}
          <QualityBadge 
            score={qualityScore}
            size="md"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Demographics Grid */}
        <div className="grid grid-cols-2 gap-2">
          {demographics.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
              <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground truncate">{value}</span>
            </div>
          ))}
        </div>

        {/* Chat Button */}
        {onChatClick && (
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onChatClick(persona);
            }}
          >
            <MessageCircle className="h-4 w-4" />
            Chat with {persona.name.split(' ')[0]}
          </Button>
        )}

        {/* Validation Methods - Accordion */}
        <div className="border-t pt-4">
          <button
            className="flex items-center justify-between w-full text-sm font-medium hover:text-primary transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsValidationExpanded(!isValidationExpanded);
            }}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Validation Methods ({completedCount}/{totalMethods})
            </span>
            {isValidationExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {isValidationExpanded && (
            <div className="mt-3 space-y-2">
              {persona.researchMethods.map((method) => {
                const methodConfig = VALIDATION_METHODS.find(m => m.type === method.type);
                if (!methodConfig) return null;

                return (
                  <ValidationMethodButton
                    key={method.type}
                    method={methodConfig}
                    status={method.status}
                    progress={method.progress}
                    onWorkClick={() => onMethodClick?.(persona.id, method, 'work')}
                    onResultsClick={() => onMethodClick?.(persona.id, method, 'results')}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t text-xs text-muted-foreground">
          <div>
            Last updated: {new Date(persona.lastUpdated).toLocaleDateString('nl-NL', { 
              day: 'numeric',
              month: 'short', 
              year: 'numeric'
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Grid component for multiple personas
 */
interface PersonaCardGridProps {
  personas: Persona[];
  onPersonaClick?: (persona: Persona) => void;
  onMethodClick?: (personaId: string, method: PersonaResearchMethod, mode: 'work' | 'results') => void;
  onChatClick?: (persona: Persona) => void;
  isFiltered?: boolean;
  onCreateClick?: () => void;
}

export function PersonaCardGrid({
  personas,
  onPersonaClick,
  onMethodClick,
  onChatClick,
  isFiltered = false,
  onCreateClick,
}: PersonaCardGridProps) {
  if (personas.length === 0) {
    // Search/filter results empty state
    if (isFiltered) {
      return (
        <SimpleEmptyState
          icon={Search}
          title="No results found"
          description="Try adjusting your search or filters to find what you're looking for."
        />
      );
    }
    
    // No personas at all - show create action
    return (
      <SimpleEmptyState
        icon={Users}
        title="No personas yet"
        description="Create your first persona to start building audience insights."
        action={onCreateClick ? {
          label: 'Create Persona',
          onClick: onCreateClick
        } : undefined}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {personas.map((persona) => (
        <PersonaCard
          key={persona.id}
          persona={persona}
          onClick={onPersonaClick}
          onMethodClick={onMethodClick}
          onChatClick={onChatClick}
        />
      ))}
    </div>
  );
}