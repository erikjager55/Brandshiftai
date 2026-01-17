// Persona Type Definitions

export type PersonaStatus = 'draft' | 'in-research' | 'validated' | 'archived';
export type ResearchMethodType = 
  | 'interviews' 
  | 'surveys' 
  | 'user-testing' 
  | 'analytics' 
  | 'observations'
  | 'user-interviews'
  | 'usability-testing'
  | 'analytics-analysis'
  | 'field-observations'
  | 'focus-groups'
  | 'diary-studies'
  | 'journey-mapping'
  | 'ai-exploration';
export type ResearchMethodStatus = 'not-started' | 'in-progress' | 'completed' | 'cancelled';

export interface PersonaResearchMethod {
  type: ResearchMethodType;
  status: ResearchMethodStatus;
  progress?: number;
  completedAt?: string;
  participantCount?: number;
  insights?: string[];
}

export interface PersonaDemographics {
  age?: string;
  location?: string;
  occupation?: string;
  education?: string;
  income?: string;
  familyStatus?: string;
}

export interface Persona {
  id: string;
  name: string;
  tagline: string;
  avatar?: string;
  demographics: PersonaDemographics;
  
  // Persona characteristics
  goals: string[];
  frustrations: string[];
  motivations: string[];
  behaviors: string[];
  
  // Psychographics
  personality?: string;
  values?: string[];
  interests?: string[];
  
  // Research tracking
  researchMethods: PersonaResearchMethod[];
  researchCoverage: number; // 0-100%
  validationScore?: number; // 0-100
  
  // Metadata
  status: PersonaStatus;
  createdAt: string;
  lastUpdated: string;
  createdBy?: string;
  tags?: string[];
}

export interface PersonaFilterOptions {
  status?: PersonaStatus[];
  researchMethods?: ResearchMethodType[];
  validationMin?: number;
  tags?: string[];
}