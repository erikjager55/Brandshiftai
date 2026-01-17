# 🎨 Design System Quick Reference

**Quick lookup voor consistent styling**

---

## 🎯 Most Used Classes

### Cards
```tsx
// Standard card
<div className="rounded-card border-card shadow-card card-spacing">

// Hoverable card
<div className="rounded-card border-card shadow-card card-spacing hover-lift">

// Consistent Card component
<ConsistentCard hover="lift" shadow="md">
```

### Badges
```tsx
// Auto-styled status badge
<StatusBadge status="approved" />
<StatusBadge status="draft" />
<StatusBadge status="in-progress" />

// Method badge
<MethodBadge method="Workshop" />

// Count badge
<CountBadge count={5} label="items" variant="success" />
```

### Icon Containers
```tsx
// Small icon
<div className="icon-container-sm">
  <Icon className="h-4 w-4" />
</div>

// Medium (default)
<div className="icon-container">
  <Icon className="h-5 w-5" />
</div>

// Large
<div className="icon-container-lg">
  <Icon className="h-6 w-6" />
</div>

// Extra large
<div className="icon-container-xl">
  <Icon className="h-8 w-8" />
</div>
```

### Grids
```tsx
// 3 columns (standard)
<div className="grid-cards">

// 4 columns (dense)
<div className="grid-cards-dense">

// 2 columns (wide)
<div className="grid-cards-wide">
```

### Status Colors
```tsx
// Background + text + border
<div className="status-success">Success!</div>
<div className="status-warning">Warning!</div>
<div className="status-error">Error!</div>
<div className="status-info">Info!</div>
<div className="status-neutral">Neutral</div>
```

### Spacing
```tsx
// Section padding
<section className="section-spacing">

// Card padding
<div className="card-spacing">      // p-6 (default)
<div className="card-spacing-sm">   // p-4
<div className="card-spacing-lg">   // p-8

// Container widths
<div className="container-narrow">   // max-w-4xl
<div className="container-standard"> // max-w-6xl
<div className="container-wide">     // max-w-7xl
```

### Headers
```tsx
// Sticky header
<header className="sticky-header">

// Regular header
<header className="border-b border-border bg-background">
```

---

## 🛠️ Helper Functions

```tsx
import {
  getStatusBadgeClass,
  getStatusColorClass,
  getIconContainerClass,
  getResearchMethodColor,
  getQualityScoreColor,
  cn,
} from '@/utils/design-helpers';

// Status badge
className={getStatusBadgeClass('approved')}
// → 'badge-success'

// Status color
className={getStatusColorClass('draft')}
// → 'status-warning'

// Icon container
className={getIconContainerClass('lg')}
// → 'icon-container-lg'

// Combine classes
className={cn(
  'base-class',
  someCondition && 'conditional-class',
  'another-class'
)}
```

---

## 🎨 Component Quick Reference

### ConsistentCard
```tsx
import {
  ConsistentCard,
  ConsistentCardHeader,
  ConsistentCardContent,
  StatCard,
  StatusCard,
  EmptyStateCard,
} from '@/components/ui/consistent-card';

// Basic
<ConsistentCard>
  <ConsistentCardHeader title="Title" description="Description" />
  <ConsistentCardContent>Content</ConsistentCardContent>
</ConsistentCard>

// With hover and shadow
<ConsistentCard hover="lift" shadow="md">

// Stat card
<StatCard
  label="Total Assets"
  value={42}
  icon={<Icon />}
  trend={{ value: 12, isPositive: true }}
/>

// Status card
<StatusCard
  status="success"
  title="Success!"
  description="Everything is working"
/>

// Empty state
<EmptyStateCard
  icon={<Icon />}
  title="No items yet"
  description="Get started by adding your first item"
  action={{ label: 'Add Item', onClick: () => {} }}
/>
```

### StatusBadge
```tsx
import {
  StatusBadge,
  MethodBadge,
  CountBadge,
  ProgressBadge,
  CategoryBadge,
} from '@/components/ui/consistent-badge';

<StatusBadge status="approved" />
<MethodBadge method="Workshop" />
<CountBadge count={5} variant="success" />
<ProgressBadge percentage={75} />
<CategoryBadge category="Foundation" color="blue" />
```

### PageHeader
```tsx
import {
  PageHeader,
  CompactPageHeader,
  SectionHeader,
  StatHeader,
} from '@/components/ui/page-header';

// Full page header
<PageHeader
  title="Page Title"
  description="Description"
  icon={<Icon />}
  badge={<Badge />}
  actions={<Button />}
  backButton={{ label: 'Back', onClick: () => {} }}
  sticky
/>

// Compact
<CompactPageHeader
  title="Section"
  description="Description"
  actions={<Button />}
/>

// Section header
<SectionHeader
  title="Subsection"
  badge={<Badge />}
  divider
/>

// With stats
<StatHeader
  title="Overview"
  stats={[
    { label: 'Total', value: 42 },
    { label: 'Active', value: 12, color: 'text-green-600' },
  ]}
/>
```

---

## 📐 Sizing Scale

### Icon Sizes
```tsx
sm: h-4 w-4    // 16px
md: h-5 w-5    // 20px
lg: h-6 w-6    // 24px
xl: h-8 w-8    // 32px
```

### Spacing
```tsx
xs: gap-2      // 8px
sm: gap-3      // 12px
md: gap-4      // 16px
lg: gap-6      // 24px
xl: gap-8      // 32px
```

### Border Radius
```tsx
sm: rounded-lg       // 0.5rem
md: rounded-xl       // 0.75rem
lg: rounded-2xl      // 1rem
full: rounded-full   // 9999px
```

---

## 🎨 Color Patterns

### Status Colors

**Success** (Green):
```tsx
bg-green-50 dark:bg-green-900/20
text-green-700 dark:text-green-400
border-green-200 dark:border-green-800
```

**Warning** (Yellow):
```tsx
bg-yellow-50 dark:bg-yellow-900/20
text-yellow-700 dark:text-yellow-400
border-yellow-200 dark:border-yellow-800
```

**Error** (Red):
```tsx
bg-red-50 dark:bg-red-900/20
text-red-700 dark:text-red-400
border-red-200 dark:border-red-800
```

**Info** (Blue):
```tsx
bg-blue-50 dark:bg-blue-900/20
text-blue-700 dark:text-blue-400
border-blue-200 dark:border-blue-800
```

**Neutral** (Gray):
```tsx
bg-gray-50 dark:bg-gray-900/20
text-gray-700 dark:text-gray-400
border-gray-200 dark:border-gray-800
```

---

## ⚡ Quick Patterns

### Hoverable Card
```tsx
<div className="rounded-card border-card shadow-card card-spacing hover-lift transition-default">
```

### Status Container
```tsx
<div className={cn('rounded-card p-4', getStatusColorClass(status))}>
```

### Icon + Text
```tsx
<div className="flex items-center gap-3">
  <div className="icon-container-lg">
    <Icon className="h-6 w-6 text-primary" />
  </div>
  <div>
    <h3>Title</h3>
    <p className="text-sm text-muted-foreground">Description</p>
  </div>
</div>
```

### Grid of Cards
```tsx
<div className="grid-cards">
  {items.map(item => (
    <ConsistentCard key={item.id} hover="lift">
      {/* Card content */}
    </ConsistentCard>
  ))}
</div>
```

### Sticky Header with Content
```tsx
<div className="sticky-header">
  <div className="container-standard section-spacing">
    <PageHeader title="Title" />
  </div>
</div>
<div className="container-standard section-spacing">
  {/* Content */}
</div>
```

---

## 🔄 Common Replacements

### Replace This:
```tsx
// ❌ Inconsistent
<div className="p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg">
  <div className="flex items-center space-x-2">
    <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
      <Icon />
    </div>
    <h3 className="text-lg font-semibold">Title</h3>
  </div>
</div>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
  Approved
</span>
```

### With This:
```tsx
// ✅ Consistent
<ConsistentCard hover="lift" shadow="md">
  <ConsistentCardHeader 
    title="Title"
    icon={<Icon className="h-5 w-5" />}
  />
</ConsistentCard>

<StatusBadge status="approved" />
```

---

## 📋 Checklist

When styling components:

- [ ] Use `ConsistentCard` instead of raw `Card`
- [ ] Use `StatusBadge` for status indicators
- [ ] Use `.icon-container-*` for icon wrappers
- [ ] Use `.grid-cards` for card grids
- [ ] Use helper functions from `design-helpers.ts`
- [ ] Use consistent spacing (`.section-spacing`, `.card-spacing`)
- [ ] Use consistent shadows (`.shadow-card`)
- [ ] Use consistent hover effects (`.hover-lift`)
- [ ] Use consistent border radius (`.rounded-card`)
- [ ] Test dark mode appearance
- [ ] Check responsive behavior

---

## 🎯 Common Use Cases

### Dashboard Stat Card
```tsx
<StatCard
  label="Total Assets"
  value={42}
  icon={<Target className="h-4 w-4" />}
  trend={{ value: 12, isPositive: true }}
  description="Up from last month"
/>
```

### Research Method Badge
```tsx
<MethodBadge method="Workshop" />
<MethodBadge method="Interview" />
<MethodBadge method="Survey" />
```

### Empty State
```tsx
<EmptyStateCard
  icon={<Package className="h-8 w-8" />}
  title="No products yet"
  description="Start by adding your first product to the catalog"
  action={{
    label: 'Add Product',
    onClick: handleAddProduct,
  }}
/>
```

### Page Layout
```tsx
<div className="min-h-screen bg-background">
  <PageHeader
    title="Products"
    description="Manage your product catalog"
    icon={<Package />}
    actions={<Button>Add Product</Button>}
    sticky
  />
  
  <div className="container-standard section-spacing">
    <div className="grid-cards">
      {products.map(product => (
        <ConsistentCard key={product.id} hover="lift">
          {/* Product card */}
        </ConsistentCard>
      ))}
    </div>
  </div>
</div>
```

---

**Quick Tip**: Import helpers and components at the top of your file:

```tsx
import { cn, getStatusBadgeClass } from '@/utils/design-helpers';
import { ConsistentCard, StatusBadge, PageHeader } from '@/components/ui';
```

🎨 **Design System: Making consistency easy!**
