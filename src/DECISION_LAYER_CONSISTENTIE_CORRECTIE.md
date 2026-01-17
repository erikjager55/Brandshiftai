# ✅ Decision Layer - Consistentie & Logica Correctie

## 🎯 Doel Correctie
Alle beslisfeedback in het scherm moet **logisch, niet-tegenstrijdig en onmiddellijk begrijpelijk** zijn.

**Kernprobleem:**
- "Sarah: status = draft, 50% coverage" ← TEGENSTRIJDIG
- "Complete" badge (groen) ≠ "Safe to Decide"
- Formulier 100% ingevuld ≠ Decision safe

**Oplossing:**
- **Formulierstatus** en **decision status** strikt gescheiden
- Consistente microcopy: ALLEEN percentage OF status label
- Geen verwarrende combinaties meer

---

## 📝 Wijzigingen Samenvatting

### **1. Microcopy in Decision Header - GECORRIGEERD**

#### **Probleem (VOOR):**
```typescript
affectedAssets: [
  { name: "Core Values", coverage: 50, status: "draft" }
]

Display: "Core Values: status = draft, 50% coverage"
         ^^^^^^^^^^^^^^^^^^^^^^  ^^^^^^^^^^^
         Formulier status       Research status
         (tegenstrijdig!)
```

**Waarom tegenstrijdig?**
- "draft" = formulier niet klaar (werkstatus)
- "50%" = research coverage (besliskwaliteit)
- Samen = verwarrend (is het nu klaar of niet?)

#### **Oplossing (NA):**
```typescript
affectedAssets: [
  { name: "Core Values", coverage: 50 }
  // GEEN status field meer!
]

Display: "Core Values: 50% research coverage"
         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         Alleen research status (consistent!)
```

**Microcopy regel:**
- ✅ `"<naam>: <percentage>% research coverage"`
- ✅ `"<naam>: research status: insufficient/partial/validated"`
- ❌ NOOIT beide tegelijk

---

### **2. Formulierstatus vs Decision Status - GESCHEIDEN**

#### **Probleem (VOOR):**

**Campaign Details sectie:**
```tsx
<Badge className="bg-green-600">
  <CheckCircle /> Complete
</Badge>
<p>100%</p>
```

**Implicatie:**
- Groen = "alles oké"
- 100% = "perfect"
- Complete = "klaar om te gebruiken"
- **Maar:** formulier kan compleet zijn terwijl decision BLOCKED is!

**Voorbeeld scenario:**
1. User vult alle velden in → Formulier: **100% Complete** (groen)
2. User selecteert Core Values (25% coverage) → Decision: **DO NOT DECIDE** (rood)
3. **Tegenstrijdigheid:** Formulier zegt "Complete", Decision zegt "Do Not Decide"

#### **Oplossing (NA):**

**Campaign Details sectie:**
```tsx
<Badge className="bg-blue-600">
  <CheckCircle /> Formulier Compleet
</Badge>
<p>Formulier: 100%</p>
```

**Duidelijk onderscheid:**
- **Blauw** (niet groen) = neutraal, geen implicatie over decision
- **"Formulier Compleet"** (niet "Complete") = expliciet over formulier, niet decision
- **"Formulier: 100%"** (niet "100%") = duidelijke scope

**Campaign Details heeft NU 2 indicatoren:**
1. **Formulier progress** (blauw, rechts): "Formulier Compleet" / "3/4 Velden"
2. **Decision indicator** (groen/oranje/rood, bij titel): Section Decision status

**Motivatie:**
- Formulier kan 100% zijn EN decision blocked
- Gebruiker moet BEIDE begrijpen
- Geen verwarring meer tussen "ingevuld" en "veilig"

---

### **3. Erf-logica Afdwingen - GEÏMPLEMENTEERD**

#### **Logica:**

**Brand Assets sectie erft status van gekoppelde items:**

```typescript
calculateSectionDecision('brand-assets', ...) {
  const allItems = [
    ...selectedBrandAssets,  // Brand Purpose, Core Values, etc
    ...selectedPersonas      // Sarah, Tech Millennial, etc
  ];
  
  // Bereken status per item
  const statuses = allItems.map(calculateDecisionStatus);
  
  // ERF ZWAARSTE STATUS:
  if (ANY item is 'blocked')      → section = 'blocked'
  else if (ANY item is 'at-risk') → section = 'risk'
  else                            → section = 'safe'
}
```

**Voorbeeld:**

**Gekoppeld:**
- Brand Purpose: 85% → Safe
- Core Values: 45% → **Blocked**
- Sarah: 65% → At Risk

**Resultaat:**
- Brand Assets sectie: **🔴 Niet Veilig** (erft van Core Values)
- Causes: `["Core Values: 45% research coverage"]`
- Required: `["Breng alle items naar minimaal 50% research coverage"]`

**Ook campaign-details sectie controleert gekoppelde data:**
```typescript
if (formulierCompleet && geenDataGekoppeld) {
  return { 
    status: 'risk',
    causes: ['Geen merkdata gekoppeld aan campagne'],
    requiredActions: ['Koppel brand assets of personas']
  };
}
```

**Motivatie:**
- Formulier kan 100% compleet zijn
- Maar zonder merkdata = decision at risk
- Logische cascade: bad data → bad sections → bad campaign

---

### **4. Cognitieve Ruis Verwijderen - UITGEVOERD**

#### **Verwarrende teksten VERWIJDERD/HERFORMULEERD:**

**VOOR → NA:**

1. **"Complete" (groen)**
   - Was: Impliceerde "alles oké"
   - Nu: **"Formulier Compleet"** (blauw, neutraal)

2. **"100%" (zonder context)**
   - Was: Onhelder (formulier? decision? research?)
   - Nu: **"Formulier: 100%"** (expliciete scope)

3. **"Configuration is 75% complete"**
   - Was: Impliceerde "bijna klaar om te beslissen"
   - Nu: **"Formulier is 75% ingevuld"** (alleen over formulier)

4. **"Configuration Progress"**
   - Was: Vaag (wat voor progress?)
   - Nu: **"Formulier Voortgang"** (expliciet)

5. **"status = draft, 50% coverage"**
   - Was: Tegenstrijdig (draft vs 50%)
   - Nu: **"50% research coverage"** (consistent)

6. **Progress bar bij "Generate" button**
   - Was: "Configuration Progress" (vaag)
   - Nu: **"Formulier Voortgang"** (helder)

**Motivatie:**
- Elke tekst moet ondubbelzinnig zijn
- "Formulier" ≠ "Decision" ≠ "Research"
- Expliciete labels = geen cognitieve overhead

---

## 🎨 Visuele Scheiding

### **Kleurgebruik - AANGEPAST**

**Formulier Status (BLAUW):**
```
✅ "Formulier Compleet" → bg-blue-600
✅ "3/4 Velden" → variant="outline"
✅ Neutraal, geen implicatie over decision
```

**Decision Status (GROEN/ORANJE/ROOD):**
```
🟢 Safe to Decide → bg-green-600
🟡 Decision at Risk → bg-amber-600
🔴 Do Not Decide → bg-red-600
```

**Motivatie:**
- **Blauw** = formulier (neutraal feit)
- **Groen/Oranje/Rood** = decision (strategische beoordeling)
- Verschillende kleuren = verschillende betekenissen
- Geen overlap, geen verwarring

---

## 📊 Voorbeelden van Scenario's

### **Scenario 1: Formulier Compleet, Decision Blocked**

**Situatie:**
- Campaign naam: ✅ Ingevuld
- Objective: ✅ Ingevuld
- Target market: ✅ Ingevuld
- Key message: ✅ Ingevuld
- **Gekoppeld:** Core Values (25% coverage)

**UI VOOR (verwarrend):**
```
Campaign Details
  ✅ Complete (groen)  ← "Alles oké?"
  100%

Decision Header
  🔴 DO NOT DECIDE     ← "Maar... Complete?"
```

**UI NA (helder):**
```
Campaign Details
  ℹ️ Formulier Compleet (blauw)  ← Duidelijk: alleen formulier
  Formulier: 100%
  
  🔴 Niet Veilig (rood)           ← Decision status (apart!)
  Causes: "Core Values: 25% research coverage"

Decision Header
  🔴 DO NOT DECIDE
  Core Values: 25% research coverage
```

**Begrip:**
- Formulier = ingevuld ✅
- Decision = niet veilig ❌
- Geen tegenstrijdigheid!

---

### **Scenario 2: Formulier Incomplete, Decision Safe**

**Situatie:**
- Campaign naam: ✅ Ingevuld
- Objective: ❌ Leeg
- Target market: ❌ Leeg
- Key message: ✅ Ingevuld
- **Gekoppeld:** Brand Purpose (85% coverage)

**UI:**
```
Campaign Details
  2/4 Velden (outline)              ← Formulier incomplete
  Formulier: 50%
  
  🔴 Niet Veilig                    ← Decision blocked (verplicht veld)
  Causes: "Campaign objective ontbreekt"

Brand Assets
  🟢 Veilig                         ← Data is goed gevalideerd!
```

**Logica:**
- Formulier incomplete → Kan niet genereren (verplicht veld)
- Maar brand data is wel safe (85%)
- Decision blocked door formulier, niet door data quality

---

### **Scenario 3: Alles Compleet en Safe**

**Situatie:**
- Alle formulier velden: ✅
- Brand Purpose: 90% coverage ✅
- Sarah: 85% coverage ✅

**UI:**
```
Campaign Details
  ℹ️ Formulier Compleet (blauw)
  🟢 Veilig (groen)

Brand Assets
  🟢 Veilig

Decision Header
  🟢 SAFE TO DECIDE
  Alle gekoppelde merkdata is voldoende gevalideerd.
```

**Begrip:**
- Formulier compleet ✅
- Decision safe ✅
- Mag genereren! 🎉

---

## 📁 Gewijzigde Bestanden

### **1. `/utils/campaign-decision-calculator-v2.ts`**

**Wijzigingen:**
```typescript
// REMOVED: status field in affectedAssets interface
affectedAssets: Array<{ 
  name: string; 
  coverage: number;
  // status: string; ← VERWIJDERD
}>;

// TOEGEVOEGD: Consistente formatting helper
function getResearchStatusLabel(coverage: number): string {
  if (coverage < 50) return 'insufficient';
  if (coverage < 80) return 'partial';
  return 'validated';
}

// UPDATED: Section decision voor brand-assets
causes: blockedItems.map(i => 
  `${i.item.type}: ${i.status.coverage}% research coverage`
  // NIET: `${i.item.type}: status = ${i.item.status}, ${coverage}%`
);
```

**Motivatie:**
- Geen formulier status meer in decision feedback
- Altijd consistente formatting
- Percentage = research quality (niet formulier status)

---

### **2. `/components/decision-status/CampaignDecisionHeader.tsx`**

**Wijzigingen:**
```typescript
// UPDATED: Interface (geen status field)
details?: {
  affectedAssets: Array<{ name: string; coverage: number }>;
  // GEEN: status?: string;
}

// UPDATED: Display logic
<span className="text-muted-foreground">
  {asset.coverage}% research coverage
  // NIET: {asset.status ? `status = ${asset.status}, ` : ''}
</span>
```

**Voorbeeld output:**
```
✅ "Core Values: 50% research coverage"
❌ "Core Values: status = draft, 50% coverage"
```

**Motivatie:**
- Alleen research percentage tonen
- Formulier status is irrelevant voor decision
- Consistentie = begrijpelijkheid

---

### **3. `/components/strategy-tools/CampaignStrategyGeneratorDetail.tsx`**

**Wijzigingen:**

**A. Formulier progress badges (2 locaties):**
```tsx
// VOOR:
<Badge className="bg-green-600">
  <CheckCircle /> Complete
</Badge>
<p>{percentage}%</p>

// NA:
<Badge className="bg-blue-600">
  <CheckCircle /> Formulier Compleet
</Badge>
<p>Formulier: {percentage}%</p>
```

**B. Generate button feedback:**
```tsx
// VOOR:
"Your campaign configuration is {readinessScore}% complete."

// NA:
"Formulier is {readinessScore}% ingevuld."
```

**C. Progress bar label:**
```tsx
// VOOR:
<span>Configuration Progress</span>

// NA:
<span>Formulier Voortgang</span>
```

**Locaties:**
1. Campaign Details sectie (regel ~680-693)
2. Advanced Settings sectie (regel ~1091-1104)
3. Generate button beschrijving (regel ~1523)
4. Progress bar (regel ~1555)

**Motivatie:**
- "Formulier" = expliciete scope
- Blauw = neutraal (geen decision implicatie)
- Consistent door hele applicatie

---

## ✅ Consistentie Checklist

### **Microcopy:**
- [x] Geen tegenstrijdige status + percentage combinaties
- [x] Alleen `"<naam>: <percentage>% research coverage"`
- [x] Of `"<naam>: research status: insufficient/partial/validated"`
- [x] Nooit formulier status (draft, in-progress) in decision feedback

### **Formulier vs Decision:**
- [x] "Formulier Compleet" (blauw) ≠ "Safe to Decide" (groen)
- [x] "Formulier: 100%" ≠ "100% safe"
- [x] Progress bars labeled "Formulier Voortgang"
- [x] Readiness score: "Formulier is X% ingevuld"

### **Visuele Scheiding:**
- [x] Blauw = formulier status
- [x] Groen/Oranje/Rood = decision status
- [x] Section indicators bij alle hoofdsecties
- [x] Formulier progress en decision indicator gescheiden

### **Erf-logica:**
- [x] Brand Assets erft status van gekoppelde items
- [x] Campaign Details controleert gekoppelde data
- [x] Zwaarste status propageert omhoog
- [x] Causes tonen concrete items en percentages

### **Cognitieve Ruis:**
- [x] Alle vage termen vervangen ("Complete" → "Formulier Compleet")
- [x] Expliciete labels ("Formulier:", "Research coverage:")
- [x] Geen ambiguïteit tussen formulier/decision/research

---

## 🎯 Validatie Vragen

### **Consistentie:**
1. ✓ Is er nog ergens "status = X, Y% coverage"? → **NEE**
2. ✓ Kan "Complete" worden verward met "Safe to Decide"? → **NEE** ("Formulier Compleet")
3. ✓ Is het helder of percentage over formulier of research gaat? → **JA** ("Formulier: X%", "X% research coverage")

### **Logica:**
4. ✓ Kan formulier 100% zijn terwijl decision blocked is? → **JA** (gescheiden)
5. ✓ Erft brand-assets sectie status van gekoppelde items? → **JA**
6. ✓ Controleert campaign-details gekoppelde data? → **JA**

### **Cognitieve Load:**
7. ✓ Moet gebruiker nadenken over verschil formulier vs decision? → **NEE** (visueel gescheiden)
8. ✓ Zijn er nog vage termen ("complete", "progress")? → **NEE** (allemaal specifiek)
9. ✓ Kan gebruiker direct zien waarom decision not safe is? → **JA** (concrete causes)

---

## 💡 Kern Verbeteringen

| Aspect | Voor | Na | Impact |
|--------|------|-----|---------|
| **Tegenstrijdigheid** | "draft, 50% coverage" | "50% research coverage" | Geen verwarring meer |
| **Formulier status** | "Complete" (groen) | "Formulier Compleet" (blauw) | Duidelijke scope |
| **Progress label** | "Configuration Progress" | "Formulier Voortgang" | Expliciete betekenis |
| **Percentage context** | "100%" | "Formulier: 100%" | Weet wat 100% betekent |
| **Decision display** | Status in causes | Alleen percentage | Consistentie |
| **Kleur betekenis** | Groen = compleet | Blauw = formulier, Groen/Rood = decision | Scheiding |
| **Erf-logica** | Niet geïmplementeerd | Brand Assets erft status | Logische cascade |
| **Microcopy** | Mix van termen | Consistent "research coverage" | Eenduidige taal |

---

## 🚀 Resultaat

**Gebruiker ziet nu:**

```
┌─────────────────────────────────────────────────────┐
│ Campaign Details                                    │
│                                                     │
│ ℹ️ Formulier Compleet (blauw)  🔴 Niet Veilig (rood)│
│ Formulier: 100%                                     │
│                                                     │
│ [Klik voor oorzaak: "Core Values: 25% research     │
│  coverage - Breng naar 50%+"]                       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ 🔴 DO NOT DECIDE                                    │
│                                                     │
│ Strategische risico's gedetecteerd                 │
│ ⚠ Core Values: 25% research coverage               │
│ ⚠ Sarah: 48% research coverage                     │
│                                                     │
│                       [Los dit nu op →]             │
│                       Doorgaan met risico           │
└─────────────────────────────────────────────────────┘
```

**Gebruiker begrijpt:**
1. ✅ Formulier is ingevuld (blauw, 100%)
2. ❌ Maar decision is niet veilig (rood)
3. 💡 Waarom: Core Values en Sarah hebben lage research coverage
4. 🎯 Wat te doen: Los dit nu op (valideer assets)

**Geen verwarring meer tussen "ingevuld" en "veilig"!**

---

**Versie:** 2.1 (CONSISTENTIE CORRECTIE)  
**Focus:** Logica, niet-tegenstrijdigheid, onmiddellijke begrijpelijkheid  
**Status:** ✅ Corrections Complete  
**Datum:** December 2024
