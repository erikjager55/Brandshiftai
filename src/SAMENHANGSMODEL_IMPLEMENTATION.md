# Samenhangsmodel Implementatie

## Overzicht

Het samenhangsmodel zorgt ervoor dat het platform aanvoelt als een **strategisch cockpit met volledige menselijke controle**. Geen enkel onderdeel wordt automatisch aangepast zonder expliciete toestemming van de gebruiker.

## Kernprincipes

### 1. Gecontroleerde Impact Analyse
- Wanneer een brand asset wordt aangepast, verandert de decision status **alleen** indien er nieuw onderzoek wordt toegevoegd of gevalideerd
- Content updates zonder onderzoek wijzigen de decision status NIET
- Alle wijzigingen worden gelogd en geanalyseerd, maar voeren geen automatische acties uit

### 2. Menselijke Controle
- **Lopende campagnes** blijven ongewijzigd
- Gebruikers krijgen een subtiele melding: *"nieuwere strategische input beschikbaar – herberekenen?"*
- Herberekening gebeurt alleen op expliciete actie van de gebruiker

### 3. Geen Automatische Updates
- **Persona's** worden nooit automatisch aangepast
- **Research prioriteiten** wijzigen niet automatisch
- Gebruikers worden geïnformeerd over mogelijke impact, maar moeten zelf beslissen

## Architectuur

### Types (`/types/change-impact.ts`)

```typescript
// Soorten wijzigingen
type ChangeType = 'content-update' | 'research-added' | 'validation' | 'status-change';

// Impact levels
type ImpactLevel = 'none' | 'low' | 'medium' | 'high';

// Change record
interface AssetChange {
  id: string;
  assetId: string;
  changeType: ChangeType;
  timestamp: string;
  description: string;
  researchAdded?: boolean;
  coverageChangeBefore?: number;
  coverageChangeAfter?: number;
}

// Impact analysis
interface ImpactAnalysis {
  change: AssetChange;
  decisionImpact: DecisionImpact;
  campaignImpacts: CampaignImpact[];
  affectedPersonas: string[];
  personaNote: string;
  researchPriorityNote: string;
}
```

### Service (`/services/ChangeImpactService.ts`)

De service analyseert wijzigingen en genereert menselijke samenvattingen:

```typescript
// Analyseer een asset wijziging
ChangeImpactService.analyzeAssetChange(change, asset, previousAsset)

// Check impact op lopende campagnes
ChangeImpactService.checkCampaignImpacts(impactAnalysis, activeCampaigns)

// Formatteer samenvattingen
ChangeImpactService.formatShortSummary(impactAnalysis)
ChangeImpactService.formatDetailedSummary(impactAnalysis)
```

### Context (`/contexts/ChangeImpactContext.tsx`)

Globale state voor change tracking:

```typescript
const { 
  trackAssetChange,           // Track een wijziging
  getNotifications,           // Haal notificaties op
  checkCampaignImpacts,       // Check campaign impact
  getLatestImpactForAsset,    // Laatste impact voor asset
  markNotificationSeen,       // Markeer als gezien
  dismissNotification         // Dismiss notificatie
} = useChangeImpact();
```

### Integration (`/contexts/BrandAssetsContext.tsx`)

De BrandAssetsContext is uitgebreid met change tracking:

```typescript
// Update een asset met change tracking
updateBrandAsset(
  assetId,
  updates,
  'research-added',  // ChangeType
  'Nieuw interview onderzoek toegevoegd'  // Description
);
```

## UI Componenten

### 1. ImpactSummary (`/components/impact/ImpactSummary.tsx`)

Toont een rustige, coachende samenvatting van wat een wijziging betekent:

```tsx
<ImpactSummary 
  impactAnalysis={analysis}
  compact={false}  // Expandable versie
/>

<ImpactSummaryList 
  impactAnalyses={analyses}
  maxVisible={3}
/>
```

**Gedrag:**
- Zachte kleuren (emerald voor positief, amber voor waarschuwing, slate voor info)
- Subtiele iconen (CheckCircle, AlertCircle, Info)
- Expandable voor meer details
- Coachende taal: "Wat betekent deze wijziging?"

### 2. CampaignImpactNotification (`/components/impact/CampaignImpactNotification.tsx`)

Subtiele melding voor lopende campagnes:

```tsx
<CampaignImpactNotification
  impactAnalyses={campaignImpacts}
  onRecalculate={() => {
    // User kiest ervoor om te herberekenen
  }}
  onDismiss={() => {
    // User kiest om later te bekijken
  }}
/>
```

**Gedrag:**
- Blauwe tint (informatief, niet alarmerend)
- Duidelijke CTA: "Herberekenen met nieuwe input"
- Optie om te dismissen: "Later bekijken"
- Toont welke assets nieuwere input hebben

### 3. DecisionImpactPanel (`/components/impact/DecisionImpactPanel.tsx`)

Toont impact op decision status in de dashboard:

```tsx
<DecisionImpactPanel />
```

**Locatie:** Dashboard, tussen "Top Strategic Risks" en "Next Best Action"

## Integraties

### Dashboard (`/components/Dashboard.tsx`)

```tsx
import { DecisionImpactPanel } from './impact/DecisionImpactPanel';

// In de render:
<DecisionImpactPanel />
```

### Campaign Strategy Generator (`/components/strategy-tools/CampaignStrategyGeneratorDetail.tsx`)

```tsx
import { useChangeImpact } from '../../contexts';
import { CampaignImpactNotification } from '../impact/CampaignImpactNotification';

// Check for impacts
const campaignImpacts = React.useMemo(() => {
  const allSelectedAssets = [...selectedBrandAssets, ...selectedPersonas];
  return checkCampaignImpacts('current-campaign', allSelectedAssets);
}, [selectedBrandAssets, selectedPersonas, checkCampaignImpacts]);

// In Configure tab:
{campaignImpacts.length > 0 && (
  <CampaignImpactNotification
    impactAnalyses={campaignImpacts}
    onRecalculate={handleRecalculate}
    onDismiss={handleDismiss}
  />
)}
```

## Gedragsregels

### Decision Status Wijzigingen

```typescript
// ✅ Decision status verandert
updateBrandAsset(id, updates, 'research-added', description);
updateBrandAsset(id, updates, 'validation', description);

// ❌ Decision status blijft gelijk
updateBrandAsset(id, updates, 'content-update', description);
updateBrandAsset(id, updates, 'status-change', description);
```

### Impact Samenvattingen

Voor elke wijziging wordt automatisch een samenvatting gegenereerd die uitlegt:

1. **Wat is er veranderd?** - De wijziging in menselijke taal
2. **Impact op beslissingen** - Is de decision status veranderd?
3. **Persona's** - Welke persona's mogelijk beïnvloed worden (GEEN automatische update)
4. **Research prioriteiten** - Suggestie om prioriteiten te heroverwegen (GEEN automatische wijziging)

### Voorbeelden

#### Voorbeeld 1: Content Update (Geen Impact)
```
Wat is er veranderd?
→ Content geüpdatet zonder nieuw onderzoek

Impact op beslissingen
→ Content update zonder nieuw onderzoek. Decision status blijft ongewijzigd.
```

#### Voorbeeld 2: Research Toegevoegd (Medium Impact)
```
Wat is er veranderd?
→ Nieuw interview onderzoek toegevoegd

Impact op beslissingen
→ Onderzoek toegevoegd aan "Brand Values". Decision status blijft decision at risk (65% coverage).

Persona's
→ Deze wijziging kan relevant zijn voor 2 persona('s). Check handmatig of updates nodig zijn.

Research prioriteiten
→ Nieuw onderzoek toegevoegd. Overweeg of research prioriteiten aangepast moeten worden.
```

#### Voorbeeld 3: Veilig voor Beslissingen (High Impact)
```
Wat is er veranderd?
→ Validatie voltooid, coverage verhoogd naar 82%

Impact op beslissingen
→ ✓ "Brand Values" is nu safe to decide! (82% research coverage bereikt)

Persona's
→ Deze wijziging kan relevant zijn voor alle persona's. Check handmatig of updates nodig zijn.
```

## Demo & Testing

### Change Impact Demo (`/components/impact/ChangeImpactDemo.tsx`)

Test component om het systeem te demonstreren:

```tsx
import { ChangeImpactDemo } from './components/impact/ChangeImpactDemo';

<ChangeImpactDemo />
```

**Features:**
- Simuleer verschillende soorten wijzigingen
- Bekijk real-time impact analyses
- Test notificatie systeem
- Statistieken: totale wijzigingen, impact analyses, actieve notificaties

## User Experience Principes

### 1. Visuele Rust
- Zachte kleuren (emerald, amber, blue, slate)
- Geen harde rode waarschuwingen
- Subtiele iconen
- Voldoende witruimte

### 2. Coachende Toon
- "Wat betekent deze wijziging voor beslissingen?"
- "Overweeg of updates nodig zijn"
- "Check handmatig of..."
- "Nieuwere strategische input beschikbaar"

### 3. Transparantie
- Alle wijzigingen worden gelogd
- Impact wordt duidelijk uitgelegd
- Timestamps bij elke analyse
- Expandable details

### 4. Controle
- Gebruiker besluit altijd
- Geen automatische updates
- Duidelijke CTAs ("Herberekenen", "Later bekijken")
- Notificaties kunnen dismissed worden

## Storage & Persistence

Het change impact systeem gebruikt localStorage:

```typescript
// Opgeslagen data
{
  changes: AssetChange[],           // Laatste 100 wijzigingen
  impactAnalyses: ImpactAnalysis[], // Laatste 100 analyses
  notifications: ChangeNotification[],
  lastAnalyzedAt: string
}
```

**Storage key:** `change-impact-store`

## Best Practices

### Voor Ontwikkelaars

1. **Gebruik altijd het juiste ChangeType:**
   ```typescript
   // Research toegevoegd
   updateBrandAsset(id, updates, 'research-added', description);
   
   // Content aangepast
   updateBrandAsset(id, updates, 'content-update', description);
   ```

2. **Geef duidelijke descriptions:**
   ```typescript
   updateBrandAsset(
     id, 
     updates, 
     'research-added',
     'Nieuw workshop onderzoek met 12 deelnemers voltooid'
   );
   ```

3. **Check campaign impacts voor lopende campagnes:**
   ```typescript
   const impacts = checkCampaignImpacts(campaignId, selectedAssets);
   if (impacts.length > 0) {
     // Toon notificatie
   }
   ```

### Voor Designers

1. **Gebruik rustige kleuren** voor impact summaries
2. **Coachende taal** in plaats van technische audit-taal
3. **Subtiele indicators** in plaats van alarmerend
4. **Voldoende witruimte** voor leesbaarheid

## Toekomstige Uitbreidingen

### Potentiële Features

1. **Impact History Timeline**
   - Visuele timeline van wijzigingen
   - Filter op asset, datum, impact level
   - Export functionaliteit

2. **Smart Suggestions**
   - AI-gegenereerde suggesties op basis van impact
   - "Wellicht wil je ook X updaten"
   - Blijft altijd suggestief, nooit dwingend

3. **Impact Notifications Preferences**
   - User kan instellen welke notificaties ze willen zien
   - Frequentie instellingen (realtime, dagelijks digest, etc.)

4. **Batch Impact Analysis**
   - Analyseer impact van meerdere wijzigingen tegelijk
   - "Als je deze 3 assets update, wat is de totale impact?"

## Conclusie

Het samenhangsmodel zorgt voor een **strategisch cockpit gevoel** waarbij:
- ✅ Gebruikers altijd de controle houden
- ✅ Impact transparant is maar niet alarmerend
- ✅ Beslissingen bewust en geïnformeerd worden genomen
- ✅ Niets automatisch verandert zonder toestemming
- ✅ Het platform voelt professioneel en betrouwbaar aan
