# ✅ Decision Layer voor Campaign Strategy Generator

## 🎯 Doel
Expliciet maken of de gebruiker **veilig kan beslissen**, een **risicovolle beslissing** neemt, of **niet mag beslissen** op basis van gekoppelde merkdata en research.

---

## 📍 Geïmplementeerde Componenten

### 1. **CampaignDecisionHeader** (Nieuwe Component)
**Bestand:** `/components/decision-status/CampaignDecisionHeader.tsx`

**Locatie:** Bovenaan CONFIGURE scherm

**Toont:**
- ✅ Decision status badge (Safe / At Risk / Do Not Decide)
- 📝 Reden van status in 1 zin
- ⚠️ Concrete gevolgen (business impact)
- ➡️ Primaire actie met button
- 🔍 Details (expandable): affected assets + missing research

**Voorbeeld:**
```
🔴 DO NOT DECIDE

Reden: "Core Values en Persona Lisa zijn onvoldoende gevalideerd voor deze campagne."

Gevolgen: "Verhoogd risico op inconsistente positionering en verspilling van mediabudget."

[Valideer Core Values →]
```

**Motivatie:**
- **Besluitzekerheid**: Status is EERSTE wat je ziet (geen zoeken)
- **Gedragssturing**: Gevolgen maken impact concreet (niet abstract)
- **Informatief**: Details in <details> = progressive disclosure
- **Focus**: Alleen status, waarom, wat nu (geen decoratie)

---

### 2. **SectionDecisionIndicator** (Nieuwe Component)
**Bestand:** `/components/decision-status/SectionDecisionIndicator.tsx`

**Locatie:** In elke sectie header:
- Campaign Details
- Channel Strategy  
- (Kan uitgebreid worden naar Brand Assets, Personas)

**Toont:**
- 🟢 Veilig badge (als safe - collapsed)
- 🟡 Risico badge (clickable)
- 🔴 Niet Veilig badge (clickable)

**Bij click (expand):**
- Welke invoer probleem veroorzaakt
- Wat nodig is om deze sectie veilig te maken
- "Los op" button

**Voorbeeld:**
```
Campaign Details [🔴 Niet Veilig ▼]

Problematische invoer:
• Campaign naam ontbreekt
• Key message ontbreekt

Nodig om veilig te maken:
• Vul alle verplichte campagne details in

[Los op]
```

**Motivatie:**
- **Direct feedback**: Niet wachten tot generate-klik
- **Progressive disclosure**: Safe = alleen badge (geen ruis)
- **Context-aware**: Indicator zit IN de sectie (niet ergens anders)
- **Gedragssturing**: "Los op" button maakt actie evident

---

### 3. **DecisionSummaryPanel** (Nieuwe Component)
**Bestand:** `/components/decision-status/DecisionSummaryPanel.tsx`

**Locatie:** Bovenaan OUTPUT scherm (na generatie)

**Toont:**
- 📊 Decision status + metadata (generatiedatum, coverage)
- 🎯 Belangrijkste oorzaken (waarom deze status)
- ⚠️ Risico's bij huidige status
- ✅ Verbeteracties (genummerd 1, 2, 3)
- ⚡ "Start met verbeteren" CTA
- 📝 Disclaimer bij niet-safe status

**Voorbeeld:**
```
🟡 DECISION AT RISK

Deze campagne bevat elementen met beperkte validatie. 
Beslissingen dragen verhoogd risico. Overweeg pilot testing.

Belangrijkste oorzaken:
• Core Values heeft coverage tussen 50-79%
• Kritieke research methods ontbreken: Workshop, 1-on-1 Interviews

Risico's:
⚠ Campagne messaging kan naast doelgroep schieten
⚠ ROI zal waarschijnlijk onder potentieel blijven

Verbeteracties:
1. Complete top 2 research methods voor Core Values
2. Breng alle assets naar 80%+ coverage
3. Start campagne met pilot fase

[Start met verbeteren →]

Let op: Behandel outputs als hypotheses die getest moeten worden, 
niet als gevalideerde strategieën.
```

**Motivatie:**
- **Retrospectief bewustzijn**: Gebruiker weet op welke basis campagne gemaakt is
- **Root cause analyse**: Waarom is dit fout (educatief)
- **Risk awareness**: Business taal, geen tech taal
- **Actionable**: Genummerde stappen geven prioriteit
- **Eerlijk**: Disclaimer is realistisch, niet blokkerend

---

## 🧮 Beslislogica

### **Bestand:** `/utils/campaign-decision-calculator.ts`

**Functie:** `calculateCampaignDecision(selectedBrandAssets, selectedPersonas)`

**Logica:**
1. Verzamel alle geselecteerde items
2. Bereken decision status per item
3. Bepaal overall status:

```
IF één of meer items < 50% coverage:
  → DO NOT DECIDE
  → Reden: "[Namen] onvoldoende gevalideerd (< 50%)"
  → Gevolgen: "Speculatief, hoog risico op inconsistente merkboodschap"
  → Actie: "Valideer [Namen] eerst"

ELSE IF alle items ≥ 50% maar één of meer < 80%:
  → DECISION AT RISK
  → Reden: "[Namen] beperkte validatie (50-79% of missende top methods)"
  → Gevolgen: "Verhoogd risico op sub-optimale positionering"
  → Actie: "Verhoog coverage van [Namen]"

ELSE IF alle items ≥ 80% en top 2 methods afgerond:
  → SAFE TO DECIDE
  → Reden: "Alle merkdata voldoende gevalideerd"
  → Gevolgen: "Sterke research fundamenten, beslissen met vertrouwen"
  → Actie: "Ga door met campagne generatie"
```

**Functie:** `calculateSectionDecision(sectionType, ...)`

**Per sectie:**
- **Brand Assets**: Check coverage van geselecteerde assets
- **Personas**: Check coverage van geselecteerde personas
- **Campaign Details**: Check of verplichte velden ingevuld zijn
- **Channels**: Check of minimaal 1 kanaal geselecteerd

**Output:**
```typescript
{
  status: 'safe' | 'risk' | 'blocked',
  problematicInputs: string[],
  requiredActions: string[]
}
```

---

## 🔄 Integratie in CampaignStrategyGeneratorDetail

### **Configure Scherm**

**1. Campaign Decision Header** (bovenaan)
```tsx
<CampaignDecisionHeader
  status={campaignDecision.status}
  reason={campaignDecision.reason}
  consequences={campaignDecision.consequences}
  primaryAction={campaignDecision.primaryAction}
  onPrimaryAction={() => { /* scroll naar probleem */ }}
  details={{
    affectedAssets: campaignDecision.details.affectedAssets,
    missingResearch: campaignDecision.details.missingResearch
  }}
/>
```

**2. Section Indicators** (per sectie header)
```tsx
<CardTitle className="flex items-center gap-2">
  Campaign Details
  <SectionDecisionIndicator
    status={campaignDetailsDecision.status}
    sectionName="Campaign Details"
    problematicInputs={campaignDetailsDecision.problematicInputs}
    requiredActions={campaignDetailsDecision.requiredActions}
  />
</CardTitle>
```

**3. Generate Button** (confirmation bij risk)
```tsx
const handleGenerate = () => {
  if (campaignDecision.status === 'do-not-decide') {
    const confirmed = window.confirm(
      `⚠️ DO NOT DECIDE - Strategisch Risico\n\n` +
      `${decision.reason}\n\n` +
      `GEVOLGEN: ${decision.consequences}\n\n` +
      `Wil je toch doorgaan? (Dit wordt sterk afgeraden)`
    );
    if (!confirmed) return;
  }
  
  if (campaignDecision.status === 'decision-at-risk') {
    const confirmed = window.confirm(
      `⚠️ DECISION AT RISK - Verhoogd Risico\n\n` +
      `${decision.reason}\n\n` +
      `Wil je doorgaan of eerst het risico verminderen?`
    );
    if (!confirmed) return;
  }
  
  // Proceed with generation
  proceedWithGeneration();
};
```

### **Output Scherm**

**Decision Summary Panel** (bovenaan)
```tsx
<DecisionSummaryPanel
  status={campaignDecision.status}
  rootCauses={campaignDecision.rootCauses}
  risks={campaignDecision.risks}
  improvements={campaignDecision.improvements}
  onImproveClick={() => {
    setSelectedTab('configure');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
  metadata={{
    generatedAt: new Date(),
    avgCoverage: campaignDecision.details.avgCoverage,
    totalAssets: campaignDecision.details.totalAssets,
    safeAssets: campaignDecision.details.safeAssets
  }}
/>
```

---

## 📝 Microcopy Strategie

### **Statussen**
- ✅ "Safe to Decide" (niet "All Good" - te vaag)
- ⚠️ "Decision at Risk" (niet "Warning" - te algemeen)
- 🛑 "Do Not Decide" (niet "Blocked" - te technisch)

### **Secties**
- 🟢 "Veilig" (niet "OK" - te casual)
- 🟡 "Risico" (niet "Warning" - te vaag)
- 🔴 "Niet Veilig" (niet "Blocked" - te technisch)

### **Taal**
- **Business impact**: "verspilling van mediabudget", "inconsistente positionering"
- **Niet tech**: Niet "low coverage", maar "onvoldoende gevalideerd"
- **Actie-gericht**: "Valideer Core Values", niet "Fix coverage"
- **Specifiek**: Namen noemen, niet "some assets"

### **Gevolgen**
```
DO NOT DECIDE:
"Strategische beslissingen zijn speculatief. Hoog risico op 
inconsistente merkboodschap, verspilling van mediabudget en 
teleurstellende campagne-resultaten."

DECISION AT RISK:
"Verhoogd risico op sub-optimale positionering, beperkte 
target audience fit en gemiste kansen door onvolledige inzichten."

SAFE TO DECIDE:
"Campagne is gebaseerd op sterke research fundamenten. 
Strategische beslissingen kunnen met vertrouwen genomen worden."
```

---

## 🎯 Validatie Scenario's

### **Scenario 1: Alles Safe (Happy Path)**
- User selecteert Brand Purpose (85%) + Persona Tech Millennial (90%)
- **Configure Header**: 🟢 Safe to Decide
- **Section Indicators**: Allemaal 🟢 Veilig
- **Generate Button**: Direct naar output, geen confirmation
- **Output Summary**: 🟢 "Strong Research Foundation"

### **Scenario 2: Do Not Decide**
- User selecteert Core Values (25% coverage)
- **Configure Header**: 🔴 Do Not Decide
  - Reden: "Core Values onvoldoende gevalideerd (< 50%)"
  - Gevolgen: "Hoog risico op inconsistente merkboodschap"
  - Actie: "Valideer Core Values eerst"
- **Section Indicators**: Brand Assets 🔴 Niet Veilig
- **Generate Button**: Confirmation dialog met sterke waarschuwing
- **Output Summary**: 🔴 "Research Gaps Identified" + disclaimer

### **Scenario 3: Decision at Risk**
- User selecteert Brand Purpose (65%) + Persona Lisa (70%)
- **Configure Header**: 🟡 Decision at Risk
  - Reden: "Brand Purpose en Persona Lisa beperkte validatie (50-79%)"
  - Gevolgen: "Verhoogd risico op sub-optimale positionering"
  - Actie: "Verhoog coverage van Brand Purpose"
- **Section Indicators**: Mix 🟢/🟡
- **Generate Button**: Confirmation dialog met warning
- **Output Summary**: 🟡 "Partial Validation" + recommendations

---

## 🎨 Design Principes

### **1. Informatief, Niet Blokkerend**
- Waarschuwingen geven informatie
- Gebruiker mag altijd kiezen
- Zelfs "Do Not Decide" kan overriden (met sterke waarschuwing)
- Geen hard blocks (vrijheid > dwang)

### **2. Progressive Disclosure**
- Safe = minimale visuele ruis (badge only)
- Risk/Blocked = details on demand (click to expand)
- Gebruiker bepaalt wanneer details relevant zijn

### **3. Context-Aware Feedback**
- Header = overall status (big picture)
- Section = sectie-specifiek (drill down)
- Modal = critical moment (last check)
- Summary = retrospectief (what was decided)

### **4. Gedragssturing, Niet Straffen**
- "Primaire actie" button maakt next step evident
- "Verbeteracties" zijn genummerd (prioriteit)
- Consequences zijn concreet (niet abstract)
- Microcopy is empowerend, niet blamerend

### **5. Focus op Essentials**
- Geen decoratieve elementen
- Geen gradients, shadows, animations
- Alleen: status, waarom, wat nu
- Kleur = functie (groen/amber/rood = urgentie)

---

## 📊 Success Metrics

### **Behavior Change**
- % campagnes gegenereerd met "Safe to Decide" inputs (target: >70%)
- % users die "cancel" klikken bij "Do Not Decide" confirmation (target: >60%)
- % users die "Start met verbeteren" klikken vanuit Summary (target: >40%)

### **User Understanding**
- % users die decision header details expanden (track engagement)
- % users die section indicators begrijpen (user testing)
- Kwaliteit van gegenereerde campagnes bij Safe vs At Risk vs Blocked

### **Quality Impact**
- Correlatie tussen decision status en campagne performance
- Support tickets over "Campagne werkt niet" (doel: -50%)
- Time from draft tot "Safe to Decide" campagne (track trend)

---

## ✅ Implementatie Checklist

### **Componenten** ✅
- [x] CampaignDecisionHeader.tsx
- [x] SectionDecisionIndicator.tsx
- [x] DecisionSummaryPanel.tsx

### **Utilities** ✅
- [x] campaign-decision-calculator.ts
  - [x] calculateCampaignDecision()
  - [x] calculateSectionDecision()

### **Integratie** ✅
- [x] CampaignStrategyGeneratorDetail.tsx
  - [x] Import nieuwe componenten
  - [x] Calculate campaign decision (useMemo)
  - [x] Calculate section decisions (useMemo)
  - [x] Add CampaignDecisionHeader (configure)
  - [x] Add SectionDecisionIndicator (per sectie)
  - [x] Update handleGenerate (confirmation)
  - [x] Add DecisionSummaryPanel (output)

### **Microcopy** ✅
- [x] Status labels (Safe/Risk/Do Not Decide)
- [x] Reason templates (per status)
- [x] Consequences (business impact)
- [x] Primary actions (actionable)
- [x] Improvement steps (prioritized)

---

## 🚀 Next Steps

### **Testing**
1. Test alle 3 scenario's (Safe, At Risk, Do Not Decide)
2. Valideer confirmation dialogs werken correct
3. Check section indicators voor alle secties
4. Verify scroll to problematic section works

### **Refinement**
1. A/B test confirmation dialog microcopy
2. Monitor cancel rate bij Do Not Decide
3. Track improvements click-through rate
4. Gather user feedback op clarity

### **Expansion**
1. Add SectionDecisionIndicator voor Brand Assets sectie
2. Add SectionDecisionIndicator voor Personas sectie
3. Consider replacing window.confirm met custom modal
4. Add analytics tracking voor decision layer interactions

---

## 💡 Sleutel Inzichten

### **Waarom Dit Werkt**

**1. Altijd Zichtbaar**
- Niet alleen bij generate-klik (te laat)
- Header toont status vanaf eerste moment
- Preventief, niet reactief

**2. Layered Feedback**
- Header = overall ("big picture view")
- Sections = granular ("waar zit het probleem")
- Confirmation = critical ("ben je zeker?")
- Summary = retrospectief ("wat heb je gedaan")

**3. Informed Choice**
- Gebruiker krijgt alle informatie
- Maar mag zelf beslissen
- "Do Not Decide" is sterk afgeraden, niet geblokkeerd
- Respect voor autonomie > dwang

**4. Business Language**
- Niet "coverage too low"
- Maar "verspilling van mediabudget"
- Stakeholders begrijpen impact
- Technische details in expandable sections

**5. Action-Oriented**
- Elke status heeft primaire actie
- Verbeteracties zijn specifiek en genummerd
- Buttons maken next step evident
- Geen zoeken naar "wat nu?"

---

## 📁 Bestandenstructuur

```
/components/decision-status/
  ├── CampaignDecisionHeader.tsx          ✅ Nieuwe component
  ├── SectionDecisionIndicator.tsx        ✅ Nieuwe component
  ├── DecisionSummaryPanel.tsx            ✅ Nieuwe component
  ├── DecisionStatusBadge.tsx             (Bestaand)
  ├── DecisionStatusPanel.tsx             (Bestaand)
  └── DecisionWarningModal.tsx            (Bestaand)

/utils/
  ├── campaign-decision-calculator.ts     ✅ Nieuwe utility
  └── decision-status-calculator.ts       (Bestaand)

/components/strategy-tools/
  └── CampaignStrategyGeneratorDetail.tsx ✅ Geüpdatet

/
  └── DECISION_LAYER_CAMPAIGN_GENERATOR.md ✅ Dit document
```

---

**Gemaakt:** December 2024  
**Status:** ✅ Implementation Complete  
**Versie:** 1.0.0  
**Focus:** Besluitzekerheid en gedragssturing boven esthetiek
