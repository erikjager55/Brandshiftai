# ✅ Decision Layer Verfijning - Campaign Strategy Generator

## 🎯 Doel Verfijning
De gebruiker moet **zonder nadenken** begrijpen:
1. Waarom de campagne nu niet veilig is
2. Wat er eerst moet gebeuren
3. Welke delen van het formulier hierdoor geraakt worden

**Focus: Helderheid, eenvoud, gedragssturing** (geen esthetische overoptimalisatie)

---

## 📝 Wijzigingen Overzicht

### **1. CampaignDecisionHeader - Herontwerp**
**Bestand:** `/components/decision-status/CampaignDecisionHeader.tsx`

#### **Was (v1):**
- Fel rode achtergrond bij "do not decide" (error gevoel)
- Veel ruimte (p-4, grote icons)
- Rechts: alleen primaire actie button
- Abstracte reden tekst ("Some items have issues")

#### **Nu (v2 VERFIJND):**
```tsx
✅ COMPACTER & RUSTIGER
- py-3 ipv py-4 (minder hoogte)
- bg-slate-50 bij do-not-decide (niet fel rood)
- Rustiger gradaties (/70, /90 opacity)
- ShieldAlert icon ipv XCircle (strategisch, niet error)

✅ STRATEGISCH CONTROL PANEL GEVOEL
- "Strategische risico's gedetecteerd" (niet "ERROR")
- Oorzaken met bullet points (gestructureerd)
- text-sm typografie (compacter)

✅ PRIMAIRE ACTIE DOMINANT (LINKS)
- "Los dit nu op" button LINKS (eerste wat je ziet)
- size="default" + shadow-md (visueel zwaarder)
- SECUNDAIR: "Doorgaan met risico" tekstlink (klein, rechts onder)
- Clear action hierarchy

✅ OORZAKEN ALTIJD TONEN (min 2)
- "Sarah the Startup Founder: 48% coverage"
- "Core Values: status = draft, 50% coverage"
- Concrete, specifieke informatie
- AlertCircle bullets per oorzaak
- "25 meer items" indien >3
```

**Interface wijziging:**
```typescript
// VOOR:
{
  reason: string;              // 1 zin abstracte reden
  consequences: string;        // Business impact
}

// NA:
{
  details: {
    affectedAssets: Array<{
      name: string;
      coverage: number;
      status?: string;         // "draft", "in-progress"
    }>;
  };
  onProceedAnyway?: () => void; // Secundaire actie
}
```

**Motivatie:**
- **Compacter = minder "error"**: Grote rode balk voelt als systeemfout
- **Rustiger kleur = meer controle**: Slate ipv fel rood = "je hebt de situatie onder controle"
- **Primair links = gedragssturing**: 90% moet probleem oplossen, 10% mag doorgaan met risico
- **Concrete oorzaken = begrip**: "Sarah: 48%" is helderder dan "some personas have low coverage"

---

### **2. SectionDecisionIndicator - Simplificatie**
**Bestand:** `/components/decision-status/SectionDecisionIndicator.tsx`

#### **Was (v1):**
- Click to expand → grote card verschijnt (layout shift)
- Alle secties hadden grote expandable cards

#### **Nu (v2 VERFIJND):**
```tsx
✅ SIMPELER VISUEEL
- Badge only (text-xs, px-2 py-1)
- Safe = compacte badge zonder details
- Risk/Blocked = badge met info icon

✅ POPOVER IN PLAATS VAN EXPAND
<Popover>
  <PopoverTrigger>
    <badge>Risico ℹ</badge>
  </PopoverTrigger>
  <PopoverContent>
    Oorzaken:
    • Core Values: 50% coverage
    
    Nodig om veilig te maken:
    1. Breng naar 80%+ coverage
  </PopoverContent>
</Popover>

✅ CONSISTENT MET HEADER
- Zelfde kleurenschema
- Zelfde iconografie (ShieldAlert)
- Zelfde taal ("Niet Veilig" niet "Blocked")

✅ CURSOR-HELP
- cursor: help bij hover
- Signaleert: "klik voor meer info"
```

**Interface wijziging:**
```typescript
// VOOR:
{
  problematicInputs: string[];  // Wat is fout
  requiredActions: string[];    // Wat te doen
}

// NA:
{
  causes: string[];             // Concrete oorzaken
  requiredActions: string[];    // Wat te doen (genummerd in popover)
}
```

**Toegevoegd aan secties:**
1. ✅ Start with a Template (altijd safe)
2. ✅ Campaign Details (blocked als naam/objective/message ontbreekt)
3. ✅ Brand Assets (ERFT status van gekoppelde assets - zie logica hieronder)
4. ✅ Advanced Settings (risk als timeline/budget ontbreekt)
5. ✅ Channel Strategy (risk als geen kanalen)

**Motivatie:**
- **Popover = geen layout shift**: Content blijft stabiel, info on-demand
- **Compacter = minder ruis**: Safe sectie krijgt geen visuele aandacht
- **causes ipv problematicInputs**: Helderder taalgebruik
- **Cursor-help = discoverability**: Gebruiker weet dat er meer info is

---

### **3. Campaign Decision Calculator v2**
**Bestand:** `/utils/campaign-decision-calculator-v2.ts`

#### **Nieuwe logica:**

```typescript
// SECTION TYPES UITGEBREID:
'template'           // Altijd safe (geen data dependency)
'campaign-details'   // Blocked als naam/objective/message ontbreekt
'brand-assets'       // ERFT status van gekoppelde items
'advanced'           // Risk als timeline/budget ontbreekt
'channels'           // Risk als geen kanalen geselecteerd

// INHERITANCE LOGICA (brand-assets):
calculateSectionDecision('brand-assets', ...) {
  // Verzamel ALLE gekoppelde items (assets + personas)
  const allItems = [
    ...selectedBrandAssets,
    ...selectedPersonas
  ];
  
  // Bereken status per item
  const statuses = allItems.map(calculateDecisionStatus);
  
  // ERF zwaarste status:
  if (ANY item is 'blocked')      → section = 'blocked'
  else if (ANY item is 'at-risk') → section = 'risk'
  else                            → section = 'safe'
  
  // Causes tonen concrete items:
  causes: [
    "Core Values: 45% coverage",
    "Sarah: status = draft, 50% coverage"
  ]
}
```

**Voorbeeld inheritance:**
```
Gekoppeld:
- Brand Purpose: 85% (safe)
- Core Values: 45% (blocked)
- Sarah: 55% (at-risk)

→ Brand Assets sectie = BLOCKED (erft van Core Values)
→ Causes: "Core Values: 45% coverage"
```

**Motivatie:**
- **Inheritance = logisch**: Als Core Values blocked is, is hele sectie blocked
- **Concrete causes**: "Core Values: 45%" helderder dan "some items have issues"
- **Section types**: Elke sectie heeft eigen logica (template altijd safe, details kan blocked zijn, etc.)

---

## 🎨 Visual Hierarchy

### **Kleurgebruik (rustiger):**

**VOOR (v1):**
```
Safe:     bg-green-50    (fel groen)
At Risk:  bg-amber-50    (fel oranje)
Blocked:  bg-red-50      (fel rood) ← voelt als ERROR
```

**NA (v2 VERFIJND):**
```
Safe:     bg-green-50/70     (rustiger groen)
At Risk:  bg-amber-50/70     (rustiger oranje)
Blocked:  bg-slate-50        (neutraal, niet fel rood) ← strategisch
          border-l-red-600   (alleen accent rood)
```

**Motivatie:**
- Blocked = **strategisch risico**, niet systeemfout
- Slate achtergrond = neutraal, professioneel
- Rode border links = urgentie zonder panic

---

### **Action Hierarchy:**

```
┌─────────────────────────────────────────────┐
│ 🔴 DO NOT DECIDE                            │
│                                             │
│ Strategische risico's gedetecteerd         │
│                                             │
│ ⚠ Sarah: 48% coverage                      │
│ ⚠ Core Values: status = draft, 50%         │
│                                             │
│                           [Los dit nu op →] │ ← PRIMAIR (groot, shadow)
│                           Doorgaan met risico│ ← SECUNDAIR (klein, tekstlink)
└─────────────────────────────────────────────┘
```

**Visual weight:**
- Primaire actie: `size="default"` + `shadow-md` + button styling
- Secundaire actie: `text-xs` + `underline` + `text-muted-foreground`
- Ratio: Primair is ~5x visueel zwaarder dan secundair

**Motivatie:**
- **90% moet probleem oplossen**: Primair button is eerste wat je ziet
- **10% mag doorgaan**: Secundair is mogelijk maar discouraged
- **Visual hierarchy stuurt gedrag**: Zonder expliciete blokkering

---

## 📊 Gebruikersbegrip

### **Zonder nadenken begrijpen:**

**1. Waarom niet veilig?**
```
✅ "Sarah: 48% coverage"
✅ "Core Values: status = draft, 50% coverage"

❌ "Some items have insufficient validation" (te abstract)
```

**2. Wat moet er gebeuren?**
```
✅ "Valideer Sarah"                    (actie-gericht, specifiek)
✅ "Los dit nu op →"                   (primaire button)

❌ "Improve coverage"                  (te vaag)
❌ "Fix validation issues"             (te technisch)
```

**3. Welke delen geraakt?**
```
✅ Section indicators per sectie:
   - Campaign Details: 🟢 Veilig
   - Brand Assets: 🔴 Niet Veilig (klik voor details)
   - Channels: 🟢 Veilig

❌ Geen indicators → gebruiker moet zelf zoeken
```

---

## 🧪 Gedragssturing

### **Primaire flow (gewenst gedrag):**

1. **Gebruiker ziet header**: "Do Not Decide - Strategische risico's"
2. **Ziet oorzaken**: "Sarah: 48%, Core Values: 50%"
3. **Ziet primaire actie**: [Los dit nu op →] (groot, links)
4. **Klikt**: Scrollt naar Brand Assets sectie
5. **Ziet section indicator**: 🔴 Niet Veilig (hover: "Sarah: 48%")
6. **Lost op**: Gaat naar Sarah, doet research
7. **Komt terug**: Header nu 🟡 At Risk of 🟢 Safe
8. **Genereert**: Vertrouwen in campagne kwaliteit

### **Secundaire flow (toegestaan maar discouraged):**

1. **Gebruiker ziet header**: "Do Not Decide"
2. **Ziet kleine tekstlink**: "Doorgaan met risico"
3. **Klikt**: Confirmation dialog
4. **Confirmeert**: Campagne wordt gegenereerd
5. **Output**: Decision Summary toont risico's
6. **Disclaimer**: "Behandel als hypotheses, niet gevalideerde strategie"

**Success metric:**
- 70%+ kiest primaire flow (probleem oplossen)
- 30%- kiest secundaire flow (doorgaan met risico)

---

## 📁 Gewijzigde Bestanden

### **Nieuwe bestanden:**
```
/utils/campaign-decision-calculator-v2.ts
  ✅ Inheritance logica
  ✅ Section types uitgebreid
  ✅ causes ipv problematicInputs interface
```

### **Herontworpen componenten:**
```
/components/decision-status/CampaignDecisionHeader.tsx (v2)
  ✅ Compacter (py-3)
  ✅ Rustiger kleuren (slate, /70 opacity)
  ✅ Primaire actie links + secundair rechts
  ✅ Concrete oorzaken (min 2)
  ✅ Strategisch control panel gevoel

/components/decision-status/SectionDecisionIndicator.tsx (v2)
  ✅ Popover ipv expand
  ✅ Compacte badge
  ✅ cursor-help
  ✅ causes interface
```

### **Geüpdatet:**
```
/components/strategy-tools/CampaignStrategyGeneratorDetail.tsx
  ✅ Import calculator-v2
  ✅ 5 section decisions (template, details, brand-assets, advanced, channels)
  ✅ Header met onProceedAnyway
  ✅ Section indicators bij elke CardTitle
  ✅ Correct dependencies in useMemo
```

---

## ✅ Implementatie Checklist

### **Componenten** ✅
- [x] CampaignDecisionHeader v2 (herontwerp)
- [x] SectionDecisionIndicator v2 (popover)
- [x] campaign-decision-calculator-v2.ts (inheritance)

### **Integratie** ✅
- [x] Import v2 calculator
- [x] 5 section decisions berekenen
- [x] Header: onProceedAnyway + details
- [x] Section indicators bij:
  - [x] Start with a Template
  - [x] Campaign Details
  - [x] Advanced Settings
  - [x] Channel Strategy
- [x] Brand Assets inheritance logica

### **Microcopy** ✅
- [x] "Strategische risico's gedetecteerd" (niet "error")
- [x] "Los dit nu op" (primair, actionable)
- [x] "Doorgaan met risico" (secundair, discouraged)
- [x] "Sarah: 48% coverage" (concreet, specifiek)
- [x] "Niet Veilig" (niet "Blocked")

---

## 🎯 Validatie Vragen

### **Begrip (zonder nadenken):**
1. ✓ Begrijpen gebruikers binnen 5 sec waarom niet veilig?
2. ✓ Is "Sarah: 48%" helderder dan "some items have issues"?
3. ✓ Weten ze wat "Los dit nu op" doet?

### **Gedrag:**
4. ✓ Kiezen >70% voor "Los dit nu op" ipv "Doorgaan met risico"?
5. ✓ Voelt de header als controle (goed) of als blokkering (slecht)?
6. ✓ Gebruiken ze section indicators om probleem te vinden?

### **Visual Hierarchy:**
7. ✓ Is primaire actie duidelijk dominanter dan secundair?
8. ✓ Voelt slate achtergrond rustiger dan fel rood?
9. ✓ Werkt popover beter dan expandable cards?

---

## 💡 Kernverbeteringen Samenvatting

| Aspect | Voor | Na | Impact |
|--------|------|-----|---------|
| **Gevoel** | Error/blokkering | Strategisch control panel | Minder frustratie |
| **Hoogte** | p-4 (groot) | py-3 (compact) | Minder "in your face" |
| **Kleur** | Fel rood | Slate + rode accent | Rustiger, professioneler |
| **Oorzaken** | Abstract ("some items") | Concreet ("Sarah: 48%") | Direct begrip |
| **Aantal** | 1 reden | Min 2 oorzaken | Completere context |
| **Primair** | Rechts, alleen button | Links, groot + shadow | Duidelijke hiërarchie |
| **Secundair** | N/A | Kleine tekstlink rechts | Mogelijk maar discouraged |
| **Sections** | Geen indicators | 5 indicators met popover | Probleem lokaliseren |
| **Inheritance** | Niet ondersteund | Brand Assets erft status | Logische propagatie |

---

## 🚀 Next Steps

1. **User Testing**:
   - Test met 5 gebruikers
   - Vraag: "Waarom is deze campagne niet veilig?" (zonder hints)
   - Observe: Klikken ze primair of secundair?
   - Time: Hoeveel seconden tot begrip?

2. **Metrics Tracking**:
   - % klikken "Los dit nu op" vs "Doorgaan met risico"
   - Time to resolution (van blocked naar safe)
   - Section indicator usage (hoeveel clicks?)

3. **Iteration**:
   - Als <70% kiest primair: maak visueel nog dominanter
   - Als popover niet ontdekt: overweeg tooltip on hover
   - Als causes niet helder: verfijn microcopy

---

**Versie:** 2.0 (VERFIJND)  
**Focus:** Helderheid, eenvoud, gedragssturing  
**Status:** ✅ Implementation Complete  
**Datum:** December 2024
