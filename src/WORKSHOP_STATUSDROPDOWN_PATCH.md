# Canvas Workshop Manager StatusDropdown Integration Patch

## Files to Update

### 1. `/components/canvases/CanvasWorkshopManager_INTEGRATED.tsx`

#### A. Add import (after line 65):
```typescript
import { StatusDropdown, ExtendedStatus } from '../research/StatusDropdown';
```

#### B. Add state (after line 72):
```typescript
const [researchStatus, setResearchStatus] = useState<ExtendedStatus>('in_progress');
```

#### C. Replace entire header section (lines 1573-1622):
```typescript
<div className="bg-card border border-border rounded-xl p-6 sticky top-20 z-40 shadow-sm">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Presentation className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Canvas Workshop</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {researchStatus === 'draft' && 'Plan your workshop session'}
          {researchStatus === 'scheduled' && 'Workshop is scheduled and participants invited'}
          {researchStatus === 'in_progress' && 'Active workshop sessions in progress'}
          {researchStatus === 'in_review' && 'Reviewing workshop outcomes and insights'}
          {researchStatus === 'completed' && 'Workshop completed and results finalized'}
        </p>
      </div>
    </div>
    
    <StatusDropdown
      variant="extended"
      currentStatus={researchStatus}
      onChange={(newStatus) => {
        setResearchStatus(newStatus as ExtendedStatus);
        // Sync with old viewStatus for backward compatibility
        if (newStatus === 'draft') setViewStatus('to-buy');
        else if (newStatus === 'completed') setViewStatus('approved');
        else setViewStatus('in-progress');
      }}
    />
  </div>
</div>
```

### 2. `/components/canvases/InterviewsManagerUpdated.tsx`

Same pattern - already has import, just needs header replacement (lines 895-940).

### 3. `/components/canvases/QuestionnaireManagerUpdated.tsx`

Same pattern - needs import + header replacement.

---

## Quick Implementation Guide

For each file:
1. Add StatusDropdown import
2. Add researchStatus state variable  
3. Replace old blue header box with new clean white/card header
4. Replace DropdownMenu with StatusDropdown component
5. Update conditional text to use researchStatus instead of viewStatus
6. Add onChange handler to sync both states

---

## Visual Changes

### Before:
- Blue background (bg-blue-50)
- Blue border (border-blue-200)
- Large dropdown button
- Custom icons and labels

### After:
- White/card background (bg-card)
- Subtle border (border-border)
- Clean StatusDropdown component
- Consistent with AI Exploration page
- Proper dark mode support
