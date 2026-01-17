# 🔄 Systematic Refactoring Approach
**Step-by-Step Guide for Consistency Improvements**

---

## 🎯 Philosophy

**"One pattern at a time, one file at a time"**

Instead of trying to fix everything at once, we tackle inconsistencies systematically:
- ✅ **Focused**: One category of issues per session
- ✅ **Measurable**: Clear before/after metrics
- ✅ **Safe**: Test after each change
- ✅ **Documented**: Track progress and learnings

---

## 📋 Refactoring Sessions (Weekly Plan)

### **SESSION 1: Header Padding Uniformity** (2 hours)
**Goal**: All headers use `px-8 py-6` (or `py-4` compact)

**Steps:**
1. **Find all instances** (15 min)
   ```bash
   # Create list of files with non-standard header padding
   grep -r "sticky top-0" components/ | grep -E "px-6|px-4|py-3|py-5" > header-padding-issues.txt
   ```

2. **Categorize files** (15 min)
   - High priority: Main pages (10 files)
   - Medium priority: Detail views (15 files)
   - Low priority: Settings/admin (5 files)

3. **Fix batch 1: High priority** (60 min)
   For each file:
   ```tsx
   // BEFORE
   <div className="max-w-7xl mx-auto px-6 py-6">
   
   // AFTER
   <div className="max-w-7xl mx-auto px-8 py-6">
   ```
   
4. **Test visually** (20 min)
   - Open each fixed page
   - Check spacing looks correct
   - Verify responsive behavior

5. **Commit & PR** (10 min)
   ```bash
   git add .
   git commit -m "refactor: standardize header padding to px-8 py-6"
   ```

**Deliverable**: 10 high-priority files fixed
**Metric**: Header padding consistency: 60% → 85%

---

### **SESSION 2: Button Icon Patterns** (2 hours)
**Goal**: All button icons use `gap-2` and `h-4 w-4`

**Steps:**
1. **Find button issues** (15 min)
   ```bash
   # Find buttons with mr-2/ml-2 on icons
   grep -r "mr-2\|ml-2" components/ | grep "Icon" > button-spacing-issues.txt
   
   # Find buttons with wrong icon size
   grep -r "h-5 w-5" components/ | grep "Button" > button-icon-size-issues.txt
   ```

2. **Create fix pattern** (10 min)
   ```tsx
   // BEFORE
   <Button>
     <PlusIcon className="h-5 w-5 mr-2" />
     Label
   </Button>
   
   // AFTER
   <Button className="gap-2">
     <PlusIcon className="h-4 w-4" />
     Label
   </Button>
   ```

3. **Fix all instances** (80 min)
   - Use find & replace with care
   - Check each file manually
   - Ensure no regressions

4. **Visual testing** (15 min)
   - Check all buttons render correctly
   - Icon sizes look appropriate
   - Spacing is consistent

**Deliverable**: All buttons follow uniform pattern
**Metric**: Button consistency: 70% → 95%

---

### **SESSION 3: Typography Standardization** (3 hours)
**Goal**: Replace all hardcoded text sizes with TYPOGRAPHY constants

**Steps:**
1. **Audit typography usage** (30 min)
   ```bash
   # Find hardcoded page titles
   grep -r "text-3xl\|text-2xl" components/ | grep -v "TYPOGRAPHY" > title-issues.txt
   
   # Find hardcoded section headers
   grep -r "text-xl font-semibold" components/ > section-issues.txt
   
   # Find hardcoded card titles
   grep -r "text-lg" components/ | grep "CardTitle\|font-semibold" > card-issues.txt
   ```

2. **Create migration template** (15 min)
   ```tsx
   // Import design system
   import { TYPOGRAPHY } from '@/constants/design-system';
   
   // BEFORE
   <h1 className="text-3xl font-semibold mb-1">Title</h1>
   
   // AFTER
   <h1 className={`${TYPOGRAPHY.pageTitle} mb-1`}>Title</h1>
   ```

3. **Fix by category** (120 min)
   - Page titles (30 min)
   - Section headers (30 min)
   - Card titles (30 min)
   - Other text elements (30 min)

4. **Testing** (15 min)
   - Visual check all pages
   - Verify text hierarchy
   - Check responsive behavior

**Deliverable**: All typography from design system
**Metric**: Typography consistency: 65% → 90%

---

### **SESSION 4: Color Consolidation** (2.5 hours)
**Goal**: Zero hardcoded color values

**Steps:**
1. **Find all hardcoded colors** (20 min)
   ```bash
   # Find hex colors
   grep -r "text-\[#\|bg-\[#\|border-\[#" components/ > hardcoded-colors.txt
   
   # Count instances
   wc -l hardcoded-colors.txt  # Baseline metric
   ```

2. **Map colors to design system** (30 min)
   ```typescript
   // Create mapping document
   text-[#1FD1B2] → text-primary
   text-[#1F2937] → text-foreground
   bg-[#5252E3] → bg-blue-600 (add to design system if needed)
   text-[#...] green → text-green-600 (use status colors)
   ```

3. **Replace systematically** (60 min)
   ```tsx
   // BEFORE
   <div className="text-[#1FD1B2] bg-[#1FD1B2]/10">
   
   // AFTER
   <div className="text-primary bg-primary/10">
   ```

4. **Add missing colors to design system** (20 min)
   ```typescript
   // If certain colors are used frequently, add to design system
   COLORS = {
     ...existing,
     accent: {
       electric: '#5252E3',
       peach: '#FF8A80',
     }
   }
   ```

5. **Final verification** (20 min)
   ```bash
   # Should return 0 results
   grep -r "text-\[#\|bg-\[#" components/
   ```

**Deliverable**: No hardcoded colors
**Metric**: Color consistency: 60% → 100%

---

### **SESSION 5: Card Padding Standardization** (2 hours)
**Goal**: All cards use standard padding patterns

**Steps:**
1. **Audit card usage** (20 min)
   ```bash
   # Find custom card padding
   grep -r "p-4\|p-5\|p-7\|p-8" components/ | grep "Card\|card" > card-padding.txt
   ```

2. **Standardize to p-6** (60 min)
   ```tsx
   // BEFORE - various patterns
   <Card className="p-4">...</Card>
   <CardContent className="p-8">...</CardContent>
   <div className="border rounded-xl p-5">...</div>
   
   // AFTER - consistent
   <Card>
     <CardContent className="p-6">...</CardContent>
   </Card>
   ```

3. **Update design system if needed** (15 min)
   ```typescript
   SPACING.card = {
     padding: 'p-6',        // Default
     paddingSmall: 'p-4',   // Compact cards
     paddingLarge: 'p-8',   // Hero cards
   }
   ```

4. **Visual testing** (25 min)
   - Check card spacing looks good
   - Verify responsive behavior
   - Ensure content fits well

**Deliverable**: Consistent card padding
**Metric**: Card consistency: 70% → 95%

---

### **SESSION 6: Modal/Dialog Patterns** (2 hours)
**Goal**: Standardize dialog content spacing

**Steps:**
1. **Find dialog variations** (15 min)
   ```bash
   grep -r "DialogContent\|Dialog>" components/ > dialog-patterns.txt
   ```

2. **Define standard pattern** (15 min)
   ```tsx
   // STANDARD PATTERN
   <Dialog>
     <DialogContent>
       <DialogHeader>
         <DialogTitle>Title</DialogTitle>
         <DialogDescription>Description</DialogDescription>
       </DialogHeader>
       <div className="space-y-4 py-4">
         {/* Content */}
       </div>
       <DialogFooter>
         {/* Actions */}
       </DialogFooter>
     </DialogContent>
   </Dialog>
   ```

3. **Migrate all dialogs** (70 min)
   - Update content spacing
   - Standardize footer
   - Ensure consistent structure

4. **Testing** (20 min)
   - Open all modals
   - Check spacing
   - Verify interactions

**Deliverable**: Consistent modal patterns
**Metric**: Modal consistency: 60% → 90%

---

### **SESSION 7: Layout Pattern Migration** (2.5 hours)
**Goal**: All pages use LAYOUT_PATTERNS

**Steps:**
1. **Audit page wrappers** (20 min)
   ```bash
   grep -r "h-full overflow-auto\|min-h-screen" components/ > page-wrappers.txt
   ```

2. **Replace with pattern** (90 min)
   ```tsx
   import { LAYOUT_PATTERNS } from '@/constants/design-system';
   
   // BEFORE
   <div className="h-full overflow-auto bg-background">
     <div className="max-w-7xl mx-auto px-8 py-8">
   
   // AFTER
   <div className={LAYOUT_PATTERNS.fullPage}>
     <div className={LAYOUT_PATTERNS.centeredContentXl}>
   ```

3. **Update max-width strategy** (20 min)
   ```typescript
   // Document when to use each
   - Standard pages: centeredContentXl (max-w-7xl)
   - Detail views: centeredContentMd (max-w-5xl)
   - Wide layouts: custom (max-w-[1800px])
   ```

4. **Visual verification** (20 min)

**Deliverable**: Consistent page layouts
**Metric**: Layout consistency: 65% → 90%

---

### **SESSION 8: Component Pattern Creation** (3 hours)
**Goal**: Extract reusable patterns into components

**Steps:**
1. **Identify repeated patterns** (30 min)
   - Search patterns (Input + Icon)
   - Filter bars (Select + Buttons)
   - Empty states
   - Loading states

2. **Create pattern components** (120 min)
   
   **A. SearchInput.tsx**
   ```tsx
   interface SearchInputProps {
     placeholder?: string;
     value: string;
     onChange: (value: string) => void;
   }
   
   export function SearchInput({ placeholder, value, onChange }: SearchInputProps) {
     return (
       <div className="relative flex-1">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
         <Input
           placeholder={placeholder}
           value={value}
           onChange={(e) => onChange(e.target.value)}
           className="pl-9"
         />
       </div>
     );
   }
   ```
   
   **B. FilterBar.tsx**
   ```tsx
   export function FilterBar({ children }: { children: React.ReactNode }) {
     return (
       <div className="flex items-center gap-3 mb-6">
         {children}
       </div>
     );
   }
   ```
   
   **C. ViewToggle.tsx**
   ```tsx
   interface ViewToggleProps {
     view: 'grid' | 'list';
     onChange: (view: 'grid' | 'list') => void;
   }
   
   export function ViewToggle({ view, onChange }: ViewToggleProps) {
     return (
       <div className="flex gap-1 p-1 bg-muted rounded-lg">
         <Button
           variant={view === 'grid' ? 'secondary' : 'ghost'}
           size="sm"
           onClick={() => onChange('grid')}
           className="h-8 w-8 p-0"
         >
           <Grid3x3 className="h-4 w-4" />
         </Button>
         <Button
           variant={view === 'list' ? 'secondary' : 'ghost'}
           size="sm"
           onClick={() => onChange('list')}
           className="h-8 w-8 p-0"
         >
           <List className="h-4 w-4" />
         </Button>
       </div>
     );
   }
   ```

3. **Migrate to new components** (30 min)
   - Find all search implementations
   - Replace with SearchInput
   - Find all filter bars
   - Replace with FilterBar + children

**Deliverable**: Reusable pattern components
**Metric**: Code reuse: +40%

---

## 🔄 Iterative Approach

### **Week-by-Week Progress**

| Week | Session | Focus Area | Expected Consistency |
|------|---------|-----------|---------------------|
| 1 | 1-2 | Headers + Buttons | 70% → 85% |
| 2 | 3-4 | Typography + Colors | 85% → 90% |
| 3 | 5-6 | Cards + Modals | 90% → 93% |
| 4 | 7-8 | Layouts + Components | 93% → 95% |

### **Daily Workflow**

**Morning (30 min):**
- Review files to be refactored today
- Read pattern documentation
- Set up test environment

**Work Session (2-3 hours):**
- Follow session steps
- Fix one category at a time
- Test as you go

**Afternoon (30 min):**
- Final visual testing
- Create PR
- Update tracking spreadsheet

---

## 🛠️ Tools & Scripts

### **1. Batch Find & Replace Script**

```bash
#!/bin/bash
# batch-replace.sh - Carefully replace patterns

PATTERN_OLD="px-6 py-6"
PATTERN_NEW="px-8 py-6"
FILE_PATTERN="components/**/*.tsx"

echo "🔍 Finding instances of: $PATTERN_OLD"
grep -r "$PATTERN_OLD" components/ | grep "sticky top-0"

echo "\n⚠️  This will replace all instances. Continue? (y/n)"
read confirmation

if [ "$confirmation" = "y" ]; then
  find components/ -name "*.tsx" -exec sed -i "s/$PATTERN_OLD/$PATTERN_NEW/g" {} \;
  echo "✅ Replacement complete"
else
  echo "❌ Cancelled"
fi
```

### **2. Visual Diff Script**

```bash
#!/bin/bash
# visual-diff.sh - Take screenshots before/after

# Before
npm run dev &
sleep 5
node scripts/take-screenshots.js before/

# Make changes
# ...

# After
node scripts/take-screenshots.js after/

# Compare
open before/ after/
```

### **3. Consistency Checker**

```javascript
// check-consistency.js
const fs = require('fs');
const glob = require('glob');

const issues = {
  spacing: 0,
  typography: 0,
  colors: 0,
  buttons: 0
};

// Check all TSX files
glob('components/**/*.tsx', (err, files) => {
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for spacing issues
    if (content.includes('px-6') && content.includes('sticky top-0')) {
      issues.spacing++;
    }
    
    // Check for hardcoded colors
    if (content.match(/text-\[#|bg-\[#/)) {
      issues.colors++;
    }
    
    // Check for button icon issues
    if (content.match(/mr-2.*Icon|Icon.*mr-2/)) {
      issues.buttons++;
    }
    
    // Check for hardcoded typography
    if (content.match(/text-(xl|2xl|3xl)/) && !content.includes('TYPOGRAPHY')) {
      issues.typography++;
    }
  });
  
  console.log('📊 Consistency Report:');
  console.log(`  Spacing issues: ${issues.spacing}`);
  console.log(`  Typography issues: ${issues.typography}`);
  console.log(`  Color issues: ${issues.colors}`);
  console.log(`  Button issues: ${issues.buttons}`);
  console.log(`  Total: ${Object.values(issues).reduce((a, b) => a + b, 0)}`);
});
```

---

## 📊 Progress Tracking

### **Tracking Spreadsheet**

| File | Category | Issues Found | Fixed | Status | PR | Notes |
|------|----------|--------------|-------|--------|-----|-------|
| PersonasSection.tsx | Spacing, Buttons | 5 | 5 | ✅ Done | #125 | Clean |
| ResearchPlansPage.tsx | Spacing | 3 | 3 | ✅ Done | #126 | Header fixed |
| KnowledgeLibrary.tsx | Buttons, Colors | 8 | 8 | ✅ Done | #127 | Full refactor |
| StrategyHubSection.tsx | Layout | 4 | 2 | 🔄 In Progress | - | Working on it |
| ResearchDashboard.tsx | All | 25 | 0 | 📋 Planned | - | Complex file |

### **Metrics Dashboard**

```
Current Consistency Score: 72%
Goal: 95%

Progress by Category:
Spacing:     ████████░░ 80%
Typography:  ██████░░░░ 60%
Colors:      ████████░░ 80%
Buttons:     █████████░ 90%
Layouts:     ██████░░░░ 60%
Components:  ████░░░░░░ 40%

Files Completed: 12/45
Estimated Completion: 3 weeks
```

---

## ✅ Quality Assurance

### **Before Committing:**

1. **Visual Check**
   - [ ] Page renders correctly
   - [ ] No layout shifts
   - [ ] Responsive works
   - [ ] No console errors

2. **Code Review**
   - [ ] Follows design system
   - [ ] No regressions
   - [ ] Imports correct
   - [ ] TypeScript happy

3. **Testing**
   - [ ] Interactive elements work
   - [ ] No broken functionality
   - [ ] Edge cases handled

---

## 🎯 Success Criteria

**Per Session:**
- ✅ All targeted files updated
- ✅ Visual testing passed
- ✅ PR created and reviewed
- ✅ Metrics improved

**Overall:**
- ✅ Consistency score >95%
- ✅ Zero hardcoded values
- ✅ Design system enforced
- ✅ Pattern components used

---

## 🚀 Next Steps

1. **Choose first session** (recommend: Session 1 - Headers)
2. **Block 2-hour timeslot**
3. **Follow steps exactly**
4. **Track progress**
5. **Repeat next week**

---

**Remember**: Slow and steady wins the race. Better to fix 10 files perfectly than 50 files poorly.

