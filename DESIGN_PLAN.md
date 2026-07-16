# LLM Wiki — Custom Starlight Theme Design Plan

> **Subject**: Korean-focused LLM knowledge base (3-layer: Sources → Wiki → Schema, date-based YYYY-MM-DD naming)
> **Audience**: ML researchers, engineers reading papers (Attention, GPT-4, Scaling Laws, Flash Attention, Chinchilla)
> **Single Job**: Comfortable extended reading of technical Korean+English content with instant architectural orientation

---

## 🎨 Token System

### Color (Semantic Layer Palette — Not Generic)

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| `--layer-source` | `#006d77` | `#4fd1c5` | **Sources layer** — teal/emerald (archive, immutable) |
| `--layer-wiki` | `#2563eb` | `#60a5fa` | **Wiki layer** — blue (active, LLM-maintained) |
| `--layer-schema` | `#7c3aed` | `#a78bfa` | **Schema layer** — violet (rules, contracts, stable) |
| `--layer-cross` | `#a21caf` | `#d946ef` | **Cross-references** — magenta (graph links) |
| `--bg-page` | `#fafafa` | `#0a0a0a` | Page background (near-white / near-black) |
| `--bg-surface` | `#ffffff` | `#171717` | Cards, code blocks, sidebar |
| `--bg-elevated` | `#f5f5f5` | `#1f1f1f` | Hover, striped tables |
| `--fg-primary` | `#171717` | `#fafafa` | Body text |
| `--fg-muted` | `#525252` | `#a3a3a3` | Meta, captions |
| `--fg-subtle` | `#a3a3a3` | `#525252` | Dividers, borders |
| `--accent-focus` | `#2563eb` | `#60a5fa` | Focus rings, links |
| `--badge-source-bg` | `#e0f7f9` | `#134e4a` | Source layer badges |
| `--badge-wiki-bg` | `#eff6ff` | `#1e3a5f` | Wiki layer badges |
| `--badge-schema-bg` | `#f5f3ff` | `#3b1f6b` | Schema layer badges |

> **No** generic green accent. Colors *mean* architectural layers.

### Typography

| Role | Font | Why |
|------|------|-----|
| **Display / Titles** | `Pretendard Variable` (wght 600-700) | Korean glyph harmony, variable font = single file |
| **Body / UI** | `Pretendard Variable` (wght 400) | Best-in-class Hangul+Latin, optimized for reading |
| **Code / Data** | `JetBrains Mono Variable` | Ligatures, distinct `0/O`, `1/l`, Korean-compatible |

> **Not** Inter + JetBrains. Pretendard is *the* Korean web font — designed for this exact mix.

**Type Scale** (fluid, clamp):
```css
--step--1: clamp(0.75rem, 0.72rem + 0.15vw, 0.875rem);   /* 12-14px captions */
--step-0:  clamp(0.875rem, 0.84rem + 0.18vw, 1rem);       /* 14-16px body */
--step-1:  clamp(1.125rem, 1.05rem + 0.38vw, 1.375rem);   /* 18-22px h4 */
--step-2:  clamp(1.375rem, 1.25rem + 0.63vw, 1.875rem);   /* 22-30px h3 */
--step-3:  clamp(1.75rem, 1.5rem + 1.25vw, 2.75rem);      /* 28-44px h2 */
--step-4:  clamp(2.25rem, 1.8rem + 2.25vw, 4rem);         /* 36-64px h1 */
```

**Line Heights**: Body `1.75` (Hangul needs more), Headings `1.25`, Code `1.6`
**Measure**: `72ch` max-width (≈ Korean 40-45 chars + Latin comfort)

### Spacing Scale (4px base)
```css
--space-1: 4px;  --space-2: 8px;  --space-3: 12px;  --space-4: 16px;
--space-5: 24px; --space-6: 32px; --space-7: 48px;  --space-8: 64px;
```

### Radius
```css
--radius-sm: 4px;   --radius-md: 8px;  --radius-lg: 12px;  --radius-full: 9999px;
```

---

## 🏗 Layout Concept

### Page Anatomy (Desktop ≥ 1024px)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  NAV BAR (64px)  Logo | Search | Theme | Lang | GitHub                      │
├──────────────┬──────────────────────────────────────────────────┬───────────┤
│              │                                                  │           │
│   SIDEBAR    │           MAIN CONTENT (72ch max)                │  RIGHT    │
│   (280px)    │                                                  │  SIDEBAR  │
│              │  ┌────────────────────────────────────────────┐  │  (240px)  │
│  [Layer      │  │  LAYER BADGE STRIP                         │  │           │
│   Colors]    │  │  [Source/Wiki/Schema]  Type  2025-07-16    │  │  [TOC]    │
│              │  ├────────────────────────────────────────────┤  │  [Cross-  │
│  ▼ Sources   │  │  PAGE TITLE                                │  │   Refs]   │
│    src-001   │  │  Description                               │  │           │
│    src-002   │  ├────────────────────────────────────────────┤  │  Related  │
│              │  │  CONTENT                                   │  │  Entities │
│  ▼ Wiki      │  │                                            │  │  Related  │
│    Entities  │  │  Source Citation Cards (emerald bordered)  │  │  Concepts │
│      🟦 GPT-4│  │  Cross-reference inline [[links]]          │  │  Cited In │
│    Concepts  │  │                                            │  │           │
│    Synthesis │  └────────────────────────────────────────────┘  │           │
│    Compare   │                                                  │           │
│              │                                                  │           │
│  ▼ Schema    │                                                  │           │
│    CLAUDE.md │                                                  │           │
│    Templates │                                                  │           │
└──────────────┴──────────────────────────────────────────────────┴───────────┘
```

### Mobile (< 768px)
- Nav: hamburger → drawer sidebar
- Right sidebar: collapsible accordion at bottom of content
- Layer badge strip: stacked pills, horizontal scroll
- Content width: 100% with safe padding

### Index Page (Special Layout)
- Vertical timeline (left line, right cards)
- Cards colored by layer badge
- Date markers every month
- "Schema Version" milestone markers

---

## ✨ Signature Elements (The One Memorable Thing)

### 1. Layer Badge Strip (Every Content Page)
```
┌─────────────────────────────────────────────────────────────────┐
│  ████████  WIKI  ████████████  ENTITY  ████████████  2025-07-16  │
│  (blue)         (blue text)        (gray)           (gray text)  │
└─────────────────────────────────────────────────────────────────┘
```
- **Layer** = colored pill (source=teal, wiki=blue, schema=violet)
- **Type** = entity/concept/synthesis/comparison/source/template/rule
- **Date** = YYYY-MM-DD from filename
- Instant orientation: "Where am I in the architecture? What kind of page? How fresh?"

### 2. Source Citation Cards (Wiki Pages Only)
```markdown
┌────────────────────────────────────────────────────────────────┐
│  📄  Attention Is All You Need                          src-001│
│  Vaswani et al. • NeurIPS 2017 • foundational, attention      │
│  ────────────────────────────────────────────────────────────  │
│  Introduces Transformer architecture, multi-head attention...  │
└────────────────────────────────────────────────────────────────┘
```
- Emerald left border (`--layer-source`)
- Paper metadata parsed from frontmatter
- Click → opens source page

### 3. Cross-Reference Sidebar (Right, Desktop)
- Auto-generated from `[[WikiLink]]` syntax in content
- Three sections: **Related Entities**, **Related Concepts**, **Cited In**
- Each item shows layer badge + type + date
- Click → navigates, highlights target

### 4. Reading Mode Toggle (Top-right of content)
- Single button: "읽기 모드" / "Reading Mode"
- Effects: hide sidebar, max-width 90ch, line-height 1.85, font-size +1 step, hide TOC, dim chrome
- Persists in localStorage
- **For deep paper reading** — the core use case

### 5. Date Timeline (Index Page)
```
2025-07  ────────────────────────────────────────
         🟦 GPT-4 (entity)       🟦 Transformer (entity)
         🟦 Attention (concept)  🟦 Flash Attention 3 (source)
         🟣 CLAUDE.md (schema)   🟣 entity.md (template)

2025-06  ────────────────────────────────────────
         🟦 Scaling Laws (concept)  🟦 Chinchilla (source)
```
- Visual accumulation of knowledge over time
- Layer colors = instant architectural reading

---

## 🧩 Starlight Customization Map

| Starlight Component | Override Strategy | File |
|---|---|---|
| **Sidebar** | Full replacement — layer-colored sections, type icons | `src/components/Sidebar.astro` |
| **PageHeader** | Full replacement — Layer Badge Strip + Reading Mode | `src/components/PageHeader.astro` |
| **PageContent** | CSS-only (custom.css) — citation cards, cross-ref styles | `src/styles/custom.css` |
| **TableOfContents** | Slot injection — add cross-ref sections | `src/components/TableOfContents.astro` |
| **Footer** | Minimal — schema version, last lint, log link | `src/components/Footer.astro` |
| **Search** | Keep Pagefind — add layer filter UI | `src/components/SearchFilter.astro` |

**Starlight config additions** (`starlight.config.ts`):
```ts
components: {
  Sidebar: './src/components/Sidebar.astro',
  PageHeader: './src/components/PageHeader.astro',
  PageContent: './src/components/PageContent.astro',
  TableOfContents: './src/components/TableOfContents.astro',
  Footer: './src/components/Footer.astro',
  Search: './src/components/SearchFilter.astro',
}
```

---

## 📝 Content Adaptations Needed

### Frontmatter Extensions (for signature features)
```yaml
# Wiki pages (entities/concepts/synthesis/comparison)
layer: "wiki"           # sources | wiki | schema
type: "entity"          # entity | concept | synthesis | comparison | source | template | rule
sources: [src-001, src-002]  # for citation cards
related_entities: [gpt-4, transformer]
related_concepts: [attention, scaling-laws]
cited_in: [comparison-2025-07-16]

# Source pages
layer: "sources"
type: "source"
venue: "NeurIPS"
year: 2017
authors: ["Vaswani", "Shazeer", ...]
tags: ["foundational", "attention", "transformer"]

# Schema pages
layer: "schema"
type: "rule" | "template" | "prompt"
version: "2025-07-16"
```

### Markdown Extensions
- `[[EntityName]]` → cross-ref link (sidebar + inline)
- `{{source:src-001}}` → inline citation chip
- `>!SOURCE src-001` → full citation card (block)

---

## ✅ Self-Critique Checklist

| Criteria | Pass? | Notes |
|---|---|---|
| Reflects 3-layer architecture? | ✅ | Colors, badges, sidebar sections, citation cards |
| Date-based organization visible? | ✅ | Badge strip, timeline index, filename parsing |
| Korean reading comfort? | ✅ | Pretendard Variable, 1.75 lh, 72ch, reading mode |
| Not generic Starlight? | ✅ | Layer colors ≠ generic accent; badge strip unique |
| Not AI-default palette? | ✅ | No cream/terracotta, no dark/acid, no broadsheet |
| One signature element? | ✅ | Layer Badge Strip (orienting, architectural) |
| Restraint elsewhere? | ✅ | Near-B/W neutrals, minimal chrome |

---

## 🚀 Implementation Order

1. **Tokens & Base CSS** — `custom.css` with all CSS custom properties
2. **Typography** — Pretendard Variable import, type scale, body styles
3. **Sidebar Component** — Layer-colored, type icons, collapsible
4. **PageHeader Component** — Layer Badge Strip + Reading Mode toggle
5. **Citation Cards CSS** — Source card styling, cross-ref chips
6. **Cross-Ref Sidebar** — Right sidebar component, auto-populated
7. **Index Timeline** — Special layout for `index.md`
8. **Reading Mode** — CSS class + localStorage persistence
9. **Search Filter** — Layer filter chips
10. **Polish** — Focus states, reduced motion, print styles