# Analyse: Brand Asset Status Segmentatie

## Huidige Situatie

### Twee Verschillende Systemen

**Systeem 1: BrandLibrary.tsx (oud)**
- `approved` → Groen, CheckCircle, "Ready to use"
- `draft` → Geel, AlertCircle, "Being developed" (UI label: "In Progress")
- `empty` → Grijs, Circle, "Awaiting research" (UI label: "Empty")

**Systeem 2: BrandLibraryNew.tsx (nieuw) + Research Tools**
- `done` → Groen, CheckCircle
- `needs-review` → Oranje, Alert (niet overal geïmplementeerd)
- `in-progress` → Geel/Blauw, Clock
- `not-started` → Grijs, Circle

---

## Probleem Analyse

### 1. **Inconsistente Terminologie**

**Issue:** "approved" vs "done" vs "completed"
- Research tools gebruiken `completed`
- Assets gebruiken `approved` OF `done`
- Gebruiker ziet verschillende labels in verschillende delen van de app

**Impact:**
- Verwarring over wat de statussen betekenen
- Moeilijk te voorspellen welke terminologie waar geldt
- Inconsistente mental models

---

### 2. **Onduidelijke Status Betekenis**

**"approved" vs "draft":**
❌ **PROBLEEM:** Impliceert een approval proces dat niet bestaat
- Wie heeft het "approved"? 
- Kan een "draft" ook gebruikt worden?
- Wat is het verschil tussen een "draft" met goede content en een "approved" asset?

**"empty":**
❌ **PROBLEEM:** Te negatief en niet actionable
- "Empty" voelt als een probleem, niet als een mogelijkheid
- Geeft geen indicatie van wat de volgende stap is
- Mist de connectie met research/development proces

---

### 3. **Ontbrekende Nuance in Workflow**

Het huidige 3-status systeem mist belangrijke workflow states:

```
Oude flow:
empty → draft → approved
❌ Geen status voor "wacht op review/feedback"
❌ Geen status voor "research gestart maar nog geen content"
❌ Geen onderscheid tussen "heeft onderzoek nodig" en "klaar om te gebruiken"
```

---

### 4. **Mismatch met Research Workflow**

**Research Tools Flow:**
```
not-started → in-progress → completed
```

**Asset Flow (oud):**
```
empty → draft → approved
```

❌ Deze mappen niet logisch op elkaar
❌ Onduidelijk hoe research completion zich vertaalt naar asset status

---

## Advies: Verbeterde Segmentatie

### ⭐ Aanbevolen 4-Status Systeem

```
not-started → in-progress → ready-for-review → validated
```

### Status Definities

#### 1. **Not Started** 🔵
**Betekenis:** Asset heeft nog geen ontwikkeling doorlopen
**Visueel:** Grijs, Circle icon
**Label:** "Not Started" of "Ready to Develop"
**Beschrijving:** "No research or development yet"

**Wanneer:**
- Asset heeft geen content
- Geen research sessions gestart
- Geen draft versies aanwezig

**Call-to-Action:**
- "Start Research Plan"
- "Choose Research Method"
- Prominent zichtbaar in dashboard

---

#### 2. **In Progress** 🟡
**Betekenis:** Asset wordt actief ontwikkeld via research
**Visueel:** Blauw/Geel, Clock icon met progress indicator
**Label:** "In Progress"
**Beschrijving:** "Research active, content being developed"

**Wanneer:**
- Minimaal 1 research session is gestart (maar niet afgerond)
- OF draft content bestaat maar niet compleet
- OF asset is geselecteerd in een actief research plan

**Indicator Details:**
- Toon welke research methods actief zijn
- Toon percentage completeness
- Toon verwachte completion date

---

#### 3. **Ready for Review** 🟠
**Betekenis:** Content is gegenereerd, wacht op validatie
**Visueel:** Oranje, AlertCircle icon
**Label:** "Ready for Review" of "Needs Review"
**Beschrijung:** "Generated content awaiting your validation"

**Wanneer:**
- Research session(s) zijn afgerond
- AI/system heeft content gegenereerd
- Gebruiker heeft nog niet gevalideerd/goedgekeurd

**Call-to-Action:**
- "Review Content"
- "Validate & Approve"
- Badge met aantal items dat review nodig heeft

---

#### 4. **Validated** ✅
**Betekenis:** Asset is gevalideerd en klaar voor gebruik
**Visueel:** Groen, CheckCircle icon
**Label:** "Validated" of "Active"
**Beschrijving:** "Validated and ready to use"

**Wanneer:**
- Gebruiker heeft expliciet gevalideerd
- Content is compleet
- Klaar om te gebruiken in brand guidelines, exports, etc.

**Extra:**
- Toon validation date
- Toon laatste research method gebruikt
- Optie om te "Re-validate" als asset oud wordt

---

## Waarom Dit Beter Is

### ✅ 1. Duidelijke Workflow Aansluiting
```
Research: not-started → in-progress → completed
                ↓           ↓            ↓
Asset:    not-started → in-progress → ready-for-review → validated
```

### ✅ 2. Actionable States
Elke status heeft een duidelijke volgende actie:
- **Not Started** → "Start research"
- **In Progress** → "Continue/monitor research"
- **Ready for Review** → "Review & validate"
- **Validated** → "Use in brand materials" of "Update when needed"

### ✅ 3. Transparantie in AI/Research Proces
- "Ready for Review" maakt expliciet dat AI/research output validatie nodig heeft
- Voorkomt blind vertrouwen in gegenereerde content
- Geeft gebruiker controle over wat "approved" is

### ✅ 4. Betere Filtering & Prioritering
Users kunnen nu filteren op:
- **Not Started** → "Wat moet ik nog beginnen?"
- **In Progress** → "Waar ben ik mee bezig?"
- **Ready for Review** → "Wat heeft mijn aandacht nodig?" ⭐ MEEST BELANGRIJK
- **Validated** → "Wat kan ik gebruiken?"

### ✅ 5. Natuurlijke Taal
- "Not Started" > "Empty" (positiever, forward-looking)
- "Ready for Review" > "Draft" (duidelijker wat er moet gebeuren)
- "Validated" > "Approved" (duidelijker door wie/hoe)
- "In Progress" blijft hetzelfde (universeel begrepen)

---

## Implementatie Aanbevelingen

### Fase 1: Status Update (Quick Win)
1. Hernoem statussen in BrandLibrary
2. Update visual indicators
3. Voeg "Ready for Review" status toe
4. Update filter labels

### Fase 2: Enhanced Indicators
1. Voeg progress percentages toe aan "In Progress"
2. Voeg validation dates toe aan "Validated"
3. Toon active research methods per asset
4. Badge counts in navigatie voor "Ready for Review"

### Fase 3: Workflow Automation
1. Auto-transitie van "In Progress" → "Ready for Review" wanneer research completes
2. Validation workflow met explicit approval button
3. Notifications voor assets die review nodig hebben
4. Aging indicators voor "Validated" assets (bijv. "> 6 months old")

---

## Visual Design Voorbeeld

```
┌─────────────────────────────────────┐
│ 🔵 Not Started (4)                  │ ← Grijs/Blauw
│ "Vision Statement, Brand Promise..." │
├─────────────────────────────────────┤
│ 🟡 In Progress (3)                  │ ← Blauw (not geel!)
│ "Brand Archetype (Workshop: 60%)..."│
├─────────────────────────────────────┤
│ 🟠 Ready for Review (2) ⚠️          │ ← Oranje + Alert badge
│ "Golden Circle, Core Values..."     │ ← **DEZE HEEFT PRIORITEIT**
├─────────────────────────────────────┤
│ ✅ Validated (4)                    │ ← Groen
│ "Mission, Vision, Positioning..."   │
└─────────────────────────────────────┘
```

---

## Alternatief: 3-Status Simplified Systeem

Als 4 statussen te complex is:

```
to-develop → in-development → validated
```

**MAAR:** Dit mist de cruciale "needs review" state die transparantie geeft over AI-generated content.

---

## Conclusie & Aanbeveling

### 🎯 **Primaire Aanbeveling:**
Implementeer het 4-status systeem:
```
not-started → in-progress → ready-for-review → validated
```

### 🔑 **Key Voordeel:**
De "Ready for Review" status is de **missing link** die:
1. Gebruikers wijst op wat actie vereist
2. Transparantie geeft over AI/research output
3. Gebruiker controle geeft over validatie
4. Perfect aansluit bij de workflow van research tools

### ⚡ **Quick Win:**
Begin met het hernoemen van huidige statussen en voeg "ready-for-review" toe als assets research hebben afgerond maar nog niet gevalideerd zijn.

### 📊 **Impact:**
- ✅ Duidelijkere workflow
- ✅ Betere prioritering ("wat nu?")
- ✅ Meer transparantie
- ✅ Betere aansluiting op research tools
- ✅ Actionable navigation states
