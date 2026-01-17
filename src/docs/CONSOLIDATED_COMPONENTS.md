# 🎨 Consolidated Component System

Volledige documentatie voor het geconsolideerde component systeem met unified variants voor Button, Card en Badge.

---

## 📦 BUTTON COMPONENT

**Locatie:** `/components/ui/button.tsx`

### Variants

| Variant | Gebruik | Voorbeeld |
|---------|---------|-----------|
| `default` | Primaire acties | Submit, Save, Create |
| `destructive` | Destructieve acties | Delete, Remove, Cancel |
| `outline` | Secundaire acties | Cancel, Back, More Info |
| `secondary` | Tertiaire acties | View Details, Edit |
| `ghost` | Subtle acties | Icon buttons, Menu items |
| `link` | Link-style buttons | "Learn more", "Read docs" |
| `success` ✨ | Success acties | Confirm, Approve, Accept |
| `warning` ✨ | Warning acties | Caution actions |
| `gradient` ✨ | Premium/featured acties | Upgrade, Get Started |

### Sizes

| Size | Height | Gebruik |
|------|--------|---------|
| `sm` | 36px (h-9) | Compact spaces, inline actions |
| `default` | 40px (h-10) | Standard buttons |
| `lg` | 44px (h-11) | Primary CTAs, headers |
| `xl` | 48px (h-12) | Hero sections, landing pages |
| `icon` | 40px (size-10) | Icon-only buttons (square) |
| `icon-sm` | 32px (size-8) | Small icon buttons |
| `icon-lg` | 48px (size-12) | Large icon buttons |

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `default` | Visual variant |
| `size` | `ButtonSize` | `default` | Size variant |
| `fullWidth` | `boolean` | `false` | Full width button |
| `asChild` | `boolean` | `false` | Render as child (Radix Slot) |

### Voorbeelden

```tsx
// Primary action
<Button variant="default" size="lg">
  <Plus /> Create Campaign
</Button>

// Destructive action
<Button variant="destructive" size="sm">
  <Trash2 /> Delete
</Button>

// Icon button
<Button variant="ghost" size="icon">
  <Settings />
</Button>

// Gradient premium button
<Button variant="gradient" size="xl" fullWidth>
  <Crown /> Upgrade to Premium
</Button>

// Success confirmation
<Button variant="success">
  <Check /> Approve
</Button>
```

---

## 🃏 CARD COMPONENT

**Locatie:** `/components/ui/card.tsx`

### Variants

| Variant | Gebruik | Voorbeeld |
|---------|---------|-----------|
| `default` | Standaard cards | Content containers |
| `interactive` | Clickable cards | List items, navigation cards |
| `highlighted` | Featured content | Premium features, highlights |
| `success` | Success states | Completed tasks, confirmations |
| `warning` | Warning states | Alerts, cautions |
| `error` | Error states | Failed validations, errors |
| `info` | Informational | Tips, help content |
| `gradient` ✨ | Premium sections | Featured plans, promotions |

### Padding (Internal Spacing)

| Padding | Gap | Gebruik |
|---------|-----|---------|
| `none` | 0 | Custom layouts |
| `sm` | gap-4 | Compact cards |
| `default` | gap-6 | Standard cards |
| `lg` | gap-8 | Spacious cards |

### Hover Effects

| Hover | Effect | Gebruik |
|-------|--------|---------|
| `none` | No effect | Static cards |
| `lift` | Translate up | Subtle interaction |
| `scale` | Scale up | Emphasized interaction |
| `shadow` | Shadow increase | Depth effect |

### Subcomponents

- **CardHeader**: Header section with title/description
- **CardTitle**: Main title element
- **CardDescription**: Subtitle/description text
- **CardContent**: Main content area
- **CardFooter**: Footer section
- **CardAction**: Action buttons area

### Voorbeelden

```tsx
// Default card
<Card>
  <CardHeader>
    <CardTitle>Campaign Strategy</CardTitle>
    <CardDescription>Generate comprehensive plans</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>

// Interactive card with hover effect
<Card variant="interactive" hover="lift" onClick={handleClick}>
  <CardHeader>
    <CardTitle>Brand Positioning</CardTitle>
  </CardHeader>
</Card>

// Status card (success)
<Card variant="success">
  <CardHeader>
    <CardTitle>Campaign Approved</CardTitle>
    <CardDescription>Your campaign is ready to launch</CardDescription>
  </CardHeader>
</Card>

// Gradient featured card
<Card variant="gradient" padding="lg">
  <CardHeader>
    <CardTitle>Premium Features</CardTitle>
    <CardDescription>Unlock advanced strategy tools</CardDescription>
  </CardHeader>
  <CardContent>
    <Button variant="gradient" fullWidth>Upgrade Now</Button>
  </CardContent>
</Card>

// Custom padding and hover
<Card padding="sm" hover="shadow">
  <CardContent>Compact card with shadow hover</CardContent>
</Card>
```

---

## 🏷️ BADGE COMPONENT

**Locatie:** `/components/ui/badge.tsx`

### Variants

| Variant | Gebruik | Voorbeeld |
|---------|---------|-----------|
| `default` | Primary badges | Default state |
| `secondary` | Secondary info | Metadata, tags |
| `destructive` | Destructive states | Errors, critical |
| `outline` | Outlined badges | Neutral info |
| `success` ✨ | Success states | Completed, Active |
| `warning` ✨ | Warning states | Pending, Attention |
| `error` ✨ | Error states | Failed, Blocked |
| `info` ✨ | Info states | Information, Help |
| `purple` ✨ | Category color | Workshops, Purple category |
| `orange` ✨ | Category color | Orange category |
| `pink` ✨ | Category color | Pink category |
| `gradient` ✨ | Premium badge | Featured, Premium |
| `premium` ✨ | Premium tier | Premium features |

### Sizes

| Size | Padding | Font Size | Gebruik |
|------|---------|-----------|---------|
| `sm` | px-2 py-0 | 10px | Compact spaces |
| `default` | px-2.5 py-0.5 | 12px | Standard badges |
| `lg` | px-3 py-1 | 14px | Emphasized badges |

### Shapes

| Shape | Border Radius | Gebruik |
|-------|---------------|---------|
| `rounded` | rounded-full | Default pill shape |
| `square` | rounded-md | Square badges |

### Voorbeelden

```tsx
// Status badges
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="info">Beta</Badge>

// Category badges (colored)
<Badge variant="purple">Workshop</Badge>
<Badge variant="orange">Interview</Badge>
<Badge variant="pink">Survey</Badge>

// Premium badge
<Badge variant="premium" size="lg">Premium</Badge>
<Badge variant="gradient">Featured</Badge>

// Outlined badge
<Badge variant="outline" shape="square">Draft</Badge>

// With icon
<Badge variant="success">
  <CheckCircle className="h-3 w-3" />
  Completed
</Badge>

// Small size
<Badge variant="secondary" size="sm">2 items</Badge>
```

---

## 🎯 MIGRATION GUIDE

### Van oude naar nieuwe components

#### Button Migration

```tsx
// ❌ VOOR: Custom classNames
<button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl">
  Click me
</button>

// ✅ NA: Variant prop
<Button variant="default">Click me</Button>
```

```tsx
// ❌ VOOR: Gradient custom styling
<button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
  Upgrade
</button>

// ✅ NA: Gradient variant
<Button variant="gradient">Upgrade</Button>
```

#### Card Migration

```tsx
// ❌ VOOR: Custom status colors
<Card className="bg-green-50/50 dark:bg-green-900/10 border-green-200">
  <CardContent>Success!</CardContent>
</Card>

// ✅ NA: Variant prop
<Card variant="success">
  <CardContent>Success!</CardContent>
</Card>
```

```tsx
// ❌ VOOR: Manual hover effects
<Card className="hover:shadow-md hover:-translate-y-0.5 transition-all">
  <CardContent>Hover me</CardContent>
</Card>

// ✅ NA: Hover prop
<Card hover="lift">
  <CardContent>Hover me</CardContent>
</Card>
```

#### Badge Migration

```tsx
// ❌ VOOR: Custom status styling
<Badge className="bg-green-100 text-green-700 border-green-200">
  Active
</Badge>

// ✅ NA: Variant prop
<Badge variant="success">Active</Badge>
```

```tsx
// ❌ VOOR: Multiple conditional classes
<Badge className={status === 'success' ? 'bg-green-100' : status === 'error' ? 'bg-red-100' : 'bg-gray-100'}>
  {status}
</Badge>

// ✅ NA: Dynamic variant
<Badge variant={status}>{status}</Badge>
```

---

## 📋 VERWIJDERDE DUPLICATEN

De volgende oude components zijn verwijderd en vervangen door de geconsolideerde variants:

| Verwijderd | Vervangen door |
|------------|----------------|
| `consistent-card.tsx` | `Card` met variants |
| `ConsistentCard` | `<Card variant="...">` |
| `StatusCard` | `<Card variant="success\|warning\|error\|info">` |
| `consistent-badge.tsx` | `Badge` met variants |
| `StatusBadge` (oud) | `<Badge variant="success\|warning\|error">` |
| `CategoryBadge` | `<Badge variant="purple\|orange\|pink">` |
| `page-header.tsx` (duplicaat) | `PageHeader.tsx` (master component) |

---

## 🎨 DESIGN SYSTEM ALIGNMENT

Alle variants zijn aligned met het centrale design system (`/constants/design-system.ts`):

### Colors
- Success: `green-*` palette
- Warning: `yellow-*` palette
- Error: `red-*` palette
- Info: `blue-*` palette
- Primary: `#1FD1B2` (Minty Green)
- Secondary: `#5252E3` (Electric Blue)

### Spacing
- Gebruikt design system tokens (`gap-4`, `px-8`, etc.)
- Consistent padding across components
- Auto-layout compatible (flexbox/grid)

### Typography
- Unified text sizes (`text-xs`, `text-sm`, `text-base`)
- Consistent font weights (`font-medium`, `font-semibold`)

---

## ✅ BEST PRACTICES

### DO ✅

```tsx
// Use semantic variants
<Button variant="destructive">Delete</Button>
<Card variant="success">Completed!</Card>
<Badge variant="warning">Pending</Badge>

// Combine variants with props
<Button variant="gradient" size="xl" fullWidth>
  Get Started
</Button>

// Use hover effects on cards
<Card variant="interactive" hover="lift" onClick={handleClick}>
  Click me
</Card>
```

### DON'T ❌

```tsx
// DON'T override variant colors with className
<Button variant="default" className="bg-red-500">Delete</Button>
// USE destructive variant instead
<Button variant="destructive">Delete</Button>

// DON'T use custom status styling
<Badge className="bg-green-100 text-green-700">Success</Badge>
// USE success variant
<Badge variant="success">Success</Badge>

// DON'T manually add hover effects
<Card className="hover:shadow-md transition-all">Content</Card>
// USE hover prop
<Card hover="shadow">Content</Card>
```

---

## 🚀 FUTURE ENHANCEMENTS

### Mogelijk toekomstige variants:

**Button:**
- `loading`: Loading state with spinner
- `disabled`: Disabled variant styling

**Card:**
- `bordered`: Heavy border emphasis
- `ghost`: Minimal styling
- `elevated`: Increased elevation

**Badge:**
- `dot`: Dot indicator badge
- `count`: Numeric count badge
- `animated`: Pulse/glow effects

---

**Laatste update:** 2025-01-15
**Versie:** 2.0.0
**Auteur:** Design System Team
