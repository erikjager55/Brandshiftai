# Canvas Workshop Manager - "In Progress" View UX Review

## Overview
Review of the workshop execution interface where users follow step-by-step guidance to complete their canvas workshop session.

---

## Critical Issues

### 1. **Missing Asset Context**
**Issue**: Users can't see which brand assets this workshop session is for
- Workshop shows date/time but no asset mapping
- If user purchased workshop for 3 assets (e.g., Golden Circle, Vision, Mission), they don't know which assets this session will update
- No visual connection between workshop session and affected asset pages

**Impact**: Users lose track of what they're working on, especially with multiple workshops

**Fix**: Add asset badges/chips to each workshop card showing which assets will be updated

---

### 2. **No Empty State**
**Issue**: If no workshops are scheduled, what does this view show?
- Current code assumes `scheduledWorkshops.length > 0`
- No guidance for users who purchased but haven't scheduled yet

**Impact**: Confusing blank screen for new purchasers

**Fix**: Add empty state with call-to-action to schedule first workshop

---

### 3. **Progress Save Feedback Missing**
**Issue**: Multiple "Save Progress" buttons with no feedback
- Lines 1217, 1241 show save buttons but no confirmation
- Users don't know if their work is actually being saved
- Risk of data loss without clear autosave indication

**Impact**: Users anxious about losing work, may copy/paste to external documents

**Fix**: Add toast notifications on save + autosave indicator + last saved timestamp

---

### 4. **Workshop Completion Ambiguity**
**Issue**: "Complete Workshop" button doesn't explain what happens next
- Line 1260 shows completion action but no preview
- Users don't know:
  - Will results auto-populate asset pages?
  - Can they edit after completion?
  - Will they see a summary?
  - Does this trigger facilitator review?

**Impact**: Hesitation to complete, uncertainty about process

**Fix**: Add pre-completion preview showing what will happen + confirmation dialog

---

### 5. **No Session Timer/Duration Tracking**
**Issue**: Individual step durations shown but no overall tracking
- Line 1135 shows per-step duration
- No indication of total time spent or remaining
- No break/pause functionality for long sessions

**Impact**: Users don't know how much time to allocate

**Fix**: Add session timer + estimated time remaining + pause/resume option

---

### 6. **Facilitator Status Unclear**
**Issue**: No indication of whether facilitator is involved
- Purchased workshop may include facilitator
- In Progress view treats all workshops as self-guided
- No facilitator contact, scheduling info, or live session indicator

**Impact**: Users with facilitator-led workshops don't know how to connect

**Fix**: Add facilitator card showing:
- Facilitator name/photo if assigned
- Meeting link if scheduled
- Pre-session checklist
- Contact options

---

### 7. **Multi-Asset Workshop Organization**
**Issue**: If one workshop covers multiple assets, no way to organize results
- Results textarea is flat (lines 1207-1212)
- No structure for "Golden Circle results" vs "Vision results"
- Backburner items not categorized by asset

**Impact**: Messy, unstructured results that are hard to apply later

**Fix**: If workshop has multiple assets, add tabs or sections to organize results by asset

---

### 8. **No Cross-Workshop Awareness**
**Issue**: If multiple workshops are scheduled, no comparison/relationship shown
- User might schedule Workshop 1 for Golden Circle + Vision
- Workshop 2 for Mission + Values
- No way to see overlap or track which assets are covered across sessions

**Impact**: Duplicate work, confusion about coverage

**Fix**: Add workshop comparison view showing asset coverage matrix

---

### 9. **Limited Results Preview**
**Issue**: Can't preview how results will populate final canvases
- Free-form textarea with no structure
- Users writing results don't know if format will work
- No indication of how text maps to canvas fields

**Impact**: Results may not fit canvas format, requiring rework

**Fix**: Add "Preview Canvas" button to see live preview of how results will appear

---

### 10. **No Collaborative Features** (if facilitator-led)
**Issue**: No indication of other participants or facilitator presence
- If this is live facilitated session, no participant list
- No real-time indicators showing facilitator is active
- No way to ask questions or flag issues during session

**Impact**: Feels isolated even in supposedly collaborative session

**Fix**: Add participant presence indicators + chat/comment functionality for facilitator-led workshops

---

### 11. **Workshop Card Duplication**
**Issue**: Workshops appear twice - once in list (line 954), once in selector (line 1032)
- Creates redundancy and confusion
- Takes up vertical space
- Selected workshop shown 3 times on screen

**Impact**: Cluttered interface, wasted space

**Fix**: Consolidate into single workshop switcher in header with session details in sidebar

---

### 12. **No Exit/Pause Strategy**
**Issue**: No clear way to pause mid-session and return later
- Only options are Previous/Next step navigation
- No "Save and Exit" button
- Users may close browser and be unsure if progress is saved

**Impact**: Fear of losing work prevents natural breaks

**Fix**: Add prominent "Save & Exit" button + last saved indicator + session resume notification

---

## Medium Priority Issues

### 13. **Step Navigation Limited**
**Issue**: Can only go Previous/Next, can't jump to specific step
- Progress bar shows all steps but they're not clickable
- If user wants to revisit Step 2 from Step 5, must click Previous 3 times

**Fix**: Make step indicators clickable to jump directly

### 14. **No Results Summary View**
**Issue**: Can't see all results from all steps in one place
- Each step's results are siloed
- No way to view/export full workshop output before completion

**Fix**: Add "View All Results" sidebar or modal

### 15. **Generic Quick Tips**
**Issue**: Quick Tips are static and generic (lines 1273-1291)
- Same tips for all steps
- Could be step-specific guidance

**Fix**: Make tips dynamic based on current step

### 16. **No Resource Links**
**Issue**: Steps reference concepts but no links to learn more
- "Follow the guide" but no external resources
- May need background on frameworks being used

**Fix**: Add "Learn More" links in each step overview

### 17. **Results Character Count Only**
**Issue**: Line 1214 shows character count but no guidance on ideal length
- Users don't know if 50 characters or 500 is appropriate

**Fix**: Add suggested word/character ranges per step

### 18. **No Undo/Revision History**
**Issue**: If user deletes text or overwrites results, can't undo beyond browser undo
- No version history for results

**Fix**: Add basic revision history or versioning

---

## Visual/Polish Issues

### 19. **Workshop Cards Too Large**
- Lines 955-999 create bulky cards for each workshop
- Could be more compact list items

### 20. **Redundant Workshop Selector**
- Gray card (lines 1008-1067) duplicates information from list above

### 21. **Video Takes Full Width**
- Line 1149 shows video at full content width
- Could be optimized with sidebar for notes

### 22. **Textarea Fields Same Height**
- Results and Backburner both 200px (lines 1211, 1235)
- Results likely needs more space

---

## Missing Features

### 23. **No Templates/Examples**
- Users starting with blank textarea
- Could provide example results or templates

### 24. **No AI Assistance**
- Results are manual entry only
- Could offer AI suggestions based on guide

### 25. **No Rich Text Formatting**
- Plain textarea limits formatting
- Results might benefit from bullets, bold, etc.

### 26. **No File Attachments**
- Can't attach photos, sketches, or documents to results
- Workshop outputs might include visual artifacts

### 27. **No Workshop Analytics**
- Can't see time spent per step, completion rates, or patterns

---

## Recommendations Summary

### High Priority
1. ✅ Add asset badges to workshop cards
2. ✅ Create empty state for no scheduled workshops
3. ✅ Add save feedback + autosave indicator
4. ✅ Add workshop completion preview dialog
5. ✅ Add session timer and pause functionality
6. ✅ Show facilitator card if applicable
7. ✅ Organize multi-asset results with tabs/sections
8. ✅ Add "Save & Exit" prominent option

### Medium Priority
9. Make step indicators clickable
10. Add "View All Results" summary
11. Add results preview showing canvas population
12. Add suggested character ranges for results
13. Consolidate duplicate workshop selectors

### Nice to Have
14. Step-specific tips
15. Resource links
16. Templates/examples
17. Rich text formatting
18. Revision history

---

## Key User Flows to Improve

### Starting a Session
**Current**: Click workshop card → see steps
**Better**: Click workshop → See session overview with:
- Which assets being worked on
- Facilitator info (if applicable)
- Time estimate
- Pre-session checklist
- "Begin Workshop" CTA

### During Session
**Current**: Linear step-by-step only
**Better**: 
- Clear progress indicator showing asset context
- Autosave with timestamp
- Pause/resume option
- Jump between steps
- Preview results live

### Completing Session
**Current**: "Complete Workshop" button (unclear outcome)
**Better**:
- "Review Results" before completion
- Preview of canvas updates
- Confirmation dialog explaining next steps
- Option to schedule follow-up or iterate

### Multi-Workshop Management
**Current**: List of workshops with no relationship
**Better**:
- Asset coverage matrix
- Workshop comparison view
- Track which assets are complete across all workshops
