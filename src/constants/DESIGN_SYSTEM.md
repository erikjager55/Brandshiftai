# Design System Documentation

Dit document beschrijft het centrale design system voor de research tool applicatie. Alle design tokens zijn gedefinieerd in `/constants/design-system.ts`.

## Principes

1. **Consistentie**: Één visuele taal over alle pagina's
2. **Schaalbaarheid**: Herbruikbare tokens en patterns
3. **Onderhoudbaarheid**: Centrale definitie van alle waarden
4. **Toegankelijkheid**: Duidelijke hiërarchie en contrast

## Gebruik

```typescript
import { 
  SPACING, 
  TYPOGRAPHY, 
  ICON_SIZES, 
  ICON_CONTAINERS,
  COLORS,
  CARD_VARIANTS,
  ANIMATION,
} from '../constants/design-system';
```

## Layout & Spacing

### Page-level
```typescript
className={SPACING.page.padding}        // p-6
className={SPACING.page.gap}            // space-y-6
```

### Section-level
```typescript
className={SPACING.section.margin}      // mb-8
className={SPACING.section.gap}         // space-y-4
```

### Card-level
```typescript
className={SPACING.card.padding}        // p-6
className={SPACING.card.gap}            // space-y-4
```

### Grids
```typescript
className={SPACING.grid.cols2}          // grid grid-cols-1 md:grid-cols-2 gap-4
className={SPACING.grid.cols3}          // grid grid-cols-1 md:grid-cols-3 gap-4
```

## Typography

### Headings
```typescript
className={TYPOGRAPHY.pageTitle}        // text-3xl font-semibold
className={TYPOGRAPHY.sectionTitle}     // text-xl font-semibold
className={TYPOGRAPHY.cardTitle}        // text-lg font-semibold
```

### Body
```typescript
className={TYPOGRAPHY.body}             // text-base
className={TYPOGRAPHY.bodySmall}        // text-sm
```

### Labels & Captions
```typescript
className={TYPOGRAPHY.label}            // text-sm font-medium
className={TYPOGRAPHY.caption}          // text-xs text-muted-foreground
```

### Stats
```typescript
className={TYPOGRAPHY.statLarge}        // text-3xl font-bold
className={TYPOGRAPHY.statMedium}       // text-2xl font-bold
```

## Iconography

### Icon Sizes
```typescript
className={ICON_SIZES.sm}               // h-4 w-4 (buttons)
className={ICON_SIZES.md}               // h-5 w-5 (default)
className={ICON_SIZES.lg}               // h-6 w-6 (cards)
className={ICON_SIZES.xl}               // h-8 w-8 (headers)
```

### Icon Containers
```typescript
className={ICON_CONTAINERS.large}       // h-12 w-12 rounded-xl flex items-center justify-center
className={ICON_CONTAINERS.mutedLarge}  // + bg-muted
className={ICON_CONTAINERS.primaryLarge} // + bg-primary/10
```

## Colors & Status

### Status Colors
```typescript
// Gebruik helper functie
const colors = getStatusColors('success');
className={colors.bg}                   // bg-green-50/50
className={colors.border}               // border-green-200
className={colors.text}                 // text-green-600
```

### Quality Colors
```typescript
const colors = getQualityColors('safe');
className={colors.bg}                   // bg-green-50
className={colors.text}                 // text-green-700
```

### Brand Colors
```typescript
COLORS.primary                          // '#1FD1B2' (Minty Green)
```

## Component Variants

### Cards
```typescript
className={CARD_VARIANTS.default}       // rounded-xl border bg-card
className={CARD_VARIANTS.interactive}   // + hover:shadow-md cursor-pointer
className={CARD_VARIANTS.success}       // groene achtergrond voor completed state
```

### Badges
```typescript
className={BADGE_VARIANTS.free}         // bg-[#1FD1B2] text-white (FREE badge)
className={BADGE_VARIANTS.completed}    // bg-green-100 text-green-700
```

### Progress Bars
```typescript
className={PROGRESS_BAR_VARIANTS.default}  // h-2
className={PROGRESS_BAR_VARIANTS.primary}  // h-2 bg-primary/10
```

## Animation

### Motion Presets
```typescript
<motion.div {...ANIMATION.fadeIn}>
  {/* content */}
</motion.div>
```

### CSS Transitions
```typescript
className={ANIMATION.hover}             // transition-all duration-200
className={ANIMATION.hoverShadow}       // + hover:shadow-md
```

## Header Patterns

### Page Header met Back Button
```typescript
<div className={HEADER_PATTERNS.pageWithBack.container}>
  <Button className={HEADER_PATTERNS.pageWithBack.backButton}>...</Button>
  <div className={HEADER_PATTERNS.pageWithBack.content}>
    <div className={HEADER_PATTERNS.pageWithBack.avatar}>
      <Icon className={ICON_SIZES.xl} />
    </div>
    <div className={HEADER_PATTERNS.pageWithBack.info}>
      <h1 className={HEADER_PATTERNS.pageWithBack.titleText}>Title</h1>
      <p className={HEADER_PATTERNS.pageWithBack.subtitle}>Subtitle</p>
    </div>
  </div>
</div>
```

### Sticky Header
```typescript
<div className={HEADER_PATTERNS.sticky.container}>
  <div className={HEADER_PATTERNS.sticky.inner}>
    {/* content */}
  </div>
</div>
```

## Layout Patterns

### Page Container
```typescript
className={LAYOUT_PATTERNS.fullPage}          // h-full overflow-auto bg-background
className={LAYOUT_PATTERNS.centeredContent}   // max-w-7xl mx-auto px-6 py-8
```

### Max Widths
```typescript
className={LAYOUT_PATTERNS.maxWidth.xl}       // max-w-7xl mx-auto
```

## Voorbeelden

### Research Method Card (Persona & Asset Detail)
```typescript
<Card className={`
  transition-all hover:shadow-md
  ${isCompleted ? COLORS.status.success.bg : ''}
  ${isCompleted ? COLORS.status.success.border : ''}
`}>
  <CardContent className={SPACING.card.padding}>
    <div className="flex items-start gap-4 flex-1">
      <div className={`
        ${ICON_CONTAINERS.large}
        ${isCompleted ? COLORS.status.success.iconBg : 'bg-muted'}
      `}>
        <MethodIcon className={`
          ${ICON_SIZES.lg}
          ${isCompleted ? COLORS.status.success.icon : 'text-muted-foreground'}
        `} />
      </div>
      
      <div className="flex-1">
        <h3 className={TYPOGRAPHY.cardTitle}>{method.name}</h3>
        <p className={TYPOGRAPHY.bodySmall}>{method.description}</p>
      </div>
    </div>
  </CardContent>
</Card>
```

### Stats Card
```typescript
<Card>
  <CardHeader>
    <CardDescription className={TYPOGRAPHY.caption}>
      Overall Progress
    </CardDescription>
    <CardTitle className={TYPOGRAPHY.statLarge}>
      {completionRate}%
    </CardTitle>
  </CardHeader>
  <CardContent>
    <Progress 
      value={completionRate} 
      className={PROGRESS_BAR_VARIANTS.default} 
    />
  </CardContent>
</Card>
```

## Best Practices

### DO ✅
- Gebruik altijd design tokens voor spacing, typography en colors
- Gebruik helper functies voor status en quality colors
- Gebruik motion presets voor consistente animaties
- Gebruik ICON_CONTAINERS voor gecentreerde iconen

### DON'T ❌
- Hardcode geen spacing waarden (gebruik SPACING tokens)
- Hardcode geen font sizes (gebruik TYPOGRAPHY tokens)
- Hardcode geen kleuren (gebruik COLORS tokens)
- Maak geen lokale varianten van bestaande patterns

## Geharmoniseerde Pagina's

De volgende pagina's gebruiken het design system:

1. **Persona Overzicht** (`/components/PersonasSection.tsx`)
2. **Persona Detail** (`/components/personas/PersonaDetailPage.tsx`)
3. **Brand Assets Overzicht** (`/components/BrandOverview.tsx`)
4. **Asset Detail** (`/components/AssetUnlockDetailView.tsx`)

Alle pagina's delen:
- Identieke spacing (page, section, card)
- Identieke typography (headings, body, labels)
- Identieke icon sizes en containers
- Identieke status colors en badges
- Identieke research method card styling
- Identieke animation patterns
