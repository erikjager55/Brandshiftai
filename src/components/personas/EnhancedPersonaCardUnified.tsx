/**
 * Enhanced Persona Card - Using Unified EntityCard
 * Personas displayed with same layout as brand assets
 */

import React from 'react';
import { Persona, PersonaResearchMethod } from '../../types/persona';
import { EntityCard } from '../unified/EntityCard';
import { personaToEntityCard } from '../../utils/entity-card-adapters';

interface EnhancedPersonaCardUnifiedProps {
  persona: Persona;
  onClick?: (persona: Persona) => void;
  onMethodClick?: (personaId: string, method: PersonaResearchMethod, mode: 'work' | 'results') => void;
  onChatClick?: (persona: Persona) => void;
}

/**
 * Enhanced Persona Card - Uses Unified EntityCard (same as brand assets)
 */
export function EnhancedPersonaCardUnified({
  persona,
  onClick,
  onMethodClick,
  onChatClick,
}: EnhancedPersonaCardUnifiedProps) {
  const entityData = personaToEntityCard(
    persona,
    onClick ? () => onClick(persona) : undefined,
    onMethodClick,
    onChatClick ? () => onChatClick(persona) : undefined
  );

  return <EntityCard data={entityData} />;
}

/**
 * Grid component for multiple personas
 */
interface EnhancedPersonaCardGridUnifiedProps {
  personas: Persona[];
  onPersonaClick?: (persona: Persona) => void;
  onMethodClick?: (personaId: string, method: PersonaResearchMethod, mode: 'work' | 'results') => void;
  onChatClick?: (persona: Persona) => void;
}

export function EnhancedPersonaCardGridUnified({
  personas,
  onPersonaClick,
  onMethodClick,
  onChatClick,
}: EnhancedPersonaCardGridUnifiedProps) {
  if (personas.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No personas available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {personas.map((persona) => (
        <EnhancedPersonaCardUnified
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
