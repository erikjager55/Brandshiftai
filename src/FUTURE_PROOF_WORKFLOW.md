# 🛡️ Future-Proof Workflow
**Hoe We Consistentie Garanderen Bij Nieuwe Code**

---

## 🎯 Het Probleem

**Situatie**: Na 8 weken hebben we 95%+ consistentie bereikt. Maar:
- ❌ Nieuwe features kunnen oude patronen gebruiken
- ❌ Developers vergeten design system te checken
- ❌ Copy-paste van oude code introduceert inconsistenties
- ❌ Code reviews missen styling issues

**Oplossing**: **Automatische enforcement + Clear workflow**

---

## 🚀 De Complete Workflow (Voor Alle Toekomstige Code)

### **FASE 1: BEFORE YOU CODE** ⚡

#### **1. Check Design System Eerst (2 min)**
```bash
# Altijd beginnen met:
1. Open /constants/design-system.ts
2. Check SPACING, TYPOGRAPHY, COLORS, PATTERNS
3. Zoek naar je use case

# Is je pattern er niet?
→ Add it to design system FIRST
→ Don't create custom solution
```

#### **2. Use Component Generator (1 min)**
```bash
# Voor nieuwe pages/components:
npm run generate:component

# Kies template:
→ Standard Page (with header)
→ Modal/Dialog
→ Card Component
→ Form Page
→ Dashboard Widget

# Generator creates file with:
✅ Correct imports (design system)
✅ Standard structure
✅ Proper spacing
✅ TypeScript types
```

#### **3. Use VS Code Snippets**
```tsx
// Type 'ds' + Tab voor auto-complete:
dsheader     → Standard page header
dsbtn        → Button with icon
dssearch     → SearchInput component
dscard       → Card layout
dspage       → Full page structure
```

---

### **FASE 2: WHILE YOU CODE** 🔨

#### **1. Real-Time Linting (Automatic)**
```bash
# ESLint catches issues WHILE typing:

❌ text-[#1FD1B2]
    ^^^^^^^^^^^ 
    ESLint: No hardcoded colors. Use 'text-primary'

❌ <div className="px-6 py-4">
                   ^^^^^^
    ESLint: Use design system spacing (px-8 py-6)

❌ <Icon className="h-5 w-5 mr-2" />
                          ^^^^^
    ESLint: Use parent gap-2, icon should be h-4 w-4
```

#### **2. TypeScript Auto-Complete**
```tsx
// When you import design system:
import { TYPOGRAPHY } from '@/constants/design-system';

// TypeScript shows you options:
<h1 className={TYPOGRAPHY.
                         ↓
    pageTitle          // ← Auto-complete suggests
    pageTitleCompact
    sectionTitle
    cardTitle
}>
```

#### **3. Quick Reference (At Your Desk)**
```
Print: DESIGN_SYSTEM_QUICK_REFERENCE.md
Keep at desk for instant lookup
```

---

### **FASE 3: BEFORE YOU COMMIT** 🎯

#### **1. Pre-Commit Hook (Automatic)**
```bash
# When you run: git commit

→ Pre-commit hook runs automatically:

Running design system checks...
✓ Checking spacing patterns...
✓ Checking typography...
✓ Checking colors...
✓ Checking button patterns...

Found 2 issues:
  ⚠️  src/NewPage.tsx: Line 45 uses hardcoded text-2xl
  ⚠️  src/NewPage.tsx: Line 67 uses px-6 in header

❌ Commit blocked. Fix issues first.

# Fix issues, then commit succeeds:
✓ All checks passed!
✓ Commit allowed
```

#### **2. Manual Check (Optional)**
```bash
# Before committing, run:
npm run check:consistency -- --staged

# Only checks files you're about to commit
# Faster than full check
```

---

### **FASE 4: CODE REVIEW** 👀

#### **1. Automated PR Checks (GitHub Actions)**
```yaml
# .github/workflows/design-system-check.yml
# Runs automatically on every PR

name: Design System Check
on: [pull_request]
jobs:
  consistency:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run check:consistency
      
    # PR fails if consistency issues found
    # Shows detailed report in PR
```

#### **2. PR Template (Automatic Checklist)**
```markdown
## Design System Compliance Checklist

Auto-checked by CI:
- [x] No hardcoded spacing
- [x] No hardcoded colors
- [x] Typography uses design system
- [x] Button patterns correct
- [x] Uses pattern components

Manual review:
- [ ] Visually tested on desktop
- [ ] Visually tested on mobile
- [ ] No layout shifts
- [ ] Follows design system patterns
```

#### **3. Review Bot Comments**
```
🤖 Design System Bot commented:

⚠️ Potential Issues Found:

File: src/components/NewFeature.tsx
Line 45: Uses text-2xl without TYPOGRAPHY constant
Suggestion: Use TYPOGRAPHY.pageTitleCompact

Line 67: Button icon uses mr-2
Suggestion: Use gap-2 on parent Button

Run `npm run check:consistency` locally for full report.
```

---

### **FASE 5: AFTER MERGE** 📊

#### **1. Weekly Consistency Report (Automated)**
```bash
# Cron job runs every Monday:
npm run check:consistency
npm run track:progress

# Sends report to team:
📊 Weekly Consistency Report

Current Score: 96% (↑1% from last week)
New Issues: 2
Resolved Issues: 5

Top offender: /src/dashboard/NewWidget.tsx
Action: Assign to developer for fix
```

#### **2. Monthly Design System Review**
```bash
# Last Friday of month:
1. Review new patterns added
2. Check if patterns are being used
3. Update documentation
4. Remove unused patterns
5. Add commonly requested patterns
```

---

## 🔧 Tools & Automation Setup

### **Tool 1: Component Generator**

**Create**: `/scripts/generate-component.js`

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const templates = {
  'standard-page': `import { LAYOUT_PATTERNS, TYPOGRAPHY } from '@/constants/design-system';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

interface {{NAME}}Props {
  // Add your props
}

export function {{NAME}}({ }: {{NAME}}Props) {
  return (
    <div className={LAYOUT_PATTERNS.fullPage}>
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                {/* Icon */}
              </div>
              <div>
                <h1 className={\`\${TYPOGRAPHY.pageTitle} mb-1\`}>{{DISPLAY_NAME}}</h1>
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
        {/* Your content here */}
      </div>
    </div>
  );
}`,

  'modal': `import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';

interface {{NAME}}Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function {{NAME}}({ open, onOpenChange }: {{NAME}}Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{DISPLAY_NAME}}</DialogTitle>
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
}`,

  'card': `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { TYPOGRAPHY } from '@/constants/design-system';

interface {{NAME}}Props {
  // Add your props
}

export function {{NAME}}({ }: {{NAME}}Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={TYPOGRAPHY.cardTitle}>{{DISPLAY_NAME}}</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {/* Content */}
      </CardContent>
      <CardFooter>
        {/* Footer */}
      </CardFooter>
    </Card>
  );
}`
};

function generateComponent(name, type) {
  const displayName = name.replace(/([A-Z])/g, ' $1').trim();
  const template = templates[type]
    .replace(/{{NAME}}/g, name)
    .replace(/{{DISPLAY_NAME}}/g, displayName);
  
  const filePath = path.join(process.cwd(), 'components', `${name}.tsx`);
  
  if (fs.existsSync(filePath)) {
    console.log(`❌ File already exists: ${filePath}`);
    process.exit(1);
  }
  
  fs.writeFileSync(filePath, template);
  console.log(`✅ Created: components/${name}.tsx`);
  console.log(`\n📝 Template used: ${type}`);
  console.log(`\n✨ Component follows design system patterns!`);
  console.log(`   - Imports design system`);
  console.log(`   - Uses TYPOGRAPHY constants`);
  console.log(`   - Correct spacing (px-8 py-6)`);
  console.log(`   - Proper button patterns`);
}

// Interactive prompts
rl.question('Component name (PascalCase): ', (name) => {
  console.log('\nChoose template:');
  console.log('  1. Standard Page (with header)');
  console.log('  2. Modal/Dialog');
  console.log('  3. Card Component');
  
  rl.question('\nTemplate (1-3): ', (choice) => {
    const types = ['standard-page', 'modal', 'card'];
    const type = types[parseInt(choice) - 1];
    
    if (!type) {
      console.log('❌ Invalid choice');
      process.exit(1);
    }
    
    generateComponent(name, type);
    rl.close();
  });
});
```

**Usage**:
```bash
npm run generate:component

# Interactive prompts:
Component name: NewDashboard
Template: 1

✅ Created: components/NewDashboard.tsx
✨ Component follows design system patterns!
```

---

### **Tool 2: Pre-Commit Hook**

**Create**: `.husky/pre-commit`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🔍 Running design system checks..."

# Run consistency check on staged files
npm run check:consistency:staged

# Exit code determines if commit is allowed
if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Design system violations found!"
  echo "   Fix issues above or run: git commit --no-verify (not recommended)"
  echo ""
  exit 1
fi

echo "✅ All checks passed!"
```

**Setup**:
```bash
# Install husky
npm install --save-dev husky
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "npm run check:consistency:staged"

# Make executable
chmod +x .husky/pre-commit
```

---

### **Tool 3: Staged Files Checker**

**Create**: `/scripts/check-consistency-staged.js`

```javascript
#!/usr/bin/env node

/**
 * Check only staged files for consistency
 * Used in pre-commit hook
 */

const { execSync } = require('child_process');
const { main } = require('./check-consistency');

// Get staged .tsx files
const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACM | grep .tsx$')
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean);

if (stagedFiles.length === 0) {
  console.log('✓ No TypeScript files staged');
  process.exit(0);
}

console.log(`Checking ${stagedFiles.length} staged file(s)...\n`);

// Override glob pattern to only check staged files
process.env.CHECK_FILES = stagedFiles.join(',');

// Run main consistency check
main();
```

**Add to package.json**:
```json
{
  "scripts": {
    "check:consistency:staged": "node scripts/check-consistency-staged.js"
  }
}
```

---

### **Tool 4: GitHub Actions CI**

**Create**: `.github/workflows/design-system-check.yml`

```yaml
name: Design System Check

on:
  pull_request:
    branches: [ main, develop ]
  push:
    branches: [ main ]

jobs:
  consistency-check:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run consistency check
        run: npm run check:consistency
        continue-on-error: true
        id: consistency
      
      - name: Generate report
        if: always()
        run: |
          npm run track:progress
          cat consistency-report.json > consistency-summary.txt
      
      - name: Comment on PR
        if: github.event_name == 'pull_request' && steps.consistency.outcome == 'failure'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const report = JSON.parse(fs.readFileSync('consistency-report.json', 'utf8'));
            
            let comment = '## 🤖 Design System Check\n\n';
            comment += `**Consistency Score**: ${report.consistencyScore}%\n\n`;
            
            if (report.stats.totalIssues > 0) {
              comment += '### ⚠️ Issues Found\n\n';
              comment += `- Critical: ${report.stats.criticalIssues}\n`;
              comment += `- Warnings: ${report.stats.warningIssues}\n\n`;
              comment += 'Please fix these issues before merging.\n';
              comment += 'Run `npm run check:consistency` locally for details.';
            }
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
      
      - name: Fail if critical issues
        if: steps.consistency.outcome == 'failure'
        run: |
          echo "❌ Critical design system violations found"
          exit 1
      
      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: consistency-report
          path: |
            consistency-report.json
            consistency-history.json
```

---

### **Tool 5: ESLint Custom Rules**

**Create**: `.eslintrc.custom.js`

```javascript
module.exports = {
  rules: {
    // No hardcoded hex colors
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value=/text-\\[#|bg-\\[#|border-\\[#/]',
        message: 'Hardcoded colors not allowed. Use design system colors (text-primary, bg-primary, etc.)',
      },
    ],
    
    // Warn on common spacing mistakes
    'no-restricted-properties': [
      'warn',
      {
        object: 'className',
        property: 'px-6',
        message: 'Use px-8 for headers and content areas',
      },
    ],
  },
  
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      rules: {
        // Custom rules for React components
        'react/no-unknown-property': [
          'error',
          {
            ignore: ['className'],
          },
        ],
      },
    },
  ],
};
```

**Merge with main .eslintrc**:
```json
{
  "extends": [
    "./eslintrc.custom.js"
  ]
}
```

---

## 📋 PR Template (Auto-Checklist)

**Create**: `.github/PULL_REQUEST_TEMPLATE.md`

```markdown
## Description
<!-- Describe your changes -->

## Design System Compliance

### Automated Checks (CI)
- [ ] Consistency check passed
- [ ] No hardcoded colors
- [ ] No hardcoded spacing
- [ ] Typography uses design system
- [ ] Button patterns correct

### Manual Review
- [ ] Visually tested on desktop (1920px)
- [ ] Visually tested on tablet (768px)
- [ ] Visually tested on mobile (375px)
- [ ] No layout shifts
- [ ] Animations work smoothly
- [ ] Responsive design works

### Component Usage
- [ ] Uses existing pattern components (SearchInput, FilterBar, etc.)
- [ ] Imports design system constants where applicable
- [ ] Follows HEADER_PATTERNS for headers
- [ ] Uses LAYOUT_PATTERNS for page structure

### New Patterns
- [ ] If new pattern created, added to design system
- [ ] Pattern documented in design-system.ts
- [ ] Pattern added to DESIGN_SYSTEM_QUICK_REFERENCE.md

## Screenshots
<!-- Add before/after screenshots for UI changes -->

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex logic
- [ ] No console.logs or debugging code
- [ ] Updated documentation (if needed)

## Related Issues
<!-- Link to issue(s) -->

---

**For Reviewers:**
- Check Design System Compliance section
- Verify no hardcoded values (colors, spacing, typography)
- Ensure pattern components are used
- Test responsive design
```

---

## 📚 Living Documentation

### **Auto-Update Design System Docs**

**Create**: `/scripts/update-docs.js`

```javascript
#!/usr/bin/env node

/**
 * Automatically updates documentation when design system changes
 */

const fs = require('fs');
const path = require('path');

// Parse design-system.ts
const designSystemPath = path.join(process.cwd(), 'constants', 'design-system.ts');
const designSystem = fs.readFileSync(designSystemPath, 'utf8');

// Extract patterns
const spacingPattern = /SPACING = {([^}]+)}/;
const typographyPattern = /TYPOGRAPHY = {([^}]+)}/;

// Update quick reference
const quickRefPath = path.join(process.cwd(), 'DESIGN_SYSTEM_QUICK_REFERENCE.md');
let quickRef = fs.readFileSync(quickRefPath, 'utf8');

// Update sections
quickRef = quickRef.replace(
  /<!-- AUTO-GENERATED:SPACING -->[\s\S]*<!-- \/AUTO-GENERATED:SPACING -->/,
  `<!-- AUTO-GENERATED:SPACING -->\n${generateSpacingTable()}\n<!-- /AUTO-GENERATED:SPACING -->`
);

fs.writeFileSync(quickRefPath, quickRef);

console.log('✅ Documentation updated!');

function generateSpacingTable() {
  // Parse and generate table from design system
  // ...
  return '| Context | Value | Use |\n|---------|-------|-----|';
}
```

---

## 🎓 Developer Onboarding Checklist

**Create**: `/ONBOARDING_CHECKLIST.md`

```markdown
# Design System Onboarding Checklist

## Day 1: Setup (30 min)
- [ ] Read START_HERE.md
- [ ] Read DESIGN_SYSTEM_QUICK_REFERENCE.md
- [ ] Print quick reference, keep at desk
- [ ] Install VS Code extensions (ESLint, Prettier)
- [ ] Setup VS Code snippets
- [ ] Run: npm run check:consistency (see current state)

## Day 2: Learning (1 hour)
- [ ] Review /constants/design-system.ts
- [ ] Study SPACING, TYPOGRAPHY, COLORS
- [ ] Look at well-implemented files:
  - [ ] /components/PersonasSection.tsx
  - [ ] /components/KnowledgeLibrary.tsx
- [ ] Try component generator: npm run generate:component

## Day 3: Practice (2 hours)
- [ ] Pick one small task
- [ ] Build using design system patterns
- [ ] Use VS Code snippets (ds + Tab)
- [ ] Run npm run check:consistency before committing
- [ ] Create PR, check CI passes

## Week 1: Mastery
- [ ] Complete 3 tasks using design system
- [ ] Help another developer with patterns
- [ ] Suggest improvement to design system
- [ ] Zero design system violations in PRs

## Resources
- Quick Reference: /DESIGN_SYSTEM_QUICK_REFERENCE.md
- Full Strategy: /EXECUTIVE_CONSISTENCY_STRATEGY.md
- Component Generator: npm run generate:component
- Consistency Check: npm run check:consistency
```

---

## 🔄 Continuous Improvement Loop

### **Monthly Design System Review Meeting**

**Agenda Template**:
```markdown
# Design System Review - [Month Year]

## Metrics (30 min)
- Current consistency score: X%
- New patterns added: Y
- Pattern usage rate: Z%
- Top violations this month
- Comparison to last month

## Pattern Review (20 min)
- Patterns added this month
- Are they being used?
- Should any be deprecated?
- Feedback from developers

## Developer Feedback (20 min)
- What's working well?
- What's confusing?
- What patterns are missing?
- Tool improvements needed?

## Action Items (10 min)
- [ ] Add requested pattern: X
- [ ] Update documentation: Y
- [ ] Fix tool issue: Z
- [ ] Schedule training: Topic

## Next Month Goals
- Target consistency: X%
- New patterns to add: Y
- Documentation improvements: Z
```

---

## 🎯 The New Workflow in Practice

### **Example: Adding a New Dashboard Page**

#### **OLD WAY** (Inconsistent):
```tsx
// ❌ Developer codes from scratch
function NewDashboard() {
  return (
    <div className="h-full bg-white">  {/* Wrong pattern */}
      <div className="px-6 py-4">      {/* Wrong spacing */}
        <h1 className="text-2xl font-bold">  {/* Hardcoded typography */}
          Dashboard
        </h1>
        <button className="bg-blue-500 px-4 py-2">  {/* Wrong button */}
          <PlusIcon className="w-5 h-5 mr-2" />     {/* Wrong icon size */}
          Add
        </button>
      </div>
    </div>
  );
}
// Result: 6 violations, fails pre-commit
```

#### **NEW WAY** (Consistent):
```bash
# Step 1: Generate component (1 min)
npm run generate:component
> NewDashboard
> Template: Standard Page

# Step 2: VS Code snippets for custom parts (2 min)
# Type 'dsbtn' + Tab for buttons
# Type 'dscard' + Tab for cards

# Step 3: Pre-commit check (automatic)
git add .
git commit -m "Add new dashboard"
→ ✅ All checks passed!

# Step 4: CI check (automatic on PR)
→ ✅ Design system compliance: 100%
```

**Result**: 
- ✅ Zero violations
- ✅ Faster development (templates)
- ✅ Automatic checking
- ✅ Consistent with rest of app

---

## 📊 Enforcement Effectiveness

### **Before Future-Proof Workflow**:
```
New Feature Added:
├─ 45 minutes coding
├─ 0 minutes checking design system
├─ PR created
├─ Code review finds 8 violations
├─ 30 minutes fixing violations
├─ PR updated
└─ Total: 75 minutes + back-and-forth

Consistency: Gradually degrades over time
```

### **After Future-Proof Workflow**:
```
New Feature Added:
├─ 5 minutes: Check design system + use generator
├─ 30 minutes coding (faster with snippets)
├─ Pre-commit: Auto-check (passes)
├─ PR created
├─ CI: Auto-check (passes)
├─ Code review: Focus on logic, not style
└─ Total: 35 minutes, first time right

Consistency: Stays at 95%+ forever
```

**Improvement**: 
- ⏱️ 53% faster (75 min → 35 min)
- ✅ Zero style violations
- 🎯 Consistency maintained automatically

---

## 🎉 Success Metrics

**Track These to Ensure It's Working**:

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Pre-commit pass rate | >95% | Git hook logs |
| CI pass rate (first attempt) | >90% | GitHub Actions |
| Design system imports | 100% new files | Code search |
| Pattern component usage | >80% | Component usage stats |
| Time to fix violations | <10 min | PR review time |
| Developer satisfaction | 4.5/5 | Monthly survey |
| Consistency score | 95%+ maintained | Weekly check |

---

## 🚀 Implementation Timeline

### **Week 1: Setup Automation**
- [ ] Install husky + pre-commit hooks
- [ ] Create component generator
- [ ] Setup VS Code snippets
- [ ] Configure ESLint rules

### **Week 2: CI/CD Integration**
- [ ] Setup GitHub Actions
- [ ] Create PR template
- [ ] Configure bot comments
- [ ] Test on sample PR

### **Week 3: Documentation & Training**
- [ ] Create onboarding checklist
- [ ] Update design system docs
- [ ] Record video tutorials
- [ ] Team training session

### **Week 4: Monitor & Iterate**
- [ ] Monitor pre-commit pass rates
- [ ] Collect developer feedback
- [ ] Fix tool issues
- [ ] Celebrate success!

---

## ✅ Final Guarantee

**With this workflow in place:**

✅ **New code CANNOT be inconsistent** (pre-commit blocks it)
✅ **Developers don't need to remember** (tools guide them)
✅ **Code reviews focus on logic** (style is automated)
✅ **Consistency stays at 95%+** (automatic enforcement)
✅ **Never need cleanup again** (prevention > cure)

---

**Ready to make consistency automatic?** 🚀

**Next Steps:**
1. Read this document
2. Implement automation (Week 1-3)
3. Train team (Week 4)
4. Watch consistency maintain itself!

---

**Status**: Ready for implementation
**Timeline**: 4 weeks to full automation
**ROI**: 53% faster development + guaranteed consistency
