/**
 * UTILITY: Research Hub Decision Transformer
 * 
 * Transformeert research data naar decision-focused formaten voor:
 * - Research Decision Summary
 * - Research Impact Cards
 * - Assumptions Register
 * - Impact Prioritized Actions
 */

import { calculateDecisionStatus } from './decision-status-calculator';
import { mockBrandAssets } from '../data/mock-brand-assets';
import { mockPersonas } from '../data/mock-personas';

export interface DecisionItem {
  id: string;
  name: string;
  type: 'asset' | 'persona';
  coverage: number;
  missingTopMethod?: string;
}

export interface DecisionReadinessData {
  safeItems: DecisionItem[];
  atRiskItems: DecisionItem[];
  blockedItems: DecisionItem[];
}

export interface ResearchDecisionSummaryData {
  currentStatus: 'safe-to-decide' | 'decision-at-risk' | 'blocked';
  safeCount: number;
  atRiskCount: number;
  blockedCount: number;
  topBlockers: string[];
  topUnlocks: string[];
  activeResearchCount: number;
}

export interface ResearchImpactData {
  methodName: string;
  targetName: string;
  currentCoverage: number;
  expectedCoverage: number;
  unlocksDecision: string;
  riskReduction: string;
  progress: number;
  status: 'in-progress' | 'validation-needed' | 'completed';
}

export interface AssumptionData {
  id: string;
  statement: string;
  category: 'brand' | 'persona' | 'market';
  status: 'validated' | 'risky' | 'invalidated' | 'untested';
  risk: 'critical' | 'high' | 'medium' | 'low';
  validationMethod?: string;
}

export interface PrioritizedActionData {
  id: string;
  title: string;
  reason: string;
  unlocksDecision: string;
  riskReduction: string;
  impact: 'critical' | 'high' | 'medium';
  estimatedTime: string;
  targetType: 'asset' | 'persona' | 'research';
}

/**
 * Calculate Decision Readiness data for main block
 */
export function calculateDecisionReadiness(): DecisionReadinessData {
  const allItems = [
    ...mockBrandAssets.map(a => ({ ...a, itemType: 'asset' as const })),
    ...mockPersonas.map(p => ({ ...p, itemType: 'persona' as const }))
  ];

  const withStatus = allItems.map(item => ({
    item,
    status: calculateDecisionStatus(item)
  }));

  // Safe items (≥80%)
  const safeItems: DecisionItem[] = withStatus
    .filter(w => w.status.status === 'safe-to-decide')
    .map(w => ({
      id: w.item.id,
      name: w.item.type,
      type: w.item.itemType,
      coverage: Math.round(w.status.coverage)
    }));

  // At risk items (50-79%)
  const atRiskItems: DecisionItem[] = withStatus
    .filter(w => w.status.status === 'decision-at-risk')
    .map(w => ({
      id: w.item.id,
      name: w.item.type,
      type: w.item.itemType,
      coverage: Math.round(w.status.coverage),
      missingTopMethod: w.status.missingTopMethods[0] // First missing top method
    }));

  // Blocked items (<50%)
  const blockedItems: DecisionItem[] = withStatus
    .filter(w => w.status.status === 'blocked')
    .map(w => ({
      id: w.item.id,
      name: w.item.type,
      type: w.item.itemType,
      coverage: Math.round(w.status.coverage),
      missingTopMethod: w.status.missingTopMethods[0]
    }));

  return {
    safeItems,
    atRiskItems,
    blockedItems
  };
}

/**
 * Calculate Research Decision Summary data
 */
export function calculateResearchDecisionSummary(): ResearchDecisionSummaryData {
  const allItems = [
    ...mockBrandAssets.map(a => ({ ...a, itemType: 'asset' as const })),
    ...mockPersonas.map(p => ({ ...p, itemType: 'persona' as const }))
  ];

  const withStatus = allItems.map(item => ({
    item,
    status: calculateDecisionStatus(item)
  }));

  const safeCount = withStatus.filter(w => w.status.status === 'safe-to-decide').length;
  const atRiskCount = withStatus.filter(w => w.status.status === 'decision-at-risk').length;
  const blockedCount = withStatus.filter(w => w.status.status === 'blocked').length;

  // Determine overall status
  let currentStatus: 'safe-to-decide' | 'decision-at-risk' | 'blocked';
  if (blockedCount > 0) {
    currentStatus = 'blocked';
  } else if (atRiskCount > allItems.length / 2) {
    currentStatus = 'decision-at-risk';
  } else {
    currentStatus = 'safe-to-decide';
  }

  // Top blockers (items that are blocked)
  const blocked = withStatus
    .filter(w => w.status.status === 'blocked')
    .map(w => w.item.type);
  const topBlockers = blocked.slice(0, 2);

  // Top unlocks (items that would become safe after current research)
  const atRisk = withStatus
    .filter(w => w.status.status === 'decision-at-risk')
    .map(w => `${w.item.type} → Safe to Decide`);
  const topUnlocks = atRisk.slice(0, 2);

  // Mock active research count (in real app, get from research context)
  const activeResearchCount = 3;

  return {
    currentStatus,
    safeCount,
    atRiskCount,
    blockedCount,
    topBlockers,
    topUnlocks,
    activeResearchCount
  };
}

/**
 * Generate mock research impact data
 */
export function generateMockResearchImpact(): ResearchImpactData[] {
  return [
    {
      methodName: '1-on-1 Interviews',
      targetName: 'Vision',
      currentCoverage: 45,
      expectedCoverage: 65,
      unlocksDecision: 'Vision wordt bruikbaar in strategie tools',
      riskReduction: 'Verkleint risico op vage positionering met 60%',
      progress: 75,
      status: 'in-progress'
    },
    {
      methodName: 'Workshop',
      targetName: 'Values',
      currentCoverage: 40,
      expectedCoverage: 70,
      unlocksDecision: 'Values bereikt optimale betrouwbaarheid',
      riskReduction: 'Elimineert risico op interne misalignment',
      progress: 100,
      status: 'validation-needed'
    },
    {
      methodName: 'Survey',
      targetName: 'Primary Persona',
      currentCoverage: 55,
      expectedCoverage: 75,
      unlocksDecision: 'Persona wordt safe voor targeting beslissingen',
      riskReduction: 'Reduceert targeting risico met 50%',
      progress: 40,
      status: 'in-progress'
    }
  ];
}

/**
 * Generate mock assumptions data
 */
export function generateMockAssumptions(): AssumptionData[] {
  return [
    {
      id: 'a1',
      statement: 'Onze doelgroep waardeert authenticiteit boven prijs',
      category: 'persona',
      status: 'risky',
      risk: 'critical',
      validationMethod: undefined
    },
    {
      id: 'a2',
      statement: 'Merkwaarden zijn aligned met team perceptie',
      category: 'brand',
      status: 'validated',
      risk: 'medium',
      validationMethod: 'Workshop + Survey'
    },
    {
      id: 'a3',
      statement: 'Markt groeit met 15% jaar-op-jaar',
      category: 'market',
      status: 'untested',
      risk: 'high'
    },
    {
      id: 'a4',
      statement: 'Concurrenten focussen niet op sustainability',
      category: 'market',
      status: 'invalidated',
      risk: 'high',
      validationMethod: 'Competitor Analysis'
    },
    {
      id: 'a5',
      statement: 'Vision resonates met externe stakeholders',
      category: 'brand',
      status: 'risky',
      risk: 'medium'
    },
    {
      id: 'a6',
      statement: 'Secondary persona heeft budget authority',
      category: 'persona',
      status: 'validated',
      risk: 'low',
      validationMethod: '1-on-1 Interviews'
    }
  ];
}

/**
 * Generate prioritized actions
 */
export function generatePrioritizedActions(): PrioritizedActionData[] {
  const allItems = [
    ...mockBrandAssets.map(a => ({ ...a, itemType: 'asset' as const })),
    ...mockPersonas.map(p => ({ ...p, itemType: 'persona' as const }))
  ];

  const withStatus = allItems.map(item => ({
    item,
    status: calculateDecisionStatus(item)
  }));

  const actions: PrioritizedActionData[] = [];

  // Action 1: Blocked items (critical)
  const blocked = withStatus.filter(w => w.status.status === 'blocked');
  if (blocked.length > 0) {
    const item = blocked[0];
    actions.push({
      id: `action-blocked-${item.item.id}`,
      title: `Validate ${item.item.type}`,
      reason: `This ${item.item.itemType} is blocking strategic decisions (<50% coverage)`,
      unlocksDecision: `${item.item.type} becomes usable in campaigns`,
      riskReduction: 'Eliminates critical risk of misleading decisions',
      impact: 'critical',
      estimatedTime: item.status.missingTopMethods.includes('Workshop') ? '2-4 hours' : '1-2 hours',
      targetType: item.item.itemType
    });
  }

  // Action 2: At risk items (high)
  const atRisk = withStatus.filter(w => w.status.status === 'decision-at-risk');
  if (atRisk.length > 0) {
    const item = atRisk[0];
    actions.push({
      id: `action-risk-${item.item.id}`,
      title: `Improve ${item.item.type}`,
      reason: `This ${item.item.itemType} has limited validation (50-79% coverage)`,
      unlocksDecision: `${item.item.type} reaches optimal reliability`,
      riskReduction: 'Reduces risk of sub-optimal ROI by 40-60%',
      impact: 'high',
      estimatedTime: '1-2 hours',
      targetType: item.item.itemType
    });
  }

  // Action 3: Validate assumptions (high)
  actions.push({
    id: 'action-assumptions',
    title: 'Test Kritieke Aannames',
    reason: '3 aannames zijn ongetest of risicovol',
    unlocksDecision: 'Strategieën worden gebouwd op gevalideerde hypotheses',
    riskReduction: 'Voorkomt strategische misstappen door onjuiste aannames',
    impact: 'high',
    estimatedTime: '2-3 uur',
    targetType: 'research'
  });

  // Action 4: Complete validation (medium)
  const validationNeeded = withStatus.filter(w => 
    w.status.status === 'decision-at-risk' && w.status.coverage >= 65
  );
  if (validationNeeded.length > 0) {
    const item = validationNeeded[0];
    actions.push({
      id: `action-validate-${item.item.id}`,
      title: `Finaliseer ${item.item.type}`,
      reason: 'Bijna optimaal, nog 1 research method voor 80%+ coverage',
      unlocksDecision: `${item.item.type} wordt volledig gevalideerd`,
      riskReduction: 'Verbetert precision van strategische keuzes met 20-30%',
      impact: 'medium',
      estimatedTime: '1 uur',
      targetType: item.item.itemType
    });
  }

  return actions;
}

/**
 * MOTIVATIE:
 * 
 * 1. DECISION SUMMARY
 *    - Overall status: safe/risk/blocked
 *    - Distribution: counts per status
 *    - Blockers: wat houdt beslissingen tegen
 *    - Unlocks: wat wordt mogelijk
 * 
 * 2. RESEARCH IMPACT
 *    - Voor/na coverage (45% → 65%)
 *    - Wat wordt ontgrendeld (concrete beslissing)
 *    - Risico reductie (business impact)
 *    - Status: in-progress/validation-needed/completed
 * 
 * 3. ASSUMPTIONS
 *    - Explicit assumptions tracking
 *    - Status: validated/risky/invalidated/untested
 *    - Risk level per assumption
 *    - Validation method indien gevalideerd
 * 
 * 4. PRIORITIZED ACTIONS
 *    - Impact-based (critical > high > medium)
 *    - Blocked eerst (kritiek)
 *    - At risk tweede (hoog)
 *    - Assumptions + validation (medium)
 * 
 * 5. BUSINESS FRAMING
 *    - "Elimineert kritiek risico" (niet "improve quality")
 *    - "Verkleint ROI risico met 40-60%" (concrete metric)
 *    - Geschatte tijd voor commitment
 */