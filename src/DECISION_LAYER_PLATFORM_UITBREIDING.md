# 🎯 Decision Layer - Platform-brede Uitbreiding

## Doel
Het platform moet **overal** hetzelfde strategisch gedrag afdwingen:
De gebruiker ziet ALTIJD:
1. **Of een beslissing veilig is**
2. **Waarom niet**
3. **Wat eerst moet gebeuren om dit te verbeteren**

---

## ✅ Geïmplementeerde Componenten

### **1. PlatformDecisionSummary.tsx**
**Locatie:** `/components/decision-status/PlatformDecisionSummary.tsx`

**Doel:**
- Decision summary die **bovenaan ELKE pagina** komt
- Toont overall status, top 1-2 oorzaken, primaire actie
- Context-aware (dashboard, research-hub, asset-detail, etc.)

**Props:**
```typescript
{
  context: 'dashboard' | 'research-hub' | 'asset-detail' | 'persona-detail' | 'campaign-output' | 'relationships';
  status: 'safe-to-decide' | 'decision-at-risk' | 'do-not-decide';
  topCauses: string[];          // Max 2 voor helderheid
  primaryAction: string;         // "Valideer X", "Verbeter Y"
  onPrimaryAction?: () => void;
  contextText?: string;          // Extra uitleg
}
```

**Gedrag:**
- **Safe:** Compact (1 regel, py-3)
- **Risk/Blocked:** Expanded met oorzaken + acties
- **Primaire actie:** Always 1 concrete next step
- **Visueel consistent:** Zelfde styling als campaign header

**Motivatie:**
- Ubiquiteit: elke pagina toont decision status
- Gebruiker weet ALTIJD waar ze staan
- Consistent gedrag door hele platform

---

### **2. platform-decision-aggregator.ts**
**Locatie:** `/utils/platform-decision-aggregator.ts`

**Doel:**
- Berekent decision status per pagina-context
- 6 functies voor 6 verschillende pagina's

**Functies:**

```typescript
// 1. DASHBOARD - Overall platform status
calculateDashboardDecision(): PlatformDecisionResult
→ Alle assets + personas
→ Meest urgente items (blocked first, lowest coverage)
→ Primaire actie: "Valideer X"

// 2. RESEARCH HUB - Research impact
calculateResearchHubDecision(): PlatformDecisionResult
→ Welke research heeft grootste impact
→ Toont wat ontbreekt per item
→ Primaire actie: "Plan research"

// 3. ASSET DETAIL - Status van specifiek asset
calculateAssetDetailDecision(assetId): PlatformDecisionResult
→ Coverage, missing methods, status
→ Primaire actie: "Voeg research toe"

// 4. PERSONA DETAIL - Status van specifieke persona
calculatePersonaDetailDecision(personaId): PlatformDecisionResult
→ Coverage, missing methods, status
→ Primaire actie: "Verbeter coverage"

// 5. CAMPAIGN OUTPUT - Decision quality van campagne
calculateCampaignOutputDecision(assets, personas): PlatformDecisionResult
→ Gebruikt bestaande campaign calculator
→ Primaire actie: primair action van campaign

// 6. RELATIONSHIPS - Insight betrouwbaarheid
calculateRelationshipsDecision(): PlatformDecisionResult
→ Relaties zijn safe als basis data safe is
→ Primaire actie: "Valideer basis data"
```

**Return type:**
```typescript
{
  status: 'safe-to-decide' | 'decision-at-risk' | 'do-not-decide';
  topCauses: string[];
  primaryAction: string;
  contextText?: string;
  stats: {
    safe: number;
    atRisk: number;
    blocked: number;
    total: number;
    avgCoverage: number;
  };
}
```

**Motivatie:**
- Centrale logica (DRY principle)
- Consistent per context
- Easy to test en extend

---

### **3. ResearchImpactIndicator.tsx**
**Locatie:** `/components/decision-status/ResearchImpactIndicator.tsx`

**Doel:**
- Toont voor elke research activiteit:
  - Welke beslissing hiermee veiliger wordt
  - Welk risico hiermee wordt verkleind
  - Impact op coverage (current → expected)

**Props:**
```typescript
{
  methodName: string;           // "Workshop", "Interviews"
  affectsItem: string;          // "Core Values", "Sarah"
  currentCoverage: number;      // 45%
  expectedCoverage: number;     // 70%
  risksReduced?: string[];      // ["Misleidende targeting"]
  compact?: boolean;            // Badge only vs full details
}
```

**Features:**
- **Impact levels:**
  - Critical (groen): 50% threshold bereikt (blocked → risk)
  - High (blauw): 80% threshold bereikt (risk → safe)
  - Medium (amber): +10% vooruitgang
  - Low (gray): marginale vooruitgang
  
- **Threshold awareness:**
  - ⭐ indien 50% of 80% wordt bereikt
  - "Nog 1 method en je bent safe!"
  
- **Compact mode:**
  - Research hub: +X% badge
  - Asset detail: volledige uitleg

**Gebruikt in:**
- Research Hub (bij research methods)
- Asset Detail (bij "add research" buttons)
- Persona Detail (bij "add research" buttons)

**Motivatie:**
- Research → Decision koppeling
- Niet "doe research" maar "dit verbetert X van Y% naar Z%"
- Concrete, meetbare impact
- Motiverend (threshold awareness)

---

## ✅ Dashboard - GEÏMPLEMENTEERD

**Locatie:** `/components/Dashboard.tsx`

**Wijzigingen:**

1. **PlatformDecisionSummary toegevoegd (bovenaan content)**
   ```tsx
   <PlatformDecisionSummary
     context="dashboard"
     status={platformDecision.status}
     topCauses={platformDecision.topCauses}
     primaryAction={platformDecision.primaryAction}
     onPrimaryAction={() => {
       // Navigate to first urgent asset or research hub
       if (decisionMetrics.urgentAssets.length > 0) {
         handleNavigate('brand');
       } else {
         handleNavigate('research');
       }
     }}
     contextText={platformDecision.contextText}
   />
   ```

2. **Platform decision berekend**
   ```tsx
   const platformDecision = React.useMemo(() => {
     return calculateDashboardDecision();
   }, []);
   ```

**Gedrag:**
- **Blocked:** Toont top 2 urgente items + "Valideer X"
- **At Risk:** Toont top 2 items + "Verbeter X"
- **Safe:** Compact bericht + "Bekijk strategieën"

**Primaire actie:**
- Navigeert naar brand assets of research hub
- Afhankelijk van urgente items

**Microcopy:**
- ❌ **Was:** "Your configuration is 75% complete" (vaag)
- ✅ **Nu:** "3 items hebben onvoldoende research validatie" (specifiek)

---

## 📋 Nog Te Implementeren (5 pagina's)

### **2. Research Hub**
**Status:** 🔴 PENDING

**Implementatie plan:**
1. **PlatformDecisionSummary toevoegen:**
   - Context: `'research-hub'`
   - Status: van `calculateResearchHubDecision()`
   - Primaire actie: "Plan research" of "Verdiep research"

2. **ResearchImpactIndicator toevoegen bij elke method:**
   ```tsx
   <ResearchMethodCard>
     <ResearchImpactIndicator
       methodName="Workshop"
       affectsItem="Core Values"
       currentCoverage={45}
       expectedCoverage={70}
       risksReduced={["Misleidende merkpositionering"]}
       compact={true}  // Badge only in overview
     />
   </ResearchMethodCard>
   ```

3. **Microcopy aanpassen:**
   - ❌ "Complete" → ✅ "Verbetert X naar safe status"
   - ❌ "Recommended" → ✅ "Grootste impact: +25% coverage"

**Motivatie:**
- Research hub moet tonen WAAROM research belangrijk is
- Niet "doe research" maar "dit maakt X veilig"
- Prioritering: welke research heeft grootste impact

---

### **3. Brand Asset Detail**
**Status:** 🔴 PENDING

**Implementatie plan:**
1. **PlatformDecisionSummary toevoegen:**
   - Context: `'asset-detail'`
   - Status: van `calculateAssetDetailDecision(assetId)`
   - Primaire actie: "Voeg research toe"

2. **ResearchImpactIndicator bij "add research" buttons:**
   ```tsx
   <Button onClick={() => addResearch('workshop')}>
     <ResearchImpactIndicator
       methodName="Workshop"
       affectsItem={asset.type}
       currentCoverage={asset.coverage}
       expectedCoverage={asset.coverage + 25}
       compact={false}  // Full details
     />
   </Button>
   ```

3. **Decision status prominent:**
   - Huidige coverage badge updaten
   - Toevoegen: "Safe to use in strategies" of "Not safe yet"

**Motivatie:**
- Asset detail moet duidelijk maken of asset bruikbaar is
- Welke research nodig om veilig te maken
- Direct actionable (add research button)

---

### **4. Persona Detail**
**Status:** 🔴 PENDING

**Implementatie plan:**
- Identiek aan Brand Asset Detail
- Context: `'persona-detail'`
- Status: van `calculatePersonaDetailDecision(personaId)`
- ResearchImpactIndicator bij research buttons

**Motivatie:**
- Persona's zijn net zo belangrijk als assets
- Zelfde decision logic
- Consistent gedrag

---

### **5. Campaign Output**
**Status:** 🔴 PENDING

**Implementatie plan:**
1. **PlatformDecisionSummary toevoegen:**
   - Context: `'campaign-output'`
   - Status: van `calculateCampaignOutputDecision(assets, personas)`
   - Primaire actie: Van campaign calculator

2. **Decision disclaimers bij risky secties:**
   ```tsx
   <CampaignSection title="Messaging">
     {campaignDecision.status !== 'safe-to-decide' && (
       <Alert variant="warning">
         <AlertTriangle className="h-4 w-4" />
         Deze messaging is gebaseerd op beperkte validatie.
         Behandel als hypothese, test in pilot.
       </Alert>
     )}
     {/* Campaign content */}
   </CampaignSection>
   ```

3. **Microcopy per sectie:**
   - Indien gebaseerd op blocked asset:
     → "⚠ Hypothetisch - valideer met research"
   - Indien gebaseerd op at-risk asset:
     → "ℹ️ Indicatief - test in pilot fase"
   - Indien gebaseerd op safe asset:
     → "✓ Gevalideerd - kan met vertrouwen worden gebruikt"

**Motivatie:**
- Gebruiker moet weten welke delen betrouwbaar zijn
- Niet hele campagne blocken, maar duidelijke disclaimers
- Gedragssturing: safe delen = gebruiken, risky delen = testen

---

### **6. Relationships & Insights**
**Status:** 🔴 PENDING

**Implementatie plan:**
1. **PlatformDecisionSummary toevoegen:**
   - Context: `'relationships'`
   - Status: van `calculateRelationshipsDecision()`
   - Primaire actie: "Valideer basis data"

2. **Decision indicators bij insights:**
   ```tsx
   <InsightCard>
     <Badge className={statusColor}>
       {reliability === 'high' ? 'Betrouwbaar' : 'Speculatief'}
     </Badge>
     <p>Deze insight is gebaseerd op {dataQuality}</p>
   </InsightCard>
   ```

3. **Reliability levels:**
   - High: basis data is safe (groen)
   - Medium: basis data is at-risk (amber)
   - Low: basis data is blocked (rood)

**Motivatie:**
- Insights zijn alleen betrouwbaar als basis data safe is
- Gebruiker moet weten welke insights speculatief zijn
- Geen false confidence

---

## 🎯 Kernprincipes (alle pagina's)

### **1. Decision Zichtbaarheid**
- ✅ Elke pagina heeft PlatformDecisionSummary bovenaan
- ✅ Status (safe/risk/blocked) is altijd zichtbaar
- ✅ Top 1-2 oorzaken worden getoond
- ✅ Primaire actie is altijd aanwezig

### **2. Lokale Decision Indicators**
- ✅ Dashboard: per asset in Priority Actions
- 🔴 Research Hub: per research method (impact indicator)
- 🔴 Asset Detail: bij asset header
- 🔴 Persona Detail: bij persona header
- 🔴 Campaign Output: per campagne sectie
- 🔴 Relationships: per insight/relatie

### **3. Research → Decision Koppeling**
- ✅ ResearchImpactIndicator component gemaakt
- 🔴 Research Hub: toon impact bij elke method
- 🔴 Asset/Persona Detail: toon impact bij add buttons
- ✅ Threshold awareness (⭐ bij 50%, 80%)

### **4. Gedragssturing**
- ✅ Vervang "complete", "progress" door decision taal
- ✅ "Wat kun je veilig beslissen" vs "wat nog niet"
- ✅ Primaire actie is next step (niet abstract)
- ✅ Visuele hiërarchie: safe = groen, risk = amber, blocked = rood

### **5. Consistentie & Eenvoud**
- ✅ Geen verwarring tussen voortgang/validatie/besluitzekerheid
- ✅ "Formulier: 75%" vs "Research coverage: 75%"
- ✅ Consistente kleuren (blauw = formulier, groen/rood = decision)
- ✅ Consistente microcopy (altijd "research coverage", niet "status")

---

## 📦 Bestanden Overzicht

### **Nieuwe Componenten:**
```
/components/decision-status/
├── PlatformDecisionSummary.tsx         ✅ DONE
├── ResearchImpactIndicator.tsx         ✅ DONE
├── CampaignDecisionHeader.tsx          ✅ DONE (v2.1)
├── SectionDecisionIndicator.tsx        ✅ DONE (v2)
├── DecisionSummaryPanel.tsx            ✅ EXISTS
└── DecisionStatusBadge.tsx             ✅ EXISTS
```

### **Nieuwe Utilities:**
```
/utils/
├── platform-decision-aggregator.ts     ✅ DONE
├── campaign-decision-calculator-v2.ts  ✅ DONE
└── decision-status-calculator.ts       ✅ EXISTS
```

### **Geüpdatete Pagina's:**
```
/components/
├── Dashboard.tsx                       ✅ DONE
├── ResearchDashboard.tsx               🔴 TODO
├── BrandAssetDetail.tsx                🔴 TODO
├── PersonaDetail.tsx                   🔴 TODO
├── CampaignOutput.tsx                  🔴 TODO
└── RelationshipsAndInsights.tsx        🔴 TODO
```

---

## 🚀 Volgende Stappen

### **Prioriteit 1: Research Hub**
- Toevoegen PlatformDecisionSummary
- ResearchImpactIndicator bij elke method
- Microcopy aanpassen naar decision taal

### **Prioriteit 2: Asset & Persona Detail**
- PlatformDecisionSummary toevoegen
- ResearchImpactIndicator bij add research buttons
- Decision status prominent maken

### **Prioriteit 3: Campaign Output**
- PlatformDecisionSummary toevoegen
- Decision disclaimers per sectie
- Safe vs risky content markeren

### **Prioriteit 4: Relationships**
- PlatformDecisionSummary toevoegen
- Reliability indicators bij insights
- Speculatieve vs betrouwbare insights scheiden

---

## 💡 Success Metrics

**Gebruiker moet kunnen beantwoorden:**
1. ✅ Is mijn platform data veilig genoeg? (Dashboard summary)
2. 🔴 Welke research heeft grootste impact? (Research Hub)
3. 🔴 Kan ik dit asset/persona veilig gebruiken? (Detail pagina's)
4. 🔴 Welke delen van deze campagne zijn betrouwbaar? (Campaign Output)
5. 🔴 Welke insights kan ik vertrouwen? (Relationships)

**Zonder nadenken:**
- Status is duidelijk (groen/amber/rood)
- Oorzaak is concreet ("X: 45% coverage")
- Actie is specific ("Valideer X", niet "Improve quality")

**Gedragsverandering:**
- 70%+ kiest primaire actie (probleem oplossen)
- 30%- procedeert met risico (maar bewust)
- Geen false confidence (risky data = duidelijk gelabeld)

---

**Status:** 🟡 In Progress (Dashboard DONE, 5 pagina's TODO)  
**Versie:** 1.0 (Platform-brede uitbreiding)  
**Datum:** December 2024
