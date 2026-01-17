import { BrandAsset } from '../types/brand-asset';
import { DecisionStatus } from '../types/decision-status';

export interface AssetDecisionInfo {
  status: DecisionStatus;
  coverage: number;
  recommendation: string;
  completedMethods: number;
  totalMethods: number;
}

/**
 * Calculate decision readiness status for a brand asset based on research coverage
 */
export function calculateAssetDecisionStatus(asset: BrandAsset): AssetDecisionInfo {
  const totalMethods = asset.researchMethods.length;
  const completedMethods = asset.researchMethods.filter(m => m.status === 'completed').length;
  const coverage = totalMethods > 0 ? Math.round((completedMethods / totalMethods) * 100) : 0;

  let status: DecisionStatus;
  let recommendation: string;

  if (coverage >= 80) {
    status = 'safe-to-decide';
    recommendation = 'This asset has strong validation coverage. You can confidently use it in your strategy and campaigns.';
  } else if (coverage >= 50) {
    status = 'decision-at-risk';
    recommendation = 'This asset has moderate validation. Consider completing additional research methods before critical strategic decisions.';
  } else {
    status = 'blocked';
    recommendation = 'This asset needs more validation. Complete research methods to build a solid foundation for strategic use.';
  }

  return {
    status,
    coverage,
    recommendation,
    completedMethods,
    totalMethods,
  };
}