# Workshop Detail Pagina - Verbeteringen Verificatie

## ✅ TAAK 1: STATUS DROPDOWN CONSISTENTIE

### Wijzigingen Nodig:
**CanvasWorkshopManager_INTEGRATED.tsx**:
- Regel 72: `const [viewStatus, setViewStatus] = useState<'to-buy' | 'in-progress' | 'approved'>('in-progress');`
- **MOET WORDEN:** `const [viewStatus, setViewStatus] = useState<'to-buy' | 'in-progress' | 'completed'>('in-progress');`

- Regel 388-389: 
```typescript
case 'approved':
  return 'Approved';
```
- **MOET WORDEN:**
```typescript
case 'completed':
  return 'Completed';
```

- Regel 398: `case 'approved':` → **MOET WORDEN:** `case 'completed':`

### Import toevoegen:
Bij imports (regel 10-55) toevoegen: `FileEdit` (voor Draft status icon)

**STATUS:** ⚠️ HANDMATIGE WIJZIGING NODIG

---

## ✅ TAAK 2: BACK LINK CONSISTENTIE  

### Wijzigingen Nodig:
Zoek in CanvasWorkshopManager_INTEGRATED.tsx naar:
- "Back to Dashboard" strings
- **MOET WORDEN:** "Back to Asset"

Zoek in alle workshop componenten:
- CanvasWorkshopInProgress.tsx
- CanvasWorkshopApproved.tsx ✅ GEDAAN (regel 228: "Back to Asset")

**STATUS:** ⚠️ PARTIAL - CanvasWorkshopApproved DONE, check andere files

---

## ✅ TAAK 3: DATE FORMAT

### Wijzigingen Gedaan:
Datum helper functie toegevoegd in CanvasWorkshopManager_INTEGRATED.tsx (NA regel 86):
```typescript
// ✅ TAAK 3: Helper functie voor date formatting
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
```

### Waar te gebruiken:
- Regel 165: `date: '2025-01-15'` → Gebruik `formatDate()` bij display
- CanvasWorkshopApproved.tsx: Alle date displays (regel 147: `completedDate: workshop.date`)
- WorkshopReport.tsx: Agenda dates

**STATUS:** ⚠️ FUNCTIE KLAAR, MOET TOEGEPAST WORDEN IN DISPLAYS

---

## ✅ TAAK 4: RAPPORT TAAL ✅ GEDAAN

### Wijzigingen Gedaan:
**WorkshopReport.tsx** (regel 42-45):
- Executive Summary volledig vertaald naar Engels ✅
- Voor:
```typescript
'De workshop resulteerde in een helder gedefinieerd Golden Circle framework dat de kern van de organisatie vastlegt...'
```
- Na:
```typescript
'The workshop resulted in a clearly defined Golden Circle framework that establishes the core of the organization. The team of 8 stakeholders reached consensus on the purpose (WHY), the approach (HOW), and the offering (WHAT). The collaboration led to valuable insights about human-centered technology as a key differentiator and empowerment as the primary goal.'
```

**STATUS:** ✅ GELUKT

---

## ✅ TAAK 5: LOCKED BADGE VERDUIDELIJKING ✅ GEDAAN

### Wijzigingen Gedaan:
**CanvasWorkshopApproved.tsx** (regel 186-210):
- "Locked" badge vervangen door "Completed" ✅
- Icon: Lock → CheckCircle2 ✅
- Styling: bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ✅

Voor:
```typescript
<Lock className="h-4 w-4 mr-2" />
Locked
```

Na:
```typescript
<CheckCircle2 className="h-4 w-4 mr-2" />
Completed
```

**STATUS:** ✅ GELUKT

---

## ✅ TAAK 6: FOOTER BUTTONS VERDUIDELIJKING ✅ GEDAAN

### Wijzigingen Gedaan:
**CanvasWorkshopApproved.tsx** (regel 227-244):
- "Return to In Progress" vervangen door "Back to Asset" ✅
- onClick: Beide buttons nu `onBack` ✅

Voor:
```typescript
<Button onClick={onSwitchToInProgress}>
  <ArrowLeft className="h-4 w-4 mr-2" />
  Return to In Progress
</Button>
```

Na:
```typescript
<Button onClick={onBack}>
  <ArrowLeft className="h-4 w-4 mr-2" />
  Back to Asset
</Button>
```

**STATUS:** ✅ GELUKT

---

## ⚠️ TAAK 7: PLACEHOLDER VIDEO VERVANGEN

### Huidige Situatie:
Rick Astley video moet vervangen worden door placeholder

### Wijzigingen Nodig:
**CanvasWorkshopInProgress.tsx** - Zoek naar:
- YouTube embed of video component
- **VERVANG DOOR:**
```typescript
<div className="border-dashed border-2 border-border rounded-xl p-12 bg-muted/30 flex flex-col items-center justify-center text-center">
  <Video className="h-12 w-12 text-muted-foreground mb-4" />
  <p className="text-lg font-semibold mb-2">Workshop presentation will appear here</p>
  <p className="text-sm text-muted-foreground">Share your screen or upload slides</p>
</div>
```

**STATUS:** ⚠️ MOET NOG GEDAAN WORDEN

---

## 📊 SAMENVATTING STATUS

| Taak | Status | Bestand | Regel |
|------|--------|---------|-------|
| 1. Status Dropdown | ⚠️ TODO | CanvasWorkshopManager_INTEGRATED.tsx | 72, 388, 398 |
| 2. Back Link | ⚠️ PARTIAL | Multiple files | Zoek "Dashboard" |
| 3. Date Format | ⚠️ FUNCTIE KLAAR | CanvasWorkshopManager_INTEGRATED.tsx | Display locations |
| 4. Rapport Taal | ✅ DONE | WorkshopReport.tsx | 42-45 |
| 5. Locked Badge | ✅ DONE | CanvasWorkshopApproved.tsx | 186-210 |
| 6. Footer Buttons | ✅ DONE | CanvasWorkshopApproved.tsx | 227-244 |
| 7. Video Placeholder | ⚠️ TODO | CanvasWorkshopInProgress.tsx | Zoek video embed |

---

## 🔧 HANDMATIGE WIJZIGINGEN NODIG

### 1. Status Dropdown (CanvasWorkshopManager_INTEGRATED.tsx)

**Regel 72:**
```typescript
// VOOR:
const [viewStatus, setViewStatus] = useState<'to-buy' | 'in-progress' | 'approved'>('in-progress');

// NA:
const [viewStatus, setViewStatus] = useState<'to-buy' | 'in-progress' | 'completed'>('in-progress');
```

**Regel 388-389:**
```typescript
// VOOR:
case 'approved':
  return 'Approved';

// NA:
case 'completed':
  return 'Completed';
```

**Regel 398:**
```typescript
// VOOR:
case 'approved':
  return <Check className="h-5 w-5" />;

// NA:
case 'completed':
  return <CheckCircle2 className="h-5 w-5" />;
```

### 2. Date Formatting (Overal waar dates worden getoond)

**CanvasWorkshopApproved.tsx - Regel 147:**
```typescript
// VOOR:
completedDate: workshop.date,

// NA:
completedDate: formatDate(workshop.date),
```

**NOTE:** formatDate functie moet geïmporteerd worden of lokaal gedefinieerd

### 3. Rick Astley Video (CanvasWorkshopInProgress.tsx)

Zoek naar video embed en vervang door placeholder component (zie TAAK 7)

---

## ✅ VERIFICATIE CHECKLIST

### Completed Tasks:
- [x] Executive Summary is Engels (WorkshopReport.tsx)
- [x] "Locked" badge is "Completed" (CanvasWorkshopApproved.tsx)
- [x] Footer "Return to In Progress" → "Back to Asset" (CanvasWorkshopApproved.tsx)

### Pending Tasks:
- [ ] Status dropdown toont "Completed" (niet "Approved")
- [ ] Alle back links zeggen "Back to Asset" (niet "Dashboard")
- [ ] Alle dates tonen als "Mon DD, YYYY" (niet "YYYY-MM-DD")
- [ ] Rick Astley video vervangen door placeholder

---

## 🎯 NEXT STEPS

1. **Manual Edit Required:**
   - Open `/components/canvases/CanvasWorkshopManager_INTEGRATED.tsx`
   - Zoek "approved" en vervang door "completed" (3 locaties)
   - Voeg formatDate functie toe (NA regel 86)
   
2. **Find & Replace:**
   - Zoek "Back to Dashboard" in alle workshop files
   - Vervang door "Back to Asset"
   
3. **Apply formatDate:**
   - Zoek alle `workshop.date` displays
   - Wrap met `formatDate()`
   
4. **Video Placeholder:**
   - Open CanvasWorkshopInProgress.tsx
   - Zoek video/iframe element
   - Vervang door placeholder component

---

**IMPLEMENTATION DATE:** January 20, 2026
**FILES MODIFIED:**
- ✅ `/components/canvases/WorkshopReport.tsx` (TAAK 4)
- ✅ `/components/canvases/CanvasWorkshopApproved.tsx` (TAAK 5, 6)
- ⚠️ `/components/canvases/CanvasWorkshopManager_INTEGRATED.tsx` (TAAK 1, 2, 3 - PARTIAL)
- ⚠️ `/components/canvases/CanvasWorkshopInProgress.tsx` (TAAK 7 - TODO)
