# 🚀 Brandshift.ai Quick Reference

## Imports

```tsx
// Unified components
import { SearchBar, FilterSelect, StatusBadge, DeleteButton, StatCard } from '@/components/ui/unified';

// Design tokens
import { SPACING, TYPOGRAPHY, cn } from '@/constants/design-system';
```

## Icons (Lucide)

| Action | Icon |
|--------|------|
| Delete | `Trash2` |
| Add | `Plus` |
| Edit | `Edit` |
| Close | `X` |
| Success | `CheckCircle2` |
| Lock | `Lock` / `Unlock` |
| View | `Eye` / `EyeOff` |
| Search | `Search` |
| More | `MoreHorizontal` |

## Status Colors

| Status | Background | Text | Border |
|--------|------------|------|--------|
| Success | `bg-green-50` | `text-green-600` | `border-green-200` |
| Warning | `bg-amber-50` | `text-amber-600` | `border-amber-200` |
| Error | `bg-red-50` | `text-red-600` | `border-red-200` |
| Info | `bg-blue-50` | `text-blue-600` | `border-blue-200` |
| Neutral | `bg-gray-50` | `text-gray-600` | `border-gray-200` |

## Spacing (4px Grid)

```
gap-1 (4px)   gap-2 (8px)   gap-3 (12px)  gap-4 (16px)  gap-6 (24px)  gap-8 (32px)
p-4 (compact) p-6 (cards)   p-8 (hero)    p-12 (empty)
```

❌ Vermijd: `gap-5`, `p-5`, `space-y-5`

## Border Radius

| Element | Class |
|---------|-------|
| Cards | `rounded-xl` |
| Buttons | `rounded-xl` |
| Inputs | `rounded-lg` |
| Badges | `rounded-md` |
| Avatars | `rounded-full` |
| Modals | `rounded-2xl` |

## Typography

```tsx
<h1 className="text-3xl font-semibold">Page Title</h1>
<h2 className="text-xl font-semibold">Section</h2>
<h3 className="text-lg font-semibold">Card Title</h3>
<p className="text-sm">Body text</p>
<span className="text-xs text-muted-foreground">Meta</span>
```

## Components

### SearchBar
```tsx
<SearchBar value={query} onChange={setQuery} placeholder="Search..." />
```

### StatusBadge
```tsx
<StatusBadge variant="success">Ready</StatusBadge>
<StatusBadge variant="warning">Pending</StatusBadge>
```

### Action Buttons
```tsx
<DeleteButton onClick={handleDelete} />
<EditButton onClick={handleEdit} />
<ViewButton isVisible={visible} onClick={toggle} />
```

### StatCard
```tsx
<StatCard title="Total" value={42} icon={Package} variant="success" />
```

### EmptyStateCard
```tsx
<EmptyStateCard
  icon={Search}
  title="No results"
  description="Try different filters"
  action={{ label: "Clear", onClick: clear }}
/>
```

## Transitions

```tsx
// Hover colors
className="transition-colors duration-200"

// All properties
className="transition-all duration-200"

// Modal animations
className="transition-all duration-300"
```

## Grid Patterns

```tsx
// 2 columns
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

// 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// 4 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

## Page Container

```tsx
<div className="max-w-7xl mx-auto px-8 py-6">
  {/* Content */}
</div>
```
