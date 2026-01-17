/**
 * SERVICE: Bulk Operations
 * 
 * Core service for executing bulk actions on multiple items.
 */

import { BulkActionType, BulkOperationResult, BulkOperationStatus } from '../types/bulk-operations';

export class BulkOperationsService {
  private static undoHistory: Array<{ operationId: string; undoData: any }> = [];

  /**
   * Execute a bulk operation
   */
  static async executeBulkOperation<T extends { id: string }>(
    action: BulkActionType,
    items: T[],
    params?: Record<string, any>,
    onProgress?: (progress: number) => void
  ): Promise<BulkOperationResult> {
    const operationId = `bulk-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const result: BulkOperationResult = {
      id: operationId,
      action,
      status: 'in-progress' as BulkOperationStatus,
      itemsTotal: items.length,
      itemsProcessed: 0,
      itemsSucceeded: 0,
      itemsFailed: 0,
      startedAt: new Date(),
      errors: [],
      canUndo: false,
      undoData: {}
    };

    try {
      // Store original state for undo
      const originalState = items.map(item => ({ ...item }));

      // Process items with simulated delay
      for (let i = 0; i < items.length; i++) {
        try {
          // Simulate processing time
          await new Promise(resolve => setTimeout(resolve, 50));

          // Execute action
          await this.executeAction(action, items[i], params);
          
          result.itemsProcessed++;
          result.itemsSucceeded++;
          
          // Report progress
          if (onProgress) {
            onProgress(Math.round((result.itemsProcessed / items.length) * 100));
          }
        } catch (error) {
          result.itemsFailed++;
          result.errors?.push(`Failed to process item ${items[i].id}: ${error}`);
        }
      }

      result.status = result.itemsFailed === 0 ? 'completed' : 'failed';
      result.completedAt = new Date();

      // Store undo data for supported actions
      if (this.canUndo(action)) {
        result.canUndo = true;
        result.undoData = {
          action,
          originalState,
          itemIds: items.map(i => i.id)
        };
        this.undoHistory.push({
          operationId,
          undoData: result.undoData
        });
      }

      return result;
    } catch (error) {
      result.status = 'failed';
      result.completedAt = new Date();
      result.errors?.push(`Bulk operation failed: ${error}`);
      return result;
    }
  }

  /**
   * Execute a single action on an item
   */
  private static async executeAction<T>(
    action: BulkActionType,
    item: T,
    params?: Record<string, any>
  ): Promise<void> {
    switch (action) {
      case 'change-status':
        if (params?.status) {
          (item as any).status = params.status;
        }
        break;

      case 'assign-tags':
        if (params?.tags) {
          const currentTags = (item as any).tags || [];
          (item as any).tags = [...new Set([...currentTags, ...params.tags])];
        }
        break;

      case 'remove-tags':
        if (params?.tags) {
          const currentTags = (item as any).tags || [];
          (item as any).tags = currentTags.filter((t: string) => !params.tags.includes(t));
        }
        break;

      case 'change-category':
        if (params?.category) {
          (item as any).category = params.category;
        }
        break;

      case 'change-priority':
        if (params?.priority) {
          (item as any).priority = params.priority;
        }
        break;

      case 'archive':
        (item as any).isArchived = true;
        (item as any).archivedAt = new Date().toISOString();
        break;

      case 'restore':
        (item as any).isArchived = false;
        delete (item as any).archivedAt;
        break;

      case 'delete':
        // In a real app, this would call an API
        console.log('Delete item:', (item as any).id);
        break;

      case 'duplicate':
        // In a real app, this would create a copy
        console.log('Duplicate item:', (item as any).id);
        break;

      default:
        throw new Error(`Unsupported action: ${action}`);
    }
  }

  /**
   * Check if an action can be undone
   */
  private static canUndo(action: BulkActionType): boolean {
    const undoableActions: BulkActionType[] = [
      'change-status',
      'assign-tags',
      'remove-tags',
      'change-category',
      'change-priority',
      'archive',
      'restore'
    ];
    return undoableActions.includes(action);
  }

  /**
   * Undo a bulk operation
   */
  static async undoBulkOperation(operationId: string): Promise<boolean> {
    const historyEntry = this.undoHistory.find(h => h.operationId === operationId);
    
    if (!historyEntry) {
      return false;
    }

    const { undoData } = historyEntry;
    
    try {
      // Restore original state
      // In a real app, this would call an API to restore data
      console.log('Undo operation:', operationId, undoData);
      
      // Remove from history
      this.undoHistory = this.undoHistory.filter(h => h.operationId !== operationId);
      
      return true;
    } catch (error) {
      console.error('Failed to undo operation:', error);
      return false;
    }
  }

  /**
   * Get available actions for a set of items
   */
  static getAvailableActions<T>(items: T[]): BulkActionType[] {
    if (items.length === 0) return [];

    // All actions are available for now
    // In a real app, this would check permissions, item states, etc.
    return [
      'change-status',
      'assign-tags',
      'remove-tags',
      'change-category',
      'change-priority',
      'archive',
      'restore',
      'delete',
      'export',
      'duplicate'
    ];
  }

  /**
   * Validate bulk operation
   */
  static validateBulkOperation<T>(
    action: BulkActionType,
    items: T[],
    params?: Record<string, any>
  ): string | null {
    if (items.length === 0) {
      return 'No items selected';
    }

    switch (action) {
      case 'change-status':
        if (!params?.status) {
          return 'Please select a status';
        }
        break;

      case 'assign-tags':
      case 'remove-tags':
        if (!params?.tags || params.tags.length === 0) {
          return 'Please select at least one tag';
        }
        break;

      case 'change-category':
        if (!params?.category) {
          return 'Please select a category';
        }
        break;

      case 'change-priority':
        if (!params?.priority) {
          return 'Please select a priority';
        }
        break;
    }

    return null;
  }
}
