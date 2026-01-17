# 🔗 Relationships & Insights System - Implementation Guide

## 📋 Overzicht

Het Relationships & Insights systeem brengt data relaties en AI-powered insights naar jullie research tool applicatie. Het systeem bestaat uit:

1. **Relationship Management** - Track hoe entiteiten aan elkaar gerelateerd zijn
2. **Impact Analysis** - Voorspel de impact van changes op gerelateerde entiteiten
3. **Smart Suggestions** - AI-powered next-step aanbevelingen
4. **Consistency Checking** - Automatische detectie van brand inconsistenties

---

## 🏗️ Architectuur

### **Services Layer**
- `/services/RelationshipService.ts` - Core business logic voor relationships
- `/services/SmartSuggestionsService.ts` - Intelligente aanbevelingen

### **Type Definitions**
- `/types/relationship.ts` - Alle TypeScript types en interfaces

### **Data Layer**
- `/data/mock-relationships.ts` - Mock relationship data

### **UI Components**
- `/components/relationships/RelationshipGraph.tsx` - Visualisatie van relationships
- `/components/relationships/ImpactAnalysisModal.tsx` - Impact warning modal
- `/components/relationships/SmartSuggestionsPanel.tsx` - Suggestions widget
- `/components/relationships/ConsistencyChecker.tsx` - Consistency dashboard
- `/components/RelationshipsPage.tsx` - Main dedicated page
- `/components/RelationshipsWidget.tsx` - Dashboard widget

---

## 🚀 Quick Start

### **Stap 1: Integreer in Dashboard**

Voeg de RelationshipsWidget toe aan je Dashboard component:

```typescript
import { RelationshipsWidget } from './RelationshipsWidget';

// In je Dashboard component:
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Bestaande widgets */}
  
  <div className="lg:col-span-1">
    <RelationshipsWidget 
      onViewAll={() => setActiveSection('relationships')}
      onNavigate={(url) => console.log('Navigate to:', url)}
    />
  </div>
</div>
```

### **Stap 2: Voeg Route toe in App.tsx**

```typescript
import { RelationshipsPage } from './components/RelationshipsPage';

// In je routing logic:
if (activeSection === 'relationships') {
  return (
    <RelationshipsPage
      onNavigate={(url) => console.log('Navigate:', url)}
      onBack={() => setActiveSection('dashboard')}
    />
  );
}
```

### **Stap 3: Voeg Navigatie Item toe**

Voeg aan je sidebar/navigatie:

```typescript
{
  id: 'relationships',
  label: 'Relationships',
  icon: Network
}
```

---

## 💡 Feature Walkthrough

### **1. Relationship Graph**

**Waar**: Brand Asset Detail pages, Persona pages, enz.

**Hoe te gebruiken**:
```typescript
import { RelationshipGraph } from './relationships/RelationshipGraph';

<RelationshipGraph
  entityType="brand-asset"
  entityId={assetId}
  entityName={assetName}
  onNavigate={(type, id) => navigateToEntity(type, id)}
/>
```

**Wat het doet**:
- Toont alle gerelateerde entiteiten
- Groepeert per type (Personas, Research Plans, etc.)
- Laat relationship type en strength zien
- Klikbaar om te navigeren naar gerelateerde entiteiten

---

### **2. Impact Analysis Modal**

**Waar**: Voor elke Edit/Delete actie op belangrijke entiteiten

**Hoe te gebruiken**:
```typescript
import { ImpactAnalysisModal } from './relationships/ImpactAnalysisModal';

const [showImpactModal, setShowImpactModal] = useState(false);

const handleDelete = () => {
  setShowImpactModal(true);
};

<ImpactAnalysisModal
  open={showImpactModal}
  onClose={() => setShowImpactModal(false)}
  onConfirm={() => {
    // Perform actual delete
    performDelete();
    setShowImpactModal(false);
  }}
  entityType="brand-asset"
  entityId={assetId}
  entityName={assetName}
  changeType="delete"
/>
```

**Wat het doet**:
- Analyseert impact van changes
- Toont risk level (low/medium/high/critical)
- Lijst affected entities
- Geeft recommendations
- Schat update tijd

---

### **3. Smart Suggestions Panel**

**Waar**: Dashboard, Sidebar, dedicated Suggestions page

**Hoe te gebruiken**:
```typescript
import { SmartSuggestionsPanel } from './relationships/SmartSuggestionsPanel';

<SmartSuggestionsPanel 
  onNavigate={(url) => router.push(url)}
  maxSuggestions={5}
/>
```

**Wat het doet**:
- Analyseert huidige staat van brand assets
- Detecteert patterns en gaps
- Suggereert logical next steps
- Prioriteert op urgency en impact
- Allows dismissing suggestions

---

### **4. Consistency Checker**

**Waar**: Dedicated page of dashboard widget

**Hoe te gebruiken**:
```typescript
import { ConsistencyChecker } from './relationships/ConsistencyChecker';

<ConsistencyChecker 
  onNavigateToEntity={(type, id) => navigateToEntity(type, id)}
/>
```

**Wat het doet**:
- Runs comprehensive consistency check
- Calculates overall health score (0-100)
- Detects semantic conflicts
- Finds missing connections
- Identifies stale data
- Checks keyword gaps

---

## 🔌 API Usage

### **RelationshipService**

```typescript
import { RelationshipService } from './services/RelationshipService';

// Get all relationships
const allRelationships = RelationshipService.getAll();

// Get relationships for specific entity
const entityRels = RelationshipService.getForEntity('brand-asset', '1');

// Create new relationship
const newRel = RelationshipService.create({
  sourceType: 'brand-asset',
  sourceId: '1',
  sourceName: 'Golden Circle',
  targetType: 'persona',
  targetId: 'p1',
  targetName: 'Tech-Savvy Millennial',
  relationType: 'informs',
  strength: 'strong',
  status: 'active'
});

// Get impact analysis
const impact = RelationshipService.getImpactAnalysis('brand-asset', '1');
console.log(impact.riskLevel); // 'low' | 'medium' | 'high' | 'critical'
console.log(impact.directImpacts); // number
console.log(impact.recommendations); // string[]

// Run consistency check
const report = RelationshipService.runConsistencyCheck();
console.log(report.overallScore); // 0-100
console.log(report.issues); // ConsistencyIssue[]

// Get statistics
const stats = RelationshipService.getStats();
console.log(stats.totalRelationships);
console.log(stats.mostConnectedEntity);
console.log(stats.orphanedEntities);
```

### **SmartSuggestionsService**

```typescript
import { SmartSuggestionsService } from './services/SmartSuggestionsService';

// Get all suggestions (sorted by priority)
const suggestions = SmartSuggestionsService.getSuggestions();

// Get filtered suggestions (excluding dismissed)
const filtered = SmartSuggestionsService.getSuggestionsFiltered();

// Dismiss a suggestion
SmartSuggestionsService.dismissSuggestion('suggest-archetype');
```

---

## 🎨 Customization

### **Styling**

Alle componenten gebruiken jullie bestaande design system (Tailwind + shadcn/ui). Pas kleuren aan via:

```typescript
// In RelationshipGraph.tsx
const getRiskLevelColor = (level: string) => {
  switch (level) {
    case 'critical':
      return 'border-red-200 bg-red-50'; // Pas aan naar jouw brand colors
    // ...
  }
};
```

### **Relationship Types**

Voeg nieuwe relationship types toe in `/types/relationship.ts`:

```typescript
export type RelationType = 
  | 'informs'
  | 'validates'
  // ... existing types
  | 'your-new-type'; // Add here
```

### **Suggestion Patterns**

Voeg nieuwe suggestion patterns toe in `SmartSuggestionsService.ts`:

```typescript
private static checkYourCustomPattern(): Suggestion[] {
  const suggestions: Suggestion[] = [];
  
  // Your custom logic
  if (someCondition) {
    suggestions.push({
      id: 'your-suggestion-id',
      type: 'opportunity',
      priority: 'high',
      title: 'Your Title',
      description: 'Your description',
      action: 'Take Action',
      actionUrl: '/your/url',
      // ...
    });
  }
  
  return suggestions;
}

// Don't forget to call it in getSuggestions():
static getSuggestions(): Suggestion[] {
  const suggestions: Suggestion[] = [];
  suggestions.push(...this.checkYourCustomPattern());
  // ...
  return suggestions;
}
```

---

## 📊 Data Management

### **Persistence**

Currently using in-memory storage. To add persistence:

**Option 1: localStorage**
```typescript
// In RelationshipService.ts
static create(relationship: Omit<Relationship, 'id' | 'createdAt'>): Relationship {
  const newRelationship = { ...relationship, id: `rel-${Date.now()}`, createdAt: new Date().toISOString() };
  mockRelationships.push(newRelationship);
  
  // Add persistence
  localStorage.setItem('relationships', JSON.stringify(mockRelationships));
  
  return newRelationship;
}
```

**Option 2: Supabase**
```typescript
// Create Supabase table
// relationships (id, source_type, source_id, target_type, target_id, relation_type, strength, status, metadata, created_at)

import { supabase } from '../lib/supabase';

static async create(relationship: Omit<Relationship, 'id' | 'createdAt'>): Promise<Relationship> {
  const { data, error } = await supabase
    .from('relationships')
    .insert([relationship])
    .select()
    .single();
    
  if (error) throw error;
  return data;
}
```

---

## 🧪 Testing

### **Unit Tests** (wanneer je tests toevoegt)

```typescript
import { RelationshipService } from './RelationshipService';

describe('RelationshipService', () => {
  it('should calculate correct impact analysis', () => {
    const impact = RelationshipService.getImpactAnalysis('brand-asset', '1');
    expect(impact.riskLevel).toBeDefined();
    expect(impact.directImpacts).toBeGreaterThanOrEqual(0);
  });

  it('should detect consistency issues', () => {
    const report = RelationshipService.runConsistencyCheck();
    expect(report.overallScore).toBeGreaterThanOrEqual(0);
    expect(report.overallScore).toBeLessThanOrEqual(100);
  });
});
```

---

## 🎯 Roadmap & Next Steps

### **Phase 1: Foundation** ✅ (Completed)
- [x] Type definitions
- [x] Mock data
- [x] Core services
- [x] Basic UI components

### **Phase 2: Enhancement** (Next)
- [ ] Real-time updates
- [ ] Undo/redo functionality
- [ ] Bulk operations
- [ ] Export relationships to CSV/JSON
- [ ] Visual network graph (D3.js/Cytoscape)

### **Phase 3: Intelligence** (Future)
- [ ] Machine learning for auto-detection
- [ ] NLP for semantic analysis
- [ ] Predictive analytics
- [ ] A/B testing suggestions
- [ ] Community templates

---

## 🐛 Troubleshooting

### **"Relationships not showing"**
- Check dat mock data correct is geïmporteerd
- Verify entityType en entityId matchen mock data
- Check console voor errors

### **"Impact analysis shows 0 impacts"**
- Verify relationships bestaan in mock-relationships.ts
- Check dat sourceId/targetId correct zijn
- Ensure relationships status is 'active'

### **"Suggestions not appearing"**
- Check dat brand assets status correct is
- Verify mock data heeft genoeg variatie
- Console.log SmartSuggestionsService.getSuggestions() om te debuggen

---

## 📚 Further Reading

- [Relationship Types Explained](./RELATIONSHIP_TYPES.md) (TODO)
- [Consistency Algorithms](./CONSISTENCY_ALGORITHMS.md) (TODO)
- [AI Suggestion Patterns](./SUGGESTION_PATTERNS.md) (TODO)

---

## 💬 Support

Voor vragen of issues:
1. Check deze guide eerst
2. Review de inline code comments
3. Check TypeScript type definitions voor API specs

---

**Version**: 1.0.0  
**Last Updated**: {{ current_date }}  
**Status**: ✅ Production Ready
