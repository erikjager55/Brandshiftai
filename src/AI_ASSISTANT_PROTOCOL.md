# 🤖 AI Assistant Protocol
**Mandatory Rules for AI Assistants Working on This Codebase**

---

## ⚠️ CRITICAL: Read This FIRST Before Any Code Changes

**This document ensures AI assistants (ChatGPT, Claude, Copilot, etc.) maintain the design system consistency that has been carefully established.**

---

## 🎯 Core Principle

> **ALWAYS use the design system. NEVER create custom styling from scratch.**

---

## 📋 Mandatory Pre-Code Checklist

Before generating ANY component code, you MUST:

### ✅ Step 1: Check Design System
```
1. Read: /constants/design-system.ts
2. Identify: SPACING, TYPOGRAPHY, COLORS, PATTERNS
3. Find: The pattern that matches user's request
4. Use: That pattern (don't create custom)
```

### ✅ Step 2: Check Quick Reference
```
1. Read: /DESIGN_SYSTEM_QUICK_REFERENCE.md
2. Find: The relevant section (spacing/typography/buttons/etc.)
3. Copy: The correct pattern
4. Apply: Exactly as documented
```

### ✅ Step 3: Check Existing Components
```
1. Look at: Well-implemented files
   - /components/PersonasSection.tsx
   - /components/KnowledgeLibrary.tsx
   - /components/BrandAssetsViewSimple.tsx
2. Copy: Their patterns
3. Adapt: To new use case
```

---

## 🚫 NEVER Do These Things

### ❌ Hardcoded Spacing
```tsx
// ❌ WRONG - DON'T GENERATE THIS
<div className="px-6 py-4">
<div className="px-4">
<div className="py-3">

// ✅ CORRECT - ALWAYS USE THIS
<div className="max-w-7xl mx-auto px-8 py-6">  // Headers
<div className="max-w-7xl mx-auto px-8 py-8">  // Content
<CardContent className="p-6">                  // Cards
```

### ❌ Hardcoded Typography
```tsx
// ❌ WRONG
<h1 className="text-3xl font-semibold">
<h2 className="text-2xl font-bold">

// ✅ CORRECT
import { TYPOGRAPHY } from '@/constants/design-system';
<h1 className={TYPOGRAPHY.pageTitle}>
<h2 className={TYPOGRAPHY.sectionTitle}>
```

### ❌ Hardcoded Colors
```tsx
// ❌ WRONG
<div className="text-[#1FD1B2]">
<div className="bg-[#5252E3]">
<span className="text-blue-500">

// ✅ CORRECT
<div className="text-primary">
<div className="bg-primary">
<span className="text-blue-600">  // Or use design system color
```

### ❌ Wrong Button Patterns
```tsx
// ❌ WRONG
<Button size="lg">
  <Icon className="h-5 w-5 mr-2" />
  Label
</Button>

// ✅ CORRECT
<Button className="gap-2">
  <Icon className="h-4 w-4" />
  Label
</Button>
```

### ❌ Custom Page Wrappers
```tsx
// ❌ WRONG
<div className="min-h-screen bg-white">
<div className="h-full overflow-y-auto">

// ✅ CORRECT
import { LAYOUT_PATTERNS } from '@/constants/design-system';
<div className={LAYOUT_PATTERNS.fullPage}>
```

---

## ✅ ALWAYS Do These Things

### ✅ Import Design System
```tsx
// ALWAYS include these imports when relevant:
import { 
  SPACING, 
  TYPOGRAPHY, 
  COLORS,
  HEADER_PATTERNS,
  LAYOUT_PATTERNS,
  FILTER_PATTERNS
} from '@/constants/design-system';
```

### ✅ Use Pattern Components
```tsx
// ALWAYS prefer existing pattern components:
import { SearchInput } from '@/components/ui/search-input';
import { FilterBar } from '@/components/ui/filter-bar';
import { ViewToggle } from '@/components/ui/view-toggle';
import { EmptyState } from '@/components/EmptyState';
import { LoadingState } from '@/components/ui/loading-state';

// DON'T create custom implementations
```

### ✅ Follow Standard Page Structure
```tsx
// ALWAYS use this structure for new pages:
export function NewPage() {
  return (
    <div className={LAYOUT_PATTERNS.fullPage}>
      {/* Header - ALWAYS sticky with glassmorphism */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Left: Icon + Title */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className={`${TYPOGRAPHY.pageTitle} mb-1`}>Title</h1>
                <p className="text-muted-foreground">Subtitle</p>
              </div>
            </div>
            
            {/* Right: Primary action (if needed) */}
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Action
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={LAYOUT_PATTERNS.centeredContentXl}>
        {/* Filters (if needed) */}
        <FilterBar>
          <SearchInput value={search} onChange={setSearch} />
          {/* Other filters */}
        </FilterBar>

        {/* Main content */}
      </div>
    </div>
  );
}
```

### ✅ Standard Button Patterns
```tsx
// ALWAYS use these exact patterns:

// Primary action button
<Button className="gap-2">
  <Icon className="h-4 w-4" />
  Label
</Button>

// Secondary button
<Button variant="outline" size="sm" className="gap-2">
  <Icon className="h-4 w-4" />
  Label
</Button>

// Icon-only button
<Button variant="ghost" size="icon">
  <Icon className="h-4 w-4" />
</Button>
```

---

## 📖 Standard Templates to Use

### Template 1: Standard Page with Header
```tsx
import { LAYOUT_PATTERNS, TYPOGRAPHY } from '@/constants/design-system';
import { Button } from './ui/button';
import { Plus, Icon } from 'lucide-react';

export function StandardPage() {
  return (
    <div className={LAYOUT_PATTERNS.fullPage}>
      {/* Sticky Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className={`${TYPOGRAPHY.pageTitle} mb-1`}>Page Title</h1>
                <p className="text-muted-foreground">Description</p>
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
        {/* Content here */}
      </div>
    </div>
  );
}
```

### Template 2: Modal/Dialog
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';

export function StandardModal({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Content */}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="gap-2">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Template 3: Card Component
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { TYPOGRAPHY } from '@/constants/design-system';

export function StandardCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={TYPOGRAPHY.cardTitle}>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {/* Content */}
      </CardContent>
    </Card>
  );
}
```

---

## 🔍 Decision Tree for AI Assistants

### User asks: "Create a new page"
```
1. Use Template 1: Standard Page with Header
2. Import TYPOGRAPHY, LAYOUT_PATTERNS
3. Use px-8 py-6 for header
4. Use TYPOGRAPHY.pageTitle for title
5. Place filters in content area (not header)
```

### User asks: "Add a button"
```
1. Check context: Primary or secondary action?
2. Primary → <Button className="gap-2">
3. Secondary → <Button variant="outline" size="sm" className="gap-2">
4. Icon size → ALWAYS h-4 w-4
5. Spacing → ALWAYS gap-2 on parent, not mr-2 on icon
```

### User asks: "Create a modal"
```
1. Use Template 2: Modal/Dialog
2. Use space-y-4 py-4 for content
3. DialogFooter for actions
4. Cancel button → variant="outline"
5. Confirm button → default variant with gap-2
```

### User asks: "Add search functionality"
```
1. Import SearchInput component
2. Place in FilterBar (not in header)
3. Use existing pattern:
   <FilterBar>
     <SearchInput value={search} onChange={setSearch} />
   </FilterBar>
4. DON'T create custom search input
```

### User asks: "Style this text"
```
1. Check TYPOGRAPHY constants
2. Page title → TYPOGRAPHY.pageTitle
3. Section → TYPOGRAPHY.sectionTitle
4. Card → TYPOGRAPHY.cardTitle
5. Body → TYPOGRAPHY.body or TYPOGRAPHY.bodySmall
6. DON'T use hardcoded text-xl, text-2xl, etc.
```

---

## 🎯 Code Generation Checklist

**Before sending code to user, verify:**

- [ ] Imports design system (`TYPOGRAPHY`, `LAYOUT_PATTERNS`, etc.)
- [ ] Uses pattern components (`SearchInput`, `FilterBar`, etc.)
- [ ] No hardcoded spacing (`px-6`, `py-4`, etc.)
- [ ] No hardcoded typography (`text-2xl`, `font-bold`, etc.)
- [ ] No hardcoded colors (`text-[#...]`, `bg-[#...]`)
- [ ] Button icons are `h-4 w-4` with parent `gap-2`
- [ ] Headers use `px-8 py-6` (or `py-4` compact)
- [ ] Content uses `px-8 py-8`
- [ ] Cards use `p-6`
- [ ] Page wrapper uses `LAYOUT_PATTERNS.fullPage`
- [ ] Follows standard templates above

**If ANY checkbox is unchecked → Fix before sending code!**

---

## 📝 Response Template

**When user asks for new component/page:**

```markdown
I'll create this following the design system patterns:

**Structure:**
- Page wrapper: LAYOUT_PATTERNS.fullPage
- Header: Sticky with px-8 py-6
- Typography: TYPOGRAPHY constants
- Buttons: gap-2 with h-4 w-4 icons
- Components: Using SearchInput, FilterBar, etc.

**Code:**
[Insert code here using templates above]

**Design System Compliance:**
✅ Follows spacing standards (px-8 py-6)
✅ Uses TYPOGRAPHY constants
✅ No hardcoded colors
✅ Button patterns correct
✅ Uses pattern components

This will pass the consistency check (`npm run check:consistency`)!
```

---

## 🚨 If User Requests Non-Standard Pattern

**User**: "Can you make this button bigger with h-6 w-6 icon?"

**Response Template**:
```markdown
I can do that, but it would violate the design system standards.

**Standard pattern**: Buttons use h-4 w-4 icons
**Why**: Consistency across the entire application

**Options:**
1. ✅ Use standard button pattern (h-4 w-4) [RECOMMENDED]
2. ⚠️ Use custom size (h-6 w-6) [Not recommended - will fail consistency check]
3. 🔧 Add new button variant to design system (if this is needed app-wide)

Which would you prefer?
```

**If user insists on custom pattern**:
```markdown
I'll implement the custom pattern, but note:
⚠️ This will fail `npm run check:consistency`
⚠️ This should be fixed before merging
⚠️ Consider adding this to design system if needed app-wide

[Insert code with comment marking the deviation]
```

---

## 🔄 Continuous Learning

**AI Assistant should:**

1. **Learn from existing code**: Study well-implemented files
2. **Reference quick guide**: Always check DESIGN_SYSTEM_QUICK_REFERENCE.md
3. **Follow patterns**: Don't reinvent, reuse existing patterns
4. **Suggest improvements**: If pattern is missing, suggest adding to design system
5. **Explain rationale**: Tell user WHY you're using certain patterns

---

## ✅ Success Criteria

**Your code generation is successful when:**

1. ✅ User can copy-paste code directly
2. ✅ Code passes `npm run check:consistency`
3. ✅ No hardcoded values (spacing, colors, typography)
4. ✅ Uses pattern components where applicable
5. ✅ Follows standard templates
6. ✅ User doesn't need to refactor for consistency

---

## 📚 Required Reading for AI Assistants

**Before generating any code, read these files in order:**

1. **`/constants/design-system.ts`** - The source of truth
2. **`/DESIGN_SYSTEM_QUICK_REFERENCE.md`** - Quick lookup
3. **`/components/PersonasSection.tsx`** - Example of good implementation
4. **`/components/KnowledgeLibrary.tsx`** - Example of good implementation
5. **This file** - Your mandatory protocol

---

## 🎯 Your Role as AI Assistant

**You are NOT just a code generator.**

**You are a DESIGN SYSTEM ENFORCER.**

Your job is to:
- ✅ Generate code that follows the design system
- ✅ Educate the user on why patterns matter
- ✅ Prevent consistency violations before they happen
- ✅ Suggest improvements to design system when patterns are missing
- ✅ Be the guardian of the 95%+ consistency score

---

## 🚀 Quick Start for AI Assistants

**When user starts session:**

1. **Read** this file
2. **Skim** DESIGN_SYSTEM_QUICK_REFERENCE.md
3. **Check** /constants/design-system.ts
4. **Ready** to generate consistent code!

**For every code generation request:**

1. **Identify** the pattern needed (page/modal/button/etc.)
2. **Find** the template (in this file or quick reference)
3. **Adapt** the template to user's needs
4. **Verify** against checklist
5. **Generate** code with confidence!

---

## 📊 Measuring Success

**After each session, the user should be able to:**

- ✅ Run `npm run check:consistency` → 0 violations
- ✅ Copy-paste your code → Works immediately
- ✅ Create PR → CI passes automatically
- ✅ Get code review → No style comments, only logic review

**If any of these fail → You didn't follow the protocol!**

---

## 🎉 Final Message to AI Assistants

**You have ONE job**: Generate code that maintains 95%+ consistency.

**How?**
1. ALWAYS use design system
2. NEVER create custom patterns
3. FOLLOW the templates
4. VERIFY before sending
5. EDUCATE the user

**If you do this, you're helping build a professional, maintainable, enterprise-grade application.**

**If you don't, you're contributing to technical debt that will need cleanup later.**

**Choose wisely. Generate consistently.** 🚀

---

**Status**: MANDATORY for all AI assistants
**Last Updated**: 2024-01-15
**Maintained by**: Development Team

---

## 🔐 Enforcement

**This protocol is MANDATORY, not optional.**

**All AI-generated code MUST:**
- Follow this protocol
- Pass consistency checks
- Use design system patterns
- Match templates provided

**No exceptions unless explicitly approved by user AND documented with rationale.**

---

**Now go generate some beautifully consistent code!** ✨
