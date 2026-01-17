# Research Approach Selection - Implementation Guide

## Overview

The central **Research Approach Selection** page has been implemented to replace fragmented per-asset purchase flows with a unified, strategic approach-based purchasing experience.

## What Was Built

### 1. Main Component: `/components/ResearchApproachSelection.tsx`

A comprehensive comparison and configuration interface that allows users to:
- Compare three research approaches side-by-side (Brainstorm Session, 1-on-1 Interviews, Online Survey)
- View default asset sets per approach
- Understand time investment, participants needed, evidence depth, and output formats
- Use a decision wizard to get personalized recommendations
- Customize asset selection per approach
- Review scope before purchase with asset manifest preview
- Access research programs (multi-approach bundles)

### 2. Key Features Implemented

#### **Comparison Table**
- Side-by-side comparison of all three approaches
- 8 key dimensions: Default assets, time investment, participants, effort level, evidence depth, output format, best for, starting price
- Clear visual hierarchy with icons and badges

#### **Decision Wizard**
- 3-step guided questionnaire
- Questions: Team size, Timeline, Depth needed
- AI-powered recommendation based on answers
- Displays recommended approach with reasoning

#### **Approach Cards**
- Individual cards for each research approach
- Shows default assets, key benefits, metadata highlights
- Expandable configuration panels for asset customization
- Anti-pattern warnings to prevent misconfiguration

#### **Asset Customization**
- Checkbox-based asset selection
- Visual distinction between included and add-on assets
- Real-time price calculation
- Add-on pricing per asset clearly displayed

#### **Scope Review Modal**
- Pre-purchase confirmation step
- Configuration summary (left column)
- Asset manifest showing before/after states (right column)
- Clear explanation of cross-page impact
- Final CTA: "Start Research (€X)"

#### **Research Programs**
- Three pre-configured bundles: Starter, Professional, Enterprise
- Multi-approach combinations with volume discounts
- Savings calculations (€80-€180 off)
- Badge system for recommendations (Most Popular, Best Value)

### 3. Integration Points

#### **Dashboard Entry Point**
Added prominent CTA card on Dashboard:
- "Start New Research" section with gradient background
- Quick preview of available approaches
- "Compare Research Approaches" button
- Launches the central selection interface

#### **State Management (App.tsx)**
- `showApproachSelection` - Controls visibility of selection page
- `handleApproachPurchase()` - Processes approach purchases
- Updates `sharedSelectedAssets` state for cross-tool visibility
- Integrates with existing interview workflow

## UX Improvements Addressed

### ✅ Issues Resolved

1. **Unified comparison view** - Users can now evaluate all approaches in one place
2. **Asset visibility** - Default assets clearly shown before configuration begins
3. **Decision guidance** - Decision wizard helps users choose right approach
4. **Consequence transparency** - Time, effort, and output clearly communicated upfront
5. **Asset linkage confirmation** - Explicit preview of which assets will be unlocked
6. **Multi-approach support** - Research programs enable bundling with discounts
7. **Consistent terminology** - "Research Approach" used throughout
8. **Scope review** - Pre-purchase confirmation prevents misconfiguration
9. **Effort comparison** - Facilitator requirements and effort levels explicit
10. **Quality indicators** - Evidence depth and validation types clearly stated

### 🎯 Key UX Principles Applied

- **Comparison before commitment** - Users see all options before selecting
- **Progressive disclosure** - Configuration details shown only when relevant
- **Decision support** - Wizard and recommendations reduce cognitive load
- **Transparency** - All costs, time investments, and outcomes visible
- **Confirmation patterns** - Review step prevents purchase regret
- **Visual hierarchy** - Icons, badges, and color coding guide attention

## How to Use

### From Dashboard
1. Click "Compare Research Approaches" button in the "Start New Research" card
2. View comparison table or use "Help Me Choose" wizard
3. Select an approach card
4. Customize assets (optional)
5. Click "Review & Confirm"
6. Review scope and confirm purchase

### Navigation Flow
```
Dashboard → ResearchApproachSelection → Scope Review → Purchase Confirmation → Back to Dashboard
```

### State Flow
```
showApproachSelection: false → true
User selects approach + assets
handleApproachPurchase() called
sharedSelectedAssets updated
showApproachSelection: false
Alert confirmation shown
```

## Data Structure

### Research Approach Object
```typescript
{
  id: string; // 'workshop', 'interviews', 'questionnaire'
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  defaultAssets: string[]; // Array of asset IDs
  pricing: {
    base: number;
    perAsset: number;
    bundleDiscount: number;
  };
  metadata: {
    timePerAsset: number;
    minParticipants: number;
    maxParticipants: number;
    facilitatorRequired: boolean;
    effortLevel: string;
    evidenceDepth: string;
    outputFormat: string;
    validationType: string;
    bestFor: string;
    timeline: string;
    recommended: string[]; // Tags for wizard matching
  };
  benefits: string[];
  antiPattern: string;
}
```

### Research Program Object
```typescript
{
  id: string;
  name: string;
  description: string;
  approaches: string[]; // Array of approach IDs
  totalAssets: number;
  price: number;
  originalPrice?: number;
  savings: number;
  badge: string;
}
```

## Copy & Messaging

Key terminology changes:
- ❌ "Purchase & Start" → ✅ "Start [Approach Name]"
- ❌ "Building blocks" → ✅ "Brand assets"
- ❌ "Research method" → ✅ "Research approach"
- ❌ "Buy package" → ✅ "Start research"

## Pricing Logic

```typescript
// Custom selection
pricePerInterview = basePrice + (selectedAssets.length × pricePerAsset)
totalPrice = pricePerInterview × numberOfInterviews

// Bundle selection
pricePerInterview = bundlePrice (fixed)
totalPrice = bundlePrice × numberOfInterviews
savings = (originalPrice - bundlePrice) × numberOfInterviews
```

## Future Enhancements

### Potential Additions
1. **Real example outputs** - Thumbnails of actual reports/canvases
2. **Video previews** - Short explainer videos per approach
3. **Customer testimonials** - Social proof for each approach
4. **Live availability calendar** - For facilitated workshops
5. **Team invite flow** - For collaborative research
6. **Progress tracking** - Multi-step purchase journey with save/resume
7. **A/B testing hooks** - For recommendation algorithm optimization
8. **Analytics integration** - Track conversion by approach type

### Technical Debt
- Wizard recommendation logic is simplified; could use ML model
- Bundle pricing doesn't dynamically adjust for custom configurations
- No backend persistence; purchases only stored in React state
- Asset manifest doesn't show actual current state from database

## Figma Handoff Notes

### Components to Design
1. **ApproachComparisonTable** - Reusable table with sticky header
2. **ApproachCard** - Card with expand/collapse states
3. **DecisionWizardModal** - 3-step wizard with progress bar
4. **ScopeReviewModal** - Two-column layout with asset manifest
5. **ResearchProgramCard** - Bundle offering card with savings badge

### States to Document
- Approach card: Default, Hover, Selected, Expanded
- Asset checkbox: Unchecked, Checked, Disabled, Conflict
- Review modal: Loading, Loaded, Confirmed, Error
- Wizard: Step 1, Step 2, Step 3, Recommendation

### Responsive Behavior
- Comparison table: Horizontal scroll on mobile, full width on desktop
- Approach cards: Stack vertically on mobile, 3-column grid on desktop
- Review modal: Full screen on mobile, centered dialog on desktop
- Action bar: Fixed bottom on mobile, static on desktop

## Success Metrics

To measure effectiveness:
1. **Conversion rate** - % of users who complete purchase from selection page
2. **Time to decision** - Average time from landing to purchase
3. **Wizard usage** - % of users who use decision wizard
4. **Approach distribution** - Which approaches are most popular
5. **Bundle uptake** - % who choose programs vs individual approaches
6. **Asset customization** - % who customize vs use defaults
7. **Drop-off points** - Where users abandon the flow

## Testing Checklist

- [ ] All three approaches display correctly
- [ ] Decision wizard recommendations work for all combinations
- [ ] Asset selection updates price in real-time
- [ ] Scope review shows correct assets and pricing
- [ ] Purchase confirmation updates app state correctly
- [ ] Back navigation works at all steps
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Dark mode renders properly
- [ ] Anti-pattern warnings show for edge cases
- [ ] Research programs calculate savings correctly

---

**Implementation Status**: ✅ Complete and integrated
**Last Updated**: December 18, 2025
