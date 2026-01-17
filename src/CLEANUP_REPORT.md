# 🧹 Code Cleanup Inventarisatie Rapport

**Datum**: 14 januari 2026  
**Doel**: Fouten voorkomen, zichtbaarheid verbeteren, codebase lichter maken

---

## 1. INVENTARISATIE OVERZICHT

### 📊 Statistieken
- **Total components**: ~90+ files in `/components`
- **Subdirectories**: 25 feature folders
- **Design system**: 1 central file (`/constants/design-system.ts`)
- **Duplicate components**: 8 gevonden
- **Unused components**: 6 gevonden
- **Deprecated files**: 3 gevonden

---

## 2. DUPLICATES GEVONDEN

### 🔴 Hoge Prioriteit

#### **ResearchDashboard variants**
- `/components/ResearchDashboard.tsx` ✅ **MAIN** (in gebruik)
- `/components/ResearchDashboard_new_chat.tsx` ⚠️ **DUPLICATE** (ongebruikt fragment)
- `/components/ResearchDashboard_temp.tsx` ⚠️ **DUPLICATE** (temp versie)
- **Actie**: Verwijder `_new_chat` en `_temp`, consolideer in main

#### **BrandAssets views**
- `/components/BrandAssetsViewSimple.tsx` ✅ **MAIN** (in gebruik)
- `/components/BrandAssetsAdvancedView.tsx` ⚠️ **OUDE VERSIE**
- `/components/BrandAssetsAdvancedViewWithBulk.tsx` ⚠️ **OUDE VERSIE**
- `/components/BrandLibraryNew.tsx` ⚠️ **MOGELIJK DUPLICATE**
- **Actie**: Verwijder oude versies, behoud alleen Simple (of merge features)

#### **AssetResults variants**
- `/components/AssetResultsView.tsx` ⚠️ **OUD**
- `/components/AssetResultsPageNew.tsx` ⚠️ **OUD**
- `/components/UniversalAssetDashboard.tsx` ✅ **MAIN** (vervangt beide)
- **Actie**: Verwijder oude AssetResults components

### 🟡 Middel Prioriteit

#### **Dashboard duplicates**
- `/components/Dashboard.tsx` ✅ **MAIN**
- `/components/DashboardView.tsx` ⚠️ **MOGELIJK DUPLICATE**
- `/components/AllAssetsDashboard.tsx` ⚠️ **MOGELIJK DUPLICATE**
- **Actie**: Check overlap en consolideer

#### **Research Hub variants**
- `/components/ResearchHubEnhanced.tsx` ✅ **IN GEBRUIK**
- `/components/ResearchHubWithTargets.tsx` ⚠️ **VARIANT**
- **Actie**: Merge targets feature in Enhanced of verwijder

#### **Research Plans variants**
- `/components/ResearchPlansPage.tsx` ✅ **MAIN**
- `/components/ResearchPlansSectionGamified.tsx` ⚠️ **VARIANT**
- `/components/ResearchPlansSimplified.tsx` ⚠️ **OUDE VERSIE**
- **Actie**: Consolideer in één component met variants

---

## 3. UNUSED COMPONENTS

### 🗑️ Te verwijderen (na validatie)

1. `/components/ResearchWorkflow.tsx` - niet geïmporteerd in App.tsx
2. `/components/ResearchMethodsDashboard.tsx` - vervangen door andere dashboards
3. `/components/BrandOverview.tsx` - niet in gebruik
4. `/components/BrandMatrixView.tsx` - niet in App routing
5. `/components/YourBrandStartPage.tsx` - mogelijk deprecated
6. `/components/CreatePersona.tsx` - standalone component, check gebruik

---

## 4. INCONSISTENT PATTERNS

### 🔧 Te harmoniseren

#### **Naming inconsistencies**
- Mix van `Page` / `Section` / `View` / `Dashboard` suffixen
- Sommige files met hoofdletters, andere lowercase
- **Actie**: Standaardiseer naar: `{Feature}Page` voor routes, `{Feature}Section` voor sub-sections

#### **Import paths**
- Hardcoded relative imports: `'./components/...'`
- Geen gebruik van path aliases
- **Actie**: Overweeg path aliases voor cleaner imports

#### **Component structure**
- Sommige components met subfolders (personas/, research/)
- Andere flat in /components
- **Actie**: Verplaats ALLE feature components naar subfolders

---

## 5. DESIGN TOKENS

### ✅ Goed
- Central design system: `/constants/design-system.ts`
- Complete token set (spacing, typography, icons, colors)

### ⚠️ Probleem
- **PersonaDetailPage**: Gebruikt design tokens (goed!)
- **AssetUnlockDetailView**: Mix van tokens en hardcoded values
- **PersonasSection**: Nog veel hardcoded classNames
- **BrandAssetsViewSimple**: Geen design token gebruik

### 📋 Actie
- Scan alle components voor hardcoded:
  - `text-3xl`, `text-lg` → `TYPOGRAPHY.*`
  - `h-6 w-6`, `h-12 w-12` → `ICON_SIZES.*`
  - `bg-green-50`, `border-green-200` → `COLORS.status.*`
  - `p-6`, `space-y-4` → `SPACING.*`

---

## 6. HEAVY FRAMES / PERFORMANCE

### 🐌 Te optimizeren

#### **PersonaDetailPage**
- Rendert ALLE research methods in één keer
- Geen virtualization bij lange lists
- **Actie**: Implementeer lazy loading voor methods

#### **ResearchDashboard**
- Complexe nested state management
- Te veel re-renders
- **Actie**: Gebruik React.memo voor child components

#### **BrandAssetsViewSimple**
- Rendert alle assets in grid
- Kan slow worden bij 100+ assets
- **Actie**: Add virtualization met react-window

---

## 7. ORPHANED FILES

### 👻 Geen parent/usage gevonden

1. `/components/CustomConfetti.tsx` - check waar gebruikt
2. `/components/SessionNavigator.tsx` - niet in main routing
3. `/components/SessionOutcomeHeader.tsx` - standalone?
4. `/components/WelcomeModal.tsx` - wordt dit nog getoond?

---

## 8. STYLES CLEANUP

### 🎨 Duplicate styles gevonden

#### **Badge variants**
Meerdere badge implementaties gevonden:
- `/components/ui/badge.tsx` (shadcn base)
- Inline badge styles in PersonaDetailPage
- Custom badge in AssetAccessBadge.tsx
- **Actie**: Consolideer naar BADGE_VARIANTS in design-system

#### **Card variants**
- Inconsistent card borders, shadows, padding
- Sommige met `rounded-xl`, andere `rounded-lg`
- **Actie**: Gebruik CARD_VARIANTS consistent

#### **Button styles**
- Mix van shadcn Button en custom button classNames
- Inconsistent hover states
- **Actie**: Extend shadcn Button met design tokens

---

## 9. COMPONENT LIBRARY OPSCHONING

### 📦 Herbruikbare components te maken

#### **Research Method Card**
Verschijnt op 4+ plaatsen met verschillende implementaties:
- PersonaDetailPage
- AssetUnlockDetailView
- UniversalAssetDashboard
- BrandAssetsViewSimple

**Actie**: Maak `/components/unified/ResearchMethodCard.tsx` met variants

#### **Status Badge**
Gebruikt overal maar niet consistent:
**Actie**: Maak `/components/unified/StatusBadge.tsx`

#### **Asset Card**
Meerdere asset card implementaties gevonden
**Actie**: Gebruik bestaande StatusCard uit `/components/unified/`

---

## 10. FOLDER STRUCTUUR

### 📁 Huidig (chaotisch)
```
/components
  ├── 60+ loose .tsx files
  ├── /personas
  ├── /research
  ├── /ui
  └── ...20+ subfolders
```

### ✅ Voorgesteld (clean)
```
/components
  ├── /pages              # Route-level components
  │   ├── PersonasPage.tsx
  │   ├── BrandAssetsPage.tsx
  │   └── ...
  ├── /features           # Feature-specific components
  │   ├── /personas
  │   ├── /research
  │   └── /brand-assets
  ├── /unified            # Shared components (KEEP)
  ├── /ui                 # Base UI components (KEEP)
  └── /layout             # Layout components
      ├── TopNavigationBar.tsx
      └── LeftSidebar.tsx
```

---

## 11. ACTIE ITEMS SAMENVATTING

### 🔴 Kritisch (nu doen)
1. **Verwijder duplicates**:
   - ResearchDashboard_new_chat.tsx
   - ResearchDashboard_temp.tsx
   - AssetResultsView.tsx
   - AssetResultsPageNew.tsx

2. **Consolideer design tokens**:
   - PersonasSection: vervang hardcoded classes
   - AssetUnlockDetailView: volledig op tokens
   - BrandAssetsViewSimple: volledig op tokens

3. **Verplaats naar archive**:
   - Deprecated components lijst (zie sectie 3)

### 🟡 Belangrijk (deze week)
4. **Merge duplicate components**:
   - BrandAssets views → één main component
   - Research Plans variants → één met variants
   - Dashboard variants → consolideer

5. **Folder restructure**:
   - Verplaats alle page components naar /pages
   - Verplaats feature components naar /features

### 🟢 Nice to have (later)
6. **Performance optimizations**:
   - Virtualization voor lange lists
   - React.memo voor expensive components
   - Code splitting per route

7. **Path aliases**:
   - Setup `@/components`, `@/utils`, etc.

---

## 12. HANDMATIGE BESLISSINGEN NODIG

### ❓ Checklist voor review

- [ ] **ResearchHubWithTargets**: Keep of merge in Enhanced?
- [ ] **BrandMatrixView**: In gebruik of verwijderen?
- [ ] **CreatePersona**: Standalone of integreren in PersonasSection?
- [ ] **WelcomeModal**: Nog tonen bij onboarding?
- [ ] **ResearchWorkflow**: Vervangen of herstellen?
- [ ] **DashboardView vs Dashboard**: Welke is correct?

---

## 13. VALIDATIE

### ✅ Safe om te verwijderen (gevalideerd)
- ResearchDashboard_new_chat.tsx (fragment, niet geïmporteerd)
- ResearchDashboard_temp.tsx (temp file)

### ⚠️ Needs attention (manual check)
- BrandAssetsAdvancedView.tsx (check of features uniek zijn)
- ResearchPlansSimplified.tsx (check of nog gebruikt in andere flows)

### 🚫 DO NOT TOUCH
- `/components/figma/ImageWithFallback.tsx` (protected)
- `/components/ui/*` (shadcn components)
- `/components/unified/StatusCard.tsx` (recent harmonized)

---

## 📈 VERWACHTE RESULTATEN

### Voor cleanup:
- 90+ loose component files
- 8 duplicates
- Inconsistent design token gebruik (30%)
- File size: ~2.5MB total

### Na cleanup:
- ~70 components (22% reductie)
- 0 duplicates
- Consistent design token gebruik (95%+)
- File size: ~2.0MB (20% lichter)
- Betere developer experience
- Snellere build times
- Minder merge conflicts

---

**Volgende stap**: Begin met cleanup sprint volgens bovenstaande prioriteiten.
