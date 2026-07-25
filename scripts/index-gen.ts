#!/usr/bin/env tsx
/**
 * Index Generator
 * Regenerates the master index.md catalog from all wiki pages
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs'
import { join, relative, extname } from 'path'
import yaml from 'yaml'

interface PageMeta {
  path: string
  slug: string
  title: string
  description: string
  type: string
  entity_type?: string
  sources: string[]
  tags: string[]
  last_updated: string
  confidence: 'high' | 'medium' | 'low'
}

function findMdFiles(dir: string, baseDir: string): string[] {
  const files: string[] = []
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...findMdFiles(full, baseDir))
    } else if (extname(entry.name) === '.md') {
      files.push(relative(baseDir, full))
    }
  }
  return files
}

function parsePage(filePath: string): PageMeta | null {
  const content = readFileSync(filePath, 'utf-8')
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  try {
    const fm = yaml.parse(match[1])
    // Generate web slug from file path
    const slug = filePath
      .replace(/.*content[/\\]ko[/\\]/, '')
      .replace(/\.md$/, '')
      .replace(/\\/g, '/')
    return {
      path: filePath,
      slug,
      title: fm.title || 'Untitled',
      description: fm.description || '',
      type: fm.type || 'unknown',
      entity_type: fm.entity_type,
      sources: fm.sources || [],
      tags: fm.tags || [],
      last_updated: fm.last_updated || 'unknown',
      confidence: fm.confidence || 'low',
      author: fm.author,
      year: fm.year,
      collected_date: fm.collected_date,
    }
  } catch {
    return null
  }
}

function formatDate(dateStr: string): string {
  if (dateStr === 'unknown') return '—'
  return dateStr
}

function confidenceBadge(conf: string): string {
  switch (conf) {
    case 'high': return '✅'
    case 'medium': return '⚠️'
    case 'low': return '❓'
    default: return '❓'
  }
}

function typeLabel(type: string, entityType?: string): string {
  if (type === 'entity' && entityType) return entityType
  const labels: Record<string, string> = {
    entity: 'entity',
    concept: 'concept',
    synthesis: 'synthesis',
    comparison: 'comparison',
  }
  return labels[type] || type
}

function main() {
  const contentRoot = join(process.cwd(), 'content/ko')
  const wikiRoot = join(contentRoot, 'wiki')
  const sourcesRoot = join(contentRoot, 'sources')

  console.log('📊 Generating index...')

  // --- Entities ---
  const entityFiles = findMdFiles(join(wikiRoot, 'entities'), contentRoot)
  const entities: PageMeta[] = []

  for (const f of entityFiles) {
    if (f.endsWith('/index.md')) continue
    const meta = parsePage(join(contentRoot, f))
    if (meta && meta.type === 'entity') {
      entities.push(meta)
    }
  }

  // --- Concepts ---
  const conceptFiles = findMdFiles(join(wikiRoot, 'concepts'), contentRoot)
  const concepts: PageMeta[] = []

  for (const f of conceptFiles) {
    if (f.endsWith('/index.md')) continue
    const meta = parsePage(join(contentRoot, f))
    if (meta && meta.type === 'concept') {
      concepts.push(meta)
    }
  }

  // --- Syntheses ---
  const synthesisFiles = findMdFiles(join(wikiRoot, 'synthesis'), contentRoot)
  const syntheses: PageMeta[] = []

  for (const f of synthesisFiles) {
    if (f.endsWith('/index.md')) continue
    const meta = parsePage(join(contentRoot, f))
    if (meta && meta.type === 'synthesis') {
      syntheses.push(meta)
    }
  }

  // --- Comparisons ---
  const comparisonFiles = findMdFiles(join(wikiRoot, 'comparisons'), contentRoot)
  const comparisons: PageMeta[] = []

  for (const f of comparisonFiles) {
    if (f.endsWith('/index.md')) continue
    const meta = parsePage(join(contentRoot, f))
    if (meta && meta.type === 'comparison') {
      comparisons.push(meta)
    }
  }

  // --- Sources ---
  const sourceFiles = findMdFiles(sourcesRoot, contentRoot)
  const sources: PageMeta[] = []

  for (const f of sourceFiles) {
    if (f.endsWith('/index.md')) continue
    const meta = parsePage(join(contentRoot, f))
    if (meta) {
      sources.push(meta)
    }
  }

  // Sort by last_updated desc
  const sortByDateDesc = (a: PageMeta, b: PageMeta) =>
    b.last_updated.localeCompare(a.last_updated)

  entities.sort(sortByDateDesc)
  concepts.sort(sortByDateDesc)
  syntheses.sort(sortByDateDesc)
  comparisons.sort(sortByDateDesc)
  sources.sort((a, b) => b.last_updated.localeCompare(a.last_updated))

  // Generate index.md
  const now = new Date().toISOString().split('T')[0]
  let output = `---
title: '전체 인덱스'
description: 'LLM Wiki 전체 콘텐츠 카탈로그 — 엔티티, 개념, 소스 현황 (날짜순 정렬)'
---

# 전체 인덱스 (Index) <span class="badge">Quartz v5: <a href="https://quartz.jzhao.xyz" target="_blank">quartz.jzhao.xyz</a></span>

LLM Wiki 전체 콘텐츠 카탈로그입니다. 모든 페이지는 \`last_updated\` 내림차순(최신순)으로 정렬됩니다.

> **범례**: ✅ high confidence | ⚠️ medium | ❓ low | 🔗 소스 수

---

## 엔티티 (Entities) — 날짜순 최신 우선

| 날짜 | 페이지 | 종류 | 설명 | 소스 | 최종 갱신 | 신뢰도 |
|------|--------|------|------|------|------|-----------|--------|
`

  for (const e of entities) {
    const sources = e.sources.length ? `${e.sources.length}개` : '—'
    output += `| ${formatDate(e.last_updated)} | [${e.title}](${e.slug}) | ${typeLabel(e.type, e.entity_type)} | ${e.description} | ${sources} | ${formatDate(e.last_updated)} | ${confidenceBadge(e.confidence)} |\n`
  }

  if (entities.length === 0) {
    output += '| — | — | — | — | — | — | — |\n'
  }

  output += `\n---\n\n## 개념 (Concepts) — 날짜순 최신 우선\n\n`
  output += `| 날짜 | 페이지 | 설명 | 소스 | 최종 갱신 | 신뢰도 |\n|------|--------|------|------|-----------|--------|\n`

  for (const c of concepts) {
    const sources = c.sources.length ? `${c.sources.length}개` : '—'
    output += `| ${formatDate(c.last_updated)} | [${c.title}](${c.slug}) | ${c.description} | ${sources} | ${formatDate(c.last_updated)} | ${confidenceBadge(c.confidence)} |\n`
  }

  if (concepts.length === 0) {
    output += '| — | — | — | — | — | — |\n'
  }

  output += `\n---\n\n## 합성 분석 (Syntheses) — 날짜순 최신 우선\n\n`
  output += `| 날짜 | 페이지 | 설명 | 소스 | 최종 갱신 | 신뢰도 |\n|------|--------|------|------|-----------|--------|\n`

  for (const s of syntheses) {
    const sources = s.sources.length ? `${s.sources.length}개` : '—'
    output += `| ${formatDate(s.last_updated)} | [${s.title}](${s.slug}) | ${s.description} | ${sources} | ${formatDate(s.last_updated)} | ${confidenceBadge(s.confidence)} |\n`
  }

  if (syntheses.length === 0) {
    output += '| — | — | — | — | — | — |\n'
  }

  output += `\n---\n\n## 비교표 (Comparisons) — 날짜순 최신 우선\n\n`
  output += `| 날짜 | 페이지 | 설명 | 소스 | 최종 갱신 | 신뢰도 |\n|------|--------|------|------|-----------|--------|\n`

  for (const c of comparisons) {
    const sources = c.sources.length ? `${c.sources.length}개` : '—'
    output += `| ${formatDate(c.last_updated)} | [${c.title}](${c.slug}) | ${c.description} | ${sources} | ${formatDate(c.last_updated)} | ${confidenceBadge(c.confidence)} |\n`
  }

  if (comparisons.length === 0) {
    output += '| — | — | — | — | — | — |\n'
  }

  output += `\n---\n\n## 원본 소스 (Sources) — 수집일자순\n\n`
  output += `| ID | 제목 | 저자 | 연도 | 유형 | 태그 | 수집일 |\n|---|---|---|---|---|---|---|---|\n`

  for (const s of sources) {
    const id = s.slug.replace('ko/sources/', '')
    // Extract from source frontmatter which uses: id, title, author, year, type, tags, collected_date
    const author = (s as any).author || '—'
    const year = (s as any).year || '—'
    const type = s.type || '—'
    const tags = (s.tags || []).join(', ')
    const collected = (s as any).collected_date || s.last_updated
    output += `| ${id} | ${s.title} | ${author} | ${year} | ${type} | ${tags} | ${formatDate(collected)} |\n`
  }

  if (sources.length === 0) {
    output += '| — | — | — | — | — | — | — |\n'
  }

  // Statistics
  const totalPages = entities.length + concepts.length + syntheses.length + comparisons.length
  const highConf = [...entities, ...concepts, ...syntheses, ...comparisons].filter(p => p.confidence === 'high').length
  const medConf = [...entities, ...concepts, ...syntheses, ...comparisons].filter(p => p.confidence === 'medium').length
  const lowConf = [...entities, ...concepts, ...syntheses, ...comparisons].filter(p => p.confidence === 'low').length
  const latestUpdate = [...entities, ...concepts, ...syntheses, ...comparisons]
    .map(p => p.last_updated)
    .filter(d => d !== 'unknown')
    .sort()
    .reverse()[0] || '—'

  output += `\n---\n\n## 통계 요약\n\n`
  output += `- **총 페이지**: ${totalPages}개 (엔티티 ${entities.length}, 개념 ${concepts.length}, 합성 ${syntheses.length}, 비교 ${comparisons.length})\n`
  output += `- **총 소스**: ${sources.length}개\n`
  output += `- **신뢰도 분포**: high ${highConf}, medium ${medConf}, low ${lowConf}\n`
  output += `- **최신 갱신**: ${latestUpdate}\n`

  output += `\n---\n\n> **갱신 규칙**: 모든 \`ingest\` 워크플로 완료 후 자동 갱신. 수동 수정 시 \`last_updated\` 필수 갱신.\n`
  output += `> *Generated: ${now}*`

  const indexPath = join(contentRoot, 'index.md')
  writeFileSync(indexPath, output)
  console.log(`✅ Generated ${indexPath}`)
  console.log(`   Entities: ${entities.length}, Concepts: ${concepts.length}, Syntheses: ${syntheses.length}, Comparisons: ${comparisons.length}, Sources: ${sources.length}`)
}

main()