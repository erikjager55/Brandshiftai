# 🗺️ Implementation Roadmap
**Praktische Week-voor-Week Implementatie Guide**

---

## 📅 8-Weeks Gedetailleerde Planning

### **WEEK 1: Foundation Cleanup** ⚡
**Focus**: Spacing & Padding Uniformiteit
**Time Investment**: 12 hours (2-3 uur per dag, 5 dagen)

#### **Dag 1: Maandag - Header Padding Audit & Batch 1**
**Time**: 3 hours

**Morning (90 min):**
1. Run consistency checker:
   ```bash
   grep -r "px-6\|px-4\|py-3\|py-5" components/ | grep "sticky top-0" > header-issues.txt
   cat header-issues.txt | wc -l  # Baseline: ~15 files
   ```

2. Categorize files:
   - 🔴 **High Priority** (10 files): Main pages, frequently used
     - ResearchPlansPage.tsx
     - ResearchDashboard.tsx (multiple headers)
     - AssetUnlockDetailView.tsx
     - CanvasWorkshopInProgress.tsx
     - ActivityFeed.tsx
     - ResearchHubWithTargets.tsx
     - ValidationPlanLandingPage.tsx
     - ResearchPlansSectionGamified.tsx
     - TopNavigationBar.tsx
     - PersonaAIExplorationPage.tsx
   
   - 🟠 **Medium Priority** (8 files): Detail views
   - 🟡 **Low Priority** (5 files): Settings, admin

**Afternoon (90 min):**
3. Fix Batch 1 (High Priority - First 5 files):
   ```tsx
   // Pattern to fix:
   // BEFORE: <div className="max-w-7xl mx-auto px-6 py-6">
   // AFTER:  <div className="max-w-7xl mx-auto px-8 py-6">
   ```

4. Visual testing:
   - Open each page
   - Check desktop (1920px)
   - Check tablet (768px)
   - Check mobile (375px)

5. Create PR:
   ```bash
   git checkout -b refactor/header-padding-batch-1
   git add .
   git commit -m "refactor: standardize header padding to px-8 py-6 (batch 1)"
   git push
   ```

**✅ End of Day Deliverable**: 5 files fixed, PR created

---

#### **Dag 2: Dinsdag - Header Padding Batch 2 & 3**
**Time**: 3 hours

**Morning (90 min):**
1. Fix Batch 2 (High Priority - Next 5 files)
2. Visual testing

**Afternoon (90 min):**
3. Fix Batch 3 (Medium Priority - 8 files)
4. Update progress tracker:
   ```json
   {
     "spacingConsistency": 85,  // Was: 70
     "filesFixed": 13
   }
   ```

**✅ End of Day Deliverable**: 13 files total fixed

---

#### **Dag 3: Woensdag - Content Area Padding**
**Time**: 2.5 hours

**Tasks:**
1. Audit content area padding:
   ```bash
   grep -r "px-4\|px-6" components/ | grep -v "sticky top-0" | grep "max-w-" > content-padding.txt
   ```

2. Standardize to `px-8 py-8`:
   ```tsx
   // BEFORE
   <div className="max-w-7xl mx-auto px-6 py-8">
   
   // AFTER
   <div className="max-w-7xl mx-auto px-8 py-8">
   ```

3. Fix ~20 instances

4. Card padding check:
   - Default cards: `p-6`
   - Compact cards: `p-4`
   - Document exceptions

**✅ End of Day Deliverable**: Content padding 90% consistent

---

#### **Dag 4: Donderdag - Modal & Dialog Padding**
**Time**: 2 hours

**Tasks:**
1. Find all dialogs:
   ```bash
   grep -r "DialogContent\|Dialog>" components/ > dialogs.txt
   ```

2. Standardize dialog content:
   ```tsx
   // STANDARD PATTERN
   <DialogContent>
     <DialogHeader>...</DialogHeader>
     <div className="space-y-4 py-4">
       {/* Content */}
     </div>
     <DialogFooter>...</DialogFooter>
   </DialogContent>
   ```

3. Fix ~15 dialog instances

**✅ End of Day Deliverable**: Modal consistency 85%

---

#### **Dag 5: Vrijdag - Testing, Documentation & Week Review**
**Time**: 2 hours

**Morning (60 min):**
1. Full visual regression test:
   - Test all fixed pages
   - Check responsive
   - Verify no layout shifts

2. Create before/after screenshots

**Afternoon (60 min):**
3. Update documentation:
   ```markdown
   ## Spacing Standards (UPDATED)
   
   Headers: px-8 py-6 (or py-4 compact)
   Content: px-8 py-8
   Cards: p-6 (or p-4 compact)
   Modals: py-4 for content
   ```

4. Week 1 Metrics:
   ```
   Spacing Consistency: 70% → 88% ✅
   Files Fixed: 28/45
   PRs Created: 3
   Issues Found: 2 (documented)
   ```

**✅ Week 1 Complete**: Foundation solid, spacing uniform

---

### **WEEK 2: Button & Icon Uniformiteit** 🔘
**Focus**: Consistent button patterns
**Time Investment**: 10 hours

#### **Dag 1: Maandag - Button Icon Audit**
**Time**: 2.5 hours

**Tasks:**
1. Find all button icon issues:
   ```bash
   # Find mr-2/ml-2 on icons
   grep -r "mr-2\|ml-2" components/ | grep -i "icon\|Icon" > button-spacing.txt
   
   # Find wrong icon sizes
   grep -r "h-5 w-5\|h-6 w-6" components/ | grep "Button" > button-icon-size.txt
   
   # Count total
   wc -l button-*.txt
   ```

2. Categorize by file (expect ~40 instances)

3. Create fix template:
   ```tsx
   // BEFORE (multiple patterns)
   <Button size="lg">
     <PlusIcon className="h-5 w-5 mr-2" />
     Create
   </Button>
   
   // AFTER (uniform)
   <Button className="gap-2">
     <PlusIcon className="h-4 w-4" />
     Create
   </Button>
   ```

**✅ Deliverable**: Complete audit, fix template ready

---

#### **Dag 2-3: Di-Wo - Button Icon Fixes (Batch 1 & 2)**
**Time**: 5 hours total (2.5 per day)

**Batch 1 - Primary Action Buttons (Day 2):**
- PersonasSection.tsx
- KnowledgeLibrary.tsx
- BrandAssetsViewSimple.tsx
- ResearchPlansPage.tsx
- ActiveCampaignsPage.tsx
- NewStrategyPage.tsx
- ResearchValidationPage.tsx
- TrendLibrary.tsx
- ProductsServices.tsx
- ResearchHubEnhanced.tsx

**Fix Pattern**:
```tsx
// 1. Remove size="lg"
// 2. Add className="gap-2"
// 3. Change icon: h-5 w-5 → h-4 w-4
// 4. Remove mr-2 from icon
```

**Batch 2 - Secondary Buttons (Day 3):**
- All outline variant buttons
- Icon-only buttons (size="icon")
- Ghost variant buttons

**✅ Deliverable**: 30+ buttons fixed, consistent patterns

---

#### **Dag 4: Donderdag - Dropdown & Menu Items**
**Time**: 2 hours

**Tasks:**
1. Standardize dropdown items:
   ```tsx
   // BEFORE - custom padding
   <DropdownMenuItem className="cursor-pointer py-3">
   
   // AFTER - default spacing
   <DropdownMenuItem>
     <Icon className="h-4 w-4 mr-2" />
     Label
   </DropdownMenuItem>
   ```

2. Fix ~15 dropdown instances

**✅ Deliverable**: Dropdown consistency

---

#### **Dag 5: Vrijdag - Button Documentation & Review**
**Time**: 1.5 hours

**Tasks:**
1. Create `BUTTON_PATTERNS_GUIDE.md`:
   ```markdown
   # Button Patterns Guide
   
   ## Primary Action
   <Button className="gap-2">
     <Icon className="h-4 w-4" />
     Label
   </Button>
   
   ## Secondary Action
   <Button variant="outline" size="sm" className="gap-2">
     <Icon className="h-4 w-4" />
     Label
   </Button>
   
   ## Icon Only
   <Button variant="ghost" size="icon">
     <Icon className="h-4 w-4" />
   </Button>
   ```

2. Week 2 Metrics:
   ```
   Button Consistency: 70% → 95% ✅
   Icons Fixed: 45
   Patterns Documented: Yes
   ```

**✅ Week 2 Complete**: All buttons uniform

---

### **WEEK 3: Typography Standardization** 📝
**Focus**: Use TYPOGRAPHY constants everywhere
**Time Investment**: 12 hours

#### **Dag 1-2: Ma-Di - Page Titles**
**Time**: 5 hours

**Tasks:**
1. Import design system:
   ```tsx
   import { TYPOGRAPHY } from '@/constants/design-system';
   ```

2. Replace page titles:
   ```tsx
   // BEFORE
   <h1 className="text-3xl font-semibold mb-1">Title</h1>
   
   // AFTER
   <h1 className={`${TYPOGRAPHY.pageTitle} mb-1`}>Title</h1>
   ```

3. Files to update (~25 files):
   - All main pages
   - Modal headers
   - Canvas headers

**✅ Deliverable**: Page titles from TYPOGRAPHY

---

#### **Dag 3: Woensdag - Section Headers**
**Time**: 3 hours

**Replace all section headers:**
```tsx
// BEFORE
<h2 className="text-xl font-semibold mb-4">Section</h2>

// AFTER
<h2 className={`${TYPOGRAPHY.sectionTitle} mb-4`}>Section</h2>
```

**✅ Deliverable**: Section consistency

---

#### **Dag 4: Donderdag - Card Titles**
**Time**: 3 hours

**Standardize card titles:**
```tsx
// BEFORE
<CardTitle className="text-lg">Title</CardTitle>

// AFTER
<CardTitle className={TYPOGRAPHY.cardTitle}>Title</CardTitle>
```

**✅ Deliverable**: Card typography uniform

---

#### **Dag 5: Vrijdag - Verification & Docs**
**Time**: 1 hour

**Check:**
```bash
# Should find minimal results
grep -r "text-3xl\|text-2xl\|text-xl" components/ | grep -v "TYPOGRAPHY"
```

**Week 3 Metrics:**
```
Typography Consistency: 65% → 92% ✅
Files Updated: 30
TYPOGRAPHY imports: 30
```

**✅ Week 3 Complete**: Typography via design system

---

### **WEEK 4: Color Consolidation** 🎨
**Focus**: Zero hardcoded colors
**Time Investment**: 10 hours

#### **Dag 1: Maandag - Color Audit**
**Time**: 2 hours

**Find all hardcoded colors:**
```bash
grep -r "text-\[#\|bg-\[#\|border-\[#" components/ > hardcoded-colors.txt
cat hardcoded-colors.txt | wc -l  # Expect 30-40 instances
```

**Create mapping document:**
```
text-[#1FD1B2] → text-primary
text-[#1F2937] → text-foreground  
bg-[#5252E3] → bg-blue-600
border-[#...] → border-*
```

**✅ Deliverable**: Complete color map

---

#### **Dag 2-3: Di-Wo - Color Replacement**
**Time**: 5 hours

**Replace systematically:**
```tsx
// BEFORE
<div className="text-[#1FD1B2] bg-[#1FD1B2]/10">

// AFTER
<div className="text-primary bg-primary/10">
```

**Priority order:**
1. Primary brand colors (highest visibility)
2. Status colors (success, warning, error)
3. Border colors
4. Gradient patterns

**✅ Deliverable**: 30+ color instances fixed

---

#### **Dag 4: Donderdag - Design System Updates**
**Time**: 2 hours

**Add missing colors:**
```typescript
// /constants/design-system.ts
export const COLORS = {
  ...existing,
  
  // Add frequently used colors
  accent: {
    electric: '#5252E3',    // Electric Blue
    peach: '#FF8A80',       // Peach Pink
    orange: '#FF5722',      // Orange Red
    lime: '#CDDC39',        // Lime Sunset
  },
  
  // Gradient patterns
  gradients: {
    primary: 'from-primary to-primary/80',
    purple: 'from-purple-500 to-pink-500',
    blue: 'from-blue-500 to-indigo-600',
    // ...
  }
}
```

**✅ Deliverable**: Design system complete

---

#### **Dag 5: Vrijdag - Verification**
**Time**: 1 hour

**Final check:**
```bash
# Should return 0 results
grep -r "text-\[#\|bg-\[#" components/ | wc -l
```

**Week 4 Metrics:**
```
Color Consistency: 60% → 100% ✅
Hardcoded Colors: 35 → 0
Design System Colors: Complete
```

**✅ Week 4 Complete**: All colors via design system

---

### **WEEK 5-6: Component Patterns** 🧩
**Focus**: Create & migrate to reusable components
**Time Investment**: 18 hours total

#### **Week 5 - Component Creation**

**Dag 1-2: Ma-Di - Create Pattern Components**
**Time**: 6 hours

**Create 5 new components:**

1. `/components/ui/search-input.tsx` (1 hour)
2. `/components/ui/filter-bar.tsx` (30 min)
3. `/components/ui/view-toggle.tsx` (1 hour)
4. `/components/ui/loading-state.tsx` (1 hour)
5. `/components/ui/status-indicator.tsx` (1.5 hours)

Each with:
- TypeScript types
- Documentation
- Usage examples

**Dag 3: Woensdag - Component Testing**
**Time**: 2 hours

- Test each component in isolation
- Check all variants
- Verify TypeScript types

**Dag 4-5: Do-Vr - Initial Migration**
**Time**: 4 hours

**Migrate high-traffic pages:**
- KnowledgeLibrary.tsx → SearchInput, FilterBar
- StrategyHubSection.tsx → ViewToggle
- ResearchHubEnhanced.tsx → SearchInput

**Week 5 Metrics:**
```
Pattern Components Created: 5 ✅
Components Tested: 5 ✅
Initial Migration: 3 pages
```

---

#### **Week 6 - Full Migration**

**Dag 1-3: Ma-Wo - Migrate All Pages**
**Time**: 7 hours

**Replace custom implementations:**
- All search inputs → SearchInput component
- All filter bars → FilterBar component
- All view toggles → ViewToggle component
- All loading states → LoadingState component

**Dag 4: Donderdag - EmptyState Enforcement**
**Time**: 2 hours

**Use existing EmptyState everywhere:**
- Find all custom empty states
- Replace with EmptyState component
- Remove duplicate code

**Dag 5: Vrijdag - Documentation**
**Time**: 2 hours

**Create `COMPONENT_PATTERNS_GUIDE.md`:**
```markdown
# Component Patterns Guide

## When to Use What

### SearchInput
Use for: Any search functionality
Example: KnowledgeLibrary, StrategyHub

### FilterBar
Use for: Collections of filters
Contains: SearchInput + Select + Buttons

### ViewToggle
Use for: Grid/List view switching
Example: StrategyHub, KnowledgeLibrary
```

**Week 6 Metrics:**
```
Component Migration: 100% ✅
Code Reuse: +42%
Duplicate Code: -38%
```

**✅ Week 5-6 Complete**: Reusable components everywhere

---

### **WEEK 7: Layout Standardization** 📐
**Focus**: Uniform page structure
**Time Investment**: 10 hours

#### **Dag 1-2: Ma-Di - Page Wrapper Migration**
**Time**: 5 hours

**Replace all page wrappers:**
```tsx
import { LAYOUT_PATTERNS } from '@/constants/design-system';

// BEFORE
<div className="h-full overflow-auto bg-background">

// AFTER
<div className={LAYOUT_PATTERNS.fullPage}>
```

**Files to update: ~35**

---

#### **Dag 3: Woensdag - Max-Width Strategy**
**Time**: 2 hours

**Standardize content max-widths:**
```tsx
// Standard pages
<div className={LAYOUT_PATTERNS.centeredContentXl}> {/* max-w-7xl */}

// Detail views
<div className={LAYOUT_PATTERNS.centeredContentMd}> {/* max-w-5xl */}

// Wide layouts (Strategy Hub only)
<div className="max-w-[1800px] mx-auto px-8 py-8">
```

**Document rules in design system**

---

#### **Dag 4: Donderdag - Grid Patterns**
**Time**: 2 hours

**Use SPACING.grid patterns:**
```tsx
// BEFORE
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

// AFTER
<div className={SPACING.grid.cols3}>
```

---

#### **Dag 5: Vrijdag - Verification**
**Time**: 1 hour

**Week 7 Metrics:**
```
Layout Consistency: 65% → 92% ✅
LAYOUT_PATTERNS Usage: 95%
Max-Width Standards: Documented
```

**✅ Week 7 Complete**: Uniform layouts

---

### **WEEK 8: Enforcement & Documentation** 🛡️
**Focus**: Prevent future regression
**Time Investment**: 12 hours

#### **Dag 1: Maandag - Documentation Sprint**
**Time**: 3 hours

**Create comprehensive docs:**

1. `DESIGN_SYSTEM_USAGE_GUIDE.md` (1.5 hours)
2. Update `COMPONENT_PATTERNS_GUIDE.md` (30 min)
3. Create `CODE_REVIEW_CHECKLIST.md` (1 hour)

---

#### **Dag 2: Dinsdag - Automation Scripts**
**Time**: 3 hours

**Create scripts:**

1. `/scripts/check-consistency.js` - Automated checks
2. `/scripts/progress-tracker.js` - Metrics tracking
3. Update `package.json`:
   ```json
   {
     "scripts": {
       "check:consistency": "node scripts/check-consistency.js",
       "track:progress": "node scripts/progress-tracker.js"
     }
   }
   ```

---

#### **Dag 3: Woensdag - VS Code Snippets**
**Time**: 2 hours

**Create `.vscode/snippets/design-system.code-snippets`:**
```json
{
  "Page Header": {
    "prefix": "dsheader",
    "body": [
      "<div className=\"sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10\">",
      "  <div className=\"max-w-7xl mx-auto px-8 py-6\">",
      "    <div className=\"flex items-center justify-between\">",
      "      $0",
      "    </div>",
      "  </div>",
      "</div>"
    ]
  },
  "Primary Button": {
    "prefix": "dsbtn",
    "body": [
      "<Button className=\"gap-2\">",
      "  <$1 className=\"h-4 w-4\" />",
      "  $2",
      "</Button>"
    ]
  },
  "Search Input": {
    "prefix": "dssearch",
    "body": [
      "<SearchInput",
      "  placeholder=\"$1\"",
      "  value={$2}",
      "  onChange={$3}",
      "/>"
    ]
  }
}
```

---

#### **Dag 4: Donderdag - Team Training**
**Time**: 2 hours

**Workshop topics:**
1. Design system overview (30 min)
2. Pattern components demo (30 min)
3. VS Code snippets tutorial (30 min)
4. Q&A (30 min)

---

#### **Dag 5: Vrijdag - Final Verification & Celebration**
**Time**: 2 hours

**Final metrics check:**
```bash
npm run check:consistency
npm run track:progress
```

**Expected results:**
```
📊 Final Consistency Report

Spacing Consistency:     95% ✅
Typography Consistency:  92% ✅
Color Consistency:      100% ✅
Button Consistency:      95% ✅
Component Consistency:   88% ✅
Layout Consistency:      92% ✅

Overall Consistency:     94% ✅

Total Issues: <5 (acceptable)
Files Refactored: 45/45
PRs Merged: 18
Lines Improved: 2,500+
```

**✅ WEEK 8 COMPLETE - MISSION ACCOMPLISHED!** 🎉

---

## 📊 Progress Tracking Template

### **Daily Standup Template**
```markdown
## Daily Progress - [Date]

**Yesterday:**
- Fixed [X] files
- Created [Y] components
- Merged [Z] PRs

**Today:**
- Plan: [Tasks]
- Focus: [Category]
- Goal: [Metric]

**Blockers:**
- [Any issues]

**Metrics:**
- Consistency: X%
- Files done: Y/45
```

---

### **Weekly Review Template**
```markdown
## Week [N] Review

**Completed:**
- ✅ [Tasks done]

**Metrics:**
- Category consistency: X% → Y%
- Files fixed: N
- PRs created: N
- Issues found: N

**Learnings:**
- [What worked well]
- [What to improve]

**Next week:**
- [Focus areas]
```

---

## 🎯 Success Checklist

### **Overall Project Success Criteria**

**Code Quality:**
- [ ] Spacing consistency >95%
- [ ] Typography consistency >90%
- [ ] Color consistency 100%
- [ ] Button consistency >95%
- [ ] Layout consistency >90%
- [ ] Component patterns >85%

**Documentation:**
- [ ] DESIGN_SYSTEM_USAGE_GUIDE.md complete
- [ ] COMPONENT_PATTERNS_GUIDE.md complete
- [ ] CODE_REVIEW_CHECKLIST.md created
- [ ] VS Code snippets configured
- [ ] Inline documentation in design-system.ts

**Automation:**
- [ ] check-consistency.js working
- [ ] progress-tracker.js implemented
- [ ] npm scripts configured
- [ ] Pre-commit hooks (optional)

**Team:**
- [ ] Team trained on design system
- [ ] Code review process updated
- [ ] Pattern components understood
- [ ] Snippets in use

**Maintenance:**
- [ ] Weekly consistency checks scheduled
- [ ] Monthly design system review planned
- [ ] Feedback loop established

---

## 🎬 Ready to Start?

### **Checklist Before Starting Week 1:**

- [ ] Read all strategy documents
- [ ] Block calendar (2-3 hours per day, 8 weeks)
- [ ] Setup development environment
- [ ] Install dependencies
- [ ] Create feature branch
- [ ] Clone progress tracking template
- [ ] Schedule team kickoff meeting
- [ ] Get stakeholder buy-in
- [ ] Prepare before/after tracking

### **Let's Go!** 🚀

Start with **Week 1, Dag 1** and follow the plan systematically.

Remember: **One pattern at a time, one file at a time.**

Good luck! You've got this! 💪
