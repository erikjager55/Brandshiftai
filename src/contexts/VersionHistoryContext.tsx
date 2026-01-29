import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  Version,
  VersionHistoryItem,
  CreateVersionInput,
  RestoreVersionInput,
  ItemType,
} from '../types/version-history';

interface VersionHistoryContextType {
  getVersionHistory: (itemType: ItemType, itemId: string, sectionId?: string) => VersionHistoryItem | null;
  createVersion: (input: CreateVersionInput) => Version;
  restoreVersion: (input: RestoreVersionInput) => Version;
  getVersion: (versionId: string) => Version | null;
  deleteVersion: (versionId: string) => boolean;
}

const VersionHistoryContext = createContext<VersionHistoryContextType | undefined>(undefined);

export function VersionHistoryProvider({ children }: { children: React.ReactNode }) {
  // In-memory storage for demo purposes
  // In production, this would be backed by a database
  const [versionHistories, setVersionHistories] = useState<Map<string, VersionHistoryItem>>(
    new Map()
  );
  const [allVersions, setAllVersions] = useState<Map<string, Version>>(new Map());

  const getHistoryKey = (itemType: ItemType, itemId: string, sectionId?: string) => {
    return sectionId ? `${itemType}-${itemId}-${sectionId}` : `${itemType}-${itemId}`;
  };

  const getVersionHistory = useCallback(
    (itemType: ItemType, itemId: string, sectionId?: string): VersionHistoryItem | null => {
      const key = getHistoryKey(itemType, itemId, sectionId);
      return versionHistories.get(key) || null;
    },
    [versionHistories]
  );

  const createVersion = useCallback(
    (input: CreateVersionInput): Version => {
      const key = getHistoryKey(input.itemType, input.itemId, input.sectionId);
      const existingHistory = versionHistories.get(key);

      const versionNumber = existingHistory ? existingHistory.currentVersion + 1 : 1;
      const now = new Date();

      const newVersion: Version = {
        id: `version-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        itemType: input.itemType,
        itemId: input.itemId,
        sectionId: input.sectionId,
        versionNumber,
        content: input.content,
        createdAt: now,
        createdBy: {
          id: input.userId,
          name: input.userName,
          avatar: input.userAvatar,
        },
        changeNote: input.changeNote || generateAutoChangeNote(input.itemType),
        isRestored: false,
      };

      // Add to all versions map
      setAllVersions((prev) => new Map(prev).set(newVersion.id, newVersion));

      // Update or create version history
      if (existingHistory) {
        const updatedHistory: VersionHistoryItem = {
          ...existingHistory,
          currentVersion: versionNumber,
          versions: [...existingHistory.versions, newVersion],
          updatedAt: now,
        };
        setVersionHistories((prev) => new Map(prev).set(key, updatedHistory));
      } else {
        const newHistory: VersionHistoryItem = {
          id: `history-${Date.now()}`,
          itemType: input.itemType,
          itemId: input.itemId,
          sectionId: input.sectionId,
          currentVersion: versionNumber,
          versions: [newVersion],
          createdAt: now,
          updatedAt: now,
        };
        setVersionHistories((prev) => new Map(prev).set(key, newHistory));
      }

      return newVersion;
    },
    [versionHistories]
  );

  const restoreVersion = useCallback(
    (input: RestoreVersionInput): Version => {
      const versionToRestore = allVersions.get(input.versionId);
      if (!versionToRestore) {
        throw new Error('Version not found');
      }

      const note =
        input.note || `Restored from Version ${versionToRestore.versionNumber}`;

      const restoredVersion = createVersion({
        itemType: versionToRestore.itemType,
        itemId: versionToRestore.itemId,
        sectionId: versionToRestore.sectionId,
        content: versionToRestore.content,
        changeNote: note,
        userId: input.userId,
        userName: input.userName,
        userAvatar: input.userAvatar,
      });

      // Mark as restored
      const updatedRestoredVersion: Version = {
        ...restoredVersion,
        isRestored: true,
        restoredFromVersion: versionToRestore.versionNumber,
      };

      setAllVersions((prev) => new Map(prev).set(updatedRestoredVersion.id, updatedRestoredVersion));

      return updatedRestoredVersion;
    },
    [allVersions, createVersion]
  );

  const getVersion = useCallback(
    (versionId: string): Version | null => {
      return allVersions.get(versionId) || null;
    },
    [allVersions]
  );

  const deleteVersion = useCallback(
    (versionId: string): boolean => {
      const version = allVersions.get(versionId);
      if (!version) return false;

      // Remove from allVersions
      setAllVersions((prev) => {
        const newMap = new Map(prev);
        newMap.delete(versionId);
        return newMap;
      });

      // Remove from version history
      const key = getHistoryKey(version.itemType, version.itemId, version.sectionId);
      const history = versionHistories.get(key);
      if (history) {
        const updatedHistory: VersionHistoryItem = {
          ...history,
          versions: history.versions.filter((v) => v.id !== versionId),
        };
        setVersionHistories((prev) => new Map(prev).set(key, updatedHistory));
      }

      return true;
    },
    [allVersions, versionHistories]
  );

  const value = {
    getVersionHistory,
    createVersion,
    restoreVersion,
    getVersion,
    deleteVersion,
  };

  return (
    <VersionHistoryContext.Provider value={value}>
      {children}
    </VersionHistoryContext.Provider>
  );
}

export function useVersionHistory() {
  const context = useContext(VersionHistoryContext);
  if (!context) {
    throw new Error('useVersionHistory must be used within VersionHistoryProvider');
  }
  return context;
}

/**
 * Generate auto change note based on item type
 */
function generateAutoChangeNote(itemType: ItemType): string {
  const notes: Record<ItemType, string> = {
    'brand-foundation': 'Updated brand foundation',
    brandstyle: 'Updated brandstyle',
    persona: 'Updated persona',
    product: 'Updated product',
    service: 'Updated service',
    insight: 'Updated market insight',
    strategy: 'Updated business strategy',
    objective: 'Updated strategic objective',
    document: 'Updated document',
  };

  return notes[itemType] || 'Updated item';
}
