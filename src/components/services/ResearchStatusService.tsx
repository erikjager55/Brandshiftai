/**
 * Research Status Service
 * Centralized service for tracking research tool statuses across all methods
 * This enables status-aware navigation with real-time progress indicators
 */

export interface ToolSessionStatus {
  id: string;
  status: 'not-started' | 'in-progress' | 'needs-review' | 'completed' | 'locked';
  progress: number; // 0-100
  lastUpdated?: Date;
  assignedTo?: string;
  needsAttention?: boolean;
}

export interface ToolStatus {
  toolId: string; // e.g., 'interviews', 'canvas-workshop', 'questionnaire', 'ai-agent'
  toolName: string;
  assetId: string;
  totalSessions: number;
  sessions: ToolSessionStatus[];
  overallStatus: 'not-started' | 'in-progress' | 'completed' | 'needs-attention' | 'to-buy';
  completionPercentage: number; // 0-100
  lastActivity?: Date;
  isPurchased?: boolean; // Track if the tool/sessions are purchased
}

/**
 * Mock data service - In production, this would fetch from backend/database
 */
export class ResearchStatusService {
  // Simulated data storage
  private static toolStatuses: Map<string, ToolStatus> = new Map();

  /**
   * Initialize with mock data
   */
  static initialize() {
    // Interviews for Golden Circle (Asset 1)
    this.toolStatuses.set('1-interviews', {
      toolId: 'interviews',
      toolName: '1-on-1 Interviews',
      assetId: '1',
      totalSessions: 4,
      sessions: [
        { id: 'interview-1', status: 'locked', progress: 100, lastUpdated: new Date('2025-12-15') },
        { id: 'interview-2', status: 'locked', progress: 100, lastUpdated: new Date('2025-12-14') },
        { id: 'interview-3', status: 'in-progress', progress: 65, lastUpdated: new Date('2025-12-18'), needsAttention: false },
        { id: 'interview-4', status: 'in-progress', progress: 30, lastUpdated: new Date('2025-12-17'), needsAttention: true }
      ],
      overallStatus: 'in-progress',
      completionPercentage: 74, // (100+100+65+30)/4
      lastActivity: new Date('2025-12-18')
    });

    // Canvas Workshop for Golden Circle (Asset 1)
    this.toolStatuses.set('1-canvas-workshop', {
      toolId: 'canvas-workshop',
      toolName: 'Canvas Workshop',
      assetId: '1',
      totalSessions: 3,
      sessions: [
        { id: 'workshop-1', status: 'locked', progress: 100, lastUpdated: new Date('2025-12-10') },
        { id: 'workshop-2', status: 'needs-review', progress: 100, lastUpdated: new Date('2025-12-18'), needsAttention: true },
        { id: 'workshop-3', status: 'in-progress', progress: 45, lastUpdated: new Date('2025-12-19'), needsAttention: false }
      ],
      overallStatus: 'needs-attention',
      completionPercentage: 82,
      lastActivity: new Date('2025-12-19')
    });

    // Questionnaire for Golden Circle (Asset 1)
    this.toolStatuses.set('1-questionnaire', {
      toolId: 'questionnaire',
      toolName: 'Questionnaire',
      assetId: '1',
      totalSessions: 2,
      sessions: [
        { id: 'questionnaire-1', status: 'in-progress', progress: 48, lastUpdated: new Date('2025-12-18'), needsAttention: false },
        { id: 'questionnaire-2', status: 'not-started', progress: 0 }
      ],
      overallStatus: 'in-progress',
      completionPercentage: 24,
      lastActivity: new Date('2025-12-18')
    });

    // AI Agent for Golden Circle (Asset 1)
    this.toolStatuses.set('1-ai-agent', {
      toolId: 'ai-agent',
      toolName: 'AI Agent',
      assetId: '1',
      totalSessions: 1,
      sessions: [
        { id: 'ai-session-1', status: 'locked', progress: 100, lastUpdated: new Date('2025-12-12') }
      ],
      overallStatus: 'completed',
      completionPercentage: 100,
      lastActivity: new Date('2025-12-12')
    });

    // Vision & Mission (Asset 2) - AI Agent only
    this.toolStatuses.set('2-ai-agent', {
      toolId: 'ai-agent',
      toolName: 'AI Agent',
      assetId: '2',
      totalSessions: 1,
      sessions: [
        { id: 'ai-session-2', status: 'in-progress', progress: 75, lastUpdated: new Date('2025-12-19'), needsAttention: false }
      ],
      overallStatus: 'in-progress',
      completionPercentage: 75,
      lastActivity: new Date('2025-12-19')
    });

    // Brand Archetype (Asset 4) - Multiple tools
    this.toolStatuses.set('4-ai-agent', {
      toolId: 'ai-agent',
      toolName: 'AI Agent',
      assetId: '4',
      totalSessions: 1,
      sessions: [
        { id: 'ai-session-4', status: 'locked', progress: 100, lastUpdated: new Date('2025-12-05') }
      ],
      overallStatus: 'completed',
      completionPercentage: 100,
      lastActivity: new Date('2025-12-05')
    });

    // Core Values (Asset 5)
    this.toolStatuses.set('5-ai-agent', {
      toolId: 'ai-agent',
      toolName: 'AI Agent',
      assetId: '5',
      totalSessions: 1,
      sessions: [
        { id: 'ai-session-5', status: 'needs-review', progress: 100, lastUpdated: new Date('2025-12-18'), needsAttention: true }
      ],
      overallStatus: 'needs-attention',
      completionPercentage: 100,
      lastActivity: new Date('2025-12-18')
    });

    // Social Relevancy (Asset 6) - To Buy example
    this.toolStatuses.set('6-interviews', {
      toolId: 'interviews',
      toolName: '1-on-1 Interviews',
      assetId: '6',
      totalSessions: 0,
      sessions: [],
      overallStatus: 'to-buy',
      completionPercentage: 0,
      isPurchased: false
    });

    // Market Trends (Asset 7) - To Buy example
    this.toolStatuses.set('7-canvas-workshop', {
      toolId: 'canvas-workshop',
      toolName: 'Canvas Workshop',
      assetId: '7',
      totalSessions: 0,
      sessions: [],
      overallStatus: 'to-buy',
      completionPercentage: 0,
      isPurchased: false
    });
  }

  /**
   * Get status for a specific tool and asset combination
   */
  static getToolStatus(assetId: string, toolId: string): ToolStatus | null {
    const key = `${assetId}-${toolId}`;
    return this.toolStatuses.get(key) || null;
  }

  /**
   * Get all tool statuses for a specific asset
   */
  static getAssetToolStatuses(assetId: string): ToolStatus[] {
    const statuses: ToolStatus[] = [];
    this.toolStatuses.forEach((status, key) => {
      if (key.startsWith(`${assetId}-`)) {
        statuses.push(status);
      }
    });
    return statuses;
  }

  /**
   * Calculate overall asset progress across all tools
   */
  static getAssetOverallProgress(assetId: string): {
    totalTools: number;
    completedTools: number;
    inProgressTools: number;
    needsAttentionTools: number;
    overallPercentage: number;
  } {
    const toolStatuses = this.getAssetToolStatuses(assetId);
    
    let totalTools = toolStatuses.length;
    let completedTools = 0;
    let inProgressTools = 0;
    let needsAttentionTools = 0;
    let totalPercentage = 0;

    toolStatuses.forEach(status => {
      totalPercentage += status.completionPercentage;
      
      if (status.overallStatus === 'completed') {
        completedTools++;
      } else if (status.overallStatus === 'in-progress') {
        inProgressTools++;
      } else if (status.overallStatus === 'needs-attention') {
        needsAttentionTools++;
      }
    });

    return {
      totalTools,
      completedTools,
      inProgressTools,
      needsAttentionTools,
      overallPercentage: totalTools > 0 ? Math.round(totalPercentage / totalTools) : 0
    };
  }

  /**
   * Get quick status summary for sidebar display
   */
  static getToolStatusSummary(assetId: string, toolId: string): {
    statusText: string;
    statusColor: string;
    needsAttention: boolean;
    progressPercentage: number;
    completedCount: number;
    totalCount: number;
  } | null {
    const status = this.getToolStatus(assetId, toolId);
    if (!status) return null;

    const completed = status.sessions.filter(s => s.status === 'locked' || s.status === 'completed').length;
    const needsReview = status.sessions.filter(s => s.status === 'needs-review').length;
    const needsAttention = status.sessions.some(s => s.needsAttention) || needsReview > 0;

    let statusText = '';
    let statusColor = '';

    if (status.overallStatus === 'to-buy') {
      statusText = 'To Buy';
      statusColor = 'text-purple-600';
    } else if (status.overallStatus === 'completed') {
      statusText = 'Completed';
      statusColor = 'text-green-600';
    } else if (status.overallStatus === 'needs-attention') {
      statusText = 'Needs Review';
      statusColor = 'text-orange-600';
    } else if (status.overallStatus === 'in-progress') {
      // Make it clearer for interviews vs other tools
      if (status.toolId === 'interviews') {
        statusText = `${completed}/${status.totalSessions} interviews`;
      } else if (status.toolId === 'canvas-workshop') {
        statusText = `${completed}/${status.totalSessions} workshops`;
      } else if (status.toolId === 'questionnaire') {
        statusText = `${completed}/${status.totalSessions} surveys`;
      } else {
        statusText = `${completed}/${status.totalSessions} done`;
      }
      statusColor = 'text-blue-600';
    } else {
      statusText = 'Not Started';
      statusColor = 'text-gray-500';
    }

    return {
      statusText,
      statusColor,
      needsAttention,
      progressPercentage: status.completionPercentage,
      completedCount: completed,
      totalCount: status.totalSessions
    };
  }

  /**
   * Get sessions that need attention across all tools
   */
  static getSessionsNeedingAttention(): Array<{
    assetId: string;
    toolId: string;
    toolName: string;
    sessionId: string;
    reason: string;
  }> {
    const needsAttention: Array<{
      assetId: string;
      toolId: string;
      toolName: string;
      sessionId: string;
      reason: string;
    }> = [];

    this.toolStatuses.forEach((status) => {
      status.sessions.forEach((session) => {
        if (session.status === 'needs-review') {
          needsAttention.push({
            assetId: status.assetId,
            toolId: status.toolId,
            toolName: status.toolName,
            sessionId: session.id,
            reason: 'Ready for review'
          });
        } else if (session.needsAttention && session.status === 'in-progress') {
          needsAttention.push({
            assetId: status.assetId,
            toolId: status.toolId,
            toolName: status.toolName,
            sessionId: session.id,
            reason: 'Requires action'
          });
        }
      });
    });

    return needsAttention;
  }

  /**
   * Update session status (for demo purposes)
   */
  static updateSessionStatus(
    assetId: string,
    toolId: string,
    sessionId: string,
    newStatus: ToolSessionStatus['status'],
    progress?: number
  ) {
    const key = `${assetId}-${toolId}`;
    const toolStatus = this.toolStatuses.get(key);
    
    if (toolStatus) {
      const sessionIndex = toolStatus.sessions.findIndex(s => s.id === sessionId);
      if (sessionIndex !== -1) {
        toolStatus.sessions[sessionIndex].status = newStatus;
        if (progress !== undefined) {
          toolStatus.sessions[sessionIndex].progress = progress;
        }
        toolStatus.sessions[sessionIndex].lastUpdated = new Date();
        
        // Recalculate overall status
        this.recalculateToolStatus(toolStatus);
      }
    }
  }

  /**
   * Recalculate tool overall status based on sessions
   */
  private static recalculateToolStatus(toolStatus: ToolStatus) {
    const allCompleted = toolStatus.sessions.every(s => 
      s.status === 'locked' || s.status === 'completed'
    );
    const anyNeedsReview = toolStatus.sessions.some(s => 
      s.status === 'needs-review' || s.needsAttention
    );
    const anyInProgress = toolStatus.sessions.some(s => 
      s.status === 'in-progress'
    );

    if (allCompleted) {
      toolStatus.overallStatus = 'completed';
    } else if (anyNeedsReview) {
      toolStatus.overallStatus = 'needs-attention';
    } else if (anyInProgress) {
      toolStatus.overallStatus = 'in-progress';
    } else {
      toolStatus.overallStatus = 'not-started';
    }

    // Recalculate completion percentage
    const totalProgress = toolStatus.sessions.reduce((sum, s) => sum + s.progress, 0);
    toolStatus.completionPercentage = Math.round(totalProgress / toolStatus.totalSessions);
  }
}

// Initialize on module load
ResearchStatusService.initialize();