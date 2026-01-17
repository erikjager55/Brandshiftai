import React from 'react';

// Types for session results
export interface SessionResult {
  sessionId: string;
  assetId: string;
  sessionType: string;
  completedDate: string;
  data: any;
  confidence: number;
  status: 'completed' | 'in-progress' | 'failed';
}

export interface AggregatedAssetData {
  assetId: string;
  assetType: string;
  sessions: SessionResult[];
  aggregatedData: any;
  lastUpdated: string;
  confidence: number;
}

// Mock session results data - in real app would come from API/database
const sessionResults: SessionResult[] = [
  // Golden Circle (Asset 1) Sessions
  {
    sessionId: 'ai-agent-1',
    assetId: '1',
    sessionType: 'ai-agent',
    completedDate: '2025-01-08',
    confidence: 92,
    status: 'completed',
    data: {
      why: "To empower businesses through innovative technology solutions that create meaningful human connections and drive sustainable growth.",
      how: "By combining cutting-edge AI and automation with human-centered design principles, creating intuitive solutions that seamlessly integrate into existing workflows.",
      what: "We develop intelligent business automation platforms, AI-powered analytics tools, and digital transformation consulting services for mid-market companies."
    }
  },
  {
    sessionId: 'canvas-workshop-1',
    assetId: '1',
    sessionType: 'canvas-workshop',
    completedDate: '2025-01-07',
    confidence: 95,
    status: 'completed',
    data: {
      why: "To democratize business transformation through accessible, human-centered technology solutions.",
      how: "Through collaborative workshops, AI-powered insights, and iterative design processes that put people first.",
      what: "Business transformation consulting, AI automation platforms, and digital experience design services."
    }
  },
  
  // Vision Statement (Asset 2) Sessions  
  {
    sessionId: 'ai-agent-2',
    assetId: '2',
    sessionType: 'ai-agent',
    completedDate: '2025-01-08',
    confidence: 88,
    status: 'completed',
    data: {
      vision: "To become the leading catalyst for business transformation, creating a world where technology amplifies human potential and drives sustainable prosperity for organizations of all sizes.",
      timeframe: "10 years",
      keyElements: [
        "Global leadership in business transformation",
        "Technology that amplifies human potential", 
        "Sustainable prosperity for all organization sizes",
        "Catalyst for positive change"
      ]
    }
  },
  {
    sessionId: 'future-visioning-2',
    assetId: '2',
    sessionType: 'future-visioning',
    completedDate: '2025-01-05',
    confidence: 89,
    status: 'completed',
    data: {
      vision: "To be the global innovator that transforms how businesses leverage technology, creating sustainable value and meaningful impact for communities worldwide.",
      timeframe: "10 years",
      keyElements: [
        "Global innovation leadership",
        "Sustainable value creation",
        "Community impact focus",
        "Technology transformation expertise"
      ]
    }
  },

  // Mission Statement (Asset 3) Sessions
  {
    sessionId: 'ai-agent-3',
    assetId: '3',
    sessionType: 'ai-agent',
    completedDate: '2025-01-08',
    confidence: 90,
    status: 'completed',
    data: {
      mission: "We democratize advanced technology by creating intelligent, human-centered business solutions that empower organizations to thrive in an ever-evolving digital landscape while maintaining their core values and human connections.",
      keyComponents: {
        what: "Create intelligent business solutions",
        how: "Through human-centered design and democratized technology",
        why: "To empower organizations while preserving human values"
      }
    }
  },
  {
    sessionId: 'mission-workshop-3',
    assetId: '3',
    sessionType: 'mission-workshop',
    completedDate: '2025-01-06',
    confidence: 96,
    status: 'completed',
    data: {
      mission: "We deliver cutting-edge digital solutions that combine creativity, technology, and strategic thinking to help our clients achieve sustainable growth and meaningful transformation.",
      keyComponents: {
        what: "Deliver cutting-edge digital solutions",
        how: "Combining creativity, technology, and strategic thinking",
        why: "To achieve sustainable growth and meaningful transformation"
      }
    }
  },

  // Brand Archetype (Asset 4) Sessions
  {
    sessionId: 'ai-agent-4',
    assetId: '4',
    sessionType: 'ai-agent',
    completedDate: '2025-01-08',
    confidence: 91,
    status: 'completed',
    data: {
      primaryArchetype: {
        name: "The Creator",
        match: 78,
        traits: ["innovative", "artistic", "imaginative", "transformational"],
        motivation: "To create something of enduring value",
        shadow: "Perfectionism, over-engineering"
      },
      secondaryArchetype: {
        name: "The Magician",
        match: 65,
        traits: ["visionary", "transformational", "charismatic"],
        motivation: "To transform reality and make dreams come true"
      }
    }
  },
  {
    sessionId: 'archetype-assessment-4',
    assetId: '4',
    sessionType: 'archetype-assessment',
    completedDate: '2025-01-04',
    confidence: 91,
    status: 'completed',
    data: {
      primaryArchetype: {
        name: "The Creator",
        match: 82,
        traits: ["creative", "innovative", "artistic", "entrepreneurial"],
        motivation: "To create something meaningful and lasting",
        shadow: "Perfectionism, lack of practical application"
      },
      secondaryArchetype: {
        name: "The Sage",
        match: 71,
        traits: ["wise", "knowledgeable", "truthful"],
        motivation: "To understand the world and share knowledge"
      }
    }
  },

  // Core Values (Asset 5) Sessions
  {
    sessionId: 'ai-agent-5',
    assetId: '5',
    sessionType: 'ai-agent',
    completedDate: '2025-01-08',
    confidence: 91,
    status: 'completed',
    data: {
      values: [
        { name: "Innovation", description: "Continuously pushing boundaries to create breakthrough solutions", behaviors: ["Experimenting with new technologies", "Challenging status quo", "Encouraging creative thinking"] },
        { name: "Human-Centricity", description: "Putting people first in everything we design and build", behaviors: ["User research and testing", "Inclusive design practices", "Empathy-driven decisions"] },
        { name: "Integrity", description: "Acting with honesty, transparency, and ethical principles", behaviors: ["Transparent communication", "Ethical business practices", "Honest feedback and reporting"] },
        { name: "Excellence", description: "Delivering the highest quality in every interaction and solution", behaviors: ["Continuous improvement", "Attention to detail", "Exceeding expectations"] },
        { name: "Collaboration", description: "Working together to achieve more than we could alone", behaviors: ["Cross-functional teamwork", "Open communication", "Shared success celebration"] }
      ]
    }
  },
  {
    sessionId: 'values-workshop-5',
    assetId: '5',
    sessionType: 'values-workshop',
    completedDate: '2025-01-03',
    confidence: 98,
    status: 'completed',
    data: {
      values: [
        { name: "Innovation", description: "Pioneering new solutions and approaches", behaviors: ["Research and development", "Creative problem solving", "Technology adoption"] },
        { name: "Integrity", description: "Unwavering commitment to ethical principles", behaviors: ["Honest communication", "Ethical decision making", "Transparency"] },
        { name: "Collaboration", description: "Achieving collective success through teamwork", behaviors: ["Knowledge sharing", "Inclusive participation", "Mutual support"] },
        { name: "Excellence", description: "Pursuit of the highest standards in everything we do", behaviors: ["Quality focus", "Continuous learning", "Performance optimization"] },
        { name: "Customer-Centricity", description: "Placing customer needs at the heart of our decisions", behaviors: ["Customer feedback integration", "Service excellence", "Long-term relationships"] }
      ]
    }
  }
];

export class SessionDataService {
  static getSessionResults(assetId: string): SessionResult[] {
    return sessionResults.filter(session => session.assetId === assetId);
  }

  static getLatestSessionResult(assetId: string, sessionType?: string): SessionResult | null {
    let filteredSessions = sessionResults.filter(session => 
      session.assetId === assetId && session.status === 'completed'
    );
    
    if (sessionType) {
      filteredSessions = filteredSessions.filter(session => session.sessionType === sessionType);
    }
    
    return filteredSessions.sort((a, b) => 
      new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
    )[0] || null;
  }

  static aggregateAssetData(assetId: string): AggregatedAssetData | null {
    const sessions = this.getSessionResults(assetId);
    const completedSessions = sessions.filter(s => s.status === 'completed');
    
    if (completedSessions.length === 0) {
      return null;
    }

    // Sort by date, most recent first
    const sortedSessions = completedSessions.sort((a, b) => 
      new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
    );

    const latestSession = sortedSessions[0];
    const avgConfidence = Math.round(
      completedSessions.reduce((sum, session) => sum + session.confidence, 0) / completedSessions.length
    );

    // Asset-specific aggregation logic
    let aggregatedData = {};
    switch (assetId) {
      case '1': // Golden Circle
        aggregatedData = this.aggregateGoldenCircleData(completedSessions);
        break;
      case '2': // Vision Statement
        aggregatedData = this.aggregateVisionData(completedSessions);
        break;
      case '3': // Mission Statement
        aggregatedData = this.aggregateMissionData(completedSessions);
        break;
      case '4': // Brand Archetype
        aggregatedData = this.aggregateArchetypeData(completedSessions);
        break;
      case '5': // Core Values
        aggregatedData = this.aggregateValuesData(completedSessions);
        break;
      default:
        aggregatedData = latestSession.data;
    }

    return {
      assetId,
      assetType: this.getAssetType(assetId),
      sessions: completedSessions,
      aggregatedData,
      lastUpdated: latestSession.completedDate,
      confidence: avgConfidence
    };
  }

  private static getAssetType(assetId: string): string {
    const assetTypes: Record<string, string> = {
      '1': 'Golden Circle',
      '2': 'Vision Statement',
      '3': 'Mission Statement',
      '4': 'Brand Archetype',
      '5': 'Core Values'
    };
    return assetTypes[assetId] || 'Unknown';
  }

  private static aggregateGoldenCircleData(sessions: SessionResult[]): any {
    // Prioritize AI agent results, then canvas workshop
    const aiSession = sessions.find(s => s.sessionType === 'ai-agent');
    const workshopSession = sessions.find(s => s.sessionType === 'canvas-workshop');
    
    if (aiSession && workshopSession) {
      // Blend results, giving more weight to AI agent (higher confidence)
      return {
        why: aiSession.data.why,
        how: workshopSession.data.how,
        what: aiSession.data.what,
        sources: ['AI Analysis', 'Canvas Workshop']
      };
    }
    
    return sessions[0].data;
  }

  private static aggregateVisionData(sessions: SessionResult[]): any {
    const aiSession = sessions.find(s => s.sessionType === 'ai-agent');
    const visioningSession = sessions.find(s => s.sessionType === 'future-visioning');
    
    if (aiSession && visioningSession) {
      return {
        vision: aiSession.data.vision,
        timeframe: aiSession.data.timeframe,
        keyElements: [...new Set([...aiSession.data.keyElements, ...visioningSession.data.keyElements])],
        sources: ['AI Analysis', 'Future Visioning Workshop']
      };
    }
    
    return sessions[0].data;
  }

  private static aggregateMissionData(sessions: SessionResult[]): any {
    // Use the session with highest confidence
    const bestSession = sessions.reduce((best, current) => 
      current.confidence > best.confidence ? current : best
    );
    
    return {
      ...bestSession.data,
      sources: sessions.map(s => s.sessionType)
    };
  }

  private static aggregateArchetypeData(sessions: SessionResult[]): any {
    // Combine archetype assessments
    const archetypes = sessions.flatMap(s => [s.data.primaryArchetype, s.data.secondaryArchetype].filter(Boolean));
    
    // Find most consistent primary archetype
    const archetypeNames = archetypes.map(a => a.name);
    const primaryArchetype = archetypes.find(a => 
      archetypeNames.filter(name => name === a.name).length > 1
    ) || archetypes[0];

    return {
      primaryArchetype,
      allArchetypes: archetypes,
      sources: sessions.map(s => s.sessionType)
    };
  }

  private static aggregateValuesData(sessions: SessionResult[]): any {
    // Merge values from all sessions, prioritizing by frequency
    const allValues = sessions.flatMap(s => s.data.values);
    const valueMap = new Map();
    
    allValues.forEach(value => {
      if (valueMap.has(value.name)) {
        const existing = valueMap.get(value.name);
        existing.frequency += 1;
        // Keep the more detailed description
        if (value.description.length > existing.description.length) {
          existing.description = value.description;
        }
        if (value.behaviors) {
          existing.behaviors = [...new Set([...(existing.behaviors || []), ...value.behaviors])];
        }
      } else {
        valueMap.set(value.name, { ...value, frequency: 1 });
      }
    });
    
    const consolidatedValues = Array.from(valueMap.values())
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5); // Keep top 5 values
    
    return {
      values: consolidatedValues,
      sources: sessions.map(s => s.sessionType)
    };
  }
}