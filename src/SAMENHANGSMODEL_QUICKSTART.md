# Samenhangsmodel - Quick Start

## Wat is het?

Een systeem dat wijzigingen aan brand assets trackt en analyseert, zonder ooit automatisch iets aan te passen. Het platform voelt aan als een **strategisch cockpit met volledige menselijke controle**.

## In één oogopslag

### ✅ Wat het WEL doet:
- Track alle asset wijzigingen
- Analyseer impact op beslissingen
- Toon subtiele notificaties bij nieuwere strategische input
- Genereer menselijke samenvattingen ("wat betekent dit?")
- Suggereer overwegingen voor persona's en research

### ❌ Wat het NIET doet:
- Automatisch decision status veranderen zonder onderzoek
- Lopende campagnes aanpassen
- Persona's updaten
- Research prioriteiten wijzigen

## Voor Gebruikers

### Ik heb een brand asset geüpdatet - wat gebeurt er?

**Scenario 1: Content Update** (geen nieuw onderzoek)
```
✓ Asset opgeslagen
ℹ️ "Content update – geen impact op beslissingen"
→ Decision status blijft ongewijzigd
```

**Scenario 2: Onderzoek Toegevoegd**
```
✓ Asset opgeslagen
ℹ️ "Nieuw onderzoek toegevoegd aan [Asset]"
→ Decision status kan veranderen (als coverage threshold bereikt is)
→ Notificatie verschijnt in dashboard
```

**Scenario 3: Asset Gevalideerd**
```
✓ Asset gevalideerd
✓ "[Asset] is nu safe to decide!"
→ Decision status update naar "safe"
→ Groene indicator in dashboard
```

### Ik werk aan een campagne - wat zie ik?

Wanneer je een campagne configureert en een gebruikt asset heeft nieuwere strategische input:

```
┌─────────────────────────────────────────────────┐
│ ℹ️ Nieuwere strategische input beschikbaar      │
│                                                  │
│ Het asset "Brand Values" is geüpdatet met       │
│ nieuw onderzoek sinds deze campagne is          │
│ geconfigureerd.                                  │
│                                                  │
│ • ✓ Brand Values is nu safe to decide          │
│                                                  │
│ [🔄 Herberekenen met nieuwe input]  [Later]    │
└─────────────────────────────────────────────────┘
```

**Jouw keuze:**
- ✅ Herberekenen → Campaign gebruikt nieuwe data
- ⏭️ Later → Notificatie blijft beschikbaar

### Waar zie ik impact van wijzigingen?

#### 1. Dashboard
```
Recente wijzigingen
───────────────────
✓ Brand Values is nu safe to decide
  Validatie voltooid, 82% coverage bereikt
  
ℹ️ Mission Statement geüpdatet
  Content update – geen impact op beslissingen
```

#### 2. Campaign Generator (Configure tab)
```
[Blauw info blok]
Nieuwere strategische input beschikbaar
→ Brand Values heeft nieuwe onderzoek
[Herberekenen] [Later bekijken]
```

#### 3. Asset Detail Pagina
```
[Expandable panel]
Wat betekent deze wijziging?
✓ "Brand Values" is nu safe to decide!

[Uitklappen]
→ Wat is er veranderd?
→ Impact op beslissingen  
→ Persona's
→ Research prioriteiten
```

## Voor Ontwikkelaars

### Asset updaten met change tracking

```typescript
import { useBrandAssets } from '../contexts';

const { updateBrandAsset } = useBrandAssets();

// Content update (geen impact)
updateBrandAsset(
  assetId,
  { content: 'New content' },
  'content-update',
  'Content geüpdatet'
);

// Onderzoek toevoegen (impact!)
updateBrandAsset(
  assetId,
  { 
    researchCoverage: 85,
    researchMethods: [...methods, newMethod]
  },
  'research-added',
  'Nieuw workshop onderzoek met 15 deelnemers'
);

// Valideren (impact!)
updateBrandAsset(
  assetId,
  { status: 'validated' },
  'validation',
  'Asset gevalideerd en goedgekeurd'
);
```

### Impact analyses ophalen

```typescript
import { useChangeImpact } from '../contexts';

const { 
  store,                    // Alle data
  getNotifications,         // Filter notificaties
  checkCampaignImpacts,     // Check campaign impact
  markNotificationSeen,     // Markeer als gezien
  dismissNotification       // Dismiss
} = useChangeImpact();

// Laatste 5 impact analyses
const recentImpacts = store.impactAnalyses.slice(0, 5);

// Notificaties voor decision status
const notifications = getNotifications('decision-status');

// Check impact voor campagne
const impacts = checkCampaignImpacts(
  'campaign-123',
  ['asset-1', 'asset-2', 'persona-1']
);
```

### Impact summaries tonen

```typescript
import { ImpactSummary, ImpactSummaryList } from '../components/impact/ImpactSummary';

// Enkele summary (compact)
<ImpactSummary 
  impactAnalysis={analysis}
  compact={true}
/>

// Lijst van summaries (expandable)
<ImpactSummaryList 
  impactAnalyses={recentImpacts}
  maxVisible={3}
/>
```

### Campaign impact notification

```typescript
import { CampaignImpactNotification } from '../components/impact/CampaignImpactNotification';

<CampaignImpactNotification
  impactAnalyses={campaignImpacts}
  onRecalculate={() => {
    // Regenerate campaign met nieuwe data
    regenerateCampaign();
  }}
  onDismiss={() => {
    // User kiest om later te bekijken
  }}
/>
```

## Change Types

| Type | Decision Status Impact | Wanneer gebruiken |
|------|----------------------|-------------------|
| `content-update` | ❌ Nee | Content aangepast, geen nieuw onderzoek |
| `research-added` | ✅ Ja | Nieuw onderzoek toegevoegd (workshop, interview, etc.) |
| `validation` | ✅ Ja | Asset gevalideerd en goedgekeurd |
| `status-change` | ❌ Nee | Status wijziging zonder onderzoek |

## Testing

### Demo Component

```typescript
import { ChangeImpactDemo } from '../components/impact/ChangeImpactDemo';

<ChangeImpactDemo />
```

Dit geeft je knoppen om te:
- Simuleer content update
- Simuleer onderzoek toevoegen  
- Simuleer validatie
- Bekijk real-time impact
- Zie statistieken

### Manual Testing Flow

1. **Open Dashboard** → Zie "Recente wijzigingen" (leeg bij start)
2. **Ga naar Brand Assets** → Kies een asset
3. **Update het asset** → Voeg onderzoek toe
4. **Terug naar Dashboard** → Zie impact summary verschijnen
5. **Open Campaign Generator** → Selecteer het geüpdatete asset
6. **Zie notificatie** → "Nieuwere strategische input beschikbaar"

## Visual Design Principles

### Kleuren

```typescript
// Positief (safe to decide)
emerald-50 / emerald-600 / emerald-200

// Waarschuwing (at risk)  
amber-50 / amber-600 / amber-200

// Info (nieuwe input)
blue-50 / blue-600 / blue-200

// Neutraal (geen impact)
slate-50 / slate-600 / slate-200
```

### Toon

❌ **Niet dit:**
- "CRITICAL: Asset blocked"
- "ERROR: Insufficient coverage"
- "WARNING: Decision unsafe"

✅ **Wel dit:**
- "✓ Brand Values is nu safe to decide"
- "Nieuwere strategische input beschikbaar"
- "Overweeg of updates nodig zijn"
- "Check handmatig of..."

## FAQ

**Q: Verandert de decision status automatisch bij content updates?**
A: Nee! Alleen bij nieuw onderzoek (`research-added`) of validatie (`validation`).

**Q: Worden lopende campagnes automatisch geüpdatet?**
A: Nee! Gebruikers krijgen een subtiele notificatie en kunnen zelf kiezen om te herberekenen.

**Q: Worden persona's automatisch aangepast?**
A: Nooit! Het systeem suggereert alleen om handmatig te checken of updates nodig zijn.

**Q: Kan ik notificaties uitschakelen?**
A: Ja, elke notificatie heeft een "dismiss" optie.

**Q: Hoe lang worden wijzigingen bewaard?**
A: De laatste 100 wijzigingen en impact analyses worden opgeslagen in localStorage.

## Volgende Stappen

1. ✅ Systeem is volledig geïmplementeerd
2. ✅ Integraties in Dashboard en Campaign Generator
3. ✅ Demo component beschikbaar
4. 📝 Test het systeem met de ChangeImpactDemo
5. 🎨 Pas kleuren/toon aan naar jouw voorkeur
6. 🚀 Deploy!

## Support

Zie `SAMENHANGSMODEL_IMPLEMENTATION.md` voor:
- Volledige technische documentatie
- Architectuur details
- Best practices
- Toekomstige uitbreidingen
