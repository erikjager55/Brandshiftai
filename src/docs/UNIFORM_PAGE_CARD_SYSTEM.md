# Uniform Page Card System

## Overzicht

We hebben een uniform card systeem geïmplementeerd voor consistentie over de gehele applicatie. Het `PageCard` component zorgt voor een gestandaardiseerde visuele presentatie met flexibele content opties.

## Component Locatie

```
/components/ui/page-card.tsx
```

## Kernprincipes

### 1. Visuele Consistentie
- **Uniforme icon behandeling**: Alle cards gebruiken dezelfde 48x48px afgeronde icon containers
- **Gestandaardiseerde spacing**: Consistente padding en margins tussen elementen
- **Voorspelbare layout**: Icon links, titel/beschrijving midden, acties rechts

### 2. Flexibiliteit
- **Content-agnostisch**: Ondersteunt elk type content via children prop
- **Conditionele elementen**: Alleen tonen wat nodig is (badges, footer, actions)
- **Variant systeem**: Default, interactive, en elevated states

### 3. Toegankelijkheid
- **Keyboard navigatie**: Volledig toetsenbord toegankelijk
- **Hover states**: Duidelijke visuele feedback
- **Click handlers**: Proper event propagation met stopPropagation waar nodig

## Component API

### Props

```typescript
interface PageCardProps {
  // Visual
  icon?: LucideIcon;              // Icon component from lucide-react
  iconBgColor?: string;           // Tailwind classes voor icon achtergrond
  iconColor?: string;             // Tailwind classes voor icon kleur
  
  // Content
  title: string;                  // Hoofdtitel (verplicht)
  description?: string;           // Beschrijving onder titel
  badges?: PageCardBadge[];       // Array van badges naast titel
  children?: React.ReactNode;     // Hoofd content area
  footer?: React.ReactNode;       // Footer content (met border-top)
  
  // Actions
  actions?: PageCardAction[];     // Buttons rechts bovenin
  onClick?: () => void;           // Card click handler
  
  // Styling
  className?: string;             // Extra CSS classes
  variant?: 'default' | 'interactive' | 'elevated';
}

interface PageCardBadge {
  label: string;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  className?: string;
}

interface PageCardAction {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  icon?: LucideIcon;
}
```

## Gebruik Voorbeelden

### 1. Basis Card (Framework Selector)

```tsx
<PageCard
  icon={Rocket}
  title="Campaign Strategy Generator"
  description="Generate comprehensive campaign plans based on brand positioning"
  badges={[
    { label: "Most Popular", variant: "default" }
  ]}
  onClick={() => selectFramework('campaign-strategy')}
  variant="interactive"
/>
```

**Resultaat**: Klikbare card met icon, titel, beschrijving en badge. Hover effect toont visuele feedback.

### 2. Card met Features (Strategy Tools)

```tsx
<PageCard
  icon={Target}
  iconBgColor="bg-blue-100 dark:bg-blue-900/30"
  iconColor="text-blue-600 dark:text-blue-400"
  title="Brand Positioning Framework"
  description="Define your unique market position and value proposition"
  badges={[
    { label: "AI Assisted", variant: "secondary" }
  ]}
  variant="interactive"
>
  <div className="space-y-2">
    {features.map(feature => (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <CheckCircle2 className="h-3 w-3 text-primary" />
        <span>{feature}</span>
      </div>
    ))}
  </div>
</PageCard>
```

**Resultaat**: Card met custom content area voor feature lijst. Icon heeft custom kleuren.

### 3. Card met Footer (Time Estimate)

```tsx
<PageCard
  icon={Calendar}
  title="Content Calendar Builder"
  description="Plan and schedule content across channels"
  footer={
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">~10-15 min</span>
      <Button size="sm">
        Start Draft
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  }
  variant="elevated"
/>
```

**Resultaat**: Card met footer area die gescheiden is door border-top. Ideaal voor metadata of CTA's.

### 4. Card met Actions (Campaign Overview)

```tsx
<PageCard
  icon={Megaphone}
  iconBgColor="bg-blue-100 dark:bg-blue-900/30"
  iconColor="text-blue-600 dark:text-blue-400"
  title="Summer Launch 2025"
  description="Campaign strategy ready to deploy"
  badges={[
    { label: "Active", variant: "default", className: "bg-green-100..." },
    { label: "85% Confidence", variant: "outline" }
  ]}
  actions={[
    { 
      label: "Edit", 
      onClick: handleEdit, 
      icon: Edit, 
      variant: "outline" 
    },
    { 
      label: "Delete", 
      onClick: handleDelete, 
      icon: Trash2, 
      variant: "ghost" 
    }
  ]}
>
  {/* Custom content like asset indicators */}
  <div className="flex gap-3 pt-2">
    <div className="flex items-center gap-1">
      <Shield className="h-4 w-4" />
      <span className="text-xs">1 Brand</span>
    </div>
    <div className="flex items-center gap-1">
      <User className="h-4 w-4" />
      <span className="text-xs">2 Personas</span>
    </div>
  </div>
</PageCard>
```

**Resultaat**: Volledig uitgeruste card met actions rechtsboven. Actions hebben proper click handlers met stopPropagation.

### 5. Card met Avatar Overlay (Personas)

```tsx
<PageCard
  icon={Users}
  iconBgColor="bg-blue-100 dark:bg-blue-900/30"
  iconColor="text-blue-600 dark:text-blue-400"
  title="Sarah Mitchell"
  description="Digital Marketing Manager at mid-size tech company"
  badges={[
    { 
      label: "In Research", 
      variant: "outline", 
      className: "bg-blue-100 text-blue-700 border-blue-300" 
    }
  ]}
  onClick={() => viewPersona(persona)}
  variant="interactive"
>
  {/* Avatar Overlay - replaces icon when available */}
  {persona.avatar && (
    <div className="absolute left-6 top-6 z-10">
      <img 
        src={persona.avatar} 
        alt={persona.name}
        className="h-12 w-12 rounded-xl object-cover ring-2 ring-background shadow-sm"
      />
    </div>
  )}
  
  {/* Research Progress */}
  <div className="flex items-center gap-6 pt-2">
    <div className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">Research Coverage</span>
        <span className="text-xs font-medium">75%</span>
      </div>
      <Progress value={75} className="h-2" />
    </div>
    <DecisionStatusBadge status="safe-to-decide" size="sm" />
  </div>
  
  {/* Research Methods */}
  <div className="flex items-center gap-2 pt-3 border-t border-border mt-4">
    <span className="text-xs text-muted-foreground mr-1">Methods:</span>
    <div className="h-6 w-6 rounded bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
      <MessageSquare className="h-3 w-3 text-green-600 dark:text-green-400" />
    </div>
    {/* More method icons... */}
  </div>
</PageCard>
```

**Resultaat**: Persona card met avatar overlay, research progress bar, decision status en research methods. Avatar wordt getoond over het icon heen via absolute positioning.

## Variant Gedrag

### Default
```tsx
variant="default"
```
- Standaard card styling
- Geen speciale hover effecten
- Gebruikt wanneer card niet interactief is

### Interactive
```tsx
variant="interactive"
```
- Hover border highlight (primary/50)
- Cursor pointer
- Shadow effect on hover
- **Automatisch actief** wanneer `onClick` prop aanwezig is

### Elevated
```tsx
variant="elevated"
```
- Subtiele shadow altijd zichtbaar
- Shadow intensiveert on hover
- Ideaal voor gelaagde UI's

## Icon Kleuren Systeem

### Standaard (Primary)
```tsx
iconBgColor="bg-primary/10"
iconColor="text-primary"
```

### Blauw (Info/Strategy)
```tsx
iconBgColor="bg-blue-100 dark:bg-blue-900/30"
iconColor="text-blue-600 dark:text-blue-400"
```

### Groen (Success/Active)
```tsx
iconBgColor="bg-green-100 dark:bg-green-900/30"
iconColor="text-green-600 dark:text-green-400"
```

### Paars (AI/Premium)
```tsx
iconBgColor="bg-purple-100 dark:bg-purple-900/30"
iconColor="text-purple-600 dark:text-purple-400"
```

### Oranje (Popular/Warning)
```tsx
iconBgColor="bg-orange-100 dark:bg-orange-900/30"
iconColor="text-orange-600 dark:text-orange-400"
```

## Badge Styling

### Standaard Tag Badges
```tsx
{
  label: "Most Popular",
  variant: "outline",
  className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200"
}
```

### Status Badges
```tsx
{
  label: "Active",
  variant: "outline",
  className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200"
}
```

### Confidence Badges
```tsx
{
  label: "85% High",
  variant: "default",
  className: "bg-green-600 text-white border-green-700"
}
```

## Content Patronen

### Feature List
```tsx
<div className="space-y-2">
  {features.map(feature => (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <CheckCircle2 className="h-3 w-3 text-primary" />
      <span>{feature}</span>
    </div>
  ))}
</div>
```

### Asset Indicators
```tsx
<div className="flex gap-3">
  <div className="flex items-center gap-1">
    <Shield className="h-4 w-4 text-gray-500" />
    <span className="text-xs text-muted-foreground">1</span>
  </div>
</div>
```

### Progress/Metrics
```tsx
<div className="space-y-2">
  <div className="flex justify-between text-xs">
    <span className="text-muted-foreground">Completion</span>
    <span className="font-medium">75%</span>
  </div>
  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
    <div className="h-full bg-primary rounded-full" style={{ width: '75%' }} />
  </div>
</div>
```

## Implementatie Status

### ✅ Geïmplementeerd
- `/components/ui/page-card.tsx` - Core component (v1.0)
- `/components/PersonasSection.tsx` - ✅ Volledig geconverteerd naar PageCard (2-kolom grid)
  - Avatar overlay systeem (persona foto over icon)
  - Demographics info grid (age, location, occupation)
  - Goals & Frustrations preview
  - Tags badges
  - Research coverage progress bar
  - Decision status badges
  - Research methods indicators
- `/components/BrandAssetsViewSimple.tsx` - ✅ Volledig geconverteerd naar PageCard (2-kolom grid)
  - Category-based icon coloring (Foundation, Strategy, Personality, etc.)
  - Content preview with line-clamp
  - Asset metadata (last updated, artifacts validated)
  - Critical asset indicator
  - Research coverage progress bar
  - Decision quality status
  - Research methods status indicators (completed, in-progress, not-started)
- `/components/KnowledgeLibrary.tsx` - ✅ 2-kolom grid layout
  - Grid view met resource cards
  - Type-based icon systeem (Book, Video, Article, etc.)
  - Ratings en difficulty badges
  - Tags en metadata
- `/components/NewStrategyPage.tsx` - ✅ 2-kolom grid layout
  - Strategy framework cards
  - Tag badges (Most Popular, AI Assisted, High Value, New)
  - Features checklist
  - Estimated time indicators
  - Hover effects en gradient overlays
- `/components/ActiveCampaignsPage.tsx` - ✅ Volledig geconverteerd naar PageCard (2-kolom grid)
  - Campaign type icon met gekleurde background
  - Status badges (Active, Draft, Generating)
  - Context inputs badges (brand, persona, product counts)
  - Deliverables progress bar
  - Deliverable type icons met status coloring (completed/in-progress/not-started)
  - Modified timestamp en author
  - Hover actions (Edit, Delete)
- `/components/DeliverablesPage.tsx` - ✅ Volledig geconverteerd naar PageCard (2-kolom grid)
  - Deliverable type icon met gekleurde background (Document, Image, Video, Email, Website, Social)
  - Status badges (Completed, In Progress, Not Started)
  - PROMINENT campaign connection display met icon en naam
  - Metadata grid (Due Date, Assignee, File Size, Version)
  - Advanced filtering (Search, Campaign, Type, Status)
  - Stats overview cards (Total, Completed, In Progress, Not Started)
  - Active filters display met dismiss buttons
  - Hover actions (Download, Edit, Delete)
  - Last modified timestamp

### 🔄 Te Implementeren
- Research methods cards

## Best Practices

### DO ✅
- Gebruik PageCard voor alle grid/list item presentaties
- Gebruik consistente icon kleuren per categorie
- Plaats actions rechtsboven, footer onderaan
- Gebruik badges voor status en metadata
- Gebruik children voor complexe content

### DON'T ❌
- Nest geen PageCards binnen PageCards
- Gebruik geen inline styles voor kleuren (gebruik Tailwind)
- Mix niet verschillende card componenten in dezelfde view
- Overload niet met te veel badges (max 2-3)
- Maak geen actions die overlappen met card onClick

## Toegankelijkheid Checklist

- [ ] Icon heeft descriptive alt text (via title of aria-label)
- [ ] Title is semantically correct (h3 binnen card)
- [ ] Actions hebben clear labels
- [ ] Card is keyboard navigable (tab, enter)
- [ ] Hover states zijn duidelijk zichtbaar
- [ ] Color contrast voldoet aan WCAG AA
- [ ] Click areas zijn minimaal 44x44px

## Toekomstige Uitbreidingen

### Geplanned
- **Skeleton loader variant**: Voor loading states
- **Compact mode**: Kleinere variant voor dense layouts
- **Selection state**: Checkbox/radio integration
- **Drag handle**: Voor sorteerbare lists
- **Notification dot**: Voor unread/new items

### Overwogen
- **Card groups**: Wrapper component voor related cards
- **Card toolbar**: Sticky toolbar bovenin card
- **Expandable content**: Accordion-style content reveal
- **Card presets**: Pre-configured variants per use case

## Migratie Strategie

### Fase 1: Core Pages (Huidig)
1. Strategy framework selector ✅
2. Active campaigns overview ⏳
3. Deliverables grid ⏳

### Fase 2: Research & Assets
1. Research methods dashboard
2. Brand assets overview
3. Persona cards
4. Trend library

### Fase 3: Misc Pages
1. Knowledge library
2. Template selector
3. Settings cards
4. Dashboard widgets

## Support & Vragen

Voor vragen of suggesties over het PageCard systeem:
- Bekijk de component source: `/components/ui/page-card.tsx`
- Zie voorbeelden in: `/components/NewStrategyPage.tsx`
- Check deze docs: `/docs/UNIFORM_PAGE_CARD_SYSTEM.md`