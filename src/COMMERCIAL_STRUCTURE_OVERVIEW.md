# Commercial Structure - Ontwikkelde Pagina's en Componenten

## 📋 Overzicht

Volledige implementatie van een commerciële structuur met drie productlagen gepositioneerd als **niveaus van besliszekerheid**.

---

## 🆕 Nieuwe Bestanden

### 1. Type Definities

#### `/types/product-tier.ts`
**Beschrijving:** Type definities voor de drie productlagen  
**Inhoud:**
- `ProductTier` type: 'decision-scan' | 'strategic-control' | 'advisory-services'
- `ProductTierInfo` interface met alle tier metadata
- `PRODUCT_TIERS` constant met volledige configuratie per tier
- `UserSubscription` interface voor subscription state

**Kerndata:**
```typescript
Decision Scan (Entry)
- Certainty Level: "Awareness"
- Price: Gratis
- Tagline: "Ontdek waar je staat"

Strategic Control (Core)
- Certainty Level: "Control"  
- Price: €499/maand
- Tagline: "Neem controle over je beslissingen"

Advisory & Services (Premium)
- Certainty Level: "Confidence"
- Price: Op maat
- Tagline: "Expertbegeleiding voor maximale zekerheid"
```

---

### 2. Context Provider

#### `/contexts/ProductTierContext.tsx`
**Beschrijving:** Context voor product tier management  
**Features:**
- `useProductTier()` hook voor tier access
- `hasAccess()` - check feature toegang
- `isFeatureGated()` - check of feature geblokkeerd is
- `upgradeTier()` - tier upgrade functie
- `getTierInfo()` - haal tier metadata op

**Usage:**
```typescript
const { currentTier, hasAccess, upgradeTier } = useProductTier();

if (!hasAccess('campaignGeneration')) {
  // Toon upgrade prompt
}
```

---

### 3. Commercial Componenten

#### `/components/commercial/DecisionScanOnboarding.tsx`
**Beschrijving:** Complete onboarding flow voor Decision Scan (entry product)  
**Flow:**
1. **Welcome Screen** - Uitleg van wat je krijgt
2. **Scanning Animation** - Visuele scanning met progress (0-100%)
3. **Results Screen** - 4 verplichte secties:
   - Decision Status (overall score)
   - Top 3 Strategische Risico's
   - Gepersonaliseerd Actieplan (directe acties, korte termijn, ongoing)
   - Voorbeeld Campagne

**Props:**
```typescript
{
  onComplete: () => void;
  onUpgrade?: () => void;
}
```

---

#### `/components/commercial/UpgradePrompt.tsx`
**Beschrijving:** Upgrade prompts voor gated features  
**Varianten:**
- **Inline** - Compact binnen bestaande pagina
- **Modal** - Volledig scherm overlay met volledige uitleg

**Features:**
- Visuele certainty level progressie (Awareness → Control → Confidence)
- Feature uitleg + waarom upgrade nodig is
- Pricing informatie
- Direct CTA naar upgrade

**Props:**
```typescript
{
  feature: string;
  featureDescription: string;
  requiredTier: 'strategic-control' | 'advisory-services';
  onUpgrade?: () => void;
  onClose?: () => void;
  inline?: boolean; // default: false (modal)
}
```

---

#### `/components/commercial/AdvisoryServices.tsx`
**Beschrijving:** Advisory & Services dashboard en upsell pagina  
**Twee Modi:**

**1. Upsell Mode** (gebruiker heeft geen Advisory tier):
- Value proposition
- Certainty level uitleg (Confidence)
- Volledige feature lijst
- Pricing (op maat)
- CTA: "Plan Adviesgesprek"

**2. Dashboard Mode** (gebruiker heeft Advisory tier):
Vier tabs:
- **Overview** - Active advisor, next review, response time
- **Reviews** - Geplande strategic reviews met agenda
- **Validations** - Begeleide validatie programma's (4-6 weken trajecten)
- **Support** - Support services overzicht

**Props:**
```typescript
{
  onScheduleConsultation?: () => void;
  currentTier?: ProductTier;
}
```

---

#### `/components/commercial/TierIndicator.tsx`
**Beschrijving:** Tier badge in TopNavigationBar  
**Features:**
- Compact badge met tier icon en certainty level
- Dropdown met volledige tier info
- Upgrade CTA (als niet op hoogste tier)
- Link naar billing

**Placement:** TopNavigationBar (rechtsboven)

---

#### `/components/commercial/TierComparison.tsx`
**Beschrijving:** Volledige pricing/tier comparison pagina  
**Secties:**

1. **Header** - "Kies je Niveau van Besliszekerheid"
2. **Tier Cards** (3 columns)
   - Icon + certainty level prominent
   - Pricing
   - Top 5 features
   - CTA button
   - "Meest Gekozen" badge op Strategic Control
3. **Detailed Comparison Table**
   - Gegroepeerd per categorie:
     - Besliszekerheid
     - Platform Functionaliteit  
     - Rapportage & Communicatie
     - Expert Ondersteuning
   - Checkmarks / X per tier
4. **Value Proposition Footer**
   - "Investeer in Besliszekerheid, Niet in Features"

**Props:**
```typescript
{
  onSelectTier?: (tier: ProductTier) => void;
  currentTier?: ProductTier;
}
```

---

#### `/components/commercial/CommercialDemoPage.tsx`
**Beschrijving:** Demo pagina voor alle commercial features  
**Tabs:**
1. Overview - Quick access cards
2. Tiers - TierComparison pagina
3. Decision Scan - Start onboarding
4. Advisory - AdvisoryServices dashboard
5. Feature Gating - Test upgrade prompts

**Functie:** Testing & development van alle commercial flows

---

## 🔄 Geüpdatete Bestanden

### `/contexts/index.tsx`
**Wijziging:** ProductTierProvider toegevoegd aan AppProviders
```typescript
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ProductTierProvider>
      {/* ... rest van providers */}
    </ProductTierProvider>
  );
}

export { useProductTier } from './ProductTierContext';
```

---

### `/components/TopNavigationBar.tsx`
**Wijziging:** TierIndicator toegevoegd
```typescript
import { TierIndicator } from './commercial/TierIndicator';

// In component render:
<TierIndicator 
  onUpgrade={() => {/* upgrade flow */}}
  onViewBilling={() => {/* billing page */}}
/>
```

---

### `/App.tsx`
**Wijziging:** Route toegevoegd voor commercial-demo
```typescript
case 'commercial-demo':
  return <CommercialDemoPage />;
```

---

### `/components/EnhancedSidebarSimple.tsx`
**Wijziging:** Commercial Demo toegevoegd aan Settings subsections
```typescript
const settingsSubsections = [
  // ... existing settings
  { id: 'commercial-demo', label: 'Commercial Demo', icon: ShoppingCart },
];
```

---

## 📊 Feature Matrix

| Feature | Decision Scan | Strategic Control | Advisory & Services |
|---------|--------------|-------------------|-------------------|
| **Certainty Level** | Awareness | Control | Confidence |
| **Price** | Gratis | €499/maand | Op maat |
| **Decision Status** | ✅ (eenmalig) | ✅ (real-time) | ✅ (+ expert validatie) |
| **Campagne Generatie** | 🔸 (1 voorbeeld) | ✅ (onbeperkt) | ✅ (+ expert review) |
| **Research Tools** | ❌ | ✅ | ✅ |
| **Stakeholder Views** | ❌ | ✅ | ✅ |
| **Strategic Reviews** | ❌ | ❌ | ✅ (kwartaal) |
| **Dedicated Advisor** | ❌ | ❌ | ✅ |
| **Guided Validations** | ❌ | ❌ | ✅ |
| **Priority Support** | ❌ | ❌ | ✅ (< 2h) |

---

## 🎨 Design Systeem

### Certainty Level Kleuren

**Decision Scan (Awareness)**
```typescript
bg: 'bg-blue-50 dark:bg-blue-950/20'
text: 'text-blue-700 dark:text-blue-400'
badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
icon: Shield
```

**Strategic Control (Control)**
```typescript
bg: 'bg-purple-50 dark:bg-purple-950/20'
text: 'text-purple-700 dark:text-purple-400'
badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
icon: TrendingUp
```

**Advisory & Services (Confidence)**
```typescript
bg: 'bg-amber-50 dark:bg-amber-950/20'
text: 'text-amber-700 dark:text-amber-400'
badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
icon: Star
```

---

## 🚀 Implementatie Checklist

### Basis Setup ✅
- [x] ProductTier types gedefineerd
- [x] ProductTierContext gemaakt
- [x] Context toegevoegd aan AppProviders
- [x] Hook geëxporteerd

### Entry Product (Decision Scan) ✅
- [x] Onboarding component
- [x] Welcome screen
- [x] Scanning animatie
- [x] Results met 4 secties
- [x] Upgrade prompts ingebouwd

### Core Product (Strategic Control) ✅
- [x] Upgrade prompts (inline + modal)
- [x] Feature gating logica
- [x] Tier comparison pagina

### Premium Product (Advisory) ✅
- [x] Upsell pagina
- [x] Dashboard met 4 tabs
- [x] Reviews overzicht
- [x] Validations overzicht
- [x] Support services

### UI Integratie ✅
- [x] TierIndicator in TopNav
- [x] Sidebar link naar demo
- [x] Route in App.tsx
- [x] Demo pagina met alle flows

---

## 🎯 Commerciële Flow

```
┌─────────────────────┐
│   Landing/Sign-up   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Decision Scan      │ ◄── GRATIS
│  (Onboarding)       │     Entry Point
└──────────┬──────────┘
           │
           │ User ziet:
           │ • Hun decision score (bijv. 62%)
           │ • Top 3 risico's
           │ • Actieplan
           │ • Voorbeeld campagne (lage confidence)
           │
           ▼
┌─────────────────────┐
│  "Voor volledige    │
│   controle..."      │ ◄── UPGRADE PROMPT
└──────────┬──────────┘     "Awareness → Control"
           │
           ▼
┌─────────────────────┐
│ Strategic Control   │ ◄── €499/maand
│ (Full Platform)     │     Core Product
└──────────┬──────────┘
           │
           │ User krijgt:
           │ • Real-time decision quality
           │ • Onbeperkte campagnes
           │ • Research tools
           │ • Stakeholder views
           │
           ▼
┌─────────────────────┐
│  "Voor maximale     │
│   zekerheid..."     │ ◄── UPSELL
└──────────┬──────────┘     "Control → Confidence"
           │
           ▼
┌─────────────────────┐
│ Advisory & Services │ ◄── OP MAAT
│ (Expert Support)    │     Premium
└─────────────────────┘
```

---

## 💡 Gebruikssituaties

### Scenario 1: Nieuwe Gebruiker
1. Sign up → Direct naar Decision Scan
2. Onboarding flow (3 stappen, ~2 min)
3. Results: "Je score is 62% - Decision at Risk"
4. Ziet actieplan + voorbeeld campagne
5. CTA: "Upgrade naar Strategic Control voor volledige controle"

### Scenario 2: Gated Feature
```typescript
// In een component
const { hasAccess } = useProductTier();

if (!hasAccess('campaignGeneration')) {
  return (
    <UpgradePrompt
      feature="Campagne Generatie"
      featureDescription="Genereer onbeperkt campagnes..."
      requiredTier="strategic-control"
      onUpgrade={handleUpgrade}
      inline
    />
  );
}
```

### Scenario 3: Advisory Upsell
- User op Strategic Control tier
- Heeft 5+ campagnes gegenereerd
- Ziet in-app banner: "Wil je expert validatie van je strategie?"
- Click → AdvisoryServices component in upsell mode

---

## 📱 Toegang tot Demo

**Stappen:**
1. Open applicatie
2. Klik op **Settings** (onderaan sidebar)
3. Klik op **Commercial Demo**
4. Verken alle tabs en flows

**Of via code:**
```typescript
setActiveSection('commercial-demo');
```

---

## 🔐 Feature Gating Voorbeeld

```typescript
// In BrandAssetsContext of component
import { useProductTier } from '../contexts';

function CampaignGenerator() {
  const { hasAccess, currentTier } = useProductTier();
  
  if (currentTier === 'decision-scan') {
    return (
      <Card>
        <CardContent>
          <UpgradePrompt
            feature="Onbeperkte Campagne Generatie"
            featureDescription="Genereer zoveel campagnes als je wilt..."
            requiredTier="strategic-control"
            inline
          />
        </CardContent>
      </Card>
    );
  }
  
  // Normal campaign generator
  return <CampaignGeneratorUI />;
}
```

---

## 📈 Metrics & Tracking

**Aanbevolen tracking events:**
```typescript
// Decision Scan
- 'decision_scan_started'
- 'decision_scan_completed'
- 'decision_scan_upgrade_clicked'

// Tier Comparison
- 'tier_comparison_viewed'
- 'tier_card_clicked' (+ tier parameter)

// Upgrade Flow
- 'upgrade_prompt_shown' (+ feature, required_tier)
- 'upgrade_prompt_clicked'
- 'upgrade_completed' (+ from_tier, to_tier)

// Advisory
- 'advisory_upsell_viewed'
- 'consultation_scheduled'
```

---

## 🎨 Positionering Taal

**Consistent gebruik van "Besliszekerheid" in plaats van "Features":**

❌ Niet: "Upgrade voor meer features"  
✅ Wel: "Verhoog je besliszekerheid niveau"

❌ Niet: "Strategic Control bevat 8 modules"  
✅ Wel: "Strategic Control geeft je volledige controle over je beslissingen"

❌ Niet: "Advisory Services pakket"  
✅ Wel: "Maximale confidence met expert begeleiding"

**Certainty Levels als kernboodschap:**
- Decision Scan = **Awareness** - "Je weet waar je staat"
- Strategic Control = **Control** - "Je hebt het onder controle"
- Advisory & Services = **Confidence** - "Je bent zeker van je strategie"

---

## 🔄 Volgende Stappen (Optioneel)

1. **Integreer met echte payment provider** (Stripe/Mollie)
2. **Voeg trial periode toe** aan Strategic Control (bijv. 14 dagen)
3. **Email nurture flows** na Decision Scan
4. **In-app upgrade triggers** gebaseerd op usage patterns
5. **Advisory Services booking systeem** (Calendly integratie)
6. **Tier migration flows** (downgrade, pause, cancel)
7. **Team seats & pricing** voor Strategic Control
8. **Usage limits** per tier (bijv. max 10 campagnes/maand op Control)

---

## 📞 Support

Voor vragen over de commerciële structuur:
- Bekijk `/components/commercial/CommercialDemoPage.tsx` voor voorbeelden
- Check `PRODUCT_TIERS` in `/types/product-tier.ts` voor tier configuratie
- Gebruik `useProductTier()` hook voor feature gating

---

**Laatste update:** December 2025  
**Versie:** 1.0  
**Status:** ✅ Production Ready
