# Task Plan: LLM Wiki Schema & Structure Alignment

> **Goal**: Align actual project structure with documented schema (CLAUDE.md, wiki-structure.md) and fix inconsistencies

---

## 📋 Current State Analysis

### Documented Structure (wiki-structure.md, AGENTS.md)
```
src/content/docs/
├── ko/
│   ├── schema/
│   │   └── CLAUDE.md
│   │   └── templates/      # 페이지 템플릿 4종
│   │   └── prompts/        # 재사용 프롬프트
│   ├── wiki/
│   │   ├── entities/
│   │   ├── concepts/
│   │   ├── synthesis/
│   │   └── comparisons/
│   └── sources/
```

### Actual Structure
```
src/
├── schema/CLAUDE.md        # Schema contract (EXISTS, but at WRONG LOCATION per docs)
├── templates/              # Templates at ROOT level (EXISTS)
│   ├── entity.md
│   ├── concept.md
│   ├── synthesis.md
│   └── comparison.md
├── content/docs/ko/
│   ├── wiki/               # EXISTS with all 4 subdirs
│   │   ├── entities/       # Has 2025-07-16-gpt-4.md
│   │   ├── concepts/       # Has 2025-07-16-attention.md
│   │   ├── synthesis/      # Has index.md only
│   │   └── comparisons/    # Has index.md only
│   ├── sources/            # EXISTS
│   └── schema/             # MISSING - should contain CLAUDE.md + templates/ + prompts/
```

### Inconsistencies Found

| Item | Documented | Actual | Issue |
|------|------------|--------|-------|
| Schema CLAUDE.md location | `src/content/docs/ko/schema/CLAUDE.md` | `src/schema/CLAUDE.md` | Wrong location |
| Templates location | `src/content/docs/ko/schema/templates/` | `src/templates/` | Wrong location + inconsistent with docs |
| Wiki page filenames | `kebab-case.md` (e.g., `gpt-4.md`) | `YYYY-MM-DD-slug.md` (e.g., `2025-07-16-gpt-4.md`) | Templates say date-prefix, schema says kebab-case |
| Schema prompts | `schema/prompts/` (ingest, query, lint) | MISSING | Not created |
| Wiki index files | Not specified | Each wiki subdir has `index.md` | Undocumented pattern |

---

## ✅ Planned Tasks

### Phase 1: Create Missing Schema Structure (High Priority)
- [ ] Create `src/content/docs/ko/schema/` directory
- [ ] Copy `src/schema/CLAUDE.md` → `src/content/docs/ko/schema/CLAUDE.md` (as documented)
- [ ] Create `src/content/docs/ko/schema/templates/` directory
- [ ] Copy 4 templates from `src/templates/` → `src/content/docs/ko/schema/templates/`
- [ ] Create `src/content/docs/ko/schema/prompts/` directory
- [ ] Create prompt templates: `ingest.md`, `query.md`, `lint.md` (from CLAUDE.md §10 appendix)

### Phase 2: Resolve Template Location Conflict (Medium Priority)
- [ ] Decide: Keep templates at `src/templates/` (for Astro content collection exclusion) OR move to `src/content/docs/ko/schema/templates/`
- [ ] Update schema CLAUDE.md to reflect chosen location consistently
- [ ] Update wiki-structure.md to match

### Phase 3: Resolve Filename Convention (Medium Priority)
- [ ] Schema says: `kebab-case.md` (e.g., `gpt-4.md`)
- [ ] Templates say: `YYYY-MM-DD-slug.md` (e.g., `2025-07-16-gpt-4.md`)
- [ ] Actual files use: `YYYY-MM-DD-slug.md`
- [ ] **Decision needed**: Choose one convention and update all docs + existing files

### Phase 4: Documentation Sync (Low Priority)
- [ ] Update AGENTS.md wiki structure to match reality
- [ ] Update wiki-structure.md to match actual structure
- [ ] Update schema CLAUDE.md with any corrections
- [ ] Ensure index.md files in wiki subdirs are documented

---

## 📝 Notes
- Current wiki pages use date-prefixed filenames matching template comments
- Template frontmatter comments reference date-prefix convention
- Schema CLAUDE.md §7 says `kebab-case.md` - this may be outdated
- The `src/templates/` location might be intentional (outside Astro content collection for frontmatter validation avoidance)

---

## ✅ Verification Steps
- [ ] All documented paths exist
- [ ] No contradictory statements across CLAUDE.md, wiki-structure.md, AGENTS.md
- [ ] Templates are accessible from documented location
- [ ] Existing wiki pages still render correctly
- [ ] npm run build passes