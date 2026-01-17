/**
 * Enhanced Asset Card - Using Unified EntityCard
 * Brand assets displayed with same layout as personas
 */

import React, { memo } from 'react';
import { BrandAsset, ResearchMethod } from '../../types/brand-asset';
import { EntityCard } from '../unified/EntityCard';
import { brandAssetToEntityCard } from '../../utils/entity-card-adapters';

interface EnhancedAssetCardProps {
  asset: BrandAsset;
  onClick?: () => void;
  onMethodClick?: (method: ResearchMethod, mode: 'work' | 'results') => void;
  lockedToolIds?: string[];
  unlockingToolId?: string | null;
  onToolUnlockClick?: (toolId: string, toolName: string) => void;
}

/**
 * Enhanced Asset Card - Uses Unified EntityCard (same as personas)
 * Wrapped with React.memo for performance optimization
 */
export const EnhancedAssetCard = memo(function EnhancedAssetCard({
  asset,
  onClick,
  onMethodClick,
  lockedToolIds,
  unlockingToolId,
  onToolUnlockClick,
}: EnhancedAssetCardProps) {
  // For now, we ignore locked tools in the EntityCard
  // TODO: Add support for locked tools in EntityCard if needed
  const entityData = brandAssetToEntityCard(asset, onClick, onMethodClick);

  return <EntityCard data={entityData} />;
});