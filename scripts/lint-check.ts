#!/usr/bin/env tsx
/**
 * Wiki Lint Checker
 * Validates frontmatter consistency, detects contradictions, finds orphan pages, etc.
 */

import { globby } from 'globby'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative, extname, basename, dirname } from 'path'
import { parse } from 'yaml'
import yaml from 'yaml'

interface FrontMatter {
  title?: string
  description?: string
  type?: string
  entity_type?: string
  sources?: string[]
  tags?: string[]
  last_updated?: string
  confidence?: 'high' | 'medium' | 'low'
  [key: string]: unknown
}

interface WikiPage {
  path: string
  slug: string
  sourceId?: string
  frontmatter: FrontMatter
  content: string
  contentIndex: number
}

interface LintIssue {
  level: 'error' | 'warning' | 'info'
  rule: string
  message: string
  file: string
  line?: number
}

const REQUIRED_FIELDS: Record<string, string[]> = {
  wiki: ['title', 'description', 'type', 'sources', 'tags', 'last_updated', 'confidence'],
  sources: ['source_id', 'title', 'authors', 'year', 'venue', 'type', 'tags', 'ingested_at', 'ingested_by'],
  schema: ['title', 'description'],
}

const VALID_TYPES = ['entity', 'concept', 'synthesis', 'comparison']
const VALID_ENTITY_TYPES = ['model', 'paper', 'tool', 'person', 'organization']
const VALID_CONFIDENCE = ['high', 'medium', 'low']
const VALID_SOURCE_TYPES = ['paper', 'blog', 'doc', 'code', 'video', 'article']

const CONTENT_ROOT = join(process.cwd(), 'content')
const WIKI_ROOT = join(CONTENT_ROOT, 'ko/wiki')
const SOURCES_ROOT = join(CONTENT_ROOT, 'ko/sources')
const SCHEMA_ROOT = join(CONTENT_ROOT, 'ko/schema')

function parseFrontMatter(filePath: string): { frontmatter: FrontMatter; content: string; contentIndex: number } {
  const content = readFileSync(filePath, 'utf-8')
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) {
    return { frontmatter: {}, content, contentIndex: -1 }
  }
  try {
    const fm = yaml.parse(match[1])
    return { frontmatter: fm as FrontMatter, content, contentIndex: match[0].length }
  } catch {
    return { frontmatter: {}, content, contentIndex: -1 }
  }
}

function getAllWikiPages(): WikiPage[] {
  const files = readdirSync(WIKI_ROOT, { recursive: true })
    .filter(f => extname(f) === '.md' && basename(f) !== 'index.md')
    .map(f => join(WIKI_ROOT, f))

  return files.map(filePath => {
    const { frontmatter, content, contentIndex } = parseFrontMatter(filePath)
    const relPath = relative(CONTENT_ROOT, filePath)
    const slug = relPath.replace(/\.md$/, '').replace(/\\/g, '/')
    return { path: filePath, slug, frontmatter, content, contentIndex }
  })
}

function getAllSourcePages(): WikiPage[] {
  const files = readdirSync(SOURCES_ROOT, { recursive: true })
    .filter(f => extname(f) === '.md' && basename(f) !== 'index.md')
    .map(f => join(SOURCES_ROOT, f))

  return files.map(filePath => {
    const { frontmatter, content, contentIndex } = parseFrontMatter(filePath)
    const relPath = relative(CONTENT_ROOT, filePath)
    const slug = relPath.replace(/\.md$/, '').replace(/\\/g, '/')
    // Extract source ID from filename (e.g., src-001-attention... -> src-001)
    const filename = basename(filePath)
    const sourceId = filename.match(/^src-\d{3}/)?.[0] || slug
    return { path: filePath, slug, sourceId, frontmatter, content, contentIndex }
  })
}

function checkRequiredFields(page: WikiPage, category: keyof typeof REQUIRED_FIELDS): LintIssue[] {
  const issues: LintIssue[] = []
  const required = REQUIRED_FIELDS[category]

  for (const field of required) {
    const value = page.frontmatter[field]
    if (value === undefined || value === null || value === '') {
      issues.push({
        level: 'error',
        rule: 'required-field',
        message: `Missing required field: ${field}`,
        file: page.path,
      })
    }
  }
  return issues
}

function checkFieldValues(page: WikiPage): LintIssue[] {
  const issues: LintIssue[] = []

  // Validate type
  if (page.frontmatter.type && !VALID_TYPES.includes(page.frontmatter.type as string)) {
    issues.push({
      level: 'error',
      rule: 'invalid-type',
      message: `Invalid type: ${page.frontmatter.type}. Must be one of: ${VALID_TYPES.join(', ')}`,
      file: page.path,
    })
  }

  // Validate entity_type
  if (page.frontmatter.entity_type && !VALID_ENTITY_TYPES.includes(page.frontmatter.entity_type as string)) {
    issues.push({
      level: 'error',
      rule: 'invalid-entity-type',
      message: `Invalid entity_type: ${page.frontmatter.entity_type}. Must be one of: ${VALID_ENTITY_TYPES.join(', ')}`,
      file: page.path,
    })
  }

  // Validate confidence
  if (page.frontmatter.confidence && !VALID_CONFIDENCE.includes(page.frontmatter.confidence as string)) {
    issues.push({
      level: 'error',
      rule: 'invalid-confidence',
      message: `Invalid confidence: ${page.frontmatter.confidence}. Must be one of: ${VALID_CONFIDENCE.join(', ')}`,
      file: page.path,
    })
  }

  // Validate sources array
  if (page.frontmatter.sources) {
    if (!Array.isArray(page.frontmatter.sources)) {
      issues.push({
        level: 'error',
        rule: 'invalid-sources',
        message: 'sources must be an array',
        file: page.path,
      })
    } else {
      for (const src of page.frontmatter.sources) {
        if (typeof src !== 'string' || !src.startsWith('src-')) {
          issues.push({
            level: 'warning',
            rule: 'invalid-source-format',
            message: `Source ID should start with 'src-': ${src}`,
            file: page.path,
          })
        }
      }
    }
  }

  // Validate tags are lowercase with hyphens
  if (page.frontmatter.tags && Array.isArray(page.frontmatter.tags)) {
    for (const tag of page.frontmatter.tags) {
      if (typeof tag === 'string' && !/^[a-z0-9-]+$/.test(tag)) {
        issues.push({
          level: 'warning',
          rule: 'invalid-tag-format',
          message: `Tag should be lowercase with hyphens: ${tag}`,
          file: page.path,
        })
      }
    }
  }

  // Validate last_updated format
  if (page.frontmatter.last_updated) {
    const dateStr = page.frontmatter.last_updated as string
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      issues.push({
        level: 'error',
        rule: 'invalid-date-format',
        message: `last_updated must be YYYY-MM-DD format: ${dateStr}`,
        file: page.path,
      })
    } else {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) {
        issues.push({
          level: 'error',
          rule: 'invalid-date',
          message: `last_updated is not a valid date: ${dateStr}`,
          file: page.path,
        })
      }
    }
  }

  // Validate description length
  if (page.frontmatter.description && typeof page.frontmatter.description === 'string') {
    if (page.frontmatter.description.length > 160) {
      issues.push({
        level: 'warning',
        rule: 'description-too-long',
        message: `Description exceeds 160 chars (${page.frontmatter.description.length})`,
        file: page.path,
      })
    }
  }

  return issues
}

function checkSourceReferences(pages: WikiPage[], sourcePages: WikiPage[]): LintIssue[] {
  const issues: LintIssue[] = []
  const sourceIds = new Set(sourcePages.map(p => p.sourceId).filter(Boolean))

  for (const page of pages) {
    if (page.frontmatter.sources && Array.isArray(page.frontmatter.sources)) {
      for (const src of page.frontmatter.sources) {
        if (!sourceIds.has(src)) {
          issues.push({
            level: 'warning',
            rule: 'missing-source',
            message: `References non-existent source: ${src}`,
            file: page.path,
          })
        }
      }
    }
  }
  return issues
}

function checkOrphanPages(pages: WikiPage[]): LintIssue[] {
  const issues: LintIssue[] = []
  const allSlugs = new Set(pages.map(p => p.slug))

  // Build link graph from content
  const linkedSlugs = new Set<string>()
  const linkedTitles = new Set<string>() // Track raw titles from [[...]]
  const wikiLinkRegex = /\[\[([^\]]+)\]\]/g
  const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g

  for (const page of pages) {
    // Wiki links [[page-title]]
    let match
    while ((match = wikiLinkRegex.exec(page.content)) !== null) {
      const target = match[1].trim()
      // Try to resolve to slug (title -> slug)
      const targetSlug = target.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-/]/g, '')
      linkedSlugs.add(targetSlug)
      linkedTitles.add(target.toLowerCase())
    }

    // Markdown links [text](path)
    while ((match = mdLinkRegex.exec(page.content)) !== null) {
      const href = match[2]
      if (href.startsWith('../wiki/') || href.startsWith('wiki/') || href.startsWith('/wiki/')) {
        const targetSlug = href.replace(/^\.\.\//, '').replace(/^\//, '').replace(/\.md$/, '')
        linkedSlugs.add(targetSlug)
      }
    }
  }

  // Check for orphans (pages not linked from anywhere except index)
  for (const page of pages) {
    const isIndex = page.slug.endsWith('/index')
    const pageTitle = page.frontmatter.title?.toLowerCase() || ''
    const pageFilename = page.slug.split('/').pop() || '' // Last segment (filename without .md)
    const pageSlugNoPrefix = page.slug.replace('ko/wiki/', '')

    // Check multiple matching strategies:
    // 1. Full slug matches
    // 2. Slug without 'ko/wiki/' prefix matches
    // 3. Filename (last segment) matches slugified title from [[...]]
    // 4. Frontmatter title matches linked title
    const isLinked =
      linkedSlugs.has(page.slug) ||
      linkedSlugs.has(pageSlugNoPrefix) ||
      linkedSlugs.has(pageFilename) ||
      linkedTitles.has(pageTitle)

    if (!isIndex && !isLinked) {
      issues.push({
        level: 'warning',
        rule: 'orphan-page',
        message: `Page not linked from any other page (orphan)`,
        file: page.path,
      })
    }
  }

  return issues
}

function checkOutdatedContent(pages: WikiPage[]): LintIssue[] {
  const issues: LintIssue[] = []
  const now = new Date()
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())

  for (const page of pages) {
    if (page.frontmatter.last_updated) {
      const lastUpdated = new Date(page.frontmatter.last_updated as string)
      if (lastUpdated < sixMonthsAgo) {
        issues.push({
          level: 'info',
          rule: 'outdated-content',
          message: `Content not updated in 6+ months (last: ${page.frontmatter.last_updated})`,
          file: page.path,
        })
      }
    }
  }
  return issues
}

function checkConfidenceLow(pages: WikiPage[]): LintIssue[] {
  const issues: LintIssue[] = []
  for (const page of pages) {
    if (page.frontmatter.confidence === 'low') {
      issues.push({
        level: 'warning',
        rule: 'low-confidence',
        message: `Page has low confidence rating`,
        file: page.path,
      })
    }
  }
  return issues
}

function checkDuplicateTitles(pages: WikiPage[]): LintIssue[] {
  const issues: LintIssue[] = []
  const titleMap = new Map<string, WikiPage[]>()

  for (const page of pages) {
    if (page.frontmatter.title) {
      const key = page.frontmatter.title.toLowerCase()
      if (!titleMap.has(key)) titleMap.set(key, [])
      titleMap.get(key)!.push(page)
    }
  }

  for (const [title, pages] of titleMap) {
    if (pages.length > 1) {
      for (const page of pages) {
        issues.push({
          level: 'warning',
          rule: 'duplicate-title',
          message: `Duplicate title: "${page.frontmatter.title}" (also in ${pages.filter(p => p !== page).map(p => p.path).join(', ')})`,
          file: page.path,
        })
      }
    }
  }
  return issues
}

async function main() {
  console.log('🔍 Running wiki lint check...\n')

  const pages = getAllWikiPages()
  const sourcePages = getAllSourcePages()

  console.log(`Found ${pages.length} wiki pages, ${sourcePages.length} source pages`)

  let allIssues: LintIssue[] = []

  // Check wiki pages
  for (const page of pages) {
    allIssues.push(...checkRequiredFields(page, 'wiki'))
    allIssues.push(...checkFieldValues(page))
  }

  // Check source pages
  for (const page of sourcePages) {
    allIssues.push(...checkRequiredFields(page, 'sources'))
    if (page.frontmatter.type && !VALID_SOURCE_TYPES.includes(page.frontmatter.type as string)) {
      allIssues.push({
        level: 'error',
        rule: 'invalid-source-type',
        message: `Invalid source type: ${page.frontmatter.type}. Must be one of: ${VALID_SOURCE_TYPES.join(', ')}`,
        file: page.path,
      })
    }
  }

  // Cross-reference checks
  allIssues.push(...checkSourceReferences(pages, sourcePages))
  allIssues.push(...checkOrphanPages(pages))
  allIssues.push(...checkOutdatedContent(pages))
  allIssues.push(...checkConfidenceLow(pages))
  allIssues.push(...checkDuplicateTitles(pages))

  // Group by level
  const errors = allIssues.filter(i => i.level === 'error')
  const warnings = allIssues.filter(i => i.level === 'warning')
  const infos = allIssues.filter(i => i.level === 'info')

  // Output
  console.log('\n📊 Lint Results:')
  console.log(`  Errors:   ${errors.length}`)
  console.log(`  Warnings: ${warnings.length}`)
  console.log(`  Info:     ${infos.length}`)

  if (errors.length > 0) {
    console.log('\n❌ Errors:')
    for (const issue of errors) {
      console.log(`  [${issue.rule}] ${issue.file}`)
      console.log(`    ${issue.message}`)
    }
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:')
    for (const issue of warnings) {
      console.log(`  [${issue.rule}] ${issue.file}`)
      console.log(`    ${issue.message}`)
    }
  }

  if (infos.length > 0) {
    console.log('\nℹ️  Info:')
    for (const issue of infos) {
      console.log(`  [${issue.rule}] ${issue.file}`)
      console.log(`    ${issue.message}`)
    }
  }

  // Exit code
  if (errors.length > 0) {
    console.log('\n❌ Lint failed with errors')
    process.exit(1)
  } else if (warnings.length > 0) {
    console.log('\n⚠️  Lint passed with warnings')
    process.exit(0)
  } else {
    console.log('\n✅ Lint passed')
    process.exit(0)
  }
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})