/**
 * Enhanced Asset Card - Using Unified StatusCard
 * Brand assets displayed with consistent design system
 */

import React from 'react';
import { BrandAsset, ResearchMethod } from '../../types/brand-asset';
import { StatusCard } from '../unified/StatusCard';
import { brandAssetToCardData } from '../../utils/status-card-adapters';
import { ResearchMethodCard } from '../research/ResearchMethodCard';
import { VALIDATION_METHODS } from '../../config/validation-methods';
import { standardizeMethodData } from '../../utils/research-method-utils';
import { motion } from 'motion/react';
import { Sparkles, Lock } from 'lucide-react';

interface EnhancedAssetCardNewProps {
  asset: BrandAsset;
  onClick?: () => void;
  onMethodClick?: (method: ResearchMethod, mode: 'work' | 'results') => void;
  lockedToolIds?: string[];
  unlockingToolId?: string | null;
  onToolUnlockClick?: (toolId: string, toolName: string) => void;
}

/**
 * Enhanced Asset Card - Uses Unified StatusCard
 * Includes validation methods section
 */
export function EnhancedAssetCardNew({
  asset,
  onClick,
  onMethodClick,
  lockedToolIds,
  unlockingToolId,
  onToolUnlockClick
}: EnhancedAssetCardNewProps) {
  // Convert to card data
  const cardData = brandAssetToCardData(asset, onClick, onMethodClick);

  // Render validation methods (same logic as original)
  const renderMethodStatus = (method: ResearchMethod, idx: number) => {
    const isToolLocked = lockedToolIds?.includes(method.type) || false;
    const isToolUnlocking = unlockingToolId === method.type;

    const validationMethod = VALIDATION_METHODS.find(m => m.id === method.type);
    if (!validationMethod) return null;

    // Handle unlock animation state
    if (isToolUnlocking) {
      return (
        <motion.div
          key={idx}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative overflow-hidden rounded-lg border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 p-4"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative flex items-center justify-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="h-6 w-6 text-primary" />
            </motion.div>
            <div className="text-center">
              <p className="font-semibold text-primary">Unlocking {validationMethod.name}...</p>
              <p className="text-xs text-muted-foreground mt-1">Activating premium tool</p>
            </div>
          </div>
        </motion.div>
      );
    }

    // Use standardized method data transformation
    const standardizedData = standardizeMethodData(method, isToolLocked);
    if (!standardizedData) return null;

    return (
      <ResearchMethodCard
        key={idx}
        methodId={standardizedData.methodId}
        title={standardizedData.title}
        description={standardizedData.description}
        duration={standardizedData.duration}
        category={standardizedData.category}
        unlockStatus={standardizedData.unlockStatus}
        progressState={standardizedData.progressState}
        progressValue={standardizedData.progressValue}
        impactValue={standardizedData.impactValue}
        qualityScore={standardizedData.qualityScore}
        confidence={standardizedData.confidence}
        icon={standardizedData.icon}
        primaryActionLabel={standardizedData.primaryActionLabel}
        onPrimaryAction={() => {
          if (standardizedData.progressState === 'locked' && onToolUnlockClick) {
            onToolUnlockClick(method.type, standardizedData.title);
          } else if (onMethodClick) {
            // For AI Exploration, always go to 'work' mode (chat interface) even if completed
            // For other methods, go to 'results' mode when completed
            const mode = method.type === 'ai-exploration' 
              ? 'work' 
              : (standardizedData.progressState === 'completed' ? 'results' : 'work');
            onMethodClick(method, mode);
          }
        }}
        showActions={true}
        animationDelay={0}
        completedAt={standardizedData.completedAt}
        variant="compact"
      />
    );
  };

  return (
    <div className="space-y-4">
      {/* Main Status Card */}
      <StatusCard data={cardData} />

      {/* Validation Methods Section */}
      {asset.researchMethods.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">
            Validation Methods
          </h4>
          <div className="space-y-2">
            {asset.researchMethods.map((method, idx) => renderMethodStatus(method, idx))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Grid component for multiple assets
 */
interface EnhancedAssetCardGridNewProps {
  assets: BrandAsset[];
  onAssetClick?: (assetId: string) => void;
  onMethodClick?: (assetId: string, method: ResearchMethod, mode: 'work' | 'results') => void;
  lockedToolIds?: string[];
  unlockingToolId?: string | null;
  onToolUnlockClick?: (toolId: string, toolName: string) => void;
}

export function EnhancedAssetCardGridNew({
  assets,
  onAssetClick,
  onMethodClick,
  lockedToolIds,
  unlockingToolId,
  onToolUnlockClick
}: EnhancedAssetCardGridNewProps) {
  if (assets.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No assets available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {assets.map((asset) => (
        <EnhancedAssetCardNew
          key={asset.id}
          asset={asset}
          onClick={onAssetClick ? () => onAssetClick(asset.id) : undefined}
          onMethodClick={onMethodClick ? (method, mode) => onMethodClick(asset.id, method, mode) : undefined}
          lockedToolIds={lockedToolIds}
          unlockingToolId={unlockingToolId}
          onToolUnlockClick={onToolUnlockClick}
        />
      ))}
    </div>
  );
}