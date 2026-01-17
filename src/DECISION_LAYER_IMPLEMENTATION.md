# Decision Quality Layer - Implementation Guide

## Overview
The Decision Quality Layer prevents uninformed strategic decisions by showing real-time decision quality status based on research coverage across the entire platform.

## System Components

### 1. Decision Status Types

#### ✅ Safe to Decide (Green)
- **Criteria**: Research coverage ≥ 80% AND top 2 ranked methods completed
- **Meaning**: Sufficient validated research exists for confident strategic decisions
- **Risk**: Minimal - decisions backed by comprehensive research
- **Can Proceed**: ✓ Yes

#### ⚠️ Decision at Risk (Amber)
- **Criteria**: Research coverage 50-79% OR top 2 methods not completed  
- **Meaning**: Partial research coverage - proceed with caution
- **Risk**: Moderate - decisions may lack critical strategic insights
- **Can Proceed**: ✓ Yes (with warning)

#### ✕ Blocked (Red)
- **Criteria**: Research coverage < 50%
- **Meaning**: Insufficient research to make strategic decisions
- **Risk**: High - decisions would be speculative without proper validation
- **Can Proceed**: ✗ No

### 2. Research Method Strategic Ranking

Methods are ranked by strategic value:

1. **Workshop** (Highest Priority)
   - Collaborative strategic alignment
   - Deepest stakeholder insights

2. **1-on-1 Interviews**
   - Detailed qualitative insights
   - Nuanced understanding

3. **Strategic Survey**
   - Quantitative validation
   - Broader perspective

4. **AI Exploration**
   - Rapid hypothesis testing
   - Market intelligence

### 3. UI Components

#### DecisionStatusBadge
**Location**: Cards, lists, navigation
**Purpose**: Quick visual scanning
**Sizes**: sm | md | lg
**Usage**:
```tsx
import { DecisionStatusBadge } from './decision-status/DecisionStatusBadge';
import { calculateDecisionStatus } from '../utils/decision-status-calculator';

const statusInfo = calculateDecisionStatus(asset);
<DecisionStatusBadge status={statusInfo.status} size="md" />
```

#### DecisionStatusPanel
**Location**: Detail pages, dashboards
**Purpose**: Comprehensive status display with actionable guidance
**Variants**: normal | compact
**Usage**:
```tsx
import { DecisionStatusPanel } from './decision-status/DecisionStatusPanel';
import { calculateDecisionStatus } from '../utils/decision-status-calculator';

const statusInfo = calculateDecisionStatus(asset);
<DecisionStatusPanel 
  statusInfo={statusInfo} 
  onStartResearch={() => {/* handle */}}
  compact={false}
/>
```

#### DecisionWarningModal
**Location**: Strategy tools, campaign generator, any decision flow
**Purpose**: Critical intervention before risky actions
**Usage**:
```tsx
import { DecisionWarningModal } from './decision-status/DecisionWarningModal';
import { calculateDecisionStatus } from '../utils/decision-status-calculator';

const [showWarning, setShowWarning] = useState(false);
const statusInfo = calculateDecisionStatus(asset);

// Before critical action:
if (statusInfo.status !== 'safe-to-decide') {
  setShowWarning(true);
  return;
}

<DecisionWarningModal
  isOpen={showWarning}
  onClose={() => setShowWarning(false)}
  onProceed={handleProceedAnyway}
  statusInfo={statusInfo}
  actionName="generate campaign"
  itemName={asset.type}
/>
```

### 4. Integration Points

#### Brand Assets (✓ Implemented)
- Badge on asset cards
- Panel on asset detail page
- Warning modal before strategy tool usage

#### Personas (To Implement)
- Badge on persona cards
- Panel on persona detail page
- Warning modal before targeting decisions

#### Dashboard (To Implement)
- Overall decision quality summary
- Risk breakdown by asset type
- Recommended actions

#### Campaign Generator (To Implement)
- Pre-flight decision quality check
- Warning modal if assets at risk/blocked
- Suggested research improvements

#### Research Hub (To Implement)
- Decision quality metrics
- Progress toward "safe to decide"
- Priority research recommendations

## Microcopy Strategy

### Educational Approach
The layer uses clear, non-technical language to build research literacy:

- **"Safe to Decide"** instead of "Validated"
- **"Decision at Risk"** instead of "Incomplete"
- **"Blocked"** instead of "Invalid"

### Risk Communication
Each status includes:
1. **What it means** - Plain language explanation
2. **Why it matters** - Business risk context
3. **What to do** - Actionable next steps

### Examples:

**Safe to Decide**
- Meaning: "You have sufficient validated research to make confident strategic decisions"
- Risk: "Minimal risk - your decisions are backed by comprehensive research"
- Next Steps: "Proceed with confidence to strategy tools"

**Decision at Risk**
- Meaning: "Complete the highest-ranked research methods for better decision quality"
- Risk: "Moderate risk - decisions may lack depth without additional research"
- Next Steps: "Complete Workshop and 1-on-1 Interviews for safe decision-making"

**Blocked**
- Meaning: "Critical: Complete core research before making strategic decisions"
- Risk: "High risk - decisions would be speculative without proper validation"
- Next Steps: "Start with Workshop (highest strategic value), reach minimum 50% coverage"

## User Journey Impact

### Before Decision Layer
1. User generates campaign with 20% research coverage
2. Campaign lacks strategic depth
3. Poor performance → user blames tool
4. Support ticket: "Why isn't this working?"

### After Decision Layer
1. User attempts to generate campaign with 20% research coverage
2. Warning modal: "Blocked - insufficient research (20%)"
3. Clear explanation of risks + recommended research
4. User completes Workshop + Interviews
5. Coverage reaches 80% → "Safe to Decide"
6. Campaign generation proceeds with validated inputs
7. Strong performance → user trusts tool

## Design Rationale

### Why This Approach?

**1. Prevention Over Cure**
- Stop bad decisions before they happen
- Reduce support burden from poor outcomes
- Build user confidence through guidance

**2. Progressive Disclosure**
- Badge for quick scanning
- Panel for detailed understanding
- Modal for critical interventions

**3. Educational Focus**
- Users learn research best practices
- Decision quality becomes part of workflow
- Self-service improvement path

**4. Balanced Flexibility**
- "Safe to Decide" is encouraged but not enforced
- "Decision at Risk" allows override with warning
- "Blocked" prevents obvious mistakes

**5. Business Alignment**
- Research plans have clear value (unlock safe decisions)
- Quality metrics are visible and actionable
- Platform encourages best practices without being rigid

## Performance Considerations

- Decision status calculated on-demand (not persisted)
- Lightweight calculation (< 1ms per asset)
- No API calls required
- Purely client-side logic

## Future Enhancements

1. **Decision Quality Score** - Aggregate metric across all assets
2. **Quality Trends** - Track improvement over time
3. **Comparative Analytics** - Benchmark against similar brands
4. **Smart Recommendations** - ML-powered research suggestions
5. **Collaboration Notifications** - Alert team when status changes
6. **White Label Customization** - Agencies can adjust thresholds
7. **Export to PDF** - Include decision quality in reports

## Success Metrics

Track these to measure impact:

1. **Decision Quality at Action Time**
   - % of campaign generations with "Safe to Decide" status
   - Average research coverage when proceeding with "Decision at Risk"

2. **User Behavior Changes**
   - Research completion rate before vs after
   - Time between asset creation and strategy tool usage
   - Warning modal interaction patterns

3. **Outcome Quality**
   - Campaign performance by decision status
   - User satisfaction scores
   - Support ticket reduction

4. **Business Impact**
   - Research plan conversion rate
   - User retention
   - Feature adoption rates

---

**Implementation Status**: ✓ Core system implemented
**Next Steps**: Integrate across all decision points
**Owner**: Platform Team
**Last Updated**: December 2024
