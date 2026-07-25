# LLM Wiki - Modern Frontend Design Specification

## Project Overview

**Product**: LLM Wiki - A Korean knowledge base for Large Language Models
**Current Stack**: Quartz v5 (SSG), Preact, SCSS, TypeScript
**Target**: Transform from standard Quartz design → Modern, distinctive frontend design
**Audience**: Korean developers, ML engineers, researchers, tech enthusiasts
**Primary Job**: Browse, search, and deep-dive into LLM papers, concepts, tools, and workflows
**Emotional Tone**: Intellectually rigorous yet accessible, clean but not sterile, trustworthy authority

---

## Design Direction: "Technical Editorial"

A precise, content-forward aesthetic inspired by technical publications (ACM Digital Library, arXiv, Distill.pub) combined with modern developer tooling (Linear, Vercel, GitHub). Not a generic SaaS dashboard, not a blog theme.

**Key Differentiators**:
- Typography-led hierarchy with clear information architecture
- Purposeful color: accent used only for interaction/emphasis, never decoration
- Density appropriate for repeated reference use (scannable, not spacious)
- Subtle motion only for state feedback, never delight-for-delight's-sake
- Dark mode as first-class, not inverted afterthought

---

## Color System

### Semantic Color Roles (CSS Variables)

```css
:root {
  /* === Base Surfaces === */
  --surface-0: #0a0a0b;      /* Deep background (dark) */
  --surface-1: #141416;      /* Card/panel background */
  --surface-2: #1c1c1f;      /* Elevated/sidebar background */
  --surface-3: #26262a;      /* Hover/active states */
  
  /* === Light Mode Surfaces === */
  --surface-0-l: #fafafa;
  --surface-1-l: #ffffff;
  --surface-2-l: #f4f4f5;
  --surface-3-l: #e4e4e7;
  
  /* === Text Hierarchy === */
  --text-primary:   #fafafa;   /* Headlines, primary content */
  --text-secondary: #a1a1aa;   /* Body, descriptions */
  --text-muted:     #71717a;   /* Meta, timestamps, disabled */
  --text-inverse:   #0a0a0b;   /* On accent surfaces */
  
  /* Light mode text */
  --text-primary-l:   #0a0a0b;
  --text-secondary-l: #3f3f46;
  --text-muted-l:     #71717a;
  --text-inverse-l:   #fafafa;
  
  /* === Accent (Single, Purposeful) === */
  --accent:         #00d4aa;   /* Primary actions, links, focus */
  --accent-hover:   #00eeb8;
  --accent-muted:   rgba(0, 212, 170, 0.12); /* Badge backgrounds */
  --accent-strong:  #00b894;   /* Active/pressed */
  
  /* === Semantic Status === */
  --success:   #22c55e;
  --warning:   #f59e0b;
  --error:     #ef4444;
  --info:      #3b82f6;
  
  /* === Borders & Dividers === */
  --border-subtle:  rgba(255,255,255,0.06);
  --border-default: rgba(255,255,255,0.12);
  --border-strong:  rgba(255,255,255,0.20);
  
  --border-subtle-l:  rgba(0,0,0,0.06);
  --border-default-l: rgba(0,0,0,0.10);
  --border-strong-l:  rgba(0,0,0,0.15);
}
```

### Color Budget (Strict)
- **Accent (#00d4aa)**: Max 2 simultaneous visible instances per viewport (CTA + one interactive)
- **Status colors**: Only in inline badges, toasts, validation — never in structural chrome
- **No decorative gradients, no purple-blue AI gradients**

---

## Typography

### Font Stack
```css
/* Headers: Distinctive, technical but warm */
--font-display: "Space Grotesk", "Noto Sans KR", system-ui, sans-serif;

/* Body: High readability at small sizes, Korean-optimized */
--font-body: "IBM Plex Sans", "Noto Sans KR", system-ui, sans-serif;

/* Code/Mono: Technical precision */
--font-mono: "JetBrains Mono", "IBM Plex Mono", "Noto Sans Mono KR", monospace;

/* Korean fallback handled by Noto Sans KR in all stacks */
```

### Type Scale (Fluid, clamp-based)
```css
:root {
  --text-xs:    clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem);   /* 11-12px */
  --text-sm:    clamp(0.8125rem, 0.75rem + 0.3125vw, 0.875rem); /* 13-14px */
  --text-base:  clamp(0.9375rem, 0.875rem + 0.3125vw, 1rem);     /* 15-16px */
  --text-lg:    clamp(1.0625rem, 1rem + 0.3125vw, 1.125rem);     /* 17-18px */
  --text-xl:    clamp(1.25rem, 1.125rem + 0.625vw, 1.5rem);      /* 20-24px */
  --text-2xl:   clamp(1.5rem, 1.25rem + 1.25vw, 2rem);           /* 24-32px */
  --text-3xl:   clamp(1.875rem, 1.5rem + 1.875vw, 3rem);         /* 30-48px */
  --text-4xl:   clamp(2.25rem, 1.75rem + 2.5vw, 4rem);           /* 36-64px */
}
```

### Weight & Line Heights
```css
:root {
  --weight-normal:  400;
  --weight-medium:  500;
  --weight-semibold: 600;
  --weight-bold:    700;
  
  --leading-tight:   1.15;  /* Headlines */
  --leading-snug:    1.35;  /* Subheads, UI labels */
  --leading-normal:  1.65;  /* Body text */
  --leading-relaxed: 1.8;   /* Long-form reading */
  --leading-code:    1.6;   /* Code blocks */
}
```

### Heading Styles
```css
h1 { font: var(--weight-bold) var(--text-4xl)/var(--leading-tight) var(--font-display); letter-spacing: -0.02em; }
h2 { font: var(--weight-semibold) var(--text-3xl)/var(--leading-tight) var(--font-display); letter-spacing: -0.015em; }
h3 { font: var(--weight-semibold) var(--text-2xl)/var(--leading-snug) var(--font-display); }
h4 { font: var(--weight-medium) var(--text-xl)/var(--leading-snug) var(--font-display); }
h5, h6 { font: var(--weight-medium) var(--text-lg)/var(--leading-snug) var(--font-display); }

/* Body */
p, li, td, dd { font: var(--weight-normal) var(--text-base)/var(--leading-normal) var(--font-body); }
small, .text-muted { font: var(--weight-normal) var(--text-sm)/var(--leading-normal) var(--font-body); }

/* Code */
code, pre, kbd, samp { font: var(--weight-normal) var(--text-sm)/var(--leading-code) var(--font-mono); }
```

---

## Spacing System

```css
:root {
  --space-0:   0;
  --space-1:   0.25rem;  /* 4px */
  --space-2:   0.5rem;   /* 8px */
  --space-3:   0.75rem;  /* 12px */
  --space-4:   1rem;     /* 16px */
  --space-5:   1.25rem;  /* 20px */
  --space-6:   1.5rem;   /* 24px */
  --space-8:   2rem;     /* 32px */
  --space-10:  2.5rem;   /* 40px */
  --space-12:  3rem;     /* 48px */
  --space-16:  4rem;     /* 64px */
  --space-20:  5rem;     /* 80px */
  --space-24:  6rem;     /* 96px */
}
```

**Rhythm Rule**: Vertical spacing between sibling elements uses scale steps (3→4→5→6→8). Never arbitrary values.

---

## Layout & Grid

### Breakpoints
```css
:root {
  --bp-sm:  480px;   /* Mobile */
  --bp-md:  768px;   /* Tablet */
  --bp-lg:  1024px;  /* Desktop */
  --bp-xl:  1280px;  /* Wide desktop */
  --bp-2xl: 1536px;  /* Ultra-wide */
}
```

### Content Widths
```css
:root {
  --width-prose:   42rem;   /* 672px - optimal reading width */
  --width-wide:    64rem;   /* 1024px - tables, code, diagrams */
  --width-full:    100%;    /* Full viewport */
  --width-sidebar: 16rem;   /* 256px - navigation panel */
  --width-toc:     12rem;   /* 192px - table of contents */
}
```

### Layout Grid (CSS Grid)
```css
.page-grid {
  display: grid;
  grid-template-columns: var(--width-sidebar) 1fr var(--width-toc);
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "sidebar header toc"
    "sidebar main toc"
    "sidebar footer toc";
  gap: var(--space-6);
  min-height: 100vh;
}

@media (max-width: 1024px) {
  .page-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "footer";
  }
  .sidebar { display: none; } /* Becomes drawer */
  .toc { display: none; }     /* Becomes bottom sheet */
}
```

### Sidebar Drawer (Mobile)
- Slide-in from left, 280px wide, backdrop blur
- Triggered by hamburger in header
- ESC to close, click backdrop to close
- Focus trap when open

---

## Component Specifications

### 1. Header / Top Bar
```tsx
// Structure
<header class="site-header">
  <div class="header-left">
    <Logo />           // SVG mark + "LLM Wiki"
    <NavTabs />        // [개요 | 논문 | 개념 | 도구 | 워크플로우]
  </div>
  <div class="header-center">
    <Search />         // Command+k style, full-width on focus
  </div>
  <div class="header-right">
    <ThemeToggle />
    <LanguageSwitcher />
    <GitHubLink />
  </div>
</header>

// States
- Default: transparent, border-bottom on scroll
- Scrolled: backdrop-blur + surface-1 bg + border
- Search focus: expands, overlay backdrop
- Mobile: hamburger + logo + theme toggle only
```

### 2. Sidebar Navigation (Explorer)
```tsx
// Desktop: Fixed left panel, sticky full-height
// Mobile: Drawer

<nav class="sidebar" aria-label="주 메뉴">
  <Section title="시작하기">
    <NavItem href="/ko/getting-started" icon={BookOpen}>시작 가이드</NavItem>
    <NavItem href="/ko/workflow" icon={GitBranch}>워크플로우</NavItem>
  </Section>
  
  <Section title="위키">
    <NavItem href="/ko/wiki/concepts" icon={Brain}>핵심 개념</NavItem>
    <NavItem href="/ko/wiki/entities" icon={FileText}>엔티티/논문</NavItem>
    <NavItem href="/ko/wiki/sources" icon={Database}>소스 문서</NavItem>
  </Section>
  
  <Section title="참조">
    <NavItem href="/ko/tools" icon={Wrench}>도구</NavItem>
    <NavItem href="/ko/resources" icon={Link2}>리소스</NavItem>
    <NavItem href="/ko/schema" icon={FileCode}>스키마</NavItem>
  </Section>
  
  <Section title="메타">
    <NavItem href="/ko/log" icon={History}>변경 로그</NavItem>
  </Section>
</nav>

// Active state: accent left border + accent text
// Hover: surface-2 bg
// Collapsible sections with chevron
```

### 3. Table of Contents (Right Sidebar)
```tsx
// Desktop: Fixed right panel, sticky
// Mobile: Bottom sheet trigger from floating button

<aside class="toc" aria-label="본문 목차">
  <TocHeader>
    <h3>목차</h3>
    <Button variant="ghost" size="sm">접기</Button>
  </TocHeader>
  <TocList>
    {headings.map(h => (
      <TocLink 
        level={h.depth}
        href={`#${h.id}`}
        active={h.id === activeId}
      >
        {h.text}
      </TocLink>
    ))}
  </TocList>
  <TocProgress /> // Thin accent line showing scroll progress
</aside>

// Indentation per heading level (2px per level)
// Active: accent text + accent left dot
// Smooth scroll on click
```

### 4. Main Content Area
```tsx
<main class="content" role="main">
  <ArticleHeader>
    <Breadcrumbs />
    <CategoryBadges />  // e.g., [논문] [Transformer] [2025]
    <h1>{title}</h1>
    <ArticleMeta>
      <Author />
      <UpdatedDate />
      <ReadingTime />
      <ConfidenceBadge /> // High/Medium/Low
    </ArticleMeta>
    <ActionBar>
      <Button variant="outline">편집 제안</Button>
      <Button variant="ghost">공유</Button>
      <ThemeToggleArticle />
    </ActionBar>
  </ArticleHeader>
  
  <ArticleBody>
    {content} // Markdown rendered with custom components
  </ArticleBody>
  
  <ArticleFooter>
    <TagList />
    <Backlinks />
    <RelatedPages />
  </ArticleFooter>
</main>

// Prose width constrained to var(--width-prose)
// Code blocks: var(--width-wide) with horizontal scroll
// Images: max-width 100%, rounded corners (8px)
// Tables: responsive wrapper with horizontal scroll
```

### 5. Search (Command Palette Style)
```tsx
// Cmd+K / Ctrl+K to open
// Full-screen overlay on desktop, bottom sheet on mobile

<SearchDialog open={isOpen} onClose={close}>
  <SearchInput 
    placeholder="논문, 개념, 도구 검색... (⌘K)"
    autoFocus
    value={query}
    onChange={setQuery}
  />
  <SearchResults>
    {results.map(r => (
      <SearchResultItem
        key={r.id}
        title={r.title}
        description={r.description}
        category={r.category} // 논문 | 개념 | 도구 | 워크플로우
        tags={r.tags}
        href={r.url}
      />
    ))}
    {results.length === 0 && <EmptyState query={query} />}
  </SearchResults>
  <SearchFooter>
    <kbd>⌘</kbd><kbd>K</kbd> 닫기 · <kbd>↑</kbd><kbd>↓</kbd> 탐색 · <kbd>Enter</kbd> 열기
  </SearchFooter>
</SearchDialog>

// Result ranking: exact title match > heading match > content match
// Categories visually grouped with section headers
// Keyboard navigation fully supported
```

### 6. Article Meta Components

**Confidence Badge**
```tsx
<Badge variant="confidence" value={confidence}>
  // High: green dot + "높음"
  // Medium: amber dot + "보통"  
  // Low: red dot + "낮음"
</Badge>
```

**Reading Time**
```tsx
<ReadingTime words={wordCount} />
// "12분 읽기" format
```

**Category Badges**
```tsx
<BadgeGroup>
  <Badge variant="category" type="paper">논문</Badge>
  <Badge variant="category" type="concept">개념</Badge>
  <Badge variant="category" type="tool">도구</Badge>
  <Badge variant="category" type="workflow">워크플로우</Badge>
</BadgeGroup>
// Color-coded by type, consistent across site
```

### 7. Code Blocks
```tsx
<CodeBlock 
  language="python"
  filename="attention.py"
  highlightedLines={[10, 15, 16]}
>
{
  `def scaled_dot_product_attention(q, k, v, mask=None):
    d_k = q.size(-1)
    scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(d_k)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    attn = F.softmax(scores, dim=-1)
    return torch.matmul(attn, v)`
}
</CodeBlock>

// Features:
// - Line numbers (toggleable)
// - Copy button (top-right)
// - Filename tab
// - Language badge
// - Line highlighting via data-line attribute
// - Horizontal scroll on overflow
// - Syntax highlighting: Shiki (GitHub light/dark themes)
```

### 8. Callouts / Admonitions
```tsx
// Types: note, tip, warning, danger, info, abstract, quote
<Callout type="tip" title="핵심 포인트">
  Attention is all you need.
</Callout>

// Visual: Left accent border (3px) + icon + muted background
// type="danger": error color border/bg
// type="warning": warning color border/bg
// type="note/info": accent color border/bg
// type="abstract/quote": muted border, no icon
```

### 9. Graph View
```tsx
// Interactive force-directed graph
// Nodes: papers, concepts, entities
// Edges: citations, relationships, co-occurrence
// Controls: filter by type, search, zoom, reset
// Node hover: tooltip with preview
// Node click: navigate to page
// Layout: dagre for hierarchical, force for exploratory
```

### 10. Footer
```tsx
<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <Logo />
      <p>LLM 연구자를 위한 한국어 지식 베이스</p>
    </div>
    <nav class="footer-nav">
      <column>
        <h4>위키</h4>
        <link>핵심 개념</link>
        <link>논문/엔티티</link>
        <link>소스 문서</link>
      </column>
      <column>
        <h4>도구</h4>
        <link>도구 모음</link>
        <link>리소스</link>
        <link>스키마</link>
      </column>
      <column>
        <h4>메타</h4>
        <link>변경 로그</link>
        <link>기여하기</link>
        <link>라이선스</link>
      </column>
    </nav>
  </div>
  <div class="footer-bottom">
    <Copyright />
    <SocialLinks />
    <BuildInfo /> // "Built with Quartz 5 · Deployed on GitHub Pages"
  </div>
</footer>
```

---

## Motion & Interaction

### Transitions
```css
:root {
  --duration-instant:  0ms;
  --duration-fast:     100ms;  /* Hover, focus */
  --duration-normal:   200ms;  /* Panel open/close, tab switch */
  --duration-slow:     300ms;  /* Drawer, modal, page transition */
  --duration-slower:   500ms;  /* Complex state changes */
  
  --ease-out:     cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Motion Rules
- **Respect `prefers-reduced-motion`**: All transitions disabled
- **No layout-shifting animations**: Only opacity, transform, color
- **Stagger**: Max 50ms delay between list items
- **Page transitions (SPA)**: 150ms fade + 100ms slide
- **Search overlay**: 200ms backdrop blur + 150ms scale
- **Drawer/sheet**: 250ms transform + backdrop

---

## Responsive Behavior

| Component | Mobile (<768px) | Tablet (768-1024px) | Desktop (>1024px) |
|-----------|-----------------|---------------------|-------------------|
| Header | Hamburger + logo + theme | Full tabs, condensed | Full tabs |
| Sidebar | Drawer (slide-in) | Collapsible rail | Fixed panel |
| TOC | Bottom sheet (floating btn) | Hidden (floating btn) | Fixed panel |
| Search | Full-screen bottom sheet | Centered modal | Centered modal |
| Content | Full width, 1rem padding | Prose width centered | Prose + sidebars |
| Code blocks | Horizontal scroll | Horizontal scroll | Wide (up to 1024px) |
| Tables | Horizontal scroll | Horizontal scroll | Full width |
| Graph | Full-screen modal | Full-screen modal | Embedded in page |

---

## Accessibility (WCAG 2.1 AA)

### Must-Have
- [ ] Semantic HTML5 structure (header, nav, main, aside, footer, article, section)
- [ ] Heading hierarchy (h1→h2→h3, no skipping)
- [ ] Focus visible: `outline: 2px solid var(--accent); outline-offset: 2px;`
- [ ] Skip to main content link (first focusable element)
- [ ] Color contrast: 4.5:1 normal text, 3:1 large text/UI
- [ ] Keyboard navigation: all interactive elements reachable and operable
- [ ] ARIA labels on icon-only buttons, complex widgets
- [ ] Live regions for search results, toast notifications
- [ ] `prefers-reduced-motion` respected
- [ ] `prefers-color-scheme` respected (system default)

### Testing Checklist
- [ ] NVDA + Firefox (Windows)
- [ ] VoiceOver + Safari (macOS/iOS)
- [ ] Keyboard-only navigation flow
- [ ] Zoom 200% (no horizontal scroll)
- [ ] High contrast mode (Windows)
- [ ] Color blindness simulation (protanopia, deuteranopia, tritanopia)

---

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| INP (Interaction to Next Paint) | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| FCP (First Contentful Paint) | < 1.8s |
| TBT (Total Blocking Time) | < 200ms |
| JS Bundle (gzipped) | < 80KB |
| CSS (gzipped) | < 20KB |

### Optimization Strategies
- Critical CSS inlined
- Fonts: `font-display: swap`, preload key fonts
- Images: WebP/AVIF, responsive sizes, lazy loading
- Code splitting: search, graph, heavy components lazy-loaded
- Service worker for offline caching (SPA mode)
- Preconnect to font CDN

---

## Dark Mode Implementation

```css
/* System preference default, user toggle overrides */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Dark mode variables */
  }
}

:root[data-theme="light"] {
  /* Light mode variables */
}

/* Transition on theme change */
* {
  transition: background-color var(--duration-normal) var(--ease-out),
              border-color var(--duration-normal) var(--ease-out),
              color var(--duration-fast) var(--ease-out);
}

/* Disable transition during initial load to prevent flash */
html.theme-loading * {
  transition: none !important;
}
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] CSS variable system (colors, spacing, typography)
- [ ] Reset/normalize + base styles
- [ ] Theme switching (CSS + JS)
- [ ] Font loading optimization
- [ ].Layout grid system

### Phase 2: Core Components (Week 2)
- [ ] Header + navigation
- [ ] Sidebar (desktop drawer + mobile drawer)
- [ ] Table of contents
- [ ] Footer
- [ ] Search overlay (UI only, no indexing yet)

### Phase 3: Content Components (Week 3)
- [ ] Article header/meta/body/footer
- [ ] Code blocks (with Shiki)
- [ ] Callouts/admonitions
- [ ] Tables, images, footnotes
- [ ] Breadcrumbs, tag lists, backlinks

### Phase 4: Advanced Features (Week 4)
- [ ] Search indexing + results
- [ ] Graph view (cytoscape or d3-force)
- [ ] SPA navigation transitions
- [ ] Mobile drawer/sheet animations
- [ ] Keyboard shortcuts (Cmd+K, /, etc.)

### Phase 5: Polish & QA (Week 5)
- [ ] Accessibility audit + fixes
- [ ] Performance audit + optimization
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Dark mode edge cases
- [ ] Content regression testing (all existing MD files render correctly)

---

## Migration Strategy

### Backward Compatibility
- Keep existing Quartz config functional during transition
- New design as opt-in via `quartz.config.yaml` theme flag
- Component-by-component replacement (not big bang)
- Fallback to Quartz defaults for unbuilt components

### Rollout
1. Deploy to preview branch
2. Visual regression testing (Chromatic or similar)
3. Stakeholder review on preview
4. Gradual rollout: 10% → 50% → 100%
5. Monitor Core Web Vitals post-launch

---

## Success Criteria

| Criterion | Measurement |
|-----------|-------------|
| Visual distinctiveness | User can identify "LLM Wiki" from screenshot alone |
| Task completion | Time-to-find-paper < 15s (search + navigation) |
| Readability | Avg session duration on article pages ↑ 20% |
| Performance | LCP < 2.5s, INP < 200ms on 75th percentile |
| Accessibility | 0 critical/major aXe violations |
| Dark mode parity | 100% feature parity, no visual bugs |
| Mobile usability | 0 horizontal scroll, touch targets ≥ 44px |

---

## Open Questions

1. **Search backend**: Continue with Quartz's client-side search or migrate to Pagefind/Meilisearch?
2. **Graph visualization**: Cytoscape.js (heavier) vs custom Canvas/D3 (lighter)?
3. **Comments**: Enable Giscus or keep disabled?
4. **Analytics**: Keep Plausible or add custom events for search/graph interactions?
5. **Internationalization**: English version planned? Structure supports it?

---

## Appendix: Component Inventory (Current → New)

| Current Quartz Component | New Design Component | Status |
|--------------------------|---------------------|--------|
| `@quartz-community/explorer` | `SidebarNav` | Replace |
| `@quartz-community/graph` | `GraphView` | Replace |
| `@quartz-community/search` | `CommandSearch` | Replace |
| `@quartz-community/backlinks` | `BacklinksPanel` | Replace |
| `@quartz-community/article-title` | `ArticleHeader` | Replace |
| `@quartz-community/content-meta` | `ArticleMeta` | Replace |
| `@quartz-community/tag-list` | `TagCloud` | Replace |
| `@quartz-community/page-title` | `PageTitle` | Replace |
| `@quartz-community/darkmode` | `ThemeToggle` | Replace |
| `@quartz-community/reader-mode` | `ReaderMode` | Replace |
| `@quartz-community/breadcrumbs` | `Breadcrumbs` | Replace |
| `@quartz-community/footer` | `SiteFooter` | Replace |
| `@quartz-community/note-properties` | `FrontmatterDisplay` | Replace |
| `@quartz-community/table-of-contents` | `TableOfContents` | Replace |
| (Custom) | `ConfidenceBadge` | New |
| (Custom) | `CategoryBadges` | New |
| (Custom) | `ReadingTime` | New |
| (Custom) | `SearchResultItem` | New |

---

*Document version: 1.0*
*Author: Design System*
*Last updated: 2026-07-25*