# StatusBadge System - 6 Varianten

Consistent StatusBadge systeem met exact 6 semantische varianten voor de gehele applicatie.

## Design Principes

1. **NOOIT klikbaar** - Badges tonen alleen status, geen acties
2. **Consistente styling** - `rounded-full`, `text-xs`, `font-medium`, `px-2.5 py-0.5`
3. **Semantische betekenis** - Elke variant heeft duidelijke use cases
4. **Optionele icons** - Icons zijn `h-3 w-3` voor perfecte balans
5. **Dark mode support** - Alle varianten werken in light en dark mode
6. **Maximaal 6 varianten** - Voorkomt variant proliferatie

## De 6 Varianten

### 1. SUCCESS (Groen)
**Gebruik voor:** Completed, Ready, Active, Validated, Approved

```tsx
<StatusBadge variant="success">Completed</StatusBadge>
<SuccessBadge icon={CheckCircle2}>Ready</SuccessBadge>
```

**Kleuren:**
- Light: `bg-green-100 text-green-700 border-green-200`
- Dark: `dark:bg-green-900/30 dark:text-green-300 dark:border-green-800`

---

### 2. WARNING (Amber)
**Gebruik voor:** Pending, In Progress, Needs Attention, Draft

```tsx
<StatusBadge variant="warning">In Progress</StatusBadge>
<WarningBadge icon={Clock}>Pending</WarningBadge>
```

**Kleuren:**
- Light: `bg-amber-100 text-amber-700 border-amber-200`
- Dark: `dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800`

---

### 3. ERROR (Rood)
**Gebruik voor:** Failed, Error, Blocked, Rejected, Overdue

```tsx
<StatusBadge variant="error">Failed</StatusBadge>
<ErrorBadge icon={XCircle}>Blocked</ErrorBadge>
```

**Kleuren:**
- Light: `bg-red-100 text-red-700 border-red-200`
- Dark: `dark:bg-red-900/30 dark:text-red-300 dark:border-red-800`

---

### 4. INFO (Blauw)
**Gebruik voor:** New, Processing, Info, Beta, Updated

```tsx
<StatusBadge variant="info">New</StatusBadge>
<InfoBadge icon={Sparkles}>Beta</InfoBadge>
```

**Kleuren:**
- Light: `bg-blue-100 text-blue-700 border-blue-200`
- Dark: `dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800`

---

### 5. NEUTRAL (Grijs)
**Gebruik voor:** Inactive, Disabled, Archived, None

```tsx
<StatusBadge variant="neutral">Inactive</StatusBadge>
<NeutralBadge>Default</NeutralBadge>
```

**Kleuren:**
- Light: `bg-gray-100 text-gray-700 border-gray-200`
- Dark: `dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700`

---

### 6. LOCKED (Amber Accent)
**Gebruik voor:** Premium, Pro, Locked, Upgrade Required

```tsx
<StatusBadge variant="locked" icon={Lock}>Premium</StatusBadge>
<LockedBadge icon={Lock}>Pro</LockedBadge>
```

**Kleuren:**
- Light: `bg-amber-100 text-amber-700 border-amber-300`
- Dark: `dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700`

**Note:** Deze variant heeft een subtiel andere border kleur (`border-amber-300`) om premium content te highlighten. Vaak gecombineerd met Lock icon.

---

## Component API

### StatusBadge Props

```tsx
interface StatusBadgeProps {
  variant: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'locked';
  children: React.ReactNode;
  icon?: LucideIcon;        // Optioneel Lucide icon
  className?: string;       // Extra CSS classes
}
```

### Convenience Components

Voor veelgebruikte varianten zijn er convenience components:

```tsx
<SuccessBadge>Completed</SuccessBadge>
<WarningBadge icon={Clock}>Pending</WarningBadge>
<ErrorBadge icon={XCircle}>Failed</ErrorBadge>
<InfoBadge icon={Sparkles}>Beta</InfoBadge>
<NeutralBadge>Inactive</NeutralBadge>
<LockedBadge icon={Lock}>Premium</LockedBadge>
```

## Praktijkvoorbeelden

### Research Method Status
```tsx
<SuccessBadge icon={CheckCircle2}>Completed</SuccessBadge>
<WarningBadge icon={Clock}>In Progress</WarningBadge>
<InfoBadge>Not Started</InfoBadge>
```

### Brand Asset Status
```tsx
<SuccessBadge icon={CheckCircle2}>Ready</SuccessBadge>
<WarningBadge icon={AlertTriangle}>Needs Work</WarningBadge>
<ErrorBadge icon={XCircle}>Blocked</ErrorBadge>
```

### Premium Features
```tsx
<LockedBadge icon={Lock}>Premium</LockedBadge>
<SuccessBadge icon={CheckCircle2}>Unlocked</SuccessBadge>
<NeutralBadge>Free</NeutralBadge>
```

### Payment Status
```tsx
<SuccessBadge icon={CheckCircle2}>Paid</SuccessBadge>
<WarningBadge icon={Clock}>Pending</WarningBadge>
<ErrorBadge icon={XCircle}>Failed</ErrorBadge>
```

## Wanneer gebruik je welke variant?

### ✅ SUCCESS - Positieve, afgeronde acties
- Research method is voltooid
- Brand asset is validated
- Payment is successful
- Feature is active
- User is approved

### ⚠️ WARNING - Actie vereist, maar niet kritiek
- Research in progress
- Asset needs review
- Payment pending
- Draft status
- Attention needed

### ❌ ERROR - Problemen of blokkades
- Research is blocked
- Asset validation failed
- Payment error
- Action rejected
- Deadline overdue

### ℹ️ INFO - Informatief, neutraal positief
- New feature
- Beta functionality
- Processing state
- Updated content
- General information

### ⚪ NEUTRAL - Inactief of default state
- Feature disabled
- Method not started
- Archived content
- No status
- Default value

### 🔒 LOCKED - Premium/betaalde content
- Premium feature
- Pro plan required
- Locked functionality
- Upgrade needed
- Paid content

## Anti-Patterns

❌ **NIET DOEN:**
```tsx
// Badges zijn NOOIT klikbaar
<StatusBadge variant="success" onClick={...}>Click me</StatusBadge>

// Gebruik geen custom kleuren
<StatusBadge variant="success" className="bg-purple-500">Wrong</StatusBadge>

// Creëer geen nieuwe varianten
<StatusBadge variant="custom">Not allowed</StatusBadge>
```

✅ **WEL DOEN:**
```tsx
// Badges zijn read-only status indicators
<StatusBadge variant="success">Completed</StatusBadge>

// Voor acties gebruik je Buttons
<Button variant="outline" size="sm">
  <Lock className="h-4 w-4" />
  Unlock
</Button>

// Gebruik convenience components
<SuccessBadge icon={CheckCircle2}>Ready</SuccessBadge>
```

## Styling Extensie

Als je extra styling nodig hebt, gebruik dan de `className` prop:

```tsx
// Extra margin
<StatusBadge variant="success" className="ml-2">
  Completed
</StatusBadge>

// Responsive display
<StatusBadge variant="warning" className="hidden md:inline-flex">
  Draft
</StatusBadge>
```

**BELANGRIJK:** Overschrijf nooit de core styling (kleuren, padding, border-radius). Deze zijn vast voor consistentie.

## Design System Integratie

De StatusBadge kleuren zijn gedefinieerd in `/constants/design-system.ts`:

```tsx
import { getStatusBadgeColors } from '@/constants/design-system';

// Haal kleuren op voor custom implementatie
const colors = getStatusBadgeColors('success');
// Returns: { bg, text, border }
```

## Showcase Component

Voor development en design review is er een showcase component:

```tsx
import { StatusBadgeShowcase } from '@/components/ui/StatusBadgeShowcase';

// Toon alle varianten
<StatusBadgeShowcase />
```

## Migratie van oude badges

Als je oude badge implementaties hebt, vervang ze door het nieuwe systeem:

```tsx
// OUD
<Badge className="bg-green-100 text-green-700">Completed</Badge>

// NIEUW
<SuccessBadge>Completed</SuccessBadge>
```

## Toegankelijkheid

- Badges zijn semantic HTML spans (niet interactief)
- Kleuren hebben voldoende contrast voor WCAG AA
- Icons zijn decoratief (aria-hidden door Lucide React)
- Tekst communiceert altijd de status (niet alleen kleur)

## Browser Support

Alle moderne browsers (Chrome, Firefox, Safari, Edge) ondersteunen alle gebruikte features.
