/**
 * InterviewsManager - Wrapper for backward compatibility
 * Redirects to the new InterviewsManagerEnhanced component
 */

import React from 'react';
import { InterviewsManagerEnhanced } from './InterviewsManagerEnhanced';

interface InterviewsManagerProps {
  assetId: string;
  onRerender?: () => void;
  onEdit?: (data: any) => void;
  initialConfig?: {
    numberOfInterviews: number;
    selectedAssets: string[];
  };
  researchPlanConfig?: {
    entryMode?: 'asset' | 'bundle' | 'questionnaire';
    unlockedAssets?: string[];
    numberOfInterviews?: number;
  } | null;
  onNavigateToAsset?: (assetId: string) => void;
  onReturnToHub?: () => void;
}

export function InterviewsManager(props: InterviewsManagerProps) {
  // Simply delegate to the new enhanced component
  return <InterviewsManagerEnhanced assetId={props.assetId} />;
}
