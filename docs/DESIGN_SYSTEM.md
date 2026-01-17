# 🎨 Brandshift.ai Design System

> **Single Source of Truth** voor alle UI componenten en styling

---

## 📁 Structuur

```
src/
├── components/ui/
│   ├── unified.ts          # Easy imports voor alle unified components
│   ├── ActionComponents.tsx # Buttons, icons, badges
│   ├── SearchFilter.tsx    # Search bars, filters
│   ├── CardVariants.tsx    # Card patterns
│   ├── EmptyState.tsx      # Empty state patterns
│   └── ...                 # Shadcn/ui primitives
├── constants/
│   ├── design-system.ts    # Core design tokens
│   └── design-tokens.ts    # Extended tokens & utilities
└── styles/
    └── design-system.css   # CSS variables
```

---

## 🎯 Quick Start

### Importeren van Unified Components

```tsx
// ✅ Gebruik unified.ts voor gemakkelijke imports
import { 
  SearchBar, 
  FilterSelect, 
  StatusBadge,
  DeleteButton,
  StatCard,
  EmptyStateCard 
} from '@/components/ui/unified';
```

### Importeren van Design Tokens

```tsx
import { 
  SPACING, 
  TYPOGRAPHY, 
  COLORS,
  ICON_SIZES,
  cn 
} from '@/constants/design-system';
```

---

## 🔘 Icon Standards

### Verplichte Icons

| Actie | Icon | Import |
|-------|------|--------|
| Verwijderen | `Trash2` | `import { Trash2 } from 'lucide-react'` |
| Toevoegen | `Plus` | `import { Plus } from 'lucide-react'` |
| Bewerken | `Edit` | `import { Edit } from 'lucide-react'` |
| Sluiten | `X` | `import { X } from 'lucide-react'` |
| Bevestigen | `CheckCircle2` | `import { CheckCircle2 } from 'lucide-react'` |
| Vergrendelen | `Lock` / `Unlock` | `import { Lock, Unlock } from 'lucide-react'` |
| Bekijken | `Eye` / `EyeOff` | `import { Eye, EyeOff } from 'lucide-react'` |
| Zoeken | `Search` | `import { Search } from 'lucide-react'` |
| Meer opties | `MoreHorizontal` | `import { MoreHorizontal } from 'lucide-react'` |

### ❌ Niet Gebruiken

| Verkeerd | Correct |
|----------|---------|
| `Edit2`, `Edit3`, `Pencil` | `Edit` |
| `CheckCircle` | `CheckCircle2` |
| `Trash` | `Trash2` |
| `Add` | `Plus` |

---

## 🎨 Kleurenpalet

### Status Kleuren

| Status | Kleur | Classes |
|--------|-------|---------|
| **Success** | Groen | `text-green-600 bg-green-50 border-green-200` |
| **Warning** | Amber | `text-amber-600 bg-amber-50 border-amber-200` |
| **Error** | Rood | `text-red-600 bg-red-50 border-red-200` |
| **Info** | Blauw | `text-blue-600 bg-blue-50 border-blue-200` |
| **Neutral** | Grijs | `text-gray-600 bg-gray-50 border-gray-200` |
| **Locked** | Amber | `text-amber-700 bg-amber-50 border-amber-300` |

### ⚠️ Vermijd Deze Kleuren voor Status

| Vermijd | Gebruik In Plaats |
|---------|-------------------|
| `emerald-*` | `green-*` |
| `orange-*` | `amber-*` |
| `yellow-*` (voor warnings) | `amber-*` |

### Wanneer Emerald Wel Gebruiken

Emerald is prima voor **decoratieve** doeleinden zoals:
- Gradients in hero sections
- Brand accenten
- Illustraties

```tsx
// ✅ OK - Decoratief
<div className="bg-gradient-to-br from-green-500 to-emerald-600">

// ❌ NIET - Status indicator
<Badge className="bg-emerald-100 text-emerald-700">Ready</Badge>
// ✅ CORRECT
<Badge className="bg-green-100 text-green-700">Ready</Badge>
```

---

## 📐 Spacing Systeem

### 4px Grid

Alle spacing moet op een 4px grid zitten. Vermijd oneven waarden.

| Token | Waarde | Gebruik |
|-------|--------|---------|
| `gap-1` | 4px | Inline elementen |
| `gap-2` | 8px | Tight spacing |
| `gap-3` | 12px | Default |
| `gap-4` | 16px | Relaxed |
| `gap-6` | 24px | Sections |
| `gap-8` | 32px | Large sections |

### ❌ Vermijd

- `gap-5` (20px - niet op grid)
- `p-5` (20px)
- `space-y-5` (20px)

### Padding Conventies

| Context | Padding |
|---------|---------|
| Cards | `p-6` |
| Compact cards | `p-4` |
| Hero sections | `p-8` |
| Empty states | `p-12` |
| Modals | `p-6` |

---

## 📝 Typography

### Heading Hierarchy

```tsx
// Page title
<h1 className="text-3xl font-semibold">Page Title</h1>

// Section title
<h2 className="text-xl font-semibold">Section</h2>

// Card title
<h3 className="text-lg font-semibold">Card Title</h3>

// Subsection
<h4 className="text-base font-semibold">Subsection</h4>
```

### Body Text

```tsx
// Default body
<p className="text-sm">Body text</p>

// Large body
<p className="text-base">Larger body text</p>

// Meta/helper text
<span className="text-xs text-muted-foreground">Meta info</span>

// Labels
<span className="text-xs font-medium uppercase tracking-wide">LABEL</span>
```

---

## 🔲 Border Radius

| Element | Radius |
|---------|--------|
| Cards | `rounded-xl` |
| Buttons | `rounded-xl` |
| Inputs | `rounded-lg` |
| Badges | `rounded-md` |
| Avatars | `rounded-full` |
| Modals | `rounded-2xl` |
| Tags/Pills | `rounded-full` |

---

## 🔍 Search Component

### Gebruik SearchBar

```tsx
import { SearchBar } from '@/components/ui/unified';

// Basic
<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Search..."
/>

// With size
<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="Search..."
  size="sm" // 'sm' | 'md' | 'lg'
/>

// With clear callback
<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  onClear={() => handleClear()}
/>
```

### ❌ Niet Meer Doen

```tsx
// OUDE MANIER - NIET GEBRUIKEN
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
  <Input placeholder="Search..." className="pl-9" />
</div>
```

---

## 📊 Filter Components

### FilterSelect

```tsx
import { FilterSelect } from '@/components/ui/unified';

<FilterSelect
  value={selectedCategory}
  onChange={setSelectedCategory}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
  allLabel="All Categories"
/>
```

### FilterDropdown (Multi-select)

```tsx
import { FilterDropdown } from '@/components/ui/unified';

<FilterDropdown
  label="Tags"
  options={['Tag1', 'Tag2', 'Tag3']}
  selected={selectedTags}
  onChange={setSelectedTags}
/>
```

---

## 🏷️ Status Badges

### StatusBadge Component

```tsx
import { StatusBadge } from '@/components/ui/unified';

<StatusBadge variant="success">Ready</StatusBadge>
<StatusBadge variant="warning">Pending</StatusBadge>
<StatusBadge variant="error">Failed</StatusBadge>
<StatusBadge variant="info">Processing</StatusBadge>
<StatusBadge variant="locked">Locked</StatusBadge>
```

### Varianten

| Variant | Kleur | Gebruik |
|---------|-------|---------|
| `success` | Groen | Completed, Ready, Active |
| `warning` | Amber | Pending, In Progress, Needs Attention |
| `error` | Rood | Failed, Error, Blocked |
| `info` | Blauw | Processing, New, Info |
| `neutral` | Grijs | Draft, Inactive |
| `locked` | Amber | Locked items |

---

## 🃏 Card Patterns

### StatCard

```tsx
import { StatCard } from '@/components/ui/unified';

<StatCard
  title="Total Assets"
  value={42}
  icon={Package}
  trend={{ value: 12, isPositive: true }}
  variant="success"
/>
```

### ListItemCard

```tsx
import { ListItemCard } from '@/components/ui/unified';

<ListItemCard
  icon={FileText}
  title="Document Title"
  subtitle="Last updated 2 hours ago"
  badge={<StatusBadge variant="success">Active</StatusBadge>}
  onClick={() => handleClick()}
/>
```

### EmptyStateCard

```tsx
import { EmptyStateCard } from '@/components/ui/unified';

<EmptyStateCard
  icon={Search}
  title="No results found"
  description="Try adjusting your search or filters"
  action={{
    label: "Clear filters",
    onClick: () => clearFilters()
  }}
/>
```

---

## 🔘 Action Buttons

### IconButton

```tsx
import { DeleteButton, EditButton, ViewButton } from '@/components/ui/unified';

// Pre-configured action buttons
<DeleteButton onClick={handleDelete} />
<EditButton onClick={handleEdit} />
<ViewButton isVisible={visible} onClick={toggleVisibility} />

// Generic icon button
import { IconButton } from '@/components/ui/unified';

<IconButton
  icon={RefreshCw}
  tooltip="Refresh"
  onClick={handleRefresh}
/>
```

### CTAButton

```tsx
import { CTAButton } from '@/components/ui/unified';

<CTAButton onClick={handleStart}>
  Get Started
</CTAButton>
```

---

## 📱 Responsive Patterns

### Grid Layouts

```tsx
// 2 columns
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

// 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// 4 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Page Container

```tsx
<div className="max-w-7xl mx-auto px-8 py-6">
  {/* Content */}
</div>
```

---

## ⚡ Transitions

### Standard Transitions

| Type | Classes |
|------|---------|
| Hover colors | `transition-colors duration-200` |
| All properties | `transition-all duration-200` |
| Modals/overlays | `transition-all duration-300` |
| Transform | `transition-transform duration-200` |

```tsx
// Button hover
<button className="transition-colors duration-200 hover:bg-primary/90">

// Card hover
<div className="transition-all duration-200 hover:shadow-lg hover:border-primary/30">
```

---

## 🔧 Utility Functions

### cn() - Class Name Merger

```tsx
import { cn } from '@/lib/utils';

// Merge classes conditionally
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === 'large' && "large-classes"
)}>
```

---

## 📋 Checklist voor Nieuwe Componenten

- [ ] Gebruikt unified components waar mogelijk
- [ ] Icons uit de standaard set
- [ ] Kleuren volgen status conventies
- [ ] Spacing op 4px grid
- [ ] Typography volgt hiërarchie
- [ ] Border radius consistent
- [ ] Transitions toegevoegd voor interactie
- [ ] Responsive grid patterns
- [ ] Dark mode support

---

## 🚀 Migratie Guide

### Van Custom Search naar SearchBar

```tsx
// VOOR
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
  <Input
    placeholder="Search..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="pl-9"
  />
</div>

// NA
import { SearchBar } from '@/components/ui/unified';

<SearchBar
  value={query}
  onChange={setQuery}
  placeholder="Search..."
/>
```

### Van Inline Badge naar StatusBadge

```tsx
// VOOR
<span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
  Active
</span>

// NA
import { StatusBadge } from '@/components/ui/unified';

<StatusBadge variant="success">Active</StatusBadge>
```

---

## 📚 Verder Lezen

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons/)
- [Shadcn/ui](https://ui.shadcn.com/)
