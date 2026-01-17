// Brand Asset Type Definitions

import type { 
  ValidationMethodId,
  ResearchMethodType,
  ValidationMethodStatus,
  ResearchMethodStatus,
  ValidationMethodMetadata,
  ValidationMethodReference
} from './validation';

// Re-export for backwards compatibility
export type { 
  ValidationMethodId,
  ResearchMethodType,
  ValidationMethodStatus,
  ResearchMethodStatus,
  ValidationMethodMetadata,
  ValidationMethodReference
};

export type AssetStatus = 'awaiting-research' | 'in-development' | 'ready-to-validate' | 'validated';
export type AssetPriority = 'essential' | 'recommended' | 'nice-to-have';

export type BundleType = 'essentials' | 'professional' | 'enterprise' | 'custom';

export interface Bundle {
  id: string;
  name: string;
  type: BundleType;
  description: string;
  includedAssets: string[]; // Asset IDs that are part of this bundle
  color: string; // Color for visual representation
}

// ResearchMethodMetadata and ResearchMethodReference now in /types/validation.ts
// Use ValidationMethodMetadata and ValidationMethodReference instead

export type ContentSectionStatus = 'draft' | 'ready-to-validate' | 'validated';

export interface ResearchMethod {
  type: ResearchMethodType;
  status: ResearchMethodStatus;
  progress?: number; // 0-100 if in-progress
  completedAt?: string;
  metadata?: ValidationMethodMetadata;
  artifacts?: string[]; // IDs of generated content
}

export interface ContentSection {
  id: string;
  title: string;
  content: string;
  status: ContentSectionStatus;
  sources: ValidationMethodReference[];
  validatedAt?: string;
  validatedBy?: string;
}

export interface BrandAsset {
  id: string;
  type: string;
  title: string;
  content: string;
  category: string;
  lastUpdated: string;
  status: AssetStatus;
  description?: string;
  isCritical?: boolean; // Indicates if this is a critical asset that must be filled
  priority?: AssetPriority; // Indicates the priority of the asset
  
  // Research tracking
  researchMethods: ResearchMethod[];
  researchCoverage: number; // 0-100%
  
  // Content tracking
  contentSections?: ContentSection[];
  artifactsGenerated?: number;
  artifactsValidated?: number;
  
  // Boost tracking
  isBoosted?: boolean;
  boostedAt?: string;
  boostReason?: string;
  
  // Metadata
  validatedBy?: string;
  validatedAt?: string;
}

export interface AssetFilterOptions {
  status?: AssetStatus[];
  methods?: ResearchMethodType[];
  coverageMin?: number;
  coverageMax?: number;
  lastUpdatedDays?: number;
}