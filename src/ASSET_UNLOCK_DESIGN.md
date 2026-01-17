# Asset Unlock Detail View - Design Specificatie

## 📋 Overzicht

Strategische decision app voor merkstrategen om te begrijpen welk onderzoek nodig is om brand assets te ontgrendelen en beslissingen mogelijk te maken.

## 🎯 Doelgroep

**Merkstrateeg** die moet weten:
- Welk onderzoek is nodig om een besluit te ontgrendelen
- Wat is de huidige status van een asset
- Hoeveel impact heeft elk onderzoek op het ontgrendelen

## 📍 Fase

**Onderzoeksfase** - De gebruiker moet onderzoek uitvoeren om assets te ontgrendelen en strategische beslissingen te kunnen maken.

## 🖼️ Schermen

### 1. Hoofdlayout (Default)
**Focus**: Overzichtelijk, informatief, ruimtelijk

**Structuur**:
```
┌─────────────────────────────────────────┐
│ ← Terug | ASSET NAAM                    │
│          Status | Impact Card →          │
├─────────────────────────────────────────┤
│ Status Message + Progress Bar           │
├─────────────────────────────────────────┤
│ Beschikbare onderzoeken:                │
│ ┌─────────────────────────────────┐    │
│ │ [Icon] Method Name    [FREE]     │    │
│ │ Description                       │    │
│ │ Impact • Duration    [Start →]   │    │
│ └─────────────────────────────────┘    │
│ ... meer onderzoeken ...                │
├─────────────────────────────────────────┤
│ Dit onderzoek ontgrendelt               │
│ campagnestrategie                       │
└─────────────────────────────────────────┘
```

**Kenmerken**:
- ✅ Grote header met asset context
- ✅ Dedicated impact card rechtsboven
- ✅ Uitgebreide method cards met volledige info
- ✅ Duidelijke CTA per method
- ✅ Impact preview onderaan

### 2. Alternatieve Layout (Compact)
**Focus**: Efficiency, snelheid, densiteit

**Structuur**:
```
┌─────────────────────────────────────────┐
│ ← | Asset Naam | Status | Impact | CTA  │
│ ▬▬▬▬▬▬▬▬▬▬ Progress Bar                 │
├─────────────────────────────────────────┤
│ ┌──────────┬──────────┐                │
│ │ Method 1 │ Method 2 │                │
│ │ +35%     │ +45%     │                │
│ └──────────┴──────────┘                │
│ ┌──────────┬──────────┐                │
│ │ Method 3 │ Method 4 │                │
│ └──────────┴──────────┘                │
│ Status message                          │
└─────────────────────────────────────────┘
```

**Kenmerken**:
- ✅ Sticky compact header
- ✅ 2-koloms grid voor methods
- ✅ Snelle scan van opties
- ✅ Minimale tekst, maximale informatie

## 📊 Content Elementen

### Bovenin (Header)
```tsx
- Asset naam (H1, prominent)
- Huidige beslisstatus (Badge met icon + kleur)
- Beslisimpact percentage (Groot getal in Minty Green)
- Primaire CTA: "Ontgrendel met onderzoek"
```

### Midden (Research Methods)
```tsx
Voor elke method:
- Method icon (visuele herkenning)
- Method naam + FREE/Basic badge
- Korte beschrijving
- Impact indicator (+35%)
- Duration/tijd
- Status (Voltooid/Bezig/Start)
- Action button (Start/Continue/View)
```

### Onderaan
```tsx
- Impact preview message
- "Dit onderzoek ontgrendelt campagnestrategie"
```

## 🎨 States

### 1. Geblokkeerd (Blocked)
```tsx
Status: 🔴 Rood
Icon: Lock
Boodschap: "Minimaal onderzoek is vereist om dit asset te ontgrendelen"
CTA: Enabled "Ontgrendel met onderzoek"
```

### 2. Deels Ontgrendeld (At Risk)
```tsx
Status: 🟠 Oranje
Icon: AlertTriangle
Boodschap: "Voer extra onderzoek uit om besluitvorming te versterken"
CTA: Enabled "Ontgrendel met onderzoek"
```

### 3. Volledig Ontgrendeld (Safe to Decide)
```tsx
Status: 🟢 Groen
Icon: CheckCircle2
Boodschap: "Dit asset heeft voldoende onderzoek om strategische beslissingen te maken"
CTA: Disabled (reeds ontgrendeld)
```

## 💬 Copy Strategie

### Kernboodschap
> "Dit onderzoek ontgrendelt campagnestrategie"

### Tone of Voice
- **Direct** - Geen omhaal, direct to the point
- **Informatief** - Duidelijke impact numbers
- **Actionable** - Elke method heeft concrete actie
- **Urgent maar niet alarmerend** - Status indicatoren zonder paniek

### Microcopy Voorbeelden
```
✅ "Voltooid" ipv "Completed"
✅ "Start onderzoek" ipv "Begin research"
✅ "+35% unlock" ipv "35% progress"
✅ "Bezig" ipv "In progress"
✅ "Minimaal onderzoek vereist" ipv "Not enough research"
```

## 🎯 Design Constraints

### 1. Focus
- **Single asset focus** - Eén asset per pagina
- **Clear hierarchy** - Status → Impact → Methods → Action
- **No distractions** - Minimale sidebar, geen ads

### 2. Minimale Tekst
- **Max 2 regels** beschrijving per method
- **Één zin** status message
- **Icons + badges** ipv lange labels
- **Numbers speak** - Impact in percentages

### 3. Duidelijke Hiërarchie

**Visual hierarchy**:
```
1. Asset naam (text-3xl, font-bold)
2. Impact aantal (text-3xl, Minty Green)
3. Status badge (prominent, gekleurde achtergrond)
4. Method namen (text-lg, font-semibold)
5. Descriptions (text-sm, muted)
6. Metadata (text-xs, muted)
```

**Information hierarchy**:
```
1. Wat is de status? (Geblokkeerd/At Risk/Unlocked)
2. Hoeveel impact heb ik al? (35%, 70%, 100%)
3. Wat zijn mijn opties? (4 methods)
4. Wat krijg ik ervoor? (Unlock campagnestrategie)
```

## 🎨 Visuele Styling

### Kleurenpalet
```css
Minty Green (Primary): #1FD1B2
Dark Slate (Text): #1F2937

Status kleuren:
- Geblokkeerd: Red-600 (#DC2626)
- At Risk: Orange-600 (#EA580C)
- Unlocked: Green-600 (#16A34A)

Method states:
- Completed: Green-50 achtergrond, Green-600 accent
- In Progress: Blue-50 achtergrond, Blue-600 accent
- Available: Transparent, border-dashed
- Locked: Gray-50, grayscale
```

### Typography
```css
Font: Halyard (primary)
Sidebar: Inter (navigation)

Sizes:
- H1 Asset: 30px (text-3xl)
- Impact number: 30px (text-3xl)
- Method name: 18px (text-lg)
- Description: 14px (text-sm)
- Metadata: 12px (text-xs)
```

### Spacing
```css
Container: max-w-6xl (default), max-w-5xl (compact)
Padding: px-8 py-6 (default), px-6 py-4 (compact)
Card gaps: space-y-4 (default), gap-4 (compact grid)
Method cards: p-6 (default), p-5 (compact)
```

## 🔄 Interacties

### Method Card Hover
```tsx
- Border kleur: border-primary/50
- Background: bg-muted/30
- Transform: scale(1.01) (locked cards)
- Cursor: pointer
```

### CTA States
```tsx
Default: bg-[#1FD1B2] hover:bg-[#1AB89A]
Disabled: opacity-50, cursor-not-allowed
Loading: Spinner icon
```

### Layout Toggle
```tsx
Fixed button: bottom-6 right-6
Shadow: shadow-lg
Action: onClick switch tussen layouts
```

## 📱 Responsiveness

### Desktop (Default)
- Full layout met sidebar
- Impact card rechtsboven
- Single column method cards

### Compact View
- Sticky header
- 2-koloms grid voor methods
- Compact metadata

## 🚀 Demo Toegang

**URL**: Navigeer naar `asset-unlock-demo` in de app

**Of gebruik**:
```tsx
// In EnhancedSidebarSimple of development menu
<Button onClick={() => setActiveSection('asset-unlock-demo')}>
  Asset Unlock Demo
</Button>
```

## 📝 Implementatie Details

**Component**: `/components/AssetUnlockDetailView.tsx`

**Props**:
```tsx
interface AssetUnlockDetailViewProps {
  assetId: string;           // ID van het asset
  onBack: () => void;        // Navigate terug
  onStartResearch: (methodId: string) => void; // Start research
}
```

**State Management**:
```tsx
- selectedLayout: 'default' | 'alternative'
- decisionStatus: CalculatedStatus (uit calculator)
- completedMethods: Method[] (filtered)
- unlockProgress: number (percentage)
```

**Dependencies**:
```tsx
- mockBrandAssets (data)
- calculateDecisionStatus (utils)
- motion/react (animations)
- lucide-react (icons)
```

## ✅ Design Checklist

- [x] Focus op single asset
- [x] Minimale tekst (max 2 regels per method)
- [x] Duidelijke hiërarchie (Status → Impact → Methods)
- [x] 3 states (Blocked, At Risk, Unlocked)
- [x] Impact visualization (percentages)
- [x] Primary CTA prominent
- [x] "Dit onderzoek ontgrendelt..." copy
- [x] FREE badges voor gratis methods
- [x] Unlock indicators per method
- [x] 2 layouts (default + compact)
- [x] Consistent met brand styling (Halyard, Minty Green)
- [x] Responsive design
- [x] Motion/animations voor unlock effects

---

**Ontworpen voor**: Merkstrategen die snel willen begrijpen welk onderzoek nodig is om beslissingen te ontgrendelen.

**Filosofie**: "Show, don't tell" - Visuele impact indicators en duidelijke status badges in plaats van lange uitleg.
