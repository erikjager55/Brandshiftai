# ⚡ Design System Quick Reference
**Instant lookup voor developers - Print this out!**

---

## 📏 Spacing Standards

### **Headers**
```tsx
// ✅ Standard Header
<div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
  <div className="max-w-7xl mx-auto px-8 py-6">
    {/* Header content */}
  </div>
</div>

// ✅ Compact Header
<div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
  <div className="max-w-7xl mx-auto px-8 py-4">
    {/* Header content */}
  </div>
</div>

// ❌ DON'T USE
px-6, px-4, py-3, py-5  // Non-standard values
```

### **Content Areas**
```tsx
// ✅ Standard Content
<div className="max-w-7xl mx-auto px-8 py-8">
  {/* Page content */}
</div>

// ✅ Detail View
<div className="max-w-5xl mx-auto px-8 py-8">
  {/* Narrower content */}
</div>

// ✅ Wide Layout (Strategy Hub only)
<div className="max-w-[1800px] mx-auto px-8 py-8">
  {/* Wide content */}
</div>
```

### **Cards**
```tsx
// ✅ Standard Card
<Card>
  <CardContent className="p-6">
    {/* Card content */}
  </CardContent>
</Card>

// ✅ Compact Card
<Card>
  <CardContent className="p-4">
    {/* Compact content */}
  </CardContent>
</Card>

// ❌ DON'T USE
p-3, p-5, p-7, p-8  // Non-standard values
```

### **Modals**
```tsx
// ✅ Standard Modal
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <div className="space-y-4 py-4">
      {/* Modal content */}
    </div>
    <DialogFooter>
      {/* Actions */}
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## 📝 Typography Standards

### **Import First**
```tsx
import { TYPOGRAPHY } from '@/constants/design-system';
```

### **Usage**
```tsx
// ✅ Page Title
<h1 className={`${TYPOGRAPHY.pageTitle} mb-1`}>Main Title</h1>
// Result: text-3xl font-semibold

// ✅ Compact Page Title
<h1 className={TYPOGRAPHY.pageTitleCompact}>Title</h1>
// Result: text-2xl font-semibold

// ✅ Section Header
<h2 className={`${TYPOGRAPHY.sectionTitle} mb-4`}>Section</h2>
// Result: text-xl font-semibold

// ✅ Card Title
<CardTitle className={TYPOGRAPHY.cardTitle}>Card</CardTitle>
// Result: text-lg font-semibold

// ❌ DON'T USE
<h1 className="text-3xl font-semibold">  // Hardcoded
```

### **Quick Reference Table**
| Element | Use | Result |
|---------|-----|--------|
| Page Title | `TYPOGRAPHY.pageTitle` | `text-3xl font-semibold` |
| Compact Title | `TYPOGRAPHY.pageTitleCompact` | `text-2xl font-semibold` |
| Section Header | `TYPOGRAPHY.sectionTitle` | `text-xl font-semibold` |
| Card Title | `TYPOGRAPHY.cardTitle` | `text-lg font-semibold` |
| Body Text | `TYPOGRAPHY.body` | `text-base` |
| Small Text | `TYPOGRAPHY.bodySmall` | `text-sm` |
| Caption | `TYPOGRAPHY.caption` | `text-xs text-muted-foreground` |

---

## 🔘 Button Patterns

### **Primary Action Button**
```tsx
// ✅ CORRECT
<Button className="gap-2">
  <PlusIcon className="h-4 w-4" />
  Create
</Button>

// ❌ WRONG
<Button size="lg">
  <PlusIcon className="h-5 w-5 mr-2" />
  Create
</Button>
```

### **Secondary Action Button**
```tsx
// ✅ CORRECT
<Button variant="outline" size="sm" className="gap-2">
  <EditIcon className="h-4 w-4" />
  Edit
</Button>
```

### **Icon Only Button**
```tsx
// ✅ CORRECT
<Button variant="ghost" size="icon">
  <TrashIcon className="h-4 w-4" />
</Button>
```

### **Button Checklist**
- [ ] Icon size: `h-4 w-4` (not h-5 w-5)
- [ ] Spacing: `gap-2` on Button (not mr-2 on icon)
- [ ] Size: Default (not size="lg" in headers)
- [ ] Variant: default, outline, or ghost

---

## 🎨 Color Standards

### **Never Use Hardcoded Colors**
```tsx
// ❌ DON'T
text-[#1FD1B2]
bg-[#5252E3]
border-[#1F2937]

// ✅ DO
text-primary
bg-blue-600
border-foreground
```

### **Status Colors**
```tsx
import { COLORS } from '@/constants/design-system';

// Success
<div className={COLORS.status.success.bg}>
  <Icon className={COLORS.status.success.icon} />
  <span className={COLORS.status.success.text}>Success</span>
</div>

// Warning
<div className={COLORS.status.warning.bg}>
  <Icon className={COLORS.status.warning.icon} />
  <span className={COLORS.status.warning.text}>Warning</span>
</div>

// Error
<div className={COLORS.status.error.bg}>
  <Icon className={COLORS.status.error.icon} />
  <span className={COLORS.status.error.text}>Error</span>
</div>
```

### **Common Colors**
| Use Case | Class |
|----------|-------|
| Primary brand | `text-primary` / `bg-primary` |
| Foreground text | `text-foreground` |
| Muted text | `text-muted-foreground` |
| Background | `bg-background` |
| Card background | `bg-card` |
| Border | `border-border` |

---

## 🧩 Pattern Components

### **SearchInput**
```tsx
import { SearchInput } from '@/components/ui/search-input';

<SearchInput
  placeholder="Search resources..."
  value={searchTerm}
  onChange={setSearchTerm}
/>
```

### **FilterBar**
```tsx
import { FilterBar } from '@/components/ui/filter-bar';

<FilterBar>
  <SearchInput value={search} onChange={setSearch} />
  <Select>...</Select>
  <ViewToggle view={view} onChange={setView} />
</FilterBar>
```

### **ViewToggle**
```tsx
import { ViewToggle } from '@/components/ui/view-toggle';

<ViewToggle
  view={viewMode}
  onChange={setViewMode}
/>
```

### **EmptyState**
```tsx
import { EmptyState } from '@/components/EmptyState';

<EmptyState
  icon={<Inbox className="h-12 w-12" />}
  title="No items found"
  description="Try adjusting your filters"
/>
```

### **LoadingState**
```tsx
import { LoadingState } from '@/components/ui/loading-state';

{isLoading && <LoadingState />}
```

---

## 📐 Layout Patterns

### **Import**
```tsx
import { LAYOUT_PATTERNS } from '@/constants/design-system';
```

### **Full Page Layout**
```tsx
// ✅ Standard Page
<div className={LAYOUT_PATTERNS.fullPage}>
  {/* h-full overflow-auto bg-background */}
  
  <Header />
  
  <div className={LAYOUT_PATTERNS.centeredContentXl}>
    {/* max-w-7xl mx-auto px-8 py-8 */}
    {/* Content */}
  </div>
</div>
```

### **When to Use Which Max-Width**
| Page Type | Pattern | Max Width |
|-----------|---------|-----------|
| Dashboard, main pages | `centeredContentXl` | `max-w-7xl` |
| Detail views, modals | `centeredContentMd` | `max-w-5xl` |
| Strategy Hub | Custom | `max-w-[1800px]` |
| Reading content | `centeredContentSm` | `max-w-3xl` |

---

## 🔍 Common Patterns Cheat Sheet

### **Standard Page Structure**
```tsx
import { 
  LAYOUT_PATTERNS, 
  TYPOGRAPHY,
  HEADER_PATTERNS 
} from '@/constants/design-system';

export function MyPage() {
  return (
    <div className={LAYOUT_PATTERNS.fullPage}>
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className={`${TYPOGRAPHY.pageTitle} mb-1`}>Page Title</h1>
                <p className="text-muted-foreground">Subtitle</p>
              </div>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Action
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={LAYOUT_PATTERNS.centeredContentXl}>
        {/* Your content */}
      </div>
    </div>
  );
}
```

### **Card with Content**
```tsx
<Card>
  <CardHeader>
    <CardTitle className={TYPOGRAPHY.cardTitle}>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent className="p-6">
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

### **Search & Filter Section**
```tsx
<div className="flex items-center gap-3 mb-6">
  {/* Search */}
  <SearchInput
    placeholder="Search..."
    value={search}
    onChange={setSearch}
  />
  
  {/* Filter Select */}
  <Select value={filter} onValueChange={setFilter}>
    <SelectTrigger className="w-[180px]">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All</SelectItem>
      <SelectItem value="active">Active</SelectItem>
    </SelectContent>
  </Select>
  
  {/* View Toggle */}
  <ViewToggle view={view} onChange={setView} />
</div>
```

---

## 🚫 Common Mistakes to Avoid

### **DON'T:**
```tsx
// ❌ Hardcoded spacing
<div className="px-6 py-4">

// ❌ Hardcoded typography
<h1 className="text-3xl font-semibold">

// ❌ Hardcoded colors
<div className="text-[#1FD1B2] bg-[#5252E3]">

// ❌ Button icon spacing
<Button>
  <Icon className="h-5 w-5 mr-2" />
  Label
</Button>

// ❌ Custom button sizes
<Button className="h-9 px-4">

// ❌ Inconsistent card padding
<Card className="p-5">

// ❌ Custom page wrappers
<div className="min-h-screen bg-white">
```

### **DO:**
```tsx
// ✅ Use design system spacing
<div className="max-w-7xl mx-auto px-8 py-6">

// ✅ Use TYPOGRAPHY constants
<h1 className={TYPOGRAPHY.pageTitle}>

// ✅ Use design system colors
<div className="text-primary bg-primary/10">

// ✅ Correct button pattern
<Button className="gap-2">
  <Icon className="h-4 w-4" />
  Label
</Button>

// ✅ Standard button sizes
<Button>  {/* Default size */}

// ✅ Standard card padding
<CardContent className="p-6">

// ✅ Use LAYOUT_PATTERNS
<div className={LAYOUT_PATTERNS.fullPage}>
```

---

## 🔧 VS Code Snippets

### **Setup Instructions**
1. Open VS Code
2. Go to: File → Preferences → User Snippets
3. Select "typescriptreact.json"
4. Paste the snippets from `.vscode/snippets/design-system.code-snippets`

### **Available Snippets**
| Trigger | Creates |
|---------|---------|
| `dsheader` | Standard page header |
| `dsheadercompact` | Compact page header |
| `dsbtn` | Primary button with icon |
| `dsbtnoutline` | Secondary outline button |
| `dssearch` | SearchInput component |
| `dsfilter` | FilterBar with children |
| `dscard` | Standard card layout |
| `dspage` | Full page structure |

### **Example Usage**
1. Type `dsheader` in your JSX
2. Press `Tab`
3. Snippet expands to full header code
4. Tab through placeholders

---

## 📋 Code Review Checklist

**Before submitting PR, verify:**

### **Spacing**
- [ ] Headers use `px-8 py-6` (or `py-4` compact)
- [ ] Content uses `px-8 py-8`
- [ ] Cards use `p-6` (or `p-4` compact)
- [ ] No custom padding values

### **Typography**
- [ ] Imports `TYPOGRAPHY` from design system
- [ ] Uses `TYPOGRAPHY.pageTitle` for page titles
- [ ] Uses `TYPOGRAPHY.sectionTitle` for sections
- [ ] Uses `TYPOGRAPHY.cardTitle` for cards
- [ ] No hardcoded text sizes

### **Colors**
- [ ] No `text-[#...]` or `bg-[#...]`
- [ ] Uses `text-primary`, `bg-primary`, etc.
- [ ] Status colors use `COLORS.status.*`
- [ ] All colors from design system

### **Buttons**
- [ ] Icons are `h-4 w-4`
- [ ] Spacing via `gap-2` (not `mr-2` on icon)
- [ ] No `size="lg"` in headers
- [ ] Uses correct variants (default, outline, ghost)

### **Components**
- [ ] Uses `SearchInput` for search
- [ ] Uses `FilterBar` for filters
- [ ] Uses `ViewToggle` for view switching
- [ ] Uses `EmptyState` for empty states
- [ ] Uses `LoadingState` for loading

### **Layout**
- [ ] Page wrapper uses `LAYOUT_PATTERNS.fullPage`
- [ ] Content uses appropriate `centeredContent*`
- [ ] Imports design system patterns

---

## 🎯 Quick Decision Guide

### **"Which spacing should I use?"**
| Context | Value |
|---------|-------|
| Header (standard) | `px-8 py-6` |
| Header (compact) | `px-8 py-4` |
| Content | `px-8 py-8` |
| Card | `p-6` |
| Modal content | `py-4` |

### **"Which max-width?"**
| Page Type | Use |
|-----------|-----|
| Main pages | `max-w-7xl` |
| Detail views | `max-w-5xl` |
| Wide layouts | `max-w-[1800px]` |

### **"Which typography?"**
| Element | Use |
|---------|-----|
| Page title | `TYPOGRAPHY.pageTitle` |
| Section | `TYPOGRAPHY.sectionTitle` |
| Card | `TYPOGRAPHY.cardTitle` |

### **"Which button size?"**
| Context | Use |
|---------|-----|
| Headers | Default (no size prop) |
| Forms | Default or `size="sm"` |
| Icon only | `size="icon"` |

---

## 📞 Need Help?

1. **Check the design system**: `/constants/design-system.ts`
2. **Read the guides**:
   - `DESIGN_SYSTEM_USAGE_GUIDE.md`
   - `COMPONENT_PATTERNS_GUIDE.md`
3. **Look at examples**: Well-implemented files
4. **Use snippets**: Type `ds` + Tab in VS Code
5. **Ask the team**: Someone has solved this before

---

## 🎯 Remember

**The Golden Rule:**
> If you're writing custom spacing, typography, or colors, you're probably doing it wrong. Check the design system first!

**The Silver Rule:**
> When in doubt, look at a well-implemented page and copy the pattern.

**The Bronze Rule:**
> Use the VS Code snippets - they're there to help!

---

**Print this and keep it at your desk!** 📄

**Last Updated**: 2024-01-15
**Maintained by**: Development Team
