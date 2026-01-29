# CTA Button - Call-to-Action Variant

Geanimeerde CTA button variant voor de **belangrijkste actie** op een pagina of sectie.

## Design Principes

1. **MAXIMAAL 1 CTA per viewport/sectie** - De CTA is de belangrijkste actie
2. **Subtiele animatie** - Pijl beweegt 4px naar rechts bij hover (niet afleidend)
3. **Gradient achtergrond** - Extra opvallendheid voor primaire actie
4. **Groter formaat** - px-6 py-3, h-12 (groter dan standaard buttons)
5. **Alleen voor primary actions** - Niet gebruiken voor secundaire acties

## Styling Specificaties

```
Background: gradient van #5252E3 naar #1FD1B2
Tekst: wit, font-medium
Padding: px-6 py-3 (via size="cta")
Border-radius: rounded-xl
Shadow: shadow-md, hover:shadow-lg
Transition: transition-all duration-200
```

## Arrow Animatie

```css
Default: translate-x-0
Hover: translate-x-1 (4px naar rechts)
Transition: transition-transform duration-200
```

## Basis Gebruik

```tsx
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

<Button variant="cta" size="cta">
  Take Action
  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
</Button>
```

## Gebruik met Group Hover

De button heeft automatisch de `group` class. Gebruik `group-hover:` voor nested animations:

```tsx
<Button variant="cta" size="cta">
  Start Your Journey
  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
</Button>
```

## Praktijkvoorbeelden

### Dashboard - Recommended Next Step

```tsx
<Button 
  variant="cta"
  size="cta"
  onClick={() => handleNavigate(nextBestAction.targetSection)}
>
  {nextBestAction.actionLabel}
  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
</Button>
```

### Empty State - First Persona

```tsx
<EmptyState
  title="No Personas Defined"
  description="Create your first persona to get started"
  primaryAction={{
    label: 'Create Your First Persona',
    onClick: onCreatePersona,
    icon: UserPlus,
    variant: 'cta' // EmptyState component supports CTA variant
  }}
/>
```

### Research Hub - Create Plan (alleen als geen plannen bestaan)

```tsx
{researchPlans.length === 0 && (
  <Card className="border-2 border-primary/20">
    <CardContent className="p-6 text-center">
      <h3 className="font-semibold mb-2">Ready to validate your strategy?</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Create your first research plan
      </p>
      <Button variant="cta" size="cta" onClick={onCreatePlan}>
        Create Research Plan
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </CardContent>
  </Card>
)}
```

## Waar CTA Te Gebruiken (MAX 1 per pagina)

### ✅ GEBRUIK CTA VOOR:

1. **Dashboard** - "Take Action" in recommended next step card
2. **Overview/Landing** - Primaire actie in hero sectie
3. **Empty States** - "Create Your First X" acties
4. **Research Hub** - "Create Plan" (alleen bij empty state)
5. **Onboarding** - Primaire voortgang actie
6. **Conversion Points** - Belangrijkste conversie actie

### ❌ GEBRUIK GEEN CTA VOOR:

1. **Meerdere acties naast elkaar** - Kies 1 primaire actie
2. **Secundaire acties** - Gebruik `variant="outline"` of `variant="default"`
3. **Destructive acties** - Gebruik `variant="destructive"`
4. **Modals** - De modal zelf is al de focus, gebruik default buttons
5. **Lijst items** - Te veel CTAs creëert visuele chaos
6. **Navigation** - Gebruik ghost of link variant

## Anti-Patterns

❌ **NIET DOEN:**

```tsx
// Meerdere CTAs naast elkaar
<div className="flex gap-2">
  <Button variant="cta" size="cta">Action 1</Button>
  <Button variant="cta" size="cta">Action 2</Button> {/* ❌ */}
</div>

// CTA voor elke kaart in een grid
{items.map(item => (
  <Card>
    <Button variant="cta" size="cta">View {item.name}</Button> {/* ❌ */}
  </Card>
))}

// CTA zonder arrow animatie
<Button variant="cta" size="cta">
  Click Me
  <ArrowRight className="h-4 w-4" /> {/* ❌ Missing animation */}
</Button>
```

✅ **WEL DOEN:**

```tsx
// Eén CTA met secundaire acties
<div className="flex gap-2">
  <Button variant="cta" size="cta">
    Primary Action
    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
  </Button>
  <Button variant="outline">Secondary</Button>
</div>

// CTA in featured/hero card, outline voor andere
<div className="grid grid-cols-3 gap-4">
  <Card className="col-span-2"> {/* Featured */}
    <Button variant="cta" size="cta">Get Started</Button>
  </Card>
  <Card>
    <Button variant="outline">View Details</Button>
  </Card>
  <Card>
    <Button variant="outline">Learn More</Button>
  </Card>
</div>
```

## Hiërarchie in Button Variants

Van meest naar minst prominent:

1. **`variant="cta"`** - De belangrijkste actie (MAX 1)
2. **`variant="default"`** - Primaire acties
3. **`variant="outline"`** - Secundaire acties
4. **`variant="ghost"`** - Tertiaire acties
5. **`variant="link"`** - Text-only acties

## Responsive Gedrag

CTA button blijft altijd prominent op alle schermformaten:

```tsx
<Button 
  variant="cta" 
  size="cta"
  className="w-full sm:w-auto" // Full width op mobile
>
  Take Action
  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
</Button>
```

## Accessibility

- De CTA moet altijd beschrijvende tekst hebben (niet alleen "Click here")
- Arrow is decoratief en krijgt geen aria-label
- Focus state is automatisch via `focus-visible:ring-2`
- De meest prominente button moet logisch de belangrijkste actie zijn

## Animatie Specificaties

De arrow animatie is subtiel maar effectief:

```css
/* Default state */
transform: translateX(0);

/* Hover state */
transform: translateX(4px); /* 0.25rem / translate-x-1 */

/* Transition */
transition: transform 200ms;
```

## Design System Integratie

De CTA variant is gedefinieerd in `/components/ui/button.tsx`:

```tsx
cta: "bg-gradient-to-r from-[#5252E3] to-[#1FD1B2] text-white font-medium shadow-md hover:shadow-lg group"
```

En heeft een dedicated size:

```tsx
cta: "h-12 rounded-xl px-6 py-3 has-[>svg]:px-5 text-base"
```

## Testing Checklist

Wanneer je een CTA toevoegt, check:

- [ ] Er is maar 1 CTA per viewport/sectie
- [ ] De CTA is de belangrijkste actie op die pagina
- [ ] Arrow heeft `transition-transform group-hover:translate-x-1`
- [ ] Button heeft `variant="cta"` en `size="cta"`
- [ ] De actie tekst is duidelijk en actiegericht
- [ ] Hover state werkt (shadow lift + arrow slide)
- [ ] Focus state is zichtbaar voor keyboard navigatie

## Voorbeelden van Goede CTA Teksten

✅ **Actiegericht en specifiek:**
- "Create Your First Persona"
- "Start Research Plan"
- "Generate Campaign Strategy"
- "Validate Brand Assets"
- "Launch Your Strategy"

❌ **Vaag en generiek:**
- "Click Here"
- "Submit"
- "Continue"
- "Next"
- "Go"

## Combinatie met Cards

CTA werkt goed in featured/hero cards:

```tsx
<Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
  <CardContent className="p-6">
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-xl bg-primary/10">
        <Sparkles className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold mb-1">Ready to Start?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Take the next step in your strategic journey
        </p>
        <Button variant="cta" size="cta">
          Get Started Now
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  </CardContent>
</Card>
```
