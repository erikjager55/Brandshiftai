# ValidationMethodButton Component

> **Single Source of Truth** voor alle validation method buttons in de applicatie.

## 🚀 Quick Start

```tsx
import { ValidationMethodButton } from './components/validation/ValidationMethodButton';

// Default variant (card)
<ValidationMethodButton
  label="AI Exploration"
  status="available"
  onPrimaryClick={() => {}}
/>

// Compact variant (list)
<ValidationMethodButton
  label="AI Exploration"
  status="available"
  variant="compact"
  onPrimaryClick={() => {}}
/>
```

---

## 📖 Props

```typescript
interface ValidationMethodButtonProps {
  // Required
  label: string;                              // "AI Exploration", "Interviews", etc.
  status: ValidationMethodStatus;             // 'available' | 'running' | 'completed' | 'locked'
  
  // Optional - Core
  description?: string;                       // "5-10 min • Quick insights"
  type?: string;                              // 'ai-exploration' (for button label logic)
  progress?: number;                          // 0-100 (for running state)
  icon?: LucideIcon;                          // Sparkles, Users, etc.
  
  // Optional - Actions
  onPrimaryClick?: () => void;                // Click handler
  primaryLabel?: string;                      // Override default button label
  
  // Optional - Display
  showIcon?: boolean;                         // Default: true
  variant?: 'default' | 'compact';            // Default: 'default'
  animationDelay?: number;                    // Default: 0
  
  // Optional - Metadata
  duration?: string;                          // "5-10 min"
  category?: string;                          // "Quick insights"
  
  // Optional - Locked state
  unlockTier?: 'basic' | 'premium' | 'enterprise';
}
```

---

## 🎨 States

### 1. Available (Dashed Border)
Start staat - nog niet begonnen

```tsx
<ValidationMethodButton
  label="AI Exploration"
  status="available"
  duration="5-10 min"
  category="Quick insights"
  onPrimaryClick={() => startMethod()}
/>
```

**Visual:**
- Border: Dashed gray
- Background: Transparent
- Hover: Primary border + light background
- Button: "Start" + Plus icon

---

### 2. Running (Blue)
In progress - research loopt

```tsx
<ValidationMethodButton
  label="Surveys"
  status="running"
  progress={65}
  onPrimaryClick={() => continueMethod()}
/>
```

**Visual:**
- Border: Solid blue
- Background: Blue tint
- Icon: Spinning clock
- Button: "View Progress"
- Title: "Running: {label} (65%)"

---

### 3. Completed (Green)
Afgerond - resultaten beschikbaar

```tsx
<ValidationMethodButton
  label="Interviews"
  status="completed"
  onPrimaryClick={() => viewResults()}
/>
```

**Visual:**
- Border: Solid green
- Background: Green tint
- Icon: Sparkles (success)
- Button: "View Results" (or "View Analysis" for AI)
- Title: "Validated by {label}"

---

### 4. Locked (Gray)
Vergrendeld - upgrade nodig

```tsx
<ValidationMethodButton
  label="User Testing"
  status="locked"
  unlockTier="premium"
  description="Requires Premium plan"
  onPrimaryClick={() => showUpgradeModal()}
/>
```

**Visual:**
- Border: Solid gray
- Background: Gray tint
- Opacity: 60%
- Icon: Crown
- Badge: "PREMIUM" tier
- Button: "Unlock" with crown icon

---

## 📏 Variants

### Default (Card Layout)

**Best for:**
- Main content areas
- Detail pages
- Dashboard cards
- When space is available

**Characteristics:**
- Padding: `p-3`
- Icon: Large (`h-8 w-8`)
- Text: `text-sm`
- Shows: Full description + metadata
- Height: ~52px

```tsx
<ValidationMethodButton
  label="AI Exploration"
  description="5-10 min • Quick insights"
  status="available"
/>
```

---

### Compact (List Layout)

**Best for:**
- Sidebars
- Quick lists
- Inline displays
- When space is limited

**Characteristics:**
- Padding: `p-2`
- Icon: Smaller (`h-6 w-6`)
- Text: `text-xs`
- Hides: Description + metadata
- Height: ~36px (~30% smaller)

```tsx
<ValidationMethodButton
  label="AI Exploration"
  status="available"
  variant="compact"
/>

// Or use helper:
<ValidationMethodButtonCompact
  label="AI Exploration"
  status="available"
/>
```

---

## 🎯 Common Patterns

### Pattern 1: List of methods

```tsx
const methods = [
  { id: 'ai', label: 'AI Exploration', status: 'completed' },
  { id: 'interviews', label: 'Interviews', status: 'running', progress: 45 },
  { id: 'surveys', label: 'Surveys', status: 'available' },
  { id: 'testing', label: 'User Testing', status: 'locked', tier: 'premium' },
];

<div className="space-y-2">
  {methods.map((method, idx) => (
    <ValidationMethodButton
      key={method.id}
      label={method.label}
      status={method.status}
      progress={method.progress}
      unlockTier={method.tier}
      variant="compact"
      animationDelay={idx * 0.05}
      onPrimaryClick={() => handleMethodClick(method.id)}
    />
  ))}
</div>
```

---

### Pattern 2: With custom icons

```tsx
import { Sparkles, Users, FileText, FlaskConical } from 'lucide-react';

const methodIcons = {
  'ai-exploration': Sparkles,
  'interviews': Users,
  'surveys': FileText,
  'user-testing': FlaskConical,
};

<ValidationMethodButton
  label="AI Exploration"
  status="completed"
  icon={methodIcons['ai-exploration']}
/>
```

---

### Pattern 3: Dynamic button labels

```tsx
// Button label changes based on status
<ValidationMethodButton
  label="Interviews"
  status="completed"
  type="interviews"
  // Auto shows "View Results"
/>

<ValidationMethodButton
  label="AI Exploration"
  status="completed"
  type="ai-exploration"
  // Auto shows "View Analysis" (special case)
/>

// Or override manually
<ValidationMethodButton
  label="Surveys"
  status="running"
  primaryLabel="Continue Survey"
/>
```

---

### Pattern 4: Without actions

```tsx
// For display-only (no click)
<ValidationMethodButton
  label="Interviews"
  status="completed"
  // No onPrimaryClick = no button shown
/>
```

---

## 🎨 Styling

### Colors

All colors follow the design system:

- **Available:** Border (gray), Hover (primary)
- **Running:** Blue (#3B82F6 / blue-500)
- **Completed:** Green (#10B981 / green-500)
- **Locked:** Gray (#6B7280 / gray-500)

### Dark Mode

Fully supported - all colors have dark mode variants:

```tsx
// Automatically adapts:
bg-green-50 dark:bg-green-900/20
border-green-200 dark:border-green-800
text-green-900 dark:text-green-100
```

---

## ♿ Accessibility

Built-in features:

- ✅ Keyboard navigation
- ✅ Focus states
- ✅ ARIA labels
- ✅ Semantic HTML
- ✅ Color contrast (WCAG AA)
- ✅ Reduced motion support

---

## 🔄 Migration from Old Code

**Before (custom implementation):**
```tsx
<div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
  <div className="flex items-center gap-3">
    <div className="h-8 w-8 rounded-full bg-green-100">
      <Sparkles className="h-4 w-4 text-green-600" />
    </div>
    <div>
      <div className="text-sm font-medium text-green-900">
        Validated by Interviews
      </div>
      <div className="text-xs text-green-600">
        Research complete • High confidence
      </div>
    </div>
  </div>
  <button className="h-8 px-3 text-xs text-green-700 hover:bg-green-100">
    View Results
  </button>
</div>
```

**After (ValidationMethodButton):**
```tsx
<ValidationMethodButton
  label="Interviews"
  status="completed"
  onPrimaryClick={() => viewResults()}
/>
```

**Savings:**
- 📉 ~15 lines of code → 5 lines
- ✅ Consistent styling
- ✅ All states handled
- ✅ Dark mode support
- ✅ Accessibility built-in

---

## 📁 Used By

This component is used in:

1. **EntityCard** (`/components/unified/EntityCard.tsx`)
   - Brand asset validation methods

2. **EnhancedPersonaCard** (`/components/personas/EnhancedPersonaCard.tsx`)
   - Persona research methods

3. **ResearchStatusOverview** (`/components/research/ResearchStatusOverview.tsx`)
   - Research method overview lists

4. **DeliverableCard** (`/components/campaign-strategy/DeliverableCard.tsx`)
   - Campaign deliverable status

5. **SocialRelevancyDashboard** (`/components/SocialRelevancyDashboard.tsx`)
   - ESG validation methods

6. **TransformativeGoalsDashboard** (`/components/TransformativeGoalsDashboard.tsx`)
   - Transformative goals validation

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] All 4 states render correctly
- [ ] Click handlers work
- [ ] Progress percentage shows (running state)
- [ ] Tier badges show (locked state)
- [ ] Icons display correctly
- [ ] Dark mode works
- [ ] Hover states work
- [ ] Animations work (or respect reduced motion)
- [ ] Compact variant is smaller
- [ ] Metadata hides in compact variant

---

## 📚 Related

- **Demo:** `/components/ValidationMethodDemo.tsx` - Live examples
- **Types:** `/types/validation.ts` - Type definitions
- **Config:** `/config/validation-methods.ts` - Method configurations
- **Docs:** `/VALIDATION_BUTTON_COMPACT_VARIANT.md` - Full documentation

---

## 🆘 Troubleshooting

**Q: Button doesn't show?**  
A: Add `onPrimaryClick` prop - buttons only show when clickable

**Q: Wrong button label?**  
A: Use `primaryLabel` to override, or set `type` for auto-detection

**Q: Icon not showing?**  
A: Import from `lucide-react` and pass as `icon` prop

**Q: Metadata not showing in compact?**  
A: This is expected - compact hides metadata to save space

**Q: Colors wrong in dark mode?**  
A: Component has built-in dark mode - check your theme setup

---

## ✅ Best Practices

1. **Use validation types from config:**
   ```tsx
   import { VALIDATION_METHODS } from '@/config/validation-methods';
   ```

2. **Standardize method data:**
   ```tsx
   import { standardizeMethodData } from '@/utils/research-method-utils';
   ```

3. **Use type guards:**
   ```tsx
   import { isValidationMethodStatus } from '@/types/validation';
   ```

4. **Batch animations:**
   ```tsx
   methods.map((m, idx) => (
     <ValidationMethodButton
       animationDelay={idx * 0.05}
       // ...
     />
   ))
   ```

5. **Consistent icons:**
   ```tsx
   // Define icon mapping once, reuse everywhere
   const METHOD_ICONS = {
     'ai-exploration': Sparkles,
     'interviews': Users,
     // ...
   };
   ```

---

**Made with 💚 as part of Phase 2 Refactor**  
**Last updated:** 14 januari 2026
