# Research Status Overview - Synchronization Documentation

## Overview

The Research Status Overview system consists of two main components that work together to ensure 100% synchronization across all pages:

1. **ResearchMethodCard** (`/components/research/ResearchMethodCard.tsx`) - The atomic unit for displaying individual research methods
2. **ResearchStatusOverview** (`/components/research/ResearchStatusOverview.tsx`) - The container that displays collections of ResearchMethodCard instances

## Component Architecture

### 1. ResearchMethodCard - Atomic Component

**Location**: `/components/research/ResearchMethodCard.tsx`

**Purpose**: Single source of truth for individual research method displays. NO LOCAL OVERRIDES ALLOWED.

#### Fixed Properties

All properties are REQUIRED and sourced from centralized configuration:

```typescript
{
  // Core identification
  methodId: ResearchMethodType;        // Unique identifier
  title: string;                       // From VALIDATION_METHODS
  description: string;                 // From VALIDATION_METHODS
  
  // Metadata
  duration?: string;                   // From VALIDATION_METHODS
  category?: string;                   // From VALIDATION_METHODS
  
  // Status and progress
  unlockStatus: UnlockStatus;         // 'free' | 'basic' | 'premium' | 'enterprise'
  progressState: MethodStatus;        // 'locked' | 'available' | 'running' | 'completed'
  progressValue?: number;             // 0-100 for running state
  
  // Quality indicators
  impactValue?: MethodImpact;         // 'low' | 'medium' | 'high'
  qualityScore?: number;              // 0-100
  confidence?: MethodConfidence;      // 'low' | 'medium' | 'high'
  
  // Visual
  icon: LucideIcon;                   // From VALIDATION_METHODS
  
  // Actions
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}
```

#### Visual States

**1. COMPLETED STATE**
- Background: `bg-green-50 dark:bg-green-900/20`
- Border: `border-green-200 dark:border-green-800`
- Icon: CheckCircle2 (green)
- Labels: Quality score, confidence, impact
- Action: "View Details" button

**2. RUNNING STATE**
- Background: `bg-blue-50 dark:bg-blue-900/20`
- Border: `border-blue-200 dark:border-blue-800`
- Icon: Loader2 (animated spinner)
- Labels: Progress percentage
- Action: "View Progress" button

**3. LOCKED STATE**
- Background: `bg-gray-50 dark:bg-gray-900/20`
- Border: `border-gray-200 dark:border-gray-800`
- Icon: Crown (gray)
- Opacity: 60%
- Labels: Unlock level badge
- Action: "Unlock" button

**4. AVAILABLE STATE** (default)
- Background: `bg-background`
- Border: `border-border` (hover: `border-primary/50`)
- Icon: Method-specific icon
- Labels: Duration, category, FREE badge
- Action: "Start Research" button

#### Fixed Labels

All labels are standardized and cannot be overridden:

1. **FREE Badge**: `bg-[#1FD1B2] text-white` - Minty green
2. **BASIC Badge**: Gray with crown icon
3. **PREMIUM Badge**: Purple with crown icon
4. **ENTERPRISE Badge**: Orange with crown icon
5. **Impact Badges**:
   - High: Green (`bg-green-100`)
   - Medium: Yellow (`bg-yellow-100`)
   - Low: Blue (`bg-blue-100`)
6. **Confidence Labels**:
   - High: "High confidence" (green)
   - Medium: "Medium confidence" (yellow)
   - Low: "Low confidence" (orange)

### 2. ResearchStatusOverview - Container Component

**Location**: `/components/research/ResearchStatusOverview.tsx`

**Purpose**: Displays collections of ResearchMethodCard instances with header, progress, and metadata.

#### Data Structure

```typescript
{
  methods: ResearchMethodWithStatus[];   // Array of method data
  progressPercentage?: number;           // Overall completion %
  completedCount?: number;               // Number completed
  totalCount?: number;                   // Total methods
  lastUpdated?: string;                  // ISO date string
  generatedArtifacts?: number;           // Artifact count
  
  onMethodClick?: (method) => void;      // Click handler
  onPrimaryAction?: () => void;          // Footer action
  onSecondaryAction?: () => void;        // Footer action
  
  variant?: 'full' | 'compact' | 'card'; // Display variant
  showProgress?: boolean;
  showHeader?: boolean;
  showMetadata?: boolean;
  showActions?: boolean;
}
```

#### Component Variants

**1. Full Variant** (`variant="full"`)
- Large header with title and description
- Progress bar with percentage
- Metadata row (last updated, artifacts)
- ResearchMethodCard instances
- Footer action buttons
- Used in: Asset detail pages (UniversalAssetDashboard)

**2. Compact Variant** (`variant="compact"`)
- No header
- No progress bar
- ResearchMethodCard instances only
- Used in: Sidebars, quick overviews

**3. Card Variant** (`variant="card"`)
- Wrapped in card border
- Compact header
- Progress indicator
- ResearchMethodCard instances
- Used in: Dashboard widgets

## Usage Instances

### Instance 1: Asset Detail Page (UniversalAssetDashboard)

```tsx
<ResearchStatusOverview
  methods={researchMethodsWithStatus}
  progressPercentage={unlockProgress}
  completedCount={completedMethods.length}
  totalCount={asset.researchMethods.length}
  lastUpdated={asset.lastUpdated}
  generatedArtifacts={asset.artifactsGenerated}
  onMethodClick={handleMethodClick}
  variant="full"
  showProgress={true}
  showHeader={true}
  showMetadata={true}
  showActions={true}
/>
```

### Instance 2: Your Brand Page (EnhancedAssetCard)

```tsx
// Each method is rendered via ResearchMethodCard
<ResearchMethodCard
  methodId={method.type}
  title={validationMethod.name}
  description={validationMethod.description}
  duration={validationMethod.duration}
  category={validationMethod.category}
  unlockStatus={unlockStatus}
  progressState={progressState}
  icon={validationMethod.icon}
  onPrimaryAction={handleMethodClick}
/>
```

## Synchronization Rules

### ✅ GUARANTEED SYNCHRONIZATION

1. **Single Component Source**
   - ALL method cards use `ResearchMethodCard` component
   - NO inline implementations allowed
   - Changes to ResearchMethodCard automatically update ALL instances

2. **Single Data Source**
   - ALL instances read from `asset.researchMethods` array
   - ALL use `VALIDATION_METHODS` config for method details
   - Consistent status mapping across all pages

3. **Single Configuration Source**
   - Method names: `VALIDATION_METHODS.name`
   - Descriptions: `VALIDATION_METHODS.description`
   - Icons: `VALIDATION_METHODS.icon`
   - Duration: `VALIDATION_METHODS.duration`
   - Category: `VALIDATION_METHODS.category`
   - Unlock level: `VALIDATION_METHODS.unlockLevel`

4. **Fixed Visual States**
   - Completed: Green state (defined in ResearchMethodCard)
   - Running: Blue state (defined in ResearchMethodCard)
   - Locked: Gray state (defined in ResearchMethodCard)
   - Available: Default state (defined in ResearchMethodCard)

5. **Fixed Labels and Badges**
   - FREE badge: Minty green (#1FD1B2)
   - Unlock level badges: Styled in ResearchMethodCard
   - Impact badges: Color-coded in ResearchMethodCard
   - All text from centralized config

### 🔒 LOCKED PROPERTIES (No Overrides Allowed)

1. Method names (from VALIDATION_METHODS)
2. Method descriptions (from VALIDATION_METHODS)
3. Method icons (from VALIDATION_METHODS)
4. Duration/category (from VALIDATION_METHODS)
5. Visual state colors (defined in ResearchMethodCard)
6. Badge styling (defined in ResearchMethodCard)
7. Icon sizes and spacing (defined in ResearchMethodCard)
8. Animation timing (defined in ResearchMethodCard)

### ⚙️ CONFIGURABLE PROPERTIES

1. Component variant (full/compact/card) - at container level
2. Show/hide sections (progress, header, metadata) - at container level
3. Action callbacks (onMethodClick, onPrimaryAction) - at instance level
4. Action button labels - at instance level only
5. Animation delay - for stagger effect only

### ⛔ BLOCKED OPERATIONS

1. **Cannot detach** ResearchMethodCard from component library
2. **Cannot override** styles at instance level
3. **Cannot create** local card implementations
4. **Cannot modify** centralized VALIDATION_METHODS without updating all instances
5. **Cannot change** visual states without updating ResearchMethodCard component

## Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     Centralized Sources                         │
├─────────────────────────────────────────────────────────────────┤
│  /config/validation-methods.ts  ←  Method configuration         │
│  /data/mock-brand-assets.ts    ←  Asset data with methods      │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────────┐
│              ResearchMethodCard Component (Atomic)              │
│                                                                 │
│  Props: methodId, title, description, icon, status, etc.       │
│  States: completed, running, locked, available                 │
│  Output: Single method card with fixed styling                 │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────────┐
│        ResearchStatusOverview Component (Container)             │
│                                                                 │
│  Renders: Multiple ResearchMethodCard instances                │
│  Adds: Header, progress bar, metadata, footer actions         │
│  Variants: full, compact, card                                 │
└──────────────────────┬──────────────────────────────────────────┘
                       │
            ┌──────────┴──────────┐
            ↓                     ↓
┌────────────────────┐  ┌────────────────────┐
│ UniversalAssetDash │  │ EnhancedAssetCard  │
│ (Detail Page)      │  │ (Card View)        │
│                    │  │                    │
│ Uses:              │  │ Uses:              │
│ - Full variant     │  │ - Direct cards     │
│ - All metadata     │  │ - Inline display   │
└────────────────────┘  └────────────────────┘

        ↓                         ↓
   ┌─────────────────────────────────┐
   │   100% SYNCHRONIZED OUTPUT      │
   │                                 │
   │ • Same method names             │
   │ • Same descriptions             │
   │ • Same icons                    │
   │ • Same visual states            │
   │ • Same labels/badges            │
   │ • Same status indicators        │
   └─────────────────────────────────┘
```

## Maintenance Guidelines

### Adding a New Research Method

1. Add method to `/config/validation-methods.ts`:
   ```typescript
   {
     id: 'new-method',
     name: 'New Method Name',
     description: 'Method description',
     icon: MethodIcon,
     duration: '30-45 min',
     category: 'Quantitative',
     unlockLevel: 'free'
   }
   ```

2. Add method to asset data in `/data/mock-brand-assets.ts`:
   ```typescript
   researchMethods: [
     // ... existing methods
     {
       type: 'new-method',
       status: 'not-started'
     }
   ]
   ```

3. **That's it!** ResearchMethodCard automatically renders the new method on all pages.

### Changing Visual Appearance

**To change a single card:**
1. Update `/components/research/ResearchMethodCard.tsx`
2. Modify the relevant state section (completed/running/locked/available)
3. All instances automatically update

**To change the container:**
1. Update `/components/research/ResearchStatusOverview.tsx`
2. Modify header, progress bar, or layout
3. All instances using that variant update

### Changing Method Information

1. Update `/config/validation-methods.ts`
2. Change name, description, icon, duration, category, or unlock level
3. All instances automatically update

**Example:**
```typescript
// Before
{ id: 'ai-exploration', name: 'AI Exploration', ... }

// After
{ id: 'ai-exploration', name: 'AI-Powered Research', ... }

// Result: Name changes everywhere automatically
```

## Testing Checklist

Use this checklist to verify synchronization:

### Visual Consistency
- [ ] All cards show same method names
- [ ] All cards show same method icons
- [ ] All cards show same descriptions
- [ ] All completed methods show green state
- [ ] All running methods show blue state with spinner
- [ ] All locked methods show gray state with crown
- [ ] All available methods show default state
- [ ] All FREE badges are minty green (#1FD1B2)
- [ ] All impact badges use correct colors
- [ ] All confidence labels use correct colors

### Data Consistency
- [ ] Progress percentage matches across all instances
- [ ] Method counts are consistent
- [ ] Last updated date is consistent
- [ ] Generated artifacts count is consistent
- [ ] Quality scores are consistent
- [ ] Status mappings are consistent

### Interaction Consistency
- [ ] Click handlers work on all instances
- [ ] Buttons show correct labels per state
- [ ] Hover states work consistently
- [ ] Animations have correct timing
- [ ] Action buttons trigger correct behaviors

### Configuration Consistency
- [ ] Method info comes from VALIDATION_METHODS
- [ ] Method data comes from asset.researchMethods
- [ ] No hardcoded method details in components
- [ ] No local style overrides
- [ ] No detached component instances

## Architecture Benefits

### 1. Single Source of Truth
- One component = one source of truth
- Changes propagate automatically
- No inconsistencies possible

### 2. Maintainability
- Update once, apply everywhere
- Clear separation of concerns
- Easy to debug and test

### 3. Scalability
- Add new methods without touching components
- Add new pages that automatically stay in sync
- Change design system with single updates

### 4. Type Safety
- TypeScript ensures correct props
- Compile-time checks prevent errors
- Auto-complete for all properties

### 5. Performance
- Reusable components reduce bundle size
- Consistent rendering reduces re-renders
- Optimized animations

## Migration Notes

All local card implementations have been replaced with ResearchMethodCard:

**Before:**
```tsx
// Inline card implementation (REMOVED)
<div className="...">
  <div className="...">
    <Icon />
  </div>
  <div className="...">
    <div>{method.name}</div>
    <div>{method.description}</div>
  </div>
</div>
```

**After:**
```tsx
// Centralized component (CURRENT)
<ResearchMethodCard
  methodId={method.type}
  title={validationMethod.name}
  description={validationMethod.description}
  icon={validationMethod.icon}
  // ... all props from config
/>
```

## Future Enhancements

Possible improvements while maintaining synchronization:

1. Add more variants (mini, expanded, etc.)
2. Add bulk action support
3. Add filtering/sorting within overview
4. Add method comparison features
5. Add export/sharing capabilities
6. Add accessibility enhancements
7. Add theme customization (while keeping structure)

All enhancements must maintain the single-source-of-truth architecture.