/**
 * Version History Types
 * For tracking changes to knowledge items across the platform
 */

export type ItemType =
  | 'brand-foundation'
  | 'brandstyle'
  | 'persona'
  | 'product'
  | 'service'
  | 'insight'
  | 'strategy'
  | 'objective'
  | 'document';

export interface VersionUser {
  id: string;
  name: string;
  avatar?: string;
}

export interface Version {
  id: string;
  itemType: ItemType;
  itemId: string;
  sectionId?: string; // For sectioned items like Brand Foundation
  versionNumber: number;
  content: any; // The actual content snapshot
  createdAt: Date;
  createdBy: VersionUser;
  changeNote?: string; // Optional description of changes
  isRestored?: boolean; // True if this version was created by restore
  restoredFromVersion?: number; // Which version it was restored from
}

export interface VersionHistoryItem {
  id: string;
  itemType: ItemType;
  itemId: string;
  sectionId?: string;
  currentVersion: number;
  versions: Version[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateVersionInput {
  itemType: ItemType;
  itemId: string;
  sectionId?: string;
  content: any;
  changeNote?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
}

export interface RestoreVersionInput {
  versionId: string;
  note?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
}

export interface CompareVersionsInput {
  itemType: ItemType;
  itemId: string;
  version1Number: number;
  version2Number: number;
}

/**
 * Diff types for comparing versions
 */
export type DiffType = 'added' | 'removed' | 'unchanged';

export interface TextDiff {
  type: DiffType;
  text: string;
}

export interface VersionDiff {
  field: string;
  label: string;
  oldValue: any;
  newValue: any;
  textDiff?: TextDiff[];
}
