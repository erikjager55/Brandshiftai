/**
 * Strategic Research Planner - Configuration Data
 * Extracted from StrategicResearchPlanner.tsx for better maintainability
 */

import { 
  Eye, 
  Heart, 
  Target, 
  Users, 
  Globe, 
  Package, 
  Palette,
  MessageSquare,
  ClipboardList,
  Sparkles,
  BookOpen
} from 'lucide-react';

// Assets with tool compatibility
export const availableAssets = [
  { 
    id: 'vision-mission', 
    name: 'Vision & Mission', 
    icon: Eye, 
    type: 'Strategy',
    description: 'Define your purpose and future direction',
    compatibleTools: ['workshop', 'interviews', 'ai-agent', 'questionnaire']
  },
  { 
    id: 'core-values', 
    name: 'Core Values', 
    icon: Heart, 
    type: 'Culture',
    description: 'Articulate your guiding principles',
    compatibleTools: ['workshop', 'interviews', 'ai-agent']
  },
  { 
    id: 'golden-circle', 
    name: 'Golden Circle', 
    icon: Target, 
    type: 'Foundation',
    description: 'Discover your Why, How, and What',
    compatibleTools: ['workshop', 'ai-agent']
  },
  { 
    id: 'brand-positioning', 
    name: 'Brand Positioning', 
    icon: Target, 
    type: 'Strategy',
    description: 'Define your unique market position',
    compatibleTools: ['workshop', 'interviews', 'questionnaire', 'ai-agent']
  },
  { 
    id: 'brand-archetype', 
    name: 'Brand Archetype', 
    icon: Users, 
    type: 'Personality',
    description: 'Identify your brand personality',
    compatibleTools: ['workshop', 'ai-agent']
  },
  { 
    id: 'market-position', 
    name: 'Market Position', 
    icon: Globe, 
    type: 'Competition',
    description: 'Understand your competitive landscape',
    compatibleTools: ['interviews', 'questionnaire', 'ai-agent']
  },
  { 
    id: 'product-service', 
    name: 'Product/Service Offering', 
    icon: Package, 
    type: 'Business',
    description: 'Define and refine your offerings',
    compatibleTools: ['workshop', 'interviews', 'questionnaire', 'ai-agent']
  },
  { 
    id: 'brand-identity', 
    name: 'Visual Identity', 
    icon: Palette, 
    type: 'Design',
    description: 'Establish your visual brand elements',
    compatibleTools: ['workshop', 'ai-agent']
  },
] as const;

// Research tools configuration
export const researchTools = {
  'workshop': {
    id: 'workshop',
    name: 'Workshop',
    description: 'Collaborative sessions with stakeholders',
    icon: Users,
    timeRange: '2-4 hours',
    participants: '4-12 people',
    pros: ['Deep collaboration', 'Real-time alignment', 'Rich insights'],
    cons: ['Scheduling complexity', 'Requires facilitation'],
    bestFor: ['Team alignment', 'Vision definition', 'Creative exploration'],
    confidenceBoost: 35
  },
  'interviews': {
    id: 'interviews',
    name: 'Interviews',
    description: 'One-on-one conversations with key stakeholders',
    icon: MessageSquare,
    timeRange: '30-60 min each',
    participants: '3-8 people',
    pros: ['Deep individual insights', 'Flexible scheduling', 'Candid feedback'],
    cons: ['Time intensive', 'May miss group dynamics'],
    bestFor: ['Leadership alignment', 'Sensitive topics', 'Expert opinions'],
    confidenceBoost: 30
  },
  'questionnaire': {
    id: 'questionnaire',
    name: 'Questionnaire',
    description: 'Structured surveys for broader feedback',
    icon: ClipboardList,
    timeRange: '10-15 min to complete',
    participants: '10-100+ people',
    pros: ['Scalable', 'Quantifiable data', 'Anonymous option'],
    cons: ['Less depth', 'Potential low response'],
    bestFor: ['Large audiences', 'Quantitative data', 'Validation'],
    confidenceBoost: 20
  },
  'ai-agent': {
    id: 'ai-agent',
    name: 'AI Exploration',
    description: 'AI-powered analysis and recommendations',
    icon: Sparkles,
    timeRange: '5-15 minutes',
    participants: 'Self-guided',
    pros: ['Instant results', 'Data-driven', 'Always available'],
    cons: ['Needs validation', 'Limited context'],
    bestFor: ['Quick exploration', 'First drafts', 'Inspiration'],
    confidenceBoost: 15
  },
  'desk-research': {
    id: 'desk-research',
    name: 'Desk Research',
    description: 'Analysis of existing data and documentation',
    icon: BookOpen,
    timeRange: '1-3 days',
    participants: 'Analyst',
    pros: ['Leverages existing data', 'Cost effective', 'Objective'],
    cons: ['May be outdated', 'Limited to available data'],
    bestFor: ['Market analysis', 'Competitor research', 'Trend identification'],
    confidenceBoost: 25
  }
} as const;

// Compatible tool combinations
export const compatibleCombinations = {
  'comprehensive': ['workshop', 'interviews', 'questionnaire'],
  'quick-start': ['ai-agent', 'questionnaire'],
  'deep-dive': ['workshop', 'interviews'],
  'validation': ['questionnaire', 'interviews'],
  'exploration': ['ai-agent', 'desk-research']
} as const;

export type ResearchToolId = keyof typeof researchTools;
export type AssetId = typeof availableAssets[number]['id'];
