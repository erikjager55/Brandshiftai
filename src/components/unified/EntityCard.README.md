# EntityCard System

Unified entity component dat de exacte layout en structuur van persona cards implementeert voor zowel persona's als brand assets.

## Concept

EntityCard is een **single component** die werkt voor:
- ✅ **Personas** (mensen, doelgroepen)
- ✅ **Brand Assets** (strategische brand tools)

Beide entity types krijgen **exact dezelfde visuele opbouw**, hiërarchie en gedrag.

## Structuur (Gebaseerd op Persona Card)

```
┌─────────────────────────────────────────────┐
│ HEADER ZONE                    Quality 85 ← │
│ [Avatar/Icon] Title                         │
│               Subtitle/Description          │
├─────────────────────────────────────────────┤
│ META ROW                                    │
│ Age: 32          Location: Amsterdam        │
│ (voor personas)                             │
│                                             │
│ Category: ...    Validated: 2/5             │
│ (voor assets)                               │
├─────────────────────────────────────────────┤
│ DIVIDER                                     │
├─────────────────────────────────────────────┤
│ VALIDATION ZONE                             │
│ Validation Methods         2/5 validated    │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ ✓ Validated by Interviews           │   │
│ │   Research complete • High conf...  │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ ▶ Start Surveys                     │   │
│ │   Available • Upgrade quality       │   │
│ └─────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│ FOOTER META                                 │
│ Occupation: Product Manager                 │
│ Last updated: Jan 12, 2026                  │
└─────────────────────────────────────────────┘
```

## Zones

### 1. Header Zone
- **Avatar** (voor personas) of **Icon** (voor assets) - links
- **Title** - naam van persona of asset type
- **Quality Badge** - positioned **RECHTSBOVEN** (absolute top-right)
  - Sparkle icon + "Quality {score}"
  - Kleur gebaseerd op score (groen ≥80, blauw ≥50, oranje <50)
- **Subtitle** - tagline (persona) of description (asset)

### 2. Meta Row
- Grid met 2 kolommen
- Key-value pairs relevant voor entity type
- **Personas**: Age, Location, etc.
- **Assets**: Category, Validated count, Artifacts, etc.

### 3. Divider
- Border separator
- Visuele scheiding tussen meta en validation

### 4. Validation Zone
- Header met "Validation Methods" + counter "{completed}/{total} validated"
- Lijst van validation method cards met 3 states:
  1. **Completed** (groen, solid background)
     - ✓ icon
     - "Validated by {method}"
     - "Research complete • High confidence"
     - "View Results" button
  2. **In Progress** (blauw, outline)
     - Progress icon
     - "Running {method} ({progress}%)"
     - "Active research • Data collecting"
     - "Continue" button
  3. **Not Started** (grijs, dashed)
     - + icon
     - "Start {method}"
     - "Available • Upgrade quality"
     - Clickable entire card

### 5. Footer Meta
- Divider border
- Extra metadata items (occupation, artifacts, etc.)
- Last updated timestamp

## Data Interface

```typescript
interface EntityCardData {
  // Entity Type
  entityType: 'persona' | 'brand-asset';
  
  // Header
  id: string;
  title: string;
  avatar?: string;        // For personas
  icon?: LucideIcon;      // For assets
  qualityScore: number;   // 0-100
  subtitle?: string;      // Tagline or description
  
  // Meta Row
  attributes: EntityAttribute[];
  
  // Validation
  validationMethods: EntityValidationMethod[];
  
  // Footer
  lastUpdated?: string;
  footerInfo?: string[];
  
  // Actions
  onClick?: () => void;
}
```

## Usage

### For Brand Assets

```typescript
import { EntityCard } from '../unified/EntityCard';
import { brandAssetToEntityCard } from '../../utils/entity-card-adapters';

const entityData = brandAssetToEntityCard(asset, onClick, onMethodClick);
return <EntityCard data={entityData} />;
```

### For Personas

```typescript
import { EntityCard } from '../unified/EntityCard';
import { personaToEntityCard } from '../../utils/entity-card-adapters';

const entityData = personaToEntityCard(persona, onClick, onMethodClick);
return <EntityCard data={entityData} />;
```

## Adapters

Adapters transformeren domain-specific data naar `EntityCardData`:

- **`brandAssetToEntityCard()`** - `/utils/entity-card-adapters.ts`
  - Maps BrandAsset → EntityCardData
  - Icon mapping voor asset types
  - Method labels voor validation types
  
- **`personaToEntityCard()`** - `/utils/entity-card-adapters.ts`
  - Maps Persona → EntityCardData
  - Avatar handling
  - Demographics als attributes

## Design Tokens

Alle styling komt uit `/components/unified/design-system.ts`:

- **Quality Colors**
  - High (≥80): Green
  - Medium (≥50): Blue
  - Low (<50): Orange

- **Typography**
  - Title: `text-base font-medium`
  - Subtitle: `text-sm text-muted-foreground`
  - Meta: `text-xs`

- **Spacing**
  - Card padding: `p-4` (CardContent), `pb-4` (CardHeader)
  - Zone gaps: `space-y-4`
  - Inline gaps: `gap-2`, `gap-3`, `gap-4`

- **Borders**
  - Card: `border border-border rounded-lg`
  - Dividers: `border-t border-border`

## Validation Method States

### State 1: Completed ✓
```css
bg-green-50 dark:bg-green-900/20
border border-green-200 dark:border-green-800
```
- Green solid background
- Checkmark icon
- "Validated by {method}"
- "View Results" button

### State 2: In Progress ▶
```css
bg-blue-50/50 dark:bg-blue-900/10
border-2 border-blue-200 dark:border-blue-800
```
- Blue subtle background + outline
- Progress icon
- "{progress}% complete"
- "Continue" button

### State 3: Not Started +
```css
bg-transparent
border-2 border-dashed border-border
hover:border-primary/50 hover:bg-muted/30
```
- Transparent background
- Dashed border
- Plus icon
- Hover effect
- Entire card clickable

## Benefits

✅ **Consistency** - Personas en assets voelen als één systeem
✅ **Maintainability** - Eén component voor beide entity types
✅ **Predictability** - Altijd dezelfde zones in dezelfde volgorde
✅ **Scalability** - Nieuwe entity types toevoegen is simpel
✅ **Accessibility** - Shared accessibility features

## Files

- `/components/unified/EntityCard.tsx` - Main component
- `/utils/entity-card-adapters.ts` - Data transformers
- `/components/brand-assets/EnhancedAssetCardUnified.tsx` - Asset wrapper
- `/components/personas/EnhancedPersonaCardUnified.tsx` - Persona wrapper

## Migration

Old components → New EntityCard:

1. ❌ `/components/brand-assets/EnhancedAssetCard.tsx`
2. ✅ `/components/brand-assets/EnhancedAssetCardUnified.tsx`

3. ❌ `/components/personas/EnhancedPersonaCard.tsx`
4. ✅ `/components/personas/EnhancedPersonaCardUnified.tsx`

## Comparison: Before vs After

### Before
- Personas: Custom layout A
- Assets: Custom layout B
- **Different** structure, spacing, colors
- Hard to maintain
- Inconsistent UX

### After
- Personas: EntityCard
- Assets: EntityCard
- **Identical** structure, spacing, colors
- Single source of truth
- Consistent UX

## Quality Badge Position

✅ **Current**: Quality badge is positioned **rechtsboven** (absolute top-right)

```
                          Quality 85 ←
[Avatar] Title
         Subtitle
```

De quality badge staat als absolute positioned element in de rechterbovenhoek van de card header.