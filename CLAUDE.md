@AGENTS.md

<!-- Everything below this line is project-specific context, not auto-generated.
     The @AGENTS.md line above is Next.js's own convention — next dev owns
     AGENTS.md's content, don't touch that file, just don't delete the pointer. -->

# Frontend — Ichhe Puran (Next.js)

Full project background: `../CLAUDE.md` (workspace root) and `../docs/`.
This file is the frontend-specific detail that matters when you're working
in here specifically.

## Stack
Next.js 16, App Router, TypeScript, Tailwind CSS v4 (CSS-first config, no
`tailwind.config.js` — theme lives in `src/app/globals.css` via `@theme`),
Framer Motion, lucide-react, react-hook-form + zod.

## The one pattern every page must follow

Never hardcode content into a component. The seam is:

```
src/lib/types.ts              — TypeScript interfaces (source of truth for shape)
src/lib/content/*.mock.ts     — mock data matching those types (dev-only fallback)
src/lib/api.ts                — getXContent() functions: real fetch if
                                  NEXT_PUBLIC_API_URL is set, else mock import
src/app/<page>/page.tsx       — async server component, calls lib/api.ts,
                                  passes data down as props
src/components/<Thing>.tsx    — presentational, takes typed props, no fetching
```

**Recipe for adding a new page/section:** add the type to `types.ts` → add
mock data to `content/*.mock.ts` → add a `getXContent()` function to `api.ts`
→ build the component(s) → wire up in `page.tsx`. In that order — don't build
the component first and hardcode data "temporarily," it doesn't get fixed later.

## Design tokens — locked, don't change without the user asking

Defined in `src/app/globals.css`:
- `forest` #1F5D42, `forest-dark` #123828, `sage` #86A789, `mustard` #E9B949,
  `mustard-dark` #C99A2E, `cream` #F7F6F0, `pale-green` #EAF2E8,
  `charcoal` #24302A, `charcoal-soft` #5A665E
- Fonts: `font-display` = Fraunces, `font-body` = Inter — both **self-hosted**
  via `next/font/local` from `src/fonts/*.ttf` (variable fonts, downloaded
  from the google/fonts GitHub mirror). Do not switch to `next/font/google` —
  that was a deliberate choice, not a workaround.
- Mustard buttons need **charcoal** text, not white — contrast/accessibility.
  Enforced centrally by `components/ui/Button.tsx`'s `primary` variant now —
  don't hand-roll a mustard button anywhere, use `Button`.

## Shared UI primitives — use these, don't hand-roll

`src/components/ui/`:
- `Button` — the one pill CTA button site-wide. `variant="primary" | "secondary"`,
  `size="sm" | "lg"`. Every button on the site goes through this.
- `Eyebrow` — the small uppercase label above a section heading.
  `color="forest" | "mustard"`, `variant="plain" | "badge"` (badge = pill
  outline, used in Hero; plain = body sections).
- `Reveal` — Framer Motion fade+slide-up on scroll into view, wraps section
  content. Respects `prefers-reduced-motion` via `useReducedMotion()` (in
  addition to the site-wide CSS rule in `globals.css`, which only covers CSS
  transitions, not Framer Motion animations).
- `BlobAccent` — decorative organic SVG blob, absolutely positioned by the
  caller, used at low opacity (~0.08–0.15) to break up flat color bands.

Before adding a new button, section title, or decorative flourish, check
whether these already cover it — the whole point is one place to change the
look, not five components independently drifting (this happened once
already: pre-redesign, `Navbar`/`CtaBand`'s primary buttons were missing the
shadow `Hero`'s had, purely from copy-paste drift).

## Component inventory (Home page — only page built so far)

`Navbar` (client, mobile menu state, animated via Framer Motion's
`AnimatePresence`) · `Hero` (server, photo+layered-gradient overlay +
scroll-cue) · `ImpactStats` (client, scroll-triggered count-up via
`useInView` + `requestAnimationFrame`, NOT a static number — this is what
replaced the old site's hardcoded "0+" counters, don't regress it back to a
static value; icon-badge stat tiles with staggered reveal) · `CorePillars`
(image cards with a category badge and a centered-icon fallback when
`pillar.image` is null — never let `background-image: url(null)` happen,
that fires a real 404) · `Testimonials` (avatar circle: real photo if
`item.photo` is set, else initials in a forest-colored circle — the "neutral
placeholder avatar" the root CLAUDE.md's hard rule #2 calls for) · `CtaBand`
· `Footer` (now renders `settings.socialLinks`, which the API always
returned but nothing displayed before this redesign).

Icons: `lucide-react`, looked up dynamically by string name from CMS data —
`Icons[iconName as keyof typeof Icons]` with a `Sparkles` fallback if the
string doesn't match. Follow this pattern for any new icon-driven content
type rather than hardcoding `<TreePine />` etc. directly. Note: recent
`lucide-react` versions dropped brand/logo icons (Facebook, Instagram,
Twitter, LinkedIn, YouTube) entirely — `Footer`'s social links use a generic
`Globe` icon for all platforms as a result, with the platform name only in
`aria-label`.

## Not started yet

Pages: About, Initiatives, Impact, Gallery, Get Involved, Contact. See the API
table in `../docs/project-plan.md` (added per last session) for what each
needs from the backend before it can be built without hardcoding.

## Verifying changes

`npm run build` should be run after any non-trivial change — Tailwind v4 and
Turbopack will surface real errors here that `npm run dev` sometimes doesn't
catch immediately.

`playwright` is installed as a dev dependency (added during the visual
redesign pass) specifically for screenshot verification — no `chromium-cli`
or other browser tool is available in this environment. Chromium itself
lives outside the repo at `%LOCALAPPDATA%\ms-playwright`, already downloaded.

**Screenshot gotcha with `Reveal`-wrapped sections:** since most sections use
Framer Motion's `whileInView` (via `components/ui/Reveal.tsx`), a plain
`page.screenshot({ fullPage: true })` right after `page.goto()` captures most
sections mid-animation or still at `opacity: 0` — Playwright's fullPage
capture resizes the viewport instantly, which doesn't give scroll-triggered
animations time to fire and complete. **Scroll through the page in steps
first** (e.g. `window.scrollTo` in a loop with a short wait each step, then
back to the top) before taking the actual screenshot. A `<nextjs-portal>`
element (Next.js's own dev-mode route announcer/indicator) will also show up
in dev-server screenshots — that's normal Next.js chrome, not a bug, and
won't appear in production.
