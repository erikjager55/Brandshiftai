import type { DecisionQuality, ValidationMethodId } from './validation';

// Re-export central types
export type { DecisionQuality };

/**
 * @deprecated Use DecisionQuality from ./validation instead
 * Kept for backwards compatibility
 */
export type DecisionStatus = 'safe-to-decide' | 'decision-at-risk' | 'blocked';

/**
 * Map new DecisionQuality to legacy DecisionStatus
 */
export function mapDecisionQuality(quality: DecisionQuality): DecisionStatus {
  switch (quality) {
    case 'safe': return 'safe-to-decide';
    case 'at-risk': return 'decision-at-risk';
    case 'blocked': return 'blocked';
  }
}

export interface DecisionStatusInfo {
  status: DecisionStatus;
  coverage: number;
  completedMethods: ValidationMethodId[];
  topMethodsCompleted: boolean;
  missingTopMethods: ValidationMethodId[];
  recommendation: string;
  risk: string;
  nextSteps: string[];
}

export interface DecisionStatusConfig {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  description: string;
  risk: string;
  canProceed: boolean;
  warningLevel: 'none' | 'warning' | 'critical';
}

export const DECISION_STATUS_CONFIG: Record<DecisionStatus, DecisionStatusConfig> = {
  'safe-to-decide': {
    label: 'Safe to Decide',
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    borderColor: 'border-green-200 dark:border-green-800/30',
    icon: '✓',
    description: 'Sufficient research coverage',
  },
  'decision-at-risk': {
    label: 'Proceed with Caution',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    borderColor: 'border-amber-200 dark:border-amber-800/30',
    icon: '⚠',
    description: 'Partial research coverage - proceed with caution',
    risk: 'Moderate risk - decisions may lack critical strategic insights',
    canProceed: true,
    warningLevel: 'warning'
  },
  'blocked': {
    label: 'Complete Research First',
    color: 'text-slate-700 dark:text-slate-300',
    bgColor: 'bg-slate-50 dark:bg-slate-950/20',
    borderColor: 'border-slate-200 dark:border-slate-800/30',
    icon: '•',
    description: 'Insufficient research to make strategic decisions',
    risk: 'High risk - decisions would be speculative without proper validation',
    canProceed: false,
    warningLevel: 'critical'
  }
};

// Research method strategic ranking
export const RESEARCH_METHOD_RANKING: Record<string, number> = {
  'workshop': 1,
  'interviews': 2,
  'questionnaire': 3,
  'ai-exploration': 4
};