# Research: Multi-Dimensional Status Tracking
## Best Practices van Leading Platforms

---

## 1. JIRA / Linear - Issue Tracking

### Pattern: Status × Type Matrix
```
┌──────────────────────────────────────────────────┐
│ Issue: "User Authentication"                     │
│ ┌────────────┬──────────────┬────────────┐      │
│ │ Status:    │ In Progress  │ [Primary]  │      │
│ │ Type:      │ Feature      │            │      │
│ │ Priority:  │ High         │            │      │
│ └────────────┴──────────────┴────────────┘      │
│                                                   │
│ Sub-tasks: (3/5 complete)                        │
│ ├─ ✅ API Design                                 │
│ ├─ ✅ Database Schema                            │
│ ├─ 🔄 Frontend Implementation                    │
│ ├─ ⏸️ Testing                                     │
│ └─ ⏸️ Documentation                               │
└──────────────────────────────────────────────────┘
```

**Key Insight:**
- **Primary status** = overall state
- **Sub-tasks** = granular progress per activity type
- **Rollup logic**: Main status derives from sub-task completion

---

## 2. Notion - Database Properties

### Pattern: Multiple Select + Progress Bar
```
┌──────────────────────────────────────────────────┐
│ Feature: Brand Positioning                       │
│ Status: 🟡 In Development                        │
│ Research Methods: [Workshop] [Interviews] [AI]   │
│                                                   │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│ Workshop      ████████████░░░░░░░░  60%         │
│ Interviews    ████████████████████  100% ✓       │
│ AI Analysis   ███░░░░░░░░░░░░░░░░░  15%         │
└──────────────────────────────────────────────────┘
```

**Key Insight:**
- Each "dimension" (research method) has own progress
- Tags show which methods are active
- Progress bars give granular visibility
- Overall status is separate from method progress

---

## 3. GitHub Projects - Kanban + Labels

### Pattern: Status Column × Multi-Label
```
Not Started     In Progress          Review         Done
┌─────────┐    ┌──────────────┐    ┌────────┐    ┌──────┐
│ Task A  │    │ Task B       │    │ Task C │    │Task D│
│         │    │ 🏷️ research  │    │🏷️ draft│    │ ✅   │
│         │    │ 🏷️ workshop  │    │🏷️ AI    │    │      │
└─────────┘    │ [━━━━░░░] 60%│    └────────┘    └──────┘
               └──────────────┘
```

**Key Insight:**
- Labels indicate "how" (method type)
- Column indicates "where" (workflow stage)
- Progress bars show completion within stage
- Multi-dimensional filtering (by status AND label)

---

## 4. Productboard - Feature Status + Insights

### Pattern: Hierarchical Status with Source Indicators
```
┌──────────────────────────────────────────────────┐
│ Feature: Golden Circle Framework                 │
│ Status: 🟠 Ready for Validation                  │
│                                                   │
│ Research Inputs:                                 │
│ ├─ ✅ Workshop (12 participants) - Jan 15       │
│ ├─ ✅ Interviews (5 completed) - Jan 18         │
│ ├─ 🔄 Survey (45/100 responses) - Ongoing       │
│ └─ ⏸️ AI Analysis - Not started                  │
│                                                   │
│ Generated Artifacts:                             │
│ ├─ ✅ Why Statement (Workshop + AI)             │
│ ├─ ✅ How Statement (Interviews)                │
│ └─ 🟠 What Statement (Needs Review)             │
└──────────────────────────────────────────────────┘
```

**Key Insight:**
- **Research inputs** track data collection
- **Generated artifacts** track deliverables
- Status reflects validation state, not collection state
- Clear attribution: which artifact came from which research

---

## 5. Miro/FigJam - Collaborative Boards

### Pattern: Visual Status Grid
```
         Workshop  Interviews  Survey  AI
       ┌─────────┬──────────┬────────┬──────┐
Vision │   ✅    │    ✅    │   ⏸️   │  ✅  │
       └─────────┴──────────┴────────┴──────┘
Mission│   🔄    │    ⏸️    │   ⏸️   │  ✅  │
       └─────────┴──────────┴────────┴──────┘
Values │   ⏸️    │    ✅    │   🔄   │  ⏸️  │
       └─────────┴──────────┴────────┴──────┘
```

**Key Insight:**
- **Matrix view** = instant overview of coverage
- See gaps at a glance (empty cells)
- See redundancy (multiple methods per asset)
- Facilitates planning: "which method for which asset?"

---

## 6. Airtable - Base with Linked Records

### Pattern: Relational Status Tracking
```
ASSETS Table:
┌───────────┬────────────┬────────────────┐
│ Name      │ Status     │ Research (3)   │
├───────────┼────────────┼────────────────┤
│ Vision    │ Validated  │ → [View]       │
└───────────┴────────────┴────────────────┘
                              ↓
              RESEARCH_SESSIONS Table:
              ┌─────────────┬──────────┬─────────┐
              │ Type        │ Status   │ Date    │
              ├─────────────┼──────────┼─────────┤
              │ Workshop    │ Complete │ Jan 15  │
              │ Interviews  │ Complete │ Jan 20  │
              │ AI Analysis │ Complete │ Jan 22  │
              └─────────────┴──────────┴─────────┘
```

**Key Insight:**
- **Separation of concerns**: Asset status ≠ Research session status
- Asset links to multiple research records
- Click through to see research detail
- Rollup calculations: "3 research methods completed"

---

## 7. Monday.com - Timeline + Status Board

### Pattern: Gantt + Multi-Status Columns
```
Asset         Research Status                  Asset Status
Vision        ██████████████ 100%             ✅ Validated
              [W:✓][I:✓][S:✓][A:✓]
              
Mission       ████████░░░░░░  60%             🔄 In Progress
              [W:🔄][I:✓][S:⏸️][A:✓]
              
Values        ███░░░░░░░░░░░  20%             🔵 Not Started
              [W:⏸️][I:⏸️][S:⏸️][A:🔄]
```

**Key Insight:**
- **Progress bar** = aggregated research completion
- **Method badges** = individual method status at a glance
- **Overall status** = validation/approval state
- Three layers: bar, badges, status

---

## 🎯 SYNTHESIS: Common Patterns

### Pattern 1: **Separation of Concerns**
✅ Research Progress ≠ Asset Status
- Research = "gathering data/insights"
- Asset = "validated and ready to use"

### Pattern 2: **Hierarchical Display**
```
PRIMARY: Asset Status (Bold, Prominent)
    ↓
SECONDARY: Research Methods (Expandable/Inline)
    ↓
TERTIARY: Individual Sessions/Details (Hidden by default)
```

### Pattern 3: **Multi-Dimensional Filtering**
Users should filter by:
- Asset status (validated, needs review, etc.)
- Research method (has workshop, has interviews)
- Completion level (0-25%, 25-50%, etc.)
- Time (last updated, created date)

### Pattern 4: **Progressive Disclosure**
- **Card view**: Show status + method badges
- **Hover**: Show progress bars
- **Click**: Show full research timeline

### Pattern 5: **Visual Language**
```
Status = Color + Icon (large)
Method = Mini badge + icon (small)
Progress = Bar + percentage (medium)
```

---

## 🚀 Application to Brand Assets

### Recommended Pattern: **Hybrid Approach**

```
┌─────────────────────────────────────────────────────┐
│ 🎯 Vision Statement                [🟠 Needs Review]│ ← PRIMARY
│ "To be the leading innovation partner..."           │
│                                                      │
│ Research Coverage: 3/4 methods [━━━━━░░░ 75%]      │ ← SECONDARY
│ ┌──────────┬──────────┬──────────┬──────────┐      │
│ │ 🎨 Work. │ 💬 Inter.│ 📊 Quest.│ 🤖 AI    │      │
│ │ ✅ Done  │ ✅ Done  │ ✅ Done  │ ⏸️ Not   │      │
│ └──────────┴──────────┴──────────┴──────────┘      │
│                                                      │
│ Last updated: Jan 20 • 3 artifacts ready           │ ← METADATA
└─────────────────────────────────────────────────────┘
```

**Interaction:**
- **Click asset** → Navigate to asset detail
- **Click method badge** → Navigate to that research session
- **Hover method badge** → Show mini preview (participants, date)
- **Hover progress bar** → Show "3 of 4 methods completed"

---

## Best Practices Summary

### ✅ DO:
1. **Separate asset status from research progress**
   - Asset status = user-facing state (validated, needs review)
   - Research progress = data collection state (methods used)

2. **Use progressive disclosure**
   - Show status prominently
   - Show method badges inline
   - Show details on hover/click

3. **Provide multiple views**
   - List view: Status + method badges
   - Grid view: Matrix (asset × method)
   - Timeline view: Chronological progress

4. **Make it actionable**
   - Clear CTAs per status
   - Direct navigation to incomplete methods
   - Filtering by status AND method

### ❌ DON'T:
1. **Mix research status with asset status**
   - "In Progress" because research is running ≠ "In Progress" because content needs work

2. **Hide research methods**
   - Users need to see which methods contributed
   - Transparency builds trust in generated content

3. **Flatten the hierarchy**
   - Don't make all info equally prominent
   - Status > Methods > Details

4. **Ignore the "why"**
   - Show why an asset has a certain status
   - Link back to research that informed it
