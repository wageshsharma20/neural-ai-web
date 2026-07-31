# Neural AI — Design System

### DTU AI Society — Public + Member Portal

---

## 0. What we are explicitly moving away from

The two reference screenshots you shared are the current "default AI-generated look," and every element below is intentionally banned from this project:

- Full-bleed **near-black background** paired with a scattered **dot/particle constellation** texture
- **Gradient text** on keywords (blue → purple → pink, or teal highlights) used as the primary "wow" moment
- Giant centered bold sans-serif headline, stacked two lines, with a muted grey paragraph beneath
- **Pill-shaped badges** with a small coloured dot ("● AI Society of...")
- **Glowing gradient CTA buttons** next to a ghost/outline secondary button
- A row of **stat cards** (icon + big gradient number + label) as the hero's proof section
- Circular **glowing profile photos**, gradient logo monograms ("N." in a gradient circle)
- Icon-pill navigation, rounded-everything, heavy soft shadows/glows
- **Small "LED" status dots** used as decoration (a tiny glowing coloured circle inside a pill badge, e.g. "● What We Do") — reads as a fake "system status" indicator with no real meaning
- **A different accent colour per card/icon** (cyan brain, purple network, pink chat bubble, orange sparkle, green robot...) turning the section into a rainbow — this directly breaks the "one accent talks" rule below
- **The asymmetric "SaaS hero"**: wide left column of big italic-serif marketing copy + two buttons, paired with one large decorative graphic filling the right half (a compass, a widget, an app-preview) — reads as a startup landing page, not a society. Societies present themselves formally and centered, not as a pitch.
- Oversized dashboard-style hero graphics used purely as decoration (radial dial motifs, orbit/constellation diagrams sitting in a hero) — if a diagram isn't literally the Seal or literally data, it shouldn't be in the hero

If a design decision below ever starts drifting back toward one of these, that's the signal to stop and rethink — not to soften it slightly and keep going.

## 1. The concept

Neural AI is a **university society**, not a startup. The brief actually gives us two great, under-used metaphors: **"Society"** (a formal body with a legacy, a charter, members, roles) and **"Neural"** (literal neuroscience — dendrites, synapses — not sci-fi circuitry).

**Signature direction:** treat the site like the record book / seal / letterhead of an old, serious scientific society — crossed with the precision of a research lab. Think: a Royal Society charter page, an academic journal's typographic discipline, a wax-seal or engraved stamp as the emblem — rendered in a clean, modern, minimal way. Not gradients and glow; ink, brass, paper, hairlines.

This gives us a **signature element**: a circular **Seal** — a monogram ring built from a single hand-drawn dendritic branch (a nod to neuron diagrams, not circuit-board clichés). It sits small, beside the wordmark, the way a real society's crest sits beside its name on a letterhead — not blown up into a large hero illustration. It recurs small as a stamp on achievements, certificates, and section dividers.

**How this reads on the page:** a real society presents itself, it doesn't pitch itself. That means: a small crest + name in the header, a centered, restrained statement of what the society is (not a two-line marketing headline with a decorative graphic beside it), and understated bordered links rather than gradient CTA buttons. Restraint is the aesthetic — quieter than a typical AI-generated startup page, but with more considered typography and colour than a bare, generic "logo + one line + three social buttons" placeholder page.

## 2. Colour — "Ink & Signal" (extracted from the Neural AI logo)

Pulled directly from your logo mark (black ground, white brain linework, cyan-to-magenta circuit "N"), then **desaturated and rationed** so the palette reads minimal instead of like the logo exploded across the whole site. This version gives the purple/pink half of the logo real presence — it isn't cyan-only anymore.

| Token            | Hex       | Source in logo                                  | Use                                                                                                                              |
| ---------------- | --------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `ink`            | `#0A0A0A` | The logo's black ground                         | Primary background, everywhere                                                                                                   |
| `ink-raised`     | `#161616` | — (derived, slightly lifted)                    | Cards/panels on dark surfaces                                                                                                    |
| `bone`           | `#F4F3F1` | The white brain linework                        | Primary text on `ink`; light-mode surface for the member portal                                                                  |
| `graphite`       | `#242424` | — (derived)                                     | Body text on `bone`                                                                                                              |
| `mist`           | `#8C8C8C` | Faint grey brain shading                        | Secondary/muted text, captions, dividers                                                                                         |
| `signal-cyan`    | `#3FC7D6` | Top of the circuit "N"                          | Links, nav states, informational accents                                                                                         |
| `signal-violet`  | `#6B4FA0` | The cyan→magenta transition zone in the circuit | **Primary brand accent** — the Seal, primary buttons/CTAs, section markers. This is the colour that should feel most "Neural AI" |
| `signal-magenta` | `#C765A8` | Bottom of the circuit "N"                       | Secondary accent — hover states, highlighted stat, role tags                                                                     |
| `signal-amber`   | `#C9A227` | — (derived, status-only)                        | "Needs attention" / pending states, kept separate from the brand accents                                                         |

All four brand-derived tones are pulled slightly toward grey from the logo's saturated originals — full-saturation neon is exactly the "AI-generated" look we're avoiding, so the UI versions read closer to muted teal, dusty plum, and dusty rose rather than glowing neon.

**How to use three brand accents without it turning into a rainbow:**

- `signal-violet` is the default brand colour — it's what the Seal, the primary CTA, and any single "this is the brand's moment" element use. If in doubt, reach for violet.
- `signal-cyan` and `signal-magenta` are used one at a time, never together in the same component, to add a second layer of meaning (an active nav link in cyan, a role tag in magenta) — never as decoration for its own sake.
- The full three-colour gradient (cyan → violet → magenta) stays reserved for the literal logo lockup. It is never repeated as a text-fill, button-fill, or background gradient elsewhere in the UI — that repetition is what makes a site look AI-generated.

## 3. Typography

| Role                 | Typeface                                           | Notes                                                                           |
| -------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------- |
| Display (H1/H2)      | **Fraunces** (serif, high-contrast, slightly inky) | Set tight, large, in `bone`/`ink` — never gradient-filled                       |
| Body                 | **IBM Plex Sans**                                  | Institutional, legible, quietly technical                                       |
| Data / labels / mono | **IBM Plex Mono**                                  | Stats, timestamps, role tags, event codes, achievement IDs — the "ledger" voice |

Headlines are set in the serif at generous size but **left-aligned**, not centered — a charter doesn't center itself. Numbers (member count, event count, paper count) are always in Plex Mono, small and quiet, next to their label — never oversized gradient numerals.

## 4. Layout principles

**The homepage/landing pattern has changed: centered and formal, not a split "SaaS hero."**

- **Header:** small Seal mark + wordmark on the left, a short flat text nav (4–5 items max) centered or right-aligned, one understated bordered "Member Login" link on the far right. No pill button, no glow.
- **Hero:** centered on the page, not split into a text column + decorative graphic. Order: small Plex Mono eyebrow (e.g. "DTU — AI SOCIETY") → the Seal, modestly sized → the society name or a short serif statement → one muted sentence of description → one or two bordered buttons, centered beneath. Nothing decorative fills empty space; empty space is allowed to just be empty.
- **Stats** (members/projects/events/papers): a simple centered row, Plex Mono numbers, small labels above or below — no cards, no icons, no gradient fills.
- **Footer / contact block:** mirrors the header's restraint — small bordered link-buttons for socials (Instagram, LinkedIn, Discord etc.), Plex Mono, 4px radius, `mist` border that turns `signal-violet` on hover. No filled pill buttons, no icon-only social row.
- **Hairline rules (1px)** as the primary structural device — section dividers, table rows, nav underlines — instead of cards-with-shadows and rounded glow borders.
- **Sharp-ish corners.** Radius stays small and consistent (4px) everywhere — buttons, cards, inputs. Nothing pill-shaped.
- **A fixed thin left "index" rail** on desktop for long inner pages (About, Legacy, Timeline) — like a table of contents in a bound record — rather than a floating pill navbar. The centered pattern above is specifically for the Home/landing page; inner pages can be left-aligned and denser once the visitor is past the "front door."
- Member portal: denser, ledger/table-like (Plex Mono for IDs, dates, statuses), because this is a workspace, not a landing page.

## 5. The Seal (signature element)

A single circular mark: a monogram ring around one hand-drawn dendritic branch line (commissioned/illustrated once, reused as an SVG — not a gradient "N." roundel).

- **Header:** small, sitting beside the wordmark — its permanent, quiet home, like a crest on a letterhead.
- **Home hero:** appears again, modestly sized (not a hero-filling graphic), in `signal-violet` line on `ink`, as the page's one deliberate brand moment.
- **Legacy page:** used as the recurring marker beside each past leadership era ("Sealed 2019–20").
- **Achievements:** a small stamped version marks verified/approved achievements — literally rendered like a stamp pressed at a slight rotation.
- **Member certificates/ID:** the Seal is the "official" mark, reinforcing the society metaphor.

This is the _only_ place we allow a slightly playful/illustrative touch — everything else stays disciplined. It should never be the largest element on a page.

## 6. Components

- **Buttons:** rectangular, 4px radius, `signal-violet` fill on `ink` / `graphite` fill on `bone`, no glow, no gradient. Hover = a 1px underline extends from the left, not a lightening/glow.
- **Badges/tags** (role tags, event category tags): small rectangular labels in Plex Mono, uppercase, letter-spaced, outlined in hairline rule — not filled pills.
- **Cards** (blog, event, achievement): flat surface (`ink-raised` or `bone`), 1px hairline border, no shadow. Metadata (date, author, role) always in Plex Mono, small, top or bottom of card.
- **Nav:** text links with a hairline underline on hover/active — no pill background, no icon decoration per link.
- **Footer / social links:** small bordered rectangular buttons (icon + label, e.g. "Instagram," "LinkedIn"), `mist` border by default, border turns `signal-violet` on hover — never a filled pill, never platform brand colours.
- **Avatars/photos:** square or slightly rounded (4px), no glow ring, no circular crop by default — square photos read more "record/ID" than "influencer portrait."
- **Section eyebrows** (small label above a headline, e.g. "What We Do"): plain Plex Mono, uppercase, letter-spaced, sitting above a hairline rule — no pill container, no coloured dot. The rule itself is the marker, not a fake status light.
- **Icon grids** (domains, features, services): every icon renders in a single colour — `mist` by default, switching to `signal-violet` only on hover/active. Never assign a different accent colour per item; that's the fastest way back to the banned "rainbow of icons" look.

## 7. Motion

Minimal and mechanical, not ambient/glowy:

- Page load: content reveals with a short, crisp fade + 8px rise — no particle drift, no glow pulses.
- The Seal "stamps" into place (a quick scale + slight rotate settle, like a stamp press) the first time it appears per page — used once, not on every scroll trigger.
- Nav underline draws in on hover (150ms), that's the only persistent micro-interaction.
- Respect `prefers-reduced-motion` — everything above degrades to a plain fade.

## 8. Voice

Plain, institutional, a little formal without being stiff — a society's own record book talking about itself, not a startup pitching itself. "Apply to join," not "Get Started 🚀." Achievements are stated factually ("Best Paper, ICLR Workshop, 2025"), not hyped.

## 9. RBAC visual language (member portal)

Roles are distinguished by a small Plex Mono tag + one accent, never a different whole theme:

| Role               | Tag colour                   |
| ------------------ | ---------------------------- |
| Member             | `graphite` / neutral outline |
| Core / Domain Lead | `signal-cyan` outline        |
| Office Bearer      | `signal-violet` filled       |
| Admin              | `signal-magenta` filled      |

Dashboards share the same layout shell (index rail + content); only the available sections/tags change per role — reinforcing "one society, different seats at the table," not four different apps.

---

**Next step:** build the token set (colour styles, text styles, the Seal component, 4px-radius button/card components) as the first Figma page before touching individual site pages, so every subsequent page pulls from this system rather than improvising.
