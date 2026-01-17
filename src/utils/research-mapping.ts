import { ResearchMethodType } from '../types/brand-asset';

/**
 * Map research method types to research option IDs used by ResearchDashboard
 */
export function getResearchOptionId(methodType: ResearchMethodType): string {
  switch (methodType) {
    case 'workshop':
      return 'canvas-workshop';
    case 'interviews':
      return 'interviews';
    case 'questionnaire':
      return 'questionnaire';
    case 'ai-exploration':
      return 'ai-agent';
  }
}

/**
 * Map research option ID back to method type
 */
export function getMethodTypeFromOptionId(optionId: string): ResearchMethodType | null {
  switch (optionId) {
    case 'canvas-workshop':
      return 'workshop';
    case 'interviews':
      return 'interviews';
    case 'questionnaire':
      return 'questionnaire';
    case 'ai-agent':
      return 'ai-exploration';
    default:
      return null;
  }
}

/**
 * Check if a research option/method is a valid tool view
 */
export function hasToolView(optionId: string): boolean {
  const validTools = ['canvas-workshop', 'interviews', 'questionnaire', 'ai-agent'];
  return validTools.includes(optionId);
}
