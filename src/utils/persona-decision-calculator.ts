import { Persona } from '../types/persona';
import { DecisionStatus } from '../types/decision-status';

export interface PersonaDecisionInfo {
  status: DecisionStatus;
  confidence: number;
  recommendation: string;
  completedMethods: number;
  totalMethods: number;
  verifiedAssumptions: number;
  openQuestions: number;
  behavioralRisks: string[];
  strategicImplications: string[];
  recommendedActions: string[];
}

/**
 * Calculate decision readiness status for a persona based on research coverage
 * 
 * Personas require high confidence for strategic decisions because they guide
 * product development, marketing, and user experience decisions.
 */
export function calculatePersonaDecisionStatus(persona: Persona): PersonaDecisionInfo {
  const totalMethods = persona.researchMethods.length;
  const completedMethods = persona.researchMethods.filter(m => m.status === 'completed').length;
  const confidence = totalMethods > 0 ? Math.round((completedMethods / totalMethods) * 100) : 0;

  let status: DecisionStatus;
  let recommendation: string;
  let behavioralRisks: string[] = [];
  let strategicImplications: string[] = [];
  let recommendedActions: string[] = [];

  // Calculate verified assumptions (based on goals + motivations + behaviors)
  const verifiedAssumptions = persona.goals.length + persona.motivations.length + persona.behaviors.length;
  const openQuestions = Math.max(0, 10 - verifiedAssumptions); // Aim for 10+ data points

  if (confidence >= 75) {
    status = 'safe-to-decide';
    recommendation = 'This persona has strong research validation. You can confidently use it for strategic product and marketing decisions.';
    
    strategicImplications = [
      'Persona is ready for product roadmap planning',
      'Can guide feature prioritization decisions',
      'Validated for marketing campaign targeting',
      'Reliable for user experience design decisions'
    ];
    
    recommendedActions = [
      'Share persona with product and design teams',
      'Use for upcoming sprint planning and roadmaps',
      'Create persona-specific value propositions'
    ];
  } else if (confidence >= 50) {
    status = 'decision-at-risk';
    recommendation = 'This persona has moderate validation. Complete additional research before making critical product or campaign decisions.';
    
    behavioralRisks = [
      'Incomplete behavioral patterns may lead to misaligned features',
      'Motivations not fully validated through real user research',
      'Demographics may not reflect actual target audience'
    ];
    
    strategicImplications = [
      'Use with caution for tactical decisions',
      'Avoid for major product pivots or investments',
      'Supplement with additional user research before committing'
    ];
    
    recommendedActions = [
      'Conduct user interviews to validate assumptions',
      'Run surveys to confirm demographics and behaviors',
      'Test messaging with real audience samples'
    ];
  } else {
    status = 'blocked';
    recommendation = 'This persona needs significant validation. Do not use for strategic decisions until research coverage reaches at least 50%.';
    
    behavioralRisks = [
      'High risk of building for wrong audience',
      'Assumptions not validated with real users',
      'May result in wasted development resources',
      'Marketing campaigns may miss target audience'
    ];
    
    strategicImplications = [
      'Not ready for product decisions',
      'Requires foundational research before use',
      'Consider as hypothesis only, not validated insight'
    ];
    
    recommendedActions = [
      'Start with user interviews or surveys',
      'Validate demographics with analytics data',
      'Test core assumptions with small experiments',
      'Build research plan before committing resources'
    ];
  }

  return {
    status,
    confidence,
    recommendation,
    completedMethods,
    totalMethods,
    verifiedAssumptions,
    openQuestions,
    behavioralRisks,
    strategicImplications,
    recommendedActions,
  };
}

/**
 * Calculate persona validation score based on multiple factors
 */
export function calculatePersonaValidationScore(persona: Persona): number {
  let score = 0;
  const weights = {
    researchCoverage: 40,
    dataRichness: 30,
    recency: 20,
    participantCount: 10
  };

  // Research coverage (40%)
  score += (persona.researchCoverage / 100) * weights.researchCoverage;

  // Data richness (30%) - based on filled fields
  const dataPoints = [
    persona.goals.length > 0,
    persona.frustrations.length > 0,
    persona.motivations.length > 0,
    persona.behaviors.length > 0,
    persona.demographics.age,
    persona.demographics.occupation,
    persona.personality,
    persona.values && persona.values.length > 0
  ].filter(Boolean).length;
  score += (dataPoints / 8) * weights.dataRichness;

  // Recency (20%) - personas older than 6 months lose points
  const monthsSinceUpdate = (Date.now() - new Date(persona.lastUpdated).getTime()) / (1000 * 60 * 60 * 24 * 30);
  const recencyScore = Math.max(0, 1 - (monthsSinceUpdate / 12)); // Decay over 12 months
  score += recencyScore * weights.recency;

  // Participant count (10%) - total participants across all methods
  const totalParticipants = persona.researchMethods.reduce((sum, m) => sum + (m.participantCount || 0), 0);
  const participantScore = Math.min(1, totalParticipants / 50); // Cap at 50 participants
  score += participantScore * weights.participantCount;

  return Math.round(score);
}